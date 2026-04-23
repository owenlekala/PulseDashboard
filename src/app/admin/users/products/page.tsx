"use client"

import { useMemo, useState } from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { Plus, PackageSearch, Trash2, Archive, Copy } from "lucide-react"

import { ProductFormSheet, ProductsSummaryCards } from "@/components/admin/products"
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

export default function ProductsPage() {
  const [products, setProducts] = useState(demoProducts)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<DemoProduct | null>(null)

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
        toast.success(`${selectedRows.length} product(s) deleted`)
        break
      default:
        toast.info(`Bulk action: ${action}`)
    }
  }

  const handleEdit = (product: DemoProduct) => {
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
        description="Manage the product catalog, inventory states, and product metadata."
        action={{
          label: "Add Product",
          onClick: openCreateSheet,
          icon: Plus,
        }}
      />

      <ProductsSummaryCards {...summary} />

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
        onRowClick={handleEdit}
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

      <ProductFormSheet
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
