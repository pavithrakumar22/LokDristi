"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Search,
  Filter,
  Download,
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
  Eye,
  FileText,
  MoreHorizontal,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock donation da

export default function DonationsSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [donationsData, setDonationsData] = useState<{ 
    orderId: string; 
    name: string; 
    amount: number; 
    category: string; 
    createdAt: string; 
    status: string; 
    paymentMethod: string; 
    email: string; 
    phone: string; 
  }[]>([])

  useEffect(() => {
    fetch("http://localhost:5001/donations")
      .then((res) => res.json())
      .then((data) => setDonationsData(data))
      .catch((err) => console.error("Error fetching donations:", err))
  }, [])

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  // Filter and sort donations
  const filteredDonations = donationsData
    .filter((donation) => {
      const matchesSearch =
        donation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || donation.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortField === "amount") {
        return sortDirection === "asc" ? a.amount - b.amount : b.amount - a.amount
      } else if (sortField === "date") {
        return sortDirection === "asc"
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      } else {
        const aValue = a[sortField as keyof typeof a]
        const bValue = b[sortField as keyof typeof b]
        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
        }
        return 0
      }
    })

  // Calculate total donations
  const totalAmount = filteredDonations.reduce((sum, donation) => sum + donation.amount, 0)

  // Get unique categories
  const categories = Array.from(new Set(donationsData.map((donation) => donation.category)))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Donations Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalAmount.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">From {filteredDonations.length} donors</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Average Donation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹
              {(totalAmount / (filteredDonations.length || 1)).toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </div>
            <p className="text-xs text-gray-500 mt-1">Per donation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Top Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Education</div>
            <p className="text-xs text-gray-500 mt-1">35% of total donations</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs and Filters */}
      <Tabs defaultValue="all">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="all">All Donations</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="highest">Highest</TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search donations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full md:w-auto"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="m-0">
          {/* Donations Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">
                    <button className="flex items-center" onClick={() => handleSort("id")}>
                      ID
                      {sortField === "id" ? (
                        sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        )
                      ) : (
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      )}
                    </button>
                  </TableHead>
                  <TableHead>
                    <button className="flex items-center" onClick={() => handleSort("donor")}>
                      Donor
                      {sortField === "donor" ? (
                        sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        )
                      ) : (
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      )}
                    </button>
                  </TableHead>
                  <TableHead>
                    <button className="flex items-center" onClick={() => handleSort("amount")}>
                      Amount
                      {sortField === "amount" ? (
                        sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        )
                      ) : (
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      )}
                    </button>
                  </TableHead>
                  <TableHead>
                    <button className="flex items-center" onClick={() => handleSort("category")}>
                      Category
                      {sortField === "category" ? (
                        sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        )
                      ) : (
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      )}
                    </button>
                  </TableHead>
                  <TableHead>
                    <button className="flex items-center" onClick={() => handleSort("date")}>
                      Date
                      {sortField === "date" ? (
                        sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        )
                      ) : (
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      )}
                    </button>
                  </TableHead>
                  <TableHead>
                    <button className="flex items-center" onClick={() => handleSort("status")}>
                      Status
                      {sortField === "status" ? (
                        sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        )
                      ) : (
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      )}
                    </button>
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDonations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No donations found matching your search criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDonations.map((donation) => (
                    <TableRow key={donation.orderId}>
                      <TableCell className="font-medium">{donation.orderId}</TableCell>
                      <TableCell>{donation.name}</TableCell>
                      <TableCell>₹{donation.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {donation.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(donation.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700 border-green-200">Success</Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="flex items-center">
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View Details</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center">
                              <FileText className="mr-2 h-4 w-4" />
                              <span>Download Receipt</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="recent" className="m-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Donor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donationsData
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .slice(0, 5)
                  .map((donation) => (
                    <TableRow key={donation.orderId}>
                      <TableCell className="font-medium">{donation.orderId}</TableCell>
                      <TableCell>{donation.name}</TableCell>
                      <TableCell>₹{donation.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {donation.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(donation.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700 border-green-200">Success</Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="flex items-center">
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View Details</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center">
                              <FileText className="mr-2 h-4 w-4" />
                              <span>Download Receipt</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="highest" className="m-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Donor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donationsData
                  .sort((a, b) => b.amount - a.amount)
                  .slice(0, 5)
                  .map((donation) => (
                    <TableRow key={donation.orderId}>
                      <TableCell className="font-medium">{donation.orderId}</TableCell>
                      <TableCell>{donation.name}</TableCell>
                      <TableCell>₹{donation.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {donation.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(donation.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700 border-green-200">Success</Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="flex items-center">
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View Details</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center">
                              <FileText className="mr-2 h-4 w-4" />
                              <span>Download Receipt</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      <div className="text-sm text-gray-500">
        Showing {filteredDonations.length} of {donationsData.length} donations
      </div>
    </motion.div>
  )
}
