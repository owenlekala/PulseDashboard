"use client"

import { useState } from "react"
import {
  PageHeader,
  DeleteDialog,
  ChangePasswordDialog,
  ConfirmDialog,
  EmptyState,
  StatusBadge,
  LoadingSpinner,
  NotificationsSheet,
  toast,
} from "@/components/shared"
import {
  GlassCard,
  GlassCardContent,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle,
} from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DatePicker } from "@/components/ui/date-picker"
import { DateTimePicker } from "@/components/ui/date-time-picker"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import type { DateRange } from "react-day-picker"
import {
  Plus,
  Trash2,
  Lock,
  CheckCircle,
  AlertCircle,
  Bell,
  Package,
  FileText,
  Settings,
  TrendingUp,
} from "lucide-react"
import type { Notification } from "@/components/shared"

export default function ComponentsPage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedDateTime, setSelectedDateTime] = useState<Date | undefined>(undefined)
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(undefined)

  const demoNotifications: Notification[] = [
    {
      id: "1",
      title: "New user registered",
      description: "John Doe has created an account",
      type: "success",
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 5),
      actionLabel: "View",
      onAction: () => toast.info("Viewing user"),
    },
    {
      id: "2",
      title: "System maintenance scheduled",
      description: "Maintenance will occur on January 25th at 2 AM",
      type: "warning",
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
    {
      id: "3",
      title: "Payment failed",
      description: "Failed to process payment for invoice #1234",
      type: "error",
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      actionLabel: "Retry",
      onAction: () => toast.error("Retrying payment"),
    },
    {
      id: "4",
      title: "Profile updated",
      description: "Your profile information has been updated",
      type: "info",
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    },
  ]

  const handleDelete = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast.success("Item deleted successfully")
  }

  const handlePasswordChange = async (data: { currentPassword: string; newPassword: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast.success("Password changed successfully")
  }

  const handleConfirm = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast.success("Action confirmed")
  }

  const handleBulkMarkAsRead = () => {
    toast.success("All notifications marked as read")
  }

  const handleMarkAsRead = (id: string) => {
    toast.info(`Notification ${id} marked as read`)
  }

  const simulateLoading = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Components Showcase"
        description="Demonstration of all shared components available in the dashboard"
        backHref="/dashboard"
      />

      {/* Page Header Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Page Header</CardTitle>
          <CardDescription>
            Reusable page header with optional back button and action button
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">With back button and action:</p>
            <PageHeader
              title="Example Page"
              description="This is an example description"
              backHref="/dashboard"
              action={{
                label: "New Item",
                onClick: () => toast.success("Creating new item"),
                icon: Plus,
              }}
            />
          </div>
          <Separator />
          <div className="space-y-2">
            <p className="text-sm font-medium">With action only:</p>
            <PageHeader
              title="Settings"
              description="Manage your settings"
              action={{
                label: "Save Changes",
                onClick: () => toast.info("Saving changes"),
                variant: "default",
              }}
            />
          </div>
          <Separator />
          <div className="space-y-2">
            <p className="text-sm font-medium">Minimal (title only):</p>
            <PageHeader title="Simple Page" />
          </div>
        </CardContent>
      </Card>

      {/* Status Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Status Badges</CardTitle>
          <CardDescription>Visual status indicators for various states</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <StatusBadge status="active" label="Active" />
            <StatusBadge status="inactive" label="Inactive" />
            <StatusBadge status="pending" label="Pending" />
            <StatusBadge status="error" label="Error" />
            <StatusBadge status="success" label="Success" />
            <StatusBadge status="warning" label="Warning" />
            <StatusBadge status="info" label="Info" />
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <Card>
        <CardHeader>
          <CardTitle>Dialogs</CardTitle>
          <CardDescription>Confirmation and form dialogs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => setDeleteDialogOpen(true)} variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Open Delete Dialog
            </Button>
            <Button onClick={() => setPasswordDialogOpen(true)}>
              <Lock className="mr-2 h-4 w-4" />
              Change Password
            </Button>
            <Button onClick={() => setConfirmDialogOpen(true)} variant="outline">
              <CheckCircle className="mr-2 h-4 w-4" />
              Open Confirm Dialog
            </Button>
          </div>

          <DeleteDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            onConfirm={handleDelete}
            title="Delete Item"
            description="This action cannot be undone. This will permanently delete the item."
            itemName="Example Item"
          />

          <ChangePasswordDialog
            open={passwordDialogOpen}
            onOpenChange={setPasswordDialogOpen}
            onSubmit={handlePasswordChange}
          />

          <ConfirmDialog
            open={confirmDialogOpen}
            onOpenChange={setConfirmDialogOpen}
            onConfirm={handleConfirm}
            title="Confirm Action"
            description="Are you sure you want to proceed with this action?"
            confirmLabel="Proceed"
          />
        </CardContent>
      </Card>

      {/* Toast Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Toast Notifications</CardTitle>
          <CardDescription>Display temporary messages to users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => toast.success("Operation completed successfully!")}>
              Success Toast
            </Button>
            <Button
              onClick={() => toast.error("An error occurred", "Please try again later")}
              variant="destructive"
            >
              Error Toast
            </Button>
            <Button
              onClick={() => toast.warning("Warning message", "This requires your attention")}
              variant="outline"
            >
              Warning Toast
            </Button>
            <Button onClick={() => toast.info("Information", "Here's some useful info")}>
              Info Toast
            </Button>
            <Button
              onClick={() => {
                const toastId = toast.loading("Processing...")
                setTimeout(() => {
                  toast.dismiss(toastId)
                  toast.success("Process completed!")
                }, 2000)
              }}
              variant="secondary"
            >
              Loading Toast
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications Sheet */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications Sheet</CardTitle>
          <CardDescription>Side sheet for displaying notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setNotificationsOpen(true)}>
            <Bell className="mr-2 h-4 w-4" />
            Open Notifications ({demoNotifications.filter((n) => !n.read).length} unread)
          </Button>
          <NotificationsSheet
            open={notificationsOpen}
            onOpenChange={setNotificationsOpen}
            notifications={demoNotifications}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleBulkMarkAsRead}
          />
        </CardContent>
      </Card>

      {/* Empty States */}
      <Card>
        <CardHeader>
          <CardTitle>Empty States</CardTitle>
          <CardDescription>Display when there's no content to show</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border p-6">
            <EmptyState
              icon={Package}
              title="No items found"
              description="Get started by creating a new item"
              action={{
                label: "Create Item",
                onClick: () => toast.success("Creating item"),
              }}
            />
          </div>
          <Separator />
          <div className="rounded-lg border p-6">
            <EmptyState
              icon={FileText}
              title="No documents"
              description="Upload your first document to get started"
              action={{
                label: "Upload Document",
                href: "#",
              }}
            />
          </div>
          <Separator />
          <div className="rounded-lg border p-6">
            <EmptyState
              icon={Settings}
              title="No settings available"
              description="Settings will appear here when available"
            />
          </div>
        </CardContent>
      </Card>

      {/* Loading Spinner */}
      <Card>
        <CardHeader>
          <CardTitle>Loading Spinner</CardTitle>
          <CardDescription>Indicate loading states</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-8">
            <div className="space-y-2">
              <p className="text-sm font-medium">Small</p>
              <LoadingSpinner size="sm" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Medium (default)</p>
              <LoadingSpinner size="md" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Large</p>
              <LoadingSpinner size="lg" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">With text</p>
              <LoadingSpinner size="md" text="Loading data..." />
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
            <Button onClick={simulateLoading} disabled={isLoading}>
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span className="ml-2">Loading...</span>
                </>
              ) : (
                "Simulate Loading"
              )}
            </Button>
            {isLoading && (
              <div className="rounded-lg border p-8">
                <LoadingSpinner text="Processing your request..." />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Glass Card Examples */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Glass Card Component</h2>
        <p className="text-muted-foreground">
          A 2-tone "soft glass / dark elevation" card with gradient background and inset shadows
        </p>
      </div>

      {/* Example: Glass Card with Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <GlassCard outerTitle="Users">
          <GlassCardContent>
            <GlassCardHeader>
              <GlassCardTitle className="flex items-center justify-between">
                Total Users
                <Badge
                  variant="outline"
                  className="text-emerald-400 bg-emerald-500/10 border-none"
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12%
                </Badge>
              </GlassCardTitle>
              <GlassCardDescription>Active users this month</GlassCardDescription>
            </GlassCardHeader>
            <div className="text-3xl font-bold text-card-foreground">2,847</div>
            <p className="text-xs text-muted-foreground mt-2">
              +234 from last month
            </p>
          </GlassCardContent>
        </GlassCard>

        <GlassCard outerTitle="Revenue">
          <GlassCardContent>
            <GlassCardHeader>
              <GlassCardTitle className="flex items-center justify-between">
                Revenue
                <Badge
                  variant="outline"
                  className="text-emerald-400 bg-emerald-500/10 border-none"
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8.2%
                </Badge>
              </GlassCardTitle>
              <GlassCardDescription>Total revenue this quarter</GlassCardDescription>
            </GlassCardHeader>
            <div className="text-3xl font-bold text-card-foreground">$45,231</div>
            <p className="text-xs text-muted-foreground mt-2">
              +$3,421 from last quarter
            </p>
          </GlassCardContent>
        </GlassCard>

        <GlassCard outerTitle="Orders">
          <GlassCardContent>
            <GlassCardHeader>
              <GlassCardTitle className="flex items-center justify-between">
                Orders
                <Badge
                  variant="outline"
                  className="text-emerald-400 bg-emerald-500/10 border-none"
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +5.2%
                </Badge>
              </GlassCardTitle>
              <GlassCardDescription>Orders processed today</GlassCardDescription>
            </GlassCardHeader>
            <div className="text-3xl font-bold text-card-foreground">1,429</div>
            <p className="text-xs text-muted-foreground mt-2">
              +31 from yesterday
            </p>
          </GlassCardContent>
        </GlassCard>
      </div>

      {/* Example: Glass Card with Content */}
      <GlassCard outerTitle="Example">
        <GlassCardContent>
          <GlassCardHeader>
            <GlassCardTitle>Glass Card Example</GlassCardTitle>
            <GlassCardDescription>
              This card demonstrates the soft glass / dark elevation styling
            </GlassCardDescription>
          </GlassCardHeader>
          <div className="space-y-4">
            <p className="text-card-foreground/80">
              This card features a 2-tone structure with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Outer container with subtle shadow</li>
              <li>Inner surface with gradient (top → bottom)</li>
              <li>Inset shadow for depth</li>
              <li>Hairline border effect</li>
              <li>Theme-aware colors</li>
            </ul>
          </div>
        </GlassCardContent>
      </GlassCard>

      {/* Example: Elevated Glass Card */}
      <GlassCard outerTitle="Elevated" variant="elevated">
        <GlassCardContent>
          <GlassCardHeader>
            <GlassCardTitle>Elevated Glass Card</GlassCardTitle>
            <GlassCardDescription>
              This card uses the elevated variant for more prominence
            </GlassCardDescription>
          </GlassCardHeader>
          <p className="text-card-foreground/80">
            The elevated variant adds additional shadow for a more prominent appearance.
          </p>
        </GlassCardContent>
      </GlassCard>

      {/* Example: Date Picker */}
      <GlassCard outerTitle="Form Components">
        <GlassCardContent>
          <GlassCardHeader>
            <GlassCardTitle>Date Picker</GlassCardTitle>
            <GlassCardDescription>
              A date picker component with calendar popover and input field
            </GlassCardDescription>
          </GlassCardHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground">
                Select a date
              </label>
              <DatePicker
                placeholder="Pick a date"
                value={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date)
                  if (date) {
                    toast.success(`Selected date: ${date.toLocaleDateString()}`)
                  }
                }}
              />
            </div>
            {selectedDate && (
              <p className="text-sm text-muted-foreground">
                Selected: {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground">
                Disabled date picker
              </label>
              <DatePicker
                placeholder="Disabled picker"
                disabled
              />
            </div>
          </div>
        </GlassCardContent>
      </GlassCard>

      {/* Example: Date Time Picker */}
      <GlassCard outerTitle="Form Components">
        <GlassCardContent>
          <GlassCardHeader>
            <GlassCardTitle>Date &amp; Time Picker</GlassCardTitle>
            <GlassCardDescription>
              Select a date and time in a single control
            </GlassCardDescription>
          </GlassCardHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground">
                Select date &amp; time
              </label>
              <DateTimePicker
                value={selectedDateTime}
                onChange={(dt) => {
                  setSelectedDateTime(dt)
                  if (dt) toast.success(`Selected: ${dt.toLocaleString()}`)
                }}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground">
                Disabled date &amp; time picker
              </label>
              <DateTimePicker disabled />
            </div>
          </div>
        </GlassCardContent>
      </GlassCard>

      {/* Example: Date Range Picker */}
      <GlassCard outerTitle="Form Components">
        <GlassCardContent>
          <GlassCardHeader>
            <GlassCardTitle>Date Range Picker</GlassCardTitle>
            <GlassCardDescription>
              Select a start and end date (range)
            </GlassCardDescription>
          </GlassCardHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground">
                Select a date range
              </label>
              <DateRangePicker
                value={selectedRange}
                onChange={(range) => {
                  setSelectedRange(range)
                  if (range?.from && range?.to) {
                    toast.success(
                      `Range: ${range.from.toLocaleDateString()} – ${range.to.toLocaleDateString()}`
                    )
                  }
                }}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground">
                Disabled date range picker
              </label>
              <DateRangePicker disabled />
            </div>
          </div>
        </GlassCardContent>
      </GlassCard>
    </div>
  )
}

