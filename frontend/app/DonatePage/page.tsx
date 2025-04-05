"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import DonationForm from "@/components/donation/donation-form"
import DonationStats from "@/components/donation/donation-stats"
import TransactionHistory from "@/components/donation/transaction-history"
import TermsConditionsPopup from "@/components/donation/terms-conditions-popup"
import DonationCategories from "@/components/donation/donation-categories"
import RecentDonors from "@/components/donation/recent-donors"
import ImpactStories from "@/components/donation/impact-stories"
import { Separator } from "@/components/ui/separator"

export default function DonatePage() {
  const [showTerms, setShowTerms] = useState(true)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  // Mock user data (in a real app, this would come from authentication)
  const userData = {
    name: "Rahul Sharma",
    aadhaarNumber: "1234 5678 9012",
    phone: "9876543210",
    email: "rahul.sharma@example.com",
    address: {
      place: "Mayur Vihar",
      district: "East Delhi",
      state: "Delhi",
      country: "India",
      pincode: "110091",
    }
  }

  const [isPopupOpen, setIsPopupOpen] = useState(false);

const handleClose = () => {
  setIsPopupOpen(false);
};

  const handleAgreeTerms = () => {
    setAgreedToTerms(true)
    handleClose()
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Page Header */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Donate to Government Initiatives</h1>
            <p className="max-w-3xl mx-auto text-lg text-blue-100">
              Your contribution helps build a better future for all citizens. Every donation supports vital government
              programs and initiatives.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Statistics and History */}
          <div className="w-full lg:w-2/3 space-y-12">
            <DonationStats />

            <Separator className="my-8" />

            <DonationCategories />

            <Separator className="my-8" />

            <RecentDonors />

            <Separator className="my-8" />

            <ImpactStories />

            <Separator className="my-8" />

            <TransactionHistory aadharNumber={userData.aadhaarNumber} />
          </div>

          {/* Right Column - Donation Form and Ads */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-24">
              <DonationForm userData={userData} openTerms={() => setShowTerms(true)} />

              {/* Advertisements */}
              <div className="mt-8 space-y-6">
                <div className="rounded-lg overflow-hidden shadow-md border border-gray-200">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="Advertisement"
                    width={400}
                    height={200}
                    className="w-full h-auto"
                  />
                  <div className="p-4 bg-blue-50">
                    <h3 className="font-semibold text-blue-800">Support Clean India Mission</h3>
                    <p className="text-sm text-gray-600">
                      Join the nationwide movement for a cleaner, healthier India.
                    </p>
                  </div>
                </div>

                <div className="rounded-lg overflow-hidden shadow-md border border-gray-200">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="Advertisement"
                    width={400}
                    height={200}
                    className="w-full h-auto"
                  />
                  <div className="p-4 bg-blue-50">
                    <h3 className="font-semibold text-blue-800">Digital India Initiative</h3>
                    <p className="text-sm text-gray-600">
                      Empowering citizens through technology and digital governance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Terms and Conditions Popup */}
      <AnimatePresence>
        {showTerms && (
          <TermsConditionsPopup
            isOpen={showTerms}
            onClose={() => !agreedToTerms && setShowTerms(false) && handleClose}
            onAgree={handleAgreeTerms}
            agreedToTerms={agreedToTerms}
          />
        )}
      </AnimatePresence>
    </main>
  )
}

