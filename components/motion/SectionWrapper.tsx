"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  label: string;
  number?: string;
  className?: string;
}

export default function SectionWrapper({ children, label, number, className = "" }: Props) {
  return (
    <section className={`relative py-24 md:py-32 px-6 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Mission label */}
        <div className="flex items-center gap-3 mb-4 font-mono text-xs text-text-muted tracking-widest uppercase">
          {number && (
            <span className="text-brand-blue">[{number}]</span>
          )}
          <span>{label}</span>
          <span className="flex-1 h-px bg-border" />
        </div>
        {children}
      </div>
    </section>
  );
}
