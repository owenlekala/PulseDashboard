"use client"

import { useMemo, useState } from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { Archive, Copy, PackageSearch, Plus, Star, Trash2 } from "lucide-react"

import {
  ProductFormSheet,
  ProductsShowcaseGrid,
  ProductsSpotlightPanel,
  ProductsSummaryCards,
} from "@/components/admin/products"
import {
  ActionMenu,
  EmptyState,
  PageHeader,
  StatusBadge,
  toast,
} from "@/components/shared"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTable } from "@/components/ui/datatable"
import {
  demoProducts,
  type DemoProduct,
  type ProductFormValue,
} from "@/data/demo-products-data"

type ProductsTableMeta = {
  onEdit: (product: DemoProduct) => void
  onDuplicate: (product: DemoProduct) => void
  onArchive: (product: DemoProduct) => void
  onDelete: (product: DemoProduct) => void
}

const statusMap: Record<
  DemoProduct["status"],
  "active" | "pending" | "inactive" | "error"
> = {
  active: "active",
  draft: "pending",
  archived: "inactive",
  "out-of-stock": "error",
}

const columns: ColumnDef<DemoProduct>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => {
      const product = row.original
      return (
        <div className="flex flex-col">
          <span className="font-medium">{product.name}</span>
          <span className="text-sm text-muted-foreground">{product.sku}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(row.original.price),
  },
  {
    accessorKey: "inventory",
    header: "Inventory",
    cell: ({ row }) => {
      const inventory = row.original.inventory
      return (
        <span className={inventory < 10 ? "text-amber-600 dark:text-amber-400" : undefined}>
          {inventory}
        </span>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusBadge
        status={statusMap[row.original.status]}
        label={row.original.status}
      />
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated",
    cell: ({ row }) =>
      new Date(row.original.updatedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const meta = table.options.meta as ProductsTableMeta | undefined
      const product = row.original

      return (
        <ActionMenu
          label="Product actions"
          items={[
            {
              label: "Edit product",
              onSelect: () => meta?.onEdit(product),
            },
            {
              label: "Duplicate product",
              onSelect: () => meta?.onDuplicate(product),
              icon: Copy,
            },
            {
              label: "Archive product",
              onSelect: () => meta?.onArchive(product),
              icon: Archive,
            },
            {
              label: "Delete product",
              onSelect: () => meta?.onDelete(product),
              icon: Trash2,
              separatorBefore: true,
              tone: "destructive",
            },
          ]}
        />
      )
    },
  },
]

export function ProductsPageClient() {
  const [products, setProducts] = useState(demoProducts)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<DemoProduct | null>(null)
  const [selectedProductId, setSelectedProductId] = useState(demoProducts[0]?.id ?? null)

  const selectedProduct =
    products.find((product) => product.id === selectedProductId) ?? products[0] ?? null

  const summary = useMemo(
    () => ({
      total: products.length,
      active: products.filter((product) => product.status === "active").length,
      lowStock: products.filter((product) => product.inventory > 0 && product.inventory < 10)
        .length,
      featured: products.filter((product) => product.featured).length,
    }),
    [products]
  )

  const featuredProducts = useMemo(
    () => products.filter((product) => product.featured).slice(0, 3),
    [products]
  )

  const openCreateSheet = () => {
    setEditingProduct(null)
    setSheetOpen(true)
  }

  const handleSubmit = (value: ProductFormValue) => {
    const nextProduct: DemoProduct = {
      id: editingProduct?.id ?? `prd_${Date.now()}`,
      name: value.name,
      sku: value.sku,
      category: value.category,
      price: Number(value.price),
      inventory: Number(value.inventory),
      status: value.status,
      featured: value.featured,
      description: value.description,
      updatedAt: new Date().toISOString(),
    }

    setProducts((current) => {
      if (editingProduct) {
        return current.map((product) =>
          product.id === editingProduct.id ? nextProduct : product
        )
      }

      return [nextProduct, ...current]
    })

    setSelectedProductId(nextProduct.id)
    toast.success(editingProduct ? "Product updated" : "Product added")
    setSheetOpen(false)
    setEditingProduct(null)
  }

  const handleBulkAction = (action: string, selectedRows: DemoProduct[]) => {
    const ids = selectedRows.map((row) => row.id)

    switch (action) {
      case "archive":
        setProducts((current) =>
          current.map((product) =>
            ids.includes(product.id)
              ? { ...product, status: "archived", updatedAt: new Date().toISOString() }
              : product
          )
        )
        toast.success(`${selectedRows.length} product(s) archived`)
        break
      case "delete":
        setProducts((current) =>
          current.filter((product) => !ids.includes(product.id))
        )
        if (selectedProductId && ids.includes(selectedProductId)) {
          setSelectedProductId(null)
        }
        toast.success(`${selectedRows.length} product(s) deleted`)
        break
      default:
        toast.info(`Bulk action: ${action}`)
    }
  }

  const handleEdit = (product: DemoProduct) => {
    setSelectedProductId(product.id)
    setEditingProduct(product)
    setSheetOpen(true)
  }

  const handleDuplicate = (product: DemoProduct) => {
    const duplicate: DemoProduct = {
      ...product,
      id: `prd_${Date.now()}`,
      name: `${product.name} Copy`,
      sku: `${product.sku}-COPY`,
      status: "draft",
      updatedAt: new Date().toISOString(),
    }
    setProducts((current) => [duplicate, ...current])
    setSelectedProductId(duplicate.id)
    toast.success("Product duplicated")
  }

  const handleArchive = (product: DemoProduct) => {
    handleBulkAction("archive", [product])
  }

  const handleDelete = (product: DemoProduct) => {
    handleBulkAction("delete", [product])
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        description="Showcase the catalog, monitor listing health, and manage product records from one workspace."
        action={{
          label: "Add Product",
          onClick: openCreateSheet,
          icon: Plus,
        }}
      />

      <ProductsSummaryCards {...summary} />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.9fr)]">
        <section className="space-y-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Star className="size-4 text-muted-foreground" />
              <h2 className="text-lg font-semibold">Featured catalog</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              A fast visual pass over the products currently highlighted across admin and merchandising flows.
            </p>
          </div>
          <ProductsShowcaseGrid
            products={featuredProducts.length ? featuredProducts : products.slice(0, 3)}
            onSelect={(product) => setSelectedProductId(product.id)}
          />
        </section>

        <ProductsSpotlightPanel product={selectedProduct} onEdit={handleEdit} />
      </div>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Catalog table</h2>
          <p className="text-sm text-muted-foreground">
            Use row selection for bulk actions, or open any record to edit it in the side sheet.
          </p>
        </div>
        <DataTable
          columns={columns}
          data={products}
          searchPlaceholder="Search products by name, SKU, or category..."
          searchFields={["name", "sku", "category", "description"]}
          statusFilterOptions={[
            { value: "active", label: "Active" },
            { value: "draft", label: "Draft" },
            { value: "out-of-stock", label: "Out of Stock" },
            { value: "archived", label: "Archived" },
          ]}
          bulkActions={[
            {
              label: "Archive",
              action: "archive",
              icon: <Archive className="mr-1.5 h-3.5 w-3.5" />,
              variant: "outline",
            },
            {
              label: "Delete",
              action: "delete",
              icon: <Trash2 className="mr-1.5 h-3.5 w-3.5" />,
              variant: "destructive",
            },
          ]}
          onBulkAction={handleBulkAction}
          onExport={() => toast.success("Product export would run here")}
          onRowClick={(product) => setSelectedProductId(product.id)}
          meta={{
            onEdit: handleEdit,
            onDuplicate: handleDuplicate,
            onArchive: handleArchive,
            onDelete: handleDelete,
          }}
          emptyState={
            <EmptyState
              icon={PackageSearch}
              title="No products found"
              description="Try adjusting the search or add a new product to populate the catalog."
              action={{
                label: "Add Product",
                onClick: openCreateSheet,
              }}
              className="py-10"
            />
          }
        />
      </section>

      <ProductFormSheet
        key={`${editingProduct?.id ?? "new-product"}-${sheetOpen ? "open" : "closed"}`}
        open={sheetOpen}
        onOpenChange={(open) => {
          setSheetOpen(open)
          if (!open) {
            setEditingProduct(null)
          }
        }}
        product={editingProduct}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
