"use client"

import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/datatable"
import { PageHeader } from "@/components/shared/page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Trash2, Ban, CheckCircle, UserPlus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { demoUsers, type DemoUser } from "@/data/demo-table-data"
import { toast } from "@/components/shared/toast"

const columns: ColumnDef<DemoUser>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className="flex flex-col">
          <span className="font-medium">{user.name}</span>
          <span className="text-sm text-muted-foreground">{user.email}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const statusMap: Record<string, "active" | "inactive" | "pending" | "error"> = {
        active: "active",
        inactive: "inactive",
        pending: "pending",
        suspended: "error",
      }
      return <StatusBadge status={statusMap[status] || "inactive"} label={status} />
    },
  },
  {
    accessorKey: "joinDate",
    header: "Join Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("joinDate"))
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    },
  },
  {
    accessorKey: "lastActive",
    header: "Last Active",
    cell: ({ row }) => {
      const date = new Date(row.getValue("lastActive"))
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit user</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Delete user
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function UsersPage() {
  const [data, setData] = useState(demoUsers)

  const handleBulkAction = (action: string, selectedRows: DemoUser[]) => {
    const userIds = selectedRows.map((row) => row.id)
    
    switch (action) {
      case "activate":
        setData((prev) =>
          prev.map((user) =>
            userIds.includes(user.id) ? { ...user, status: "active" as const } : user
          )
        )
        toast.success(`${selectedRows.length} user(s) activated`)
        break
      case "suspend":
        setData((prev) =>
          prev.map((user) =>
            userIds.includes(user.id) ? { ...user, status: "suspended" as const } : user
          )
        )
        toast.success(`${selectedRows.length} user(s) suspended`)
        break
      case "delete":
        setData((prev) => prev.filter((user) => !userIds.includes(user.id)))
        toast.success(`${selectedRows.length} user(s) deleted`)
        break
      default:
        toast.info(`Bulk action: ${action}`)
    }
  }

  const handleExport = () => {
    toast.success("Export functionality would be implemented here")
  }

  const handleRowClick = (row: DemoUser) => {
    toast.info(`Clicked on user: ${row.name}`)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        description="Manage and view all users in the system"
        action={{
          label: "Add User",
          onClick: () => toast.success("Add user functionality"),
          icon: UserPlus,
        }}
      />
      <DataTable
        columns={columns}
        data={data}
        searchPlaceholder="Search users by name, email, or department..."
        searchFields={["name", "email", "department"]}
        statusFilterOptions={[
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
          { value: "pending", label: "Pending" },
          { value: "suspended", label: "Suspended" },
        ]}
        bulkActions={[
          {
            label: "Activate",
            action: "activate",
            icon: <CheckCircle className="mr-1.5 h-3.5 w-3.5" />,
            variant: "outline",
          },
          {
            label: "Suspend",
            action: "suspend",
            icon: <Ban className="mr-1.5 h-3.5 w-3.5" />,
            variant: "outline",
          },
          {
            label: "Delete",
            action: "delete",
            icon: <Trash2 className="mr-1.5 h-3.5 w-3.5" />,
            variant: "destructive",
          },
        ]}
        onBulkAction={handleBulkAction}
        onExport={handleExport}
        onRowClick={handleRowClick}
      />
    </div>
  )
}

