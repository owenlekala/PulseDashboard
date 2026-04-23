export interface ChatParticipant {
  id: string
  name: string
  role: string
  avatar: string
  status: "online" | "away" | "offline"
  email: string
  timezone: string
}

export interface ChatMessage {
  id: string
  sender: "agent" | "customer" | "system"
  content: string
  timestamp: string
  kind?: "message" | "note"
}

export interface ChatConversation {
  id: string
  subject: string
  channel: "In-app" | "Email" | "Priority"
  unreadCount: number
  priority: "normal" | "high"
  status: "open" | "pending" | "resolved"
  assignee: string
  customer: ChatParticipant
  orderContext: string
  tags: string[]
  customerTyping?: boolean
  messages: ChatMessage[]
}

export interface CannedReply {
  id: string
  label: string
  content: string
}

export const demoChatConversations: ChatConversation[] = [
  {
    id: "conv_001",
    subject: "Invoice export is missing April transactions",
    channel: "Priority",
    unreadCount: 2,
    priority: "high",
    status: "open",
    assignee: "Maya Stone",
    orderContext: "Finance workspace / Revenue Monitor",
    tags: ["billing", "export", "vip"],
    customer: {
      id: "cust_01",
      name: "Ariana Cole",
      role: "Finance Director",
      avatar: "/avatar.png",
      status: "online",
      email: "ariana@northstarlabs.com",
      timezone: "GMT+2",
    },
    messages: [
      {
        id: "msg_001",
        sender: "customer",
        content:
          "The scheduled export completed, but the April transactions tab is empty. We need the finance report before end of day.",
        timestamp: "2026-04-23T08:14:00.000Z",
      },
      {
        id: "msg_002",
        sender: "agent",
        content:
          "I’m checking the export job logs now. I’ll confirm whether the dataset or the workbook render step dropped those rows.",
        timestamp: "2026-04-23T08:18:00.000Z",
        kind: "message",
      },
      {
        id: "msg_003",
        sender: "customer",
        content:
          "Thank you. We also noticed the CSV version has the same issue, so it may be upstream.",
        timestamp: "2026-04-23T08:21:00.000Z",
        kind: "message",
      },
      {
        id: "msg_004",
        sender: "system",
        content: "Priority escalated for finance workspace account.",
        timestamp: "2026-04-23T08:24:00.000Z",
      },
      {
        id: "msg_004b",
        sender: "agent",
        content:
          "Internal note: finance export issue appears related to the April dataset partition. Engineering escalation prepared if re-run fails.",
        timestamp: "2026-04-23T08:27:00.000Z",
        kind: "note",
      },
    ],
    customerTyping: true,
  },
  {
    id: "conv_002",
    subject: "Need help onboarding our operations managers",
    channel: "In-app",
    unreadCount: 0,
    priority: "normal",
    status: "pending",
    assignee: "Samir Patel",
    orderContext: "Ops Command Center",
    tags: ["onboarding", "training"],
    customer: {
      id: "cust_02",
      name: "Jonas Reid",
      role: "Operations Lead",
      avatar: "/avatar.png",
      status: "away",
      email: "jonas@apexcommerce.io",
      timezone: "UTC-5",
    },
    messages: [
      {
        id: "msg_005",
        sender: "customer",
        content:
          "We’ve invited our managers, but they’re unsure which workspace views they should use first.",
        timestamp: "2026-04-22T14:06:00.000Z",
      },
      {
        id: "msg_006",
        sender: "agent",
        content:
          "I can send a recommended setup sequence for queue monitoring, escalation routing, and morning review dashboards.",
        timestamp: "2026-04-22T14:11:00.000Z",
        kind: "message",
      },
    ],
  },
  {
    id: "conv_003",
    subject: "Seat limit reached for Access Shield",
    channel: "Email",
    unreadCount: 1,
    priority: "normal",
    status: "open",
    assignee: "Maya Stone",
    orderContext: "Security / Access Shield",
    tags: ["license", "seats"],
    customer: {
      id: "cust_03",
      name: "Mina Hassan",
      role: "Security Admin",
      avatar: "/avatar.png",
      status: "offline",
      email: "mina@vervehealth.com",
      timezone: "UTC+1",
    },
    messages: [
      {
        id: "msg_007",
        sender: "customer",
        content:
          "We need to add 12 more users today, but the admin area says we’ve hit our seat limit.",
        timestamp: "2026-04-23T06:40:00.000Z",
      },
      {
        id: "msg_008",
        sender: "agent",
        content:
          "I can help with an immediate seat expansion and confirm whether your renewal plan should be adjusted at the same time.",
        timestamp: "2026-04-23T06:52:00.000Z",
        kind: "message",
      },
    ],
  },
]

export const cannedReplies: CannedReply[] = [
  {
    id: "reply_1",
    label: "Acknowledge issue",
    content:
      "Thanks for flagging this. I’m reviewing the issue now and will share the next update shortly.",
  },
  {
    id: "reply_2",
    label: "Need more detail",
    content:
      "Could you share a screenshot or the exact step where this happens? That will help us narrow it down faster.",
  },
  {
    id: "reply_3",
    label: "Escalation started",
    content:
      "I’ve escalated this to the appropriate team and I’ll keep ownership of the conversation until we have a confirmed resolution.",
  },
]
