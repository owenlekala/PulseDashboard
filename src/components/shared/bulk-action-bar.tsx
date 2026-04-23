"use client"

interface BulkActionBarProps {
  selectionLabel: string
  actions: React.ReactNode
}

export function BulkActionBar({
  selectionLabel,
  actions,
}: BulkActionBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border bg-muted/50 p-3">
      <p className="text-sm text-muted-foreground">{selectionLabel}</p>
      <div className="flex items-center gap-2">{actions}</div>
    </div>
  )
}
