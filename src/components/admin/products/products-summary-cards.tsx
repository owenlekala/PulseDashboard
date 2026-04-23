"use client"

import { KpiCard } from "@/components/shared"

interface ProductsSummaryCardsProps {
  total: number
  active: number
  lowStock: number
  featured: number
}

export function ProductsSummaryCards({
  total,
  active,
  lowStock,
  featured,
}: ProductsSummaryCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <KpiCard
        label="Total Products"
        value={total}
        description="Products currently managed in the catalog."
      />
      <KpiCard
        label="Active Listings"
        value={active}
        description="Products currently available to customers."
      />
      <KpiCard
        label="Low Stock"
        value={lowStock}
        description="Listings that need replenishment follow-up."
      />
      <KpiCard
        label="Featured"
        value={featured}
        description="Products highlighted in key flows and campaigns."
      />
    </div>
  )
}
