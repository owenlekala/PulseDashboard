export interface DemoProduct {
  id: string
  name: string
  sku: string
  category: string
  price: number
  inventory: number
  status: "active" | "draft" | "archived" | "out-of-stock"
  featured: boolean
  description: string
  updatedAt: string
}

export interface ProductFormValue {
  name: string
  sku: string
  category: string
  price: string
  inventory: string
  status: DemoProduct["status"]
  featured: boolean
  description: string
}

export const demoProductCategories = [
  "Analytics",
  "Automation",
  "Finance",
  "Operations",
  "Security",
]

export const demoProducts: DemoProduct[] = [
  {
    id: "prd_001",
    name: "Pulse Insights Pro",
    sku: "PIP-401",
    category: "Analytics",
    price: 249,
    inventory: 42,
    status: "active",
    featured: true,
    description: "Advanced reporting workspace with scheduled exports and KPI benchmarking.",
    updatedAt: "2026-04-18T09:30:00.000Z",
  },
  {
    id: "prd_002",
    name: "Workflow Automator",
    sku: "WFA-220",
    category: "Automation",
    price: 179,
    inventory: 17,
    status: "active",
    featured: false,
    description: "Multi-step operations builder for approvals, escalations, and follow-up tasks.",
    updatedAt: "2026-04-20T11:10:00.000Z",
  },
  {
    id: "prd_003",
    name: "Ledger Sync",
    sku: "LGS-105",
    category: "Finance",
    price: 129,
    inventory: 9,
    status: "out-of-stock",
    featured: false,
    description: "Financial reconciliation add-on for invoice, payout, and settlement workflows.",
    updatedAt: "2026-04-15T14:40:00.000Z",
  },
  {
    id: "prd_004",
    name: "Ops Command Center",
    sku: "OCC-310",
    category: "Operations",
    price: 299,
    inventory: 26,
    status: "active",
    featured: true,
    description: "Operational dashboard package for response queues, incidents, and escalation routing.",
    updatedAt: "2026-04-22T08:15:00.000Z",
  },
  {
    id: "prd_005",
    name: "Access Shield",
    sku: "ACS-510",
    category: "Security",
    price: 159,
    inventory: 0,
    status: "draft",
    featured: false,
    description: "Role review and permission audit workflows for internal admin programs.",
    updatedAt: "2026-04-12T16:25:00.000Z",
  },
  {
    id: "prd_006",
    name: "Revenue Monitor",
    sku: "RVM-118",
    category: "Finance",
    price: 189,
    inventory: 31,
    status: "archived",
    featured: false,
    description: "Historical revenue anomaly alerts and recovery playbooks.",
    updatedAt: "2026-04-10T10:05:00.000Z",
  },
]

export function toProductFormValue(product?: DemoProduct): ProductFormValue {
  return {
    name: product?.name ?? "",
    sku: product?.sku ?? "",
    category: product?.category ?? demoProductCategories[0],
    price: product ? String(product.price) : "",
    inventory: product ? String(product.inventory) : "",
    status: product?.status ?? "draft",
    featured: product?.featured ?? false,
    description: product?.description ?? "",
  }
}
