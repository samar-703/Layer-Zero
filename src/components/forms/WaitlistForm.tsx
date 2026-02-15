"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import MagneticButton from "@/components/ui/MagneticButton";
import { Input } from "@/components/ui/Input";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setMessage("ACCESS GRANTED. WELCOME TO THE NETWORK.");
      } else {
        setStatus("error");
        setMessage(data.message || "TRANSMISSION FAILED.");
      }
    } catch {
      setStatus("error");
      setMessage("NETWORK ERROR. RETRY.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto relative z-20">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8 border border-accent-gold/50 bg-accent-gold/10"
          >
            <div className="text-accent-gold font-mono text-xl mb-2">
              ✓ SIGNAL RECEIVED
            </div>
            <p className="font-mono text-xs text-white/60 tracking-widest">
              {message}
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >
            <div className="relative group">
              <Input
                type="email"
                placeholder="ENTER EMAIL PROTOCOL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === "loading"}
                className="pr-12"
              />
              <div className="absolute right-0 bottom-3 w-2 h-2 bg-white/20 rounded-full group-focus-within:bg-accent-gold transition-colors duration-300" />
            </div>

            <MagneticButton
              type="submit"
              disabled={status === "loading"}
              className="w-full"
            >
              {status === "loading" ? "INITIALIZING..." : "ENTER THE NETWORK"}
            </MagneticButton>

            {status === "error" && (
              <p className="text-red-500 font-mono text-xs text-center mt-2 tracking-widest uppercase">
                Error: {message}
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
