"use client"

import {
  Building2,
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react"

import {
  DetailSection,
  EntityPreviewCard,
  InfoList,
  InsightCallout,
  PageHeader,
  SectionCard,
} from "@/components/shared"
import { Separator } from "@/components/ui/separator"

export default function ShowcaseEntityPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Entity UI"
        description="Shared patterns for identity, structured details, and admin side-panel style presentation."
        backHref="/admin/showcase"
      />
      <InsightCallout
        tone="tip"
        title="Entity views should feel grounded and operational"
        description="Use these shared components to build profile, account, and team-detail surfaces that look like real admin panels instead of isolated demos."
      />
      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard
          title="Profile Surface"
          description="Lead with identity and status, then group the remaining information into labeled detail sections."
        >
          <div className="space-y-6">
            <EntityPreviewCard
              title="Alicia Rivers"
              subtitle="Operations Manager"
              avatarSrc="/avatar.png"
              fallback="AR"
              status={{ tone: "active", label: "Active" }}
              meta={[
                { icon: Mail, label: "alicia.rivers@example.com" },
                { icon: Phone, label: "+27 82 555 0171" },
                { icon: MapPin, label: "Johannesburg, South Africa" },
              ]}
            />
            <Separator />
            <DetailSection
              title="Account overview"
              description="Use `InfoList` for structured facts that users may scan quickly."
            >
              <InfoList
                items={[
                  { icon: UserRound, label: "Manager", value: "Priya Singh" },
                  { icon: Building2, label: "Team", value: "Operations" },
                  { icon: ShieldCheck, label: "Access level", value: "Admin reviewer" },
                  {
                    icon: CalendarDays,
                    label: "Joined",
                    value: "Sep 18, 2023",
                  },
                ]}
              />
            </DetailSection>
          </div>
        </SectionCard>
        <div className="space-y-4">
          <SectionCard
            title="Properties Panel"
            description="Use compact sections for the right rail or drawer side content."
          >
            <DetailSection
              title="Operational context"
              description="Keep the copy concise and tied to practical admin actions."
            >
              <InfoList
                columns={1}
                items={[
                  { label: "Current queue", value: "Manual payment reviews" },
                  { label: "Average response time", value: "2h 14m" },
                  { label: "Region scope", value: "South Africa and Namibia" },
                ]}
              />
            </DetailSection>
          </SectionCard>
          <SectionCard
            title="Usage Notes"
            description="Guidance for composing entity-focused screens."
          >
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                Use `EntityPreviewCard` as the identity anchor, not as the whole page.
              </p>
              <p>
                Stack `DetailSection` blocks below or beside it to separate profile, permissions, billing, and activity context.
              </p>
              <p>
                Use `InfoList` for dense facts and avoid mixing too many decorative surfaces inside the same entity view.
              </p>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  )
}
