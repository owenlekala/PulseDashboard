"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { Mail, Lock, User, Phone } from "lucide-react"

export function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }
    // Handle registration logic here
    console.log("Register:", formData)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>
                  <User className="size-4" />
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>
                  <User className="size-4" />
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>
                <Mail className="size-4" />
              </InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </InputGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>
                <Phone className="size-4" />
              </InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </InputGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>
                <Lock className="size-4" />
              </InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </InputGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>
                <Lock className="size-4" />
              </InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </InputGroup>
        </div>

        <Button type="submit" className="w-full" size="lg">
          Register
        </Button>
      </form>

      <div className="mt-4 text-center text-sm">
        <span className="text-muted-foreground">Already have an account? </span>
        <Link href="/login" className="font-medium text-primary hover:underline">
          Login
        </Link>
      </div>
    </>
  )
}

