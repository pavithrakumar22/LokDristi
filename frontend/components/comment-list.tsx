import { Comment } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import VoteButtons from "@/components/vote-buttons"
import CommentForm from "@/components/comment-form"
import { useState } from "react"

export default function CommentList({ comments }: { comments: Comment[] }) {
  return (
    <div className="space-y-6">
      {comments.length === 0 ? (
        <p className="text-center py-6 text-gray-500">No comments yet. Be the first to comment!</p>
      ) : (
        comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))
      )}
    </div>
  )
}

function CommentItem({ comment }: { comment: Comment }) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between">
        <p className="font-medium">{comment.authorName}</p>
        <p className="text-sm text-gray-500">{formatDate(comment.createdAt)}</p>
      </div>
      
      <p className="mt-2">{comment.content}</p>
      
      <div className="mt-4 flex items-center gap-4">
        <VoteButtons 
          itemId={comment.id} 
          itemType="comment" 
          upvotes={comment.upvotes} 
          downvotes={comment.downvotes} 
        />
        
        <button 
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="text-sm text-blue-500 hover:underline"
        >
          {showReplyForm ? "Cancel" : "Reply"}
        </button>
      </div>
      
      {showReplyForm && (
        <div className="mt-4 pl-4 border-l-2">
          <CommentForm 
            postId={comment.postId} 
            parentId={comment.id} 
            onSuccess={() => setShowReplyForm(false)}
          />
        </div>
      )}
      
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 pl-4 border-l-2 space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  )
}
