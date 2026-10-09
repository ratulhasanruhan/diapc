"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Explore", href: "/#universe" },
  { label: "Events", href: "/events" },
  { label: "Community", href: "/crew" },
  { label: "About", href: "/about" },
];

const wingLinks = [
  { label: "All wings", href: "/wings" },
  { label: "AWS Student Builders", href: "/aws" },
  { label: "Competitive Programming", href: "/join?wing=competitive-programming" },
  { label: "AI & Data Science", href: "/join?wing=ai-ml" },
  { label: "Web & Mobile Dev", href: "/join?wing=web-app-dev" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between border border-[#dfe4ee] bg-[#fbfaf7]/90 px-4 shadow-[0_12px_35px_rgba(23,33,61,0.08)] backdrop-blur-md sm:px-5">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Image src="/brand/modern_logo.png" alt="DPC logo" width={142} height={48} className="h-10 w-auto object-contain" priority />
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.slice(0, 1).map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-[#667085] transition-colors hover:text-[#2454d7]">
              {link.label}
            </Link>
          ))}
          <div className="group relative">
            <Link href="/wings" className="inline-flex items-center gap-1 text-sm font-medium text-[#667085] transition-colors hover:text-[#2454d7]">
              Wings <span className="text-[10px] transition-transform group-hover:rotate-180">▾</span>
            </Link>
            <div className="invisible absolute right-1/2 top-full z-50 w-64 translate-x-1/2 pt-4 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="border border-[#dfe4ee] bg-white p-2 shadow-[0_18px_45px_rgba(23,33,61,0.14)]">
                <p className="px-3 pb-2 pt-1 font-mono text-[10px] uppercase tracking-widest text-[#98a2b3]">Choose an orbit</p>
                {wingLinks.map((wing) => <Link key={wing.href} href={wing.href} className="block px-3 py-2.5 text-sm text-[#667085] hover:bg-[#eef2ff] hover:text-[#2454d7]">{wing.label}</Link>)}
              </div>
            </div>
          </div>
          {navLinks.slice(1).map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-[#667085] transition-colors hover:text-[#2454d7]">
              {link.label}
            </Link>
          ))}
          <Link href="/join" className="bg-[#2454d7] px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
            Join the mission
          </Link>
        </div>

        <button type="button" className="p-2 text-[#17213d] md:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {open && (
        <div className="mx-auto mt-2 max-w-6xl border border-[#dfe4ee] bg-[#fbfaf7] p-3 shadow-lg md:hidden">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block px-3 py-3 text-sm font-medium text-[#667085] hover:bg-[#eef2ff] hover:text-[#2454d7]">
              {link.label}
            </Link>
          ))}
          <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-widest text-[#98a2b3]">Wings</p>
          {wingLinks.map((wing) => (
            <Link key={wing.href} href={wing.href} onClick={() => setOpen(false)} className="block px-3 py-2 text-sm font-medium text-[#667085] hover:bg-[#eef2ff] hover:text-[#2454d7]">
              {wing.label}
            </Link>
          ))}
          <Link href="/join" onClick={() => setOpen(false)} className="mt-2 block bg-[#2454d7] px-3 py-3 text-center text-sm font-semibold text-white">
            Join the mission
          </Link>
        </div>
      )}
    </nav>
  );
}
