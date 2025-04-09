"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Calendar, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface NewsCardProps {
  title: string
  description: string
  url: string
  publishedAt: string
  imageUrl: string
  category: string
  index: number
}

export function NewsCard({ title, description, url, publishedAt, imageUrl, category, index }: NewsCardProps) {
  // Format the date
  const formattedDate = new Date(publishedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
  const getImageSrc = (url: string | undefined) => {
    if (!url) return "/placeholder.svg";
    return `https://images.weserv.nl/?url=${encodeURIComponent(url)}`;
  };
  

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full"
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        {/* Card Header with Image */}
        <div className="relative">
          {/* Published Date Badge */}
          <div className="absolute top-3 left-3 z-10">
            <Badge className="bg-white/90 text-blue-700 backdrop-blur-sm flex items-center gap-1 px-2 py-1">
              <Calendar className="h-3 w-3" />
              {publishedAt.slice(0, 10)}
            </Badge>
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-blue-600 text-white">{category}</Badge>
          </div>

          {/* Image */}
          <div className="relative h-56 w-full">
          <img
            src={imageUrl}
            alt={title || "News image"}
            className="object-cover w-full h-full rounded"
            onError={(e) => {
                e.currentTarget.src = "https://lokdhristi.s3.us-east-1.amazonaws.com/NEWS.jpg";
            }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex-grow">
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{title}</h3>
          <p className="text-gray-600 line-clamp-3">{description}</p>
        </div>

        {/* Card Footer */}
        <div className="px-5 pb-5 pt-0">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
            onClick={() => window.open(url, "_blank")}
          >
            Learn More
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
