"use client"

import { motion } from "framer-motion"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ThumbsUp, MessageCircle } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

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
}

export default function GrievanceCard({
  grievance,
  onUpvote,
  hasUpvoted,
  isLoggedIn,
}: {
  grievance: Grievance
  onUpvote: (id: string) => void
  hasUpvoted: boolean
  isLoggedIn: boolean
}) {
  const getGrievanceTypeLabel = (type: string) => {
    const types: Record<string, { label: string; color: string }> = {
      public_service: { label: "Public Service", color: "bg-blue-100 text-blue-800" },
      infrastructure: { label: "Infrastructure", color: "bg-green-100 text-green-800" },
      healthcare: { label: "Healthcare", color: "bg-red-100 text-red-800" },
      education: { label: "Education", color: "bg-purple-100 text-purple-800" },
      law_enforcement: { label: "Law Enforcement", color: "bg-yellow-100 text-yellow-800" },
      corruption: { label: "Corruption", color: "bg-orange-100 text-orange-800" },
      other: { label: "Other", color: "bg-gray-100 text-gray-800" },
    }

    return types[type] || { label: type, color: "bg-gray-100 text-gray-800" }
  }

  const typeInfo = getGrievanceTypeLabel(grievance.grievanceType)
  const formattedDate = formatDistanceToNow(new Date(grievance.createdAt), { addSuffix: true })

  const getInitials = (name: string) => {
    // Ensure the name is a non-empty string and doesn't contain only spaces
    if (typeof name !== "string" || !name.trim()) {
      return "";
    }
  
    return name
      .split(" ")
      .map((part) => part[0])  // Take the first character of each word
      .join("")  // Join the characters together
      .toUpperCase()  // Convert to uppercase
      .substring(0, 2);  // Return only the first 2 characters
  };
  

  return (
    <Card className="overflow-hidden border-gray-200 hover:shadow-md transition-shadow duration-300">
      <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 bg-blue-100 text-blue-800">
            <AvatarFallback>{getInitials(grievance.user?.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{grievance.user?.name}</p>
            <p className="text-xs text-gray-500">{formattedDate}</p>
          </div>
        </div>
        <Badge className={typeInfo.color}>{typeInfo.label}</Badge>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <h3 className="text-lg font-semibold mb-2">{grievance.title}</h3>
        <p className="text-gray-700 text-sm">
          {grievance.description.length > 200 ? `${grievance.description.substring(0, 200)}...` : grievance.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center border-t">
        <div className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-1 ${hasUpvoted ? "text-blue-600" : ""}`}
              onClick={() => onUpvote(grievance._id)}
              disabled={hasUpvoted || !isLoggedIn}
            >
              <ThumbsUp className="h-4 w-4" />
              <span>{grievance.upvotesCount}</span>
            </Button>
          </motion.div>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            <span>Comment</span>
          </Button>
        </div>
        <div className="text-xs text-gray-500">ID: {grievance.grievanceId}</div>
      </CardFooter>
    </Card>
  )
}
