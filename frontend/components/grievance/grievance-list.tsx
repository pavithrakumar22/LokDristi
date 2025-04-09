"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2 } from "lucide-react"
import GrievanceCard from "./grievance-card"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

type Grievance = {
  _id: string
  grievanceId: string
  title: string
  description: string
  grievanceType: string
  upvotesCount: number
  createdAt: string
  user: {
    name: string
    email: string
  }
  upvotedUsers: string[]
}

export default function GrievanceList({
  type = "all",
  aadhaarNumber,
}: {
  type: "all" | "trending" | "latest"
  aadhaarNumber: string
}) {
  const [grievances, setGrievances] = useState<Grievance[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

  useEffect(() => {
    fetchGrievances()
  }, [type])

  const fetchGrievances = async () => {
    setLoading(true)
    setError("")

    try {
      let endpoint = `${BASE_URL}/api/grievances`

      if (type === "trending") {
        endpoint = `${BASE_URL}/api/grievances/trending`
      } else if (type === "latest") {
        endpoint = `${BASE_URL}/api/grievances/latest`
      }

      const response = await fetch(endpoint)

      if (!response.ok) {
        throw new Error("Failed to fetch grievances")
      }

      const data = await response.json()
      setGrievances(data)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleUpvote = async (id: string) => {
    if (!aadhaarNumber) {
      alert("Please login to upvote grievances")
      return
    }

    try {
      const token = localStorage.getItem("token")

      if (!token) {
        throw new Error("You must be logged in to upvote")
      }

      const response = await fetch(`${BASE_URL}/api/grievances/upvote/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to upvote")
      }

      // Update the local state
      setGrievances((prevGrievances) =>
        prevGrievances.map((grievance) =>
          grievance._id === id
            ? {
                ...grievance,
                upvotesCount: grievance.upvotesCount + 1,
                upvotedUsers: [...grievance.upvotedUsers, aadhaarNumber],
              }
            : grievance,
        ),
      )
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message)
      } else {
        alert("An unknown error occurred")
      }
    }
  }

  const filteredGrievances = grievances.filter(
    (grievance) =>
      grievance.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grievance.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grievance.grievanceType.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-blue-600">Loading grievances...</span>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      {filteredGrievances.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No grievances found</p>
        </div>
      ) : (
        <AnimatePresence>
          <div className="grid gap-6">
            {filteredGrievances.map((grievance, index) => (
              <motion.div
                key={grievance._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <GrievanceCard
                  grievance={grievance}
                  onUpvote={handleUpvote}
                  hasUpvoted={grievance.upvotedUsers.includes(aadhaarNumber)}
                  isLoggedIn={!!aadhaarNumber}
                />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  )
}

