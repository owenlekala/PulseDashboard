"use client"

import type { LucideIcon } from "lucide-react"
import { AlertTriangle, Info, Lightbulb } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

type InsightTone = "info" | "warning" | "tip"

interface InsightCalloutProps {
  title: string
  description: string
  tone?: InsightTone
  icon?: LucideIcon
}

const toneConfig: Record<
  InsightTone,
  { icon: LucideIcon; className: string }
> = {
  info: {
    icon: Info,
    className: "text-blue-600 dark:text-blue-400",
  },
  warning: {
    icon: AlertTriangle,
    className: "text-amber-600 dark:text-amber-400",
  },
  tip: {
    icon: Lightbulb,
    className: "text-green-600 dark:text-green-400",
  },
}

export function InsightCallout({
  title,
  description,
  tone = "info",
  icon,
}: InsightCalloutProps) {
  const fallback = toneConfig[tone]
  const Icon = icon ?? fallback.icon

  return (
    <Card>
      <CardContent className="flex items-start gap-3 p-4">
        <div className={cn("pt-0.5", fallback.className)}>
          <Icon className="size-4" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
