"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp } from "lucide-react"

/**
 * Card Component Usage Guide
 * 
 * The Card component provides consistent styling across the entire project.
 * Always use the Card component from @/components/ui/card for all card-based layouts.
 * 
 * Card Styling Features:
 * - Rounded corners (rounded-lg)
 * - Border with theme-aware colors
 * - Background using card CSS variable
 * - Subtle shadow (shadow-sm)
 * - Smooth transitions
 * 
 * Usage Pattern:
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *     <CardDescription>Description</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     {/* Your content */}
 *   </CardContent>
 *   <CardFooter>
 *     {/* Optional footer */}
 *   </CardFooter>
 * </Card>
 */

// Example: Basic Card
export function BasicCardExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description text goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content area</p>
      </CardContent>
    </Card>
  )
}

// Example: Card with Badge (like chart cards)
export function CardWithBadgeExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Chart Title
          <Badge
            variant="outline"
            className="text-green-500 bg-green-500/10 border-none ml-2"
          >
            <TrendingUp className="h-4 w-4" />
            <span>5.2%</span>
          </Badge>
        </CardTitle>
        <CardDescription>Showing data for the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Chart or content goes here</p>
      </CardContent>
    </Card>
  )
}

// Example: Card with Footer
export function CardWithFooterExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card with Actions</CardTitle>
        <CardDescription>Card that includes action buttons</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Main content area</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Cancel</Button>
        <Button className="ml-2">Save</Button>
      </CardFooter>
    </Card>
  )
}

// Example: Centered Card (for circular charts)
export function CenteredCardExample() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Centered Card</CardTitle>
        <CardDescription>Perfect for circular charts</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="mx-auto aspect-square max-h-[250px] flex items-center justify-center">
          <p>Centered content</p>
        </div>
      </CardContent>
    </Card>
  )
}

