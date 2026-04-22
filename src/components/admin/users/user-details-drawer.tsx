"use client"

import { Mail, MapPin, Phone, ShieldCheck, Ticket, UserRound } from "lucide-react"

import type { DemoUser } from "@/data/demo-table-data"
import { StatusBadge } from "@/components/shared/status-badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

interface UserDetailsDrawerProps {
  user?: DemoUser | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
}

export function UserDetailsDrawer({
  user,
  open,
  onOpenChange,
}: UserDetailsDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg">
        {user ? (
          <>
            <SheetHeader className="space-y-4 border-b">
              <div className="flex items-start gap-3 pr-8">
                <Avatar className="size-14 rounded-xl">
                  <AvatarImage src="/avatar.png" alt={user.name} />
                  <AvatarFallback className="rounded-xl">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <SheetTitle className="text-xl">{user.name}</SheetTitle>
                    <StatusBadge
                      status={
                        user.status === "suspended"
                          ? "error"
                          : user.status
                      }
                      label={user.status}
                    />
                  </div>
                  <SheetDescription>
                    {user.role} in {user.department} reporting to {user.manager}
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>
            <div className="flex-1 space-y-6 overflow-y-auto p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <DetailItem icon={Mail} label="Email" value={user.email} />
                <DetailItem icon={Phone} label="Phone" value={user.phone} />
                <DetailItem icon={MapPin} label="Location" value={user.location} />
                <DetailItem
                  icon={UserRound}
                  label="Joined"
                  value={new Date(user.joinDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                />
                <DetailItem
                  icon={ShieldCheck}
                  label="Last active"
                  value={new Date(user.lastActive).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                />
                <DetailItem
                  icon={Ticket}
                  label="Tickets resolved"
                  value={`${user.ticketsResolved}`}
                />
              </div>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Performance snapshot</h3>
                  <span className="text-sm text-muted-foreground">
                    {user.completionRate}% completion
                  </span>
                </div>
                <Progress value={user.completionRate} className="h-2.5" />
                <p className="text-sm text-muted-foreground">
                  {user.name} has resolved {user.ticketsResolved} assigned tasks
                  and is currently aligned with the {user.department} delivery
                  target.
                </p>
              </div>
            </div>
            <SheetFooter className="border-t">
              <div className="flex w-full flex-col gap-2 sm:flex-row">
                <Button className="flex-1">Message user</Button>
                <Button variant="outline" className="flex-1">
                  View full profile
                </Button>
              </div>
            </SheetFooter>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}

interface DetailItemProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}

function DetailItem({ icon: Icon, label, value }: DetailItemProps) {
  return (
    <div className="rounded-md border bg-muted/20 p-3">
      <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
        <Icon className="size-3.5" />
        {label}
      </div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  )
}
