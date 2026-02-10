"use client"

import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle, GlassCardDescription } from "@/components/ui/glass-card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { topProducts } from "@/data/demo-dashboard-data"

export function TopProducts() {
  return (
    <GlassCard outerTitle="Products">
      <GlassCardContent>
        <GlassCardHeader>
          <GlassCardTitle>Top Products</GlassCardTitle>
          <GlassCardDescription>Best selling products this month</GlassCardDescription>
        </GlassCardHeader>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="font-semibold text-foreground">Product</TableHead>
                <TableHead className="font-semibold text-foreground">Sales</TableHead>
                <TableHead className="font-semibold text-foreground text-right">Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.sales.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{product.revenue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </GlassCardContent>
    </GlassCard>
  )
}

