"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const GENESIS_VIDEO =
  "https://videos.pexels.com/video-files/852423/852423-hd_1920_1080_30fps.mp4";

export default function Genesis() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"], // Pinning behavior context
  });

  // Parallax for video
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  // Mask Reveal - Tie clipPath directly to scroll
  // Reveal from bottom up or left right? "Peer-to-Peer" text.
  // Let's do a mechanical reveal from the center or bottom.
  // clip-path: inset(0% 0% 0% 0%) is fully visible.
  // Start: inset(100% 0% 0% 0%) -> End: inset(0% 0% 0% 0%)
  const clipPathVal = useTransform(
    scrollYProgress,
    [0.3, 0.7],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
  );

  // Also opacity for smoother feel
  const opacityVal = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">
        {/* Video Background */}
        <motion.div
          className="absolute inset-0 z-0 opacity-40 mix-blend-screen"
          style={{ scale: videoScale }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={GENESIS_VIDEO} type="video/mp4" />
          </video>
        </motion.div>

        <div className="relative z-10 text-center">
          <h2 className="text-[120px] md:text-[200px] font-display font-bold leading-none text-white/10 select-none">
            2008
          </h2>

          <motion.div
            style={{ clipPath: clipPathVal, opacity: opacityVal }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-3xl md:text-5xl font-display font-bold text-white text-center leading-tight">
              A PEER-TO-PEER <br />
              ELECTRONIC CASH SYSTEM.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
