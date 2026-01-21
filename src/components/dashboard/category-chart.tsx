"use client"

import { Pie, PieChart, LabelList } from "recharts"
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle, GlassCardDescription } from "@/components/ui/glass-card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { categoryDistribution } from "@/data/demo-dashboard-data"

const chartData = categoryDistribution.map((item) => ({
  name: item.name,
  value: item.value,
  fill: item.color,
}))

const chartConfig = {
  value: {
    label: "Percentage",
  },
  electronics: {
    label: "Electronics",
    color: "var(--chart-1)",
  },
  clothing: {
    label: "Clothing",
    color: "var(--chart-2)",
  },
  food: {
    label: "Food",
    color: "var(--chart-3)",
  },
  books: {
    label: "Books",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function CategoryChart() {
  return (
    <GlassCard outerTitle="Categories">
      <GlassCardContent>
        <GlassCardHeader>
          <GlassCardTitle>Category Distribution</GlassCardTitle>
          <GlassCardDescription>Sales by category (2024)</GlassCardDescription>
        </GlassCardHeader>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="name" hideLabel />}
            />
            <Pie
              data={chartData}
              innerRadius={60}
              dataKey="value"
              radius={100}
              cornerRadius={8}
              paddingAngle={4}
            >
              <LabelList
                dataKey="name"
                stroke="none"
                fontSize={12}
                fontWeight={500}
                fill="currentColor"
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </GlassCardContent>
    </GlassCard>
  )
}

