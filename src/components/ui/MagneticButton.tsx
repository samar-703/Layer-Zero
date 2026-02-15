"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { twMerge } from "tailwind-merge";

interface MagneticButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
}

export default function MagneticButton({
  className,
  children,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      ref.current?.getBoundingClientRect() || {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      };

    // Calculate center
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Distance from center
    const x = clientX - centerX;
    const y = clientY - centerY;

    // Only magnetize if within range (simulated via mouse enter/leave on wrapper, but here we constrain movement)
    // Constraint: Max 15px movement
    const xMove = x * 0.2; // Damping
    const yMove = y * 0.2;

    setPosition({ x: xMove, y: yMove });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={twMerge("inline-block", className)}
    >
      <Button {...props}>{children}</Button>
    </motion.div>
  );
}
