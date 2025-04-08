import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Lightbulb, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import SuggestionBox from "@/components/SuggestionBox"

export default function SuggestionsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Community Suggestion Box</h1>
            <p className="text-lg text-blue-100 mb-6">
              Share your ideas to improve government services and community initiatives. The best ideas are implemented
              with full transparency.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
                <CheckCircle2 className="h-5 w-5 text-blue-200 mr-2" />
                <span>450+ suggestions implemented</span>
              </div>
              <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
                <CheckCircle2 className="h-5 w-5 text-blue-200 mr-2" />
                <span>₹120Cr+ in cost savings</span>
              </div>
              <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
                <CheckCircle2 className="h-5 w-5 text-blue-200 mr-2" />
                <span>12,000+ ideas submitted</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
              <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center">
                <Lightbulb className="h-5 w-5 mr-2" />
                How It Works
              </h2>
              <ol className="space-y-4">
                <li className="flex gap-3">
                  <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-sm">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Submit Your Idea</p>
                    <p className="text-sm text-gray-600">
                      Share your suggestion with details on how it can be implemented.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-sm">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Community Voting</p>
                    <p className="text-sm text-gray-600">The community votes on the most impactful suggestions.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-sm">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Expert Review</p>
                    <p className="text-sm text-gray-600">
                      Government experts review top-voted suggestions for feasibility.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-sm">
                    4
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Implementation</p>
                    <p className="text-sm text-gray-600">Selected ideas are implemented with full transparency.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-sm">
                    5
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Recognition</p>
                    <p className="text-sm text-gray-600">
                      Contributors of implemented ideas receive public recognition.
                    </p>
                  </div>
                </li>
              </ol>

              {/* <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                View Implemented Ideas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button> */}
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-700 mb-4">Popular Categories</h2>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none">Digital Governance</Badge>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none">Environment</Badge>
                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-none">Education</Badge>
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-none">Healthcare</Badge>
                <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-none">Transportation</Badge>
                <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-none">Public Safety</Badge>
                <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-200 border-none">Women & Child</Badge>
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-none">
                  Rural Development
                </Badge>
                <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-200 border-none">Urban Planning</Badge>
              </div>
            </div>
          </div>

          {/* Main Content - Suggestion Form */}
          <div className="lg:col-span-2">
            <SuggestionBox />

            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm">
                <strong>Note:</strong> Please be aware that once your submission is complete, you will not have the option to edit or delete it, so make sure all information is accurate before proceeding.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

