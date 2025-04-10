"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { X, Upload, Plus, Trash2 } from "lucide-react"
import Link from "next/link"


const DEPARTMENTS = [
  "Urban Development",
  "Public Works Department",
  "Water Resources",
  "Transportation",
  "Health",
  "Education",
  "Agriculture",
  "Energy",
  "Rural Development",
  "Information Technology",
  "Tourism",
  "Environment & Forests",
]

export default function CreateProjectPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [department, setDepartment] = useState("")
  const [location, setLocation] = useState("")
  const [contractors, setContractors] = useState<string[]>([""])
  const [stages, setStages] = useState<string[]>(["Planning", "Execution", "Completion"])
  const [totalFunds, setTotalFunds] = useState("")
  const [startDate, setStartDate] = useState("")
  const [completionDate, setCompletionDate] = useState("")
  const [documents, setDocuments] = useState<File[]>([])
  const [showSuccess, setShowSuccess] = useState(false)
  const [updates, setUpdates] = useState([{ date: "", text: "" }])
const [issues, setIssues] = useState([{ title: "", severity: "", status: "" }])


  const handleAddContractor = () => {
    setContractors([...contractors, ""])
  }

  const handleRemoveContractor = (index: number) => {
    const newContractors = [...contractors]
    newContractors.splice(index, 1)
    setContractors(newContractors)
  }

  const handleContractorChange = (index: number, value: string) => {
    const newContractors = [...contractors]
    newContractors[index] = value
    setContractors(newContractors)
  }

  const handleAddStage = () => {
    setStages([...stages, ""])
  }

  const handleRemoveStage = (index: number) => {
    const newStages = [...stages]
    newStages.splice(index, 1)
    setStages(newStages)
  }

  const handleStageChange = (index: number, value: string) => {
    const newStages = [...stages]
    newStages[index] = value
    setStages(newStages)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setDocuments([...documents, ...newFiles])
    }
  }

  const handleRemoveFile = (fileToRemove: File) => {
    setDocuments(documents.filter((file) => file !== fileToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    try {
      const formData = new FormData()
  
      formData.append("title", title)
      formData.append("description", description)
      formData.append("department", department)
      formData.append("location", location)
      formData.append("totalFunds", totalFunds)
      formData.append("allocatedFunds", "160CR")
      formData.append("expenditureSoFar", "60CR")
      formData.append("currentStage", "1")
      formData.append("status", "active")
      formData.append("startDate", startDate)
      formData.append("completionDate", completionDate)
  
      contractors.forEach((contractor, index) => {
        formData.append(`contractors[${index}]`, contractor)
      })
  
      stages.forEach((stage, index) => {
        formData.append(`stages[${index}]`, stage)
      })
  
      documents.forEach((file) => {
        formData.append("files", file) // your backend will receive this as `req.files`
      })

      
      formData.append("updates", JSON.stringify(updates))
      formData.append("issues", JSON.stringify(issues))

  
      const res = await fetch("http://localhost:5001/api/projects/create", {
        method: "POST",
        body: formData,
      })
  
      if (!res.ok) throw new Error("Project creation failed")
  
      const data = await res.json()
      console.log("Project created:", data)
      setShowSuccess(true)
    } catch (err) {
      console.error("Submission error:", err)
      alert("Something went wrong. Please try again.")
    }
  }
  

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}


      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-12 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Create New Project</h1>
          <p className="max-w-2xl mx-auto text-lg">
            Add a new government project to the system for tracking and transparency.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  placeholder="Enter the official project title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Project Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide a detailed description of the project scope and objectives"
                  className="min-h-[150px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select value={department} onValueChange={setDepartment} required>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department responsible for the project" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Contractors</Label>
                <div className="space-y-3">
                  {contractors.map((contractor, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder={`Contractor ${index + 1}`}
                        value={contractor}
                        onChange={(e) => handleContractorChange(index, e.target.value)}
                      />
                      {contractors.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => handleRemoveContractor(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddContractor}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    Add Contractor
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Enter the Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>

                  
              <div className="space-y-2">
                <Label>Project Stages</Label>
                <div className="space-y-3">
                  {stages.map((stage, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder={`Stage ${index + 1}`}
                        value={stage}
                        onChange={(e) => handleStageChange(index, e.target.value)}
                      />
                      {stages.length > 1 && (
                        <Button type="button" variant="outline" size="icon" onClick={() => handleRemoveStage(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddStage}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    Add Stage
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalFunds">Total Funds</Label>
                  <Input
                    id="totalFunds"
                    placeholder="e.g., ₹50 Cr"
                    value={totalFunds}
                    onChange={(e) => setTotalFunds(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="completionDate">Expected Completion Date</Label>
                  <Input
                    id="completionDate"
                    type="date"
                    value={completionDate}
                    onChange={(e) => setCompletionDate(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
              <Label>Project Updates</Label>
              <div className="space-y-3">
                {updates.map((update, index) => (
                  <div key={index} className="grid md:grid-cols-2 gap-2">
                    <Input
                      type="date"
                      value={update.date}
                      onChange={(e) => {
                        const newUpdates = [...updates]
                        newUpdates[index].date = e.target.value
                        setUpdates(newUpdates)
                      }}
                      required
                    />
                    <Input
                      placeholder="Update description"
                      value={update.text}
                      onChange={(e) => {
                        const newUpdates = [...updates]
                        newUpdates[index].text = e.target.value
                        setUpdates(newUpdates)
                      }}
                      required
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setUpdates([...updates, { date: "", text: "" }])}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Update
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Project Issues</Label>
              <div className="space-y-3">
                {issues.map((issue, index) => (
                  <div key={index} className="grid md:grid-cols-3 gap-2">
                    <Input
                      placeholder="Issue Title"
                      value={issue.title}
                      onChange={(e) => {
                        const newIssues = [...issues]
                        newIssues[index].title = e.target.value
                        setIssues(newIssues)
                      }}
                      required
                    />
                    <Input
                      placeholder="Severity (low/medium/high)"
                      value={issue.severity}
                      onChange={(e) => {
                        const newIssues = [...issues]
                        newIssues[index].severity = e.target.value
                        setIssues(newIssues)
                      }}
                      required
                    />
                    <Input
                      placeholder="Status (open/resolved)"
                      value={issue.status}
                      onChange={(e) => {
                        const newIssues = [...issues]
                        newIssues[index].status = e.target.value
                        setIssues(newIssues)
                      }}
                      required
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIssues([...issues, { title: "", severity: "", status: "" }])}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Issue
                </Button>
              </div>
            </div>


              </div>

              <div className="space-y-2">
                <Label>Supporting Documents</Label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500 mb-2">
                    Upload project plans, budgets, approvals, or other relevant documents
                  </p>
                  <Input type="file" id="documents" className="hidden" onChange={handleFileChange} multiple />
                  <Button type="button" variant="outline" onClick={() => document.getElementById("documents")?.click()}>
                    Select Files
                  </Button>
                </div>

                {documents.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {documents.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm truncate">{file.name}</span>
                        <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveFile(file)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Create Project
                </Button>
                <Link href="/projects">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </Card>
        </div>
      </div>

      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Project Created Successfully!</AlertDialogTitle>
            <AlertDialogDescription>
              Your project has been added to the system and is now visible in the projects dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Link href="/admin/projects">
              <AlertDialogAction>View Projects</AlertDialogAction>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

