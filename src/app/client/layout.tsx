import { ReactNode } from "react"

import { ClientLayoutShell } from "@/components/layouts/client/client-layout-shell"

export default function ClientLayout({
  children,
}: {
  children: ReactNode
}) {
  return <ClientLayoutShell>{children}</ClientLayoutShell>
}
