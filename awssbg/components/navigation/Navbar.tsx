"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between border border-[#e5e7eb] bg-white/90 px-4 shadow-[0_12px_35px_rgba(0,0,0,0.06)] backdrop-blur-md sm:px-5">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)} aria-label="AWS SBG at DIA">
          <Image src="/brand/awssbg-mark.svg" alt="AWS SBG" width={32} height={32} className="h-8 w-8" priority />
          <span className="font-bold tracking-tight">AWS Student Builder Group · DIA</span>
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          <Link href="#about" className="text-sm font-medium text-[#667085] hover:text-[#111827]">About</Link>
          <Link href="#activities" className="text-sm font-medium text-[#667085] hover:text-[#111827]">Activities</Link>
          <Link href="#committee" className="text-sm font-medium text-[#667085] hover:text-[#111827]">Committee</Link>
          <Link href="#contact" className="text-sm font-medium text-[#667085] hover:text-[#111827]">Join</Link>
          <a href="https://diapc.dev" className="text-sm font-semibold text-[#111827] border-b-2 border-[#ff9900]">
            Back to DPC
          </a>
        </div>
        <button type="button" className="p-2 text-[#111827] md:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {open && (
        <div className="mx-auto mt-2 max-w-6xl border border-[#e5e7eb] bg-white p-3 shadow-lg md:hidden">
          <Link href="#about" onClick={() => setOpen(false)} className="block px-3 py-3 text-sm font-medium text-[#667085] hover:bg-[#f3f4f6] hover:text-[#111827]">About</Link>
          <Link href="#activities" onClick={() => setOpen(false)} className="block px-3 py-3 text-sm font-medium text-[#667085] hover:bg-[#f3f4f6] hover:text-[#111827]">Activities</Link>
          <Link href="#committee" onClick={() => setOpen(false)} className="block px-3 py-3 text-sm font-medium text-[#667085] hover:bg-[#f3f4f6] hover:text-[#111827]">Committee</Link>
          <Link href="#contact" onClick={() => setOpen(false)} className="block px-3 py-3 text-sm font-medium text-[#667085] hover:bg-[#f3f4f6] hover:text-[#111827]">Join</Link>
          <a href="https://diapc.dev" className="mt-2 block px-3 py-3 text-sm font-semibold text-[#111827]">Back to DPC</a>
        </div>
      )}
    </nav>
  );
}
