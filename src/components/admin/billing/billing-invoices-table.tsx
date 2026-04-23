"use client"

import { Download, RefreshCw, Send } from "lucide-react"

import { ActionMenu, SectionCard, StatusBadge } from "@/components/shared"
import { Button } from "@/components/ui/button"
import type { BillingInvoice } from "@/data/demo-billing-data"

interface BillingInvoicesTableProps {
  invoices: BillingInvoice[]
}

const invoiceStatusMap = {
  paid: "success",
  pending: "pending",
  failed: "error",
} as const

export function BillingInvoicesTable({
  invoices,
}: BillingInvoicesTableProps) {
  return (
    <SectionCard
      title="Recent Invoices"
      description="A clean admin billing list for payment operations and follow-up actions."
      actions={
        <>
          <Button variant="outline" size="sm">
            Export ledger
          </Button>
          <Button size="sm">Create invoice</Button>
        </>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px]">
          <thead>
            <tr className="border-b text-left">
              <th className="pb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Invoice
              </th>
              <th className="pb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Customer
              </th>
              <th className="pb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Amount
              </th>
              <th className="pb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Status
              </th>
              <th className="pb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Due Date
              </th>
              <th className="pb-3" />
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b last:border-b-0">
                <td className="py-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{invoice.id}</p>
                    <p className="text-sm text-muted-foreground">
                      Issued {invoice.issuedAt}
                    </p>
                  </div>
                </td>
                <td className="py-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{invoice.customer}</p>
                    <p className="text-sm text-muted-foreground">
                      {invoice.plan}
                    </p>
                  </div>
                </td>
                <td className="py-4 text-sm font-medium">{invoice.amount}</td>
                <td className="py-4">
                  <StatusBadge
                    status={invoiceStatusMap[invoice.status]}
                    label={invoice.status}
                  />
                </td>
                <td className="py-4 text-sm text-muted-foreground">
                  {invoice.dueAt}
                </td>
                <td className="py-4 text-right">
                  <ActionMenu
                    label="Invoice actions"
                    items={[
                      { label: "Download PDF", icon: Download },
                      { label: "Send reminder", icon: Send },
                      {
                        label: "Retry payment",
                        icon: RefreshCw,
                        separatorBefore: true,
                      },
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  )
}
