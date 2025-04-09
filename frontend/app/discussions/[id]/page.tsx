import CommentSection from './CommentSection';

export default function DiscussionPage({ params }: { params: { id: string } }) {
  const discussionId = params.id;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Discussion #{discussionId}</h1>

      {/* You can add title/content here by fetching the discussion */}

      <CommentSection discussionId={discussionId} />
    </div>
  );
}
