import { jsxs, jsx } from 'react/jsx-runtime';
import { H as Header } from './header-Dlg1hghf.mjs';
import { ImageDithering, Dithering } from '@paper-design/shaders-react';
import { useState, useEffect } from 'react';
import 'lucide-react';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';

function RouteComponent() {
  const [isFirefox, setFirefox] = useState(false);
  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const ua = navigator.userAgent.toLowerCase();
      const isChromeBrowser = ua.includes("firefox") && !ua.includes("edge") && !ua.includes("opr");
      if (isChromeBrowser) {
        setFirefox(true);
        console.log("Voc\xEA est\xE1 usando o Firefox");
      }
    }
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "relative w-screen h-screen overflow-hidden", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { className: "relative flex-1 flex items-center justify-center h-full w-full", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0", children: /* @__PURE__ */ jsx(ImageDithering, { width: window.innerWidth, height: window.innerHeight, image: "/img/G2r4MlMXIAAC3s2.jpeg", colorBack: "#000000", colorFront: "#2c2a26", colorHighlight: "#ccff00", originalColors: false, size: 2, colorSteps: 2 }) }),
      /* @__PURE__ */ jsxs("section", { className: "relative z-10 transition-all duration-700", children: [
        /* @__PURE__ */ jsx(Dithering, { width: 960, height: 540, colorBack: "rgba(0,0,0,0)", colorFront: "#ff4800", shape: "sphere", type: "4x4", size: 2, speed: 1, scale: 0.6 }),
        isFirefox && /* @__PURE__ */ jsx("p", { className: "p-3 flex rounded-xl text-md transition-all font-mono duration-700 text-center border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50", children: "Opps, unfortunately Firefox is not yet enabled for this page, try another browser" })
      ] })
    ] })
  ] });
}

export { RouteComponent as component };
//# sourceMappingURL=about-cNlHBH86.mjs.map
