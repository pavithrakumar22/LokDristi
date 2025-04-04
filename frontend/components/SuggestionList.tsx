"use client";
import { useEffect, useState } from "react";

export default function SuggestionList() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/suggestions")
      .then((res) => res.json())
      .then((data) => setSuggestions(data));
  }, []);

  return (
    <div className="p-4 border rounded shadow mt-4">
      <h2 className="text-xl font-bold">Suggestions</h2>
      {suggestions.length === 0 ? (
        <p>No suggestions yet.</p>
      ) : (
        <ul>
          {suggestions.map((sug: any, index) => (
            <li key={index} className="border-b p-2">
              <strong>{sug.title}</strong> - {sug.description}  
              {sug.anonymous ? <span>(Anonymous)</span> : <span> (UID: {sug.uid})</span>}
              <ul>
                {sug.links.map((link: string, i: number) => (
                  <li key={i}><a href={link} className="text-blue-500">{link}</a></li>
                ))}
              </ul>
              <p className="text-gray-500">Submitted on: {new Date(sug.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
