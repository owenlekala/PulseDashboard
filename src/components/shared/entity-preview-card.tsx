"use client"

import type { LucideIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/shared/status-badge"

interface EntityPreviewCardProps {
  title: string
  subtitle?: string
  status?: {
    tone: "active" | "inactive" | "pending" | "error" | "success" | "warning" | "info"
    label: string
  }
  avatarSrc?: string
  fallback?: string
  meta?: Array<{
    icon?: LucideIcon
    label: string
  }>
}

export function EntityPreviewCard({
  title,
  subtitle,
  status,
  avatarSrc,
  fallback = "UI",
  meta = [],
}: EntityPreviewCardProps) {
  return (
    <Card>
      <CardContent className="space-y-4 p-4">
        <div className="flex items-start gap-3">
          <Avatar className="size-10 rounded-lg">
            <AvatarImage src={avatarSrc} alt={title} />
            <AvatarFallback className="rounded-lg">{fallback}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-medium">{title}</p>
              {status ? (
                <StatusBadge status={status.tone} label={status.label} />
              ) : null}
            </div>
            {subtitle ? (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            ) : null}
          </div>
        </div>
        {meta.length ? (
          <div className="grid gap-2 text-sm text-muted-foreground">
            {meta.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="flex items-center gap-2">
                  {Icon ? <Icon className="size-4" /> : null}
                  <span>{item.label}</span>
                </div>
              )
            })}
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
