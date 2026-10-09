"use client";

import { Cloud, CheckCircle, ExternalLink } from "lucide-react";
import MagneticButton from "@/components/cursor/MagneticButton";

export default function AWSWing() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-orange-500 selection:text-white">
      {/* Hero */}
      <section className="relative pt-32 pb-24 px-8 bg-gradient-to-b from-orange-500/10 to-background overflow-hidden border-b border-orange-500/20">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-500 font-mono text-sm font-bold border border-orange-500/30">
            Part of the AWS Student Builder Groups program
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight">AWS Student Builder Group at DIA</h1>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            Master the cloud. Build the future. Open to every discipline, all years, free.
          </p>
          <div className="pt-8">
             <MagneticButton className="bg-orange-500 text-white font-bold px-8 py-4 shadow-lg shadow-orange-500/20">
               Join this wing
             </MagneticButton>
          </div>
        </div>
        {/* Abstract Cloud Motif */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl opacity-5 pointer-events-none flex justify-center items-center">
           <Cloud className="w-full h-full text-orange-500" />
        </div>
      </section>

      <section className="py-24 px-8 max-w-6xl mx-auto space-y-24">
        {/* Programs */}
        <div className="space-y-8">
          <h2 className="text-3xl font-display font-bold flex items-center gap-3">
             <span className="w-8 h-1 bg-orange-500 rounded-full"></span> Programs
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
             {["Hands-on workshops", "Build sessions", "Certification study circles", "Tech talks", "Hackathons"].map((program) => (
                <div key={program} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-colors">
                  <h3 className="font-bold text-lg">{program}</h3>
                </div>
             ))}
          </div>
        </div>

        {/* Learning Roadmap */}
        <div className="space-y-8">
          <h2 className="text-3xl font-display font-bold flex items-center gap-3">
             <span className="w-8 h-1 bg-orange-500 rounded-full"></span> Learning Roadmap
          </h2>
          <div className="p-8 rounded-3xl bg-black/20 border border-white/5 relative">
             <div className="absolute left-12 top-8 bottom-8 w-0.5 bg-orange-500/30" />
             <div className="space-y-8">
                {["Cloud basics", "Compute & Networking", "Storage & Databases", "Build and deploy"].map((track, i) => (
                   <div key={track} className="relative flex items-center gap-6 pl-4 cursor-pointer group">
                      <div className="w-6 h-6 rounded-full bg-orange-500/20 border-2 border-orange-500 flex items-center justify-center z-10 group-hover:bg-orange-500 transition-colors">
                        <CheckCircle className="w-3 h-3 text-white opacity-0 group-hover:opacity-100" />
                      </div>
                      <div className="flex-1 bg-white/5 border border-white/10 p-4 rounded-xl flex justify-between items-center group-hover:bg-white/10 transition-colors">
                         <span className="font-bold">{track}</span>
                         <ExternalLink className="w-4 h-4 opacity-50" />
                      </div>
                   </div>
                ))}
             </div>
             <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm opacity-60">
                Roadmap tracks link to official AWS Skill Builder resources.
             </div>
          </div>
        </div>

        {/* Leader & Team */}
        <div className="space-y-8">
          <h2 className="text-3xl font-display font-bold flex items-center gap-3">
             <span className="w-8 h-1 bg-orange-500 rounded-full"></span> Wing Leader
          </h2>
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 max-w-md">
             <div className="w-16 h-16 rounded-full bg-orange-500/20 border border-orange-500 flex items-center justify-center text-orange-500 text-xl font-bold mb-4">
                R
             </div>
             <h3 className="font-bold text-2xl">Ratul Hasan Ruhan</h3>
             <p className="opacity-70 text-sm mt-1">AWS Student Builder Group Leader at DIA</p>
          </div>
        </div>
      </section>

      <footer className="py-12 px-8 border-t border-white/10 text-center font-mono text-sm opacity-50 bg-black/20">
         <p>Student community; not an official AWS site; AWS marks belong to Amazon.</p>
      </footer>
    </main>
  );
}
