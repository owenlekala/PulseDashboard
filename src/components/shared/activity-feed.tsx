"use client"

import type { LucideIcon } from "lucide-react"
import { AlertTriangle, CheckCircle2, Clock3 } from "lucide-react"

import { StatusBadge } from "@/components/shared/status-badge"
import { cn } from "@/lib/utils"

export interface ActivityFeedItem {
  id: string
  title: string
  description: string
  time: string
  status?: "success" | "warning" | "info"
  icon?: LucideIcon
}

interface ActivityFeedProps {
  items: ActivityFeedItem[]
}

const statusConfig = {
  success: {
    icon: CheckCircle2,
    iconClassName: "text-green-600 dark:text-green-400",
    badge: "success" as const,
  },
  warning: {
    icon: AlertTriangle,
    iconClassName: "text-amber-600 dark:text-amber-400",
    badge: "warning" as const,
  },
  info: {
    icon: Clock3,
    iconClassName: "text-blue-600 dark:text-blue-400",
    badge: "info" as const,
  },
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => {
        const config = statusConfig[item.status ?? "info"]
        const Icon = item.icon ?? config.icon

        return (
          <div key={item.id} className="flex items-start gap-3 rounded-md border bg-muted/20 p-3">
            <div className={cn("mt-0.5", config.iconClassName)}>
              <Icon className="size-4" />
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{item.time}</span>
                {item.status ? (
                  <StatusBadge status={config.badge} label={item.status} />
                ) : null}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
