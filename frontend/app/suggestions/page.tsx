"use client";
import { useState } from "react"
import SuggestionBox from "@/components/SuggestionBox";

export default function SuggestionPage() {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const res = await fetch("http://localhost:5000/api/suggestions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message })
    })

    if (res.ok) {
      alert("Suggestion submitted successfully!")
      setName("")
      setMessage("")
    } else {
      alert("Failed to submit suggestion.")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Suggestion Box</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input 
          type="text" 
          placeholder="Your Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="border p-2"
        />
        <textarea 
          placeholder="Your Suggestion" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit Suggestion
        </button>
      </form>
    </div>
  )
}
