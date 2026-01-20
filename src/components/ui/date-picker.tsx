"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function formatDate(date: Date | undefined) {
  if (!date) {
    return ""
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function parseDate(value: string): Date | undefined {
  if (!value || value.trim() === "") {
    return undefined
  }

  // Try parsing as ISO date string first (YYYY-MM-DD)
  const isoDate = new Date(value)
  if (!isNaN(isoDate.getTime())) {
    return isoDate
  }

  // Try parsing the formatted date string (e.g., "June 01, 2025")
  const parsed = new Date(value)
  if (!isNaN(parsed.getTime())) {
    return parsed
  }

  return undefined
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false
  }
  return !isNaN(date.getTime())
}

export interface DatePickerProps {
  id?: string
  name?: string
  value?: Date | string
  defaultValue?: Date | string
  placeholder?: string
  required?: boolean
  onChange?: (date: Date | undefined) => void
  disabled?: boolean
  className?: string
}

export function DatePicker({
  id,
  name,
  value: controlledValue,
  defaultValue,
  placeholder = "Select date",
  required = false,
  onChange,
  disabled = false,
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(() => {
    if (controlledValue !== undefined) {
      return typeof controlledValue === "string" 
        ? parseDate(controlledValue) 
        : controlledValue
    }
    if (defaultValue !== undefined) {
      return typeof defaultValue === "string" 
        ? parseDate(defaultValue) 
        : defaultValue
    }
    return undefined
  })

  const date = controlledValue !== undefined
    ? (typeof controlledValue === "string" ? parseDate(controlledValue) : controlledValue)
    : internalDate

  const [month, setMonth] = React.useState<Date | undefined>(date || new Date())
  const [inputValue, setInputValue] = React.useState(formatDate(date))

  // Update input value when date changes externally
  React.useEffect(() => {
    setInputValue(formatDate(date))
  }, [date])

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (controlledValue === undefined) {
      setInternalDate(selectedDate)
    }
    setInputValue(formatDate(selectedDate))
    onChange?.(selectedDate)
    setOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    
    const parsedDate = parseDate(newValue)
    if (parsedDate && isValidDate(parsedDate)) {
      if (controlledValue === undefined) {
        setInternalDate(parsedDate)
      }
      setMonth(parsedDate)
      onChange?.(parsedDate)
    }
  }

  const handleInputBlur = () => {
    // Validate and format on blur
    const parsedDate = parseDate(inputValue)
    if (parsedDate && isValidDate(parsedDate)) {
      setInputValue(formatDate(parsedDate))
    } else if (inputValue.trim() === "") {
      if (controlledValue === undefined) {
        setInternalDate(undefined)
      }
      onChange?.(undefined)
    } else {
      // Invalid date, revert to formatted date
      setInputValue(formatDate(date))
    }
  }

  // Format date as YYYY-MM-DD for form submission
  const formValue = date ? date.toISOString().split("T")[0] : ""

  return (
    <div className={className}>
      <div className="relative">
        <Input
          id={id}
          value={inputValue}
          placeholder={placeholder}
          className="bg-background pr-10"
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
          disabled={disabled}
          required={required}
        />
        {name && (
          <input
            type="hidden"
            name={name}
            value={formValue}
            required={required}
          />
        )}
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
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <div className="w-full">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={handleDateSelect}
              disabled={disabled}
              className="w-full"
            />
</div>

          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
