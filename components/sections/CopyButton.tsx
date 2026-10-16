"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** Small "copy to clipboard" button for brand text and colour codes. */
export default function CopyButton({ value, label = "Copy" }: { value: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setDone(true);
          setTimeout(() => setDone(false), 1800);
        } catch {
          /* clipboard unavailable: text stays selectable */
        }
      }}
      className="inline-flex items-center gap-1.5 border border-line bg-white px-2.5 py-1 text-xs font-bold text-brand-blue transition-colors hover:border-brand-blue hover:bg-[#eef2ff]"
    >
      {done ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
      <span aria-live="polite">{done ? "Copied" : label}</span>
    </button>
  );
}
