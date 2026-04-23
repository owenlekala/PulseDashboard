"use client"

import { AlertTriangle, ArrowRight, CheckCircle2, Clock3 } from "lucide-react"

import {
  ActivityFeed,
  BulkActionBar,
  InsightCallout,
  PageHeader,
  SectionCard,
  toast,
} from "@/components/shared"
import { Button } from "@/components/ui/button"

export default function ShowcaseOperationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Operational UI"
        description="Shared patterns for admin workflows, incidents, and selected-item actions."
        backHref="/admin/showcase"
      />
      <InsightCallout
        tone="warning"
        title="Retry backlog increased 18% this morning"
        description="Use callouts for operational signals, product warnings, or decision support. Keep them concise and action-oriented."
      />
      <SectionCard
        title="Activity Feed"
        description="Use this for operational streams, review queues, or system event summaries."
      >
        <ActivityFeed
          items={[
            {
              id: "1",
              title: "Invoice export completed",
              description: "Finance export finished successfully and was delivered to the reporting queue.",
              time: "5 minutes ago",
              status: "success",
              icon: CheckCircle2,
            },
            {
              id: "2",
              title: "Manual review queued",
              description: "A payment verification case needs follow-up from the risk team.",
              time: "18 minutes ago",
              status: "warning",
              icon: AlertTriangle,
            },
            {
              id: "3",
              title: "Onboarding reminder scheduled",
              description: "A follow-up message was prepared for users who paused onboarding.",
              time: "42 minutes ago",
              status: "info",
              icon: Clock3,
            },
          ]}
        />
      </SectionCard>
      <SectionCard
        title="Bulk Action Bar"
        description="Use for selected-row actions in admin tables and queues."
      >
        <BulkActionBar
          selectionLabel="12 accounts selected for manual review"
          actions={
            <>
              <Button size="sm" onClick={() => toast.success("Selected accounts approved")}>
                Approve selected
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => toast.info("Queued follow-up workflow")}
              >
                Queue follow-up
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="gap-2"
                onClick={() => toast.info("Selection exported")}
              >
                Export list
                <ArrowRight className="size-4" />
              </Button>
            </>
          }
        />
      </SectionCard>
    </div>
  )
}
