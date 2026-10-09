"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import AstronautVector from "@/components/illustrations/AstronautVector";

export default function RoamingAstronaut() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scrollY = useTransform(scrollYProgress, [0, 1], ["0vh", "82vh"]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed right-2 top-20 z-40 block w-12 sm:right-3 sm:top-24 sm:w-16 md:right-7 md:w-20"
      style={{ y: reduced ? 0 : scrollY }}
      animate={reduced ? undefined : { x: [0, -16, 5, 0], rotate: [-5, 4, -3, -5] }}
      transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
    >
      <AstronautVector className="h-auto w-full drop-shadow-xl" />
      <span className="absolute -bottom-2 -left-2 h-2 w-2 rounded-full bg-[#2454d7]" />
    </motion.div>
  );
}
