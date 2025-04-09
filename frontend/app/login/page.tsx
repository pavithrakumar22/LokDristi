"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) return
    
    try {
      setIsSubmitting(true)
      setError("")
      
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      })
      
      if (result?.error) {
        setError("Invalid email or password")
        return
      }
      
      router.push(callbackUrl)
      router.refresh()
    } catch (error) {
      console.error("Login failed:", error)
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="container mx-auto py-8 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-2 font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-md"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block mb-2 font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-md"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Demo credentials:</p>
        <p>Admin: admin@example.com / password</p>
        <p>User: user@example.com / password</p>
      </div>
    </div>
  )
}
