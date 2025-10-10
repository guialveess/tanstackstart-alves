"use client";

import { createFileRoute } from "@tanstack/react-router";
import { GradientBackground } from "@/components/GradientBackground";
import { Instrument_Serif } from "@/fonts/instrumentSerif";
import { Paper_Mono } from "@/fonts/instrumentSerif";
import { Header } from "@/components/ui/header";

const paperMonoSerif = Paper_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="h-screen w-screen overflow-hidden grid grid-rows-[auto_1fr_auto] relative">
      <Header />
      <main className="relative flex-1 flex items-center justify-center overflow-hidden min-h-screen">
        <GradientBackground />
        <section className="px-6 relative z-10">
          <h1
            className={`text-white text-2xl ${paperMonoSerif.className} animate-fadeIn`}
          >
            imagination is limit
          </h1>
        </section>
      </main>
    </div>
  );
}
