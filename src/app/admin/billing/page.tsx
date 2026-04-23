"use client"

import { BillLine, SafeLockLine } from "@mingcute/react"

import {
  BillingInvoicesTable,
  BillingPaymentMethods,
  BillingSubscriptionCard,
  BillingSummaryCards,
} from "@/components/admin/billing"
import {
  ActivityFeed,
  InsightCallout,
  PageHeader,
  SectionCard,
} from "@/components/shared"
import {
  billingActivity,
  billingInvoices,
  billingMetrics,
  billingPaymentMethods,
  billingSubscription,
} from "@/data/demo-billing-data"

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Billing Management"
        description="A showcase billing workspace for subscriptions, payment recovery, and invoice operations."
      />

      <InsightCallout
        tone="warning"
        title="Three accounts need payment follow-up this week"
        description="Use billing callouts for renewal risk, failed captures, or policy updates that need operator attention."
      />

      <BillingSummaryCards items={billingMetrics} />

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
        <BillingSubscriptionCard subscription={billingSubscription} />
        <div className="space-y-6">
          <SectionCard
            title="Billing Controls"
            description="Utility surfaces for payment governance and policy actions."
            icon={undefined}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-md border bg-muted/20 p-4">
                <div className="mb-2 text-muted-foreground">
                  <BillLine className="size-5" />
                </div>
                <p className="text-sm font-medium">Invoice automation</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Automatic reminders are enabled for pending invoices after 3 and 7 days.
                </p>
              </div>
              <div className="rounded-md border bg-muted/20 p-4">
                <div className="mb-2 text-muted-foreground">
                  <SafeLockLine className="size-5" />
                </div>
                <p className="text-sm font-medium">Billing permissions</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Finance admins can update methods, export invoices, and retry failed payments.
                </p>
              </div>
            </div>
          </SectionCard>

          <BillingPaymentMethods methods={billingPaymentMethods} />
        </div>
      </div>

      <BillingInvoicesTable invoices={billingInvoices} />

      <SectionCard
        title="Billing Activity"
        description="Operational events that make the billing area feel like a real admin workflow."
      >
        <ActivityFeed items={billingActivity} />
      </SectionCard>
    </div>
  )
}
