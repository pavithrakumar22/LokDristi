"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AnimatedCardProps {
  icon: React.ReactNode
  title: string
  description: string
  delay?: number
  className?: string
  children?: React.ReactNode
}

export const AnimatedCard = ({ icon, title, description, delay = 0, className = "", children }: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Card className={`border-blue-200 shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}>
        <CardHeader>
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: delay + 0.2 }}
              viewport={{ once: true }}
            >
              {icon}
            </motion.div>
            <CardTitle className="text-2xl text-blue-700">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-lg text-gray-700 mb-4">{description}</CardDescription>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  )
}

