"use client"

import { BankCardLine, CheckCircleFill } from "@mingcute/react"

import { ActionMenu, SectionCard } from "@/components/shared"
import type { PaymentMethod } from "@/data/demo-billing-data"

interface BillingPaymentMethodsProps {
  methods: PaymentMethod[]
}

export function BillingPaymentMethods({
  methods,
}: BillingPaymentMethodsProps) {
  return (
    <SectionCard
      title="Payment Methods"
      description="Saved billing instruments and fallback payment coverage."
    >
      <div className="space-y-3">
        {methods.map((method) => (
          <div
            key={method.id}
            className="flex items-center gap-3 rounded-md border bg-muted/20 p-3"
          >
            <div className="text-muted-foreground">
              <BankCardLine className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">
                  {method.brand} ending in {method.last4}
                </p>
                {method.isDefault ? (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                    <CheckCircleFill className="size-3.5" />
                    Default
                  </span>
                ) : null}
              </div>
              <p className="text-sm text-muted-foreground">
                Expires {method.expires}
              </p>
            </div>
            <ActionMenu
              label="Payment method actions"
              items={[
                { label: "Set as default" },
                { label: "Edit details" },
                {
                  label: "Remove method",
                  separatorBefore: true,
                  tone: "destructive",
                },
              ]}
            />
          </div>
        ))}
      </div>
    </SectionCard>
  )
}
