"use client"

import { useMemo, useState } from "react"
import type { DateRange } from "react-day-picker"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/datatable"
import { EmptyState, PageHeader } from "@/components/shared"
import { StatusBadge } from "@/components/shared/status-badge"
import { Button } from "@/components/ui/button"
import {
  MoreHorizontal,
  Trash2,
  Ban,
  CheckCircle,
  UserPlus,
  UserSearch,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  demoUserDepartments,
  demoUserRoles,
  demoUsers,
  type DemoUser,
} from "@/data/demo-table-data"
import { toast } from "@/components/shared/toast"
import {
  type UserFiltersValue,
  UsersFilters,
} from "@/components/admin/users/users-filters"
import { UserDetailsDrawer } from "@/components/admin/users/user-details-drawer"
import {
  type UserSegment,
  UsersSegmentTabs,
} from "@/components/admin/users/users-segment-tabs"
import { UsersSummaryCards } from "@/components/admin/users/users-summary-cards"

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
    cell: ({ row, table }) => {
      const user = row.original
      const meta = table.options.meta as
        | {
            onViewUser: (user: DemoUser) => void
            onQuickAction: (
              action: "activate" | "suspend" | "delete",
              user: DemoUser
            ) => void
          }
        | undefined

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
            <DropdownMenuItem onClick={() => meta?.onViewUser(user)}>
              View details
            </DropdownMenuItem>
            <DropdownMenuItem>Edit user</DropdownMenuItem>
            {user.status !== "active" ? (
              <DropdownMenuItem onClick={() => meta?.onQuickAction("activate", user)}>
                Activate user
              </DropdownMenuItem>
            ) : null}
            {user.status !== "suspended" ? (
              <DropdownMenuItem onClick={() => meta?.onQuickAction("suspend", user)}>
                Suspend user
              </DropdownMenuItem>
            ) : null}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => meta?.onQuickAction("delete", user)}
            >
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
  const [selectedUser, setSelectedUser] = useState<DemoUser | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [activeSegment, setActiveSegment] = useState<UserSegment>("all")
  const [filters, setFilters] = useState<UserFiltersValue>({
    query: "",
    status: "all",
    department: "all",
    role: "all",
    dateRange: undefined,
  })

  const counts = useMemo<Record<UserSegment, number>>(
    () => ({
      all: data.length,
      active: data.filter((user) => user.status === "active").length,
      pending: data.filter((user) => user.status === "pending").length,
      suspended: data.filter((user) => user.status === "suspended").length,
      inactive: data.filter((user) => user.status === "inactive").length,
    }),
    [data]
  )

  const filteredData = useMemo(() => {
    return data.filter((user) => {
      const matchesSegment =
        activeSegment === "all" || user.status === activeSegment

      const matchesQuery =
        filters.query.trim() === "" ||
        [
          user.name,
          user.email,
          user.phone,
          user.location,
          user.manager,
        ]
          .join(" ")
          .toLowerCase()
          .includes(filters.query.toLowerCase())

      const matchesStatus =
        filters.status === "all" || user.status === filters.status

      const matchesDepartment =
        filters.department === "all" || user.department === filters.department

      const matchesRole = filters.role === "all" || user.role === filters.role

      const matchesDateRange = isWithinDateRange(user.joinDate, filters.dateRange)

      return (
        matchesSegment &&
        matchesQuery &&
        matchesStatus &&
        matchesDepartment &&
        matchesRole &&
        matchesDateRange
      )
    })
  }, [activeSegment, data, filters])

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
    setSelectedUser(row)
    setIsDetailsOpen(true)
  }

  const handleQuickAction = (
    action: "activate" | "suspend" | "delete",
    user: DemoUser
  ) => {
    handleBulkAction(action, [user])
  }

  const resetFilters = () => {
    setFilters({
      query: "",
      status: "all",
      department: "all",
      role: "all",
      dateRange: undefined,
    })
    setActiveSegment("all")
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
      <UsersSummaryCards counts={counts} />
      <UsersSegmentTabs
        value={activeSegment}
        counts={counts}
        onValueChange={setActiveSegment}
      />
      <UsersFilters
        value={filters}
        departments={demoUserDepartments}
        roles={demoUserRoles}
        onChange={setFilters}
        onReset={resetFilters}
      />
      <DataTable
        columns={columns}
        data={filteredData}
        searchPlaceholder="Search users by name, email, or department..."
        searchFields={["name", "email", "department", "phone", "location"]}
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
        meta={{
          onViewUser: handleRowClick,
          onQuickAction: handleQuickAction,
        }}
        emptyState={
          <EmptyState
            icon={UserSearch}
            title="No users match these filters"
            description="Try a different segment or reset the current filters to bring matching users back into view."
            action={{
              label: "Reset filters",
              onClick: resetFilters,
            }}
            className="py-10"
          />
        }
      />
      <UserDetailsDrawer
        user={selectedUser}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
      />
    </div>
  )
}

function isWithinDateRange(
  value: string,
  range: DateRange | undefined
) {
  if (!range?.from && !range?.to) {
    return true
  }

  const current = new Date(value)
  const start = range.from ? startOfDay(range.from) : undefined
  const end = range.to ? endOfDay(range.to) : start

  if (start && current < start) {
    return false
  }

  if (end && current > end) {
    return false
  }

  return true
}

function startOfDay(value: Date) {
  const date = new Date(value)
  date.setHours(0, 0, 0, 0)
  return date
}

function endOfDay(value: Date) {
  const date = new Date(value)
  date.setHours(23, 59, 59, 999)
  return date
}
