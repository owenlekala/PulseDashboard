import Link from "next/link"
import { ReactNode } from "react"

export default function AuthLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4 py-8">
      <div className="absolute top-4 left-4">
        <Link 
          href="/" 
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to home
        </Link>
      </div>
      {children}
    </div>
  )
}

