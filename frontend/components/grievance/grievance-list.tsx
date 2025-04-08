// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { ThumbsUp, FileText, AlertCircle } from "lucide-react"
// import { Skeleton } from "@/components/ui/skeleton"

// interface Grievance {
//   _id: string
//   grievanceId: string
//   title: string
//   description: string
//   grievanceType: string
//   desiredOutcome: string
//   upvotesCount: number
//   upvotedUsers: string[]
//   createdAt: string
//   user: {
//     _id: string
//     name: string
//     email: string
//     phone: string
//     aadhaarNo: string
//   }
//   fileUrl?: string | null
// }

// interface GrievanceListProps {
//   grievances: Grievance[]
//   isLoading: boolean
//   onUpvote: (id: string) => void
//   currentUser: { _id?: string } | null
// }

// export default function GrievanceList({ grievances, isLoading, onUpvote, currentUser }: GrievanceListProps) {
//   const [expandedId, setExpandedId] = useState<string | null>(null)

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString)
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
//   }

//   const getGrievanceTypeColor = (type: string) => {
//     switch (type.toLowerCase()) {
//       case "service":
//         return "bg-blue-100 text-blue-800"
//       case "infrastructure":
//         return "bg-amber-100 text-amber-800"
//       case "corruption":
//         return "bg-red-100 text-red-800"
//       case "policy":
//         return "bg-purple-100 text-purple-800"
//       case "other":
//       default:
//         return "bg-gray-100 text-gray-800"
//     }
//   }

//   if (isLoading) {
//     return (
//       <div className="space-y-4">
//         {[1, 2, 3].map((i) => (
//           <Card key={i} className="overflow-hidden">
//             <CardHeader className="pb-2">
//               <div className="flex justify-between">
//                 <Skeleton className="h-6 w-3/4" />
//                 <Skeleton className="h-6 w-20" />
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-2">
//                 <Skeleton className="h-4 w-full" />
//                 <Skeleton className="h-4 w-full" />
//                 <Skeleton className="h-4 w-3/4" />
//               </div>
//             </CardContent>
//             <CardFooter className="flex justify-between border-t pt-4">
//               <Skeleton className="h-8 w-24" />
//               <Skeleton className="h-8 w-24" />
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
//     )
//   }

//   if (grievances.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
//         <h3 className="mt-4 text-lg font-medium text-gray-900">No grievances found</h3>
//         <p className="mt-2 text-sm text-gray-500">There are no grievances to display at this time.</p>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-4">
//       {grievances.map((grievance) => (
//         <motion.div
//           key={grievance._id}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3 }}
//         >
//           <Card className="overflow-hidden">
//             <CardHeader className="pb-2">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="text-lg font-semibold">{grievance.title}</h3>
//                   <p className="text-sm text-gray-500">
//                     {grievance.grievanceId} • {formatDate(grievance.createdAt)}
//                   </p>
//                 </div>
//                 <Badge className={getGrievanceTypeColor(grievance.grievanceType)}>{grievance.grievanceType}</Badge>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <p className={expandedId === grievance._id ? "" : "line-clamp-3"}>{grievance.description}</p>
//                 {grievance.description.length > 150 && (
//                   <Button
//                     variant="link"
//                     onClick={() => setExpandedId(expandedId === grievance._id ? null : grievance._id)}
//                     className="p-0 h-auto text-blue-600"
//                   >
//                     {expandedId === grievance._id ? "Show less" : "Read more"}
//                   </Button>
//                 )}

//                 {expandedId === grievance._id && (
//                   <div className="mt-4 space-y-3 text-sm">
//                     <div className="flex items-start gap-2">
//                       <FileText className="h-4 w-4 text-gray-500 mt-0.5" />
//                       <div>
//                         <span className="font-medium">Desired Outcome:</span> {grievance.desiredOutcome}
//                       </div>
//                     </div>

//                     {grievance.fileUrl && (
//                       <div className="flex items-center gap-2">
//                         <FileText className="h-4 w-4 text-gray-500" />
//                         <a
//                           href={grievance.fileUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600 hover:underline"
//                         >
//                           View attached document
//                         </a>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//             <CardFooter className="flex justify-between border-t pt-4">
//               <div className="flex items-center gap-2">
//                 <Avatar className="h-6 w-6">
//                   <AvatarFallback>{grievance.user.name.charAt(0)}</AvatarFallback>
//                 </Avatar>
//                 <span className="text-sm text-gray-600">{grievance.user.name}</span>
//               </div>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => onUpvote(grievance._id)}
//                 disabled={!currentUser || (currentUser._id && grievance.upvotedUsers.includes(currentUser._id))}
//                 className={
//                   currentUser?._id && grievance.upvotedUsers.includes(currentUser._id)
//                     ? "bg-blue-50 text-blue-600 border-blue-200"
//                     : ""
//                 }
//               >
//                 <ThumbsUp className="mr-1 h-4 w-4" />
//                 <span>{grievance.upvotesCount}</span>
//               </Button>
//             </CardFooter>
//           </Card>
//         </motion.div>
//       ))}
//     </div>
//   )
// }







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
      <div className="mb-6">
        <Input
          placeholder="Search grievances..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

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

