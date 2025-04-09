import { getPostById, getCommentsByPostId } from "@/lib/data"
import { notFound } from "next/navigation"
import Link from "next/link"
import CommentList from "@/components/comment-list"
import CommentForm from "@/components/comment-form"
import VoteButtons from "@/components/vote-buttons"
import { formatDate } from "@/lib/utils"

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPostById(params.id)
  
  if (!post) {
    notFound()
  }
  
  const comments = await getCommentsByPostId(params.id)
  
  return (
    <div className="container mx-auto py-8">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to all posts
      </Link>
      
      <article className="border rounded-lg p-6 mb-8">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <p className="text-sm text-gray-500 mt-1">
          Posted on {formatDate(post.createdAt)} by {post.authorName}
        </p>
        
        <div className="mt-4 prose max-w-none">
          {post.content}
        </div>
        
        <div className="mt-6 flex items-center gap-4">
          <VoteButtons 
            itemId={post.id} 
            itemType="post" 
            upvotes={post.upvotes} 
            downvotes={post.downvotes} 
          />
        </div>
      </article>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Comments ({comments.length})</h2>
        <CommentForm postId={post.id} />
      </div>
      
      <CommentList comments={comments} />
    </div>
  )
}
