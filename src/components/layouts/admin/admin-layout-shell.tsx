"use client"

import { type ReactNode, useMemo, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BadgeCheck,
  Bell,
  Command,
  CreditCard,
  LogOut,
  PanelLeft,
  PanelLeftClose,
  Sparkles,
} from "lucide-react"

import {
  adminNavSections,
  adminUser,
  adminUtilityLinks,
  findActiveAdminSection,
  type AdminNavSection,
} from "@/components/layouts/admin/admin-nav-config"
import { PrimarySidebarRail } from "@/components/layouts/admin/primary-sidebar-rail"
import { SecondarySidebarPanel } from "@/components/layouts/admin/secondary-sidebar-panel"
import { BreadcrumbNav } from "@/components/shared/breadcrumb-nav"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export function AdminLayoutShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const routeSection = useMemo(
    () => findActiveAdminSection(pathname),
    [pathname]
  )
  const [secondaryOpen, setSecondaryOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleSelectSection = (
    section: AdminNavSection,
    isCurrentPath: boolean
  ) => {
    if (section.key === routeSection.key && isCurrentPath) {
      setSecondaryOpen((open) => !open)
      return
    }

    setSecondaryOpen(true)
  }

  return (
    <div className="bg-background flex min-h-screen items-start">
      <PrimarySidebarRail
        sections={adminNavSections}
        utilityLinks={adminUtilityLinks}
        activeSectionKey={routeSection.key}
        onSelectSection={handleSelectSection}
        currentPath={pathname}
      />

      <SecondarySidebarPanel
        section={routeSection}
        currentPath={pathname}
        isOpen={secondaryOpen}
      />

      <MobileAdminNav
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        activeSectionKey={routeSection.key}
        currentPath={pathname}
      />

      <div className="min-w-0 flex-1">
        <header className="bg-background sticky top-0 z-20">
          <div className="flex h-16 items-center justify-between gap-3 px-4 md:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setMobileOpen(true)}
                className="rounded-xl md:hidden"
              >
                <Command className="size-4" />
                <span className="sr-only">Open navigation</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSecondaryOpen((open) => !open)}
                className="hidden rounded-xl md:inline-flex"
              >
                {secondaryOpen ? (
                  <PanelLeftClose className="size-4" />
                ) : (
                  <PanelLeft className="size-4" />
                )}
                <span className="sr-only">Toggle section menu</span>
              </Button>
              <BreadcrumbNav />
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <HeaderUserMenu />
            </div>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

function HeaderUserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-xl">
          <Avatar className="size-8 rounded-lg">
            <AvatarImage src={adminUser.avatar} alt={adminUser.name} />
            <AvatarFallback className="rounded-lg">JD</AvatarFallback>
          </Avatar>
          <span className="sr-only">Open user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 rounded-xl">
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-2 py-2 text-left text-sm">
            <Avatar className="h-9 w-9 rounded-xl">
              <AvatarImage src={adminUser.avatar} alt={adminUser.name} />
              <AvatarFallback className="rounded-xl">JD</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{adminUser.name}</span>
              <span className="text-muted-foreground truncate text-xs">
                {adminUser.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Sparkles />
            Upgrade to Pro
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheck />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface MobileAdminNavProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  activeSectionKey: string
  currentPath: string
}

function MobileAdminNav({
  open,
  onOpenChange,
  activeSectionKey,
  currentPath,
}: MobileAdminNavProps) {
  const activeSection =
    adminNavSections.find((section) => section.key === activeSectionKey) ??
    adminNavSections[0]

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[90vw] max-w-sm p-0">
        <SheetHeader className="border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-xl">
              <Command className="size-4" />
            </div>
            <div className="text-left">
              <SheetTitle>Pulse Dashboard</SheetTitle>
              <SheetDescription>
                Switch sections and jump into nested admin pages.
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6 overflow-y-auto p-4">
          <div className="space-y-2">
            <p className="text-muted-foreground text-xs font-semibold tracking-[0.18em] uppercase">
              Sections
            </p>
            <div className="space-y-1.5">
              {adminNavSections.map((section) => (
                <Link
                  key={section.key}
                  href={section.href}
                  onClick={() => onOpenChange(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border px-3 py-3 transition-colors",
                    section.key === activeSectionKey
                      ? "border-primary/20 bg-primary/6"
                      : "border-transparent bg-muted/40 hover:border-border hover:bg-muted/70"
                  )}
                >
                  <section.icon className="size-4" />
                  <div className="min-w-0">
                    <div className="text-sm font-semibold">{section.title}</div>
                    <p className="text-muted-foreground truncate text-xs">
                      {section.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-muted-foreground text-xs font-semibold tracking-[0.18em] uppercase">
              {activeSection.title}
            </p>
            <div className="space-y-1.5">
              {activeSection.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => onOpenChange(false)}
                  className={cn(
                    "block rounded-xl border px-3 py-3 transition-colors",
                    currentPath === item.href
                      ? "border-primary/20 bg-primary/6"
                      : "border-transparent bg-muted/40 hover:border-border hover:bg-muted/70"
                  )}
                >
                  <div className="text-sm font-semibold">{item.title}</div>
                  {item.description ? (
                    <p className="text-muted-foreground mt-1 text-xs leading-5">
                      {item.description}
                    </p>
                  ) : null}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
