"use client";

import Link from "next/link";
import { Cloud, Terminal, MonitorSmartphone, Target, Shield, Rocket } from "lucide-react";

export default function WingsOverview() {
  return (
    <main className="min-h-screen bg-background text-foreground p-8 pt-32 selection:bg-electric selection:text-white">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="space-y-4 text-center">
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight">The DPC System</h1>
          <p className="text-xl opacity-70 font-mono">Explore our active wings and proposed orbitals.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Active Wing */}
          <Link href="/wings/aws" className="group block">
            <div className="h-full bg-gradient-to-br from-orange-500/20 to-transparent border border-orange-500/30 rounded-3xl p-8 hover:bg-orange-500/30 transition-colors relative overflow-hidden">
              <Cloud className="absolute top-8 right-8 w-16 h-16 text-orange-500 opacity-20 group-hover:opacity-100 transition-opacity" />
              <div className="inline-block px-3 py-1 bg-orange-500 text-white text-xs font-bold font-mono rounded-full mb-6">ACTIVE</div>
              <h2 className="text-2xl font-bold font-display mb-2">AWS Student Builder Group</h2>
              <p className="opacity-80">Master the cloud. Build the future.</p>
            </div>
          </Link>

          {/* Proposed Wings */}
          <div className="h-full bg-white/5 border border-dashed border-white/20 rounded-3xl p-8 relative overflow-hidden">
             <Terminal className="absolute top-8 right-8 w-16 h-16 text-blue-500 opacity-10" />
             <div className="inline-block px-3 py-1 bg-white/10 text-white/50 text-xs font-bold font-mono rounded-full mb-6">PROPOSED</div>
             <h2 className="text-2xl font-bold font-display mb-2">Competitive Programming</h2>
             <p className="opacity-60 mb-6">Algorithmic thinking and problem solving.</p>
             <Link href="/join?wing=competitive-programming" className="text-electric hover:underline text-sm font-bold">Be a founding member →</Link>
          </div>

          <div className="h-full bg-white/5 border border-dashed border-white/20 rounded-3xl p-8 relative overflow-hidden">
             <MonitorSmartphone className="absolute top-8 right-8 w-16 h-16 text-purple-500 opacity-10" />
             <div className="inline-block px-3 py-1 bg-white/10 text-white/50 text-xs font-bold font-mono rounded-full mb-6">PROPOSED</div>
             <h2 className="text-2xl font-bold font-display mb-2">Web & App Development</h2>
             <p className="opacity-60 mb-6">Build products that scale.</p>
             <Link href="/join?wing=web-app-dev" className="text-electric hover:underline text-sm font-bold">Be a founding member →</Link>
          </div>

          {/* Propose a new wing */}
          <div className="h-full bg-electric/5 border border-electric/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:bg-electric/10 transition-colors cursor-pointer">
             <div className="w-12 h-12 rounded-full bg-electric/20 flex items-center justify-center mb-4">
                <span className="text-electric text-2xl font-bold">+</span>
             </div>
             <h2 className="text-xl font-bold font-display mb-2">Propose a new wing</h2>
             <p className="opacity-60 text-sm">Have an idea? Gather 5 members and start a new orbital.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
