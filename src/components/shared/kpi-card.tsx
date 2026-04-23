"use client"

import type { LucideIcon } from "lucide-react"

import { GlassCard, GlassCardContent } from "@/components/ui/glass-card"
import { InlineTrend } from "@/components/shared/inline-trend"
import { cn } from "@/lib/utils"

interface KpiCardProps {
  label: string
  value: string | number
  description?: string
  icon?: LucideIcon
  iconClassName?: string
  trend?: {
    value: string | number
    direction?: "up" | "down" | "neutral"
    icon?: LucideIcon
  }
  className?: string
}

export function KpiCard({
  label,
  value,
  description,
  icon: Icon,
  iconClassName,
  trend,
  className,
}: KpiCardProps) {
  return (
    <GlassCard className={className}>
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          {trend ? (
            <InlineTrend
              value={trend.value}
              direction={trend.direction}
              icon={trend.icon}
            />
          ) : Icon ? (
            <Icon className={cn("size-4 text-muted-foreground", iconClassName)} />
          ) : null}
        </div>
      </div>
      <GlassCardContent>
        <div className="flex h-full flex-col justify-between gap-3">
          <div className="text-3xl font-bold tracking-tight text-card-foreground">
            {value}
          </div>
          {description ? (
            <p className="text-xs text-muted-foreground">{description}</p>
          ) : null}
        </div>
      </GlassCardContent>
    </GlassCard>
  )
}
