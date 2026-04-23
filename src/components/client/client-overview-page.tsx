"use client"

import Link from "next/link"

import {
  ActivityFeed,
  KpiCard,
  PageHeader,
} from "@/components/shared"
import {
  GlassCard,
  GlassCardContent,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle,
} from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import {
  clientActivity,
  clientOverviewMetrics,
} from "@/data/demo-client-data"

export function ClientOverviewPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Client overview"
        description="A clean snapshot of account health, recent actions, and the next places you are likely to visit."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {clientOverviewMetrics.map((item) => (
          <KpiCard
            key={item.label}
            label={item.label}
            value={item.value}
            description={item.description}
            trend={item.trend}
          />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <GlassCard outerTitle="Recent activity">
          <GlassCardContent>
            <GlassCardHeader>
              <GlassCardTitle>Latest account updates</GlassCardTitle>
              <GlassCardDescription>
                See recent billing, support, and account events affecting your workspace.
              </GlassCardDescription>
            </GlassCardHeader>
            <ActivityFeed items={clientActivity} />
          </GlassCardContent>
        </GlassCard>

        <div className="space-y-4 rounded-2xl border bg-card p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-1">
              <h2 className="text-base font-semibold tracking-tight">
                Need help fast?
              </h2>
              <p className="text-sm text-muted-foreground">
                Open the message center or review your billing details in one click.
              </p>
            </div>
            <Button asChild size="sm" variant="outline">
              <Link href="/client/messages">Open messages</Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Client support, billing questions, and account updates are all grouped in the new client area so you can find them quickly.
          </p>
        </div>
      </div>
    </div>
  )
}
