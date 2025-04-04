"use client";
import { useState } from "react";

export default function SuggestionBox() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    links: "",
    uid: "",
    anonymous: false,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      links: formData.links.split(",").map((link) => link.trim()), // Convert comma-separated links to an array
    };

    const response = await fetch("http://localhost:5000/api/suggestions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    });

    if (response.ok) {
      alert("✅ Suggestion submitted!");
      setFormData({ title: "", description: "", links: "", uid: "", anonymous: false });
    } else {
      alert("❌ Submission failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg max-w-md">
      <h2 className="text-xl font-semibold mb-4">Give a Suggestion</h2>

      <label className="block mb-2 font-medium">Title</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
        required
      />

      <label className="block mb-2 font-medium">Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
        required
      ></textarea>

      <label className="block mb-2 font-medium">Links (comma-separated)</label>
      <input
        type="text"
        name="links"
        value={formData.links}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
      />

      <label className="block mb-2 font-medium">Aadhar UID</label>
      <input
        type="text"
        name="uid"
        value={formData.uid}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
        required
      />

      <label className="flex items-center gap-2">
        <input type="checkbox" name="anonymous" checked={formData.anonymous} onChange={handleChange} />
        Submit as Anonymous
      </label>

      <button type="submit" className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Submit Suggestion
      </button>
    </form>
  );
}
