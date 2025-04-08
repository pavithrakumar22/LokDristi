// "use client"

// import { useEffect, useState } from "react"
// import { motion } from "framer-motion"
// import { Card, CardContent } from "@/components/ui/card"
// import { FileText, ThumbsUp, Clock, Users } from "lucide-react"

// export default function GrievanceStats() {
//   const [stats, setStats] = useState({
//     total: 0,
//     trending: 0,
//     resolved: 0,
//     pending: 0,
//   })
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     // This is a mock implementation - in a real app, you would fetch actual stats
//     const fetchStats = async () => {
//       setIsLoading(true)
//       try {
//         // Simulate API call
//         await new Promise((resolve) => setTimeout(resolve, 1000))

//         // Mock data
//         setStats({
//           total: 124,
//           trending: 18,
//           resolved: 76,
//           pending: 48,
//         })
//       } catch (error) {
//         console.error("Error fetching stats:", error)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchStats()
//   }, [])

//   const statItems = [
//     {
//       title: "Total Grievances",
//       value: stats.total,
//       icon: FileText,
//       color: "text-blue-600",
//       bgColor: "bg-blue-100",
//     },
//     {
//       title: "Trending Issues",
//       value: stats.trending,
//       icon: ThumbsUp,
//       color: "text-amber-600",
//       bgColor: "bg-amber-100",
//     },
//     {
//       title: "Resolved",
//       value: stats.resolved,
//       icon: Clock,
//       color: "text-green-600",
//       bgColor: "bg-green-100",
//     },
//     {
//       title: "Pending",
//       value: stats.pending,
//       icon: Users,
//       color: "text-purple-600",
//       bgColor: "bg-purple-100",
//     },
//   ]

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//       {statItems.map((item, index) => (
//         <motion.div
//           key={item.title}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3, delay: index * 0.1 }}
//         >
//           <Card>
//             <CardContent className="p-4 flex flex-col items-center text-center">
//               <div className={`${item.bgColor} p-2 rounded-full mb-3`}>
//                 <item.icon className={`h-5 w-5 ${item.color}`} />
//               </div>
//               <h3 className="text-sm font-medium text-gray-500">{item.title}</h3>
//               {isLoading ? (
//                 <div className="h-6 w-12 bg-gray-200 animate-pulse rounded mt-1"></div>
//               ) : (
//                 <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
//               )}
//             </CardContent>
//           </Card>
//         </motion.div>
//       ))}
//     </div>
//   )
// }







"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, FileText, ThumbsUp, Clock } from "lucide-react"

export default function GrievanceStats() {
  const [stats, setStats] = useState({
    total: 0,
    trending: 0,
    resolved: 0,
    pending: 0,
  })
  const [loading, setLoading] = useState(true)
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

  useEffect(() => {
    // In a real app, you would fetch these stats from your API
    // For now, we'll simulate with a timeout
    const timer = setTimeout(() => {
      setStats({
        total: 248,
        trending: 42,
        resolved: 156,
        pending: 92,
      })
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const statItems = [
    {
      title: "Total Grievances",
      value: stats.total,
      icon: <FileText className="h-5 w-5 text-blue-600" />,
      color: "bg-blue-50",
    },
    {
      title: "Trending Issues",
      value: stats.trending,
      icon: <ThumbsUp className="h-5 w-5 text-green-600" />,
      color: "bg-green-50",
    },
    {
      title: "Resolved",
      value: stats.resolved,
      icon: <Clock className="h-5 w-5 text-purple-600" />,
      color: "bg-purple-50",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: <AlertCircle className="h-5 w-5 text-orange-600" />,
      color: "bg-orange-50",
    },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Grievance Statistics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className={`${item.color} border-none`}>
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="mb-2">{item.icon}</div>
                <h3 className="text-lg font-semibold">{loading ? "-" : item.value}</h3>
                <p className="text-sm text-gray-600">{item.title}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
