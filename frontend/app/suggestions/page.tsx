"use client";
import { useState } from "react";

export default function SuggestionsPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [links, setLinks] = useState([""]);
  const [uid, setUid] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const suggestionData = {
      title,
      description,
      links,
      uid: anonymous ? null : uid,
      anonymous,
    };

    try {
      const res = await fetch("http://localhost:5000/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(suggestionData),
      });

      if (res.ok) {
        alert("✅ Suggestion submitted!");
        setTitle("");
        setDescription("");
        setLinks([""]);
        setUid("");
        setAnonymous(false);
      } else {
        alert("❌ Failed to submit suggestion");
      }
    } catch (error) {
      alert("❌ Error submitting suggestion");
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Submit a Suggestion</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Links (comma separated)"
          value={links.join(",")}
          onChange={(e) => setLinks(e.target.value.split(","))}
        />
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="UID (Aadhar)"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          disabled={anonymous}
          required={!anonymous}
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
          />
          <span>Submit as Anonymous</span>
        </label>
        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
