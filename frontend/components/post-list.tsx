import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { Post } from "@/lib/types"

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="space-y-6">
      {posts.length === 0 ? (
        <p className="text-center py-10 text-gray-500">No posts available yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="border rounded-lg p-4">
            <Link href={`/post/${post.id}`}>
              <h2 className="text-xl font-semibold hover:underline">{post.title}</h2>
            </Link>
            <p className="text-sm text-gray-500 mt-1">
              Posted on {formatDate(post.createdAt)} by {post.authorName}
            </p>
            <p className="mt-2 line-clamp-3">{post.content}</p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1">
                <span>👍 {post.upvotes}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>👎 {post.downvotes}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>💬 {post.commentCount}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
