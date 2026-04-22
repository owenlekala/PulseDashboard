"use client"

import {
  ActivityTimeline,
  CategoryChart,
  KpiComparisonCards,
  RecentActivities,
  RevenueChart,
  StatCard,
  TopProducts,
  UserGrowthChart,
} from "@/components/admin/dashboard"
import {
  dashboardKpis,
  dashboardStats,
  dashboardTimeline,
} from "@/data/demo-dashboard-data"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        <RevenueChart />
        <UserGrowthChart />
      </div>

      <KpiComparisonCards items={dashboardKpis} />

      {/* Bottom Row */}
      <div className="grid gap-4 md:grid-cols-3">
        <CategoryChart />
        <RecentActivities />
        <TopProducts />
      </div>

      <ActivityTimeline items={dashboardTimeline} />
    </div>
  )
}
