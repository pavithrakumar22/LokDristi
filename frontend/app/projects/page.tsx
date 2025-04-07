import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { FileText, Calendar, Users, Building, ArrowRight } from "lucide-react"

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      {/* <header className="bg-blue-700 text-white py-4">
      </header> */}

      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-12 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Government Projects</h1>
          <p className="max-w-2xl mx-auto text-lg">
            Track and monitor government projects in your area. Stay informed about infrastructure development and
            public initiatives.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Projects Dashboard</h2>
          <Link href="/projects/create">
            <Button className="bg-blue-600 hover:bg-blue-700">Create New Project</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-white shadow-sm">
            <div className="text-4xl font-bold text-blue-600 mb-2">127</div>
            <div className="text-gray-500">Active Projects</div>
          </Card>
          <Card className="p-6 bg-white shadow-sm">
            <div className="text-4xl font-bold text-green-600 mb-2">43</div>
            <div className="text-gray-500">Completed Projects</div>
          </Card>
          <Card className="p-6 bg-white shadow-sm">
            <div className="text-4xl font-bold text-amber-600 mb-2">₹2,450 Cr</div>
            <div className="text-gray-500">Total Allocated Funds</div>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="delayed">Delayed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <ProjectCard
              id="1"
              title="Metro Line Extension Phase II"
              description="Extension of the metro line from City Center to Airport with 8 new stations"
              department="Urban Transport Authority"
              contractors="Metro Infrastructure Ltd, Urban Development Corp"
              stages={["Planning", "Land Acquisition", "Foundation Work", "Construction", "Testing", "Operational"]}
              currentStage={2}
              totalFunds="₹1,250 Cr"
              status="active"
              startDate="2024-10-15"
              completionDate="2027-06-30"
            />

            <ProjectCard
              id="2"
              title="Smart City Water Management System"
              description="Implementation of IoT-based water distribution and monitoring system"
              department="Water Resources Department"
              contractors="Smart Utilities Inc, Water Tech Solutions"
              stages={["Planning", "Procurement", "Installation", "Testing", "Deployment"]}
              currentStage={3}
              totalFunds="₹85 Cr"
              status="active"
              startDate="2024-08-01"
              completionDate="2025-07-31"
            />

            <ProjectCard
              id="3"
              title="Central Park Renovation"
              description="Complete renovation of Central Park including new amenities and landscaping"
              department="Parks & Recreation Department"
              contractors="Green Spaces Ltd, Urban Landscaping Co"
              stages={["Planning", "Design", "Demolition", "Construction", "Landscaping", "Completion"]}
              currentStage={5}
              totalFunds="₹32 Cr"
              status="completed"
              startDate="2023-11-10"
              completionDate="2024-12-15"
            />

            <ProjectCard
              id="4"
              title="Rural Healthcare Centers"
              description="Construction of 15 primary healthcare centers in rural districts"
              department="Health Department"
              contractors="Healthcare Infrastructure Solutions, Rural Development Corp"
              stages={[
                "Planning",
                "Land Acquisition",
                "Foundation",
                "Construction",
                "Equipment Installation",
                "Staffing",
                "Operational",
              ]}
              currentStage={3}
              totalFunds="₹120 Cr"
              status="delayed"
              startDate="2024-02-20"
              completionDate="2026-03-31"
            />
          </TabsContent>

          <TabsContent value="active" className="space-y-6">
            <ProjectCard
              id="1"
              title="Metro Line Extension Phase II"
              description="Extension of the metro line from City Center to Airport with 8 new stations"
              department="Urban Transport Authority"
              contractors="Metro Infrastructure Ltd, Urban Development Corp"
              stages={["Planning", "Land Acquisition", "Foundation Work", "Construction", "Testing", "Operational"]}
              currentStage={2}
              totalFunds="₹1,250 Cr"
              status="active"
              startDate="2024-10-15"
              completionDate="2027-06-30"
            />

            <ProjectCard
              id="2"
              title="Smart City Water Management System"
              description="Implementation of IoT-based water distribution and monitoring system"
              department="Water Resources Department"
              contractors="Smart Utilities Inc, Water Tech Solutions"
              stages={["Planning", "Procurement", "Installation", "Testing", "Deployment"]}
              currentStage={3}
              totalFunds="₹85 Cr"
              status="active"
              startDate="2024-08-01"
              completionDate="2025-07-31"
            />
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <ProjectCard
              id="3"
              title="Central Park Renovation"
              description="Complete renovation of Central Park including new amenities and landscaping"
              department="Parks & Recreation Department"
              contractors="Green Spaces Ltd, Urban Landscaping Co"
              stages={["Planning", "Design", "Demolition", "Construction", "Landscaping", "Completion"]}
              currentStage={5}
              totalFunds="₹32 Cr"
              status="completed"
              startDate="2023-11-10"
              completionDate="2024-12-15"
            />
          </TabsContent>

          <TabsContent value="delayed" className="space-y-6">
            <ProjectCard
              id="4"
              title="Rural Healthcare Centers"
              description="Construction of 15 primary healthcare centers in rural districts"
              department="Health Department"
              contractors="Healthcare Infrastructure Solutions, Rural Development Corp"
              stages={[
                "Planning",
                "Land Acquisition",
                "Foundation",
                "Construction",
                "Equipment Installation",
                "Staffing",
                "Operational",
              ]}
              currentStage={3}
              totalFunds="₹120 Cr"
              status="delayed"
              startDate="2024-02-20"
              completionDate="2026-03-31"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

interface ProjectCardProps {
  id: string
  title: string
  description: string
  department: string
  contractors: string
  stages: string[]
  currentStage: number
  totalFunds: string
  status: "active" | "completed" | "delayed" | "cancelled"
  startDate: string
  completionDate: string
}

function ProjectCard({
  id,
  title,
  description,
  department,
  contractors,
  stages,
  currentStage,
  totalFunds,
  status,
  startDate,
  completionDate,
}: ProjectCardProps) {
  const statusColors = {
    active: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
    delayed: "bg-amber-100 text-amber-800",
    cancelled: "bg-red-100 text-red-800",
  }

  const formattedStartDate = new Date(startDate).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const formattedCompletionDate = new Date(completionDate).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${statusColors[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>

        <p className="text-gray-600 mb-4">{description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-start gap-2">
            <Building className="h-5 w-5 text-gray-400 mt-0.5" />
            <div>
              <div className="text-sm text-gray-500">Department</div>
              <div>{department}</div>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Users className="h-5 w-5 text-gray-400 mt-0.5" />
            <div>
              <div className="text-sm text-gray-500">Contractors</div>
              <div>{contractors}</div>
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
            <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
            <div>
              <div className="text-sm text-gray-500">Budget</div>
              <div className="font-medium">{totalFunds}</div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-sm text-gray-500 mb-2">Project Progress</div>
          <div className="flex w-full justify-between mb-2">
            {stages.map((stage, index) => (
              <div
                key={index}
                className={`relative flex-1 text-center ${
                  index === stages.length - 1 ? "" : "border-r border-gray-200"
                }`}
              >
                <div
                  className={`h-2 absolute top-0 left-0 right-0 ${
                    index < currentStage ? "bg-blue-600" : index === currentStage ? "bg-blue-400" : "bg-gray-200"
                  }`}
                ></div>
                <div
                  className={`w-4 h-4 rounded-full mx-auto mt-4 ${
                    index < currentStage
                      ? "bg-blue-600"
                      : index === currentStage
                        ? "bg-blue-400 animate-pulse"
                        : "bg-gray-200"
                  }`}
                ></div>
                <div className={`text-xs mt-1 ${index === currentStage ? "font-bold" : ""}`}>{stage}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Link href={`/projects/${id}`}>
            <Button variant="outline" className="flex items-center gap-1">
              View Details
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}

