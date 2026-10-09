"use client";

import { Rocket, Shield } from "lucide-react";
import Link from "next/link";
import MagneticButton from "@/components/cursor/MagneticButton";

export default function Collaborate() {
  return (
    <main className="min-h-screen bg-background text-foreground p-8 pt-32">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-6">
           <Rocket className="w-16 h-16 text-brand-purple mx-auto" />
           <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight">Docking Bay</h1>
           <p className="text-xl opacity-70 max-w-2xl mx-auto">
             Build something with us. DPC is a space station welcoming allied fleets. Co-host events, sponsor us, or launch a joint mission.
           </p>
           <div className="pt-4 flex justify-center gap-4">
              <MagneticButton className="bg-electric text-white px-6 py-3 font-bold">Request docking</MagneticButton>
              <MagneticButton className="bg-white/5 border border-white/10 px-6 py-3 font-bold hover:bg-white/10">See allied fleet</MagneticButton>
           </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 pt-12">
           {[
             "Co-host an event", "Sponsor", "Speaker or workshop host", 
             "Hackathon partner", "Venue partner", "Project collaboration"
           ].map(type => (
             <div key={type} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-purple/50 transition-colors cursor-pointer flex justify-between items-center group">
                <span className="font-bold">{type}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-purple font-mono text-sm">Select port →</span>
             </div>
           ))}
        </div>

        <div className="bg-brand-blue/10 border border-brand-blue/20 p-8 rounded-3xl mt-16 space-y-4">
           <div className="flex items-center gap-3 text-brand-blue font-bold font-mono">
             <Shield className="w-5 h-5" /> Collaboration Principles
           </div>
           <p className="opacity-80">
             We ensure all collaborations follow DIA policies. We believe in mutual credit and open learning. Sponsors provide resources but do not control club decisions.
           </p>
        </div>
      </div>
    </main>
  );
}
