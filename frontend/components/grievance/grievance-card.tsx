"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronUp, ArrowUpCircle, X, Image as ImageIcon } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"

type Grievance = {
  _id: string
  grievanceId: string
  title: string
  description: string
  grievanceType: string
  upvotesCount: number
  createdAt: string
  fileUrl?: string | null
  desiredOutcome?: string
  witness?: string
  upvotedUsers?: string[]
  user: {
    name: string
    email: string
    phone?: string
    aadhaarNo?: string
  }
}

export default function GrievanceCard({
  grievance,
  onUpvote,
  hasUpvoted,
  isLoggedIn,
  currentUserId
}: {
  grievance: Grievance
  onUpvote: (id: string) => void
  hasUpvoted: boolean
  isLoggedIn: boolean
  currentUserId?: string
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  // Determine if user has upvoted either from prop or by checking upvotedUsers array
  const userHasUpvoted = hasUpvoted || 
    (currentUserId && grievance.upvotedUsers?.includes(currentUserId));

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
    if (typeof name !== "string" || !name.trim()) {
      return "";
    }
  
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleCardClick = () => {
    setIsDialogOpen(true);
  };

  const handleUpvoteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card click event
    onUpvote(grievance._id);
  };

  // Helper function to get appropriate upvote button text
  const getUpvoteButtonText = () => {
    if (!isLoggedIn) return "Login to Upvote";
    return userHasUpvoted ? "Remove Upvote" : "Upvote";
  };

  const hasImage = !!grievance.fileUrl;

  return (
    <>
      <motion.div 
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card 
          className="overflow-hidden border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
          onClick={handleCardClick}
        >
          <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 bg-blue-100 text-blue-800 border-2 border-blue-200">
                <AvatarFallback>{getInitials(grievance.user?.name)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{grievance.user?.name}</p>
                <p className="text-xs text-gray-500">{formattedDate}</p>
              </div>
            </div>
            <Badge className={`${typeInfo.color} px-3 py-1 rounded-full`}>{typeInfo.label}</Badge>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <h3 className="text-lg font-semibold mb-2">{grievance.title}</h3>
            <p className="text-gray-700 text-sm line-clamp-3">
              {grievance.description}
            </p>
            
            {hasImage && (
              <div className="mt-2 flex items-center text-blue-600 text-xs">
                <ImageIcon className="h-3 w-3 mr-1" />
                <span>Has attachment</span>
              </div>
            )}
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between items-center border-t">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              onClick={handleUpvoteClick}
            >
              <Button
                variant={userHasUpvoted ? "default" : "outline"}
                size="sm"
                className={`flex items-center gap-2 ${
                  userHasUpvoted 
                    ? "bg-blue-600 hover:bg-blue-700 text-white" 
                    : "border-blue-200 text-blue-600 hover:border-blue-300"
                }`}
                disabled={!isLoggedIn}
              >
                {userHasUpvoted ? (
                  <ArrowUpCircle className="h-4 w-4" />
                ) : (
                  <ChevronUp className="h-4 w-4" />
                )}
                <span>{grievance.upvotesCount}</span>
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl w-full max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="text-xl font-bold">{grievance.title}</DialogTitle>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 bg-blue-100 text-blue-800">
                  <AvatarFallback>{getInitials(grievance.user?.name)}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm">{grievance.user?.name}</span>
              </div>
              <Badge className={`${typeInfo.color} px-3 py-1 rounded-full`}>{typeInfo.label}</Badge>
            </div>
            <DialogDescription className="text-sm text-gray-500 mt-1">
              Posted {formattedDate}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4">
            <p className="text-gray-700 whitespace-pre-line">{grievance.description}</p>
          </div>
          
          {grievance.desiredOutcome && (
            <div className="mt-4">
              <h4 className="font-medium text-sm mb-1">Desired Outcome</h4>
              <p className="text-gray-700 text-sm">{grievance.desiredOutcome}</p>
            </div>
          )}
          
          {grievance.witness && (
            <div className="mt-4">
              <h4 className="font-medium text-sm mb-1">Witness Information</h4>
              <p className="text-gray-700 text-sm">{grievance.witness}</p>
            </div>
          )}

          {grievance.fileUrl ? (
            <div className="mt-6">
              <h4 className="font-medium mb-2">Attached File</h4>
              <div className="rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                {grievance.fileUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                  // Handle image files
                  <img 
                    src={grievance.fileUrl} 
                    alt="Attached image" 
                    className="w-full object-contain max-h-96"
                    onError={(e) => {
                      e.currentTarget.src = "/api/placeholder/600/400"; 
                      e.currentTarget.alt = "Image couldn't be loaded";
                    }}
                  />
                ) : grievance.fileUrl.match(/\.(pdf)$/i) ? (
                  // Handle PDF files
                  <div className="p-4 flex flex-col items-center justify-center">
                    <div className="bg-red-100 text-red-600 p-3 rounded-full mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <path d="M9 15v-6h6"></path>
                      </svg>
                    </div>
                    <p className="text-sm font-medium">PDF Document</p>
                    <a 
                      href={grievance.fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-2 text-blue-600 hover:underline text-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Document
                    </a>
                  </div>
                ) : (
                  // Handle other file types
                  <div className="p-4 flex flex-col items-center justify-center">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-full mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                        <polyline points="13 2 13 9 20 9"></polyline>
                      </svg>
                    </div>
                    <p className="text-sm font-medium">Attached File</p>
                    <a 
                      href={grievance.fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-2 text-blue-600 hover:underline text-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Download File
                    </a>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center text-gray-500">
              No files attached to this grievance
            </div>
          )}

          <div className="mt-6 flex items-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={userHasUpvoted ? "default" : "outline"}
                size="default"
                className={`flex items-center gap-2 ${
                  userHasUpvoted 
                    ? "bg-blue-600 hover:bg-blue-700 text-white" 
                    : "border-blue-200 text-blue-600 hover:border-blue-300"
                }`}
                onClick={() => onUpvote(grievance._id)}
                disabled={!isLoggedIn}
              >
                {userHasUpvoted ? (
                  <ArrowUpCircle className="h-5 w-5" />
                ) : (
                  <ChevronUp className="h-5 w-5" />
                )}
                <span>{grievance.upvotesCount}</span>
              </Button>
            </motion.div>
            <span className="text-sm text-gray-500">
              {getUpvoteButtonText()}
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}