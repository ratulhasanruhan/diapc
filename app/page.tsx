"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/cursor/MagneticButton";
import Image from "next/image";
import { ArrowRight, Cloud, Terminal, MonitorSmartphone, Target, Rocket } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden selection:bg-electric selection:text-white">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/brand/modern_logo.png" alt="DPC Logo" width={32} height={32} className="object-contain" />
            <span className="font-display font-bold text-xl tracking-tight">DPC</span>
          </Link>
          <div className="hidden md:flex gap-8 font-mono text-sm opacity-70">
            <a href="#about" className="hover:text-electric transition-colors">About</a>
            <Link href="/wings" className="hover:text-electric transition-colors">Wings</Link>
            <Link href="/achievements" className="hover:text-electric transition-colors">Hall of Missions</Link>
            <Link href="/collaborate" className="hover:text-electric transition-colors">Docking Bay</Link>
          </div>
          <MagneticButton className="bg-electric text-white text-sm px-4 py-2 hover:bg-electric/90">
            Join Now
          </MagneticButton>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-8 pt-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-brand-blue/15 rounded-full blur-[100px] mix-blend-screen animate-pulse" />
          <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-brand-purple/15 rounded-full blur-[100px] mix-blend-screen animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto space-y-8 mt-12">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="flex justify-center mb-4">
            <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full border border-white/20 shadow-2xl overflow-hidden bg-white/5 backdrop-blur-md p-6 flex items-center justify-center group">
               <Image src="/brand/modern_logo.png" alt="DPC Logo" fill className="object-contain p-4 group-hover:scale-110 transition-transform duration-700" priority />
            </div>
          </motion.div>

          <motion.h1 initial="hidden" animate="visible" variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-foreground leading-[1.1]">
            DIA Programming <br /> Club
          </motion.h1>
          
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="font-mono text-lg md:text-2xl text-ink/70 dark:text-white/70 bg-white/10 dark:bg-white/5 px-6 py-3 rounded-xl backdrop-blur-md border border-white/10 shadow-lg">
            <span className="text-brand-purple">=</span>{" "}
            <span className="text-electric">new</span>{" "}
            <span className="text-brand-blue">instance</span> of{" "}
            <span className="text-gradient font-bold">future()</span>;
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mt-8">
            <MagneticButton className="bg-brand-blue text-white hover:bg-brand-blue/90 shadow-lg shadow-brand-blue/25 text-lg font-semibold px-8 py-4 flex items-center gap-2 group">
              Join the club <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* The DPC System (Wings) */}
      <section className="py-24 px-8 relative overflow-hidden bg-black/5 dark:bg-white/5 border-t border-white/5">
        <div className="max-w-6xl mx-auto space-y-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold">The DPC System</h2>
            <p className="text-ink/60 dark:text-white/60">Our active and proposed wings orbiting the core.</p>
          </motion.div>

          <div className="relative aspect-square md:aspect-[2/1] w-full max-w-4xl mx-auto flex items-center justify-center">
             {/* Abstract Orbital System representation */}
             <div className="absolute w-16 h-16 bg-brand-blue rounded-full shadow-[0_0_50px_rgba(10,107,201,0.8)] z-10 flex items-center justify-center">
               <Image src="/brand/modern_logo.png" alt="Core" width={32} height={32} />
             </div>
             {/* AWS Orbit */}
             <div className="absolute w-64 h-64 border border-orange-500/50 rounded-full animate-[spin_20s_linear_infinite]" />
             <Link href="/wings/aws" className="absolute w-64 h-64 animate-[spin_20s_linear_infinite] z-20">
               <div className="w-12 h-12 bg-orange-500 rounded-full -top-6 left-1/2 -translate-x-1/2 absolute shadow-[0_0_30px_rgba(249,115,22,0.8)] flex items-center justify-center group cursor-pointer">
                 <Cloud className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
               </div>
             </Link>

             {/* Proposed Orbit 1 */}
             <div className="absolute w-96 h-96 border border-dashed border-white/20 rounded-full animate-[spin_30s_linear_infinite]" />
             <div className="absolute w-96 h-96 animate-[spin_30s_linear_infinite] z-20">
               <div className="w-8 h-8 bg-blue-500/50 backdrop-blur-sm border border-blue-500 rounded-full -bottom-4 left-1/2 -translate-x-1/2 absolute flex items-center justify-center">
                 <Terminal className="w-4 h-4 text-white" />
               </div>
             </div>

             {/* Proposed Orbit 2 */}
             <div className="absolute w-[32rem] h-[32rem] border border-dashed border-white/20 rounded-full animate-[spin_40s_linear_infinite]" />
             <div className="absolute w-[32rem] h-[32rem] animate-[spin_40s_linear_infinite] z-20">
               <div className="w-8 h-8 bg-purple-500/50 backdrop-blur-sm border border-purple-500 rounded-full top-1/2 -right-4 -translate-y-1/2 absolute flex items-center justify-center">
                 <MonitorSmartphone className="w-4 h-4 text-white" />
               </div>
             </div>
          </div>
          
          <div className="text-center">
            <Link href="/wings" className="text-electric hover:underline font-mono">Explore all wings →</Link>
          </div>
        </div>
      </section>

      {/* Hall of Missions Teaser */}
      <section className="py-24 px-8 relative">
        <div className="max-w-6xl mx-auto space-y-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center space-y-4 max-w-2xl mx-auto">
            <Target className="w-12 h-12 text-brand-purple mx-auto" />
            <h2 className="text-4xl md:text-5xl font-display font-bold">Hall of Missions</h2>
            <p className="text-ink/60 dark:text-white/60">Our track record. Verified achievements, hackathon wins, and certifications.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm text-center">
               <div className="text-4xl font-display font-bold text-electric mb-2">2</div>
               <div className="font-mono text-sm opacity-70">Total Missions</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm text-center">
               <div className="text-4xl font-display font-bold text-orange-500 mb-2">1</div>
               <div className="font-mono text-sm opacity-70">Certifications</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm text-center">
               <div className="text-4xl font-display font-bold text-brand-purple mb-2">1</div>
               <div className="font-mono text-sm opacity-70">Hackathon Wins</div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/achievements" className="text-electric hover:underline font-mono">Enter the Hall of Missions →</Link>
          </div>
        </div>
      </section>

      {/* Docking Bay Teaser */}
      <section className="py-24 px-8 relative bg-electric/10 border-t border-electric/20">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <Rocket className="w-16 h-16 text-electric mx-auto" />
          <h2 className="text-4xl md:text-5xl font-display font-bold">Dock With Us</h2>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            We are a space station welcoming allied fleets. Co-host events, sponsor us, or launch a joint mission.
          </p>
          <MagneticButton className="bg-electric text-white px-8 py-4 font-bold text-lg mt-8">
            <Link href="/collaborate">Request Docking</Link>
          </MagneticButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-white/10 text-center font-mono text-sm text-ink/50 dark:text-white/50">
        <p>DIA Programming Club © {new Date().getFullYear()}</p>
        <p className="mt-2 text-xs">Not an official Amazon Web Services site.</p>
      </footer>

    </main>
  );
}
