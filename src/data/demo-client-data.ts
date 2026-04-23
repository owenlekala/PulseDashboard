import type { ActivityFeedItem, InfoListItem } from "@/components/shared"

export interface ClientNavQuickLink {
  label: string
  href: string
  description: string
}

export interface ClientConversation {
  id: string
  subject: string
  preview: string
  status: "Open" | "Pending" | "Resolved"
  updatedAt: string
}

export interface ClientInvoice {
  id: string
  amount: string
  issuedAt: string
  status: "Paid" | "Pending" | "Failed"
}

export interface ClientPreference {
  id: string
  label: string
  description: string
  enabled: boolean
}

export interface ClientSubscriptionPackage {
  name: string
  subtitle: string
  amount: string
  billingCycle: string
  renewalDate: string
  seatsUsed: string
  seatLimitNote: string
  features: string[]
}

export interface ClientAccountStatus {
  workspaceStatus: string
  workspaceStatusNote: string
  planName: string
  billingState: string
  billingStateNote: string
  ownerName: string
  ownerEmail: string
  region: string
  nextReviewDate: string
}

export const clientUser = {
  name: "Ariana Cole",
  email: "ariana@northstarlabs.com",
  role: "Finance Director",
  company: "Northstar Labs",
  avatar: "/avatar.png",
}

export const clientOverviewMetrics = [
  {
    label: "Workspace health",
    value: "92%",
    description: "System checks and billing access are operating normally.",
    trend: {
      value: "+4.2%",
      direction: "up" as const,
    },
  },
  {
    label: "Open requests",
    value: "6",
    description: "Client-side support and billing requests awaiting follow-up.",
    trend: {
      value: "-2",
      direction: "down" as const,
    },
  },
  {
    label: "Plan utilization",
    value: "86 / 100",
    description: "Seats currently assigned across your workspace.",
    trend: {
      value: "14 left",
      direction: "neutral" as const,
    },
  },
]

export const clientQuickLinks: ClientNavQuickLink[] = [
  {
    label: "Review billing",
    href: "/client/billing",
    description: "Check invoices, payment methods, and your current plan.",
  },
  {
    label: "Open messages",
    href: "/client/messages",
    description: "Track support conversations and recent replies.",
  },
  {
    label: "Manage settings",
    href: "/client/settings",
    description: "Update profile details and notification preferences.",
  },
]

export const clientAccountStatus: ClientAccountStatus = {
  workspaceStatus: "Active",
  workspaceStatusNote:
    "Billing access, workspace permissions, and exports are all operating normally.",
  planName: "Growth Annual",
  billingState: "In good standing",
  billingStateNote:
    "Your default payment method is verified and the next renewal is already scheduled.",
  ownerName: "Ariana Cole",
  ownerEmail: "ariana@northstarlabs.com",
  region: "Johannesburg",
  nextReviewDate: "September 12, 2026",
}

export const clientActivity: ActivityFeedItem[] = [
  {
    id: "client-activity-1",
    title: "Invoice export request updated",
    description:
      "Your finance export issue was acknowledged and moved into active review.",
    time: "18 minutes ago",
    status: "info",
  },
  {
    id: "client-activity-2",
    title: "Payment method verified",
    description:
      "The default Visa ending in 4242 passed verification for the next billing cycle.",
    time: "Today, 09:24",
    status: "success",
  },
  {
    id: "client-activity-3",
    title: "Seat threshold approaching",
    description:
      "You are nearing your seat cap. Add capacity before onboarding the next team batch.",
    time: "Yesterday, 16:05",
    status: "warning",
  },
]

export const clientSubscriptionDetails: InfoListItem[] = [
  {
    label: "Current plan",
    value: "Growth Annual",
  },
  {
    label: "Monthly equivalent",
    value: "$1,280 / month",
  },
  {
    label: "Billing cycle",
    value: "Annual with quarterly true-up",
  },
  {
    label: "Seat usage",
    value: "86 of 100 seats",
  },
]

export const clientSubscriptionPackage: ClientSubscriptionPackage = {
  name: "Growth Annual",
  subtitle: "Your active package for finance, billing, and support workflows.",
  amount: "$1,280 / month",
  billingCycle: "Billed annually with quarterly true-up",
  renewalDate: "September 12, 2026",
  seatsUsed: "86 of 100 seats used",
  seatLimitNote: "Additional usage starts billing after 100 seats.",
  features: [
    "Priority billing support",
    "Quarterly usage true-up",
    "Shared client workspace access",
    "Export and reporting workflows",
  ],
}

export const clientPaymentMethodDetails: InfoListItem[] = [
  {
    label: "Default card",
    value: "Visa ending in 4242",
  },
  {
    label: "Backup method",
    value: "Corporate ACH",
  },
  {
    label: "Billing contact",
    value: "finance@northstarlabs.com",
  },
  {
    label: "Next renewal",
    value: "September 12, 2026",
  },
]

export const clientInvoices: ClientInvoice[] = [
  {
    id: "INV-24091",
    amount: "$1,280.00",
    issuedAt: "Apr 02, 2026",
    status: "Paid",
  },
  {
    id: "INV-24090",
    amount: "$940.00",
    issuedAt: "Apr 06, 2026",
    status: "Pending",
  },
  {
    id: "INV-24088",
    amount: "$320.00",
    issuedAt: "Apr 08, 2026",
    status: "Failed",
  },
]

export const clientConversations: ClientConversation[] = [
  {
    id: "conv-1",
    subject: "Invoice export is missing April transactions",
    preview:
      "We are checking the April dataset partition and will confirm the rerun window shortly.",
    status: "Open",
    updatedAt: "10 minutes ago",
  },
  {
    id: "conv-2",
    subject: "Seat expansion request for Access Shield",
    preview:
      "Your seat increase request has been reviewed and is ready for billing approval.",
    status: "Pending",
    updatedAt: "Today, 11:40",
  },
  {
    id: "conv-3",
    subject: "Onboarding guidance for operations managers",
    preview:
      "We shared the recommended dashboard setup sequence for your team leads.",
    status: "Resolved",
    updatedAt: "Yesterday, 15:10",
  },
]

export const clientSettingsDetails: InfoListItem[] = [
  {
    label: "Full name",
    value: clientUser.name,
  },
  {
    label: "Email",
    value: clientUser.email,
  },
  {
    label: "Role",
    value: clientUser.role,
  },
  {
    label: "Company",
    value: clientUser.company,
  },
]

export const clientPreferences: ClientPreference[] = [
  {
    id: "pref-1",
    label: "Billing reminders",
    description: "Receive invoice reminders before the renewal window opens.",
    enabled: true,
  },
  {
    id: "pref-2",
    label: "Support updates",
    description: "Get notified whenever a support thread status changes.",
    enabled: true,
  },
  {
    id: "pref-3",
    label: "Product announcements",
    description: "Receive release notes and new feature availability updates.",
    enabled: false,
  },
]
