import { ActivityFeedItem } from "@/components/shared"

export interface BillingMetric {
  label: string
  value: string
  description: string
  trend?: {
    value: string
    direction?: "up" | "down" | "neutral"
  }
}

export interface BillingInvoice {
  id: string
  customer: string
  plan: string
  amount: string
  status: "paid" | "pending" | "failed"
  issuedAt: string
  dueAt: string
}

export interface PaymentMethod {
  id: string
  brand: string
  last4: string
  expires: string
  isDefault?: boolean
}

export interface BillingSubscription {
  plan: string
  amount: string
  billingCycle: string
  renewalDate: string
  seatsUsed: string
  usageSummary: string
}

export const billingMetrics: BillingMetric[] = [
  {
    label: "Monthly Recurring Revenue",
    value: "$48,240",
    description: "Tracked across active workspace subscriptions.",
    trend: {
      value: "+8.2%",
      direction: "up",
    },
  },
  {
    label: "Collection Rate",
    value: "96.4%",
    description: "Successful captures over the last 30 days.",
    trend: {
      value: "+1.3%",
      direction: "up",
    },
  },
  {
    label: "Open Invoices",
    value: "28",
    description: "Pending payment and scheduled reminders.",
    trend: {
      value: "-4",
      direction: "down",
    },
  },
  {
    label: "At-Risk Revenue",
    value: "$3,920",
    description: "Revenue tied to failed cards and past-due accounts.",
    trend: {
      value: "-11%",
      direction: "down",
    },
  },
]

export const billingSubscription: BillingSubscription = {
  plan: "Growth Annual",
  amount: "$1,280 / month",
  billingCycle: "Billed annually with quarterly true-up",
  renewalDate: "September 12, 2026",
  seatsUsed: "86 of 100 seats",
  usageSummary: "Additional overage billing starts after 100 seats.",
}

export const billingPaymentMethods: PaymentMethod[] = [
  {
    id: "pm_1",
    brand: "Visa",
    last4: "4242",
    expires: "08/28",
    isDefault: true,
  },
  {
    id: "pm_2",
    brand: "Mastercard",
    last4: "4444",
    expires: "01/27",
  },
  {
    id: "pm_3",
    brand: "Corporate ACH",
    last4: "1024",
    expires: "Verified",
  },
]

export const billingInvoices: BillingInvoice[] = [
  {
    id: "INV-24091",
    customer: "Northstar Labs",
    plan: "Growth Annual",
    amount: "$1,280.00",
    status: "paid",
    issuedAt: "Apr 02, 2026",
    dueAt: "Apr 05, 2026",
  },
  {
    id: "INV-24090",
    customer: "Apex Commerce",
    plan: "Scale Monthly",
    amount: "$940.00",
    status: "pending",
    issuedAt: "Apr 06, 2026",
    dueAt: "Apr 20, 2026",
  },
  {
    id: "INV-24088",
    customer: "Verve Health",
    plan: "Starter Monthly",
    amount: "$320.00",
    status: "failed",
    issuedAt: "Apr 08, 2026",
    dueAt: "Apr 12, 2026",
  },
  {
    id: "INV-24084",
    customer: "Summit Fleet",
    plan: "Growth Annual",
    amount: "$1,280.00",
    status: "paid",
    issuedAt: "Apr 10, 2026",
    dueAt: "Apr 14, 2026",
  },
]

export const billingActivity: ActivityFeedItem[] = [
  {
    id: "billing-1",
    title: "Failed renewal flagged",
    description:
      "Verve Health card payment failed and an automated recovery email was sent.",
    time: "12 minutes ago",
    status: "warning",
  },
  {
    id: "billing-2",
    title: "Annual contract renewed",
    description:
      "Northstar Labs renewed its Growth Annual plan with a confirmed payment method.",
    time: "1 hour ago",
    status: "success",
  },
  {
    id: "billing-3",
    title: "Usage threshold approaching",
    description:
      "Current seat usage crossed 86% and the customer success team was notified.",
    time: "Today, 09:24",
    status: "info",
  },
]

