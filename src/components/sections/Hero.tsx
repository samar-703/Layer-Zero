"use client";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useState } from "react";

const HERO_VIDEO =
  "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_24fps.mp4";

const SplitText = ({ children }: { children: string }) => {
  return (
    <span className="inline-block overflow-hidden">
      {children.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.33, 1, 0.68, 1],
            delay: 2.5 + i * 0.03, // Delay after loader
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-background"
    >
      {/* Video Background */}
      <motion.div className="absolute inset-0 z-0" style={{ scale }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      <div className="relative z-10 h-full flex items-center px-4 md:px-20">
        <motion.div className="max-w-5xl" style={{ y, opacity }}>
          <h1 className="text-6xl md:text-9xl font-display font-bold leading-[0.9] tracking-tighter text-white flex flex-col items-start select-none">
            <SplitText>MONEY</SplitText>
            <SplitText>WAS NEVER</SplitText>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5, duration: 1 }}
              className="text-white/50 italic font-serif"
            >
              NEUTRAL.
            </motion.span>
          </h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 3.8, duration: 1.5, ease: "easeInOut" }}
            className="mt-12 w-full h-[1px] bg-gradient-to-r from-accent-gold/50 to-transparent origin-left"
          />
        </motion.div>
      </div>
    </div>
  );
}
