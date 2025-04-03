"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Menu,
  X,
  User,
  LogOut,
  MapPin,
  ChevronDown,
  MessageSquare,
  FileText,
  Vote,
  HelpCircle,
  Bell,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [fontSize, setFontSize] = useState(16)
  const [language, setLanguage] = useState("English")
  const [scrolled, setScrolled] = useState(false)

  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 2, 24))
    document.documentElement.style.fontSize = `${fontSize}px`
  }

  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 2, 12))
    document.documentElement.style.fontSize = `${fontSize}px`
  }

  const changeLanguage = (lang: string) => {
    setLanguage(lang)
    // In a real app, this would trigger language change functionality
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Grievances", href: "#grievances", icon: <MessageSquare size={18} /> },
    { name: "Updates", href: "#updates", icon: <FileText size={18} /> },
    { name: "Voting", href: "#voting", icon: <Vote size={18} /> },
    { name: "Legal Help", href: "#chatbot", icon: <HelpCircle size={18} /> },
    { name: "Alerts", href: "#alerts", icon: <Bell size={18} /> },
  ]

  return (
    <>
      {/* Accessibility Controls */}
      <div className="bg-blue-900 text-white py-2">
        <div className="container mx-auto px-4 flex justify-end items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm">Text Size:</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={decreaseFontSize}
              className="text-white hover:bg-blue-700 h-7 w-7 p-0"
            >
              A-
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={increaseFontSize}
              className="text-white hover:bg-blue-700 h-7 w-7 p-0"
            >
              A+
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700">
                {language} <ChevronDown size={14} className="ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => changeLanguage("English")}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage("हिंदी")}>हिंदी</DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage("தமிழ்")}>தமிழ்</DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage("తెలుగు")}>తెలుగు</DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage("ಕನ್ನಡ")}>ಕನ್ನಡ</DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage("മലയാളം")}>മലയാളം</DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage("বাংলা")}>বাংলা</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav
        className={`sticky top-0 z-40 w-full bg-white ${scrolled ? "shadow-md" : "shadow-sm"}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        style={{ fontSize: `${fontSize}px` }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="LokDhristi Logo"
                  width={40}
                  height={40}
                  className="mr-2"
                />
                <span className="text-xl font-bold text-blue-800">LokDhristi</span>
              </Link>

              <div className="hidden md:flex md:ml-10 md:space-x-6">
                <TooltipProvider>
                  {navLinks.map((link) => (
                    <Tooltip key={link.name}>
                      <TooltipTrigger asChild>
                        <Link
                          href={link.href}
                          className="flex items-center text-blue-800 hover:text-blue-900 transition-colors duration-200"
                        >
                          {link.icon}
                          <span className="ml-1">{link.name}</span>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Go to {link.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </TooltipProvider>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center text-blue-800 border-blue-900">
                      <User size={16} className="mr-2" />
                      My Account
                      <ChevronDown size={16} className="ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem>
                      <User size={16} className="mr-2" />
                      <span>My Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MapPin size={16} className="mr-2" />
                      <span>My Constituency</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings size={16} className="mr-2" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut size={16} className="mr-2" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="md:hidden">
                <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-blue-800">
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-2 px-2 pb-3 pt-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center rounded-md px-3 py-2 text-base font-medium text-blue-800 hover:bg-blue-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.icon}
                    <span className="ml-2">{link.name}</span>
                  </Link>
                ))}

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <p className="px-3 text-sm font-medium text-gray-500 mb-2">Account</p>
                  <Link
                    href="#"
                    className="flex items-center rounded-md px-3 py-2 text-base font-medium text-blue-800 hover:bg-blue-50"
                  >
                    <User size={18} className="mr-2" />
                    My Profile
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center rounded-md px-3 py-2 text-base font-medium text-blue-800 hover:bg-blue-50"
                  >
                    <MapPin size={18} className="mr-2" />
                    My Constituency
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center rounded-md px-3 py-2 text-base font-medium text-blue-800 hover:bg-blue-50"
                  >
                    <LogOut size={18} className="mr-2" />
                    Logout
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>
    </>
  )
}

export default Navbar

