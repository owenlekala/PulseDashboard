"use client"

import { Bot, Layers3, Paperclip, SendHorizonal, Sparkles, Wand2 } from "lucide-react"

import type { AiWorkspaceAssistant, AiWorkspaceSession } from "@/data/demo-ai-chat-data"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface AiChatThreadProps {
  assistant: AiWorkspaceAssistant
  session: AiWorkspaceSession
  draft: string
  mode: "chat" | "prompt"
  onModeChange: (value: "chat" | "prompt") => void
  onDraftChange: (value: string) => void
  onSend: () => void
  onUseSuggestion: (value: string) => void
}

export function AiChatThread({
  assistant,
  session,
  draft,
  mode,
  onModeChange,
  onDraftChange,
  onSend,
  onUseSuggestion,
}: AiChatThreadProps) {
  return (
    <div className="flex h-[76vh] min-h-[680px] flex-col rounded-[28px] border bg-card">
      <div className="space-y-4 border-b px-6 py-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="rounded-full">
                {assistant.name}
              </Badge>
              <Badge variant="outline" className="rounded-full">
                {assistant.model}
              </Badge>
              <Badge variant="outline" className="rounded-full">
                <Layers3 className="size-3.5" />
                {session.attachments.length} sources
              </Badge>
            </div>
            <p className="text-xl font-semibold tracking-tight">{session.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{session.summary}</p>
          </div>
          <Button variant="outline" className="rounded-lg">
            <Wand2 className="size-4" />
            Refine prompt
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 px-6 py-6">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
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
        </div>
      </ScrollArea>

      <Separator />

      <div className="px-6 py-5">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
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

            <div className="flex flex-wrap gap-2">
              {session.suggestedPrompts.slice(0, 2).map((prompt) => (
                <Button
                  key={prompt}
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => onUseSuggestion(prompt)}
                >
                  <Sparkles className="size-3.5" />
                  Prompt starter
                </Button>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border bg-background/80 p-3">
            <Textarea
              value={draft}
              onChange={(event) => onDraftChange(event.target.value)}
              placeholder={
                mode === "prompt"
                  ? "Describe the output, structure, and constraints you want..."
                  : "Message AI Chat"
              }
              className="min-h-28 resize-none border-0 bg-transparent px-2 py-2 shadow-none focus-visible:ring-0"
            />

            <div className="flex items-center justify-between gap-3 pt-2">
              <Button variant="ghost" className="gap-2 rounded-full">
                <Paperclip className="size-4" />
                Attach context
              </Button>
              <Button className="gap-2 rounded-full px-5" onClick={onSend} disabled={!draft.trim()}>
                Send
                <SendHorizonal className="size-4" />
              </Button>
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
