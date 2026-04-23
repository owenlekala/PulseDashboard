"use client"

import { useMemo, useState } from "react"
import { History, Plus } from "lucide-react"

import {
  AiChatHistorySheet,
  AiChatThread,
} from "@/components/admin/ai-chat"
import { PageHeader, toast } from "@/components/shared"
import {
  demoAiAssistants,
  demoAiSessions,
  type AiWorkspaceMessage,
} from "@/data/demo-ai-chat-data"

const aiModels = [
  {
    id: "gpt-5.4",
    label: "GPT-5.4",
    description: "Best for deeper reasoning, higher-stakes drafting, and stronger synthesis.",
  },
  {
    id: "gpt-5.4-mini",
    label: "GPT-5.4 Mini",
    description: "Faster and lighter for everyday chat, rewrites, and quick operational output.",
  },
  {
    id: "gpt-4.1",
    label: "GPT-4.1",
    description: "Stable general-purpose fallback for concise work and predictable responses.",
  },
] as const

export default function AiChatPage() {
  const [sessions, setSessions] = useState(demoAiSessions)
  const [activeSessionId, setActiveSessionId] = useState(demoAiSessions[0]?.id ?? "")
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "live" | "draft">("all")
  const [mode, setMode] = useState<"chat" | "prompt">("chat")
  const [draft, setDraft] = useState("")
  const [selectedModel, setSelectedModel] = useState<string>(aiModels[0].id)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const filteredSessions = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    return sessions.filter((session) => {
      const matchesFilter = filter === "all" ? true : session.status === filter
      const matchesQuery =
        normalized === ""
          ? true
          : [session.title, session.summary, ...session.tags]
              .join(" ")
              .toLowerCase()
              .includes(normalized)

      return matchesFilter && matchesQuery
    })
  }, [filter, query, sessions])

  const activeSession =
    filteredSessions.find((session) => session.id === activeSessionId) ?? filteredSessions[0]

  const activeAssistant = demoAiAssistants.find(
    (assistant) => assistant.id === activeSession?.assistantId
  )
  const isNewChat =
    activeSession.messages.length === 1 && activeSession.messages[0]?.role === "system"

  const handleNewChat = () => {
    const assistant = demoAiAssistants[0]
    const nextId = `ai_${Date.now()}`
    const newSession = {
      id: nextId,
      title: "New chat",
      assistantId: assistant.id,
      status: "draft" as const,
      updatedAt: new Date().toISOString(),
      tags: ["new"],
      attachments: [],
      summary: "Fresh AI workspace ready for a new conversation.",
      suggestedPrompts: [
        "Summarize what I need help with and suggest the best next step.",
        "Turn my rough notes into a clearer prompt.",
      ],
      messages: [
        {
          id: `ai_system_${Date.now()}`,
          role: "system" as const,
          content: `${assistant.name} is ready for a new conversation.`,
          timestamp: new Date().toISOString(),
        },
      ],
    }

    setSessions((current) => [newSession, ...current])
    setActiveSessionId(nextId)
    setDraft("")
    setMode("chat")
    setHistoryOpen(false)
    toast.success("New chat started")
  }

  const handleSend = () => {
    if (!activeSession || !activeAssistant || !draft.trim()) {
      return
    }

    const now = new Date().toISOString()
    const userMessage: AiWorkspaceMessage = {
      id: `ai_user_${Date.now()}`,
      role: "user",
      content: draft.trim(),
      timestamp: now,
    }
    const assistantMessage: AiWorkspaceMessage = {
      id: `ai_assistant_${Date.now() + 1}`,
      role: "assistant",
      content:
        mode === "prompt"
          ? `Here is a tighter prompt scaffold for ${activeAssistant.name}: objective, relevant context, required output format, key constraints, and the final decision you want from the model. Use this as the next iteration and adjust tone for the audience.`
          : `${activeAssistant.name} would respond by summarizing the request, identifying the most relevant context from the linked sources, and producing an actionable draft with the clearest next step first.`,
      timestamp: new Date(Date.now() + 60 * 1000).toISOString(),
    }

    setSessions((current) =>
      current.map((session) =>
        session.id === activeSession.id
          ? {
              ...session,
              status: "live",
              updatedAt: now,
              messages: [...session.messages, userMessage, assistantMessage],
            }
          : session
      )
    )

    setDraft("")
    toast.success(mode === "prompt" ? "Prompt refined" : "AI response generated")
  }

  if (!activeSession || !activeAssistant) {
    return null
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Chat"
        description="A workspace for reasoning, drafting, and context-grounded AI collaboration across the admin product."
        actions={[
          {
            label: "History",
            onClick: () => setHistoryOpen(true),
            icon: History,
            variant: "outline",
          },
          {
            label: "New chat",
            onClick: handleNewChat,
            icon: Plus,
          },
        ]}
      />

      {!expanded ? (
        <AiChatThread
          assistant={activeAssistant}
          session={activeSession}
          isNewChat={isNewChat}
          expanded={expanded}
          selectedModel={selectedModel}
          availableModels={aiModels.map((model) => ({ id: model.id, label: model.label }))}
          onExpandedChange={setExpanded}
          onSelectModel={setSelectedModel}
          draft={draft}
          mode={mode}
          onModeChange={setMode}
          onDraftChange={setDraft}
          onSend={handleSend}
          className="border-none bg-transparent"
        />
      ) : null}

      <AiChatHistorySheet
        open={historyOpen}
        onOpenChange={setHistoryOpen}
        sessions={filteredSessions}
        activeSessionId={activeSession.id}
        query={query}
        filter={filter}
        onQueryChange={setQuery}
        onFilterChange={setFilter}
        onSelectSession={setActiveSessionId}
      />

      {expanded ? (
        <div className="fixed inset-0 z-40 bg-background">
          <div className="mx-auto flex h-full w-full max-w-[1600px] items-stretch px-6 pb-6 pt-24">
            <AiChatThread
              assistant={activeAssistant}
              session={activeSession}
              isNewChat={isNewChat}
              expanded={expanded}
              selectedModel={selectedModel}
              availableModels={aiModels.map((model) => ({ id: model.id, label: model.label }))}
              onExpandedChange={setExpanded}
              onSelectModel={setSelectedModel}
              draft={draft}
              mode={mode}
              onModeChange={setMode}
              onDraftChange={setDraft}
              onSend={handleSend}
              className="h-full min-h-0 w-full border-none bg-transparent shadow-none"
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}
