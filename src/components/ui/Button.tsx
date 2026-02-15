import { motion, HTMLMotionProps } from "framer-motion";
import { forwardRef, ReactNode } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "outline";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={twMerge(
          clsx(
            "px-6 py-3 rounded-none font-mono text-sm uppercase tracking-widest transition-colors duration-300 relative overflow-hidden group",
            variant === "primary" &&
              "bg-foreground text-background hover:bg-accent-gold hover:text-black",
            variant === "outline" &&
              "border border-white/20 hover:border-accent-gold text-white hover:text-accent-gold",
            className,
          ),
        )}
        {...props}
      >
        <span className="relative z-10">{props.children as ReactNode}</span>
        {variant === "primary" && (
          <div className="absolute inset-0 bg-accent-gold transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 z-0" />
        )}
      </motion.button>
    );
  },
);
Button.displayName = "Button";

export { Button };
