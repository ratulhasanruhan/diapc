"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/cursor/MagneticButton";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center p-8 bg-background">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[20%] right-[20%] w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl mix-blend-screen animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-4"
        >
          <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-paper shadow-2xl overflow-hidden bg-white/5 backdrop-blur-sm p-4 flex items-center justify-center">
             <Image 
                src="/brand/modern_logo.png" 
                alt="DPC Logo"
                fill
                className="object-contain p-2"
                priority
             />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-8xl font-bold tracking-tight text-foreground"
        >
          DIA Programming <br /> Club
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-mono text-xl md:text-2xl text-ink/70 dark:text-ink/70 bg-white/10 dark:bg-black/20 px-6 py-2 rounded-lg backdrop-blur-md border border-white/10"
        >
          <span className="text-brand-purple">=</span>{" "}
          <span className="text-electric">new</span>{" "}
          <span className="text-brand-blue">instance</span> of{" "}
          <span className="text-gradient font-bold">future()</span>;
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 mt-8"
        >
          <MagneticButton className="bg-brand-blue text-white hover:bg-brand-blue/90 shadow-lg shadow-brand-blue/25 text-lg font-semibold px-8 py-4">
            Join the club
          </MagneticButton>
          <MagneticButton className="bg-white text-ink border border-ink/10 hover:bg-gray-50 shadow-sm text-lg font-medium px-8 py-4 dark:bg-ink dark:text-white dark:border-white/10 dark:hover:bg-ink/80">
            Explore events
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink/50 dark:text-ink/50 font-mono text-sm"
      >
        <span>Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          ↓
        </motion.div>
      </motion.div>
    </main>
  );
}
