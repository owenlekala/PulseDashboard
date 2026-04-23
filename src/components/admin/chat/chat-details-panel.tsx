"use client"

import { AlertTriangle, Clock3, Mail, ShieldCheck, Tag } from "lucide-react"

import type { ChatConversation } from "@/data/demo-chat-data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ChatDetailsPanelProps {
  conversation: ChatConversation
  assigneeOptions?: string[]
  onStatusChange?: (value: ChatConversation["status"]) => void
  onAssigneeChange?: (value: string) => void
}

export function ChatDetailsPanel({
  conversation,
  assigneeOptions = [],
  onStatusChange,
  onAssigneeChange,
}: ChatDetailsPanelProps) {
  const { customer } = conversation
  const latestCustomerMessage = [...conversation.messages]
    .reverse()
    .find((message) => message.sender === "customer")

  return (
    <div className="flex h-[72vh] min-h-[640px] flex-col rounded-lg border bg-card">
      <div className="border-b px-5 py-4">
        <h2 className="text-base font-semibold">Details</h2>
        <p className="text-sm text-muted-foreground">
          Context, ownership, and quick account information.
        </p>
      </div>

      <ScrollArea className="flex-1 px-5 py-5">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <Avatar className="size-12 rounded-xl">
              <AvatarImage src={customer.avatar} alt={customer.name} />
              <AvatarFallback className="rounded-xl">
                {initials(customer.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold">{customer.name}</p>
              <p className="text-sm text-muted-foreground">{customer.role}</p>
            </div>
          </div>

          <div className="space-y-3 rounded-lg border bg-muted/20 p-4">
            <DetailRow icon={Mail} label="Email" value={customer.email} />
            <DetailRow icon={Clock3} label="Timezone" value={customer.timezone} />
            <DetailRow icon={ShieldCheck} label="Assignee" value={conversation.assignee} />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border bg-muted/20 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                First response SLA
              </p>
              <p className="mt-2 text-sm font-semibold text-amber-600 dark:text-amber-400">
                18 minutes remaining
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Escalate if no public reply is sent within this window.
              </p>
            </div>
            <div className="rounded-lg border bg-muted/20 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Customer risk
              </p>
              <div className="mt-2 flex items-center gap-2">
                <AlertTriangle className="size-4 text-amber-600 dark:text-amber-400" />
                <p className="text-sm font-semibold">High attention</p>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Priority account with billing workflow dependency.
              </p>
            </div>
          </div>

          <Separator />

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Ownership
            </p>
            <div className="space-y-3 rounded-lg border bg-muted/20 p-4">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Status
                </p>
                <Select
                  value={conversation.status}
                  onValueChange={(value: ChatConversation["status"]) =>
                    onStatusChange?.(value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Assignee
                </p>
                <Select
                  value={conversation.assignee}
                  onValueChange={(value) => onAssigneeChange?.(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select owner" />
                  </SelectTrigger>
                  <SelectContent>
                    {assigneeOptions.map((assignee) => (
                      <SelectItem key={assignee} value={assignee}>
                        {assignee}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Conversation Context
            </p>
            <div className="space-y-3 rounded-lg border bg-muted/20 p-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Channel
                </p>
                <p className="mt-1 text-sm font-medium">{conversation.channel}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Linked Product
                </p>
                <p className="mt-1 text-sm font-medium">{conversation.orderContext}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Status
                </p>
                <p className="mt-1 text-sm font-medium capitalize">{conversation.status}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Tags
            </p>
            <div className="flex flex-wrap gap-2">
              {conversation.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="gap-1 rounded-full">
                  <Tag className="size-3" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {latestCustomerMessage ? (
            <>
              <Separator />
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Latest customer update
                </p>
                <div className="rounded-lg border bg-muted/20 p-4">
                  <p className="text-sm leading-6">{latestCustomerMessage.content}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {new Date(latestCustomerMessage.timestamp).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </ScrollArea>
    </div>
  )
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-muted-foreground">
        <Icon className="size-4" />
      </div>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 text-sm font-medium">{value}</p>
      </div>
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
