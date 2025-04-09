"use client"

import { useState } from "react"
import { voteOnItem } from "@/lib/actions"
import { useRouter } from "next/navigation"

interface VoteButtonsProps {
  itemId: string
  itemType: "post" | "comment"
  upvotes: number
  downvotes: number
}

export default function VoteButtons({ itemId, itemType, upvotes: initialUpvotes, downvotes: initialDownvotes }: VoteButtonsProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes)
  const [downvotes, setDownvotes] = useState(initialDownvotes)
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null)
  const [isVoting, setIsVoting] = useState(false)
  const router = useRouter()
  
  const handleVote = async (voteType: "up" | "down") => {
    if (isVoting) return
    
    try {
      setIsVoting(true)
      
      // If user is clicking the same button they already voted on, remove their vote
      if (userVote === voteType) {
        await voteOnItem({
          itemId,
          itemType,
          voteType: null,
          previousVote: userVote
        })
        
        if (voteType === "up") {
          setUpvotes(upvotes - 1)
        } else {
          setDownvotes(downvotes - 1)
        }
        
        setUserVote(null)
      } 
      // If user is changing their vote
      else if (userVote !== null) {
        await voteOnItem({
          itemId,
          itemType,
          voteType,
          previousVote: userVote
        })
        
        if (userVote === "up") {
          setUpvotes(upvotes - 1)
          setDownvotes(downvotes + 1)
        } else {
          setUpvotes(upvotes + 1)
          setDownvotes(downvotes - 1)
        }
        
        setUserVote(voteType)
      } 
      // If user is voting for the first time
      else {
        await voteOnItem({
          itemId,
          itemType,
          voteType,
          previousVote: null
        })
        
        if (voteType === "up") {
          setUpvotes(upvotes + 1)
        } else {
          setDownvotes(downvotes + 1)
        }
        
        setUserVote(voteType)
      }
      
      router.refresh()
    } catch (error) {
      console.error("Failed to vote:", error)
    } finally {
      setIsVoting(false)
    }
  }
  
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleVote("up")}
        disabled={isVoting}
        className={`flex items-center gap-1 px-2 py-1 rounded ${
          userVote === "up" ? "bg-green-100" : "hover:bg-gray-100"
        }`}
      >
        👍 {upvotes}
      </button>
      
      <button
        onClick={() => handleVote("down")}
        disabled={isVoting}
        className={`flex items-center gap-1 px-2 py-1 rounded ${
          userVote === "down" ? "bg-red-100" : "hover:bg-gray-100"
        }`}
      >
        👎 {downvotes}
      </button>
    </div>
  )
}
