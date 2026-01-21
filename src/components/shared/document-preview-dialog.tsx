"use client"

import * as React from "react"
import { FileText, Image as ImageIcon, File, Download, Maximize2, Minimize2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type PreviewSource =
  | { kind: "url"; url: string; fileName?: string; mimeType?: string }
  | { kind: "file"; file: File }

export interface DocumentPreviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  source: PreviewSource | null
  allowExpand?: boolean
}

function getName(source: PreviewSource | null) {
  if (!source) return ""
  if (source.kind === "file") return source.file.name
  return source.fileName ?? source.url.split("/").pop() ?? "Document"
}

function getType(source: PreviewSource | null) {
  if (!source) return ""
  if (source.kind === "file") return source.file.type || ""
  return source.mimeType || ""
}

function isImage(mime: string) {
  return mime.startsWith("image/")
}

function isPdf(mime: string) {
  return mime === "application/pdf"
}

export function DocumentPreviewDialog({
  open,
  onOpenChange,
  title = "Preview document",
  description,
  source,
  allowExpand = true,
}: DocumentPreviewDialogProps) {
  const [objectUrl, setObjectUrl] = React.useState<string | null>(null)
  const [expanded, setExpanded] = React.useState(false)

  React.useEffect(() => {
    if (!open) setExpanded(false)
  }, [open])

  React.useEffect(() => {
    if (!open) return
    if (!source) return

    if (source.kind === "file") {
      const url = URL.createObjectURL(source.file)
      setObjectUrl(url)
      return () => {
        URL.revokeObjectURL(url)
        setObjectUrl(null)
      }
    }

    setObjectUrl(null)
  }, [open, source])

  const name = getName(source)
  const mime = getType(source)
  const url = source
    ? source.kind === "file"
      ? objectUrl
      : source.url
    : null

  const canPreview = !!url && (isImage(mime) || isPdf(mime))

  const Icon = isImage(mime) ? ImageIcon : mime ? FileText : File

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "p-0 flex flex-col",
          expanded
            ? "w-[95vw] sm:max-w-none h-[90vh]"
            : "sm:max-w-[800px]"
        )}
      >
        <div className="p-6 pb-0 flex-shrink-0">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {description ?? (name ? name : "Preview the selected document.")}
            </DialogDescription>
          </DialogHeader>

          {allowExpand && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute bottom-4 left-4 h-8 w-8 z-10"
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
              <span className="sr-only">{expanded ? "Collapse" : "Expand"}</span>
            </Button>
          )}
        </div>

        <ScrollArea className={cn("flex-1", !expanded && "max-h-[70vh]")}>
          <div className={cn("pt-4", expanded ? "p-6" : "p-6")}>
            {!source ? (
              <div className="flex flex-col items-center justify-center rounded-lg border bg-muted/20 p-10 text-center">
                <FileText className="mb-3 h-10 w-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">No document selected</p>
              </div>
            ) : canPreview ? (
              <div className={cn("rounded-lg border bg-background overflow-hidden", expanded && "h-full")}>
                {isImage(mime) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={url!}
                    alt={name}
                    className={cn("w-full object-contain", expanded ? "h-[calc(90vh-12rem)]" : "h-auto")}
                  />
                ) : (
                  <iframe
                    title={name}
                    src={url!}
                    className={cn("w-full border-0", expanded ? "h-[calc(90vh-12rem)]" : "h-[60vh]")}
                  />
                )}
              </div>
            ) : (
              <div className="flex items-start gap-3 rounded-lg border bg-muted/20 p-4">
                <Icon className={cn("mt-0.5 h-5 w-5 text-muted-foreground")} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-card-foreground">
                    {name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {mime ? `Type: ${mime}` : "Preview not available for this file type."}
                  </p>
                  {url && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      Use download to open it locally.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="p-6 pt-0 gap-2 flex-shrink-0">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {url && (
            <Button asChild type="button">
              <a href={url} download={name || undefined}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </a>
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


