import ScrollReveal from "@/components/motion/ScrollReveal";
import { Camera } from "lucide-react";

export const metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <main className="pt-20">
      <section className="py-24 px-6 text-center relative">
        <div className="relative z-10 max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-4">Visual Archive</p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Gallery</h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              Workshops, contests, hackathons, and community moments captured.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <ScrollReveal>
          <div className="text-center py-24 border border-dashed border-border rounded-2xl">
            <Camera className="w-16 h-16 text-text-muted mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Gallery coming soon</h3>
            <p className="text-text-muted max-w-md mx-auto">
              As DPC hosts events and activities, photos and highlights will appear here.
            </p>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
