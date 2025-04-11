"use client"

import { useRef, useState, useEffect } from "react"
import Webcam from "react-webcam"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Check, UserCheck, Vote } from "lucide-react"
import axios from "axios"

interface Candidate {
  id: string
  name: string
}

export default function FaceVerification() {
  const [voterId, setVoterId] = useState("")
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState("")
  const [capturing, setCapturing] = useState(false)
  const [step, setStep] = useState("verification") // verification, candidates, success
  const [selectedCandidate, setSelectedCandidate] = useState<string>("") // Use candidate id or name
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [voteSubmitted, setVoteSubmitted] = useState(false)
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loadingCandidates, setLoadingCandidates] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [electionActive, setElectionActive] = useState<boolean | null>(null)


  const webcamRef = useRef<Webcam>(null)
  useEffect(() => {
    const getElectionStatus = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/election-status")
        const data = await res.json()
        setElectionActive(data.active) // assuming response is { active: true/false }
      } catch (err) {
        console.error("Failed to fetch election status:", err)
        setElectionActive(false) // fallback to not active
      }
    }
  
    getElectionStatus()
  }, [])
  

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/candidates")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        console.log("Candidates fetched:", data)

        // Extract candidates array and transform strings to Candidate objects
        const candidateList = data.candidates && Array.isArray(data.candidates) ? data.candidates : []
        const processedCandidates = candidateList.map((candidate: string, index: number): Candidate => ({
          id: `candidate-${index}`, // Generate a unique ID
          name: candidate, // Use the string as the name
        }))

        setCandidates(processedCandidates)
      } catch (err) {
        console.error("Failed to fetch candidates:", err)
        setFetchError("Failed to load candidates. Please try again later.")
      } finally {
        setLoadingCandidates(false)
      }
    }

    fetchCandidates()
  }, [])

  const captureAndVerify = async () => {
    if (!voterId.trim()) {
      setError("Please enter your Voter ID")
      return
    }
  
    setCapturing(true)
    setError("")
    const capturedImages: string[] = []
  
    const startTime = Date.now()
    const duration = 10000 // 10 seconds
  
    while (Date.now() - startTime < duration) {
      const imageSrc = webcamRef.current?.getScreenshot()
      if (imageSrc) capturedImages.push(imageSrc)
      await new Promise((res) => setTimeout(res, 1500)) // ~1.5s interval
    }
  
    try {
      const res = await axios.post("http://localhost:5001/api/face/verify-face", {
        voterId,
        capturedImages,
      })
  
      const verified = res.data.verified
      console.log("**********" + verified)
  
      if (verified) {
        const res = await fetch('http://localhost:5001/api/store-vote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ voterId }),
        });
        setVerified(true)
        setStep("candidates")
      } else {
        setError("Face verification failed. Please try again.")
      }
    } catch (err) {
      console.error(err)
      setError("Error verifying face")
    }
  
    setCapturing(false)
  }
  

  const handleVote = () => {
    if (!selectedCandidate) {
      setError("Please select a candidate")
      return
    }
    setShowConfirmDialog(true)
  }

  const confirmVote = async () => {
    try {
      const selected = candidates.find((c) => c.id === selectedCandidate)
      console.log("Submitting vote for:", selected?.name)

      setVoteSubmitted(true)
      setStep("success")
      setShowConfirmDialog(false)
    } catch (err) {
      console.error(err)
      setError("Error submitting vote")
      setShowConfirmDialog(false)
    }
  }

  return (
    <div className="container max-w-4xl mx-auto p-6">
{electionActive === null && (
  <p className="text-center p-10">Checking election status...</p>
)}

{!electionActive && (
  <div className="container max-w-4xl mx-auto p-6 text-center">
    <Card>
      <CardHeader>
        <CardTitle>Election is Inactive</CardTitle>
        <CardDescription>
          There is currently no active election. Please check back later.
        </CardDescription>
      </CardHeader>
    </Card>
  </div>
)}

      {step === "verification" && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Voter Verification</CardTitle>
            <CardDescription>Please enter your Voter ID and verify your identity to proceed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="voterId">Voter ID</Label>
              <Input
                id="voterId"
                type="text"
                placeholder="Enter your Voter ID"
                value={voterId}
                onChange={(e) => setVoterId(e.target.value)}
              />
            </div>

            {voterId && (
              <div className="space-y-2">
                <Label>Face Verification</Label>
                <div className="border rounded-lg overflow-hidden flex justify-center bg-muted p-2">
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={400}
                    height={300}
                    className="rounded"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Look directly at the camera. We'll take 5 photos to verify your identity.
                </p>
              </div>
            )}

            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
          </CardContent>
          <CardFooter>
            <Button onClick={captureAndVerify} disabled={capturing || !voterId.trim()} className="w-full">
              {capturing ? "Verifying..." : "Verify Identity"}
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === "candidates" && (
        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-green-500" />
              <CardTitle>Select Your Candidate</CardTitle>
            </div>
            <CardDescription>Your identity has been verified. Please select a candidate to vote for.</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingCandidates ? (
              <p>Loading candidates...</p>
            ) : fetchError ? (
              <p className="text-sm font-medium text-destructive">{fetchError}</p>
            ) : candidates.length === 0 ? (
              <p>No candidates available.</p>
            ) : (
              <RadioGroup
                value={selectedCandidate}
                onValueChange={(value) => {
                  setSelectedCandidate(value)
                  setError("")
                }}
                className="space-y-4"
              >
                {candidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="flex items-center space-x-4 border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                  >
                    <RadioGroupItem value={candidate.id} id={`radio-${candidate.id}`} />
                    <Label htmlFor={`radio-${candidate.id}`} className="flex-1 text-lg font-medium cursor-pointer">
                      {candidate.name}
                      <p className="text-sm text-muted-foreground">Independent</p>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
            {error && <p className="mt-4 text-sm font-medium text-destructive">{error}</p>}
          </CardContent>
          <CardFooter>
            <Button onClick={handleVote} className="w-full" disabled={!selectedCandidate || loadingCandidates}>
              <Vote className="mr-2 h-4 w-4" />
              Cast Your Vote
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === "success" && (
        <Card className="w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle>Vote Successfully Cast</CardTitle>
            <CardDescription>
              Thank you for participating in the democratic process. Your vote has been recorded securely.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground">
              Your vote is anonymous and has been securely recorded. You may now exit this application.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => {
                setStep("verification")
                setVoterId("")
                setVerified(false)
                setSelectedCandidate("")
                setVoteSubmitted(false)
              }}
            >
              Return to Start
            </Button>
          </CardFooter>
        </Card>
      )}

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Your Vote</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to cast your vote for:
              <div className="mt-2 p-4 bg-muted rounded-lg">
                <p className="font-medium">
                  {candidates.find((c) => c.id === selectedCandidate)?.name || "Unknown Candidate"}
                </p>
                <p className="text-sm text-muted-foreground">Independent</p>
              </div>
              <p className="mt-2">This action cannot be undone. Are you sure you want to proceed?</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmVote}>Confirm Vote</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}