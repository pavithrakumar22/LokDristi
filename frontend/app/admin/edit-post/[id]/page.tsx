import { redirect, notFound } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import PostForm from "@/components/post-form"
import { getPostById } from "@/lib/data"

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  
  // Check if user is authenticated and is an admin
  if (!session || !session.user || session.user.role !== "admin") {
    redirect("/login?callbackUrl=/admin/edit-post/" + params.id)
  }
  
  const post = await getPostById(params.id)
  
  if (!post) {
    notFound()
  }
  
  return (
    <div className="container mx-auto py-8">
      <Link href="/admin" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to dashboard
      </Link>
      
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      
      <PostForm post={post} />
    </div>
  )
}
