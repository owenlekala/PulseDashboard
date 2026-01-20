"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { Mail, Lock } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login:", { email, password })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
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
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>
        </div>

        <Button type="submit" className="w-full" size="lg">
          Login
        </Button>
      </form>

      <div className="mt-4 text-center text-sm">
        <span className="text-muted-foreground">Don't have an account? </span>
        <Link href="/register" className="font-medium text-primary hover:underline">
          Register
        </Link>
      </div>
    </>
  )
}

