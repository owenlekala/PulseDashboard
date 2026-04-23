"use client"

import Link from "next/link"
import {
  ArrowRight,
  LayoutPanelTop,
  MousePointerClick,
  Rows3,
} from "lucide-react"

import { PageHeader } from "@/components/shared"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const sections = [
  {
    href: "/admin/showcase/surfaces",
    title: "Surfaces & Metrics",
    description: "Glass-card KPI patterns, inline trends, and dashboard-ready summary composition.",
    icon: LayoutPanelTop,
  },
  {
    href: "/admin/showcase/data-display",
    title: "Data Display",
    description: "Information lists, detail presentation, and compact admin read-only patterns.",
    icon: Rows3,
  },
  {
    href: "/admin/showcase/actions",
    title: "Actions & Filters",
    description: "Filter toolbars, action menus, and page-level control patterns.",
    icon: MousePointerClick,
  },
  {
    href: "/admin/showcase/operations",
    title: "Operational UI",
    description: "Activity feeds, callouts, and bulk action patterns for admin workflows.",
    icon: Rows3,
  },
  {
    href: "/admin/showcase/entity",
    title: "Entity UI",
    description: "Preview cards, detail sections, and structured read-only entity surfaces.",
    icon: LayoutPanelTop,
  },
] as const

export default function ShowcasePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Shared UI Showcase"
        description="Grouped demos for the shared building blocks used across the admin experience."
        backHref="/admin"
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {sections.map((section) => {
          const Icon = section.icon

          return (
            <Card key={section.href}>
              <CardHeader className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-md border bg-muted/30 p-2">
                    <Icon className="size-4" />
                  </div>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                </div>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href={section.href}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary"
                >
                  Open showcase
                  <ArrowRight className="size-4" />
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
