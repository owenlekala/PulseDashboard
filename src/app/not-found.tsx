import { ErrorState } from "@/components/shared"

export default function NotFound() {
  return (
    <ErrorState
      title="Page not found"
      description="The page you're looking for doesn't exist or has been moved."
      statusCode={404}
      variant="not-found"
      primaryHref="/admin"
      primaryLabel="Go to Dashboard"
      secondaryHref="/"
      secondaryLabel="Go to Home"
    />
  )
}
