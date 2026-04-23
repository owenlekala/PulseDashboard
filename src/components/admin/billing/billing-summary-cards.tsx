"use client"

import { KpiCard } from "@/components/shared"
import type { BillingMetric } from "@/data/demo-billing-data"

interface BillingSummaryCardsProps {
  items: BillingMetric[]
}

export function BillingSummaryCards({ items }: BillingSummaryCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <KpiCard
          key={item.label}
          label={item.label}
          value={item.value}
          description={item.description}
          trend={item.trend}
        />
      ))}
    </div>
  )
}
