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

const FeatureSection = () => {
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
      id: "expenditures",
      title: "Government Expenditure Dashboard",
      description:
        "Gain transparency into how government funds are being utilized with detailed breakdowns of expenditures across departments, projects, and initiatives at national, state, and local levels.",
      icon: <BarChart3Icon className="h-10 w-10 text-blue-600" />,
      image: "/placeholder.svg?height=300&width=400",
      details: [
        "Interactive dashboards showing real-time expenditure data",
        "Comparative analysis tools for year-on-year spending",
        "Department-wise budget allocation and utilization metrics",
        "Anomaly detection system to flag unusual spending patterns",
        "Citizen feedback mechanism on spending priorities",
      ],
      stats: {
        tracked: "₹1.2T+",
        departments: "85+",
        updates: "Daily",
      },
    },
    {
      id: "contact",
      title: "Government Connect Portal",
      description:
        "Easily connect with relevant government departments and officials through our streamlined contact system that ensures your queries reach the right person and receive timely responses.",
      icon: <PhoneIcon className="h-10 w-10 text-blue-600" />,
      image: "/placeholder.svg?height=300&width=400",
      details: [
        "Intelligent routing system to connect with the right department",
        "Appointment scheduling with government officials",
        "Video conferencing facilities for remote consultations",
        "Response time guarantees with escalation protocols",
        "Feedback system to rate and improve service quality",
      ],
      stats: {
        connections: "500K+",
        avgResponse: "48 hours",
        satisfaction: "89%",
      },
    },
    {
      id: "accessibility",
      title: "Universal Accessibility Features",
      description:
        "Access the platform with screen readers, font size management, language options, and other accessibility tools to ensure everyone, including persons with disabilities, can use LokDhristi effectively.",
      icon: <AccessibilityIcon className="h-10 w-10 text-blue-600" />,
      image: "/placeholder.svg?height=300&width=400",
      details: [
        "WCAG 2.1 AA compliant interface design",
        "Screen reader compatibility with ARIA attributes",
        "Dynamic font sizing and high contrast modes",
        "Support for 15+ Indian languages with transliteration",
        "Voice navigation and command system for hands-free operation",
      ],
      stats: {
        languages: "15+",
        accessibility: "WCAG 2.1 AA",
        inclusivity: "100%",
      },
    },
    {
      id: "whoswho",
      title: "Government Directory & Profiles",
      description:
        "Learn about government officials, their roles, responsibilities, and contact information to better navigate government services and understand who's responsible for different areas of governance.",
      icon: <UserIcon className="h-10 w-10 text-blue-600" />,
      image: "/placeholder.svg?height=300&width=400",
      details: [
        "Comprehensive directory of officials from village to national level",
        "Detailed profiles with roles, responsibilities and jurisdiction",
        "Performance metrics and citizen satisfaction ratings",
        "Term tracking and historical position holders",
        "Direct contact options with appointment scheduling",
      ],
      stats: {
        officials: "250K+",
        departments: "120+",
        levels: "5",
      },
    },
    {
      id: "events",
      title: "Government & Community Events Calendar",
      description:
        "Stay updated on upcoming and ongoing government events, public meetings, community gatherings, and important deadlines through our comprehensive events platform.",
      icon: <CalendarIcon className="h-10 w-10 text-blue-600" />,
      image: "/placeholder.svg?height=300&width=400",
      details: [
        "Personalized event recommendations based on interests",
        "Location-based filtering for local events",
        "Calendar integration with reminder functionality",
        "Live streaming of public meetings and events",
        "Post-event resources including recordings and documents",
      ],
      stats: {
        events: "1,000+/month",
        attendance: "5M+",
        coverage: "Pan-India",
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
    {
      id: "digital-identity",
      title: "Unified Digital Identity",
      description:
        "Access all government services with a single secure digital identity, eliminating the need for multiple logins and paperwork while ensuring your data remains protected and under your control.",
      icon: <Shield className="h-10 w-10 text-blue-600" />,
      image: "/placeholder.svg?height=300&width=400",
      details: [
        "Single sign-on for all government services",
        "Biometric and multi-factor authentication",
        "User-controlled data sharing permissions",
        "Secure document storage and verification",
        "Comprehensive activity logs and security alerts",
      ],
      stats: {
        users: "750M+",
        security: "Military-grade",
        convenience: "100%",
      },
    },
    {
      id: "open-data",
      title: "Open Government Data Portal",
      description:
        "Access, download, and utilize government data sets for research, application development, and analysis, promoting transparency and enabling innovation through open data initiatives.",
      icon: <Building className="h-10 w-10 text-blue-600" />,
      image: "/placeholder.svg?height=300&width=400",
      details: [
        "Thousands of curated government datasets",
        "API access for developers and researchers",
        "Visualization tools for data exploration",
        "Regular updates with versioning control",
        "Community projects showcase using open data",
      ],
      stats: {
        datasets: "25,000+",
        downloads: "10M+",
        applications: "3,000+",
      },
    },
    {
      id: "participatory-budgeting",
      title: "Participatory Budgeting",
      description:
        "Have a direct say in how a portion of your local government budget is spent by proposing projects, voting on initiatives, and tracking the implementation of community-chosen priorities.",
      icon: <Landmark className="h-10 w-10 text-blue-600" />,
      image: "/placeholder.svg?height=300&width=400",
      details: [
        "Propose community projects for funding",
        "Vote on budget allocation priorities",
        "Transparent selection and implementation process",
        "Impact assessment of funded projects",
        "Year-on-year participation growth tracking",
      ],
      stats: {
        budget: "₹500Cr+",
        participants: "1.2M+",
        projects: "750+",
      },
    },
  ]

  const timelineData = features.map((feature) => ({
    title: feature.title,
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-4">
          {feature.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Image
            src={feature.image || "/placeholder.svg"}
            alt={feature.title}
            width={400}
            height={300}
            className="rounded-lg object-cover h-40 md:h-52 w-full shadow-lg"
          />
          <div className="space-y-2">
            <h4 className="font-semibold text-blue-700">Key Features:</h4>
            <ul className="space-y-1">
              {feature.details.slice(0, 3).map((detail, idx) => (
                <li key={idx} className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    ),
  }))

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

        {/* Feature Timeline View */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold text-blue-700 mb-8 text-center">Feature Journey</h3>
          <Timeline data={timelineData} />
        </div>

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
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Learn More</Button>
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

