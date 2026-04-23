"use client"

import { Users, UserCheck, Clock3, ShieldAlert } from "lucide-react"

import { KpiCard } from "@/components/shared"
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
          <KpiCard
            key={card.key}
            label={card.label}
            value={counts[card.key]}
            description={card.description}
            icon={Icon}
            iconClassName={card.tone}
          />
        )
      })}
    </div>
  )
}
