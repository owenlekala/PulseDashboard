"use client"

import { ArrowDownRight, ArrowUpRight } from "lucide-react"

import type { DashboardKpi } from "@/data/demo-dashboard-data"
import { KpiCard } from "@/components/shared"

interface KpiComparisonCardsProps {
  items: DashboardKpi[]
}

export function KpiComparisonCards({ items }: KpiComparisonCardsProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {items.map((item) => {
        const isPositive = item.trend === "up"

        return (
          <KpiCard
            key={item.id}
            label={item.title}
            value={item.value}
            description={`${item.detail} Benchmark: ${item.benchmark}`}
            trend={{
              value: `${item.delta}%`,
              direction: isPositive ? "up" : "neutral",
              icon: isPositive ? ArrowUpRight : ArrowDownRight,
            }}
          />
        )
      })}
    </div>
  )
}
