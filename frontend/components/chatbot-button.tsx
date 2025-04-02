"use client"

import { useState } from "react"
import { BotIcon as Robot, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FloatingButton } from "@/components/ui/floating-button"

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <FloatingButton icon={<Robot className="h-6 w-6" />}>
      <Card className="w-80 shadow-lg border-blue-200">
        <CardHeader className="bg-blue-600 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center">
              <Robot className="mr-2 h-5 w-5" />
              AI Legal Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-blue-700 h-8 w-8 p-0"
            >
              <X size={18} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-gray-700 mb-4">
            Hello! I'm your AI legal assistant. I can help explain your legal rights in simple language.
          </p>
          <div className="space-y-2">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800">How can I file an RTI application?</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-sm">
                You can file an RTI application by submitting a request to the Public Information Officer of the
                relevant government department. I can guide you through the process step by step.
              </p>
            </div>
          </div>
          <div className="mt-4 relative">
            <input
              type="text"
              placeholder="Ask me about your legal rights..."
              className="w-full p-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button size="sm" className="absolute right-1 top-1 h-8 w-8 p-0 bg-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-send"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </Button>
          </div>
        </CardContent>
      </Card>
    </FloatingButton>
  )
}

export default ChatbotButton

