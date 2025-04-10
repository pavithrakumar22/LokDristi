"use client"

import React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Search, Filter, Calendar, Edit, Trash2, MoreHorizontal, FileText } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { useRouter } from 'next/navigation'

// Mock projects data

export default function ProjectsSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    category: "",
    budget: "",
    startDate: "",
    endDate: "",
    location: "",
    manager: "",
  })
  const [projectsData, setProjectsData] = useState<Array<{
    projectId: string;
    title: string;
    description: string;
    department: string;
    totalFunds: string;
    startDate: string;
    completionDate: string;
    status: string;
    currentStage: number;
    location: string;
  }>>([]);
  const router = useRouter()
  useEffect(() => {
      fetch("http://localhost:5001/api/projects")
        .then((res) => res.json())
        .then((data) => setProjectsData(data))
        .catch((err) => console.error("Error fetching donations:", err))
    }, [])

    const handleDeleteProject = async (projectId: string) => {
      try {
        const res = await fetch(`http://localhost:5001/api/projects/${projectId}`, {
          method: "DELETE",
        });
    
        if (!res.ok) {
          throw new Error("Failed to delete project");
        }
    
        const data = await res.json();
        alert("Project deleted successfully");
        console.log("Project deleted:", data);
    
        // Optionally refresh project list here
      } catch (err) {
        console.error("Error deleting project:", err);
      }
    };
    


  // Filter projects based on search term and status
  const filteredProjects = projectsData.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.projectId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || project.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send data to your API
    console.log("Creating new project:", newProject)
    setIsCreateDialogOpen(false)
    // Reset form
    setNewProject({
      title: "",
      description: "",
      category: "",
      budget: "",
      startDate: "",
      endDate: "",
      location: "",
      manager: "",
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewProject((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewProject((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Projects Management</h1>
        <div className="flex gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => router.push("/projects/create")} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Create Project
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectsData.length}</div>
            <p className="text-xs text-gray-500 mt-1">
              Across {Array.from(new Set(projectsData.map((p) => p.department))).length} categories
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectsData.filter((p) => p.status === "In Progress").length}</div>
            <p className="text-xs text-gray-500 mt-1">Projects currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Planned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectsData.filter((p) => p.status === "Planned").length}</div>
            <p className="text-xs text-gray-500 mt-1">Projects ready to start</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectsData.filter((p) => p.status === "Completed").length}</div>
            <p className="text-xs text-gray-500 mt-1">Successfully finished projects</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Planned">Planned</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span>More Filters</span>
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length === 0 ? (
          <div className="col-span-full py-12 text-center">
            <p className="text-gray-500 text-lg">No projects found matching your search criteria.</p>
            <Button variant="outline" className="mt-4" onClick={() => setSearchTerm("")}>
              Clear Search
            </Button>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <Card key={project.projectId} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <CardDescription className="text-sm">{project.projectId}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleDeleteProject(project.projectId)} className="flex items-center text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete Project</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {project.department}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={
                        project.status === "Completed"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : project.status === "In Progress"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-purple-50 text-purple-700 border-purple-200"
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>

                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                      {new Date(project.startDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                      {" - "}
                      {new Date(project.completionDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{project.currentStage * 10}%</span>
                    </div>
                    <Progress value={project.currentStage * 10} className="h-2" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <div className="text-sm">
                  <span className="text-gray-500">Budget:</span>{" "}
                  <span className="font-medium">{project.totalFunds}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Location:</span>{" "}
                  <span className="font-medium">{project.location}</span>
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      <div className="text-sm text-gray-500">
        Showing {filteredProjects.length} of {projectsData.length} projects
      </div>
    </motion.div>
  )
}
