import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Calendar, Users, Building, MapPin, Clock, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  // This would normally fetch the project data based on the ID
  // For demo purposes, we're using mock data
  const project = {
    id: params.id,
    title: "Metro Line Extension Phase II",
    description:
      "Extension of the metro line from City Center to Airport with 8 new stations. This project aims to reduce traffic congestion and provide faster connectivity to the airport. The extension will cover approximately 18.5 kilometers with modern facilities at all stations.",
    department: "Urban Transport Authority",
    contractors: ["Metro Infrastructure Ltd", "Urban Development Corp"],
    location: "North-Eastern Corridor",
    stages: ["Planning", "Land Acquisition", "Foundation Work", "Construction", "Testing", "Operational"],
    currentStage: 2,
    totalFunds: "₹1,250 Cr",
    allocatedFunds: "₹450 Cr",
    expenditureSoFar: "₹320 Cr",
    status: "active",
    startDate: "2024-10-15",
    completionDate: "2027-06-30",
    documents: [
      { name: "Project_Proposal.pdf", size: "2.4 MB", type: "Planning" },
      { name: "Budget_Allocation.xlsx", size: "1.1 MB", type: "Financial" },
      { name: "Land_Acquisition_Report.pdf", size: "3.7 MB", type: "Legal" },
      { name: 'Environmental_Impact_Assessment.  size: "3.7 MB', type: "Legal" },
      { name: "Environmental_Impact_Assessment.pdf", size: "5.2 MB", type: "Environmental" },
    ],
    updates: [
      { date: "2025-01-15", text: "Land acquisition completed for 6 out of 8 stations." },
      { date: "2024-12-10", text: "Environmental clearance received from regulatory authorities." },
      { date: "2024-11-05", text: "Project kickoff meeting held with all stakeholders." },
    ],
    issues: [
      { title: "Delay in land acquisition for Station 7", severity: "medium", status: "open" },
      { title: "Budget revision needed for foundation materials", severity: "low", status: "resolved" },
    ],
  }

  const statusColors = {
    active: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
    delayed: "bg-amber-100 text-amber-800",
    cancelled: "bg-red-100 text-red-800",
  }

  const formattedStartDate = new Date(project.startDate).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const formattedCompletionDate = new Date(project.completionDate).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-blue-700 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <a href="/" className="text-xl font-bold">
              LokDhristi
            </a>
            <nav className="hidden md:flex ml-8 space-x-4">
              <a href="/grievances" className="flex items-center">
                <span className="mr-1">💬</span> Grievances
              </a>
              <a href="/updates" className="flex items-center">
                <span className="mr-1">📋</span> Updates
              </a>
              <a href="/voting" className="flex items-center">
                <span className="mr-1">🗳️</span> Voting
              </a>
              <a href="/legal-help" className="flex items-center">
                <span className="mr-1">⚖️</span> Legal Help
              </a>
              <a href="/donate" className="flex items-center">
                <span className="mr-1">🎁</span> Donate
              </a>
              <a href="/suggestions" className="flex items-center">
                <span className="mr-1">📍</span> Suggestions
              </a>
            </nav>
          </div>
          <Button variant="outline" className="bg-white text-blue-700 hover:bg-blue-50">
            My Account
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link href="/projects">
                <Button variant="ghost" size="sm">
                  Back to Projects
                </Button>
              </Link>
              <span
                className={`text-xs px-3 py-1 rounded-full ${statusColors[project.status as keyof typeof statusColors]}`}
              >
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
            </div>
            <h1 className="text-3xl font-bold">{project.title}</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Generate Report</Button>
            <Button variant="outline">Share Project</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Project Overview</h2>
              <p className="text-gray-700 mb-6">{project.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-start gap-2">
                  <Building className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Department</div>
                    <div>{project.department}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Location</div>
                    <div>{project.location}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Timeline</div>
                    <div>
                      {formattedStartDate} - {formattedCompletionDate}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Current Stage</div>
                    <div>{project.stages[project.currentStage]}</div>
                  </div>
                </div>
              </div>

              <h3 className="font-bold text-lg mb-3">Project Journey</h3>
              <div className="relative pb-8">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200 ml-2.5"></div>
                {project.stages.map((stage, index) => (
                  <div key={index} className="relative flex items-start mb-6 last:mb-0">
                    <div
                      className={`w-5 h-5 rounded-full flex-shrink-0 z-10 ${
                        index < project.currentStage
                          ? "bg-blue-600"
                          : index === project.currentStage
                            ? "bg-blue-400 animate-pulse"
                            : "bg-gray-200"
                      }`}
                    ></div>
                    <div className="ml-4">
                      <h4 className={`font-medium ${index === project.currentStage ? "text-blue-600" : ""}`}>
                        {stage}
                      </h4>
                      {index === project.currentStage && <p className="text-sm text-gray-500">Current stage</p>}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Financial Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Total Budget</div>
                  <div className="text-2xl font-bold text-blue-600">{project.totalFunds}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Allocated</div>
                  <div className="text-2xl font-bold text-green-600">{project.allocatedFunds}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Expenditure</div>
                  <div className="text-2xl font-bold text-amber-600">{project.expenditureSoFar}</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Budget Utilization</span>
                  <span>
                    {Math.round(
                      (Number.parseInt(project.expenditureSoFar.replace(/[^\d]/g, "")) /
                        Number.parseInt(project.totalFunds.replace(/[^\d]/g, ""))) *
                        100,
                    )}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{
                      width: `${Math.round((Number.parseInt(project.expenditureSoFar.replace(/[^\d]/g, "")) / Number.parseInt(project.totalFunds.replace(/[^\d]/g, ""))) * 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            </Card>

            <Tabs defaultValue="updates" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="updates">Updates</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="issues">Issues</TabsTrigger>
              </TabsList>

              <TabsContent value="updates">
                <Card className="p-6">
                  <h2 className="text-xl font-bold mb-4">Project Updates</h2>
                  <div className="space-y-4">
                    {project.updates.map((update, index) => (
                      <div key={index} className="border-l-4 border-blue-600 pl-4 py-1">
                        <div className="text-sm text-gray-500 mb-1">{update.date}</div>
                        <p>{update.text}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="documents">
                <Card className="p-6">
                  <h2 className="text-xl font-bold mb-4">Supporting Documents</h2>
                  <div className="space-y-3">
                    {project.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-gray-400" />
                          <div>
                            <div>{doc.name}</div>
                            <div className="text-xs text-gray-500">{doc.type}</div>
                          </div>
                        </div>
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
              </TabsContent>

              <TabsContent value="issues">
                <Card className="p-6">
                  <h2 className="text-xl font-bold mb-4">Issues & Challenges</h2>
                  <div className="space-y-4">
                    {project.issues.map((issue, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{issue.title}</h3>
                          <Badge variant={issue.status === "open" ? "destructive" : "outline"}>{issue.status}</Badge>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <span className="text-gray-500">Severity:</span>
                          <span
                            className={
                              issue.severity === "high"
                                ? "text-red-600"
                                : issue.severity === "medium"
                                  ? "text-amber-600"
                                  : "text-blue-600"
                            }
                          >
                            {issue.severity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Contractors</h3>
              <div className="space-y-3">
                {project.contractors.map((contractor, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Users className="h-5 w-5 text-gray-400" />
                    <span>{contractor}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Project Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Completion Percentage</span>
                  <span className="font-bold">35%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "35%" }}></div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-gray-600">Timeline Status</span>
                  <span className="text-green-600 font-medium">On Schedule</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Budget Status</span>
                  <span className="text-amber-600 font-medium">Under Review</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Quality Assessment</span>
                  <span className="text-green-600 font-medium">Satisfactory</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-blue-50 border border-blue-200">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-bold text-blue-800 mb-2">Project Benefits</h3>
                  <ul className="text-sm text-blue-700 space-y-2 list-disc pl-4">
                    <li>Reduced travel time by 45 minutes</li>
                    <li>Decreased traffic congestion by 30%</li>
                    <li>Environmental impact reduction</li>
                    <li>Improved connectivity to business districts</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Related Projects</h3>
              <div className="space-y-3">
                <Link href="#" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <div className="font-medium">Airport Terminal Expansion</div>
                  <div className="text-sm text-gray-500">Urban Transport Authority</div>
                </Link>
                <Link href="#" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <div className="font-medium">City Center Redevelopment</div>
                  <div className="text-sm text-gray-500">Urban Development</div>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

