"use client"

import { useState } from "react"
import { createComment } from "@/lib/actions"
import { useRouter } from "next/navigation"

interface CommentFormProps {
  postId: string
  parentId?: string
  onSuccess?: () => void
}

export default function CommentForm({ postId, parentId, onSuccess }: CommentFormProps) {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!content.trim()) return
    
    try {
      setIsSubmitting(true)
      await createComment({
        postId,
        parentId,
        content,
      })
      
      setContent("")
      router.refresh()
      
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error("Failed to submit comment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your comment..."
          className="w-full p-3 border rounded-md"
          rows={3}
          required
        />
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Post Comment"}
        </button>
      </div>
    </form>
  )
}
