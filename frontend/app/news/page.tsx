"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { NewsCard } from "@/components/news-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, RefreshCw } from "lucide-react"

export default function NewsPage() {
  interface News {
    Title: string
    Description: string
    URL: string
    PublishedAt: string
    ImageURL: string
    category: string
  }

  const [news, setNews] = useState<News[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [loading, setLoading] = useState(true);
  const BASE_URL=process.env.NEXT_PUBLIC_BASE_URL

  const filteredNews = news.filter((item) => {
    const title = item?.Title || "";
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  

  // Define categories for filtering
  const categories = ["Politics", "Economy", "Technology", "Health", "Education"];

  // 👇 Replace with your actual Apps Script URL
  const scriptUrl = "https://script.google.com/macros/s/AKfycbw8VUZqmcofKAfoM-IPqKxOcAWtNvShQyf3ijqW2otBvBU69E2krO12FCtxDuUs7fY_-g/exec"

  // Fetch live data on component mount
  useEffect(() => {
    fetch(`${BASE_URL}/api/news`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.news);
        setNews(data.news || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading news:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-lg">Loading news...</p>;

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl font-bold mb-4">Government News & Updates</h1>
            <p className="text-blue-100 text-lg">
              Stay informed about the latest government policies, initiatives, and announcements.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-8">

        {/* News Results */}
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            Latest Updates{" "}
            <Badge variant="outline" className="ml-2 text-sm font-normal">
              {filteredNews.length} articles
            </Badge>
          </h2>
          <p className="text-sm text-gray-500">
            Showing {filteredNews.length} of {news.length} articles
          </p>
        </div>

        {/* News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredNews.length > 0 ? (
            filteredNews.map((news, index) => (
              <NewsCard
                key={index}
                title={news.Title}
                description={news.Description}
                url={news.URL}
                publishedAt={news.PublishedAt}
                imageUrl={news.ImageURL}
                category="News"
                index={index}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500 text-lg">No news found matching your search.</p>
              <Button variant="outline" className="mt-4" onClick={() => setSearchTerm("")}>
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
