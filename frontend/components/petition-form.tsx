"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
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
import { X, Upload, Share2 } from "lucide-react"

const AVAILABLE_TAGS = [
  "Infrastructure",
  "Education",
  "Healthcare",
  "Environment",
  "Transportation",
  "Safety",
  "Water",
  "Electricity",
  "Sanitation",
  "Civic Issues",
  "Urban Planning",
  "Rural Development",
  "Agriculture",
  "Employment",
  "Women's Safety",
  "Child Welfare",
  "Senior Citizens",
  "Disability Rights",
  "Animal Welfare",
  "Others",
]

export default function PetitionForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [documents, setDocuments] = useState<File[]>([])
  const [showSuccess, setShowSuccess] = useState(false)

  const handleAddTag = (tag: string) => {
    if (!selectedTags.includes(tag) && selectedTags.length < 5) {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove))
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would normally submit the form data to your backend
    console.log({ title, description, selectedTags, documents })
    setShowSuccess(true)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Petition Title</Label>
        <Input
          id="title"
          placeholder="Enter a clear, specific title for your petition"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe the issue in detail. What change do you want to see?"
          className="min-h-[150px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Tags (Select up to 5)</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              {tag}
              <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveTag(tag)} />
            </Badge>
          ))}
        </div>
        <Select onValueChange={handleAddTag} disabled={selectedTags.length >= 5}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select tags" />
          </SelectTrigger>
          <SelectContent>
            {AVAILABLE_TAGS.map((tag) => (
              <SelectItem key={tag} value={tag} disabled={selectedTags.includes(tag)}>
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Supporting Documents</Label>
        <div className="border-2 border-dashed rounded-lg p-4 text-center">
          <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-500 mb-2">Upload PDFs, images, or documents that support your petition</p>
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
          Submit Petition
        </Button>
        <Button type="button" variant="outline" className="flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          Share Draft
        </Button>
      </div>

      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Petition Submitted Successfully!</AlertDialogTitle>
            <AlertDialogDescription>
              Your petition has been created and is now open for signatures. Share it with your community to gather
              support.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>View Petition</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  )
}

