"use client"

import { Paperclip, Phone, SendHorizonal, Video } from "lucide-react"

import type { ChatConversation } from "@/data/demo-chat-data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface ChatMessageThreadProps {
  conversation: ChatConversation
  draft: string
  onDraftChange: (value: string) => void
  onSend: () => void
}

export function ChatMessageThread({
  conversation,
  draft,
  onDraftChange,
  onSend,
}: ChatMessageThreadProps) {
  return (
    <div className="flex h-[72vh] min-h-[640px] flex-col rounded-lg border bg-card">
      <div className="flex items-center justify-between gap-4 border-b px-5 py-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">
            {conversation.subject}
          </p>
          <p className="truncate text-sm text-muted-foreground">
            {conversation.customer.name} · {conversation.customer.role}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="rounded-lg">
            <Phone className="size-4" />
            <span className="sr-only">Start call</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-lg">
            <Video className="size-4" />
            <span className="sr-only">Start video</span>
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 px-5 py-5">
        <div className="space-y-4">
          {conversation.messages.map((message) => {
            const isCustomer = message.sender === "customer"
            const isSystem = message.sender === "system"

            if (isSystem) {
              return (
                <div key={message.id} className="flex justify-center">
                  <div className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                    {message.content}
                  </div>
                </div>
              )
            }

            return (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  isCustomer ? "justify-start" : "justify-end"
                )}
              >
                {isCustomer ? (
                  <Avatar className="mt-1 size-8 rounded-lg">
                    <AvatarImage
                      src={conversation.customer.avatar}
                      alt={conversation.customer.name}
                    />
                    <AvatarFallback className="rounded-lg">
                      {initials(conversation.customer.name)}
                    </AvatarFallback>
                  </Avatar>
                ) : null}
                <div
                  className={cn(
                    "max-w-[72%] rounded-2xl px-4 py-3 text-sm leading-6",
                    isCustomer
                      ? "rounded-tl-sm bg-muted"
                      : "rounded-tr-sm bg-primary text-primary-foreground"
                  )}
                >
                  <p>{message.content}</p>
                  <p
                    className={cn(
                      "mt-2 text-[11px]",
                      isCustomer
                        ? "text-muted-foreground"
                        : "text-primary-foreground/80"
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

      <div className="space-y-3 px-5 py-4">
        <Textarea
          value={draft}
          onChange={(event) => onDraftChange(event.target.value)}
          placeholder="Write a reply..."
          className="min-h-24 resize-none"
        />
        <div className="flex items-center justify-between gap-3">
          <Button variant="outline" className="gap-2">
            <Paperclip className="size-4" />
            Attach
          </Button>
          <Button className="gap-2" onClick={onSend} disabled={!draft.trim()}>
            Send
            <SendHorizonal className="size-4" />
          </Button>
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

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}
