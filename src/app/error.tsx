"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle, Home, RefreshCw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Error:", error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-destructive/10 p-4">
            <AlertCircle className="h-12 w-12 text-destructive" />
          </div>
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Something went wrong</h1>
        <p className="mb-2 text-lg text-muted-foreground">
          We encountered an unexpected error. Please try again.
        </p>
        {error.message && (
          <p className="mb-6 text-sm text-muted-foreground">
            {error.message}
          </p>
        )}
        {error.digest && (
          <p className="mb-6 text-xs text-muted-foreground">
            Error ID: {error.digest}
          </p>
        )}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={reset} variant="default" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link href="/dashboard">
              <Home className="h-4 w-4" />
              Go to Dashboard
            </Link>
          </Button>
          <Button asChild variant="ghost" className="gap-2">
            <Link href="/">
              Go to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

