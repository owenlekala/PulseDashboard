"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle, GlassCardDescription } from "@/components/ui/glass-card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"
import { monthlyRevenueData } from "@/data/demo-dashboard-data"

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
  target: {
    label: "Target",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function RevenueChart() {
  return (
    <GlassCard outerTitle="Revenue">
      <GlassCardContent>
        <GlassCardHeader>
          <div className="flex items-center justify-between">
            <div>
              <GlassCardTitle>Monthly Revenue</GlassCardTitle>
              <GlassCardDescription>Revenue vs Target (2024)</GlassCardDescription>
            </div>
            <Badge
              variant="outline"
              className="text-green-500 bg-green-500/10 border-none"
            >
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>12.5%</span>
            </Badge>
          </div>
        </GlassCardHeader>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart data={monthlyRevenueData}>
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
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="var(--color-revenue)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="var(--color-target)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </GlassCardContent>
    </GlassCard>
  )
}

