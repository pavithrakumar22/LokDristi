"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function NewDiscussionPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleCreate = async () => {
    const res = await axios.post("/api/discussions", { title, content });
    router.push(`/discussions/${res.data._id}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">New Discussion</h1>
      <input
        className="w-full border mb-2 p-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full border p-2"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handleCreate}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Create
      </button>
    </div>
  );
}
