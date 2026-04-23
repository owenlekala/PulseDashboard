"use client"

import Link from "next/link"
import { AlertCircle, ArrowLeft, Home, RefreshCw, Search, ServerCrash, WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { AppErrorVariant } from "@/lib/errors"

interface ErrorStateProps {
  title: string
  description: string
  statusCode?: number
  errorId?: string
  variant?: AppErrorVariant
  className?: string
  onRetry?: () => void
  retryLabel?: string
  primaryHref?: string
  primaryLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
}

const variantConfig: Record<
  AppErrorVariant,
  {
    icon: typeof AlertCircle
    iconClassName: string
    badgeClassName: string
  }
> = {
  internal: {
    icon: ServerCrash,
    iconClassName: "text-destructive",
    badgeClassName: "bg-destructive/10 text-destructive",
  },
  "not-found": {
    icon: Search,
    iconClassName: "text-muted-foreground",
    badgeClassName: "bg-muted text-muted-foreground",
  },
  network: {
    icon: WifiOff,
    iconClassName: "text-amber-600 dark:text-amber-400",
    badgeClassName: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  },
  generic: {
    icon: AlertCircle,
    iconClassName: "text-destructive",
    badgeClassName: "bg-destructive/10 text-destructive",
  },
}

export function ErrorState({
  title,
  description,
  statusCode,
  errorId,
  variant = "generic",
  className,
  onRetry,
  retryLabel = "Try again",
  primaryHref = "/admin",
  primaryLabel = "Go to Dashboard",
  secondaryHref = "/",
  secondaryLabel = "Go to Home",
}: ErrorStateProps) {
  const { icon: Icon, iconClassName, badgeClassName } = variantConfig[variant]

  return (
    <div className={cn("flex min-h-screen items-center justify-center bg-background px-4 py-10", className)}>
      <Card className="w-full max-w-xl border-border/60 shadow-sm">
        <CardHeader className="items-center text-center">
          <div className={cn("mb-4 rounded-full p-4", badgeClassName)}>
            <Icon className={cn("h-10 w-10", iconClassName)} />
          </div>
          {statusCode ? (
            <div className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Error {statusCode}
            </div>
          ) : null}
          <CardTitle className="text-3xl tracking-tight">{title}</CardTitle>
          <CardDescription className="max-w-md text-base">{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {(statusCode || errorId) ? (
            <div className="rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground">
              {statusCode ? <p>Status: {statusCode}</p> : null}
              {errorId ? <p>Reference: {errorId}</p> : null}
            </div>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            {onRetry ? (
              <Button onClick={onRetry} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                {retryLabel}
              </Button>
            ) : null}
            <Button asChild variant="outline" className="gap-2">
              <Link href={primaryHref}>
                <Home className="h-4 w-4" />
                {primaryLabel}
              </Link>
            </Button>
            <Button asChild variant="ghost" className="gap-2">
              <Link href={secondaryHref}>
                <ArrowLeft className="h-4 w-4" />
                {secondaryLabel}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
