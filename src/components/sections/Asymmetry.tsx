"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Asymmetry() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const xLeft = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const yRight = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-background flex flex-col md:flex-row overflow-hidden relative border-t border-white/5"
    >
      {/* Left Panel: 40% */}
      <div className="w-full md:w-[40%] flex items-center justify-center p-12 border-r border-white/5 relative z-10">
        <motion.div style={{ x: xLeft }} className="flex flex-col gap-6">
          <h2 className="text-5xl md:text-8xl font-display font-bold leading-none tracking-tighter text-white">
            TRUST <br />
            IS <br />
            <span className="text-accent-gold">DECAY.</span>
          </h2>
          <p className="font-mono text-sm tracking-widest text-white/60 max-w-xs">
            CENTRALIZATION. INFLATION. <br />
            SYSTEMIC FRAGILITY.
          </p>
        </motion.div>
      </div>

      {/* Right Panel: 60% */}
      <div className="w-full md:w-[60%] flex items-center justify-center relative bg-white/[0.02]">
        <motion.div
          style={{ y: yRight }}
          className="w-full max-w-lg aspect-square relative"
        >
          {/* Animated Graph SVG */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full stroke-white/20 stroke-[0.5] fill-none"
          >
            {/* Grid Lines */}
            <line x1="10" y1="90" x2="90" y2="90" />
            <line x1="10" y1="10" x2="10" y2="90" />

            {/* The Graph Line */}
            <motion.path
              d="M10 90 C 30 80, 50 85, 70 40 S 90 20, 90 10"
              className="stroke-accent-cyan stroke-[1]"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              viewport={{ once: true }}
            />

            {/* Animated Data Points */}
            <motion.circle
              cx="70"
              cy="40"
              r="1.5"
              className="fill-accent-gold"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            />
            <motion.circle
              cx="90"
              cy="10"
              r="1.5"
              className="fill-accent-gold"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            />
          </svg>

          <div className="absolute top-10 right-10 font-mono text-xs text-accent-cyan">
            // CPI_INDEX_FAILURE
          </div>
        </motion.div>
      </div>
    </section>
  );
}
