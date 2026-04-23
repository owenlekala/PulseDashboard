import type { ComponentType, SVGProps } from "react"
import {
  BankCardFill,
  BankCardLine,
  Chat1Fill,
  Chat1Line,
  ChartBarFill,
  ChartBarLine,
  CubeLine,
  CubeFill,
  DashboardFill,
  DashboardLine,
  LayoutGridFill,
  LayoutGridLine,
  LifebuoyFill,
  LifebuoyLine,
  SendPlaneLine,
  SendPlaneFill,
  User3Line,
  User3Fill,
} from "@mingcute/react"

export type SidebarIcon = ComponentType<SVGProps<SVGSVGElement>>

export interface AdminNavItem {
  title: string
  href: string
  description?: string
}

export interface AdminNavSection {
  key: string
  title: string
  icon: {
    line: SidebarIcon
    fill: SidebarIcon
  }
  href: string
  description: string
  items: AdminNavItem[]
}

export interface AdminUtilityLink {
  title: string
  href: string
  icon: {
    line: SidebarIcon
    fill?: SidebarIcon
  }
}

export const adminUser = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "/avatar.png",
}

export const adminNavSections: AdminNavSection[] = [
  {
    key: "dashboard",
    title: "Dashboard",
    icon: {
      line: DashboardLine,
      fill: DashboardFill,
    },
    href: "/admin",
    description: "Primary metrics, trends, and operational highlights.",
    items: [
      {
        title: "Overview",
        href: "/admin",
        description: "Core KPI cards, charts, and recent activity.",
      },
    ],
  },
  {
    key: "users",
    title: "Users",
    icon: {
      line: User3Line,
      fill: User3Fill,
    },
    href: "/admin/users",
    description: "User operations, filters, and account-level actions.",
    items: [
      {
        title: "User Directory",
        href: "/admin/users",
        description: "Manage user records, states, and quick actions.",
      },
      {
        title: "Products",
        href: "/admin/products",
        description: "Manage product listings, inventory, and catalog state.",
      },
    ],
  },
  {
    key: "billing",
    title: "Billing",
    icon: {
      line: BankCardLine,
      fill: BankCardFill,
    },
    href: "/admin/billing",
    description: "Billing operations, subscriptions, invoices, and payment recovery.",
    items: [
      {
        title: "Billing Overview",
        href: "/admin/billing",
        description: "Subscription state, invoice actions, and payment operations.",
      },
    ],
  },
  {
    key: "chat",
    title: "Chat",
    icon: {
      line: Chat1Line,
      fill: Chat1Fill,
    },
    href: "/admin/chat",
    description: "Support conversations, thread handling, and customer context.",
    items: [
      {
        title: "Chat Workspace",
        href: "/admin/chat",
        description: "Manage live conversations, replies, and customer context.",
      },
    ],
  },
  {
    key: "components",
    title: "Components",
    icon: {
      line: CubeLine,
      fill: CubeFill,
    },
    href: "/admin/components",
    description: "Legacy component playground and broad UI examples.",
    items: [
      {
        title: "Components Demo",
        href: "/admin/components",
        description: "One-page demo surface for the older component catalog.",
      },
    ],
  },
  {
    key: "shared-ui",
    title: "Shared UI",
    icon: {
      line: LayoutGridLine,
      fill: LayoutGridFill,
    },
    href: "/admin/showcase",
    description: "Grouped shared-component showcase pages for the design system.",
    items: [
      {
        title: "Overview",
        href: "/admin/showcase",
        description: "Entry point for the shared UI showcase.",
      },
      {
        title: "Surfaces",
        href: "/admin/showcase/surfaces",
        description: "Cards, KPIs, and shared visual surfaces.",
      },
      {
        title: "Data Display",
        href: "/admin/showcase/data-display",
        description: "Structured data presentation and read-only layouts.",
      },
      {
        title: "Actions",
        href: "/admin/showcase/actions",
        description: "Menus, toolbars, and action-oriented shared patterns.",
      },
      {
        title: "Operations",
        href: "/admin/showcase/operations",
        description: "Operational flows, feeds, and admin workflow UI.",
      },
      {
        title: "Entity UI",
        href: "/admin/showcase/entity",
        description: "Entity profile, detail, and properties panel patterns.",
      },
    ],
  },
  {
    key: "charts",
    title: "Charts",
    icon: {
      line: ChartBarLine,
      fill: ChartBarFill,
    },
    href: "/admin/charts",
    description: "Charting patterns and analytics visualization examples.",
    items: [
      {
        title: "Charts Gallery",
        href: "/admin/charts",
        description: "Standalone chart screens and reference layouts.",
      },
    ],
  },
]

export const adminUtilityLinks: AdminUtilityLink[] = [
  {
    title: "Support",
    href: "#",
    icon: {
      line: LifebuoyLine,
      fill: LifebuoyFill,
    },
  },
  {
    title: "Feedback",
    href: "#",
    icon: {
      line: SendPlaneLine,
      fill: SendPlaneFill,
    },
  },
]

export function findActiveAdminSection(pathname: string): AdminNavSection {
  const candidates = adminNavSections.flatMap((section) => [
    {
      section,
      href: section.href,
    },
    ...section.items.map((item) => ({
      section,
      href: item.href,
    })),
  ])

  const exactMatch = candidates.find(({ href }) => pathname === href)
  if (exactMatch) {
    return exactMatch.section
  }

  const partialMatch = candidates
    .filter(({ href }) => href !== "/admin" && pathname.startsWith(`${href}/`))
    .sort((left, right) => right.href.length - left.href.length)[0]

  if (partialMatch) {
    return partialMatch.section
  }

  return adminNavSections[0]
}
