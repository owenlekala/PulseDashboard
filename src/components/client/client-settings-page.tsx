"use client"

import { useState } from "react"
import { PencilLine } from "@mingcute/react"

import { PageHeader, toast } from "@/components/shared"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  clientPreferences,
  clientUser,
} from "@/data/demo-client-data"

export function ClientSettingsPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    fullName: clientUser.name,
    email: clientUser.email,
    role: clientUser.role,
    company: clientUser.company,
  })
  const [preferences, setPreferences] = useState(
    clientPreferences
  )

  const handleSave = () => {
    setIsEditing(false)
    toast.success("Settings saved")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Update your profile details and choose which client notifications should reach you."
        actions={
          isEditing
            ? [
                {
                  label: "Cancel",
                  onClick: () => setIsEditing(false),
                  variant: "outline",
                },
                {
                  label: "Save changes",
                  onClick: handleSave,
                },
              ]
            : [
                {
                  label: "Edit",
                  onClick: () => setIsEditing(true),
                  variant: "outline",
                  icon: PencilLine,
                },
              ]
        }
      />

      <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-base font-semibold tracking-tight">
              Profile details
            </h2>
            <p className="text-sm text-muted-foreground">
              Keep your primary contact information accurate so account updates go to the right place.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="full-name">Full name</Label>
              <Input
                id="full-name"
                value={profile.fullName}
                disabled={!isEditing}
                onChange={(event) =>
                  setProfile((current) => ({
                    ...current,
                    fullName: event.target.value,
                  }))
                }
                placeholder="Your full name"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                disabled={!isEditing}
                onChange={(event) =>
                  setProfile((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
                placeholder="you@company.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={profile.role}
                disabled={!isEditing}
                onChange={(event) =>
                  setProfile((current) => ({
                    ...current,
                    role: event.target.value,
                  }))
                }
                placeholder="Role"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={profile.company}
                disabled={!isEditing}
                onChange={(event) =>
                  setProfile((current) => ({
                    ...current,
                    company: event.target.value,
                  }))
                }
                placeholder="Company"
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-base font-semibold tracking-tight">
              Notification preferences
            </h2>
            <p className="text-sm text-muted-foreground">
              Choose which billing, support, and product updates you want to receive.
            </p>
          </div>
          <div className="space-y-4">
            {preferences.map((preference) => (
              <div
                key={preference.id}
                className="flex items-start justify-between gap-4 rounded-xl border p-4"
              >
                <div className="space-y-1">
                  <Label
                    htmlFor={preference.id}
                    className="text-sm font-semibold leading-5"
                  >
                    {preference.label}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {preference.description}
                  </p>
                </div>
                <Switch
                  id={preference.id}
                  checked={preference.enabled}
                  disabled={!isEditing}
                  onCheckedChange={(checked) =>
                    setPreferences((current) =>
                      current.map((item) =>
                        item.id === preference.id
                          ? { ...item, enabled: checked }
                          : item
                      )
                    )
                  }
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
