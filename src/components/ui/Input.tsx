import { InputHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={twMerge(
        clsx(
          "bg-transparent border-b border-white/20 py-3 text-lg focus:outline-none focus:border-accent-gold transition-colors duration-300 w-full font-mono placeholder:text-white/20",
          className,
        ),
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
