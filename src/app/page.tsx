"use client";
import Hero from "@/components/sections/Hero";
import Asymmetry from "@/components/sections/Asymmetry";
import Genesis from "@/components/sections/Genesis";
import HorizontalScroll from "@/components/sections/HorizontalScroll";
import Future from "@/components/sections/Future";
import IntroLoader from "@/components/IntroLoader";

export default function Home() {
  return (
    <main>
      <IntroLoader onComplete={() => {}} />
      <Hero />
      <Asymmetry />
      <Genesis />
      <HorizontalScroll />
      <Future />
    </main>
  );
}
