"use client"

import { useState } from "react"
import { createPost, updatePost } from "@/lib/actions"
import { useRouter } from "next/navigation"
import { Post } from "@/lib/types"

interface PostFormProps {
  post?: Post
}

export default function PostForm({ post }: PostFormProps) {
  const [title, setTitle] = useState(post?.title || "")
  const [content, setContent] = useState(post?.content || "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !content.trim()) return
    
    try {
      setIsSubmitting(true)
      
      if (post) {
        // Update existing post
        await updatePost({
          id: post.id,
          title,
          content,
        })
      } else {
        // Create new post
        await createPost({
          title,
          content,
        })
      }
      
      router.push("/admin")
      router.refresh()
    } catch (error) {
      console.error("Failed to submit post:", error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block mb-2 font-medium">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          className="w-full p-3 border rounded-md"
          required
        />
      </div>
      
      <div>
        <label htmlFor="content" className="block mb-2 font-medium">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post content..."
          className="w-full p-3 border rounded-md"
          rows={10}
          required
        />
      </div>
      
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : post ? "Update Post" : "Create Post"}
        </button>
      </div>
    </form>
  )
}
