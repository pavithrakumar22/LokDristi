"use client";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import FeatureSection from "@/components/feature-section";
import Footer from "@/components/footer";
import ChatbotButton from "@/components/chatbot-button";
import SuggestionBox from "@/components/SuggestionBox";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <FeatureSection />

      {/* Suggestion Box Section */}
      <section className="flex flex-col items-center justify-center py-10 bg-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">💡 Give a Suggestion</h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          Have an idea to improve LokDristi? Share your suggestions below!
        </p>
        <div className="w-full max-w-lg p-6 bg-white shadow-md rounded-lg">
          <SuggestionBox />
        </div>
      </section>

      <Footer />
      <ChatbotButton />
    </main>
  );
}
