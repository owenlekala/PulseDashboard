"use client"

import * as React from "react"
import type { DateRange } from "react-day-picker"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

function formatShort(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })
}

function formatRange(range: DateRange | undefined) {
  if (!range?.from && !range?.to) return ""
  if (range.from && !range.to) return `${formatShort(range.from)} –`
  if (range.from && range.to) return `${formatShort(range.from)} – ${formatShort(range.to)}`
  return ""
}

export interface DateRangePickerProps {
  value?: DateRange
  defaultValue?: DateRange
  placeholder?: string
  required?: boolean
  disabled?: boolean
  className?: string
  onChange?: (range: DateRange | undefined) => void
}

export function DateRangePicker({
  value: controlledValue,
  defaultValue,
  placeholder = "Select date range",
  required = false,
  disabled = false,
  className,
  onChange,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [internal, setInternal] = React.useState<DateRange | undefined>(
    controlledValue ?? defaultValue
  )

  const value = controlledValue ?? internal
  const [month, setMonth] = React.useState<Date>(value?.from ?? new Date())

  React.useEffect(() => {
    if (value?.from) setMonth(value.from)
  }, [value?.from])

  const commit = React.useCallback(
    (next: DateRange | undefined) => {
      if (controlledValue === undefined) setInternal(next)
      onChange?.(next)
    },
    [controlledValue, onChange]
  )

  return (
    <div className={cn("w-full", className)}>
      <div className="relative">
        <Input
          value={formatRange(value)}
          placeholder={placeholder}
          className="bg-background pr-10"
          readOnly
          disabled={disabled}
          required={required}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
              disabled={disabled}
              onClick={(e) => {
                e.preventDefault()
                setOpen(true)
              }}
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date range</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="end">
            <div className="p-3">
              <Calendar
                mode="range"
                numberOfMonths={2}
                selected={value}
                month={month}
                onMonthChange={setMonth}
                onSelect={(next) => {
                  commit(next)
                }}
                disabled={disabled}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}


