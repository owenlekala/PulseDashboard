"use client"

import * as React from "react"
import { CalendarIcon, Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

function pad2(n: number) {
  return String(n).padStart(2, "0")
}

function formatDateTime(date: Date | undefined) {
  if (!date) return ""
  const datePart = date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })
  const timePart = `${pad2(date.getHours())}:${pad2(date.getMinutes())}`
  return `${datePart} ${timePart}`
}

function parseTime(value: string): { hours: number; minutes: number } | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(value.trim())
  if (!m) return null
  const hours = Number(m[1])
  const minutes = Number(m[2])
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return null
  if (hours < 0 || hours > 23) return null
  if (minutes < 0 || minutes > 59) return null
  return { hours, minutes }
}

export interface DateTimePickerProps {
  value?: Date
  defaultValue?: Date
  placeholder?: string
  required?: boolean
  disabled?: boolean
  className?: string
  onChange?: (date: Date | undefined) => void
}

export function DateTimePicker({
  value: controlledValue,
  defaultValue,
  placeholder = "Select date & time",
  required = false,
  disabled = false,
  className,
  onChange,
}: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [internal, setInternal] = React.useState<Date | undefined>(
    controlledValue ?? defaultValue
  )

  const value = controlledValue ?? internal
  const [month, setMonth] = React.useState<Date>(value ?? new Date())
  const [timeValue, setTimeValue] = React.useState(() =>
    value ? `${pad2(value.getHours())}:${pad2(value.getMinutes())}` : "09:00"
  )

  React.useEffect(() => {
    if (value) {
      setTimeValue(`${pad2(value.getHours())}:${pad2(value.getMinutes())}`)
      setMonth(value)
    }
  }, [value])

  const commit = React.useCallback(
    (next: Date | undefined) => {
      if (controlledValue === undefined) setInternal(next)
      onChange?.(next)
    },
    [controlledValue, onChange]
  )

  const handleDateSelect = (selected: Date | undefined) => {
    if (!selected) {
      commit(undefined)
      return
    }
    const parsed = parseTime(timeValue) ?? { hours: 0, minutes: 0 }
    const next = new Date(selected)
    next.setHours(parsed.hours, parsed.minutes, 0, 0)
    commit(next)
  }

  const handleTimeChange = (nextTime: string) => {
    setTimeValue(nextTime)
    const parsed = parseTime(nextTime)
    if (!parsed || !value) return
    const next = new Date(value)
    next.setHours(parsed.hours, parsed.minutes, 0, 0)
    commit(next)
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="relative">
        <Input
          value={formatDateTime(value)}
          placeholder={placeholder}
          className="bg-background pr-16"
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
              className="absolute top-1/2 right-2 h-6 px-2 -translate-y-1/2"
              disabled={disabled}
              onClick={(e) => {
                e.preventDefault()
                setOpen(true)
              }}
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="end">
            <div className="grid gap-3 p-3">
              <Calendar
                mode="single"
                selected={value}
                month={month}
                onMonthChange={setMonth}
                onSelect={handleDateSelect}
                disabled={disabled}
              />
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Input
                  type="time"
                  value={timeValue}
                  onChange={(e) => handleTimeChange(e.target.value)}
                  className="h-9 w-[140px]"
                  disabled={disabled}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}


