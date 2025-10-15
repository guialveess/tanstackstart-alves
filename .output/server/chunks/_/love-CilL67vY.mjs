import { jsx, jsxs } from 'react/jsx-runtime';
import { P as Paper_Mono } from './instrumentSerif-d7Iy6Vfk.mjs';
import { C as CustomDitheringImage } from './CustomDitheringImage-DPVDOkNL.mjs';
import 'react';
import '@paper-design/shaders-react';
import '@paper-design/shaders';

const paperMonoSerif = Paper_Mono();
function RouteComponent() {
  return /* @__PURE__ */ jsx("div", { className: "h-screen w-screen flex items-center justify-center bg-black", children: /* @__PURE__ */ jsxs("div", { className: "relative inline-block animate-fadeIn", children: [
    /* @__PURE__ */ jsx("img", { src: "/img/amor.gif", alt: "amor", className: "rounded-2xl max-w-[380px] object-contain opacity-30 hover:opacity-85 transition-opacity duration-700 ease-in-out drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" }),
    /* @__PURE__ */ jsx(CustomDitheringImage, { image: "/img/G2r4MlMXIAAC3s2.jpeg", colorBack: "#000000", colorFront: "#00ff88", size: 2, speed: 1, scale: 0.8 }),
    /* @__PURE__ */ jsx("h1", { className: `absolute left-[70%] transform -translate-y-1/2 text-white text-2xl ${paperMonoSerif.className} animate-fadeIn`, children: "eu te amo" })
  ] }) });
}

export { RouteComponent as component };
//# sourceMappingURL=love-CilL67vY.mjs.map
