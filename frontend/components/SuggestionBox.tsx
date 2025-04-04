"use client";
import { useState } from "react";

export default function SuggestionBox() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    links: [""],
    uid: "",
    anonymous: false,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/suggestions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-bold">Give a Suggestion</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="border p-2 w-full" required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-2 w-full" required />
        <input type="text" name="uid" placeholder="Aadhar UID" value={formData.uid} onChange={handleChange} className="border p-2 w-full" required />
        <input type="text" name="links" placeholder="Links (comma separated)" value={formData.links.join(", ")} onChange={(e) => setFormData({ ...formData, links: e.target.value.split(",") })} className="border p-2 w-full" />
        <label className="flex items-center">
          <input type="checkbox" name="anonymous" checked={formData.anonymous} onChange={handleChange} />
          <span className="ml-2">Submit Anonymously</span>
        </label>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
      </form>
    </div>
  );
}
