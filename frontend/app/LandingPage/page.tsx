import Link from "next/link";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import FeatureSection from "@/components/feature-section";
import Footer from "@/components/footer";
import ChatbotButton from "@/components/chatbot-button";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <FeatureSection />

      {/* ✅ Add Suggestion Box Button (DO NOT import SuggestionBox) */}
      <div className="flex justify-center mt-6">
        <Link href="/suggestions">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Give a Suggestion
          </button>
        </Link>
      </div>

      <Footer />
      <ChatbotButton />
    </main>
  );
}
