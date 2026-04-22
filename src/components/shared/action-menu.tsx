"use client"

import type { LucideIcon } from "lucide-react"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface ActionMenuItem {
  label: string
  onSelect?: () => void
  icon?: LucideIcon
  tone?: "default" | "destructive"
  separatorBefore?: boolean
}

interface ActionMenuProps {
  label?: string
  items: ActionMenuItem[]
}

export function ActionMenu({
  label = "Actions",
  items,
}: ActionMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        {items.map((item, index) => {
          const Icon = item.icon

          return (
            <div key={`${item.label}-${index}`}>
              {item.separatorBefore ? <DropdownMenuSeparator /> : null}
              <DropdownMenuItem
                onClick={item.onSelect}
                className={item.tone === "destructive" ? "text-destructive" : undefined}
              >
                {Icon ? <Icon className="mr-2 h-4 w-4" /> : null}
                {item.label}
              </DropdownMenuItem>
            </div>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
