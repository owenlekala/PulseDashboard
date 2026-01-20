import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-6">
          <h1 className="text-9xl font-bold text-muted-foreground">404</h1>
        </div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight">Page not found</h2>
        <p className="mb-8 text-lg text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild variant="default" className="gap-2">
            <Link href="/dashboard">
              <Home className="h-4 w-4" />
              Go to Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Go to Home
            </Link>
          </Button>
        </div>
        <div className="mt-12 rounded-lg border bg-muted/50 p-6">
          <div className="mb-2 flex items-center justify-center gap-2 text-sm font-medium">
            <Search className="h-4 w-4" />
            <span>Looking for something?</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Try navigating from the sidebar or return to the dashboard to find what you need.
          </p>
        </div>
      </div>
    </div>
  )
}

