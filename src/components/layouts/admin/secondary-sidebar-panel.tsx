"use client"

import Link from "next/link"
import { PanelLeftClose } from "lucide-react"

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
  onClose: () => void
}

export function SecondarySidebarPanel({
  section,
  currentPath,
  isOpen,
  onClose,
}: SecondarySidebarPanelProps) {
  return (
    <aside
      className={cn(
        "border-r bg-background sticky top-0 hidden h-svh shrink-0 self-start overflow-visible transition-[width,opacity,border-color] duration-200 md:flex md:flex-col",
        isOpen ? "w-64 opacity-100 border-border" : "w-0 opacity-0 border-transparent"
      )}
      aria-hidden={!isOpen}
    >
      {isOpen ? (
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          onClick={onClose}
          className="bg-background text-muted-foreground hover:text-foreground absolute top-1/2 right-0 z-10 hidden -translate-y-1/2 translate-x-1/2 rounded-full border shadow-sm md:inline-flex"
          aria-label={`Close ${section.title} menu`}
          title={`Close ${section.title} menu`}
        >
          <PanelLeftClose className="size-4" />
        </Button>
      ) : null}

      <div className="flex h-16 items-center border-b px-5">
        <div className="min-w-0">
          <p className="text-foreground truncate text-sm font-semibold">
            {section.title}
          </p>
          <p className="text-muted-foreground truncate text-xs">
            {section.description}
          </p>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-5">
          <div className="space-y-3">
            <p className="text-muted-foreground text-xs font-semibold tracking-[0.18em] uppercase">
              Menu
            </p>
            <nav className="space-y-1" aria-label={`${section.title} menu`}>
              {section.items.map((item) => {
                const isActive = currentPath === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors",
                      isActive
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    )}
                  >
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">
                        {item.title}
                      </span>
                      {item.description ? (
                        <span className="text-muted-foreground mt-0.5 block text-xs leading-5">
                          {item.description}
                        </span>
                      ) : null}
                    </span>
                    <span
                      className={cn(
                        "ml-auto mt-0.5 h-5 w-0.5 shrink-0 rounded-full transition-colors",
                        isActive
                          ? "bg-primary"
                          : "bg-transparent group-hover:bg-border"
                      )}
                    />
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </ScrollArea>
    </aside>
  )
}
