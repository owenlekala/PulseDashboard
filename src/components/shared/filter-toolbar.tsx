"use client"

import type { LucideIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

interface FilterToolbarProps {
  title: string
  description?: string
  icon?: LucideIcon
  actions?: React.ReactNode
  children: React.ReactNode
}

export function FilterToolbar({
  title,
  description,
  icon: Icon,
  actions,
  children,
}: FilterToolbarProps) {
  return (
    <Card>
      <CardContent className="space-y-4 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="flex items-center gap-2 text-sm font-medium">
              {Icon ? <Icon className="size-4" /> : null}
              {title}
            </p>
            {description ? (
              <p className="text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
          {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
        </div>
        {children}
      </CardContent>
    </Card>
  )
}
