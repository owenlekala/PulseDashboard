"use client"

import { Mail, MapPin, Phone, UserRound } from "lucide-react"

import { InfoList, PageHeader, StatusBadge } from "@/components/shared"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ShowcaseDataDisplayPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Data Display"
        description="Reusable patterns for presenting structured admin details."
        backHref="/admin/showcase"
      />
      <Card>
        <CardHeader>
          <CardTitle>Info List</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium">Profile status:</span>
            <StatusBadge status="active" label="Active" />
          </div>
          <InfoList
            items={[
              { label: "Email", value: "sara.jones@example.com", icon: Mail },
              { label: "Phone", value: "+27 82 555 0144", icon: Phone },
              { label: "Location", value: "Cape Town", icon: MapPin },
              { label: "Manager", value: "Dana Brooks", icon: UserRound },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  )
}
