"use client"

import { Copy, Eye, RotateCcw, SlidersHorizontal, Trash2 } from "lucide-react"

import { ActionMenu, FilterToolbar, PageHeader, toast } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Input } from "@/components/ui/input"

export default function ShowcaseActionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Actions & Filters"
        description="Shared control patterns for admin lists and utilities."
        backHref="/admin/showcase"
      />
      <FilterToolbar
        title="Filter toolbar"
        description="Use this for utility-style filter panels instead of glass cards."
        icon={SlidersHorizontal}
        actions={
          <Button variant="outline" size="sm" className="gap-2">
            <RotateCcw className="size-4" />
            Reset
          </Button>
        }
      >
        <div className="grid gap-3 md:grid-cols-3">
          <Input placeholder="Search by name or email" className="bg-card" />
          <Input placeholder="Role or status" className="bg-card" />
          <DateRangePicker />
        </div>
      </FilterToolbar>
      <CardLikeDemo />
    </div>
  )
}

function CardLikeDemo() {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-medium">Action Menu</h2>
          <p className="text-sm text-muted-foreground">
            Keep row and quick actions consistent with the shared menu.
          </p>
        </div>
        <ActionMenu
          items={[
            {
              label: "View details",
              icon: Eye,
              onSelect: () => toast.info("Viewing details"),
            },
            {
              label: "Copy ID",
              icon: Copy,
              onSelect: () => toast.success("Copied ID"),
            },
            {
              label: "Delete item",
              icon: Trash2,
              separatorBefore: true,
              tone: "destructive",
              onSelect: () => toast.error("Delete action triggered"),
            },
          ]}
        />
      </div>
    </div>
  )
}
