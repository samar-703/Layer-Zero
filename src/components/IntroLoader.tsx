"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function IntroLoader({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [isPresent, setIsPresent] = useState(true);

  useEffect(() => {
    // Total duration: 2.5s
    const timer = setTimeout(() => {
      setIsPresent(false);
      setTimeout(onComplete, 1000); // Allow exit animation to finish before notifying parent if needed
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isPresent && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", // Wipe up reveal
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-white font-display font-bold text-4xl md:text-6xl tracking-tighter"
          >
            LAYER ZERO
          </motion.div>

          <div className="w-64 h-[1px] bg-white/10 mt-8 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 bottom-0 bg-accent-gold w-full"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.4 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
