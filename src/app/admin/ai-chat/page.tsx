"use client"

import { useMemo, useState } from "react"

import {
  AiChatContextPanel,
  AiChatHistoryTabs,
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

  const handleUseSuggestion = (value: string) => {
    setDraft(value)
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
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <AiChatThread
            assistant={activeAssistant}
            session={activeSession}
            draft={draft}
            mode={mode}
            onModeChange={setMode}
            onDraftChange={setDraft}
            onSend={handleSend}
            onUseSuggestion={handleUseSuggestion}
          />
          <AiChatHistoryTabs
            sessions={filteredSessions}
            activeSessionId={activeSession.id}
            query={query}
            filter={filter}
            onQueryChange={setQuery}
            onFilterChange={setFilter}
            onSelectSession={setActiveSessionId}
          />
        </div>
        <AiChatContextPanel
          assistant={activeAssistant}
          session={activeSession}
          selectedModel={selectedModel}
          availableModels={[...aiModels]}
          onSelectModel={setSelectedModel}
          onUseSuggestion={handleUseSuggestion}
        />
      </div>
    </div>
  )
}
