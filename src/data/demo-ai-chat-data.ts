export interface AiWorkspaceAssistant {
  id: string
  name: string
  description: string
  tone: "analysis" | "operations" | "creative"
  model: string
}

export interface AiWorkspaceAttachment {
  id: string
  label: string
  kind: "dataset" | "brief" | "policy"
}

export interface AiWorkspaceMessage {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: string
}

export interface AiWorkspaceSession {
  id: string
  title: string
  assistantId: string
  status: "live" | "draft" | "completed"
  updatedAt: string
  tags: string[]
  attachments: AiWorkspaceAttachment[]
  summary: string
  suggestedPrompts: string[]
  messages: AiWorkspaceMessage[]
}

export const demoAiAssistants: AiWorkspaceAssistant[] = [
  {
    id: "ops-copilot",
    name: "Ops Copilot",
    description: "Summarizes signals, drafts next steps, and keeps operational work moving.",
    tone: "operations",
    model: "GPT-5.4",
  },
  {
    id: "insight-analyst",
    name: "Insight Analyst",
    description: "Turns dashboard context into concise analysis, comparisons, and trend takeaways.",
    tone: "analysis",
    model: "GPT-5.4",
  },
  {
    id: "launch-writer",
    name: "Launch Writer",
    description: "Creates product messaging, release notes, and support-ready drafts.",
    tone: "creative",
    model: "GPT-5.4 Mini",
  },
]

export const demoAiSessions: AiWorkspaceSession[] = [
  {
    id: "ai_001",
    title: "Weekly exec summary for finance and ops",
    assistantId: "insight-analyst",
    status: "live",
    updatedAt: "2026-04-23T09:25:00.000Z",
    tags: ["weekly report", "finance", "ops"],
    attachments: [
      { id: "att_1", label: "Revenue Monitor dashboard", kind: "dataset" },
      { id: "att_2", label: "Ops incident digest", kind: "brief" },
    ],
    summary:
      "Blends finance movement with operational exceptions into one leadership-ready summary.",
    suggestedPrompts: [
      "Summarize the main shifts in finance and operations this week.",
      "Give me 3 risks leaders should watch before Monday.",
      "Turn this into a concise executive email.",
    ],
    messages: [
      {
        id: "aimsg_001",
        role: "system",
        content: "Insight Analyst is ready with revenue, operations, and workflow context.",
        timestamp: "2026-04-23T09:10:00.000Z",
      },
      {
        id: "aimsg_002",
        role: "user",
        content:
          "Pull the main narrative from this week's finance and operations signals. I need something leadership can scan quickly.",
        timestamp: "2026-04-23T09:11:00.000Z",
      },
      {
        id: "aimsg_003",
        role: "assistant",
        content:
          "This week shows stable revenue performance with one notable recovery opportunity: invoice exceptions fell, but unresolved operations escalations increased around response routing. The strongest leadership takeaway is that finance execution improved while operational follow-through created new pressure on turnaround expectations.",
        timestamp: "2026-04-23T09:12:00.000Z",
      },
      {
        id: "aimsg_004",
        role: "user",
        content: "Turn that into 3 bullets and a short recommendation section.",
        timestamp: "2026-04-23T09:18:00.000Z",
      },
      {
        id: "aimsg_005",
        role: "assistant",
        content:
          "1. Revenue workflows stabilized, with fewer invoice exceptions and smoother export recovery. 2. Operations queues remained active, but escalations clustered around delayed owner follow-through. 3. Cross-team coordination improved in finance, yet operational handoffs still threaten response-time targets.\n\nRecommendation: focus next week on escalation ownership clarity, preserve the finance export gains, and tighten the review loop for unresolved queue items.",
        timestamp: "2026-04-23T09:19:00.000Z",
      },
    ],
  },
  {
    id: "ai_002",
    title: "Draft onboarding message for Access Shield launch",
    assistantId: "launch-writer",
    status: "draft",
    updatedAt: "2026-04-22T16:40:00.000Z",
    tags: ["launch", "security", "customer messaging"],
    attachments: [
      { id: "att_3", label: "Launch brief", kind: "brief" },
      { id: "att_4", label: "Permission audit policy", kind: "policy" },
    ],
    summary:
      "Creates a customer-facing launch note for the new security workflow release.",
    suggestedPrompts: [
      "Write a welcome message for admins trying Access Shield for the first time.",
      "Shorten this for an in-app banner.",
      "Make the tone more operational and less promotional.",
    ],
    messages: [
      {
        id: "aimsg_006",
        role: "user",
        content:
          "Write a short onboarding message for customers activating Access Shield this week.",
        timestamp: "2026-04-22T16:30:00.000Z",
      },
      {
        id: "aimsg_007",
        role: "assistant",
        content:
          "Access Shield is now ready in your admin workspace. Start by reviewing role access, flagging unusual permission changes, and assigning one owner to monitor your first audit cycle.",
        timestamp: "2026-04-22T16:31:00.000Z",
      },
    ],
  },
  {
    id: "ai_003",
    title: "Triage queue for failed automation runs",
    assistantId: "ops-copilot",
    status: "completed",
    updatedAt: "2026-04-21T11:05:00.000Z",
    tags: ["automation", "triage"],
    attachments: [{ id: "att_5", label: "Workflow failure export", kind: "dataset" }],
    summary:
      "Grouped automation failures by cause and proposed an operator response order.",
    suggestedPrompts: [
      "Show me the top 3 failure groups again.",
      "Draft a recovery checklist for operators.",
    ],
    messages: [
      {
        id: "aimsg_008",
        role: "user",
        content:
          "Group the failed automation runs by likely cause and tell me what the team should address first.",
        timestamp: "2026-04-21T10:45:00.000Z",
      },
      {
        id: "aimsg_009",
        role: "assistant",
        content:
          "The highest-volume issue is missing approval owners, followed by outdated routing rules and timeout-heavy third-party callbacks. Address ownership gaps first because they block the largest portion of recoverable runs with the least system-level change.",
        timestamp: "2026-04-21T10:46:00.000Z",
      },
    ],
  },
]
