import ScrollReveal from "@/components/motion/ScrollReveal";
import { Users, UserCog } from "lucide-react";

export const metadata = { title: "Crew" };

const executiveCouncil = [
  { name: "Ratul Hasan Ruhan", role: "Founding Convener", extra: "AWS Student Builder Group Leader at DIA", initials: "RH" },
];

export default function CrewPage() {
  return (
    <main className="pt-20">
      <section className="py-24 px-6 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-magenta/5 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-4">The People</p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Crew</h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              The students who lead, organize, and build DPC.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <ScrollReveal>
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <UserCog className="w-5 h-5 text-brand-blue" /> Executive Committee
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {executiveCouncil.map((member, i) => (
            <ScrollReveal key={member.name} delay={i * 0.06}>
              <div className="p-6 rounded-xl bg-glass-light hover:bg-white/[0.06] transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-blue to-brand-magenta flex items-center justify-center text-white font-bold">
                    {member.initials}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-sm text-brand-blue">{member.role}</p>
                  </div>
                </div>
                {member.extra && (
                  <p className="text-xs text-text-muted font-mono">{member.extra}</p>
                )}
              </div>
            </ScrollReveal>
          ))}

          {/* Empty slots for other positions */}
          {["President", "Vice President", "General Secretary", "Joint Secretary", "Treasurer", "Head of Wings"].map((role) => (
            <ScrollReveal key={role}>
              <div className="p-6 rounded-xl border border-dashed border-border flex flex-col items-center justify-center text-center min-h-[140px]">
                <Users className="w-6 h-6 text-text-muted mb-2" />
                <p className="font-medium text-sm text-text-muted">{role}</p>
                <p className="text-[10px] text-text-muted mt-1 font-mono">To be appointed</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <p className="text-center text-xs text-text-muted font-mono">
          Committee positions are pending the first election per Article 6 of the DPC Constitution.
        </p>
      </section>
    </main>
  );
}
