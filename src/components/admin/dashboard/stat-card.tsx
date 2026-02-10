"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle, GlassCardDescription } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
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
          <Badge
            variant="outline"
            className={cn(
              "h-5 border-none text-xs",
              stat.changeType === "increase"
                ? "text-green-500 bg-green-500/10"
                : "text-red-500 bg-red-500/10"
            )}
          >
            {stat.changeType === "increase" ? (
              <TrendingUp className="mr-1 h-3 w-3" />
            ) : (
              <TrendingDown className="mr-1 h-3 w-3" />
            )}
            <span>{Math.abs(stat.change)}%</span>
          </Badge>
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

