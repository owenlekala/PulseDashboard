import type { ComponentType, SVGProps } from "react"
import {
  BankCardFill,
  BankCardLine,
  Bill2Fill,
  Bill2Line,
  Chat1Fill,
  Chat1Line,
  Chat3AiFill,
  Chat3AiLine,
  Chat3Fill,
  Chat3Line,
  ChartBarFill,
  ChartBarLine,
  ChartPieFill,
  ChartPieLine,
  ComponentsFill,
  ComponentsLine,
  CubeLine,
  CubeFill,
  Cursor3Fill,
  Cursor3Line,
  DashboardFill,
  DashboardLine,
  Dashboard3Fill,
  Dashboard3Line,
  Group3Fill,
  Group3Line,
  Layout4Fill,
  Layout4Line,
  LayoutGridFill,
  LayoutGridLine,
  LifebuoyFill,
  LifebuoyLine,
  ListSearchFill,
  ListSearchLine,
  PackageFill,
  PackageLine,
  SendPlaneLine,
  SendPlaneFill,
  Task2Fill,
  Task2Line,
  User3Line,
  User3Fill,
  UserSettingFill,
  UserSettingLine,
} from "@mingcute/react"

export type SidebarIcon = ComponentType<SVGProps<SVGSVGElement>>

export interface AdminNavItem {
  title: string
  href: string
  icon: {
    line: SidebarIcon
    fill: SidebarIcon
  }
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
        icon: {
          line: Dashboard3Line,
          fill: Dashboard3Fill,
        },
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
        icon: {
          line: Group3Line,
          fill: Group3Fill,
        },
      },
      {
        title: "Products",
        href: "/admin/products",
        icon: {
          line: PackageLine,
          fill: PackageFill,
        },
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
        icon: {
          line: Bill2Line,
          fill: Bill2Fill,
        },
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
        icon: {
          line: Chat3Line,
          fill: Chat3Fill,
        },
      },
      {
        title: "AI Chat",
        href: "/admin/ai-chat",
        icon: {
          line: Chat3AiLine,
          fill: Chat3AiFill,
        },
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
        icon: {
          line: ComponentsLine,
          fill: ComponentsFill,
        },
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
        icon: {
          line: LayoutGridLine,
          fill: LayoutGridFill,
        },
      },
      {
        title: "Surfaces",
        href: "/admin/showcase/surfaces",
        icon: {
          line: Layout4Line,
          fill: Layout4Fill,
        },
      },
      {
        title: "Data Display",
        href: "/admin/showcase/data-display",
        icon: {
          line: ListSearchLine,
          fill: ListSearchFill,
        },
      },
      {
        title: "Actions",
        href: "/admin/showcase/actions",
        icon: {
          line: Cursor3Line,
          fill: Cursor3Fill,
        },
      },
      {
        title: "Operations",
        href: "/admin/showcase/operations",
        icon: {
          line: Task2Line,
          fill: Task2Fill,
        },
      },
      {
        title: "Entity UI",
        href: "/admin/showcase/entity",
        icon: {
          line: UserSettingLine,
          fill: UserSettingFill,
        },
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
        icon: {
          line: ChartPieLine,
          fill: ChartPieFill,
        },
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
