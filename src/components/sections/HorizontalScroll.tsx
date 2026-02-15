"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const cards = [
  { title: "DECENTRALIZATION", subtitle: "NO SINGLE POINT OF FAILURE" },
  { title: "TRANSPARENCY", subtitle: "VERIFIABLE ON-CHAIN" },
  { title: "IMMUTABILITY", subtitle: "CODE IS LAW" },
  { title: "PERMISSIONLESS", subtitle: "OPEN TO ALL" },
];

export default function HorizontalScroll() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-background">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex gap-20 pl-20 transition-transform ease-out"
        >
          {cards.map((card, i) => (
            <div
              key={i}
              className="group relative h-[60vh] w-[400px] md:w-[600px] flex-shrink-0 flex flex-col justify-end p-12 border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden hover:border-accent-gold/50 transition-colors duration-500 perspective-1000"
            >
              {/* 3D Tilt Effect on Hover would go here, simplified for clean code */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />

              <div className="relative z-10 transform transition-transform duration-500 group-hover:-translate-y-4">
                <h3 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
                  {card.title}
                </h3>
                <p className="font-mono text-sm tracking-widest text-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  // {card.subtitle}
                </p>
              </div>

              {/* Decorative Number */}
              <div className="absolute top-4 right-4 font-mono text-6xl text-white/5 font-bold">
                0{i + 1}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
