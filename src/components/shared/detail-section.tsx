"use client"

interface DetailSectionProps {
  title: string
  description?: string
  children: React.ReactNode
}

export function DetailSection({
  title,
  description,
  children,
}: DetailSectionProps) {
  return (
    <section className="space-y-3">
      <div className="space-y-1">
        <h3 className="text-sm font-medium">{title}</h3>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  )
}
