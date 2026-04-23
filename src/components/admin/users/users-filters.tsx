"use client"

import type { DateRange } from "react-day-picker"
import { RotateCcw, SlidersHorizontal } from "lucide-react"

import { FilterToolbar } from "@/components/shared"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface UserFiltersValue {
  query: string
  status: string
  department: string
  role: string
  dateRange?: DateRange
}

interface UsersFiltersProps {
  value: UserFiltersValue
  departments: string[]
  roles: string[]
  onChange: (value: UserFiltersValue) => void
  onReset: () => void
}

export function UsersFilters({
  value,
  departments,
  roles,
  onChange,
  onReset,
}: UsersFiltersProps) {
  return (
    <FilterToolbar
      title="Filter users"
      description="Refine the list by status, team, role, or onboarding window."
      icon={SlidersHorizontal}
      actions={
        <Button variant="outline" size="sm" className="gap-2" onClick={onReset}>
          <RotateCcw className="size-4" />
          Reset filters
        </Button>
      }
    >
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        <Input
          value={value.query}
          onChange={(event) =>
            onChange({ ...value, query: event.target.value })
          }
          placeholder="Search by name, email, phone, or location"
          className="bg-card"
        />
        <Select
          value={value.status}
          onValueChange={(next) => onChange({ ...value, status: next })}
        >
          <SelectTrigger className="bg-card">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={value.department}
          onValueChange={(next) => onChange({ ...value, department: next })}
        >
          <SelectTrigger className="bg-card">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All departments</SelectItem>
            {departments.map((department) => (
              <SelectItem key={department} value={department}>
                {department}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={value.role}
          onValueChange={(next) => onChange({ ...value, role: next })}
        >
          <SelectTrigger className="bg-card">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All roles</SelectItem>
            {roles.map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DateRangePicker
          value={value.dateRange}
          onChange={(dateRange) => onChange({ ...value, dateRange })}
          className="min-w-0"
        />
      </div>
    </FilterToolbar>
  )
}
