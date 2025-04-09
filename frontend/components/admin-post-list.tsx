import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { Post } from "@/lib/types"
import { deletePost } from "@/lib/actions"

export default function AdminPostList({ posts }: { posts: Post[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Title</th>
            <th className="border p-2 text-left">Date</th>
            <th className="border p-2 text-left">Comments</th>
            <th className="border p-2 text-left">Upvotes</th>
            <th className="border p-2 text-left">Downvotes</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.length === 0 ? (
            <tr>
              <td colSpan={6} className="border p-4 text-center text-gray-500">
                No posts available yet.
              </td>
            </tr>
          ) : (
            posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="border p-2">
                  <Link href={`/post/${post.id}`} className="hover:underline">
                    {post.title}
                  </Link>
                </td>
                <td className="border p-2">{formatDate(post.createdAt)}</td>
                <td className="border p-2">{post.commentCount}</td>
                <td className="border p-2">{post.upvotes}</td>
                <td className="border p-2">{post.downvotes}</td>
                <td className="border p-2">
                  <div className="flex gap-2">
                    <Link 
                      href={`/admin/edit-post/${post.id}`}
                      className="px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    >
                      Edit
                    </Link>
                    <DeletePostButton postId={post.id} />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

function DeletePostButton({ postId }: { postId: string }) {
  return (
    <form action={(formData) => deletePost(formData).then(() => {})}>
      <input type="hidden" name="postId" value={postId} />
      <button 
        type="submit"
        className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
        onClick={(e) => {
          if (!confirm("Are you sure you want to delete this post?")) {
            e.preventDefault()
          }
        }}
      >
        Delete
      </button>
    </form>
  )
}
