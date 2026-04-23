"use client"

import { PageHeader } from "@/components/shared"
import {
  GlassCard,
  GlassCardContent,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle,
} from "@/components/ui/glass-card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  clientInvoices,
  clientSubscriptionPackage,
} from "@/data/demo-client-data"

export function ClientBillingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Billing"
        description="Review your active plan, payment setup, and the latest invoice history from one place."
      />

      <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <GlassCard outerTitle="Current package">
          <GlassCardContent>
            <GlassCardHeader>
              <div className="flex flex-col gap-4">
                <div className="space-y-1.5">
                  <GlassCardTitle>{clientSubscriptionPackage.name}</GlassCardTitle>
                  <GlassCardDescription>
                    {clientSubscriptionPackage.subtitle}
                  </GlassCardDescription>
                </div>

                <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
                  <div className="space-y-1">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                      Subscription pricing
                    </p>
                    <div className="flex items-end gap-2">
                      <div className="text-3xl font-semibold tracking-tight text-card-foreground">
                        {clientSubscriptionPackage.amount}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {clientSubscriptionPackage.billingCycle}
                    </p>
                  </div>

                  <div className="rounded-2xl border bg-muted/30 px-4 py-3 sm:min-w-[180px] sm:text-right">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                      Next renewal
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      {clientSubscriptionPackage.renewalDate}
                    </p>
                  </div>
                </div>
              </div>
            </GlassCardHeader>

            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    Seats
                  </p>
                  <p className="text-sm font-semibold">
                    {clientSubscriptionPackage.seatsUsed}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    Usage note
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {clientSubscriptionPackage.seatLimitNote}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold">Included in this package</h3>
                <div className="flex flex-wrap gap-2">
                  {clientSubscriptionPackage.features.map((feature) => (
                    <span
                      key={feature}
                      className="inline-flex rounded-full border bg-muted/20 px-3 py-1.5 text-sm text-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </GlassCardContent>
        </GlassCard>

        <GlassCard outerTitle="Recent invoices">
          <GlassCardContent>
            <GlassCardHeader>
              <GlassCardTitle>Invoice history</GlassCardTitle>
              <GlassCardDescription>
                A billing ledger for the package currently assigned to this client workspace.
              </GlassCardDescription>
            </GlassCardHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Issued</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {invoice.issuedAt}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                        {invoice.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {invoice.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </GlassCardContent>
        </GlassCard>
      </div>
    </div>
  )
}
