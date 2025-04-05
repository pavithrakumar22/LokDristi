"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Download, FileText, ChevronDown, ChevronUp, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


interface Transaction {
  id: string
  date: string
  amount: number
  category: string
  status: string
}

interface TransactionHistoryProps {
  aadharNumber: string
}

const TransactionHistory = ({ aadharNumber }: TransactionHistoryProps) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<keyof Transaction>("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [donations, setDonations] = useState<Donation[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<Donation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSort = (field: keyof Transaction) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const aadhar = aadharNumber;
  interface Donation {
    name: String,
    aadhaarNumber: String,
    phone: String,
    email: String,
    id: string;
    amount: number;
    category: string;
    date: string;
    paymentId: string;
    orderId: string;
    createdAt: string;
  }
  const getDonationsByAadhaar = async (aadhar: string): Promise<Donation[]> => {
      try {
        const res = await fetch(`http://localhost:5001/donations/${aadhar}`);
        const data = await res.json();
        setDonations(data);
        console.log('Donations:', data);
        return data;
      } catch (err) {
        console.error('Error fetching:', err);
        throw err;
      }
    };
    useEffect(() => {
      getDonationsByAadhaar(aadhar);
    }, []);

  const filteredTransactions = donations.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleDownloadStatement = async() => {
    const doc = new jsPDF();
    const name = donations[0]?.name;
  doc.setFontSize(16);
  doc.text("Donations Report", 14, 20);
  doc.text(`Name: ${name}`, 14, 30);
  doc.text(`Aadhaar Number: ${aadhar}`, 14, 35);
  const tableColumn = ["OrderId", "Date", "Amount", "Category"];

  const tableRows = filteredTransactions.map((donation) => [
    donation.orderId,
    new Date(donation.createdAt).toLocaleDateString(),
    donation.amount,
    donation.category,
  ]);

  autoTable(doc, {
    startY: 45,
    head: [tableColumn],
    body: tableRows,
  });

  await doc.save(`${name}_donations_report.pdf`);
  alert("Transaction Statement downloaded successfully!");
  }


  const downloadDonationsAsCSV = (donations: any[]) => {
    if (!donations.length) return;
    const name = donations[0]?.name;
  
    const selectedFields = [
      { key: "orderId", label: "OrderId" },
      { key: "createdAt", label: "Created At" },
      { key: "amount", label: "Amount" },
      { key: "category", label: "Category" },
    ];
  
    const header = selectedFields.map((field) => field.label);
  
    const getValue = (obj: any, path: string) => {
      return path.split(".").reduce((acc, part) => acc?.[part], obj) ?? "";
    };
  
    const rows = donations.map((donation) =>
      selectedFields.map(({ key }) => {
        const value = getValue(donation, key);
        return typeof value === "string" ? `"${value.replace(/"/g, '""')}"` : value;
      })
    );
  
    const csvContent = [header, ...rows].map((row) => row.join(",")).join("\n");
  
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${name}_donations.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  const handleViewReceipt = (id: string) => {
    const transaction = donations.find((d) => d.orderId === id);
    setSelectedTransaction(transaction || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }


  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">Transaction History</CardTitle>
              <CardDescription>View and download your donation history</CardDescription>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleDownloadStatement}>
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Download</span> Statement
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleDownloadStatement}>Export as PDF</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => downloadDonationsAsCSV(filteredTransactions)}>Export as CSV</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div> */}
        </CardHeader>
        <CardContent>
          <div className="rounded-md border h-96 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("id")}>
                    <div className="flex items-center">
                      Transaction ID
                      {sortField === "id" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
                    <div className="flex items-center">
                      Date
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer text-right" onClick={() => handleSort("amount")}>
                    <div className="flex items-center justify-end">
                      Amount
                      {sortField === "amount" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("category")}>
                    <div className="flex items-center">
                      Category
                      {sortField === "category" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                    <div className="flex items-center">
                      Status
                      {sortField === "status" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No transactions found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.orderId}>
                      <TableCell className="font-medium">{transaction.orderId.slice(6,)}</TableCell>
                      <TableCell>{transaction.createdAt.slice(0, 10)}</TableCell>
                      <TableCell className="text-right font-semibold">{formatCurrency(transaction.amount)}</TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            transaction.orderId !== ""
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-yellow-50 text-yellow-700 border-yellow-200"
                          }
                        >
                          {transaction.orderId !== "" ? "Completed" : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleViewReceipt(transaction.orderId)}>
                          <FileText className="h-4 w-4 mr-1" />
                          Receipt
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="text-xs text-gray-500 mt-4">
            Showing {filteredTransactions.length} of {donations.length} transactions
          </div>
        </CardContent>
      </Card>


      

      <motion.div
        initial={{ opacity: 0, scale: 20 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        {isModalOpen && selectedTransaction && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
          <h2 className="text-blue-700 text-xl font-semibold mb-4">Transaction Details</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Name:</strong> {selectedTransaction.name}</p>
            <p><strong>Aadhaar:</strong> {selectedTransaction.aadhaarNumber}</p>
            <p><strong>Phone:</strong> {selectedTransaction.phone}</p>
            <p><strong>Email:</strong> {selectedTransaction.email}</p>
            <p><strong>Order ID:</strong> {selectedTransaction.orderId}</p>
            <p><strong>Payment ID:</strong> {selectedTransaction.paymentId}</p>
            <p><strong>Amount:</strong> ₹{selectedTransaction.amount}</p>
            <p><strong>Category:</strong> {selectedTransaction.category}</p>
            <p><strong>Date:</strong> {formatDate(selectedTransaction.createdAt)}</p>
          </div>
          <Button onClick={closeModal} className="mt-4 w-full">Close</Button>
        </div>
      </div>
    )}
      </motion.div>

    </motion.div>


  )
}

export default TransactionHistory

