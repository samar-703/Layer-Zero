"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Navigation() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-accent-gold z-50 origin-left"
        style={{ scaleX }}
      />
      <nav className="fixed top-0 w-full z-40 p-6 mix-blend-difference text-white flex justify-between items-center pointer-events-none">
        <div className="text-xl font-display font-bold tracking-tighter uppercase">
          Layer Zero
        </div>
        <div className="hidden md:flex gap-8 font-mono text-xs opacity-60">
          <span>// DECENTRALIZED</span>
          <span>// PERMISSIONLESS</span>
          <span>// IMMUTABLE</span>
        </div>
      </nav>
    </>
  );
}
