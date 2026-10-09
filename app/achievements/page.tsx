"use client";

import { Target } from "lucide-react";

export default function Achievements() {
  return (
    <main className="min-h-screen bg-background text-foreground p-8 pt-32">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-6">
           <Target className="w-16 h-16 text-electric mx-auto" />
           <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight">Hall of Missions</h1>
           <p className="text-xl opacity-70 max-w-2xl mx-auto">
             Our track record. Real, verified achievements from hackathons to certifications.
           </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           {/* Sample Patches */}
           <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-transparent border-2 border-blue-500/50 rounded-full flex flex-col items-center justify-center text-center p-8 relative overflow-hidden group hover:scale-105 transition-transform cursor-pointer">
              <div className="absolute inset-2 border border-dashed border-blue-500/30 rounded-full" />
              <div className="font-mono text-blue-400 font-bold tracking-widest text-sm mb-2">HACKATHON</div>
              <h2 className="text-2xl font-bold font-display">1st Place</h2>
              <p className="text-sm opacity-80 mt-2">National Hackathon 2026</p>
              <div className="absolute bottom-8 px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/30 opacity-0 group-hover:opacity-100 transition-opacity">VERIFIED</div>
           </div>

           <div className="aspect-square bg-gradient-to-br from-orange-500/20 to-transparent border-2 border-orange-500/50 rounded-full flex flex-col items-center justify-center text-center p-8 relative overflow-hidden group hover:scale-105 transition-transform cursor-pointer">
              <div className="absolute inset-2 border border-dashed border-orange-500/30 rounded-full" />
              <div className="font-mono text-orange-400 font-bold tracking-widest text-sm mb-2">CERTIFICATION</div>
              <h2 className="text-2xl font-bold font-display">Certified</h2>
              <p className="text-sm opacity-80 mt-2">AWS Solutions Architect</p>
              <div className="absolute bottom-8 px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/30 opacity-0 group-hover:opacity-100 transition-opacity">VERIFIED</div>
           </div>

           {/* Add Yours */}
           <div className="aspect-square bg-white/5 border border-dashed border-white/20 rounded-full flex flex-col items-center justify-center text-center p-8 hover:bg-white/10 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4 text-2xl font-bold">+</div>
              <h2 className="text-xl font-bold">Add yours</h2>
              <p className="text-xs opacity-50 mt-2">Submit your mission for verification.</p>
           </div>
        </div>
      </div>
    </main>
  );
}
