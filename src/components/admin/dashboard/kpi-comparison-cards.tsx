"use client"

import { ArrowDownRight, ArrowUpRight } from "lucide-react"

import type { DashboardKpi } from "@/data/demo-dashboard-data"
import { GlassCard, GlassCardContent } from "@/components/ui/glass-card"
import { cn } from "@/lib/utils"

interface KpiComparisonCardsProps {
  items: DashboardKpi[]
}

export function KpiComparisonCards({ items }: KpiComparisonCardsProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {items.map((item) => {
        const isPositive = item.trend === "up"

        return (
          <GlassCard key={item.id}>
            <div className="px-4 pt-4 pb-2">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {item.title}
                </p>
                <div
                  className={cn(
                    "flex items-center gap-1 text-xs font-semibold",
                    isPositive
                      ? "text-green-600 dark:text-green-400"
                      : "text-amber-600 dark:text-amber-400"
                  )}
                >
                  {isPositive ? (
                    <ArrowUpRight className="size-3" />
                  ) : (
                    <ArrowDownRight className="size-3" />
                  )}
                  {item.delta}%
                </div>
              </div>
            </div>
            <GlassCardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-3xl font-bold tracking-tight text-card-foreground">
                  {item.value}
                </div>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
                <div className="rounded-md border bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
                  Benchmark: {item.benchmark}
                </div>
              </div>
            </GlassCardContent>
          </GlassCard>
        )
      })}
    </div>
  )
}
