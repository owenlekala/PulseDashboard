"use client"

import { TrendingDown, TrendingUp } from "lucide-react"

import { KpiCard } from "@/components/shared"
import type { StatCard as StatCardType } from "@/data/demo-dashboard-data"

interface StatCardProps {
  stat: StatCardType
}

export function StatCard({ stat }: StatCardProps) {
  return (
    <KpiCard
      label={stat.title}
      value={stat.value}
      description={stat.description}
      trend={{
        value: `${Math.abs(stat.change)}%`,
        direction: stat.changeType === "increase" ? "up" : "down",
        icon: stat.changeType === "increase" ? TrendingUp : TrendingDown,
      }}
    />
  )
}
