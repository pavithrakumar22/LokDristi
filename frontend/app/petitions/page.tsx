"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import PetitionForm from "@/components/petition-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import axios from "axios"

export default function PetitionsPage() {
  const [petitions, setPetitions] = useState<PetitionCardProps[]>([])
  const [loading, setLoading] = useState(true)
  const BASE_URL=process.env.NEXT_PUBLIC_BASE_URL

  useEffect(() => {
    const fetchPetitions = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/petitions`) // Change to your actual API endpoint
        const data = await response.json()
        setPetitions(data)
      } catch (error) {
        console.error("Failed to fetch petitions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPetitions()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-12 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Create & Support Petitions</h1>
          <p className="max-w-2xl mx-auto text-lg">
            Start a petition to make a difference in your community. Every signature brings us closer to positive
            change.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="create" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="create">Create Petition</TabsTrigger>
                <TabsTrigger value="browse">Browse Petitions</TabsTrigger>
              </TabsList>
              <TabsContent value="create">
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Create a New Petition</h2>
                  <PetitionForm />
                </Card>
              </TabsContent>
              <TabsContent value="browse">
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Active Petitions</h2>
                  <div className="space-y-6">
                  {loading ? (
                      <p>Loading petitions...</p>
                    ) : petitions.length > 0 ? (
                      petitions.map((petition, index) => (
                        <PetitionCard key={index} {...petition} />
                      ))
                    ) : (
                      <p>No petitions found.</p>
                    )}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div>
            <Card className="p-6 bg-blue-600 text-white">
              <h3 className="text-xl font-bold mb-4">Why Create a Petition?</h3>
              <p className="mb-4">
                Your petition can make a real difference in your community. When 1,000 citizens sign, we ensure it
                reaches the appropriate authorities.
              </p>

              <h4 className="font-bold mt-6 mb-2">How It Works</h4>
              <ol className="list-decimal list-inside space-y-2 mb-6">
                <li>Create your petition with a clear title and description</li>
                <li>Share with your community to gather signatures</li>
                <li>Once you reach 1,000 signatures, we'll forward it to officials</li>
                <li>Track the status and updates on your petition</li>
              </ol>

              <h4 className="font-bold mt-6 mb-2">Petition Statistics</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Active Petitions:</span>
                  <span className="font-bold">1,245</span>
                </div>
                <div className="flex justify-between">
                  <span>Resolved Issues:</span>
                  <span className="font-bold">783</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Signatures:</span>
                  <span className="font-bold">9,87,654</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

interface PetitionCardProps {
  petitionId: string
  title: string
  description: string
  tags: string[]
  signatures: number
  status: "open" | "closed" | "resolved"
  createdAt: string
}

function PetitionCard({petitionId, title, description, tags, signatures, status, createdAt }: PetitionCardProps) {
  const statusColors = {
    open: "bg-green-100 text-green-800",
    closed: "bg-red-100 text-red-800",
    resolved: "bg-blue-100 text-blue-800",
  }

  const formattedDate = new Date(createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })


const handleSign = async () => {
  try {
    const token = localStorage.getItem("token")

    const res = await axios.post(`http://localhost:5001/api/petitions/support/${petitionId}`, {},  {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })

    if (res.status === 200) {
      alert("Thank you for your support!")
      // You can refresh data or update UI here
    } else {
      alert(res.data.message || "Failed to support the petition.")
    }
  } catch (err: any) {
    console.error("Error signing petition:", err)
    alert(err.response?.data?.message || "Something went wrong. Please try again later.")
  }
}

  

  const progress = Math.min(signatures, 1000) / 10 // percentage out of 1000

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold">{title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      <p className="text-gray-600 mb-3">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <div className="mb-2">
        <div className="flex justify-between text-sm mb-1">
          <span>{signatures} signatures</span>
          <span>Goal: 1,000</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <span>Created: {formattedDate}</span>
        <div className="flex space-x-2">
          <Button onClick={handleSign} variant="outline" size="sm">
            Sign
          </Button>
          <Button variant="outline" size="sm">
            Share
          </Button>
        </div>
      </div>
    </div>
  )
}

