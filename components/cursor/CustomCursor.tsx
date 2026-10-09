"use client";

import { useEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);

  const springX = useSpring(0, { stiffness: 300, damping: 28 });
  const springY = useSpring(0, { stiffness: 300, damping: 28 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorDot.current) {
        cursorDot.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      springX.set(e.clientX);
      springY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [springX, springY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 hidden md:block">
      <div
        ref={cursorDot}
        className="absolute left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue"
      />
      <motion.div
        className="absolute left-0 top-0 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-purple"
        style={{
          x: springX,
          y: springY,
        }}
      />
    </div>
  );
}
