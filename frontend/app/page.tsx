import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}














// // pages/index.js
// "use client"
// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { Button } from "@/components/ui/button";
// import { ArrowRight, CreditCard, Shield, Zap } from 'lucide-react';

// // Deterministic random function
// function seededRandom(seed) {
//   const x = Math.sin(seed) * 10000;
//   return x - Math.floor(x);
// }

// export default function Home() {
//   const [scrollY, setScrollY] = useState(0);
//   // Add this state to control when client-side rendering happens
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollY(window.scrollY);
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     // Mark component as mounted after hydration
//     setIsMounted(true);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Generate background elements with deterministic values
//   const backgroundElements = [...Array(20)].map((_, i) => {
//     // Use the index as seed to get consistent values
//     const widthVal = 100 + seededRandom(i * 1) * 400;
//     const heightVal = 100 + seededRandom(i * 2) * 400;
//     const leftVal = seededRandom(i * 3) * 100;
//     const topVal = seededRandom(i * 4) * 100;
//     const xMove1 = seededRandom(i * 5) * 100 - 50;
//     const xMove2 = seededRandom(i * 6) * 100 - 50;
//     const yMove1 = seededRandom(i * 7) * 100 - 50;
//     const yMove2 = seededRandom(i * 8) * 100 - 50;
//     const duration = 20 + seededRandom(i * 9) * 10;
    
//     return {
//       width: widthVal,
//       height: heightVal,
//       left: leftVal,
//       top: topVal,
//       xMove: [xMove1, xMove2],
//       yMove: [yMove1, yMove2],
//       duration: duration
//     };
//   });

//   return (
//     <div className="min-h-screen bg-white text-black">
  

//       {/* Hero Section */}
//       <section className="relative py-32 overflow-hidden">
//         <div className="container mx-auto px-4 relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7 }}
//             className="max-w-3xl mx-auto text-center"
//           >
//             <h1 className="text-5xl md:text-6xl font-bold mb-6">
//               Unified Payments for the Digital Age
//             </h1>
            
//             <p className="text-xl text-gray-700 mb-10">
//               Experience seamless transactions, enhanced security, and real-time analytics
//               with the most advanced payment platform for businesses of all sizes.
//             </p>
            
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <Link href="/auth/UserSignup">
//                 <Button className="px-8 py-6 rounded-xl bg-black hover:bg-gray-800 text-white text-lg group">
//                   Get Started
//                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </Button>
//               </Link>
//             </motion.div>
//           </motion.div>
//         </div>
        
//         {/* Animated Background Elements */}
//         <div className="absolute inset-0 -z-10 overflow-hidden">
//           {/* Only render these elements client-side after hydration */}
//           {isMounted && backgroundElements.map((elem, i) => (
//             <motion.div
//               key={i}
//               className="absolute rounded-full bg-gray-900/10 blur-3xl"
//               style={{
//                 width: elem.width,
//                 height: elem.height,
//                 left: `${elem.left}%`,
//                 top: `${elem.top}%`,
//               }}
//               animate={{
//                 x: elem.xMove,
//                 y: elem.yMove,
//                 opacity: [0.05, 0.2, 0.05],
//               }}
//               transition={{
//                 repeat: Infinity,
//                 repeatType: "reverse",
//                 duration: elem.duration,
//               }}
//             />
//           ))}
//         </div>
        
//         {/* Card Animation */}
//         <motion.div
//           initial={{ y: 100, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.5, duration: 0.8 }}
//           className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4 w-full max-w-4xl"
//         >
//           <div className="relative">
//             <motion.div
//               animate={{ 
//                 y: [0, -8, 0],
//                 rotate: [0, 1, 0], 
//               }}
//               transition={{ 
//                 repeat: Infinity,
//                 repeatType: "reverse",
//                 duration: 6,
//               }}
//               className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200 mx-4"
//             >
//               <div className="flex justify-between items-center mb-8">
//                 <div className="flex gap-4">
//                   <div className="w-12 h-8 rounded-md bg-black" />
//                   <div className="w-12 h-8 rounded-md bg-gray-200" />
//                 </div>
//                 <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-xl font-bold text-white">
//                   UP
//                 </div>
//               </div>
              
//               <div className="space-y-4">
//                 <div className="h-6 w-full bg-gray-200 rounded-full" />
//                 <div className="flex justify-between">
//                   <div className="h-4 w-24 bg-gray-200 rounded-full" />
//                   <div className="h-4 w-16 bg-gray-200 rounded-full" />
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="py-24 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">
//               Powerful Features for Modern Businesses
//             </h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               UniPay offers a comprehensive suite of payment solutions designed to streamline your financial operations.
//             </p>
//           </motion.div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: <CreditCard className="w-12 h-12 text-black" />,
//                 title: "Multi-Currency Support",
//                 description: "Process payments in over 130 currencies with real-time conversion rates and minimal fees."
//               },
//               {
//                 icon: <Shield className="w-12 h-12 text-black" />,
//                 title: "Enhanced Security",
//                 description: "State-of-the-art encryption and fraud detection algorithms to protect every transaction."
//               },
//               {
//                 icon: <Zap className="w-12 h-12 text-black" />,
//                 title: "Instant Settlements",
//                 description: "Get funds in your account within minutes, not days, with our innovative settlement system."
//               }
//             ].map((feature, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ y: 50, opacity: 0 }}
//                 whileInView={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.5, delay: i * 0.1 }}
//                 viewport={{ once: true }}
//                 className="bg-white p-8 rounded-xl border border-gray-200 hover:border-black/50 transition-colors group"
//               >
//                 <motion.div
//                   whileHover={{ y: -5 }}
//                   className="mb-6"
//                 >
//                   {feature.icon}
//                 </motion.div>
//                 <h3 className="text-xl font-bold mb-3 group-hover:text-gray-700 transition-colors">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600">
//                   {feature.description}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gray-100">
//         <div className="container mx-auto px-4">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//             className="bg-white rounded-2xl p-12 max-w-4xl mx-auto border border-gray-200 text-center shadow-lg"
//           >
//             <h2 className="text-3xl md:text-4xl font-bold mb-6">
//               Ready to Transform Your Payment Experience?
//             </h2>
//             <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
//               Join thousands of businesses already using UniPay to process millions of transactions daily.
//             </p>
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <Link href="/auth/BusinessSignup">
//                 <Button size="lg" className="px-8 py-6 text-lg bg-black hover:bg-gray-800 text-white group">
//                   Start Selling
//                   <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
//                 </Button>
//               </Link>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>

      
//     </div>
//   );
// }