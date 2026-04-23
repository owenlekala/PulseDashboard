"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { InfoList, SectionCard } from "@/components/shared"
import type { BillingSubscription } from "@/data/demo-billing-data"

interface BillingSubscriptionCardProps {
  subscription: BillingSubscription
}

export function BillingSubscriptionCard({
  subscription,
}: BillingSubscriptionCardProps) {
  const seatUsageMatch = subscription.seatsUsed.match(/^(\d+) of (\d+)/)
  const usageValue = seatUsageMatch
    ? Math.round((Number(seatUsageMatch[1]) / Number(seatUsageMatch[2])) * 100)
    : 0

  return (
    <SectionCard
      title="Subscription Overview"
      description="Use this section for plan state, renewal timing, and billing entitlements."
      actions={
        <>
          <Button variant="outline" size="sm">
            Change plan
          </Button>
          <Button size="sm">Update billing</Button>
        </>
      }
    >
      <div className="space-y-5">
        <InfoList
          items={[
            { label: "Current Plan", value: subscription.plan },
            { label: "Amount", value: subscription.amount },
            { label: "Billing Cycle", value: subscription.billingCycle },
            { label: "Renewal Date", value: subscription.renewalDate },
          ]}
        />
        <div className="rounded-md border bg-muted/20 p-4">
          <div className="mb-2 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium">Seat usage</p>
              <p className="text-sm text-muted-foreground">
                {subscription.usageSummary}
              </p>
            </div>
            <p className="text-sm font-semibold">{subscription.seatsUsed}</p>
          </div>
          <Progress value={usageValue} />
        </div>
      </div>
    </SectionCard>
  )
}
