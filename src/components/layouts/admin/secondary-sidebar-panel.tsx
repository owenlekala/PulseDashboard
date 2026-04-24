"use client"

import Link from "next/link"
import { LayoutLeftbarCloseLine, LayoutLeftbarOpenLine } from "@mingcute/react"

import {
  type AdminNavSection,
} from "@/components/layouts/admin/admin-nav-config"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SecondarySidebarPanelProps {
  section: AdminNavSection
  currentPath: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function SecondarySidebarPanel({
  section,
  currentPath,
  isOpen,
  onOpenChange,
}: SecondarySidebarPanelProps) {
  return (
    <aside
      className={cn(
        "border-r bg-background sticky top-0 z-40 hidden h-svh shrink-0 self-start overflow-visible transition-[width,border-color] duration-200 md:flex md:flex-col",
        isOpen ? "w-56 border-border" : "w-0 border-transparent"
      )}
    >
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        onClick={() => onOpenChange(!isOpen)}
        className="bg-background! hover:bg-background! text-muted-foreground hover:text-foreground absolute top-16 right-0 z-50 hidden -translate-y-1/2 translate-x-1/2 rounded-full border shadow-sm md:inline-flex"
        aria-expanded={isOpen}
        aria-label={`${isOpen ? "Close" : "Open"} ${section.title} menu`}
        title={`${isOpen ? "Close" : "Open"} ${section.title} menu`}
      >
        {isOpen ? (
          <LayoutLeftbarCloseLine className="size-4" />
        ) : (
          <LayoutLeftbarOpenLine className="size-4" />
        )}
      </Button>

      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col overflow-hidden transition-opacity duration-200",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!isOpen}
      >
        <div className="flex h-16 items-center border-b px-5">
          <div className="min-w-0">
            <p className="text-foreground truncate text-xs font-semibold">
              {section.title}
            </p>
            <p className="text-muted-foreground truncate text-[11px] leading-4">
              {section.description}
            </p>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-3">
            <div>
              <nav className="space-y-1" aria-label={`${section.title} menu`}>
                {section.items.map((item) => {
                  const isActive = currentPath === item.href
                  const ItemIcon = isActive ? item.icon.fill : item.icon.line

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg px-2.5 py-2 transition-colors",
                        isActive
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                      )}
                    >
                      <ItemIcon className="size-4 shrink-0" />
                      <span className="min-w-0 truncate text-xs font-medium">
                        {item.title}
                      </span>
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>
        </ScrollArea>
      </div>
    </aside>
  )
}
