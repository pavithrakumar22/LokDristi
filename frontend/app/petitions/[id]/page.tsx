import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Share2, FileText, AlertCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function PetitionDetailPage({ params }: { params: { id: string } }) {
  // This would normally fetch the petition data based on the ID
  // For demo purposes, we're using mock data
  const petition = {
    id: params.id,
    title: "Improve Road Safety in Rajaji Nagar",
    description:
      "We need better street lighting and speed bumps to prevent accidents. The current infrastructure is inadequate and has led to several accidents in the past few months. We request the municipal authorities to take immediate action to improve road safety in our neighborhood.\n\nSpecific requests:\n1. Install street lights at 50-meter intervals\n2. Add speed bumps near school zones and residential areas\n3. Repair potholes and damaged road sections\n4. Install proper signage at intersections",
    tags: ["Infrastructure", "Safety", "Urban Planning"],
    signatures: 750,
    goal: 1000,
    status: "open",
    createdAt: "2025-03-15",
    documents: [
      { name: "Accident_Report_2025.pdf", size: "1.2 MB" },
      { name: "Neighborhood_Survey.xlsx", size: "845 KB" },
      { name: "Road_Condition_Photos.zip", size: "3.7 MB" },
    ],
    updates: [
      { date: "2025-04-01", text: "Municipal authorities have acknowledged our petition and scheduled an inspection." },
      { date: "2025-03-25", text: "Reached 500 signatures! Thank you for your support." },
    ],
  }

  const statusColors = {
    open: "bg-green-100 text-green-800",
    closed: "bg-red-100 text-red-800",
    resolved: "bg-blue-100 text-blue-800",
  }

  const formattedDate = new Date(petition.createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const progress = Math.min(petition.signatures, petition.goal) / (petition.goal / 100) // percentage

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-2xl font-bold">{petition.title}</h1>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${statusColors[petition.status as keyof typeof statusColors]}`}
                >
                  {petition.status.charAt(0).toUpperCase() + petition.status.slice(1)}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {petition.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span>{petition.signatures} signatures</span>
                  <span>Goal: {petition.goal}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
              </div>

              <div className="text-sm text-gray-500 mb-6">Created on {formattedDate}</div>

              <div className="prose max-w-none mb-6">
                {petition.description.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                <Button className="bg-blue-600 hover:bg-blue-700">Sign this Petition</Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </Card>

            {petition.documents.length > 0 && (
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Supporting Documents
                </h2>
                <div className="space-y-2">
                  {petition.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                      <span>{doc.name}</span>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-3">{doc.size}</span>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {petition.updates.length > 0 && (
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Updates</h2>
                <div className="space-y-4">
                  {petition.updates.map((update, index) => (
                    <div key={index} className="border-l-4 border-blue-600 pl-4 py-1">
                      <div className="text-sm text-gray-500 mb-1">{update.date}</div>
                      <p>{update.text}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Sign this Petition</h3>
              <p className="text-sm text-gray-600 mb-4">
                Your signature helps us reach our goal of {petition.goal} supporters.
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Add Your Signature</Button>
            </Card>

            <Card className="p-6 bg-amber-50 border border-amber-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h3 className="font-bold text-amber-800 mb-2">Why Signatures Matter</h3>
                  <p className="text-sm text-amber-700">
                    When we reach {petition.goal} signatures, this petition becomes eligible for official review by the
                    relevant authorities. Every signature brings us closer to making a real impact.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Similar Petitions</h3>
              <div className="space-y-4">
                <div className="border-b pb-3">
                  <a href="#" className="font-medium hover:text-blue-600">
                    Improve Street Lighting in Koramangala
                  </a>
                  <div className="text-sm text-gray-500 mt-1">842 signatures</div>
                </div>
                <div className="border-b pb-3">
                  <a href="#" className="font-medium hover:text-blue-600">
                    Fix Dangerous Road Conditions in HSR Layout
                  </a>
                  <div className="text-sm text-gray-500 mt-1">1,245 signatures</div>
                </div>
                <div>
                  <a href="#" className="font-medium hover:text-blue-600">
                    Traffic Safety Measures Near Schools
                  </a>
                  <div className="text-sm text-gray-500 mt-1">976 signatures</div>
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

