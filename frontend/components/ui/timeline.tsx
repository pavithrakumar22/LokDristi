"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll } from "framer-motion"

export const Timeline = ({
  data,
}: {
  data: {
    title: string
    content: React.ReactNode
  }[]
}) => {
  const [activeItem, setActiveItem] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  })

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const items = ref.current.querySelectorAll(".timeline-item")
      const itemsArray = Array.from(items)
      const itemPositions = itemsArray.map((item) => {
        const { top } = item.getBoundingClientRect()
        return top
      })

      const activeIndex = itemPositions.findIndex((top) => top > window.innerHeight / 2)
      setActiveItem(activeIndex === -1 ? itemsArray.length - 1 : activeIndex - 1)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={ref} className="relative w-full">
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-blue-200 transform -translate-x-1/2" />
      {data.map((item, idx) => (
        <div
          key={idx}
          className={`timeline-item relative flex flex-col md:flex-row md:justify-between items-start mb-16 md:mb-24 ${
            idx % 2 === 0 ? "md:flex-row-reverse" : ""
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className={`w-full md:w-[45%] ${idx % 2 === 0 ? "md:text-right" : ""}`}
          >
            <h3 className="text-2xl font-bold text-blue-600 mb-4">{item.title}</h3>
            <div className="timeline-content">{item.content}</div>
          </motion.div>
          <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-white border-4 border-blue-600 z-10" />
        </div>
      ))}
    </div>
  )
}

