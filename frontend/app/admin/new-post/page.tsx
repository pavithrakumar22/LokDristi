import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { DefaultSession } from "next-auth"
import Link from "next/link"
import PostForm from "@/components/post-form"
declare module "next-auth" {
  interface Session {
    user?: User
  }
}

 
export default async function NewPostPage() {
  const session = await getServerSession(authOptions)
  
  // Check if user is authenticated and is an admin
  if (!session || !session.user || session.user.role !== "admin") {
    redirect("/login?callbackUrl=/admin/new-post")
  }
  
  return (
    <div className="container mx-auto py-8">
      <Link href="/admin" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to dashboard
      </Link>
      
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      
      <PostForm />
    </div>
  )
}
