export type AppErrorVariant = "internal" | "not-found" | "network" | "generic"

export interface AppErrorDetails {
  title: string
  description: string
  statusCode?: number
  variant: AppErrorVariant
  canRetry: boolean
}

const STATUS_CODE_PATTERN = /\b(4\d{2}|5\d{2})\b/

function getErrorMessage(error: Error & { digest?: string }) {
  return error.message?.trim().toLowerCase() ?? ""
}

export function inferStatusCode(error: Error & { digest?: string }) {
  const message = getErrorMessage(error)
  const statusMatch = message.match(STATUS_CODE_PATTERN)

  if (statusMatch) {
    return Number(statusMatch[1])
  }

  if (message.includes("internal server error")) {
    return 500
  }

  if (message.includes("not found")) {
    return 404
  }

  if (message.includes("unauthorized")) {
    return 401
  }

  if (message.includes("forbidden")) {
    return 403
  }

  return undefined
}

export function getAppErrorDetails(error: Error & { digest?: string }): AppErrorDetails {
  const statusCode = inferStatusCode(error)
  const message = getErrorMessage(error)

  if (statusCode === 404) {
    return {
      title: "Resource not found",
      description: "The content you requested could not be found. It may have been moved or removed.",
      statusCode,
      variant: "not-found",
      canRetry: false,
    }
  }

  if (statusCode === 500 || statusCode === 502 || statusCode === 503 || statusCode === 504) {
    return {
      title: "Internal server error",
      description: "Something failed on our side. Please try again in a moment or return to a safe page.",
      statusCode,
      variant: "internal",
      canRetry: true,
    }
  }

  if (
    message.includes("failed to fetch") ||
    message.includes("network") ||
    message.includes("fetch failed") ||
    message.includes("load failed")
  ) {
    return {
      title: "Connection problem",
      description: "We couldn't reach the service right now. Check your connection and try again.",
      variant: "network",
      canRetry: true,
    }
  }

  return {
    title: "Something went wrong",
    description: "An unexpected error occurred. Try again, or head back to a stable part of the app.",
    statusCode,
    variant: "generic",
    canRetry: true,
  }
}
