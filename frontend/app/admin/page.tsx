"use client"

import { useState } from "react"
import DonationsSection from "@/components/admin/donations-section"
import ProjectsSection from "@/components/admin/projects-section"
import SuggestionsSection from "@/components/admin/suggestions-section"
import GrievancesSection from "@/components/admin/grievances-section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

// Assuming AdminLayout component (you'll need to adjust based on your actual implementation)
function AdminLayout({ children, activeSection, setActiveSection }: { children: React.ReactNode; activeSection: string; setActiveSection: React.Dispatch<React.SetStateAction<string>> }) {
  const sections = [
    { id: "dashboard", label: "Dashboard" },
    { id: "donations", label: "Donations" },
    { id: "projects", label: "Projects" },
    { id: "suggestions", label: "Suggestions" },
    { id: "grievances", label: "Grievances" },
    { id: "voting", label: "Voting" },
  ]

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-4">
        <h2 className="text-xl font-bold mb-4">Admin Portal</h2>
        <nav>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                console.log(`Switching to section: ${section.id}`) // Debug log
                setActiveSection(section.id)
              }}
              className={`block w-full text-left py-2 px-4 mb-2 rounded ${
                activeSection === section.id ? "bg-blue-500 text-white" : "hover:bg-gray-200"
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </div>
      {/* Main content */}
      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard")

  // Debug log to check activeSection changes
  console.log("Current activeSection:", activeSection)

  return (
    <AdminLayout activeSection={activeSection} setActiveSection={setActiveSection}>
      {activeSection === "dashboard" && (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard
              title="Total Donations"
              value="₹1,24,56,789"
              change="+12.5%"
              positive={true}
              description="vs. last month"
            />
            <DashboardCard
              title="Active Projects"
              value="42"
              change="+3"
              positive={true}
              description="new this month"
            />
            <DashboardCard
              title="Pending Suggestions"
              value="156"
              change="-8.3%"
              positive={false}
              description="vs. last month"
            />
            <DashboardCard
              title="Open Grievances"
              value="89"
              change="+5.2%"
              positive={false}
              description="vs. last month"
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentActivityCard />
            <QuickActionsCard setActiveSection={setActiveSection} />
          </div>
        </div>
      )}

      {activeSection === "donations" && <DonationsSection />}
      {activeSection === "projects" && <ProjectsSection />}
      {activeSection === "suggestions" && <SuggestionsSection />}
      {activeSection === "grievances" && <GrievancesSection />}
      {activeSection === "voting" && <VotingSection />}
    </AdminLayout>
  )
}

function DashboardCard({ title, value, change, positive, description }: { title: string; value: string; change: string; positive: boolean; description: string }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <div className="flex items-center mt-2">
        <span className={`text-sm font-medium ${positive ? "text-green-600" : "text-red-600"}`}>{change}</span>
        <span className="text-gray-500 text-sm ml-2">{description}</span>
      </div>
    </div>
  )
}

function RecentActivityCard() {
  const activities = [
    { id: 1, action: "New donation received", details: "₹25,000 for Education Fund", time: "10 minutes ago" },
    { id: 2, action: "Project status updated", details: "Rural Road Construction: 75% complete", time: "1 hour ago" },
    { id: 3, action: "Suggestion approved", details: "Digital Literacy Program in Rural Areas", time: "2 hours ago" },
    { id: 4, action: "Grievance resolved", details: "Water supply issue in Sector 12", time: "3 hours ago" },
    { id: 5, action: "New project created", details: "Solar Power Installation in Government Schools", time: "5 hours ago" },
  ]

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h3 className="text-lg font-medium">Recent Activity</h3>
      </div>
      <div className="p-6">
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li key={activity.id} className="flex items-start">
              <div className="h-2 w-2 rounded-full bg-blue-600 mt-2 mr-3"></div>
              <div>
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.details}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function QuickActionsCard({ setActiveSection }: { setActiveSection: React.Dispatch<React.SetStateAction<string>> }) {
  const actions = [
    { title: "Create New Project", description: "Set up a new government initiative or project", action: () => setActiveSection("projects") },
    { title: "Review Pending Suggestions", description: "Evaluate and respond to citizen suggestions", action: () => setActiveSection("suggestions") },
    { title: "Address Urgent Grievances", description: "Respond to high-priority citizen complaints", action: () => setActiveSection("grievances") },
    { title: "Generate Donation Report", description: "Create a summary of recent donations", action: () => setActiveSection("donations") },
    { title: "Manage Voting", description: "Start elections or declare results", action: () => setActiveSection("voting") },
  ]

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h3 className="text-lg font-medium">Quick Actions</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 gap-4">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => {
                console.log(`Quick action clicked: ${action.title}`) // Debug log
                action.action()
              }}
              className="text-left p-4 border rounded-lg hover:bg-blue-50 transition-colors"
            >
              <h4 className="font-medium text-blue-600">{action.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{action.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function VotingSection() {
  const [candidates, setCandidates] = useState([""])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [electionResults, setElectionResults] = useState<{ winner: string; votes: Record<string, number> } | null>(null)

  const handleCandidateChange = (index: number, value: string): void => {
    const newCandidates: string[] = [...candidates]
    newCandidates[index] = value
    setCandidates(newCandidates)
  }

  const addCandidate = () => {
    setCandidates([...candidates, ""])
  }

  const removeCandidate = (index: number): void => {
    if (candidates.length > 1) {
      setCandidates(candidates.filter((_, i) => i !== index))
    }
  }


  const startElection = async () => {

    try {
      const response = await fetch("http://localhost:5001/api/start-election", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "candidates": ["Alice", "Bob", "Charlie"]
        }),
      })

      if (!response.ok) throw new Error("Failed to start election")
      const data = await response.json()
      console.log("Election started:", data)
      setIsDialogOpen(false)
      setCandidates([""])
      alert("Election started successfully!")
    } catch (error) {
      console.error("Error starting election:", error)
      alert("Failed to start election: " + (error instanceof Error ? error.message : "Unknown error"))
    }
  }

  const declareResults = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/result", {
        method: "GET",
      })

      if (!response.ok) throw new Error("Failed to fetch results")
      const data = await response.json()
      setElectionResults(data)
    } catch (error) {
      console.error("Error fetching election results:", error)
      alert("Failed to fetch results: " + (error instanceof Error ? error.message : "Unknown error"))
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Voting Management</h1>
      <div className="flex gap-4">
        <Button onClick={startElection}>Start Election</Button>
        <Button onClick={declareResults}>Declare Results</Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start New Election</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-gray-600">Enter the names of the candidates for the election:</p>
            {candidates.map((candidate, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={candidate}
                  onChange={(e) => handleCandidateChange(index, e.target.value)}
                  placeholder={`Candidate ${index + 1}`}
                  className="flex-grow"
                />
                {candidates.length > 1 && (
                  <Button variant="outline" size="sm" onClick={() => removeCandidate(index)}>
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button variant="outline" onClick={addCandidate}>Add Candidate</Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={startElection}>Start Election</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {electionResults && (
        <Card>
          <CardHeader>
            <CardTitle>Election Results</CardTitle>
          </CardHeader>
          <CardContent>
            {electionResults.winner ? (
              <div className="space-y-4">
                <p className="text-lg font-medium">Winner: {electionResults.winner}</p>
                <div>
                  <h4 className="font-medium">Vote Breakdown:</h4>
                  <ul className="mt-2 space-y-2">
                    {Object.entries(electionResults.votes).map(([candidate, votes]) => (
                      <li key={candidate} className="text-sm">
                        {candidate}: {votes} votes
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p>No results available yet</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}