"use client"

import { useMemo, useState } from "react"
import { Sparkles } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  ChatConversationList,
  ChatDetailsPanel,
  ChatMessageThread,
} from "@/components/admin/chat"
import { InsightCallout, PageHeader, toast } from "@/components/shared"
import { cannedReplies, demoChatConversations, type CannedReply } from "@/data/demo-chat-data"

export default function ChatPage() {
  const [conversations, setConversations] = useState(demoChatConversations)
  const [activeConversationId, setActiveConversationId] = useState(
    demoChatConversations[0]?.id ?? ""
  )
  const [query, setQuery] = useState("")
  const [queue, setQueue] = useState<"all" | "open" | "pending">("all")
  const [composerMode, setComposerMode] = useState<"reply" | "note">("reply")
  const [draft, setDraft] = useState("")
  const [detailsOpen, setDetailsOpen] = useState(false)
  const assigneeOptions = ["Maya Stone", "Samir Patel", "Jordan Lee", "Nina Brooks"]

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

  const handleStatusChange = (status: "open" | "pending" | "resolved") => {
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

  if (!activeConversation) {
    return null
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Chat"
        description="A professional support and customer conversation workspace with queue, thread, and context rails."
      />

      <InsightCallout
        tone="tip"
        title="Priority billing conversations now route to the finance support queue"
        description="Use a top-level callout for workflow updates, queue signals, or chat policy changes that operators need to see before handling threads."
        icon={Sparkles}
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
            <SheetTitle>Conversation Details</SheetTitle>
            <SheetDescription>
              Customer context, ownership, and linked workflow metadata.
            </SheetDescription>
          </SheetHeader>
          <div className="p-4">
            <ChatDetailsPanel
              conversation={activeConversation}
              assigneeOptions={assigneeOptions}
              onStatusChange={handleStatusChange}
              onAssigneeChange={handleAssigneeChange}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
