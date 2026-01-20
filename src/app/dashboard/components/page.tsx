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
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
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
} from "lucide-react"
import type { Notification } from "@/components/shared"

export default function ComponentsPage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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

      {/* Card Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Card Component</CardTitle>
          <CardDescription>
            Standard card styling used throughout the project
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Card Features:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Rounded corners (rounded-lg)</li>
              <li>Border with theme-aware colors</li>
              <li>Background using card CSS variable</li>
              <li>Subtle shadow (shadow-sm)</li>
              <li>Smooth transitions</li>
            </ul>
          </div>
          <Separator />
          <div className="space-y-2">
            <p className="text-sm font-medium">Usage Pattern:</p>
            <pre className="bg-muted p-4 rounded-md text-xs overflow-x-auto">
{`<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Your content */}
  </CardContent>
  <CardFooter>
    {/* Optional footer */}
  </CardFooter>
</Card>`}
            </pre>
          </div>
          <Separator />
          <div className="space-y-2">
            <p className="text-sm font-medium">Always import from:</p>
            <code className="text-xs bg-muted px-2 py-1 rounded">
              @/components/ui/card
            </code>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

