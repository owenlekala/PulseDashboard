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
  actions?: PageHeaderAction[]
  className?: string
}

export function PageHeader({
  title,
  description,
  backHref,
  onBack,
  action,
  actions,
  className,
}: PageHeaderProps) {
  const hasBackButton = backHref !== undefined || onBack !== undefined
  const actionList = actions ?? (action ? [action] : [])
  const backButtonContent = hasBackButton ? (
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
  ) : null

  const renderActionButton = (item: PageHeaderAction, index: number) => {
    const key = `${item.label}-${index}`

    const buttonContent = (
      <Button
        key={key}
        variant={item.variant || "default"}
        size="sm"
        onClick={item.onClick}
        disabled={item.disabled}
        className={item.icon ? "gap-2" : ""}
      >
        {item.icon && <item.icon className="h-4 w-4" />}
        {item.label}
      </Button>
    )

    if (item.href && !item.onClick) {
      return (
        <Link key={key} href={item.href}>
          {buttonContent}
        </Link>
      )
    }

    return buttonContent
  }

  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", className)}>
      <div className="flex items-center gap-4">
        {hasBackButton && backHref && !onBack ? (
          <Link href={backHref} className="inline-block">
            {backButtonContent}
          </Link>
        ) : (
          backButtonContent
        )}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      {actionList.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {actionList.map((item, index) => renderActionButton(item, index))}
        </div>
      )}
    </div>
  )
}
