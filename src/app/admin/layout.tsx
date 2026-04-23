import { ReactNode } from "react"
import { AppSidebar } from "@/components/layouts/admin/app-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return <AppSidebar>{children}</AppSidebar>
}
