"use client"

import { ArrowDownRight, ArrowUpRight, ShieldAlert, Users } from "lucide-react"

import { PageHeader, InlineTrend, KpiCard } from "@/components/shared"

export default function ShowcaseSurfacesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Surfaces & Metrics"
        description="Shared KPI and trend components for dashboard and admin summary surfaces."
        backHref="/admin/showcase"
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <KpiCard
          label="Monthly Revenue"
          value="$82.4k"
          description="Revenue performance in the current billing cycle."
          trend={{ value: "12.4%", direction: "up", icon: ArrowUpRight }}
        />
        <KpiCard
          label="Open Reviews"
          value="24"
          description="Accounts requiring manual validation this week."
          icon={ShieldAlert}
          iconClassName="text-amber-600 dark:text-amber-400"
        />
        <KpiCard
          label="Active Users"
          value="2,351"
          description="Workspace users active in the last seven days."
          icon={Users}
          iconClassName="text-blue-600 dark:text-blue-400"
        />
      </div>
      <div className="rounded-lg border bg-card p-4">
        <h2 className="text-sm font-medium">Inline Trend</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Use plain inline trend indicators instead of chip-style percentage badges in glass cards.
        </p>
        <div className="flex flex-wrap gap-4">
          <InlineTrend value="12.4%" direction="up" icon={ArrowUpRight} />
          <InlineTrend value="3.1%" direction="down" icon={ArrowDownRight} />
          <InlineTrend value="Stable" direction="neutral" />
        </div>
      </div>
    </div>
  )
}
