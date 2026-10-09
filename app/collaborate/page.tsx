"use client";

import ScrollReveal from "@/components/motion/ScrollReveal";
import { Rocket, Shield, Handshake, ArrowRight } from "lucide-react";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const collabTypes = [
  "Co-host an event",
  "Sponsor",
  "Speaker or workshop host",
  "Hackathon or contest partner",
  "Media partner",
  "Venue or resource partner",
  "Project or open-source collaboration",
  "Internship, mentorship or job opportunities",
  "Inter-club exchange",
];

export default function CollaboratePage() {
  const [formData, setFormData] = useState({
    orgName: "",
    orgType: "",
    contactName: "",
    email: "",
    collabTypes: [] as string[],
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const toggleType = (t: string) => {
    setFormData((prev) => ({
      ...prev,
      collabTypes: prev.collabTypes.includes(t)
        ? prev.collabTypes.filter((x) => x !== t)
        : [...prev.collabTypes, t],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDoc(collection(db, "collaborations"), {
        ...formData,
        createdAt: serverTimestamp(),
        status: "received",
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
          <Handshake className="w-16 h-16 text-brand-magenta mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Docking request received!</h1>
          <p className="text-text-secondary">We&apos;ll review your proposal and get back to you within a few days.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20">
      <section className="py-24 px-6 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-magenta/5 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <ScrollReveal>
            <Rocket className="w-12 h-12 text-brand-magenta mx-auto mb-4" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Docking Bay</h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              Build something with us. We welcome partnerships with clubs, universities, 
              companies, and communities.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-24">
        <ScrollReveal>
          <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-glass-light space-y-6">
            <h2 className="text-2xl font-bold">Request collaboration</h2>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-text-muted mb-2 uppercase tracking-wider">Organization Name *</label>
                <input required type="text" value={formData.orgName} onChange={(e) => setFormData({ ...formData, orgName: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-sm focus:border-brand-magenta focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-mono text-text-muted mb-2 uppercase tracking-wider">Type</label>
                <select value={formData.orgType} onChange={(e) => setFormData({ ...formData, orgType: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-sm focus:border-brand-magenta focus:outline-none transition-colors">
                  <option value="">Select...</option>
                  <option value="club">Student Club</option>
                  <option value="university">University</option>
                  <option value="company">Company</option>
                  <option value="community">Community</option>
                  <option value="individual">Individual</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-text-muted mb-2 uppercase tracking-wider">Contact Person *</label>
                <input required type="text" value={formData.contactName} onChange={(e) => setFormData({ ...formData, contactName: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-sm focus:border-brand-magenta focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-mono text-text-muted mb-2 uppercase tracking-wider">Email *</label>
                <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-sm focus:border-brand-magenta focus:outline-none transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-text-muted mb-3 uppercase tracking-wider">Collaboration Type</label>
              <div className="flex flex-wrap gap-2">
                {collabTypes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleType(t)}
                    className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                      formData.collabTypes.includes(t)
                        ? "bg-brand-magenta text-white border-brand-magenta"
                        : "border-border text-text-muted hover:text-text-primary"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-text-muted mb-2 uppercase tracking-wider">Tell us about the collaboration</label>
              <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-sm focus:border-brand-magenta focus:outline-none transition-colors resize-none" />
            </div>

            <button type="submit" disabled={submitting} className="w-full py-3 bg-gradient-to-r from-brand-blue to-brand-magenta text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2">
              {submitting ? "Submitting..." : "Request Docking"} <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </ScrollReveal>

        <ScrollReveal className="mt-12">
          <div className="p-6 rounded-xl bg-brand-blue/5 border border-brand-blue/20 flex items-start gap-4">
            <Shield className="w-5 h-5 text-brand-blue mt-1 shrink-0" />
            <div>
              <h3 className="font-bold text-sm mb-1">Collaboration Principles</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                All collaborations follow DIA policies. We ensure mutual credit, respect brand guidelines,
                and never allow sponsors to control club decisions. See Article 9 of our Constitution.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
