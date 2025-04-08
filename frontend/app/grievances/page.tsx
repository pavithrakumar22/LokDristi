"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import GrievanceForm from "@/components/grievance/grievance-form"
import GrievanceList from "@/components/grievance/grievance-list"
import GrievanceStats from "@/components/grievance/grievance-stats"
import { Separator } from "@/components/ui/separator"

export default function GrievancesPage() {
  const [user, setUser] = useState<{ name?: string; aadhaarNumber?: string; phone?: string; email?: string } | null>(
    null,
  )
  const [error, setError] = useState("")
  const [aadhaarNumber, setAadhaarNumber] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

  useEffect(() => {
    const storedAadhaar = sessionStorage.getItem("user")
    if (storedAadhaar) {
      setAadhaarNumber(storedAadhaar)
    }
  }, [])

  useEffect(() => {
    if (aadhaarNumber) {
      fetchUser()
    }
  }, [aadhaarNumber])

  const fetchUser = async () => {
    try {
      const res = await fetch(`${BASE_URL}/user/${aadhaarNumber}`)
      if (!res.ok) {
        throw new Error("User not found")
      }
      const data = await res.json()
      setUser(data)
      setError("")
    } catch (err) {
      setUser(null)
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred")
      }
    }
  }

  const userData = {
    name: user?.name || "Guest",
    aadhaarNumber: user?.aadhaarNumber || aadhaarNumber || "",
    phone: user?.phone || "",
    email: user?.email || "",
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Page Header */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Grievance Portal</h1>
            <p className="max-w-3xl mx-auto text-lg text-blue-100">
              Submit your grievances and concerns directly to the government. Your voice matters in building a better
              society for all citizens.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Grievance List and Stats */}
          <div className="w-full lg:w-2/3 space-y-12">
            <GrievanceStats />

            <Separator className="my-8" />

            <div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="all">All Grievances</TabsTrigger>
                    <TabsTrigger value="trending">Trending</TabsTrigger>
                    <TabsTrigger value="latest">Latest</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all">
                    <GrievanceList type="all" aadhaarNumber={aadhaarNumber} />
                  </TabsContent>
                  <TabsContent value="trending">
                    <GrievanceList type="trending" aadhaarNumber={aadhaarNumber} />
                  </TabsContent>
                  <TabsContent value="latest">
                    <GrievanceList type="latest" aadhaarNumber={aadhaarNumber} />
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>
          </div>

          {/* Right Column - Grievance Form */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-24">
              <GrievanceForm userData={userData} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
