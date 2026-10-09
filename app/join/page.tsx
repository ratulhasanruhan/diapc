"use client";

import ScrollReveal from "@/components/motion/ScrollReveal";
import { Rocket, ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const wings = [
  { id: "aws", label: "AWS Student Builders" },
  { id: "competitive-programming", label: "Competitive Programming" },
  { id: "ai-ml", label: "AI & Data Science" },
  { id: "web-app-dev", label: "Web & Mobile Dev" },
  { id: "cybersecurity", label: "Cybersecurity" },
  { id: "research", label: "Research & Innovation" },
];

const benefits = [
  "Access to workshops, bootcamps, and study circles",
  "Mentorship from experienced developers",
  "Compete in national and international contests",
  "Build real projects for your portfolio",
  "AWS certification prep and cloud resources",
  "Community of like-minded builders",
];

export default function JoinPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    institution: "DIA",
    year: "",
    experience: "",
    wings: [] as string[],
    goals: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleWingToggle = (wingId: string) => {
    setFormData((prev) => ({
      ...prev,
      wings: prev.wings.includes(wingId)
        ? prev.wings.filter((w) => w !== wingId)
        : [...prev.wings, wingId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDoc(collection(db, "applications"), {
        ...formData,
        createdAt: serverTimestamp(),
        status: "pending",
      });
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-success mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Application received!</h1>
          <p className="text-text-secondary mb-8">
            Welcome to the DPC universe, explorer. We&apos;ll review your application and reach out soon.
          </p>
          <code className="text-xs text-text-muted font-mono block">= new instance of future();</code>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20">
      <section className="py-24 px-6 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/5 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <ScrollReveal>
            <Rocket className="w-12 h-12 text-brand-blue mx-auto mb-4" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Become an <span className="text-gradient">Explorer</span>
            </h1>
            <p className="text-xl text-text-secondary">
              Open to all currently enrolled DIA students, regardless of program, year, or skill level.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Benefits */}
          <div className="lg:col-span-2">
            <ScrollReveal>
              <h2 className="text-2xl font-bold mb-6">What you get</h2>
              <div className="space-y-4">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-brand-blue mt-1 shrink-0" />
                    <span className="text-text-secondary text-sm">{b}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <ScrollReveal>
              <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-glass-light space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-text-muted mb-2 uppercase tracking-wider">Full Name *</label>
                    <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-sm focus:border-brand-blue focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-text-muted mb-2 uppercase tracking-wider">Email *</label>
                    <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-sm focus:border-brand-blue focus:outline-none transition-colors" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-text-muted mb-2 uppercase tracking-wider">Phone</label>
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-sm focus:border-brand-blue focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-text-muted mb-2 uppercase tracking-wider">Year / Class</label>
                    <input type="text" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-sm focus:border-brand-blue focus:outline-none transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-text-muted mb-2 uppercase tracking-wider">Experience Level</label>
                  <select value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-sm focus:border-brand-blue focus:outline-none transition-colors">
                    <option value="">Select...</option>
                    <option value="beginner">Beginner — Just starting out</option>
                    <option value="intermediate">Intermediate — Some projects done</option>
                    <option value="advanced">Advanced — Building regularly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-text-muted mb-3 uppercase tracking-wider">Interested Wings</label>
                  <div className="flex flex-wrap gap-2">
                    {wings.map((w) => (
                      <button
                        key={w.id}
                        type="button"
                        onClick={() => handleWingToggle(w.id)}
                        className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-colors ${
                          formData.wings.includes(w.id)
                            ? "bg-brand-blue text-white border-brand-blue"
                            : "border-border text-text-muted hover:text-text-primary"
                        }`}
                      >
                        {w.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-text-muted mb-2 uppercase tracking-wider">What do you hope to achieve?</label>
                  <textarea value={formData.goals} onChange={(e) => setFormData({ ...formData, goals: e.target.value })} rows={3} className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-sm focus:border-brand-blue focus:outline-none transition-colors resize-none" />
                </div>

                <p className="text-[10px] text-text-muted">
                  By submitting, you agree to the DPC Code of Conduct and Constitution. Your data is stored securely and used only for club purposes.
                </p>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-brand-blue text-white font-bold rounded-lg hover:bg-brand-blue/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting ? "Submitting..." : "Launch Application"} <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
