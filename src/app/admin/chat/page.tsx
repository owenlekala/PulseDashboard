"use client"

import { useMemo, useState } from "react"
import { Sparkles } from "lucide-react"

import {
  ChatConversationList,
  ChatDetailsPanel,
  ChatMessageThread,
} from "@/components/admin/chat"
import { InsightCallout, PageHeader, toast } from "@/components/shared"
import { demoChatConversations } from "@/data/demo-chat-data"

export default function ChatPage() {
  const [conversations, setConversations] = useState(demoChatConversations)
  const [activeConversationId, setActiveConversationId] = useState(
    demoChatConversations[0]?.id ?? ""
  )
  const [query, setQuery] = useState("")
  const [draft, setDraft] = useState("")

  const filteredConversations = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    if (!normalized) {
      return conversations
    }

    return conversations.filter((conversation) =>
      [
        conversation.subject,
        conversation.customer.name,
        conversation.customer.role,
        conversation.orderContext,
        ...conversation.tags,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalized)
    )
  }, [conversations, query])

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
                },
              ],
              unreadCount: 0,
            }
          : conversation
      )
    )
    setDraft("")
    toast.success("Reply sent")
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

      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)_320px]">
        <ChatConversationList
          conversations={filteredConversations}
          activeConversationId={activeConversation.id}
          query={query}
          onQueryChange={setQuery}
          onSelectConversation={setActiveConversationId}
        />
        <ChatMessageThread
          conversation={activeConversation}
          draft={draft}
          onDraftChange={setDraft}
          onSend={handleSend}
        />
        <ChatDetailsPanel conversation={activeConversation} />
      </div>
    </div>
  )
}
