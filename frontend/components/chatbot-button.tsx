"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BotIcon as Robot, X, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import ReactMarkdown from 'react-markdown'

type Message = {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your AI legal assistant. I can help explain your legal rights in simple language.",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await fetch(`${BASE_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: userMessage.content }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.reply,
        isUser: false,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error sending message:", error)

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble connecting right now. Please try again later.",
        isUser: false,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Handle clicks outside the chat component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Custom renderer for markdown components
  const MarkdownComponents = {
    // Override p tag to match the text styling
    p: (props: any) => <p className="text-sm" {...props} />,
    // Add appropriate styling for bold text
    strong: (props: any) => <strong className="font-bold" {...props} />,
    // Add styling for code blocks
    code: (props: any) => <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono" {...props} />,
    // Add styling for links
    a: (props: any) => <a className="text-blue-600 hover:underline" {...props} target="_blank" rel="noopener noreferrer" />,
    // Add styling for lists
    ul: (props: any) => <ul className="list-disc pl-5 text-sm space-y-1" {...props} />,
    ol: (props: any) => <ol className="list-decimal pl-5 text-sm space-y-1" {...props} />,
    // Add styling for headings
    h1: (props: any) => <h1 className="text-lg font-bold mt-2 mb-1" {...props} />,
    h2: (props: any) => <h2 className="text-base font-bold mt-2 mb-1" {...props} />,
    h3: (props: any) => <h3 className="text-sm font-bold mt-1 mb-1" {...props} />
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 p-0 shadow-lg"
        >
          <Robot className="h-6 w-6 text-white" />
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50"
          >
            <Card ref={cardRef} className="w-80 md:w-96 shadow-lg border-blue-200">
              <CardHeader className="bg-blue-600 text-white p-4">
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
              <CardContent className="p-0">
                <div className="h-80 overflow-y-auto p-4 space-y-3" id="chat-messages">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`${
                        message.isUser ? "bg-blue-50 ml-auto" : "bg-gray-100"
                      } p-3 rounded-lg max-w-[85%] break-words`}
                    >
                      <div className={`${message.isUser ? "text-blue-800" : "text-gray-800"}`}>
                        <ReactMarkdown components={MarkdownComponents}>
                          {message.content}
                        </ReactMarkdown>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="bg-gray-100 p-3 rounded-lg max-w-[85%]">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                        <p className="text-sm text-gray-800">Thinking...</p>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-3 border-t border-gray-200">
                  <div className="relative flex items-center">
                    <Textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask me about your legal rights..."
                      className="min-h-10 resize-none pr-10 py-2"
                      maxLength={500}
                    />
                    <Button
                      size="sm"
                      onClick={handleSendMessage}
                      disabled={isLoading || !inputValue.trim()}
                      className="absolute right-2 h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700"
                    >
                      <Send size={16} />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-right">{inputValue.length}/500</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatbotButton