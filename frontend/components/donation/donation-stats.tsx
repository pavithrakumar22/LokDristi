"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const DonationStats = () => {
  const [totalDonation, setTotalDonation] = useState(12567890)

  // Simulate real-time donation updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalDonation((prev) => prev + Math.floor(Math.random() * 1000))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const categoryData = [
    { name: "PM Relief Fund", value: 35 },
    { name: "Disaster Relief", value: 20 },
    { name: "Education", value: 15 },
    { name: "Healthcare", value: 12 },
    { name: "Rural Development", value: 10 },
    { name: "Other", value: 8 },
  ]

  const monthlyData = [
    { name: "Jan", amount: 1250000 },
    { name: "Feb", amount: 1500000 },
    { name: "Mar", amount: 1350000 },
    { name: "Apr", amount: 1800000 },
    { name: "May", amount: 2100000 },
    { name: "Jun", amount: 1950000 },
    { name: "Jul", amount: 2300000 },
    { name: "Aug", amount: 2450000 },
    { name: "Sep", amount: 2200000 },
    { name: "Oct", amount: 2600000 },
    { name: "Nov", amount: 2800000 },
    { name: "Dec", amount: 3100000 },
  ]

  const stateData = [
    { name: "Maharashtra", amount: 2500000 },
    { name: "Delhi", amount: 2100000 },
    { name: "Karnataka", amount: 1800000 },
    { name: "Tamil Nadu", amount: 1600000 },
    { name: "Gujarat", amount: 1400000 },
    { name: "Uttar Pradesh", amount: 1200000 },
    { name: "West Bengal", amount: 1000000 },
    { name: "Others", amount: 3400000 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-blue-800">Total Donations</CardTitle>
            <CardDescription>Live donation counter</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">{formatCurrency(totalDonation)}</div>
            <p className="text-sm text-blue-700 mt-2">
              From {Math.floor(totalDonation / 5000).toLocaleString()} donors across India
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Today</p>
                <p className="text-lg font-bold text-blue-600">{formatCurrency(345000)}</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">This Week</p>
                <p className="text-lg font-bold text-blue-600">{formatCurrency(1250000)}</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">This Month</p>
                <p className="text-lg font-bold text-blue-600">{formatCurrency(4500000)}</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">This Year</p>
                <p className="text-lg font-bold text-blue-600">{formatCurrency(25000000)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Tabs defaultValue="category">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="category">By Category</TabsTrigger>
            <TabsTrigger value="monthly">Monthly Trend</TabsTrigger>
            <TabsTrigger value="state">By State</TabsTrigger>
          </TabsList>

          <TabsContent value="category">
            <Card>
              <CardHeader>
                <CardTitle>Donation Distribution by Category</CardTitle>
                <CardDescription>Percentage breakdown of donations by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Donation Trends</CardTitle>
                <CardDescription>Donation amounts collected each month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `₹${(value / 1000000).toFixed(1)}M`} />
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                      <Bar dataKey="amount" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="state">
            <Card>
              <CardHeader>
                <CardTitle>Donations by State</CardTitle>
                <CardDescription>Top contributing states across India</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stateData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" tickFormatter={(value) => `₹${(value / 1000000).toFixed(1)}M`} />
                      <YAxis type="category" dataKey="name" width={100} />
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                      <Bar dataKey="amount" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

export default DonationStats

