"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronDown, Download, Trash2, Ban, CheckCircle, Search, ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GlassCard, GlassCardContent } from "@/components/shared/glass-card"
import { ButtonGroup } from "@/components/ui/button-group"

// Helper function to get nested object values
const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  loading?: boolean
  onBulkAction?: (action: string, selectedRows: TData[]) => void
  searchPlaceholder?: string
  searchFields?: string[]
  bulkActions?: Array<{
    label: string
    action: string
    icon: React.ReactNode
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  }>
  enableExport?: boolean
  onExport?: () => void
  onRowClick?: (row: TData) => void
  statusFilterOptions?: Array<{
    value: string
    label: string
  }>
  meta?: any
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading = false,
  onBulkAction,
  searchPlaceholder = "Search...",
  searchFields = [],
  bulkActions = [],
  enableExport = true,
  onExport,
  onRowClick,
  statusFilterOptions,
  meta,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [globalFilter, setGlobalFilter] = React.useState("")

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, value) => {
      const item = row.original as any
      const searchValue = value.toLowerCase()
      
      // If searchFields are provided, use them; otherwise use a generic approach
      if (searchFields.length > 0) {
        const searchableFields = searchFields.map(field => {
          const fieldValue = getNestedValue(item, field)
          return fieldValue?.toString().toLowerCase() || ''
        })
        return searchableFields.some(field => field.includes(searchValue))
      }
      
      // Fallback: search all string values in the object
      const searchableFields = Object.values(item)
        .filter(val => typeof val === 'string')
        .map(val => val.toLowerCase())
      
      return searchableFields.some(field => field.includes(searchValue))
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    meta,
  })

  // Safely get status column - check if column with id "status" exists in the table
  const statusColumn = React.useMemo(() => {
    try {
      // Check if a column with id "status" exists in the table
      const allColumns = table.getAllColumns()
      const hasStatusCol = allColumns.some(col => col.id === "status")
      
      if (!hasStatusCol) return null
      
      // Try to get the column
      return table.getColumn("status") || null
    } catch {
      return null
    }
  }, [table])

  return (
    <GlassCard>
      {/* Outer Card: Controls */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Global Search */}
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={globalFilter ?? ""}
                onChange={(event) => setGlobalFilter(event.target.value)}
                className="h-8 w-48 pl-8 text-sm"
              />
            </div>

            {/* Status Filter - Only show if status column exists */}
            {statusColumn && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8">
                    Filter
                    <ChevronDown className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuCheckboxItem
                    checked={!statusColumn.getFilterValue()}
                    onCheckedChange={() => statusColumn.setFilterValue("")}
                  >
                    All Statuses
                  </DropdownMenuCheckboxItem>
                  {statusFilterOptions ? (
                    statusFilterOptions.map((option) => (
                      <DropdownMenuCheckboxItem
                        key={option.value}
                        checked={statusColumn.getFilterValue() === option.value}
                        onCheckedChange={() => statusColumn.setFilterValue(option.value)}
                      >
                        {option.label}
                      </DropdownMenuCheckboxItem>
                    ))
                  ) : (
                    <>
                      <DropdownMenuCheckboxItem
                        checked={statusColumn.getFilterValue() === "pending"}
                        onCheckedChange={() => statusColumn.setFilterValue("pending")}
                      >
                        Pending
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={statusColumn.getFilterValue() === "approved"}
                        onCheckedChange={() => statusColumn.setFilterValue("approved")}
                      >
                        Approved
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={statusColumn.getFilterValue() === "verified"}
                        onCheckedChange={() => statusColumn.setFilterValue("verified")}
                      >
                        Verified
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={statusColumn.getFilterValue() === "suspended"}
                        onCheckedChange={() => statusColumn.setFilterValue("suspended")}
                      >
                        Suspended
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={statusColumn.getFilterValue() === "rejected"}
                        onCheckedChange={() => statusColumn.setFilterValue("rejected")}
                      >
                        Rejected
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={statusColumn.getFilterValue() === "inactive"}
                        onCheckedChange={() => statusColumn.setFilterValue("inactive")}
                      >
                        Inactive
                      </DropdownMenuCheckboxItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Column Visibility */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  Column
                  <ChevronDown className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    // Map column IDs to clean display names
                    const getColumnDisplayName = (id: string) => {
                      const nameMap: Record<string, string> = {
                        'user': 'Driver',
                        'driver_license_number': 'License',
                        'phone_number': 'Phone',
                        'driver_type': 'Type',
                        'status': 'Status',
                        'vehicle': 'Vehicle',
                        'total_rides': 'Rides',
                        'average_rating': 'Rating'
                      }
                      return nameMap[id] || id.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
                    }

                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {getColumnDisplayName(column.id)}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Export Button */}
            {enableExport && (
              <Button variant="outline" size="sm" className="h-8 ml-auto" onClick={onExport}>
                <Download className="h-3.5 w-3.5 mr-1.5" />
                Export
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Inner Card: Table Content */}
      <GlassCardContent className="space-y-4">

        {/* Bulk Actions */}
        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <div className="flex items-center justify-between p-3 border rounded-md bg-muted/50">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} row(s) selected
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-7"
                onClick={() => table.toggleAllPageRowsSelected(false)}
              >
                Clear selection
              </Button>
            </div>
            <div className="flex items-center gap-2">
              {bulkActions.length > 0 ? (
                bulkActions.map((action) => (
                  <Button
                    key={action.action}
                    variant={action.variant || "outline"}
                    size="sm"
                    className="h-7"
                    onClick={() => onBulkAction?.(action.action, table.getFilteredSelectedRowModel().rows.map(row => row.original))}
                  >
                    {action.icon}
                    {action.label}
                  </Button>
                ))
              ) : (
                // Default bulk actions if none provided
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7"
                    onClick={() => onBulkAction?.("activate", table.getFilteredSelectedRowModel().rows.map(row => row.original))}
                  >
                    <CheckCircle className="mr-2 h-3.5 w-3.5" />
                    Activate
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7"
                    onClick={() => onBulkAction?.("suspend", table.getFilteredSelectedRowModel().rows.map(row => row.original))}
                  >
                    <Ban className="mr-2 h-3.5 w-3.5" />
                    Suspend
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7"
                    onClick={() => onBulkAction?.("delete", table.getFilteredSelectedRowModel().rows.map(row => row.original))}
                  >
                    <Trash2 className="mr-2 h-3.5 w-3.5" />
                    Delete
                  </Button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="font-semibold text-foreground">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              // Loading skeleton
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((_, colIndex) => (
                    <TableCell key={colIndex}>
                      <div className="h-4 bg-muted animate-pulse rounded" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={(e) => {
                    // Don't trigger row click if clicking on interactive elements
                    const target = e.target as HTMLElement
                    if (
                      target.closest('button') || 
                      target.closest('[role="button"]') || 
                      target.closest('a') ||
                      target.closest('[role="menu"]') ||
                      target.closest('[role="menuitem"]') ||
                      target.closest('[data-radix-dropdown-menu-content]')
                    ) {
                      return
                    }
                    onRowClick?.(row.original)
                  }}
                  className={onRowClick ? "cursor-pointer hover:bg-muted/50" : ""}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

        {/* Pagination and Selection Info */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Rows per page</p>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <ButtonGroup orientation="horizontal">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </GlassCardContent>
    </GlassCard>
  )
}