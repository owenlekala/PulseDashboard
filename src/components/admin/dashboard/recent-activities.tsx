"use client"

import { CheckCircle2, Info, AlertTriangle, ShoppingCart, User, CreditCard, AlertCircle, Database } from "lucide-react"
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle, GlassCardDescription } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { recentActivities } from "@/data/demo-dashboard-data"

const getActivityIcon = (type: string) => {
  switch (type) {
    case "order":
      return ShoppingCart
    case "user":
      return User
    case "payment":
      return CreditCard
    case "alert":
      return AlertCircle
    case "system":
      return Database
    default:
      return Info
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "success":
      return CheckCircle2
    case "warning":
      return AlertTriangle
    case "info":
    default:
      return Info
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "success":
      return "text-green-500"
    case "warning":
      return "text-yellow-500"
    case "info":
    default:
      return "text-blue-500"
  }
}

export function RecentActivities() {
  return (
    <GlassCard outerTitle="Activity">
      <GlassCardContent>
        <GlassCardHeader>
          <GlassCardTitle>Recent Activities</GlassCardTitle>
          <GlassCardDescription>Latest system and user activities</GlassCardDescription>
        </GlassCardHeader>
        <div className="space-y-4">
          {recentActivities.map((activity) => {
            const ActivityIcon = getActivityIcon(activity.type)
            const StatusIcon = getStatusIcon(activity.status)
            const statusColor = getStatusColor(activity.status)

            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 rounded-lg border p-3 bg-muted/20"
              >
                <div className={cn("mt-0.5", statusColor)}>
                  <ActivityIcon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-card-foreground">
                    {activity.message}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                    <Badge
                      variant="outline"
                      className={cn(
                        "h-4 px-1.5 text-xs border-none",
                        activity.status === "success" && "bg-green-500/10 text-green-500",
                        activity.status === "warning" && "bg-yellow-500/10 text-yellow-500",
                        activity.status === "info" && "bg-blue-500/10 text-blue-500"
                      )}
                    >
                      <StatusIcon className="mr-1 h-3 w-3" />
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </GlassCardContent>
    </GlassCard>
  )
}

