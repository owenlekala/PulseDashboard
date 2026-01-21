"use client"

import * as React from "react"
import { Upload, FileText, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export interface DocumentUploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  accept?: string
  multiple?: boolean
  maxFileSizeMB?: number
  onUpload: (files: File[]) => Promise<void> | void
}

function bytesFromMB(mb: number) {
  return Math.round(mb * 1024 * 1024)
}

export function DocumentUploadDialog({
  open,
  onOpenChange,
  title = "Upload document",
  description = "Drop files here or choose files to upload.",
  accept,
  multiple = false,
  maxFileSizeMB = 20,
  onUpload,
}: DocumentUploadDialogProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const [files, setFiles] = React.useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!open) {
      setFiles([])
      setIsSubmitting(false)
      setError(null)
      setIsDragging(false)
      if (inputRef.current) inputRef.current.value = ""
    }
  }, [open])

  const validateAndNormalize = React.useCallback(
    (incoming: File[]) => {
      const maxBytes = bytesFromMB(maxFileSizeMB)
      const tooLarge = incoming.find((f) => f.size > maxBytes)
      if (tooLarge) {
        return {
          ok: false as const,
          message: `"${tooLarge.name}" is larger than ${maxFileSizeMB}MB.`,
          files: [] as File[],
        }
      }

      const next = multiple ? incoming : incoming.slice(0, 1)
      return { ok: true as const, message: null as string | null, files: next }
    },
    [maxFileSizeMB, multiple]
  )

  const setIncomingFiles = React.useCallback(
    (incoming: File[]) => {
      const res = validateAndNormalize(incoming)
      if (!res.ok) {
        setError(res.message)
        return
      }
      setError(null)
      setFiles(res.files)
    },
    [validateAndNormalize]
  )

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const incoming = Array.from(e.dataTransfer.files || [])
    if (incoming.length > 0) setIncomingFiles(incoming)
  }

  const onBrowse = () => inputRef.current?.click()

  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx))
  }

  const submit = async () => {
    if (files.length === 0) {
      setError("Please select at least one file.")
      return
    }
    setError(null)
    setIsSubmitting(true)
    try {
      await onUpload(files)
      onOpenChange(false)
    } catch (e: any) {
      setError(e?.message || "Upload failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div
            className={cn(
              "rounded-lg border border-dashed p-4 transition-colors",
              isDragging ? "bg-muted/60 border-primary/40" : "bg-muted/30"
            )}
            onDragEnter={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsDragging(true)
            }}
            onDragOver={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsDragging(true)
            }}
            onDragLeave={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsDragging(false)
            }}
            onDrop={onDrop}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-muted-foreground">
                <Upload className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-card-foreground">
                  Drag & drop files here
                </p>
                <p className="text-xs text-muted-foreground">
                  Max {maxFileSizeMB}MB{accept ? ` • Accepted: ${accept}` : ""}{" "}
                  {multiple ? " • Multiple files allowed" : ""}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={onBrowse}>
                    Choose file{multiple ? "s" : ""}
                  </Button>
                  <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    accept={accept}
                    multiple={multiple}
                    onChange={(e) => {
                      const incoming = Array.from(e.target.files || [])
                      if (incoming.length > 0) setIncomingFiles(incoming)
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Selected</p>
              <div className="space-y-2">
                {files.map((f, idx) => (
                  <div
                    key={`${f.name}-${idx}`}
                    className="flex items-center gap-3 rounded-md border bg-background px-3 py-2"
                  >
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{f.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(f.size / 1024 / 1024).toFixed(2)}MB
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => removeFile(idx)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="button" onClick={submit} disabled={isSubmitting}>
            {isSubmitting ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


