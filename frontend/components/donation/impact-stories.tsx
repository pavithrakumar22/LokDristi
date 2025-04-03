"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const ImpactStories = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const stories = [
    {
      id: 1,
      title: "New School in Rural Maharashtra",
      description:
        "Thanks to donations to the Education fund, a new school was built in a remote village, providing education to over 200 children who previously had to walk 10km to the nearest school.",
      image: "/placeholder.svg?height=300&width=400",
      quote:
        "The new school has transformed our village. Our children now have access to quality education right here.",
      author: "Sarpanch, Rajgad Village",
      category: "Education",
    },
    {
      id: 2,
      title: "Medical Camp in Odisha",
      description:
        "Healthcare donations funded a week-long medical camp in flood-affected areas of Odisha, providing essential healthcare services to over 5,000 people and distributing medicines worth ₹25 lakhs.",
      image: "/placeholder.svg?height=300&width=400",
      quote:
        "The medical camp was a lifeline for our community after the devastating floods. We received medical care that would have been impossible otherwise.",
      author: "Resident, Balasore District",
      category: "Healthcare",
    },
    {
      id: 3,
      title: "Disaster Relief in Uttarakhand",
      description:
        "PM Relief Fund donations were used to provide immediate assistance to families affected by landslides in Uttarakhand, including temporary shelters, food, and essential supplies.",
      image: "/placeholder.svg?height=300&width=400",
      quote:
        "When we lost everything in the landslide, the quick relief support helped us survive the first critical weeks. We are grateful for the generosity of donors.",
      author: "Survivor, Chamoli District",
      category: "Disaster Relief",
    },
  ]

  const nextStory = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % stories.length)
  }

  const prevStory = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + stories.length) % stories.length)
  }

  const activeStory = stories[activeIndex]

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-blue-700">Impact Stories</h2>
        <p className="text-gray-600">See how your donations are making a difference</p>
      </div>

      <motion.div key={activeStory.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-64 md:h-auto">
                <Image
                  src={activeStory.image || "/placeholder.svg"}
                  alt={activeStory.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {activeStory.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-blue-700 mb-3">{activeStory.title}</h3>
                  <p className="text-gray-600 mb-6">{activeStory.description}</p>

                  <div className="border-l-4 border-blue-600 pl-4 italic text-gray-600 mb-4">
                    <Quote className="h-5 w-5 text-blue-400 mb-2" />"{activeStory.quote}"
                    <p className="text-sm font-medium text-blue-700 mt-2">— {activeStory.author}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-1">
                    {stories.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 w-2 rounded-full ${index === activeIndex ? "bg-blue-600" : "bg-gray-300"}`}
                      />
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" onClick={prevStory}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={nextStory}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default ImpactStories

