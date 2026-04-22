"use client"

import { AlertTriangle, CheckCircle2, Clock3 } from "lucide-react"

import type { TimelineEvent } from "@/data/demo-dashboard-data"
import { Badge } from "@/components/ui/badge"
import {
  GlassCard,
  GlassCardContent,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle,
} from "@/components/ui/glass-card"
import { cn } from "@/lib/utils"

interface ActivityTimelineProps {
  items: TimelineEvent[]
}

const timelineStatusConfig = {
  completed: {
    icon: CheckCircle2,
    badgeClassName: "bg-green-500/10 text-green-600 dark:text-green-400",
    lineClassName: "bg-green-500/20",
    label: "Completed",
  },
  in_progress: {
    icon: Clock3,
    badgeClassName: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    lineClassName: "bg-blue-500/20",
    label: "In Progress",
  },
  at_risk: {
    icon: AlertTriangle,
    badgeClassName: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    lineClassName: "bg-amber-500/20",
    label: "At Risk",
  },
} as const

export function ActivityTimeline({ items }: ActivityTimelineProps) {
  return (
    <GlassCard outerTitle="Timeline">
      <GlassCardContent>
        <GlassCardHeader>
          <GlassCardTitle>Delivery Timeline</GlassCardTitle>
          <GlassCardDescription>
            Key milestones, blockers, and execution updates across the team.
          </GlassCardDescription>
        </GlassCardHeader>
        <div className="space-y-5">
          {items.map((item, index) => {
            const config = timelineStatusConfig[item.status]
            const Icon = config.icon

            return (
              <div key={item.id} className="relative pl-8">
                {index < items.length - 1 ? (
                  <span
                    className={cn(
                      "absolute top-6 left-[11px] h-[calc(100%+0.75rem)] w-px",
                      config.lineClassName
                    )}
                  />
                ) : null}
                <span className="absolute top-1 left-0 flex size-6 items-center justify-center rounded-full border bg-background">
                  <Icon className="size-3.5" />
                </span>
                <div className="space-y-2 rounded-md border bg-muted/20 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn("border-none", config.badgeClassName)}
                    >
                      {config.label}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span>{item.owner}</span>
                    <span className="size-1 rounded-full bg-border" />
                    <span>{item.timestamp}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </GlassCardContent>
    </GlassCard>
  )
}
