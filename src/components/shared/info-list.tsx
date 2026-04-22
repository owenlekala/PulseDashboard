"use client"

import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export interface InfoListItem {
  label: string
  value: string
  icon?: LucideIcon
}

interface InfoListProps {
  items: InfoListItem[]
  columns?: 1 | 2 | 3
  className?: string
}

export function InfoList({
  items,
  columns = 2,
  className,
}: InfoListProps) {
  return (
    <div
      className={cn(
        "grid gap-3",
        columns === 2 && "sm:grid-cols-2",
        columns === 3 && "sm:grid-cols-2 xl:grid-cols-3",
        className
      )}
    >
      {items.map((item) => {
        const Icon = item.icon

        return (
          <div key={`${item.label}-${item.value}`} className="rounded-md border bg-muted/20 p-3">
            <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
              {Icon ? <Icon className="size-3.5" /> : null}
              {item.label}
            </div>
            <div className="text-sm font-medium">{item.value}</div>
          </div>
        )
      })}
    </div>
  )
}
