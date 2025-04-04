"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { X, User, MapPin, Mail, Shield, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface UserData {
  name: string
  email: string
  phone: string
  aadhaarNumber: string
  dateJoined: string
  lastLogin: string
  verificationStatus: "verified" | "pending" | "unverified"
  address: {
    place: string
    district: string
    state: string
    country: string
    pincode: string
  }
}

interface UserProfilePopupProps {
  isOpen: boolean
  onClose: () => void
  userData: UserData
}

const UserProfilePopup = ({ isOpen, onClose, userData }: UserProfilePopupProps) => {
  // Close on escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleEscKey)
    }

    return () => {
      window.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen, onClose])

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden z-10"
      >
        {/* Header with close button */}
        <div className="relative bg-blue-600 text-white p-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-4 top-4 text-white hover:bg-blue-700 hover:text-white"
          >
            <X className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Avatar className="h-20 w-20 border-4 border-white">
                <AvatarImage src="/placeholder.svg?height=80&width=80" alt={userData.name} />
                <AvatarFallback className="text-2xl bg-blue-700">{getInitials(userData.name)}</AvatarFallback>
              </Avatar>
            </motion.div>

            <div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-bold"
              >
                {userData.name}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 mt-1"
              >
                <Badge
                  variant="outline"
                  className={`
                    border-white text-white
                    ${
                      userData.verificationStatus === "verified"
                        ? "bg-green-500/20"
                        : userData.verificationStatus === "pending"
                          ? "bg-yellow-500/20"
                          : "bg-red-500/20"
                    }
                  `}
                >
                  {userData.verificationStatus === "verified"
                    ? "Verified Account"
                    : userData.verificationStatus === "pending"
                      ? "Verification Pending"
                      : "Unverified"}
                </Badge>
                <span className="text-sm text-blue-100">ID: LD{Math.floor(Math.random() * 1000000)}</span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content */}
        <Tabs defaultValue="profile" className="w-full">
          <div className="px-6 pt-4">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="profile">Profile Details</TabsTrigger>
              <TabsTrigger value="settings">Account Settings</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="profile" className="p-6 pt-4">
            <div className="space-y-6">
              {/* Personal Information Section */}
              <div>
                <h3 className="text-lg font-semibold text-blue-700 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-1"
                  >
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{userData.name}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="space-y-1"
                  >
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium flex items-center">
                      {userData.email}
                      {userData.verificationStatus === "verified" && (
                        <Badge variant="outline" className="ml-2 bg-green-50 text-green-600 border-green-200 text-xs">
                          Verified
                        </Badge>
                      )}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-1"
                  >
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium flex items-center">
                      {userData.phone}
                      {userData.verificationStatus === "verified" && (
                        <Badge variant="outline" className="ml-2 bg-green-50 text-green-600 border-green-200 text-xs">
                          Verified
                        </Badge>
                      )}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="space-y-1"
                  >
                    <p className="text-sm text-gray-500">Aadhaar Number</p>
                    <p className="font-medium">{userData.aadhaarNumber}</p>
                  </motion.div>
                </div>
              </div>

              <Separator />

              {/* Address Information Section */}
              <div>
                <h3 className="text-lg font-semibold text-blue-700 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Address Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-1"
                  >
                    <p className="text-sm text-gray-500">Place/Locality</p>
                    <p className="font-medium">{userData.address.place}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="space-y-1"
                  >
                    <p className="text-sm text-gray-500">District</p>
                    <p className="font-medium">{userData.address.district}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-1"
                  >
                    <p className="text-sm text-gray-500">State</p>
                    <p className="font-medium">{userData.address.state}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="space-y-1"
                  >
                    <p className="text-sm text-gray-500">Pincode</p>
                    <p className="font-medium">{userData.address.pincode}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-1 md:col-span-2"
                  >
                    <p className="text-sm text-gray-500">Country</p>
                    <p className="font-medium">{userData.address.country}</p>
                  </motion.div>
                </div>
              </div>

              <Separator />

              {/* Account Information Section */}
              <div>
                <h3 className="text-lg font-semibold text-blue-700 mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Account Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    className="space-y-1"
                  >
                    <p className="text-sm text-gray-500">Date Joined</p>
                    <p className="font-medium">{formatDate(userData.dateJoined)}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-1"
                  >
                    <p className="text-sm text-gray-500">Last Login</p>
                    <p className="font-medium">{formatDate(userData.lastLogin)}</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="p-6 pt-4">
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-medium text-blue-700 mb-2">Account Settings</h3>
                <p className="text-sm text-blue-600">
                  This section will allow you to update your profile information, change password, and manage
                  notification preferences.
                </p>
              </div>

              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start" disabled>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile Information
                </Button>

                <Button variant="outline" className="w-full justify-start" disabled>
                  <Shield className="h-4 w-4 mr-2" />
                  Change Password
                </Button>

                <Button variant="outline" className="w-full justify-start" disabled>
                  <Mail className="h-4 w-4 mr-2" />
                  Notification Preferences
                </Button>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-700">
                  Account settings functionality will be implemented in the backend. This is a placeholder UI.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        {/* <div className="p-6 bg-gray-50 border-t flex justify-end">
          <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700">
            Close
          </Button>
        </div> */}
      </motion.div>
    </div>
  )
}

export default UserProfilePopup