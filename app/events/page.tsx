"use client";

import ScrollReveal from "@/components/motion/ScrollReveal";
import SectionWrapper from "@/components/motion/SectionWrapper";
import { CalendarDays, MapPin, Filter, Search, Clock } from "lucide-react";
import { useState } from "react";

const sampleEvents = [
  { id: 1, title: "DPC Orientation & Welcome Session", date: "Coming Soon", venue: "DIA Campus", type: "General", status: "upcoming", wing: "General", desc: "Introduction to DPC, wings overview, and membership registration." },
  { id: 2, title: "AWS Cloud Practitioner Workshop", date: "Coming Soon", venue: "Online", type: "Workshop", status: "upcoming", wing: "AWS", desc: "Hands-on workshop covering AWS fundamentals and exam prep." },
  { id: 3, title: "Intro to Competitive Programming", date: "Coming Soon", venue: "DIA Lab", type: "Workshop", status: "upcoming", wing: "CP", desc: "Learn problem-solving strategies, time complexity, and basic algorithms." },
];

const filters = ["All", "Workshop", "Contest", "Hackathon", "Meetup", "General"];

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = sampleEvents.filter(
    (e) =>
      (activeFilter === "All" || e.type === activeFilter) &&
      (searchQuery === "" || e.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <main className="pt-20">
      <section className="py-24 px-6 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-electric/5 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-4">Mission Control</p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Events</h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              Workshops, contests, hackathons, and community meetups. Every event is a mission.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-blue transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-colors ${
                  activeFilter === f
                    ? "bg-brand-blue text-white border-brand-blue"
                    : "border-border text-text-muted hover:text-text-primary hover:border-border-hover"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Event cards */}
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event) => (
              <ScrollReveal key={event.id}>
                <div className="p-6 rounded-xl bg-glass-light hover:bg-white/[0.06] transition-all group cursor-pointer h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-4 text-xs font-mono text-text-muted">
                    <CalendarDays className="w-3.5 h-3.5" />
                    <span>{event.date}</span>
                    <span className="mx-1">·</span>
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{event.venue}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-brand-blue transition-colors flex-1">
                    {event.title}
                  </h3>
                  <p className="text-sm text-text-muted mb-4">{event.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface text-text-muted border border-border">
                      {event.wing}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-brand-blue/10 text-brand-blue">
                      {event.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <Clock className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No events found</h3>
            <p className="text-text-muted">Try adjusting your search or filter.</p>
          </div>
        )}

        <p className="text-center text-xs text-text-muted mt-12 font-mono">
          Event dates and details are placeholders. Actual schedule will be announced on official channels.
        </p>
      </section>
    </main>
  );
}
