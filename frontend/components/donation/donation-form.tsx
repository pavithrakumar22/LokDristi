"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CreditCard, CheckCircle2, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import axios from 'axios';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

interface UserData {
  name: string
  aadhaarNumber: string
  phone: string
  email: string
  address: {
    place: string
    district: string
    state: string
    country: string
    pincode: string
  }
}

interface DonationFormProps {
  userData: UserData
  openTerms: () => void
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const DonationForm = ({ userData, openTerms }: DonationFormProps) => {
  const [amount, setAmount] = useState(1000)
  const [category, setCategory] = useState("")
  const [phone, setPhone] = useState(userData.phone)
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [otp, setOtp] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [payementStatus, setPaymentStatus] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
  }, []);

  const currency = "INR";
  const initiatePayment = async () => {
    try {
      if (!window.Razorpay) {
        console.error("Razorpay SDK not loaded");
        return;
      }

      const response = await fetch("http://localhost:5000/order", {
        method: "POST",
        body: JSON.stringify({
          amount: String(amount * 100),
          currency: "INR"
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      

      const order = await response.json();
      const options = {
        key: "rzp_test_EcrX4XU7WDLamn",
        amount: order.amount,
        currency: "INR",
        name: "LokDhristi",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) {
          const body = { ...response };

          const validateResponse = await fetch("http://localhost:5001/order/validate", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json"
            }
          });
          const jsonResponse = await validateResponse.json();
          console.log(jsonResponse);
          if(jsonResponse.msg === "success") {
            try {
              setPaymentStatus(true);
              console.log(response);
            } catch (error) {
              console.error(error);
            }
          }
        },
        prefill: {
          name: "Sudharshan",
          email: "example@gmail.com",
          contact: "9392267649"
        },
        notes: {
          address: "Razorpay Corporate Office"
        },
        theme: {
          color: "#3399cc"
        }
      };

       
      const Razorpay = window.Razorpay as any;

      const rzp1 = new Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment initiation failed", error);
    }

  };


  const handleSendOtp = () => {
    // In a real app, this would send an OTP to the phone number
    setOtpSent(true)
  }

  const handleVerifyOtp = () => {
    // In a real app, this would verify the OTP
    if (otp === "123456") {
      setOtpVerified(true)
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (value >= 1000 && value <= 100000) {
      setAmount(value)
    }
  }

  const handleDonate = () => {
    if (!agreedToTerms || !otpVerified || !category || amount < 1000 || amount > 100000) {
      return
    }
    setShowConfirmation(true)
  }

  const handleConfirmDonation = () => {
    // In a real app, this would process the payment
    setShowConfirmation(false)
    initiatePayment()
    if(payementStatus) {
      setShowSuccess(true);
    }
  }

  const handleDownloadReceipt = () => {
    // In a real app, this would download a receipt
    setShowReceipt(false)
    // Mock download functionality
    const link = document.createElement("a")
    link.href = "#"
    link.download = "donation_receipt.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const donationCategories = [
    { value: "pm-relief", label: "PM Relief Fund" },
    { value: "disaster-relief", label: "Disaster Relief" },
    { value: "education", label: "Education" },
    { value: "healthcare", label: "Healthcare" },
    { value: "rural-development", label: "Rural Development" },
    { value: "clean-india", label: "Clean India Mission" },
    { value: "digital-india", label: "Digital India" },
    { value: "skill-india", label: "Skill India" },
  ]

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="shadow-lg border-blue-200">
          <CardHeader className="bg-blue-600 text-white">
            <CardTitle className="flex items-center text-xl">
              <CreditCard className="mr-2 h-5 w-5" />
              Make a Donation
            </CardTitle>
            <CardDescription className="text-blue-100">Your contribution makes a difference</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form className="space-y-4">
              {/* Personal Information */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={userData.name} disabled className="bg-gray-50" />
                <p className="text-xs text-gray-500">Auto-filled from your profile</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="aadhaar" className="flex items-center">
                  Aadhaar Number
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-1 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Required for tax benefits</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Input id="aadhaar" value={userData.aadhaarNumber} disabled className="bg-gray-50" />
                <p className="text-xs text-gray-500">Auto-filled from your profile</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex space-x-2">
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={otpVerified}
                    className={otpVerified ? "bg-gray-50" : ""}
                  />
                  {!otpSent && !otpVerified && (
                    <Button type="button" onClick={handleSendOtp} className="whitespace-nowrap">
                      Send OTP
                    </Button>
                  )}
                  {otpVerified && <CheckCircle2 className="h-5 w-5 text-green-500 mt-2" />}
                </div>
              </div>

              {otpSent && !otpVerified && (
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="123456"
                      maxLength={6}
                    />
                    <Button type="button" onClick={handleVerifyOtp} className="whitespace-nowrap">
                      Verify
                    </Button>
                  </div>
                  <p className="text-xs text-blue-600">OTP sent to {phone}. For demo, use 123456</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="category">Donation Category</Label>
                <Select onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {donationCategories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Address Information */}
              <div className="space-y-4 border rounded-lg p-4 bg-gray-50">
                <h3 className="font-medium">Address Information</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="place">Place/Locality</Label>
                    <Input id="place" defaultValue={userData.address.place} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="district">District</Label>
                    <Input id="district" defaultValue={userData.address.district} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" defaultValue={userData.address.state} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input id="pincode" defaultValue={userData.address.pincode} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" defaultValue={userData.address.country} />
                </div>
              </div>

              {/* Donation Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount" className="flex items-center justify-between">
                  <span>Donation Amount (₹)</span>
                  <span className="text-xs text-gray-500">Min: ₹1,000 | Max: ₹100,000</span>
                </Label>
                <Input id="amount" type="number" value={amount} onChange={handleAmountChange} />

                <div className="flex justify-between mt-2">
                  {[1000, 5000, 10000, 25000].map((amt) => (
                    <Button
                      key={amt}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setAmount(amt)}
                      className={amount === amt ? "bg-blue-100 border-blue-300" : ""}
                    >
                      ₹{amt.toLocaleString()}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-2 pt-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <button type="button" className="text-blue-600 hover:underline" onClick={openTerms}>
                      terms and conditions
                    </button>
                  </label>
                  <p className="text-xs text-gray-500">Your donation is eligible for tax benefits under Section 80G</p>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="outline">Cancel</Button>
            <Button
              onClick={handleDonate}
              disabled={!agreedToTerms || !otpVerified || !category || amount < 1000}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Donate ₹{amount.toLocaleString()}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Donation</DialogTitle>
            <DialogDescription>Please review your donation details before proceeding.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex justify-between">
              <span className="font-medium">Amount:</span>
              <span className="font-bold text-blue-600">₹{amount.toLocaleString()}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Category:</span>
              <span>{donationCategories.find((c) => c.value === category)?.label || category}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Name:</span>
              <span>{userData.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Phone:</span>
              <span>{phone}</span>
            </div>

            <Separator />

            <div className="rounded-lg bg-blue-50 p-3 text-sm">
              <p className="flex items-center text-blue-800">
                <Info className="h-4 w-4 mr-2" />
                Your donation is eligible for tax benefits under Section 80G
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmDonation} className="bg-blue-600 hover:bg-blue-700">
              Confirm Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-green-600">
              <CheckCircle2 className="h-6 w-6 mr-2" />
              Donation Successful!
            </DialogTitle>
            <DialogDescription>Thank you for your generous contribution.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="rounded-lg bg-green-50 p-4 text-center">
              <p className="text-2xl font-bold text-green-600 mb-2">₹{amount.toLocaleString()}</p>
              <p className="text-green-800">Transaction ID: TXN{Math.floor(Math.random() * 1000000)}</p>
              <p className="text-sm text-green-700 mt-2">
                {new Date().toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <p className="text-center text-sm text-gray-600">
              A receipt has been sent to your email address. You can also download it below.
            </p>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowSuccess(false)
                setShowReceipt(true)
              }}
              className="w-full sm:w-auto"
            >
              View Receipt
            </Button>
            <Button onClick={() => setShowSuccess(false)} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Receipt Dialog */}
      <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Donation Receipt</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-2">
                    LD
                  </div>
                  <div>
                    <h3 className="font-bold">LokDhristi</h3>
                    <p className="text-xs text-gray-500">Government Donation Portal</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Receipt #</p>
                  <p className="font-medium">RCP{Math.floor(Math.random() * 1000000)}</p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Donor:</span>
                  <span className="font-medium">{userData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span>{new Date().toLocaleDateString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span>{new Date().toLocaleTimeString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span>{donationCategories.find((c) => c.value === category)?.label || category}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total Amount:</span>
                <span className="text-blue-600">₹{amount.toLocaleString()}</span>
              </div>

              <div className="mt-4 text-xs text-gray-500">
                <p>This donation is eligible for tax benefits under Section 80G of the Income Tax Act.</p>
                <p>PAN: AAATL1234D | 80G Reg No: DIT(E)/80G/2023-24/L-123456</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReceipt(false)}>
              Close
            </Button>
            <Button onClick={handleDownloadReceipt} className="bg-blue-600 hover:bg-blue-700">
              Download PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DonationForm