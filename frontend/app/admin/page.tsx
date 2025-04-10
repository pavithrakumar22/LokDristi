"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import DonationsSection from "@/components/admin/donations-section"
import ProjectsSection from "@/components/admin/projects-section"
import SuggestionsSection from "@/components/admin/suggestions-section"
import GrievancesSection from "@/components/admin/grievances-section"

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard")

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
    </AdminLayout>
  )
}

function DashboardCard({
  title,
  value,
  change,
  positive,
  description,
}: {
  title: string
  value: string
  change: string
  positive: boolean
  description: string
}) {
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
    {
      id: 1,
      action: "New donation received",
      details: "₹25,000 for Education Fund",
      time: "10 minutes ago",
    },
    {
      id: 2,
      action: "Project status updated",
      details: "Rural Road Construction: 75% complete",
      time: "1 hour ago",
    },
    {
      id: 3,
      action: "Suggestion approved",
      details: "Digital Literacy Program in Rural Areas",
      time: "2 hours ago",
    },
    {
      id: 4,
      action: "Grievance resolved",
      details: "Water supply issue in Sector 12",
      time: "3 hours ago",
    },
    {
      id: 5,
      action: "New project created",
      details: "Solar Power Installation in Government Schools",
      time: "5 hours ago",
    },
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

function QuickActionsCard({ setActiveSection }: { setActiveSection: (section: string) => void }) {
  const actions = [
    {
      title: "Create New Project",
      description: "Set up a new government initiative or project",
      action: () => setActiveSection("projects"),
    },
    {
      title: "Review Pending Suggestions",
      description: "Evaluate and respond to citizen suggestions",
      action: () => setActiveSection("suggestions"),
    },
    {
      title: "Address Urgent Grievances",
      description: "Respond to high-priority citizen complaints",
      action: () => setActiveSection("grievances"),
    },
    {
      title: "Generate Donation Report",
      description: "Create a summary of recent donations",
      action: () => setActiveSection("donations"),
    },
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
              onClick={action.action}
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
