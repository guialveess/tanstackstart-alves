"use client";

import { createFileRoute } from "@tanstack/react-router";
import { GradientBackground } from "@/components/GradientBackground";
import { Header } from "@/components/ui/header";

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
          <h1 className="text-white text-[18px] leading-[24px] tracking-[-0.05em] text-center font-geist font-bold animate-fadeIn">
            imagination is limit
          </h1>

          <h1 className="spacing"></h1>
        </section>
      </main>
    </div>
  );
}
