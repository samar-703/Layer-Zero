"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ContactForm({ onCancel }: { onCancel: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [responseMsg, setResponseMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setResponseMsg("TRANSMISSION RECEIVED.");
      } else {
        setStatus("error");
        setResponseMsg(data.message || "TRANSMISSION FAILED.");
      }
    } catch {
      setStatus("error");
      setResponseMsg("NETWORK ERROR.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto relative z-20">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-8 border border-accent-gold/50 bg-accent-gold/10"
          >
            <div className="text-accent-gold font-mono text-xl mb-2">
              ✓ {responseMsg}
            </div>
            <button
              onClick={onCancel}
              className="mt-4 text-xs font-mono text-white/50 hover:text-white underline"
            >
              RETURN
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 text-left"
          >
            <Input
              placeholder="IDENTITY (NAME)"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              disabled={status === "loading"}
            />
            <Input
              type="email"
              placeholder="COMM CHANNEL (EMAIL)"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              disabled={status === "loading"}
            />
            <textarea
              placeholder="ENCRYPTED MESSAGE..."
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
              disabled={status === "loading"}
              rows={4}
              className="w-full bg-transparent border-b border-white/20 py-3 text-lg focus:outline-none focus:border-accent-gold transition-colors duration-300 font-mono placeholder:text-white/20 resize-none"
            />

            <div className="flex gap-4 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1"
                disabled={status === "loading"}
              >
                ABORT
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={status === "loading"}
              >
                {status === "loading" ? "SENDING..." : "TRANSMIT"}
              </Button>
            </div>

            {status === "error" && (
              <p className="text-red-500 font-mono text-xs text-center">
                {responseMsg}
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
