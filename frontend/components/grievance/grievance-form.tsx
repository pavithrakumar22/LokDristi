"use client"

import type React from "react"

import { useState,useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type UserData = {
  name: string
  aadhaarNumber: string
  phone: string
  email: string
}



export default function GrievanceForm({ userData }: { userData: UserData }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    grievanceType: "",
    title: "",
    description: "",
    desiredOutcome: "",
    witness: "",
    file: null as File | null,
  })
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!userData.aadhaarNumber) {
      setError("Please login to submit a grievance")
      return
    }

    if (!formData.title || !formData.description || !formData.grievanceType) {
      setError("Please fill all required fields")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      const token = localStorage.getItem("token")

      if (!token) {
        throw new Error("You must be logged in to submit a grievance")
      }

      const formDataToSend = new FormData()
      formDataToSend.append("grievanceType", formData.grievanceType)
      formDataToSend.append("title", formData.title)
      formDataToSend.append("description", formData.description)
      formDataToSend.append("desiredOutcome", formData.desiredOutcome)
      formDataToSend.append("witness", formData.witness)

      if (formData.file) {
        formDataToSend.append("file", formData.file)
      }

      const response = await fetch(`${BASE_URL}/api/grievances/submit`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to submit grievance")
      }

      setSuccess(true)
      setFormData({
        grievanceType: "",
        title: "",
        description: "",
        desiredOutcome: "",
        witness: "",
        file: null,
      })

      // Refresh the grievance list
      setTimeout(() => {
        router.refresh()
      }, 2000)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="shadow-md">
        <CardHeader className="bg-blue-50 border-b">
          <CardTitle className="text-blue-800">Submit a Grievance</CardTitle>
          <CardDescription>Share your concerns with the appropriate authorities</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-green-50 text-green-800 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>Your grievance has been submitted successfully!</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="grievanceType">Grievance Type *</Label>
              <Select
                value={formData.grievanceType}
                onValueChange={(value) => handleSelectChange("grievanceType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select grievance type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public_service">Public Service</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="law_enforcement">Law Enforcement</SelectItem>
                  <SelectItem value="corruption">Corruption</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
                placeholder="Brief title of your grievance"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Provide details about your grievance"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="desiredOutcome">Desired Outcome</Label>
              <Textarea
                id="desiredOutcome"
                name="desiredOutcome"
                placeholder="What resolution are you seeking?"
                rows={2}
                value={formData.desiredOutcome}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="witness">Witness Information</Label>
              <Input
                id="witness"
                name="witness"
                placeholder="Any witnesses to this issue (optional)"
                value={formData.witness}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Supporting Document</Label>
              <Input id="file" name="file" type="file" onChange={handleFileChange} className="cursor-pointer" />
              <p className="text-xs text-gray-500">Upload any relevant documents or images (max 5MB)</p>
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Grievance"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="bg-gray-50 text-xs text-gray-500 border-t">
          Your personal information will be handled according to our privacy policy.
        </CardFooter>
      </Card>
    </motion.div>
  )
}
