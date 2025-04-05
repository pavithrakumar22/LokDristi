"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Lightbulb,
  LinkIcon,
  Plus,
  Trash2,
  Send,
  CheckCircle2,
  AlertCircle,
  User,
  Eye,
  EyeOff,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function SuggestionBox() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    links: [""],
    uid: "",
    anonymous: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [characterCount, setCharacterCount] = useState(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target

    if (name === "description") {
      setCharacterCount(value.length)
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      anonymous: checked,
    }))
  }

  const handleCancel = () => {
    setFormData({
      title: "",
      description: "",
      links: [""],
      uid: "",
      anonymous: false,
    })
    setCharacterCount(0)
    setShowSuccess(false)
    setShowError(false)
  }


  const handleLinkChange = (index: number, value: string) => {
    const newLinks = [...formData.links]
    newLinks[index] = value
    setFormData((prev) => ({
      ...prev,
      links: newLinks,
    }))
  }

  const addLink = () => {
    setFormData((prev) => ({
      ...prev,
      links: [...prev.links, ""],
    }))
  }

  const removeLink = (index: number) => {
    const newLinks = [...formData.links]
    newLinks.splice(index, 1)
    setFormData((prev) => ({
      ...prev,
      links: newLinks.length ? newLinks : [""],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, this would send data to your API
      // For demo purposes, we'll simulate a successful response after a delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate API call
      const response = await fetch("http://localhost:5001/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await response.json()

      setShowSuccess(true)

      // Reset form after successful submission
      setFormData({
        title: "",
        description: "",
        links: [""],
        uid: "",
        anonymous: false,
      })
      setCharacterCount(0)
    } catch (error) {
      setErrorMessage("Failed to submit suggestion. Please try again later.")
      setShowError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="border-blue-200 shadow-lg">
          <CardHeader className="bg-blue-700 text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-6 w-6" />
              <CardTitle className="text-xl">Share Your Suggestion</CardTitle>
            </div>
            <CardDescription className="text-blue-100">
              Your ideas can help improve government services and community initiatives
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Label htmlFor="title" className="text-blue-700 font-medium">
                  Suggestion Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter a clear, concise title for your suggestion"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1.5"
                  required
                />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <div className="flex justify-between items-center">
                  <Label htmlFor="description" className="text-blue-700 font-medium">
                    Description
                  </Label>
                  <span className={`text-xs ${characterCount > 500 ? "text-red-500" : "text-gray-500"}`}>
                    {characterCount}/1000 characters
                  </span>
                </div>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your suggestion in detail. What problem does it solve? How can it be implemented?"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1.5 min-h-[150px]"
                  maxLength={1000}
                  required
                />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <div className="flex justify-between items-center">
                  <Label htmlFor="uid" className="text-blue-700 font-medium">
                    Aadhaar UID
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Required for verification. Will not be publicly visible.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="uid"
                  name="uid"
                  placeholder="Enter your 12-digit Aadhaar number"
                  value={formData.uid}
                  onChange={handleChange}
                  className="mt-1.5"
                  required
                  pattern="[0-9]{12}"
                  title="Please enter a valid 12-digit Aadhaar number"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Your Aadhaar number is used for verification only and will not be stored.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Label className="text-blue-700 font-medium">Supporting Links (Optional)</Label>
                <div className="space-y-3 mt-1.5">
                  <AnimatePresence>
                    {formData.links.map((link, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2"
                      >
                        <LinkIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <Input
                          placeholder={`Link ${index + 1} (e.g., https://example.com)`}
                          value={link}
                          onChange={(e) => handleLinkChange(index, e.target.value)}
                          className="flex-grow"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeLink(index)}
                          className="flex-shrink-0 h-8 w-8 text-gray-500 hover:text-red-500"
                          disabled={formData.links.length === 1 && index === 0}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <Button type="button" variant="outline" size="sm" onClick={addLink} className="mt-2 text-blue-600">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Another Link
                  </Button>
                </div>
              </motion.div>

              <Separator className="my-6" />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <Switch id="anonymous" checked={formData.anonymous} onCheckedChange={handleSwitchChange} />
                  <div className="grid gap-1.5">
                    <Label htmlFor="anonymous" className="text-base font-medium">
                      Submit Anonymously
                    </Label>
                    <p className="text-sm text-gray-500">
                      {formData.anonymous ? (
                        <span className="flex items-center">
                          <EyeOff className="h-3 w-3 mr-1" />
                          Your name will not be displayed publicly
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          Your name will be displayed with your suggestion
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  <User className="h-3 w-3 mr-1" />
                  {formData.anonymous ? "Anonymous" : "Public"}
                </Badge>
              </motion.div>
            </form>
          </CardContent>

          <CardFooter className="flex justify-between border-t pt-6">
            <Button onClick={handleCancel} variant="outline" type="button">
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Suggestion
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Success Dialog */}
      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center text-green-600">
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Suggestion Submitted Successfully
            </AlertDialogTitle>
            <AlertDialogDescription>
              Thank you for your valuable suggestion! Your input helps improve government services and community
              initiatives.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-blue-600 hover:bg-blue-700">Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Error Dialog */}
      <AlertDialog open={showError} onOpenChange={setShowError}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center text-red-600">
              <AlertCircle className="mr-2 h-5 w-5" />
              Submission Error
            </AlertDialogTitle>
            <AlertDialogDescription>{errorMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-blue-600 hover:bg-blue-700">Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

