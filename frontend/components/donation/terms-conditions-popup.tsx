"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { X } from "lucide-react"

interface TermsConditionsPopupProps {
  isOpen: boolean
  onClose: () => void
  onAgree: () => void
  agreedToTerms: boolean
}




const TermsConditionsPopup = ({ isOpen, onClose, onAgree, agreedToTerms }: TermsConditionsPopupProps) => {
  if (!isOpen) return null

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClose = () => {
    setIsPopupOpen(false);
  };

  const [isChecked, setIsChecked] = useState(false)

  const handleProceed = () => {
    if (isChecked) {
      onAgree()
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col"
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-600">Donation Terms & Conditions</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1 p-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-4 overflow-y-scroll">
            <h3 className="text-lg font-semibold">1. Introduction</h3>
            <p>
              Welcome to the LokDhristi Donation Portal. These Terms and Conditions govern your use of our donation
              services. By making a donation through our platform, you agree to comply with and be bound by these terms.
            </p>

            <h3 className="text-lg font-semibold">2. Eligibility</h3>
            <p>To make a donation, you must:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Be at least 18 years of age</li>
              <li>Possess a valid Aadhaar number for verification</li>
              <li>Have the legal capacity to make financial transactions</li>
              <li>Be a citizen or legal resident of India</li>
            </ul>

            <h3 className="text-lg font-semibold">3. Donation Process</h3>
            <p>When making a donation through our platform:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>All donations must be made in Indian Rupees (₹)</li>
              <li>Minimum donation amount is ₹1,000</li>
              <li>Maximum donation amount is ₹100,000 per transaction</li>
              <li>Phone verification via OTP is mandatory for all donations</li>
              <li>All personal information provided must be accurate and complete</li>
            </ul>

            <h3 className="text-lg font-semibold">4. Use of Funds</h3>
            <p>All donations received through the LokDhristi platform will be:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Directed to the government initiative or category selected by the donor</li>
              <li>Used in accordance with government policies and regulations</li>
              <li>Subject to transparency measures including public reporting</li>
              <li>Administered with minimal administrative costs</li>
            </ul>

            <h3 className="text-lg font-semibold">5. Tax Benefits</h3>
            <p>
              Donations made through the LokDhristi platform may be eligible for tax benefits under Section 80G of the
              Income Tax Act. A receipt will be provided for all donations, which can be used for tax deduction
              purposes.
            </p>

            <h3 className="text-lg font-semibold">6. Refund Policy</h3>
            <p>Due to the nature of charitable donations:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>All donations are generally non-refundable</li>
              <li>In exceptional circumstances, refund requests may be considered within 7 days of donation</li>
              <li>Refund requests must be submitted in writing with valid justification</li>
              <li>Processing fees may be deducted from any approved refunds</li>
            </ul>

            <h3 className="text-lg font-semibold">7. Privacy and Data Protection</h3>
            <p>Your personal information will be:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Collected and processed in accordance with our Privacy Policy</li>
              <li>Used only for purposes related to processing your donation and providing receipts</li>
              <li>Shared with relevant government departments as necessary</li>
              <li>Protected using industry-standard security measures</li>
            </ul>

            <h3 className="text-lg font-semibold">8. Modifications to Terms</h3>
            <p>
              LokDhristi reserves the right to modify these terms and conditions at any time. Any changes will be
              effective immediately upon posting on the platform. Your continued use of the donation service after any
              such changes constitutes your acceptance of the new terms.
            </p>

            <h3 className="text-lg font-semibold">9. Governing Law</h3>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of India. Any
              disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in Delhi,
              India.
            </p>

            <h3 className="text-lg font-semibold">10. Contact Information</h3>
            <p>If you have any questions about these Terms and Conditions, please contact us at:</p>
            <p className="font-medium mt-2">
              Email: donations@lokdhristi.org
              <br />
              Phone: +91 123 456 7890
              <br />
              Address: 123 Democracy Avenue, New Delhi, India - 110001
            </p>
          </div>
        </ScrollArea>

        <div className="p-6 border-t bg-gray-50">
          <div className="flex items-start space-x-2 mb-4">
            <Checkbox id="agree-terms" checked={isChecked} onCheckedChange={(checked) => setIsChecked(!!checked)} />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="agree-terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I have read and agree to the terms and conditions
              </label>
              <p className="text-xs text-gray-500">
                By checking this box, you acknowledge that you have read, understood, and agree to be bound by these
                terms.
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => {onClose();}}>
              Cancel
            </Button>
            <Button onClick={onClose} disabled={!isChecked} className="bg-blue-600 hover:bg-blue-700">
              Proceed
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default TermsConditionsPopup

