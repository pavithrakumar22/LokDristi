import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import { getPosts } from "@/lib/data"
import AdminPostList from "@/components/admin-post-list"

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  
  // Check if user is authenticated and is an admin
  if (!session || session.user?.role !== "admin") {
    redirect("/login?callbackUrl=/admin")
  }
  
  const posts = await getPosts()
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Link 
          href="/admin/new-post" 
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Create New Post
        </Link>
      </div>
      
      <AdminPostList posts={posts} />
    </div>
  )
}
