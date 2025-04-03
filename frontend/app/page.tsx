import Hero from "@/components/hero"
import FeatureSection from "@/components/feature-section"
import Footer from "@/components/footer"
import ChatbotButton from "@/components/chatbot-button"
import Navbar from "@/components/navbarL"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <FeatureSection />
      <Footer />
      {/* <ChatbotButton /> */}
    </main>
  )
}