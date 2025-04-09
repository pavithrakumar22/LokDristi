'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Comment = {
  _id: string;
  user: string;
  text: string;
  upvotes: number;
  downvotes: number;
};

export default function CommentSection({ discussionId }: { discussionId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState('Akshaya Reddy'); // Replace with logged-in user name if needed

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await axios.get<Comment[]>(`/api/comments/${discussionId}`);
      setComments(res.data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handlePost = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await axios.post<Comment>(`/api/comments/${discussionId}`, {
        user,
        text: newComment,
      });
      setComments([res.data, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Post error:', error);
    }
  };

  const handleVote = async (commentId: string, type: 'upvote' | 'downvote') => {
    try {
      const res = await axios.patch<Comment>(`/api/comments/${type}/${commentId}`);
      setComments((prev) =>
        prev.map((c) => (c._id === commentId ? res.data : c))
      );
    } catch (error) {
      console.error('Vote error:', error);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Comments</h2>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="w-full border rounded p-2"
        placeholder="Write a comment..."
      />
      <button
        onClick={handlePost}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
      >
        Post
      </button>

      <div className="mt-4 space-y-4">
        {comments.map((comment) => (
          <div key={comment._id} className="bg-gray-100 p-4 rounded shadow">
            <div className="font-semibold">{comment.user}</div>
            <div className="text-gray-700 mt-1">{comment.text}</div>
            <div className="flex items-center gap-4 mt-2 text-sm">
              <button onClick={() => handleVote(comment._id, 'upvote')}>⬆️ {comment.upvotes}</button>
              <button onClick={() => handleVote(comment._id, 'downvote')}>⬇️ {comment.downvotes}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
