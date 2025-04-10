"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Filter, CheckCircle2, XCircle, Clock, ThumbsUp, User, Calendar, LinkIcon, Eye } from "lucide-react"
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
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Mock suggestions data


export default function SuggestionsSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewSuggestion, setViewSuggestion] = useState<(typeof suggestionData)[0] | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [responseText, setResponseText] = useState("")
  const [suggestionData, setSuggestionData] = useState<{ 
    suggestionId: string; 
    title: string; 
    description: string; 
    category: string; 
    links: string[]; 
    uid: string; 
    anonymous: boolean; 
    status: string; 
    createdAt: string;
  }[]>([])

  useEffect(() => {
      fetch("http://localhost:5001/api/suggestions")
        .then((res) => res.json())
        .then((data) => setSuggestionData(data))
        .catch((err) => console.error("Error fetching donations:", err))
    }, [])

  // Filter suggestions based on search term, status, and category
  const filteredSuggestions = suggestionData.filter((suggestion) => {
    const matchesSearch =
      suggestion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (suggestion.description ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      suggestion.suggestionId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || suggestion.status === selectedStatus
    const matchesCategory = selectedCategory === "all" || suggestion.category === selectedCategory
    return matchesSearch && matchesStatus && matchesCategory
  })

  // Get unique categories
  const categories = Array.from(new Set(suggestionData.map((suggestion) => suggestion.category)))

  const handleViewSuggestion = (suggestion: (typeof suggestionData)[0]) => {
    setViewSuggestion(suggestion)
    setIsViewDialogOpen(true)
  }

  const handleStatusChange = (status: string) => {
    if (!viewSuggestion) return

    // In a real app, this would update the status in the database
    console.log(`Changing status of ${viewSuggestion.suggestionId} from ${viewSuggestion.status} to ${status}`)
    setIsViewDialogOpen(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Suggestions Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{suggestionData.length}</div>
            <p className="text-xs text-gray-500 mt-1">
              From {Array.from(new Set(suggestionData.map((s) => s.uid))).length} citizens
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{suggestionData.filter((s) => s.status === "Pending").length}</div>
            <p className="text-xs text-gray-500 mt-1">Awaiting assessment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{suggestionData.filter((s) => s.status === "Approved").length}</div>
            <p className="text-xs text-gray-500 mt-1">Ready for implementation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Upvotes</CardTitle>
          </CardHeader>
          
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search suggestions..."
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
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Under Review">Under Review</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.filter((category): category is string => !!category).map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Suggestions Tabs */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Suggestions</TabsTrigger>
          <TabsTrigger value="pending">
            Pending ({suggestionData.filter((s) => s.status === "Pending").length})
          </TabsTrigger>
          <TabsTrigger value="review">
            Under Review ({suggestionData.filter((s) => s.status === "Under Review").length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({suggestionData.filter((s) => s.status === "Approved").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSuggestions.length === 0 ? (
              <div className="col-span-full py-12 text-center">
                <p className="text-gray-500 text-lg">No suggestions found matching your search criteria.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedStatus("all")
                    setSelectedCategory("all")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              filteredSuggestions.map((suggestion) => (
                <Card key={suggestion.suggestionId} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg line-clamp-1">{suggestion.title}</CardTitle>
                        <CardDescription className="text-sm">{suggestion.suggestionId}</CardDescription>
                      </div>
                      <Badge
                        className={
                          suggestion.status === "Approved"
                            ? "bg-green-100 text-green-700 border-green-200"
                            : suggestion.status === "Rejected"
                              ? "bg-red-100 text-red-700 border-red-200"
                              : suggestion.status === "Under Review"
                                ? "bg-amber-100 text-amber-700 border-amber-200"
                                : "bg-blue-100 text-blue-700 border-blue-200"
                        }
                      >
                        {suggestion.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 line-clamp-3">{suggestion.description}</p>

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {suggestion.category}
                        </Badge>
                        
                      </div>

                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(suggestion.createdAt ?? "")}</span>
                      </div>

                      <div className="flex items-center text-sm">
                        {suggestion.anonymous ? (
                          <div className="flex items-center text-gray-500">
                            <User className="h-4 w-4 mr-1" />
                            <span>Anonymous</span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Avatar className="h-5 w-5 mr-2">
                              <AvatarFallback className="text-xs">
                                {(suggestion.uid ?? "")
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{suggestion.uid}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button variant="outline" className="w-full" onClick={() => handleViewSuggestion(suggestion)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestionData
              .filter((s) => s.status === "Pending")
              .map((suggestion) => (
                <Card key={suggestion.suggestionId} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg line-clamp-1">{suggestion.title}</CardTitle>
                        <CardDescription className="text-sm">{suggestion.suggestionId}</CardDescription>
                      </div>
                      <Badge className="bg-blue-100 text-blue-700 border-blue-200">{suggestion.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 line-clamp-3">{suggestion.description}</p>

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {suggestion.category}
                        </Badge>
                        
                      </div>

                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(suggestion.createdAt ?? "")}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button variant="outline" className="w-full" onClick={() => handleViewSuggestion(suggestion)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="review" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestionData
              .filter((s) => s.status === "Under Review")
              .map((suggestion) => (
                <Card key={suggestion.suggestionId} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg line-clamp-1">{suggestion.title}</CardTitle>
                        <CardDescription className="text-sm">{suggestion.suggestionId}</CardDescription>
                      </div>
                      <Badge className="bg-amber-100 text-amber-700 border-amber-200">{suggestion.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 line-clamp-3">{suggestion.description}</p>

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {suggestion.category}
                        </Badge>
                        
                      </div>

                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(suggestion.createdAt ?? "")}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button variant="outline" className="w-full" onClick={() => handleViewSuggestion(suggestion)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="approved" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestionData
              .filter((s) => s.status === "Approved")
              .map((suggestion) => (
                <Card key={suggestion.suggestionId} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg line-clamp-1">{suggestion.title}</CardTitle>
                        <CardDescription className="text-sm">{suggestion.suggestionId}</CardDescription>
                      </div>
                      <Badge className="bg-green-100 text-green-700 border-green-200">{suggestion.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 line-clamp-3">{suggestion.description}</p>

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {suggestion.category}
                        </Badge>
                        
                      </div>

                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(suggestion.createdAt ?? "")}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button variant="outline" className="w-full" onClick={() => handleViewSuggestion(suggestion)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* View Suggestion Dialog */}
      {viewSuggestion && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{viewSuggestion.title}</DialogTitle>
              <DialogDescription>
                {viewSuggestion.suggestionId} - Submitted on {formatDate(viewSuggestion.createdAt ?? "")}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="flex flex-wrap gap-2">
                <Badge
                  className={
                    viewSuggestion.status === "Approved"
                      ? "bg-green-100 text-green-700 border-green-200"
                      : viewSuggestion.status === "Rejected"
                        ? "bg-red-100 text-red-700 border-red-200"
                        : viewSuggestion.status === "Under Review"
                          ? "bg-amber-100 text-amber-700 border-amber-200"
                          : "bg-blue-100 text-blue-700 border-blue-200"
                  }
                >
                  {viewSuggestion.status}
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {viewSuggestion.category}
                </Badge>
                
              </div>

              <div className="border rounded-lg p-4 bg-gray-50">
                <p className="text-gray-700">{viewSuggestion.description}</p>
              </div>

              {(viewSuggestion.links ?? []).length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Supporting Links:</h4>
                  <ul className="space-y-1">
                    {(viewSuggestion.links ?? []).map((link: string, index: number) => (
                      <li key={index} className="flex items-center text-sm">
                      <LinkIcon className="h-3 w-3 mr-2 text-blue-600" />
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {link}
                      </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center">
                <span className="text-sm font-medium mr-2">Submitted by:</span>
                {viewSuggestion.anonymous ? (
                  <span className="text-gray-500">Anonymous</span>
                ) : (
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarFallback className="text-xs">
                        {(viewSuggestion.uid ?? "")
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span>{viewSuggestion.uid}</span>
                  </div>
                )}
              </div>

              {viewSuggestion.status !== "Approved" && viewSuggestion.status !== "Rejected" && (
                <div className="space-y-2 pt-4 border-t">
                  <h4 className="text-sm font-medium">Admin Response:</h4>
                  <Textarea
                    placeholder="Enter your response to this suggestion..."
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              )}
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              {viewSuggestion.status === "Pending" && (
                <>
                  <Button
                    variant="outline"
                    className="flex items-center"
                    onClick={() => handleStatusChange("Under Review")}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    Mark as Under Review
                  </Button>
                  <Button
                    className="bg-green-600 hover:bg-green-700 flex items-center"
                    onClick={() => handleStatusChange("Approved")}
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex items-center"
                    onClick={() => handleStatusChange("Rejected")}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                </>
              )}

              {viewSuggestion.status === "Under Review" && (
                <>
                  <Button
                    className="bg-green-600 hover:bg-green-700 flex items-center"
                    onClick={() => handleStatusChange("Approved")}
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex items-center"
                    onClick={() => handleStatusChange("Rejected")}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                </>
              )}

              {(viewSuggestion.status === "Approved" || viewSuggestion.status === "Rejected") && (
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <div className="text-sm text-gray-500">
        Showing {filteredSuggestions.length} of {suggestionData.length} suggestions
      </div>
    </motion.div>
  )
}
