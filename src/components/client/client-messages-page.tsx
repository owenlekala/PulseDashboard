"use client"

import { useMemo, useState } from "react"
import { Edit3Line } from "@mingcute/react"

import {
  ChatConversationList,
  ChatDetailsPanel,
  ChatMessageThread,
} from "@/components/admin/chat"
import { PageHeader, toast } from "@/components/shared"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  cannedReplies,
  demoChatConversations,
  type CannedReply,
  type ChatConversation,
} from "@/data/demo-chat-data"

const clientAssigneeOptions = ["Client Success", "Billing Desk", "Support Ops"]

export function ClientMessagesPage() {
  const [conversations, setConversations] = useState(demoChatConversations)
  const [activeConversationId, setActiveConversationId] = useState(
    demoChatConversations[0]?.id ?? ""
  )
  const [query, setQuery] = useState("")
  const [queue, setQueue] = useState<"all" | "open" | "pending">("all")
  const [composerMode, setComposerMode] = useState<"reply" | "note">("reply")
  const [draft, setDraft] = useState("")
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [newMessageOpen, setNewMessageOpen] = useState(false)
  const [newMessageSubject, setNewMessageSubject] = useState("")
  const [newMessageChannel, setNewMessageChannel] = useState<
    ChatConversation["channel"]
  >("In-app")
  const [newMessageBody, setNewMessageBody] = useState("")

  const filteredConversations = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    return conversations.filter((conversation) => {
      const matchesQueue =
        queue === "all" ? true : conversation.status === queue

      const matchesQuery =
        normalized === ""
          ? true
          : [
              conversation.subject,
              conversation.customer.name,
              conversation.customer.role,
              conversation.orderContext,
              ...conversation.tags,
            ]
              .join(" ")
              .toLowerCase()
              .includes(normalized)

      return matchesQueue && matchesQuery
    })
  }, [conversations, query, queue])

  const queueCounts = useMemo(
    () => ({
      all: conversations.length,
      open: conversations.filter((item) => item.status === "open").length,
      pending: conversations.filter((item) => item.status === "pending").length,
    }),
    [conversations]
  )

  const activeConversation =
    filteredConversations.find(
      (conversation) => conversation.id === activeConversationId
    ) ?? filteredConversations[0]

  const handleSend = () => {
    if (!activeConversation || !draft.trim()) {
      return
    }

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === activeConversation.id
          ? {
              ...conversation,
              messages: [
                ...conversation.messages,
                {
                  id: `msg_${Date.now()}`,
                  sender: "agent",
                  content: draft.trim(),
                  timestamp: new Date().toISOString(),
                  kind: composerMode === "note" ? "note" : "message",
                },
              ],
              unreadCount: 0,
              customerTyping: false,
            }
          : conversation
      )
    )
    setDraft("")
    toast.success(composerMode === "note" ? "Internal note saved" : "Reply sent")
    setComposerMode("reply")
  }

  const handleUseCannedReply = (reply: CannedReply) => {
    setComposerMode("reply")
    setDraft(reply.content)
  }

  const handleStatusChange = (status: ChatConversation["status"]) => {
    if (!activeConversation) return

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === activeConversation.id
          ? { ...conversation, status }
          : conversation
      )
    )
    toast.success(`Conversation marked ${status}`)
  }

  const handleAssigneeChange = (assignee: string) => {
    if (!activeConversation) return

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === activeConversation.id
          ? { ...conversation, assignee }
          : conversation
      )
    )
    toast.success(`Assigned to ${assignee}`)
  }

  const handleCreateMessage = () => {
    const subject = newMessageSubject.trim()
    const body = newMessageBody.trim()

    if (!subject || !body) {
      return
    }

    const createdConversation: ChatConversation = {
      id: `client_conv_${Date.now()}`,
      subject,
      channel: newMessageChannel,
      unreadCount: 0,
      priority: "normal",
      status: "open",
      assignee: "Client Success",
      orderContext: "Client workspace / General inquiry",
      tags: ["client"],
      customer: demoChatConversations[0].customer,
      messages: [
        {
          id: `client_msg_${Date.now()}`,
          sender: "customer",
          content: body,
          timestamp: new Date().toISOString(),
        },
      ],
      customerTyping: false,
    }

    setConversations((current) => [createdConversation, ...current])
    setActiveConversationId(createdConversation.id)
    setNewMessageSubject("")
    setNewMessageBody("")
    setNewMessageChannel("In-app")
    setNewMessageOpen(false)
    setQueue("all")
    setQuery("")
    toast.success("New message created")
  }

  if (!activeConversation) {
    return null
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Messages"
        description="A client-friendly messaging workspace with inbox, conversation thread, and account context."
        action={{
          label: "New message",
          onClick: () => setNewMessageOpen(true),
          icon: Edit3Line,
        }}
      />

      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <ChatConversationList
          conversations={filteredConversations}
          activeConversationId={activeConversation.id}
          query={query}
          queue={queue}
          counts={queueCounts}
          onQueryChange={setQuery}
          onQueueChange={setQueue}
          onSelectConversation={setActiveConversationId}
        />
        <ChatMessageThread
          conversation={activeConversation}
          draft={draft}
          composerMode={composerMode}
          cannedReplies={cannedReplies}
          onOpenDetails={() => setDetailsOpen(true)}
          onComposerModeChange={setComposerMode}
          onUseCannedReply={handleUseCannedReply}
          onDraftChange={setDraft}
          onSend={handleSend}
        />
      </div>

      <Sheet open={detailsOpen} onOpenChange={setDetailsOpen}>
        <SheetContent side="right" className="w-full max-w-md p-0">
          <SheetHeader className="border-b">
            <SheetTitle>Conversation details</SheetTitle>
            <SheetDescription>
              Contact details, ownership, and request context for this thread.
            </SheetDescription>
          </SheetHeader>
          <div className="p-4">
            <ChatDetailsPanel
              conversation={activeConversation}
              assigneeOptions={clientAssigneeOptions}
              onStatusChange={handleStatusChange}
              onAssigneeChange={handleAssigneeChange}
            />
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={newMessageOpen} onOpenChange={setNewMessageOpen}>
        <SheetContent side="right" className="w-full max-w-md p-0">
          <SheetHeader className="border-b">
            <SheetTitle>New message</SheetTitle>
            <SheetDescription>
              Start a fresh client conversation and it will appear in the inbox immediately.
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-5 p-4">
            <div className="space-y-2">
              <Label htmlFor="message-subject">Subject</Label>
              <Input
                id="message-subject"
                value={newMessageSubject}
                onChange={(event) => setNewMessageSubject(event.target.value)}
                placeholder="What do you need help with?"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message-channel">Channel</Label>
              <Select
                value={newMessageChannel}
                onValueChange={(value: ChatConversation["channel"]) =>
                  setNewMessageChannel(value)
                }
              >
                <SelectTrigger id="message-channel">
                  <SelectValue placeholder="Choose a channel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="In-app">In-app</SelectItem>
                  <SelectItem value="Email">Email</SelectItem>
                  <SelectItem value="Priority">Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message-body">Message</Label>
              <Textarea
                id="message-body"
                value={newMessageBody}
                onChange={(event) => setNewMessageBody(event.target.value)}
                placeholder="Share the issue or request you want the team to review..."
                className="min-h-36 resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setNewMessageOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateMessage}
                disabled={!newMessageSubject.trim() || !newMessageBody.trim()}
              >
                Create message
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
