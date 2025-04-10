"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Filter, CheckCircle2, XCircle, Clock, Calendar, Eye } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"

export default function GrievancesSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [viewGrievance, setViewGrievance] = useState<Grievance | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [responseText, setResponseText] = useState("")
  const [grievanceData, setGrievanceData] = useState<{
    grievanceId: string;
    user: {
      _id: string;
      name: string;
      aadhaarNo: string;
      phone: string;
      email: string;
    };
    grievanceType: string;
    title: string;
    description: string;
    desiredOutcome: string;
    witness: string;
    fileUrl: string;
    upvotesCount: string;
    upvotedUsers: string[];
    createdAt: string;
    status: string; // Added explicit status
  }[]>([])

  useEffect(() => {
    fetch("http://localhost:5001/api/grievances")
      .then((res) => res.json())
      .then((data) => setGrievanceData(data))
      .catch((err) => console.error("Error fetching grievances:", err))
  }, [])

  const filteredGrievances = grievanceData.filter((grievance) => {
    const matchesSearch =
      (grievance.title?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (grievance.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (grievance.grievanceId?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (grievance.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
    const matchesStatus = selectedStatus === "all" || grievance.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  interface Grievance {
    grievanceId: string;
    user: {
      _id: string;
      name: string;
      aadhaarNo: string;
      phone: string;
      email: string;
    };
    grievanceType: string;
    title: string;
    description: string;
    desiredOutcome: string;
    witness: string;
    fileUrl: string;
    upvotesCount: string;
    upvotedUsers: string[];
    createdAt: string;
    status: string;
  }

  const handleViewGrievance = (grievance: Grievance) => {
    setViewGrievance(grievance)
    setIsViewDialogOpen(true)
  }

  const handleStatusChange = (status: "Open" | "In Progress" | "Resolved"): void => {
    if (!viewGrievance) return
    // In a real app, you'd make an API call to update the status
    console.log(`Changing status of ${viewGrievance.grievanceId} to ${status}`)
    setIsViewDialogOpen(false)
    setViewGrievance(null)
  }

  const handleCloseDialog = () => {
    setIsViewDialogOpen(false)
    setViewGrievance(null)
    setResponseText("")
  }

  const formatDate = (dateString: string | null | undefined): string => {
    return dateString ? new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }) : "N/A"
  }



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Grievances Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Grievances</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{grievanceData.length}</div>
            <p className="text-xs text-gray-500 mt-1">
              From {Array.from(new Set(grievanceData.map((g) => g.user?._id || "Unknown"))).length} users
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Open</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {grievanceData.filter((g) => g.status === "Open").length}
            </div>
            <p className="text-xs text-gray-500 mt-1">Awaiting action</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {grievanceData.filter((g) => g.status === "In Progress").length}
            </div>
            <p className="text-xs text-gray-500 mt-1">Being addressed</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search grievances..."
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
            <SelectItem value="Open">Open</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGrievances.length === 0 ? (
          <div className="col-span-full py-12 text-center">
            <p className="text-gray-500 text-lg">No grievances found matching your search criteria.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm("")
                setSelectedStatus("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          filteredGrievances.map((grievance) => (
            <Card key={grievance.grievanceId} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg line-clamp-1">{grievance.title || "Untitled"}</CardTitle>
                    <CardDescription className="text-sm">{grievance.grievanceId}</CardDescription>
                  </div>
                  <Badge
                    className={
                      grievance.status === "Resolved"
                        ? "bg-green-100 text-green-700 border-green-200"
                        : grievance.status === "In Progress"
                          ? "bg-amber-100 text-amber-700 border-amber-200"
                          : "bg-blue-100 text-blue-700 border-blue-200"
                    }
                  >
                    {grievance.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 line-clamp-3">{grievance.description || "No description"}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {grievance.grievanceType || "Uncategorized"}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{formatDate(grievance.createdAt)}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Avatar className="h-5 w-5 mr-2">
                      <AvatarFallback className="text-xs">
                        {grievance.user?.name}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{grievance.user?.name || "Anonymous"}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Upvotes: {grievance.upvotesCount || "0"}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" className="w-full" onClick={() => handleViewGrievance(grievance)}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      {viewGrievance && isViewDialogOpen && (
        <Dialog open={isViewDialogOpen} onOpenChange={handleCloseDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{viewGrievance.title || "Untitled"}</DialogTitle>
              <DialogDescription>
                {viewGrievance.grievanceId} - Submitted on {formatDate(viewGrievance.createdAt)}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="flex flex-wrap gap-2">
                <Badge
                  className={
                    viewGrievance.status === "Resolved"
                      ? "bg-green-100 text-green-700 border-green-200"
                      : viewGrievance.status === "In Progress"
                        ? "bg-amber-100 text-amber-700 border-amber-200"
                        : "bg-blue-100 text-blue-700 border-blue-200"
                  }
                >
                  {viewGrievance.status}
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {viewGrievance.grievanceType || "Uncategorized"}
                </Badge>
              </div>

              <div className="border rounded-lg p-4 bg-gray-50">
                <p className="text-gray-700">{viewGrievance.description || "No description available"}</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Desired Outcome:</span> {viewGrievance.desiredOutcome || "Not specified"}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Witness:</span> {viewGrievance.witness || "None"}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Upvotes:</span> {viewGrievance.upvotesCount || "0"}
                </p>
              </div>

              {viewGrievance.fileUrl && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Attached File:</h4>
                  <div className="relative h-40 rounded-md overflow-hidden border">
                    <Image
                      src={viewGrievance.fileUrl}
                      alt="Attached file"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-2">Submitted by:</span>
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarFallback className="text-xs">
                        {viewGrievance.user?.name}
                      </AvatarFallback>
                    </Avatar>
                    <span>{viewGrievance.user?.name || "Anonymous"}</span>
                  </div>
                </div>
                <p className="text-sm">
                  <span className="font-medium">Email:</span> {viewGrievance.user?.email || "N/A"}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Phone:</span> {viewGrievance.user?.phone || "N/A"}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Aadhaar:</span> {viewGrievance.user?.aadhaarNo || "N/A"}
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <h4 className="text-sm font-medium">Admin Response:</h4>
                <Textarea
                  placeholder="Enter your response to this grievance..."
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              {viewGrievance.status === "Open" && (
                <Button
                  variant="outline"
                  className="flex items-center"
                  onClick={() => handleStatusChange("In Progress")}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Mark as In Progress
                </Button>
              )}
              {viewGrievance.status === "In Progress" && (
                <Button
                  className="bg-green-600 hover:bg-green-700 flex items-center"
                  onClick={() => handleStatusChange("Resolved")}
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Mark as Resolved
                </Button>
              )}
              <Button variant="outline" className="flex items-center" onClick={handleCloseDialog}>
                <XCircle className="mr-2 h-4 w-4" />
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <div className="text-sm text-gray-500">
        Showing {filteredGrievances.length} of {grievanceData.length} grievances
      </div>
    </motion.div>
  )
}