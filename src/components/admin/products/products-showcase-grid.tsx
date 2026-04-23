"use client"

import { Package2, Star, Tags, TrendingUp } from "lucide-react"

import { EntityPreviewCard } from "@/components/shared"
import type { DemoProduct } from "@/data/demo-products-data"

const statusToneMap: Record<
  DemoProduct["status"],
  "active" | "inactive" | "pending" | "error"
> = {
  active: "active",
  draft: "pending",
  archived: "inactive",
  "out-of-stock": "error",
}

interface ProductsShowcaseGridProps {
  products: DemoProduct[]
  onSelect: (product: DemoProduct) => void
}

export function ProductsShowcaseGrid({
  products,
  onSelect,
}: ProductsShowcaseGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {products.map((product) => (
        <button
          key={product.id}
          type="button"
          onClick={() => onSelect(product)}
          className="block h-full rounded-2xl text-left transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <EntityPreviewCard
            title={product.name}
            subtitle={product.description}
            fallback={product.name.slice(0, 2).toUpperCase()}
            status={{
              tone: statusToneMap[product.status],
              label: product.status,
            }}
            meta={[
              { icon: Tags, label: `${product.category} · ${product.sku}` },
              {
                icon: TrendingUp,
                label: new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(product.price),
              },
              {
                icon: Package2,
                label: `${product.inventory} units in inventory`,
              },
              {
                icon: Star,
                label: product.featured ? "Featured in key surfaces" : "Standard catalog listing",
              },
            ]}
          />
        </button>
      ))}
    </div>
  )
}
