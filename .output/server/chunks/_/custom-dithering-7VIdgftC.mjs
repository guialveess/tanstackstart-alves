import { jsxs, jsx } from 'react/jsx-runtime';
import { C as CustomDitheringImage } from './CustomDitheringImage-DPVDOkNL.mjs';
import { useState } from 'react';
import '@paper-design/shaders-react';
import '@paper-design/shaders';

function RouteComponent() {
  const [mixFactor, setMixFactor] = useState(0.5);
  const [shape, setShape] = useState("warp");
  const [type, setType] = useState("4x4");
  return /* @__PURE__ */ jsxs("div", { className: "h-screen w-screen bg-black text-white", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 right-0 z-10 bg-black/80 backdrop-blur-sm p-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-4", children: "Custom Dithering + Imagem" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium mb-2", children: [
            "Mistura (Imagem \u2194 Shapes): ",
            mixFactor.toFixed(2)
          ] }),
          /* @__PURE__ */ jsx("input", { type: "range", min: "0", max: "1", step: "0.1", value: mixFactor, onChange: (e) => setMixFactor(parseFloat(e.target.value)), className: "w-full" }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400 mt-1", children: "0 = Apenas imagem | 1 = Apenas shapes" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-2", children: "Shape:" }),
          /* @__PURE__ */ jsxs("select", { value: shape, onChange: (e) => setShape(e.target.value), className: "w-full bg-gray-800 border border-gray-700 rounded px-3 py-2", children: [
            /* @__PURE__ */ jsx("option", { value: "simplex", children: "Simplex Noise" }),
            /* @__PURE__ */ jsx("option", { value: "warp", children: "Warp" }),
            /* @__PURE__ */ jsx("option", { value: "dots", children: "Dots" }),
            /* @__PURE__ */ jsx("option", { value: "wave", children: "Wave" }),
            /* @__PURE__ */ jsx("option", { value: "ripple", children: "Ripple" }),
            /* @__PURE__ */ jsx("option", { value: "swirl", children: "Swirl" }),
            /* @__PURE__ */ jsx("option", { value: "sphere", children: "Sphere" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-2", children: "Dithering:" }),
          /* @__PURE__ */ jsxs("select", { value: type, onChange: (e) => setType(e.target.value), className: "w-full bg-gray-800 border border-gray-700 rounded px-3 py-2", children: [
            /* @__PURE__ */ jsx("option", { value: "random", children: "Random" }),
            /* @__PURE__ */ jsx("option", { value: "2x2", children: "2x2 Bayer" }),
            /* @__PURE__ */ jsx("option", { value: "4x4", children: "4x4 Bayer" }),
            /* @__PURE__ */ jsx("option", { value: "8x8", children: "8x8 Bayer" })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center pt-32", children: /* @__PURE__ */ jsx(CustomDitheringImage, { width: 800, height: 600, image: "/img/G2r4MlMXIAAC3s2.jpeg", colorBack: "#000000", colorFront: "#00ff88", shape, type, size: 2, speed: 1, mixFactor, scale: 0.8, className: "rounded-lg shadow-2xl" }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 z-10 bg-black/80 backdrop-blur-sm p-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300", children: "\u{1F4A1} Experimente ajustar os par\xE2metros para criar diferentes efeitos de dithering com sua imagem!" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-2", children: "Este componente combina os shapes animados do Dithering com sua imagem personalizada." })
    ] }) })
  ] });
}

export { RouteComponent as component };
//# sourceMappingURL=custom-dithering-7VIdgftC.mjs.map
