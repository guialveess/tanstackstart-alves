import { createFileRoute } from "@tanstack/react-router";
import { ImageDithering } from "@paper-design/shaders-react";

export const Route = createFileRoute("/cat")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen w-screen overflow-hidden grid grid-rows-[auto_1fr_auto] relative">
      <main className="relative flex-1 flex items-center justify-center overflow-hidden min-h-screen">
        <section>
          <h1 className="text-amber-50">Ola mundo</h1>
        </section>
      </main>
    </div>
  );
}
