"use client"

import { type ReactNode, useMemo, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ArrowRightLine,
  BankCardLine,
  ExitDoorLine,
  MenuLine,
  Message2Line,
  Settings2Line,
  SparklesLine,
} from "@mingcute/react"

import {
  clientNavItems,
  clientUser,
  type ClientNavItem,
} from "@/components/layouts/client/client-nav-config"
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

function isNavItemActive(pathname: string, item: ClientNavItem) {
  if (item.href === "/client") {
    return pathname === "/client"
  }

  return pathname === item.href || pathname.startsWith(`${item.href}/`)
}

export function ClientLayoutShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeItem = useMemo(
    () =>
      clientNavItems.find((item) => isNavItemActive(pathname, item)) ??
      clientNavItems[0],
    [pathname]
  )

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6">
          <div className="flex min-w-0 items-center gap-2.5">
            <Button
              variant="outline"
              size="icon"
              className="size-8 rounded-xl md:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <MenuLine className="size-3.5" />
              <span className="sr-only">Open client navigation</span>
            </Button>

            <Link href="/client" className="flex min-w-0 items-center gap-2.5">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <SparklesLine className="size-4" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-xs font-semibold tracking-tight sm:text-sm">
                  Pulse Client
                </div>
                <div className="truncate text-[11px] text-muted-foreground">
                  {clientUser.company}
                </div>
              </div>
            </Link>

          </div>

          <nav className="hidden flex-1 items-center justify-center md:flex">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {clientNavItems.map((item) => {
                const active = isNavItemActive(pathname, item)

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors lg:text-sm",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="size-3.5" />
                    {item.title}
                  </Link>
                )
              })}
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <HeaderUserMenu />
          </div>
        </div>
      </header>

      <MobileClientNav
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        activeItem={activeItem}
        pathname={pathname}
      />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:px-6 md:py-8">
        {children}
      </main>
    </div>
  )
}

function HeaderUserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-xl">
          <Avatar className="size-8 rounded-lg">
            <AvatarImage src={clientUser.avatar} alt={clientUser.name} />
            <AvatarFallback className="rounded-lg">AC</AvatarFallback>
          </Avatar>
          <span className="sr-only">Open user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 rounded-xl">
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-2 py-2 text-left text-sm">
            <Avatar className="h-9 w-9 rounded-xl">
              <AvatarImage src={clientUser.avatar} alt={clientUser.name} />
              <AvatarFallback className="rounded-xl">AC</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{clientUser.name}</span>
              <span className="truncate text-xs text-muted-foreground">
                {clientUser.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <SparklesLine />
            Workspace overview
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/client/billing">
              <BankCardLine />
              Billing
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/client/messages">
              <Message2Line />
              Messages
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/client/settings">
              <Settings2Line />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <ExitDoorLine />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface MobileClientNavProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  activeItem: ClientNavItem
  pathname: string
}

function MobileClientNav({
  open,
  onOpenChange,
  activeItem,
  pathname,
}: MobileClientNavProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[90vw] max-w-sm p-0">
        <SheetHeader className="border-b">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <SparklesLine className="size-4" />
            </div>
            <div className="text-left">
              <SheetTitle>Pulse Client</SheetTitle>
              <SheetDescription>
                Navigate between your overview, billing, messages, and settings.
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-2 p-4">
          <div className="rounded-2xl border bg-muted/30 p-3">
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Current page
            </div>
            <div className="mt-2 flex items-center gap-2 text-sm font-semibold">
              <activeItem.icon className="size-4" />
              {activeItem.title}
            </div>
          </div>

          <div className="space-y-2">
            {clientNavItems.map((item) => {
              const active = isNavItemActive(pathname, item)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => onOpenChange(false)}
                  className={cn(
                    "flex items-start justify-between gap-3 rounded-2xl border px-4 py-3 transition-colors",
                    active
                      ? "border-primary/25 bg-primary/6"
                      : "border-border bg-background hover:bg-muted/50"
                  )}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <item.icon className="size-4" />
                      {item.title}
                    </div>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <ArrowRightLine className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                </Link>
              )
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
