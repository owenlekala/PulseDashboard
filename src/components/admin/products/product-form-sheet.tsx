"use client"

import { useEffect, useState } from "react"

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

  useEffect(() => {
    setForm(toProductFormValue(product ?? undefined))
  }, [product, open])

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
            Manage product details, listing state, and operational metadata.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <form
            id="product-form"
            className="space-y-5"
            onSubmit={(event) => {
              event.preventDefault()
              onSubmit(form)
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="product-name">Product Name</Label>
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

            <div className="rounded-md border bg-muted/20 p-4">
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
            </div>
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
