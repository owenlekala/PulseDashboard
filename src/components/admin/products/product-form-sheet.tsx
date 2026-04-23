"use client"

import { useState } from "react"
import { Box, DollarSign, Layers3, Sparkles, Warehouse } from "lucide-react"

import {
  type DemoProduct,
  demoProductCategories,
  toProductFormValue,
  type ProductFormValue,
} from "@/data/demo-products-data"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

interface ProductFormSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product?: DemoProduct | null
  onSubmit: (value: ProductFormValue) => void
}

export function ProductFormSheet({
  open,
  onOpenChange,
  product,
  onSubmit,
}: ProductFormSheetProps) {
  const [form, setForm] = useState<ProductFormValue>(toProductFormValue(product ?? undefined))

  const isEditing = Boolean(product)

  const updateField = <K extends keyof ProductFormValue>(
    key: K,
    value: ProductFormValue[K]
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }))
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full max-w-xl gap-0 p-0 sm:max-w-xl">
        <SheetHeader className="border-b px-6 py-5">
          <SheetTitle>{isEditing ? "Edit Product" : "Add Product"}</SheetTitle>
          <SheetDescription>
            Capture listing details, inventory readiness, and merchandising metadata in one flow.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <form
            id="product-form"
            className="space-y-6"
            onSubmit={(event) => {
              event.preventDefault()
              onSubmit(form)
            }}
          >
            <section className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Box className="size-4 text-muted-foreground" />
                  <h3 className="text-sm font-semibold">Core product details</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Define how the product appears across catalog, reporting, and internal admin views.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="product-name">Product name</Label>
                  <Input
                    id="product-name"
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    placeholder="Pulse Insights Pro"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product-sku">SKU</Label>
                  <Input
                    id="product-sku"
                    value={form.sku}
                    onChange={(event) => updateField("sku", event.target.value)}
                    placeholder="PIP-401"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={form.category}
                    onValueChange={(value) => updateField("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {demoProductCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="product-description">Description</Label>
                  <Textarea
                    id="product-description"
                    value={form.description}
                    onChange={(event) =>
                      updateField("description", event.target.value)
                    }
                    placeholder="Describe the product and the operational value it provides."
                    className="min-h-28"
                  />
                </div>
              </div>
            </section>

            <Separator />

            <section className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <DollarSign className="size-4 text-muted-foreground" />
                  <h3 className="text-sm font-semibold">Commercial settings</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Set pricing, stock posture, and listing state before publishing or archiving.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="product-price">Price</Label>
                  <Input
                    id="product-price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={(event) => updateField("price", event.target.value)}
                    placeholder="199"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product-inventory">Inventory</Label>
                  <Input
                    id="product-inventory"
                    type="number"
                    min="0"
                    step="1"
                    value={form.inventory}
                    onChange={(event) => updateField("inventory", event.target.value)}
                    placeholder="32"
                    required
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label>Status</Label>
                  <Select
                    value={form.status}
                    onValueChange={(value: DemoProduct["status"]) =>
                      updateField("status", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            <Separator />

            <section className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Layers3 className="size-4 text-muted-foreground" />
                  <h3 className="text-sm font-semibold">Merchandising</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Use shared flags to determine which products deserve stronger visibility in admin surfaces.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="product-featured"
                  checked={form.featured}
                  onCheckedChange={(checked) =>
                    updateField("featured", checked === true)
                  }
                />
                <div className="space-y-1">
                  <Label htmlFor="product-featured">Featured product</Label>
                  <p className="text-sm text-muted-foreground">
                    Highlight this listing in dashboards, launches, or curated product groups.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
                <div className="space-y-2">
                  <Warehouse className="size-4" />
                  Inventory state should stay aligned with operational availability.
                </div>
                <div className="space-y-2">
                  <Sparkles className="size-4" />
                  Featured products are surfaced first in the products workspace.
                </div>
                <div className="space-y-2">
                  <Layers3 className="size-4" />
                  Draft and archived states remain editable from this sheet.
                </div>
              </div>
            </section>
          </form>
        </div>

        <SheetFooter className="border-t px-6 py-4 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" form="product-form">
            {isEditing ? "Save changes" : "Add product"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
