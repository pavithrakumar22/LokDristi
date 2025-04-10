"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  DollarSign,
  FolderKanban,
  Lightbulb,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  User,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface AdminLayoutProps {
  children: React.ReactNode
  activeSection: string
  setActiveSection: (section: string) => void
}

export default function AdminLayout({ children, activeSection, setActiveSection }: AdminLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  const navItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      section: "dashboard",
    },
    {
      name: "Donations",
      icon: <DollarSign className="h-5 w-5" />,
      section: "donations",
    },
    {
      name: "Projects",
      icon: <FolderKanban className="h-5 w-5" />,
      section: "projects",
    },
    {
      name: "Suggestions",
      icon: <Lightbulb className="h-5 w-5" />,
      section: "suggestions",
    },
    {
      name: "Grievances",
      icon: <MessageSquare className="h-5 w-5" />,
      section: "grievances",
    },
    {
      name: "Users",
      icon: <Users className="h-5 w-5" />,
      section: "users",
    },
    {
      name: "Settings",
      icon: <Settings className="h-5 w-5" />,
      section: "settings",
    },
  ]

  const handleNavigation = (section: string) => {
    setActiveSection(section)
    if (isMobile) {
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          <Link href="/admin" className="flex items-center">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="LokDhristi Logo"
              width={40}
              height={40}
              className="mr-2"
            />
            <div>
              <span className="text-xl font-bold text-blue-600">LokDhristi</span>
              <span className="text-sm text-gray-500 ml-2">Admin Panel</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-gray-500">admin@lokdhristi.org</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar Navigation */}
        <aside
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } lg:block fixed lg:relative inset-0 lg:inset-auto z-10 w-64 bg-white shadow-md overflow-y-auto`}
        >
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.section}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeSection === item.section ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => handleNavigation(item.section)}
              >
                {item.icon}
                <span>{item.name}</span>
                {item.section === "suggestions" && (
                  <Badge className="ml-auto bg-blue-100 text-blue-600 hover:bg-blue-200">156</Badge>
                )}
                {item.section === "grievances" && (
                  <Badge className="ml-auto bg-red-100 text-red-600 hover:bg-red-200">89</Badge>
                )}
              </button>
            ))}

            <div className="pt-4 mt-4 border-t">
              <button
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors"
                onClick={() => {
                  // Handle logout
                }}
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 p-6 overflow-y-auto ${isMobileMenuOpen ? "lg:ml-64" : ""}`}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
