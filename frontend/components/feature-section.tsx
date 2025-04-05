"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import {
  VoteIcon,
  MessageSquareIcon,
  FileTextIcon,
  LightbulbIcon,
  DollarSignIcon,
  BarChart3Icon,
  PhoneIcon,
  UserIcon,
  CalendarIcon,
  AlertTriangleIcon,
  LineChartIcon,
  PencilIcon,
  GlobeIcon,
  AccessibilityIcon,
  CheckCircle2,
  Shield,
  Building,
  Landmark,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AnimatedCard } from "@/components/ui/animated-card"
import { Timeline } from "@/components/ui/timeline"
import { useRouter } from "next/navigation"

const FeatureSection = () => {

const router = useRouter()
  const handleSignin = () => {
    router.push("/auth/Signup")
  }

  const features = [
    {
      id: "grievances",
      title: "Citizen Grievances Platform",
      description:
        "Submit and upvote community grievances to bring attention to issues that matter most to citizens. Our transparent tracking system ensures that no complaint goes unnoticed.",
      icon: <MessageSquareIcon className="h-10 w-10 text-blue-600" />,
      image: "/placeholder.svg?height=300&width=400",
      details: [
        "Submit grievances with photo and location evidence",
        "Upvote system to prioritize urgent community issues",
        "Real-time status tracking of grievance resolution",
        "Escalation mechanism for unresolved issues",
        "Analytics dashboard showing resolution rates by department",
      ],
      stats: {
        resolved: "15,000+",
        avgTime: "7 days",
        satisfaction: "92%",
      },
    },
    {
      id: "updates",
      title: "Government Updates & Policy Forum",
      description:
        "Stay informed about the latest government policies and updates. Participate in discussions and provide feedback through upvotes and downvotes to help shape policy decisions.",
      icon: <FileTextIcon className="h-10 w-10 text-blue-600" />,
      image: "/placeholder.svg?height=300&width=400",
      details: [
        "Categorized policy updates from all government departments",
        "Interactive discussion forums with moderated conversations",
        "Voting system to gauge public sentiment on policies",
        "Notification system for updates in your areas of interest",
        "Direct feedback channel to policy makers",
      ],
      stats: {
        policies: "500+",
        discussions: "2,300+",
        participants: "50,000+",
      },
    },
    {
      id: "voting",
      title: "Secure Public Voting System",
      description:
        "Participate in democratic decision-making through our secure, blockchain-based online voting platform for public initiatives, local proposals, and community projects.",
      icon: <VoteIcon className="h-10 w-10 text-blue-600" />,
      image: "/placeholder.svg?height=300&width=400",
      details: [
        "Secure authentication using Aadhaar verification",
        "Blockchain technology ensuring tamper-proof voting records",
        "Accessible voting interface with multiple language support",
        "Real-time voting statistics and transparent results",
        "Historical voting data archive for public reference",
      ],
      stats: {
        elections: "120+",
        voters: "2.5M+",
        security: "Military-grade",
      },
    },
    {
      id: "chatbot",
      title: "AI Legal Rights Assistant",
      description:
        "Access our AI-powered chatbot that explains your legal rights in simple, easy-to-understand language, answering your legal questions instantly and providing guidance on government procedures.",
      icon: <LightbulbIcon className="h-10 w-10 text-blue-600" />,
      image: "/placeholder.svg?height=300&width=400",
      details: [
        "24/7 availability for instant legal guidance",
        "Simplified explanations of complex legal terms and procedures",
        "Support for 12 Indian languages",
        "Context-aware responses based on your location and situation",
        "Integration with government portals for direct application assistance",
      ],
      stats: {
        queries: "1M+",
        accuracy: "98%",
        languages: "12",
      },
    },
    {
      id: "suggestions",
      title: "Community Suggestion Box",
      description:
        "Submit your ideas and suggestions to improve government services and community initiatives. The best ideas are implemented with full transparency and recognition for contributors.",
      icon: <PencilIcon className="h-10 w-10 text-blue-600" />,
      image: "/placeholder.svg?height=300&width=400",
      details: [
        "Open platform for submitting improvement ideas",
        "Community voting to highlight the most impactful suggestions",
        "Implementation tracking for adopted suggestions",
        "Recognition program for citizens whose ideas are implemented",
        "Collaboration tools for refining and developing promising ideas",
      ],
      stats: {
        ideas: "12,000+",
        implemented: "450+",
        savings: "₹120Cr+",
      },
    },
    {
      id: "funds",
      title: "Public Funds & Donations Tracker",
      description:
        "Track public funds and make donations to support community projects and initiatives with complete transparency on how every rupee is utilized.",
      icon: <DollarSignIcon className="h-10 w-10 text-blue-600" />,
      image: "/placeholder.svg?height=300&width=400",
      details: [
        "Transparent tracking of government fund allocation and utilization",
        "Secure donation platform for community projects",
        "Detailed breakdown of project budgets and expenditures",
        "Tax benefit certificates for donations",
        "Impact assessment reports for completed projects",
      ],
      stats: {
        donations: "₹25Cr+",
        projects: "320+",
        transparency: "100%",
      },
    },
    {
      id: "alerts",
      title: "Critical Alerts & Notifications System",
      description:
        "Receive important notifications and alerts about emergencies, deadlines, and critical updates relevant to your location and interests through multiple channels including SMS, email, and app notifications.",
      icon: <AlertTriangleIcon className="h-10 w-10 text-blue-600" />,
      image: "/placeholder.svg?height=300&width=400",
      details: [
        "Real-time emergency alerts with geolocation targeting",
        "Customizable notification preferences by category",
        "Multi-channel delivery (app, SMS, email, WhatsApp)",
        "Priority system for critical vs. informational alerts",
        "Offline functionality for emergency situations",
      ],
      stats: {
        reliability: "99.99%",
        delivery: "<30 seconds",
        coverage: "98% population",
      },
    },
    {
      id: "tracking",
      title: "Real-time Project Tracking System",
      description:
        "Monitor the progress of government projects and spending in real-time with transparent tracking tools that show milestones, timelines, budget utilization, and current status updates.",
      icon: <LineChartIcon className="h-10 w-10 text-blue-600" />,
      image: "/placeholder.svg?height=300&width=400",
      details: [
        "Live project dashboards with milestone tracking",
        "Before/after imagery of infrastructure projects",
        "Budget allocation and expenditure monitoring",
        "Contractor performance metrics and accountability",
        "Citizen feedback collection on project impact",
      ],
      stats: {
        projects: "15,000+",
        value: "₹3.5T+",
        completion: "On-time: 82%",
      },
    },
    {
      id: "petitions",
      title: "Public Petitions Platform",
      description:
        "Create and sign petitions for causes that matter to your community, driving change through collective action with a transparent process for government response to petitions that reach signature thresholds.",
      icon: <GlobeIcon className="h-10 w-10 text-blue-600" />,
      image: "/placeholder.svg?height=300&width=400",
      details: [
        "Easy petition creation with multimedia support",
        "Secure signature verification system",
        "Automatic routing to relevant government authorities",
        "Mandatory response mechanism for qualifying petitions",
        "Success stories and impact tracking for approved petitions",
      ],
      stats: {
        petitions: "8,000+",
        signatures: "25M+",
        success: "35%",
      },
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">Platform Features</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
            Empowering Citizens, Enhancing Governance
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-700">
            LokDhristi offers a comprehensive suite of features designed to bridge the gap between citizens and
            government, promoting transparency, participation, and accountability.
          </p>
        </motion.div>


        {/* Detailed Feature Cards */}
        <div className="space-y-32">
          {features.map((feature, index) => (
            <div key={feature.id} id={feature.id} className="scroll-mt-20">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-bold text-blue-700 mb-8 text-center"
              >
                {feature.title}
              </motion.h3>

              <div
                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8`}
              >
                <div className="md:w-1/2">
                  <AnimatedCard
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    delay={0.1}
                    className="h-full"
                  >
                    <div className="mt-6 space-y-4">
                      <h4 className="font-semibold text-blue-700">Key Features:</h4>
                      <ul className="space-y-2">
                        {feature.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-4 mt-4 border-t border-gray-200">
                        <h4 className="font-semibold text-blue-700 mb-3">Impact:</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {Object.entries(feature.stats).map(([key, value]) => (
                            <div key={key} className="bg-blue-50 p-3 rounded-lg text-center">
                              <p className="text-blue-800 font-bold text-lg">{value}</p>
                              <p className="text-blue-600 text-sm capitalize">{key}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 flex justify-center">
                        <Button onClick={handleSignin} className="bg-blue-600 hover:bg-blue-700 text-white">Learn More</Button>
                      </div>
                    </div>
                  </AnimatedCard>
                </div>

                <div className="md:w-1/2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="relative w-full aspect-video rounded-lg overflow-hidden shadow-xl"
                  >
                    <Image
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                      <div className="p-4 text-white">
                        <h4 className="text-xl font-bold">{feature.title}</h4>
                        <p className="text-sm opacity-90">Empowering citizens through technology</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureSection

