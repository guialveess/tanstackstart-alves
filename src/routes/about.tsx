import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/ui/header";
import { Instrument_Serif } from "@/fonts/instrumentSerif";
import { ImageDithering } from "@paper-design/shaders-react";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Header />

      <main className="relative flex-1 flex items-center justify-center h-full w-full">
        <div className="absolute inset-0">
          <ImageDithering
            width={window.innerWidth}
            height={window.innerHeight}
            image="/img/G2r4MlMXIAAC3s2.jpeg"
            colorBack="#000000"
            colorFront="#2c2a26"
            colorHighlight="#ccff00"
            originalColors={false}
            size={2}
            colorSteps={2}
          />
        </div>

        <section className="relative z-10 cursor-pointer transition-all duration-300"></section>
      </main>
    </div>
  );
}
