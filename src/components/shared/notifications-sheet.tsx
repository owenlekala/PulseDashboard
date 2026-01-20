"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Check, CheckCheck, Bell, AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

export type NotificationType = "info" | "success" | "warning" | "error"

export interface Notification {
  id: string
  title: string
  description?: string
  type?: NotificationType
  read?: boolean
  createdAt: Date | string
  actionLabel?: string
  onAction?: () => void
}

interface NotificationsSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  notifications?: Notification[]
  onMarkAsRead?: (id: string) => void
  onMarkAllAsRead?: () => void
  onDelete?: (id: string) => void
}

const getNotificationIcon = (type?: NotificationType) => {
  switch (type) {
    case "success":
      return CheckCircle2
    case "error":
      return AlertCircle
    case "warning":
      return AlertTriangle
    case "info":
    default:
      return Info
  }
}

const getNotificationColor = (type?: NotificationType) => {
  switch (type) {
    case "success":
      return "text-green-600 dark:text-green-400"
    case "error":
      return "text-red-600 dark:text-red-400"
    case "warning":
      return "text-yellow-600 dark:text-yellow-400"
    case "info":
    default:
      return "text-blue-600 dark:text-blue-400"
  }
}

export function NotificationsSheet({
  open,
  onOpenChange,
  notifications = [],
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
}: NotificationsSheetProps) {
  const unreadCount = notifications.filter((n) => !n.read).length
  const hasNotifications = notifications.length > 0

  const handleMarkAsRead = (id: string) => {
    onMarkAsRead?.(id)
  }

  const formatDate = (date: Date | string) => {
    try {
      const dateObj = typeof date === "string" ? new Date(date) : date
      const now = new Date()
      const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)
      
      if (diffInSeconds < 60) return "Just now"
      if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60)
        return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`
      }
      if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600)
        return `${hours} hour${hours !== 1 ? "s" : ""} ago`
      }
      const days = Math.floor(diffInSeconds / 86400)
      return `${days} day${days !== 1 ? "s" : ""} ago`
    } catch {
      return "Recently"
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0">
        <div className="px-6 pt-6">
          <SheetHeader className="p-0">
            <div className="flex items-start justify-between gap-4 pr-10">
              <div className="flex-1 min-w-0">
                <SheetTitle>Notifications</SheetTitle>
                <SheetDescription>
                  {unreadCount > 0
                    ? `${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`
                    : "All caught up!"}
                </SheetDescription>
              </div>
              {hasNotifications && unreadCount > 0 && onMarkAllAsRead && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onMarkAllAsRead}
                  className="h-8 shrink-0"
                >
                  <CheckCheck className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Mark all read</span>
                  <span className="sm:hidden">All</span>
                </Button>
              )}
            </div>
          </SheetHeader>
        </div>

        <ScrollArea className="mt-6 h-[calc(100vh-8rem)]">
          <div className="px-6 pb-6">
            {!hasNotifications ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Bell className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold">No notifications</h3>
                <p className="text-sm text-muted-foreground">
                  You're all caught up! Check back later for updates.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
              {notifications.map((notification) => {
                const Icon = getNotificationIcon(notification.type)
                const iconColor = getNotificationColor(notification.type)

                return (
                  <div
                    key={notification.id}
                    className={cn(
                      "group relative rounded-lg border p-4 transition-colors",
                      notification.read
                        ? "bg-background"
                        : "bg-muted/50 border-primary/20"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn("mt-0.5", iconColor)}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <p
                            className={cn(
                              "text-sm font-medium",
                              !notification.read && "font-semibold"
                            )}
                          >
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <Badge variant="secondary" className="h-2 w-2 rounded-full p-0" />
                          )}
                        </div>
                        {notification.description && (
                          <p className="text-sm text-muted-foreground">
                            {notification.description}
                          </p>
                        )}
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-xs text-muted-foreground">
                            {formatDate(notification.createdAt)}
                          </span>
                          <div className="flex items-center gap-2">
                            {!notification.read && onMarkAsRead && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2 text-xs"
                                onClick={() => handleMarkAsRead(notification.id)}
                              >
                                <Check className="mr-1 h-3 w-3" />
                                Mark read
                              </Button>
                            )}
                            {notification.onAction && notification.actionLabel && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 px-2 text-xs"
                                onClick={notification.onAction}
                              >
                                {notification.actionLabel}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

