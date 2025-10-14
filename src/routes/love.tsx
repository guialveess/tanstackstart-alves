import { createFileRoute } from "@tanstack/react-router";

import { Paper_Mono } from "@/fonts/instrumentSerif";

const paperMonoSerif = Paper_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const Route = createFileRoute("/love")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black">
      <div className="relative inline-block  animate-fadeIn">
        <img
          src="/img/amor.gif"
          alt="amor"
          className="rounded-2xl max-w-[500px] object-contain opacity-30 hover:opacity-85 transition-opacity duration-700 ease-in-out drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
        />
        <h1
          className={`text-white text-2xl ${paperMonoSerif.className} animate-fadeIn`}
        >
          eu te amo
        </h1>
      </div>
    </div>
  );
}
