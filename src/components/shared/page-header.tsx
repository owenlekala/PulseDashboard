"use client"

import Link from "next/link"
import { ArrowLeft, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface PageHeaderAction {
  label: string
  onClick?: () => void
  href?: string
  icon?: LucideIcon
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive" | "link"
  disabled?: boolean
}

export interface PageHeaderProps {
  title: string
  description?: string
  backHref?: string
  onBack?: () => void
  action?: PageHeaderAction
  className?: string
}

export function PageHeader({
  title,
  description,
  backHref,
  onBack,
  action,
  className,
}: PageHeaderProps) {
  const hasBackButton = backHref !== undefined || onBack !== undefined

  const BackButton = () => {
    if (!hasBackButton) return null

    const buttonContent = (
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="gap-2"
        aria-label="Go back"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Back</span>
      </Button>
    )

    if (backHref && !onBack) {
      return (
        <Link href={backHref} className="inline-block">
          {buttonContent}
        </Link>
      )
    }

    return buttonContent
  }

  const ActionButton = () => {
    if (!action) return null

    const buttonContent = (
      <Button
        variant={action.variant || "default"}
        size="sm"
        onClick={action.onClick}
        disabled={action.disabled}
        className={action.icon ? "gap-2" : ""}
      >
        {action.icon && <action.icon className="h-4 w-4" />}
        {action.label}
      </Button>
    )

    if (action.href && !action.onClick) {
      return (
        <Link href={action.href}>
          {buttonContent}
        </Link>
      )
    }

    return buttonContent
  }

  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", className)}>
      <div className="flex items-center gap-4">
        {hasBackButton && <BackButton />}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      {action && (
        <div className="flex items-center">
          <ActionButton />
        </div>
      )}
    </div>
  )
}

