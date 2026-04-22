"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export type UserSegment = "all" | "active" | "pending" | "suspended" | "inactive"

interface UsersSegmentTabsProps {
  value: UserSegment
  counts: Record<UserSegment, number>
  onValueChange: (value: UserSegment) => void
}

const segments: Array<{ value: UserSegment; label: string }> = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "suspended", label: "Suspended" },
  { value: "inactive", label: "Inactive" },
]

export function UsersSegmentTabs({
  value,
  counts,
  onValueChange,
}: UsersSegmentTabsProps) {
  return (
    <Tabs value={value} onValueChange={(next) => onValueChange(next as UserSegment)}>
      <TabsList className="h-auto flex-wrap justify-start gap-1 bg-muted/60 p-1">
        {segments.map((segment) => (
          <TabsTrigger
            key={segment.value}
            value={segment.value}
            className="gap-2 rounded-md px-3 py-1.5"
          >
            <span>{segment.label}</span>
            <span className="rounded-full bg-muted px-1.5 py-0.5 text-xs text-muted-foreground data-[state=active]:bg-background">
              {counts[segment.value]}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
