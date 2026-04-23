"use client"

import { History, Search, Sparkles } from "lucide-react"

import type { AiWorkspaceSession } from "@/data/demo-ai-chat-data"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface AiChatHistorySheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  sessions: AiWorkspaceSession[]
  activeSessionId: string
  query: string
  filter: "all" | "live" | "draft"
  onQueryChange: (value: string) => void
  onFilterChange: (value: "all" | "live" | "draft") => void
  onSelectSession: (id: string) => void
}

const statusTone: Record<AiWorkspaceSession["status"], string> = {
  live: "text-green-600 dark:text-green-400",
  draft: "text-amber-600 dark:text-amber-400",
  completed: "text-muted-foreground",
}

export function AiChatHistorySheet({
  open,
  onOpenChange,
  sessions,
  activeSessionId,
  query,
  filter,
  onQueryChange,
  onFilterChange,
  onSelectSession,
}: AiChatHistorySheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full max-w-xl gap-0 p-0 sm:max-w-xl">
        <SheetHeader className="border-b px-6 py-5">
          <SheetTitle>Chat history</SheetTitle>
          <SheetDescription>
            Reopen earlier sessions, review drafts, and switch back into active AI work.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4 px-6 py-5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Search history..."
              className="pl-9"
            />
          </div>

          <Tabs
            value={filter}
            onValueChange={(value) => onFilterChange(value as "all" | "live" | "draft")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="live">Live</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
            </TabsList>

            <TabsContent value={filter} className="mt-4">
              <ScrollArea className="h-[70vh] pr-2">
                <div className="space-y-3">
                  {sessions.map((session) => {
                    const isActive = session.id === activeSessionId

                    return (
                      <button
                        key={session.id}
                        type="button"
                        onClick={() => {
                          onSelectSession(session.id)
                          onOpenChange(false)
                        }}
                        className={cn(
                          "w-full rounded-2xl border px-4 py-4 text-left transition-colors",
                          isActive
                            ? "border-primary bg-primary/5"
                            : "border-border/70 hover:bg-muted/40"
                        )}
                      >
                        <div className="mb-3 flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="line-clamp-2 text-sm font-medium">{session.title}</p>
                            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                              {session.summary}
                            </p>
                          </div>
                          <History className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={cn(
                              "text-[11px] font-medium capitalize",
                              statusTone[session.status]
                            )}
                          >
                            {session.status}
                          </span>
                          {session.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="rounded-full px-2 py-0">
                              {tag}
                            </Badge>
                          ))}
                          <Sparkles className="ml-auto size-4 text-muted-foreground" />
                        </div>
                      </button>
                    )
                  })}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  )
}
