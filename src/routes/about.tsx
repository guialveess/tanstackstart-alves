import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/ui/header";
import { Instrument_Serif } from "@/fonts/instrumentSerif";

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
        <img
          src="/img/G2r4MlMXIAAC3s2.jpeg"
          alt="Imagem sobre"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <section className="relative z-10 cursor-pointer transition-all duration-300">
          <div
            className={`flex flex-col items-center space-y-2 transition-opacity duration-300`}
          >
            <h1
              className={`${instrumentSerif.className} text-2xl font-bold text-white transition-transform duration-300 hover:scale-110`}
            >
              C
            </h1>
            <h1
              className={`${instrumentSerif.className} text-2xl font-bold text-white transition-transform duration-300 hover:scale-110`}
            >
              A
            </h1>
            <h1
              className={`${instrumentSerif.className} text-2xl font-bold text-white transition-transform duration-300 hover:scale-110`}
            >
              O
            </h1>
            <h1
              className={`${instrumentSerif.className} text-2xl font-bold text-white transition-transform duration-300 hover:scale-110`}
            >
              S
            </h1>
          </div>
        </section>
      </main>
    </div>
  );
}
