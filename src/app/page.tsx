import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-6xl">
            Welcome to Pulse Dashboard
          </h1>
          <p className="mb-12 text-xl text-slate-600 dark:text-slate-400">
            Your comprehensive dashboard solution for managing and monitoring your business metrics
          </p>

          <div className="mb-16 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Get Started</CardTitle>
                <CardDescription>
                  Create a new account to access all features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild size="lg" className="w-full">
                  <Link href="/register">Register</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Already have an account?</CardTitle>
                <CardDescription>
                  Sign in to continue to your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild size="lg" variant="outline" className="w-full">
                  <Link href="/login">Login</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">Real-time Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Monitor your business metrics in real-time with comprehensive dashboards
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">Secure & Reliable</h3>
              <p className="text-sm text-muted-foreground">
                Enterprise-grade security with reliable infrastructure you can trust
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">Easy to Use</h3>
              <p className="text-sm text-muted-foreground">
                Intuitive interface designed for both beginners and power users
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
