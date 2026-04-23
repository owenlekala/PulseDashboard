"use client"

import { Search } from "lucide-react"

import type { ChatConversation } from "@/data/demo-chat-data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ChatConversationListProps {
  conversations: ChatConversation[]
  activeConversationId: string
  query: string
  queue: "all" | "open" | "pending"
  counts: {
    all: number
    open: number
    pending: number
  }
  onQueryChange: (value: string) => void
  onQueueChange: (value: "all" | "open" | "pending") => void
  onSelectConversation: (id: string) => void
}

const statusTone = {
  open: "text-green-600 dark:text-green-400",
  pending: "text-amber-600 dark:text-amber-400",
  resolved: "text-muted-foreground",
}

export function ChatConversationList({
  conversations,
  activeConversationId,
  query,
  queue,
  counts,
  onQueryChange,
  onQueueChange,
  onSelectConversation,
}: ChatConversationListProps) {
  return (
    <div className="flex h-[72vh] min-h-[640px] flex-col rounded-lg border bg-card">
      <div className="border-b px-4 py-4">
        <div className="mb-3">
          <h2 className="text-base font-semibold">Inbox</h2>
          <p className="text-sm text-muted-foreground">
            Track active customer conversations and queue states.
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search conversations..."
            className="pl-9"
          />
        </div>
        <Tabs
          value={queue}
          onValueChange={(value) => onQueueChange(value as "all" | "open" | "pending")}
          className="mt-3"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All {counts.all}</TabsTrigger>
            <TabsTrigger value="open">Open {counts.open}</TabsTrigger>
            <TabsTrigger value="pending">Pending {counts.pending}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {conversations.map((conversation) => {
            const isActive = conversation.id === activeConversationId
            const latestMessage =
              conversation.messages[conversation.messages.length - 1]

            return (
              <button
                key={conversation.id}
                type="button"
                onClick={() => onSelectConversation(conversation.id)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition-colors",
                  isActive
                    ? "bg-muted"
                    : "hover:bg-muted/60"
                )}
              >
                <Avatar className="size-10 rounded-lg">
                  <AvatarImage
                    src={conversation.customer.avatar}
                    alt={conversation.customer.name}
                  />
                  <AvatarFallback className="rounded-lg">
                    {initials(conversation.customer.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {conversation.customer.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {conversation.subject}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      {conversation.unreadCount > 0 ? (
                        <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 py-0.5 text-[11px] font-semibold text-primary-foreground">
                          {conversation.unreadCount}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">
                    {latestMessage?.content}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="outline" className="capitalize">
                      {conversation.channel}
                    </Badge>
                    <span
                      className={cn(
                        "text-[11px] font-medium capitalize",
                        statusTone[conversation.status]
                      )}
                    >
                      {conversation.status}
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}
