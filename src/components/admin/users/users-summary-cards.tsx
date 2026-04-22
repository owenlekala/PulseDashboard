"use client"

import { Users, UserCheck, Clock3, ShieldAlert } from "lucide-react"

import { GlassCard, GlassCardContent } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { UserSegment } from "@/components/admin/users/users-segment-tabs"

interface UsersSummaryCardsProps {
  counts: Record<UserSegment, number>
}

const cards = [
  {
    key: "all",
    label: "Total Users",
    description: "Users currently in the workspace",
    icon: Users,
    tone: "text-blue-600 dark:text-blue-400",
  },
  {
    key: "active",
    label: "Healthy Accounts",
    description: "Users active in the current cycle",
    icon: UserCheck,
    tone: "text-green-600 dark:text-green-400",
  },
  {
    key: "pending",
    label: "Awaiting Onboarding",
    description: "Accounts pending activation steps",
    icon: Clock3,
    tone: "text-amber-600 dark:text-amber-400",
  },
  {
    key: "suspended",
    label: "Needs Review",
    description: "Suspended accounts requiring follow-up",
    icon: ShieldAlert,
    tone: "text-red-600 dark:text-red-400",
  },
] as const

export function UsersSummaryCards({ counts }: UsersSummaryCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <GlassCard key={card.key}>
            <div className="px-4 pt-4 pb-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {card.label}
                </p>
                <Icon className={cn("size-4", card.tone)} />
              </div>
            </div>
            <GlassCardContent>
              <div className="flex flex-col">
                <div className="text-3xl font-bold text-card-foreground">
                  {counts[card.key]}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {card.description}
                </p>
              </div>
            </GlassCardContent>
          </GlassCard>
        )
      })}
    </div>
  )
}
