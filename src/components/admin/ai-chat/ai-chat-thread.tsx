"use client"

import { useEffect, useRef } from "react"
import {
  Bot,
  FileText,
  Layers3,
  Maximize2,
  Minimize2,
  Paperclip,
  SendHorizonal,
} from "lucide-react"

import type { AiWorkspaceAssistant, AiWorkspaceSession } from "@/data/demo-ai-chat-data"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface AiChatThreadProps {
  assistant: AiWorkspaceAssistant
  session: AiWorkspaceSession
  draft: string
  isNewChat: boolean
  mode: "chat" | "prompt"
  expanded: boolean
  selectedModel: string
  availableModels: Array<{
    id: string
    label: string
  }>
  onExpandedChange: (value: boolean) => void
  onSelectModel: (value: string) => void
  onModeChange: (value: "chat" | "prompt") => void
  onDraftChange: (value: string) => void
  onSend: () => void
  className?: string
}

export function AiChatThread({
  assistant,
  session,
  draft,
  isNewChat,
  mode,
  expanded,
  selectedModel,
  availableModels,
  onExpandedChange,
  onSelectModel,
  onModeChange,
  onDraftChange,
  onSend,
  className,
}: AiChatThreadProps) {
  const scrollAreaRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const viewport = scrollAreaRef.current?.querySelector("[data-radix-scroll-area-viewport]")

    if (!(viewport instanceof HTMLDivElement)) {
      return
    }

    const frame = window.requestAnimationFrame(() => {
      viewport.scrollTo({
        top: viewport.scrollHeight,
        behavior: "smooth",
      })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [expanded, isNewChat, session.id, session.messages.length])

  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-[28px] border bg-card transition-all",
        expanded ? "h-[calc(100vh-2rem)] min-h-[760px]" : "h-[calc(100vh-12rem)] min-h-[680px]",
        className
      )}
    >
      <div className="absolute right-6 top-6 z-20">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-background/80 backdrop-blur"
          onClick={() => onExpandedChange(!expanded)}
        >
          {expanded ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
          <span className="sr-only">{expanded ? "Collapse chat" : "Expand chat"}</span>
        </Button>
      </div>

      <ScrollArea ref={scrollAreaRef} className="flex-1 px-6 py-6">
        <div
          className={cn(
            "mx-auto flex w-full flex-col gap-6 pb-56 pt-4",
            expanded ? "max-w-4xl" : "max-w-3xl"
          )}
        >
          {isNewChat ? (
            <div className="flex min-h-[55vh] flex-1 items-center justify-center">
              <div className="space-y-3 text-center">
                <p className="text-3xl font-semibold tracking-tight">What can I help with?</p>
                <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
                  Start with a question, paste rough notes, or choose a prompt mode before sending.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-2 text-center">
                <p className="text-2xl font-semibold tracking-tight">{session.title}</p>
                <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
                  {session.summary}
                </p>
              </div>
              {session.messages.map((message) => {
                if (message.role === "system") {
                  return (
                    <div key={message.id} className="flex justify-center">
                      <div className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                        {message.content}
                      </div>
                    </div>
                  )
                }

                const isUser = message.role === "user"

                return (
                  <div
                    key={message.id}
                    className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}
                  >
                    {!isUser ? (
                      <Avatar className="mt-1 size-9 rounded-xl">
                        <AvatarFallback className="rounded-xl bg-primary/10 text-primary">
                          <Bot className="size-4" />
                        </AvatarFallback>
                      </Avatar>
                    ) : null}
                    <div
                      className={cn(
                        "max-w-[85%] rounded-3xl px-5 py-4 text-sm leading-7 shadow-none",
                        isUser
                          ? "rounded-br-md bg-primary text-primary-foreground"
                          : "rounded-bl-md border bg-muted/30"
                      )}
                    >
                      {!isUser ? (
                        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          {assistant.name}
                        </p>
                      ) : null}
                      <p className="whitespace-pre-line">{message.content}</p>
                      <p
                        className={cn(
                          "mt-2 text-[11px]",
                          isUser ? "text-primary-foreground/80" : "text-muted-foreground"
                        )}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                )
              })}
            </>
          )}
        </div>
      </ScrollArea>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/95 to-transparent px-6 pb-6 pt-16">
        <div
          className={cn(
            "pointer-events-auto mx-auto flex w-full flex-col gap-4",
            expanded ? "max-w-4xl" : "max-w-3xl"
          )}
        >
          <div className="flex flex-wrap items-center gap-3">
            <Tabs
              value={mode}
              onValueChange={(value) => onModeChange(value as "chat" | "prompt")}
              className="w-auto"
            >
              <TabsList>
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="prompt">Prompt mode</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="rounded-[32px] border bg-background/95 p-3 shadow-xl backdrop-blur">
            <Textarea
              value={draft}
              onChange={(event) => onDraftChange(event.target.value)}
              placeholder={
                mode === "prompt"
                  ? "Describe the output, structure, and constraints you want..."
                  : "Message AI Chat"
              }
              className="min-h-20 resize-none border-0 bg-transparent px-2 py-2 shadow-none focus-visible:ring-0"
            />

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Paperclip className="size-4" />
                    <span className="sr-only">Attach</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>
                    <Layers3 className="size-4" />
                    Attach context
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileText className="size-4" />
                    Attach document
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex items-center gap-2">
                <Select value={selectedModel} onValueChange={onSelectModel}>
                  <SelectTrigger className="h-10 w-[122px] rounded-full">
                    <SelectValue placeholder="Model" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableModels.map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        {model.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button className="gap-2 rounded-full px-5" onClick={onSend} disabled={!draft.trim()}>
                  Send
                  <SendHorizonal className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function formatTime(value: string) {
  return new Date(value).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })
}
