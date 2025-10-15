import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/ui/header";
import { Instrument_Serif } from "@/fonts/instrumentSerif";
import { ImageDithering, Dithering } from "@paper-design/shaders-react";
import { useEffect, useState } from "react";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isFirefox, setFirefox] = useState(false);
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const ua = navigator.userAgent.toLowerCase();
      const isChromeBrowser =
        ua.includes("firefox") && !ua.includes("edge") && !ua.includes("opr");
      if (isChromeBrowser) setFirefox(true);
    }
  }, []);

  useEffect(() => {
    const updateViewportHeight = () => {
      setViewportHeight(window.innerHeight);
    };

    updateViewportHeight();
    window.addEventListener("resize", updateViewportHeight);
    window.addEventListener("orientationchange", updateViewportHeight);

    return () => {
      window.removeEventListener("resize", updateViewportHeight);
      window.removeEventListener("orientationchange", updateViewportHeight);
    };
  }, []);

  return (
    <div
      className="relative w-screen overflow-hidden"
      style={{
        height: viewportHeight ? `${viewportHeight}px` : "100vh",
      }}
    >
      <Header />

      <main className="relative flex-1 flex items-center justify-center h-full w-full">
        <div className="absolute inset-0">
          <ImageDithering
            width={window.innerWidth}
            height={viewportHeight ?? window.innerHeight}
            image="/img/G2r4MlMXIAAC3s2.jpeg"
            colorBack="#000000"
            colorFront="#2c2a26"
            colorHighlight="#ccff00"
            originalColors={false}
            size={2}
            colorSteps={2}
          />
        </div>

        <section className="relative z-10 transition-all duration-700 mb-14">
          <Dithering
            width={960}
            height={540}
            colorBack="rgba(0,0,0,0)"
            colorFront="000000"
            shape="sphere"
            type="4x4"
            size={2}
            speed={1}
            scale={0.6}
          />

          {isFirefox && (
            <p className="p-3 flex rounded-xl text-md transition-all font-mono duration-700 text-center border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50">
              Opps, unfortunately Firefox is not yet enabled for this page, try
              another browser
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
