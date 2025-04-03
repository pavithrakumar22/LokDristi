import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, Youtube, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white">
      {/* Newsletter Section */}
      <div className="bg-blue-700 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-blue-100">
                Subscribe to our newsletter to receive updates on new features, government initiatives, and civic
                opportunities.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 rounded-lg flex-grow text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <Button className="bg-white text-blue-600 hover:bg-blue-50">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src="/placeholder.svg?height=40&width=40" alt="LokDhristi Logo" width={40} height={40} />
              <h3 className="text-xl font-bold">LokDhristi</h3>
            </div>
            <p className="mb-4 text-blue-100">
              Bridging citizens and government through technology and transparency. Empowering civic participation for a
              better democracy.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-blue-200 transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="hover:text-blue-200 transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="hover:text-blue-200 transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="hover:text-blue-200 transition-colors">
                <Linkedin size={20} />
              </Link>
              <Link href="#" className="hover:text-blue-200 transition-colors">
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Key Features</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#grievances" className="text-blue-100 hover:text-white transition-colors">
                  Grievances Platform
                </Link>
              </li>
              <li>
                <Link href="#updates" className="text-blue-100 hover:text-white transition-colors">
                  Government Updates
                </Link>
              </li>
              <li>
                <Link href="#voting" className="text-blue-100 hover:text-white transition-colors">
                  Public Voting
                </Link>
              </li>
              <li>
                <Link href="#chatbot" className="text-blue-100 hover:text-white transition-colors">
                  Legal Rights Assistant
                </Link>
              </li>
              <li>
                <Link href="#tracking" className="text-blue-100 hover:text-white transition-colors">
                  Project Tracking
                </Link>
              </li>
              <li>
                <Link href="#petitions" className="text-blue-100 hover:text-white transition-colors">
                  Public Petitions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-blue-100 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-100 hover:text-white transition-colors">
                  Community Guidelines
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-100 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-100 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-100 hover:text-white transition-colors">
                  Accessibility
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-100 hover:text-white transition-colors">
                  Data Security
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="flex-shrink-0 mt-1" />
                <span>123 Democracy Avenue, New Delhi, India - 110001</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} />
                <span>contact@lokdhristi.org</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} />
                <span>+91 123 456 7890</span>
              </li>
            </ul>

            <div className="mt-6">
              <Button className="border-white text-white hover:bg-blue-700">
                Contact Support
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-400 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} LokDhristi. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="text-blue-100 hover:text-white text-sm">
                Sitemap
              </Link>
              <Link href="#" className="text-blue-100 hover:text-white text-sm">
                Careers
              </Link>
              <Link href="#" className="text-blue-100 hover:text-white text-sm">
                Press
              </Link>
              <Link href="#" className="text-blue-100 hover:text-white text-sm">
                Developers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

