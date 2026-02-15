"use client";
import { useState } from "react";
import Hero from "@/components/sections/Hero";
import Asymmetry from "@/components/sections/Asymmetry";
import Genesis from "@/components/sections/Genesis";
import HorizontalScroll from "@/components/sections/HorizontalScroll";
import Future from "@/components/sections/Future";
import IntroLoader from "@/components/IntroLoader";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main>
      <IntroLoader onComplete={() => setLoading(false)} />
      <Hero />
      <Asymmetry />
      <Genesis />
      <HorizontalScroll />
      <Future />
    </main>
  );
}
