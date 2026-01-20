"use client"

import { PageHeader } from "@/components/shared"
import { DefaultBarChart } from "@/components/ui/default-bar-chart"
import { DefaultMultipleBarChart } from "@/components/ui/default-multiple-bar-chart"
import { GlowingBarVerticalChart } from "@/components/ui/glowing-bar-vertical-chart"
import { GlowingLineChart } from "@/components/ui/glowing-line"
import { PartialLineChart } from "@/components/ui/partial-line"
import { RoundedPieChart } from "@/components/ui/rounded-pie-chart"
import { DefaultRadialChart } from "@/components/ui/radial-chart"
import { GlowingStrokeRadarChart } from "@/components/ui/glowing-stroke-radar-chart"

export default function ChartsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Charts Showcase"
        description="Demonstration of all available chart components"
      />

      {/* Bar Charts Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Bar Charts</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <DefaultBarChart />
          <DefaultMultipleBarChart />
        </div>
        <GlowingBarVerticalChart />
      </div>

      {/* Line Charts Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Line Charts</h2>
        <div className="grid gap-4 md:grid-cols-1">
          <GlowingLineChart />
          <PartialLineChart />
        </div>
      </div>

      {/* Circular Charts Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Circular Charts</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <RoundedPieChart />
          <DefaultRadialChart />
        </div>
      </div>

      {/* Radar Chart Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Radar Chart</h2>
        <div className="grid gap-4 md:grid-cols-1">
          <GlowingStrokeRadarChart />
        </div>
      </div>
    </div>
  )
}

