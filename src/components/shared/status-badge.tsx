"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const statusBadgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      status: {
        active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
        inactive: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
        pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
        error: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
        warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
        info: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      },
    },
    defaultVariants: {
      status: "active",
    },
  }
)

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
  label?: string
}

export function StatusBadge({
  className,
  status,
  label,
  children,
  ...props
}: StatusBadgeProps) {
  return (
    <Badge
      className={cn(statusBadgeVariants({ status }), className)}
      {...props}
    >
      {label || children}
    </Badge>
  )
}

