"use client"

import {
  ArrowUpRight,
  CalendarDays,
  Package2,
  ScanBarcode,
  Sparkles,
  Tags,
} from "lucide-react"

import { StatusBadge } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { DemoProduct } from "@/data/demo-products-data"

const statusToneMap: Record<
  DemoProduct["status"],
  "active" | "pending" | "inactive" | "error"
> = {
  active: "active",
  draft: "pending",
  archived: "inactive",
  "out-of-stock": "error",
}

interface ProductsSpotlightPanelProps {
  product: DemoProduct | null
  onEdit: (product: DemoProduct) => void
}

export function ProductsSpotlightPanel({
  product,
  onEdit,
}: ProductsSpotlightPanelProps) {
  return (
    <Card className="overflow-hidden border-border/60">
      {product ? (
        <CardContent className="space-y-6 p-0">
          <div className="border-b bg-muted/30 px-6 py-5">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Product spotlight
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-semibold">{product.name}</h2>
                  <StatusBadge
                    status={statusToneMap[product.status]}
                    label={product.status}
                  />
                </div>
              </div>
              <Button size="sm" className="h-9" onClick={() => onEdit(product)}>
                Edit product
              </Button>
            </div>
            <p className="text-sm leading-6 text-muted-foreground">{product.description}</p>
          </div>

          <div className="grid gap-3 px-6 md:grid-cols-2">
            <div className="rounded-xl border bg-background p-4">
              <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                <ScanBarcode className="size-3.5" />
                SKU
              </div>
              <div className="text-base font-semibold">{product.sku}</div>
            </div>
            <div className="rounded-xl border bg-background p-4">
              <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                <Tags className="size-3.5" />
                Category
              </div>
              <div className="text-base font-semibold">{product.category}</div>
            </div>
            <div className="rounded-xl border bg-background p-4">
              <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                <Sparkles className="size-3.5" />
                Price
              </div>
              <div className="text-base font-semibold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(product.price)}
              </div>
            </div>
            <div className="rounded-xl border bg-background p-4">
              <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                <Package2 className="size-3.5" />
                Inventory
              </div>
              <div className="text-base font-semibold">{product.inventory} units</div>
            </div>
          </div>

          <div className="grid gap-4 border-t px-6 py-5 md:grid-cols-[1fr_auto] md:items-center">
            <div className="flex flex-wrap gap-5 text-sm">
              <div>
                <div className="mb-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Featured
                </div>
                <div className="font-medium">{product.featured ? "Highlighted listing" : "Standard listing"}</div>
              </div>
              <div>
                <div className="mb-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Last update
                </div>
                <div className="font-medium">
                  {new Date(product.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="size-4" />
              Ready for pricing, inventory, and merchandising review
              <ArrowUpRight className="size-4" />
            </div>
          </div>
        </CardContent>
      ) : (
        <CardContent className="p-6">
          <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
            Select a product from the showcase or table to inspect it here.
          </div>
        </CardContent>
      )}
    </Card>
  )
}
