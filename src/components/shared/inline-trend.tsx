"use client"

import type { LucideIcon } from "lucide-react"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

interface InlineTrendProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string | number
  direction?: "up" | "down" | "neutral"
  icon?: LucideIcon
}

export function InlineTrend({
  value,
  direction = "up",
  icon,
  className,
  ...props
}: InlineTrendProps) {
  const Icon =
    icon ?? (direction === "down" ? ArrowDownRight : ArrowUpRight)

  return (
    <div
      className={cn(
        "flex items-center gap-1 text-xs font-semibold",
        direction === "up" && "text-green-600 dark:text-green-400",
        direction === "down" && "text-red-500 dark:text-red-400",
        direction === "neutral" && "text-muted-foreground",
        className
      )}
      {...props}
    >
      <Icon className="size-3" />
      <span>{value}</span>
    </div>
  )
}
