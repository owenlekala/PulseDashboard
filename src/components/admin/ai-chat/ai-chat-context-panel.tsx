"use client"

import { Check, FileText, Layers3, Link2, Sparkles } from "lucide-react"

import type { AiWorkspaceAssistant, AiWorkspaceSession } from "@/data/demo-ai-chat-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface AiChatContextPanelProps {
  assistant: AiWorkspaceAssistant
  session: AiWorkspaceSession
  selectedModel: string
  availableModels: Array<{
    id: string
    label: string
    description: string
  }>
  onSelectModel: (value: string) => void
  onUseSuggestion: (value: string) => void
}

export function AiChatContextPanel({
  assistant,
  session,
  selectedModel,
  availableModels,
  onSelectModel,
  onUseSuggestion,
}: AiChatContextPanelProps) {
  return (
    <div className="flex h-[76vh] min-h-[680px] min-w-0 flex-col overflow-hidden rounded-2xl border bg-card px-5 py-5">
      <div className="space-y-1">
        <h2 className="text-base font-semibold">Context</h2>
        <p className="text-sm text-muted-foreground">
          Ground the AI response with assistant settings, linked sources, and prompt starters.
        </p>
      </div>

      <Separator className="my-5" />

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Assistant
        </p>
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-medium">{assistant.name}</p>
              <p className="text-sm text-muted-foreground">{assistant.description}</p>
            </div>
            <Badge variant="outline" className="rounded-full">
              {assistant.model}
            </Badge>
          </div>

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Model
            </p>
            <div className="space-y-2">
              {availableModels.map((model) => {
                const isSelected = model.id === selectedModel

                return (
                  <button
                    key={model.id}
                    type="button"
                    onClick={() => onSelectModel(model.id)}
                    className={cn(
                      "flex w-full items-start justify-between gap-3 rounded-xl border px-3 py-3 text-left transition-colors",
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border/70 hover:bg-muted/40"
                    )}
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{model.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {model.description}
                      </p>
                    </div>
                    <div
                      className={cn(
                        "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border",
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border"
                      )}
                    >
                      {isSelected ? <Check className="size-3.5" /> : null}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-5" />

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Linked context
        </p>
        <div className="space-y-3">
          {session.attachments.map((attachment) => (
            <div key={attachment.id} className="flex min-w-0 items-start gap-3">
              <div className="mt-0.5 text-muted-foreground">
                {attachment.kind === "dataset" ? (
                  <Layers3 className="size-4" />
                ) : attachment.kind === "policy" ? (
                  <Link2 className="size-4" />
                ) : (
                  <FileText className="size-4" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium">{attachment.label}</p>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {attachment.kind}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-5" />

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Prompt starters
        </p>
        <div className="space-y-2">
          {session.suggestedPrompts.map((prompt) => (
            <Button
              key={prompt}
              variant="outline"
              className="h-auto w-full min-w-0 justify-start whitespace-normal rounded-xl px-3 py-3 text-left"
              onClick={() => onUseSuggestion(prompt)}
            >
              <Sparkles className="mt-0.5 size-4 shrink-0" />
              <span className="min-w-0 whitespace-normal break-words">{prompt}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-5">
        <div className="rounded-xl bg-muted/30 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Session summary
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{session.summary}</p>
        </div>
      </div>
    </div>
  )
}
