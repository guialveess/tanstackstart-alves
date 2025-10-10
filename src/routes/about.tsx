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

        <section className="relative z-10">
          <h1 className="text-2xl">C</h1>
          <h1 className="text-2xl">A</h1>
          <h1 className="text-2xl">O</h1>
          <h1 className="text-2xl">S</h1>
        </section>
      </main>
    </div>
  );
}
