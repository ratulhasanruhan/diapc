"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/cursor/MagneticButton";
import Image from "next/image";
import { ArrowRight, Calendar, Users, Shield, Cloud, Terminal } from "lucide-react";

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
          <div className="flex items-center gap-3">
            <Image src="/brand/modern_logo.png" alt="DPC Logo" width={32} height={32} className="object-contain" />
            <span className="font-display font-bold text-xl tracking-tight">DPC</span>
          </div>
          <div className="hidden md:flex gap-8 font-mono text-sm opacity-70">
            <a href="#about" className="hover:text-electric transition-colors">About</a>
            <a href="#wings" className="hover:text-electric transition-colors">Wings</a>
            <a href="#events" className="hover:text-electric transition-colors">Events</a>
            <a href="#committee" className="hover:text-electric transition-colors">Committee</a>
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

      {/* About & Constitution */}
      <section id="about" className="py-24 px-8 bg-black/5 dark:bg-white/5 relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple font-mono text-sm border border-brand-purple/20">
              <Shield className="w-4 h-4" /> Constitution
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold">Built by Programmers,<br/>For Programmers.</h2>
            <p className="text-lg text-ink/70 dark:text-white/70 leading-relaxed">
              We are a community of developers, designers, and innovators at Daffodil International Academy. Our constitution ensures an open, collaborative environment where knowledge is shared freely and everyone is empowered to build the future.
            </p>
            <ul className="space-y-4 font-mono text-sm opacity-80 pt-4">
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-electric" /> Open Source First
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-electric" /> Collaborative Learning
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-electric" /> Ethical Engineering
              </li>
            </ul>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm p-8 flex flex-col justify-center font-mono text-xs md:text-sm text-brand-blue">
              <code>
                {`class Club {
  constructor() {
    this.name = "DPC";
    this.established = new Date();
    this.members = [];
  }

  join(student) {
    if (student.passion >= 100) {
      this.members.push(student);
      return "Welcome to the future.";
    }
  }

  execute() {
    while(true) {
      learn();
      build();
      innovate();
    }
  }
}`}
              </code>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Wings Section */}
      <section id="wings" className="py-24 px-8 relative overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold">Active Wings</h2>
            <p className="text-ink/60 dark:text-white/60">Specialized groups focusing on cutting-edge technologies to accelerate your learning.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="grid md:grid-cols-1 gap-8">
            {/* AWS Wing Card */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 p-8 md:p-12 hover:bg-orange-500/20 transition-colors">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Cloud className="w-48 h-48 text-orange-500" />
              </div>
              <div className="relative z-10 max-w-2xl space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-600 dark:text-orange-400 font-mono text-sm font-bold border border-orange-500/30">
                  <Cloud className="w-4 h-4" /> Active Wing
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-bold">AWS Student Builder Group</h3>
                <p className="text-lg text-ink/80 dark:text-white/80 leading-relaxed">
                  Join the official AWS community at DIA. We host cloud computing workshops, study groups for AWS certifications, and provide exclusive resources for students to master the cloud.
                </p>
                <div className="pt-4 flex flex-wrap gap-3 font-mono text-sm">
                  <span className="px-3 py-1 rounded-full border border-ink/10 dark:border-white/10">Cloud Computing</span>
                  <span className="px-3 py-1 rounded-full border border-ink/10 dark:border-white/10">Certifications</span>
                  <span className="px-3 py-1 rounded-full border border-ink/10 dark:border-white/10">DevOps</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Committee & Events Preview */}
      <section id="committee" className="py-24 px-8 bg-black/5 dark:bg-white/5 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="space-y-8">
             <div className="flex items-center gap-4">
                <Users className="w-8 h-8 text-brand-blue" />
                <h2 className="text-3xl font-display font-bold">Core Committee</h2>
             </div>
             <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <h3 className="font-bold text-xl">Executive Panel</h3>
                  <p className="text-ink/60 dark:text-white/60 mt-2 text-sm">The visionaries steering the DIA Programming Club towards the future.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <h3 className="font-bold text-xl">Tech Leads</h3>
                  <p className="text-ink/60 dark:text-white/60 mt-2 text-sm">Driving the AWS Wing and maintaining our open-source infrastructure.</p>
                </div>
             </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="space-y-8">
             <div className="flex items-center gap-4">
                <Calendar className="w-8 h-8 text-brand-purple" />
                <h2 className="text-3xl font-display font-bold">Upcoming Events</h2>
             </div>
             <div className="space-y-4">
                <div className="p-6 rounded-2xl border border-electric/20 bg-electric/5 backdrop-blur-sm group hover:border-electric/50 transition-colors cursor-pointer">
                  <div className="font-mono text-sm text-electric mb-2">Next Week</div>
                  <h3 className="font-bold text-xl group-hover:text-electric transition-colors">AWS Cloud Practitioner Workshop</h3>
                  <p className="text-ink/60 dark:text-white/60 mt-2 text-sm">A comprehensive guide to passing your first AWS certification.</p>
                </div>
             </div>
          </motion.div>
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
