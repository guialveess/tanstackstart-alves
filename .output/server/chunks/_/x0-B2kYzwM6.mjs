import { jsxs, jsx } from 'react/jsx-runtime';
import { H as Header } from './header-Dlg1hghf.mjs';
import { I as Instrument_Serif } from './instrumentSerif-d7Iy6Vfk.mjs';
import { useState } from 'react';
import 'lucide-react';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';

const instrumentSerif = Instrument_Serif();
function RouteComponent() {
  const [isHovered, setIsHovered] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "relative w-screen h-screen overflow-hidden", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { className: "relative flex-1 flex items-center justify-center h-full w-full", children: [
      /* @__PURE__ */ jsx("img", { src: "/img/G2r4MlMXIAAC3s2.jpeg", alt: "Imagem sobre", className: "absolute inset-0 w-full h-full object-cover dither-sm" }),
      /* @__PURE__ */ jsxs("div", { className: `flex flex-col items-center space-y-2 transition-opacity duration-300`, children: [
        /* @__PURE__ */ jsx("h1", { className: `${instrumentSerif.className} text-2xl font-bold text-white transition-transform duration-300 hover:scale-110`, children: "C" }),
        /* @__PURE__ */ jsx("h1", { className: `${instrumentSerif.className} text-2xl font-bold text-white transition-transform duration-300 hover:scale-110`, children: "A" }),
        /* @__PURE__ */ jsx("h1", { className: `${instrumentSerif.className} text-2xl font-bold text-white transition-transform duration-300 hover:scale-110`, children: "O" }),
        /* @__PURE__ */ jsx("h1", { className: `${instrumentSerif.className} text-2xl font-bold text-white transition-transform duration-300 hover:scale-110`, children: "S" })
      ] })
    ] })
  ] });
}

export { RouteComponent as component };
//# sourceMappingURL=x0-B2kYzwM6.mjs.map
