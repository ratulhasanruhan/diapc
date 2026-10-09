"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function OrbitalBackground() {
  const reduced = useReducedMotion();
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="orbital-orb orbital-orb-one" />
      <div className="orbital-orb orbital-orb-two" />
      <motion.div
        className="orbital-ring orbital-ring-one"
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="orbital-ring orbital-ring-two"
        animate={reduced ? undefined : { rotate: -360 }}
        transition={{ duration: 105, repeat: Infinity, ease: "linear" }}
      />
      <span className="orbital-star orbital-star-one" />
      <span className="orbital-star orbital-star-two" />
      <span className="orbital-star orbital-star-three" />
    </div>
  );
}
