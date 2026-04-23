import {
  BankCardLine,
  DashboardLine,
  Message2Line,
  Settings2Line,
} from "@mingcute/react"
import type { ComponentType, SVGProps } from "react"

import { clientUser } from "@/data/demo-client-data"

type ClientNavIcon = ComponentType<SVGProps<SVGSVGElement>>

export interface ClientNavItem {
  title: string
  href: string
  description: string
  icon: ClientNavIcon
}

export const clientNavItems: ClientNavItem[] = [
  {
    title: "Overview",
    href: "/client",
    description: "Workspace health, activity, and quick actions.",
    icon: DashboardLine,
  },
  {
    title: "Billing",
    href: "/client/billing",
    description: "Plan, invoices, and payment methods.",
    icon: BankCardLine,
  },
  {
    title: "Messages",
    href: "/client/messages",
    description: "Support conversations and recent replies.",
    icon: Message2Line,
  },
  {
    title: "Settings",
    href: "/client/settings",
    description: "Profile details and notification preferences.",
    icon: Settings2Line,
  },
]

export { clientUser }
