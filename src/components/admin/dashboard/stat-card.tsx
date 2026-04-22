"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { GlassCard, GlassCardContent } from "@/components/ui/glass-card"
import { cn } from "@/lib/utils"
import type { StatCard as StatCardType } from "@/data/demo-dashboard-data"

interface StatCardProps {
  stat: StatCardType
}

export function StatCard({ stat }: StatCardProps) {
  return (
    <GlassCard>
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {stat.title}
          </p>
          <div
            className={cn(
              "flex items-center gap-1 text-xs font-semibold",
              stat.changeType === "increase"
                ? "text-green-500"
                : "text-red-500"
            )}
          >
            {stat.changeType === "increase" ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>{Math.abs(stat.change)}%</span>
          </div>
        </div>
      </div>
      <GlassCardContent>
        <div className="flex flex-col">
          <div className="text-3xl font-bold text-card-foreground">{stat.value}</div>
          {stat.description && (
            <p className="text-xs text-muted-foreground mt-2">{stat.description}</p>
          )}
        </div>
      </GlassCardContent>
    </GlassCard>
  )
}
