'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function DiscussionDetail() {
  const { id } = useParams();
  const [thread, setThread] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:5001/api/discussions/${id}`)
      .then((res) => res.json())
      .then((data) => setThread(data));
  }, [id]);

  if (!thread) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{thread.title}</h1>
      <p className="text-sm text-gray-500 mb-4">By {thread.author}</p>
      <div className="border p-4 rounded bg-white">{thread.content}</div>
    </div>
  );
}
