"use client"

import Link from "next/link"
import { CommandLine } from "@mingcute/react"

import {
  type AdminNavSection,
  type AdminUtilityLink,
} from "@/components/layouts/admin/admin-nav-config"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface PrimarySidebarRailProps {
  sections: AdminNavSection[]
  utilityLinks: AdminUtilityLink[]
  activeSectionKey: string
  onSelectSection: (section: AdminNavSection, isCurrentPath: boolean) => void
  currentPath: string
}

export function PrimarySidebarRail({
  sections,
  utilityLinks,
  activeSectionKey,
  onSelectSection,
  currentPath,
}: PrimarySidebarRailProps) {
  return (
    <aside className="bg-sidebar/95 border-r border-sidebar-border sticky top-0 hidden h-svh w-14 shrink-0 flex-col self-start md:flex">
      <div className="flex h-16 items-center justify-center border-b border-sidebar-border">
        <div className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-xl">
          <CommandLine className="size-4" />
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center gap-2 px-2 py-4">
        {sections.map((section) => {
          const isActive = section.key === activeSectionKey
          const isCurrentPath = currentPath === section.href
          const SectionIcon = isActive ? section.icon.fill : section.icon.line

          return (
            <Tooltip key={section.key}>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  variant="ghost"
                  size="icon-sm"
                  className={cn(
                    "text-muted-foreground hover:text-foreground h-8 w-8 rounded-lg",
                    isActive && "text-foreground"
                  )}
                >
                  <Link
                    href={section.href}
                    onClick={(event) => {
                      if (isCurrentPath) {
                        event.preventDefault()
                      }
                      onSelectSection(section, isCurrentPath)
                    }}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <SectionIcon className="size-4" />
                    <span className="sr-only">{section.title}</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={10}>
                {section.title}
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>
      <div className="flex flex-col items-center gap-2 px-2 py-4">
        {utilityLinks.map((item) => (
          <Tooltip key={item.title}>
            <TooltipTrigger asChild>
              <Button
                asChild
                variant="ghost"
                size="icon-sm"
                className="text-muted-foreground hover:text-foreground h-8 w-8 rounded-lg"
              >
                <Link href={item.href}>
                  <item.icon.line className="size-4" />
                  <span className="sr-only">{item.title}</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={10}>
              {item.title}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </aside>
  )
}
