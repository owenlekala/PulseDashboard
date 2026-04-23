"use client"

import { useEffect } from "react"
import { ErrorState } from "@/components/shared"
import { getAppErrorDetails } from "@/lib/errors"

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

  const details = getAppErrorDetails(error)

  return (
    <ErrorState
      title={details.title}
      description={details.description}
      statusCode={details.statusCode}
      errorId={error.digest}
      variant={details.variant}
      onRetry={details.canRetry ? reset : undefined}
    />
  )
}
