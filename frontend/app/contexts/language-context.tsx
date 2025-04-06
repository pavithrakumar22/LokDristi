"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

// Define types for our translations and context
export type Language = "English" | "हिंदी" | "தமிழ்" | "తెలుగు" | "ಕನ್ನಡ" | "മലയാളം" | "বাংলা"
type TranslationDictionary = Record<string, string>
type Translations = Record<Language, TranslationDictionary>

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "English",
  setLanguage: () => {},
  t: (key: string) => key,
})

// Sample translations (you'll expand this with your actual text)
const translations: Translations = {
  "English": {
    "grievances": "Grievances",
    "updates": "Updates",
    "voting": "Voting",
    "legalHelp": "Legal Help",
    "donate": "Donate",
    "suggestions": "Suggestions",
    "myAccount": "My Account",
    "myProfile": "My Profile",
    "myConstituency": "My Constituency",
    "settings": "Settings",
    "logout": "Logout",
    "textSize": "Text Size:",
    "account": "Account",
    // Add all other text on your page here
  },
  "हिंदी": {
    "grievances": "शिकायतें",
    "updates": "अपडेट",
    "voting": "मतदान",
    "legalHelp": "कानूनी सहायता",
    "donate": "दान करें",
    "suggestions": "सुझाव",
    "myAccount": "मेरा खाता",
    "myProfile": "मेरी प्रोफाइल",
    "myConstituency": "मेरा निर्वाचन क्षेत्र",
    "settings": "सेटिंग्स",
    "logout": "लॉग आउट",
    "textSize": "टेक्स्ट का आकार:",
    "account": "खाता",
    // Add all other text on your page here
  },
  "தமிழ்": {
    "grievances": "குறைகள்",
    "updates": "புதுப்பிப்புகள்",
    "voting": "வாக்களிப்பு",
    "legalHelp": "சட்ட உதவி",
    "donate": "நன்கொடை",
    "suggestions": "பரிந்துரைகள்",
    "myAccount": "எனது கணக்கு",
    "myProfile": "எனது சுயவிவரம்",
    "myConstituency": "எனது தொகுதி",
    "settings": "அமைப்புகள்",
    "logout": "வெளியேறு",
    "textSize": "உரை அளவு:",
    "account": "கணக்கு",
    // Add all other text on your page here
  },
  "తెలుగు": {
    "grievances": "ఫిర్యాదులు",
    "updates": "నవీకరణలు",
    "voting": "ఓటింగ్",
    "legalHelp": "చట్టపరమైన సహాయం",
    "donate": "విరాళం ఇవ్వండి",
    "suggestions": "సూచనలు",
    "myAccount": "నా ఖాతా",
    "myProfile": "నా ప్రొఫైల్",
    "myConstituency": "నా నియోజకవర్గం",
    "settings": "సెట్టింగ్‌లు",
    "logout": "లాగ్ అవుట్",
    "textSize": "టెక్స్ట్ పరిమాణం:",
    "account": "ఖాతా",
    // Add all other text on your page here
  },
  "ಕನ್ನಡ": {
    "grievances": "ಕುಂದುಕೊರತೆಗಳು",
    "updates": "ಅಪ್‌ಡೇಟ್‌ಗಳು",
    "voting": "ಮತದಾನ",
    "legalHelp": "ಕಾನೂನು ಸಹಾಯ",
    "donate": "ದಾನ ಮಾಡಿ",
    "suggestions": "ಸಲಹೆಗಳು",
    "myAccount": "ನನ್ನ ಖಾತೆ",
    "myProfile": "ನನ್ನ ಪ್ರೊಫೈಲ್",
    "myConstituency": "ನನ್ನ ಕ್ಷೇತ್ರ",
    "settings": "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    "logout": "ಲಾಗ್ ಔಟ್",
    "textSize": "ಪಠ್ಯದ ಗಾತ್ರ:",
    "account": "ಖಾತೆ",
    // Add all other text on your page here
  },
  "മലയാളം": {
    "grievances": "പരാതികൾ",
    "updates": "അപ്ഡേറ്റുകൾ",
    "voting": "വോട്ടിംഗ്",
    "legalHelp": "നിയമ സഹായം",
    "donate": "സംഭാവന ചെയ്യുക",
    "suggestions": "നിർദ്ദേശങ്ങൾ",
    "myAccount": "എന്റെ അക്കൗണ്ട്",
    "myProfile": "എന്റെ പ്രൊഫൈൽ",
    "myConstituency": "എന്റെ മണ്ഡലം",
    "settings": "ക്രമീകരണങ്ങൾ",
    "logout": "പുറത്തുകടക്കുക",
    "textSize": "ടെക്സ്റ്റ് വലുപ്പം:",
    "account": "അക്കൗണ്ട്",
    // Add all other text on your page here
  },
  "বাংলা": {
    "grievances": "অভিযোগ",
    "updates": "আপডেট",
    "voting": "ভোটিং",
    "legalHelp": "আইনি সাহায্য",
    "donate": "দান করুন",
    "suggestions": "পরামর্শ",
    "myAccount": "আমার অ্যাকাউন্ট",
    "myProfile": "আমার প্রোফাইল",
    "myConstituency": "আমার নির্বাচনী এলাকা",
    "settings": "সেটিংস",
    "logout": "লগআউট",
    "textSize": "টেক্সট সাইজ:",
    "account": "অ্যাকাউন্ট",
    // Add all other text on your page here
  }
}

// Provider component
export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("English")
  
  // Load language preference from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])
  
  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language)
    // Optional: Set HTML lang attribute for accessibility
    document.documentElement.lang = {
      "English": "en",
      "हिंदी": "hi",
      "தமிழ்": "ta",
      "తెలుగు": "te",
      "ಕನ್ನಡ": "kn",
      "മലയാളം": "ml",
      "বাংলা": "bn"
    }[language] || "en"
  }, [language])
  
  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || translations["English"][key] || key
  }
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Custom hook for using the language context
export const useLanguage = () => useContext(LanguageContext)