"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

interface Comment {
  _id: string;
  text: string;
}

interface Discussion {
  _id: string;
  title: string;
  content: string;
  upvotes: number;
  downvotes: number;
  comments: Comment[];
}

export default function DiscussionPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [discussion, setDiscussion] = useState<Discussion | null>(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchDiscussion = async () => {
    try {
      const res = await axios.get(`/api/discussions/${id}`);
      setDiscussion(res.data);
    } catch (err) {
      console.error("Failed to fetch discussion:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDiscussion();
    }
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;
    try {
      await axios.post(`/api/discussions/${id}/comment`, { text: comment });
      setComment("");
      fetchDiscussion(); // Refresh
    } catch (err) {
      console.error("Comment failed:", err);
    }
  };

  const handleVote = async (type: "upvote" | "downvote") => {
    try {
      await axios.post(`/api/discussions/${id}/vote`, { type });
      fetchDiscussion(); // Refresh
    } catch (err) {
      console.error("Vote failed:", err);
    }
  };

  if (loading || !discussion) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{discussion.title}</h1>
      <p className="mb-4 text-gray-700">{discussion.content}</p>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => handleVote("upvote")}
          className="px-3 py-1 bg-green-100 hover:bg-green-200 rounded"
        >
          👍 {discussion.upvotes}
        </button>
        <button
          onClick={() => handleVote("downvote")}
          className="px-3 py-1 bg-red-100 hover:bg-red-200 rounded"
        >
          👎 {discussion.downvotes}
        </button>
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border rounded p-2 mb-2"
        placeholder="Write a comment..."
      />
      <button
        onClick={handleCommentSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Post Comment
      </button>

      <h3 className="mt-6 font-semibold text-lg">Comments</h3>
      {discussion.comments.length > 0 ? (
        <ul className="mt-2">
          {discussion.comments.map((c) => (
            <li key={c._id} className="border-t py-2 text-sm text-gray-800">
              {c.text}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mt-2">No comments yet.</p>
      )}
    </div>
  );
}
