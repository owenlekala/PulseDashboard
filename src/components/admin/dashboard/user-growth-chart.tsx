"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle, GlassCardDescription } from "@/components/ui/glass-card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp } from "lucide-react"
import { userGrowthData } from "@/data/demo-dashboard-data"

const chartConfig = {
  users: {
    label: "Total Users",
    color: "var(--chart-1)",
  },
  newUsers: {
    label: "New Users",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function UserGrowthChart() {
  return (
    <GlassCard outerTitle="Users">
      <GlassCardContent>
        <GlassCardHeader>
          <div className="flex items-center justify-between">
            <div>
              <GlassCardTitle>User Growth</GlassCardTitle>
              <GlassCardDescription>Total and new users by month</GlassCardDescription>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-green-500">
              <TrendingUp className="h-3 w-3" />
              <span>8.2%</span>
            </div>
          </div>
        </GlassCardHeader>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={userGrowthData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="users" fill="var(--color-users)" radius={4} />
            <Bar dataKey="newUsers" fill="var(--color-newUsers)" radius={4} />
          </BarChart>
        </ChartContainer>
      </GlassCardContent>
    </GlassCard>
  )
}
