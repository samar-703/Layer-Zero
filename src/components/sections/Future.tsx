"use client";
import { useState } from "react";
import WaitlistForm from "@/components/forms/WaitlistForm";
import ContactForm from "@/components/forms/ContactForm";

const FUTURE_VIDEO =
  "https://videos.pexels.com/video-files/2096533/2096533-uhd_3840_2160_30fps.mp4";

export default function Future() {
  const [showContact, setShowContact] = useState(false);

  return (
    <section className="min-h-screen bg-background relative flex flex-col items-center justify-center py-32 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={FUTURE_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
      </div>

      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-accent-gold/10 to-transparent z-10 pointer-events-none" />

      <div className="relative z-20 w-full max-w-4xl px-6 text-center">
        <h2 className="text-6xl md:text-8xl font-display font-bold text-white mb-2 mix-blend-overlay">
          OWN YOUR <br />
          <span className="text-white opacity-90">SOVEREIGNTY.</span>
        </h2>

        <p className="font-mono text-sm text-accent-gold/80 tracking-[0.2em] mb-12 uppercase">
          The future is open. secure. yours.
        </p>

        {showContact ? (
          <ContactForm onCancel={() => setShowContact(false)} />
        ) : (
          <WaitlistForm />
        )}
      </div>

      <footer className="absolute bottom-8 w-full text-center z-30">
        <p className="font-mono text-[10px] text-white/20 uppercase tracking-widest mb-4">
          © 2026 Layer Zero. All rights reserved.
        </p>
        {!showContact && (
          <button
            onClick={() => setShowContact(true)}
            className="font-mono text-[10px] text-accent-gold/40 hover:text-accent-gold uppercase tracking-widest transition-colors"
          >
            [ ESTABLISH CONTACT ]
          </button>
        )}
      </footer>
    </section>
  );
}
