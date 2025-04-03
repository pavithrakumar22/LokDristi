"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const DonationCategories = () => {
  const categories = [
    {
      id: "pm-relief",
      name: "PM Relief Fund",
      description: "Support national disaster relief and emergency response",
      image: "/placeholder.svg?height=100&width=100",
      raised: 45000000,
      goal: 100000000,
      percentage: 45,
    },
    {
      id: "education",
      name: "Education",
      description: "Fund schools, scholarships, and educational programs",
      image: "/placeholder.svg?height=100&width=100",
      raised: 28000000,
      goal: 50000000,
      percentage: 56,
    },
    {
      id: "healthcare",
      name: "Healthcare",
      description: "Support hospitals, medical research, and health initiatives",
      image: "/placeholder.svg?height=100&width=100",
      raised: 35000000,
      goal: 75000000,
      percentage: 47,
    },
    {
      id: "rural",
      name: "Rural Development",
      description: "Improve infrastructure and services in rural areas",
      image: "/placeholder.svg?height=100&width=100",
      raised: 18000000,
      goal: 40000000,
      percentage: 45,
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-blue-700">Donation Categories</h2>
        <p className="text-gray-600">Choose a category that aligns with your values</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-1/3 p-4 flex items-center justify-center bg-blue-50">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={100}
                      height={100}
                      className="rounded-full border-4 border-white shadow-md"
                    />
                  </div>
                  <div className="sm:w-2/3 p-4">
                    <h3 className="font-bold text-lg text-blue-700">{category.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{category.description}</p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Raised: {formatCurrency(category.raised)}</span>
                        <span className="text-gray-500">Goal: {formatCurrency(category.goal)}</span>
                      </div>
                      <Progress value={category.percentage} className="h-2" />
                      <div className="text-right text-xs text-gray-500">{category.percentage}% of goal reached</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default DonationCategories

