"use client";

import ScrollReveal from "@/components/motion/ScrollReveal";
import { Mail, MapPin, MessageCircle, ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const faqs = [
  { q: "Who can join DPC?", a: "Any currently enrolled student at Daffodil International Academy, regardless of program, year, or experience level." },
  { q: "Is there a membership fee?", a: "No. DPC membership is free. Some specific activities or events may have a fee, which will be communicated in advance." },
  { q: "Do I need programming experience?", a: "No! DPC welcomes beginners. We have learning paths and mentorship for every skill level." },
  { q: "What is a wing?", a: "A wing is a focused sub-community within DPC dedicated to a specific domain like cloud computing, competitive programming, or AI." },
  { q: "How can my organization collaborate with DPC?", a: "Visit our Docking Bay page to submit a collaboration request. We welcome partnerships with clubs, universities, companies, and communities." },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", type: "general", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDoc(collection(db, "contacts"), { ...formData, createdAt: serverTimestamp() });
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="pt-20">
      <section className="py-24 px-6 text-center relative">
        <div className="relative z-10 max-w-3xl mx-auto">
          <ScrollReveal>
            <Mail className="w-12 h-12 text-brand-blue mx-auto mb-4" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Contact</h1>
            <p className="text-xl text-text-secondary">
              Got questions? Reach out.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div>
            <ScrollReveal>
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4 p-5 rounded-xl bg-glass-light">
                  <MapPin className="w-5 h-5 text-brand-blue mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-bold text-sm">Location</h3>
                    <p className="text-sm text-text-muted">Daffodil International Academy, Dhaka, Bangladesh</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 rounded-xl bg-glass-light">
                  <Mail className="w-5 h-5 text-brand-blue mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-bold text-sm">Email</h3>
                    <p className="text-sm text-text-muted">TODO: Official email to be configured</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* FAQ */}
            <ScrollReveal>
              <h2 className="text-2xl font-bold mb-6" id="faq">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div key={i} className="rounded-xl bg-glass-light overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4"
                    >
                      <span className="font-medium text-sm">{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 shrink-0 text-text-muted transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-5">
                        <p className="text-sm text-text-muted leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Contact form */}
          <ScrollReveal>
            {submitted ? (
              <div className="p-8 rounded-2xl bg-glass-light text-center">
                <MessageCircle className="w-12 h-12 text-success mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Message sent!</h3>
                <p className="text-text-muted text-sm">We&apos;ll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-glass-light space-y-6">
                <h2 className="text-2xl font-bold">Send a message</h2>
                <div>
                  <label className="block text-xs font-mono text-text-muted mb-2 uppercase tracking-wider">Name *</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-sm focus:border-brand-blue focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-text-muted mb-2 uppercase tracking-wider">Email *</label>
                  <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-sm focus:border-brand-blue focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-text-muted mb-2 uppercase tracking-wider">Type</label>
                  <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-sm focus:border-brand-blue focus:outline-none transition-colors">
                    <option value="general">General inquiry</option>
                    <option value="partnership">Partnership inquiry</option>
                    <option value="event">Event collaboration</option>
                    <option value="membership">Membership question</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-text-muted mb-2 uppercase tracking-wider">Message *</label>
                  <textarea required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={5} className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-sm focus:border-brand-blue focus:outline-none transition-colors resize-none" />
                </div>
                <button type="submit" disabled={submitting} className="w-full py-3 bg-brand-blue text-white font-bold rounded-lg hover:bg-brand-blue/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                  {submitting ? "Sending..." : "Send Message"} <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
