import { jsxs, jsx } from 'react/jsx-runtime';
import { GrainGradient } from '@paper-design/shaders-react';
import { P as Paper_Mono } from './instrumentSerif-d7Iy6Vfk.mjs';
import { H as Header } from './header-Dlg1hghf.mjs';
import 'lucide-react';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';

function getShapeByHour() {
  const hour = (/* @__PURE__ */ new Date()).getHours();
  if (hour >= 6 && hour < 12) {
    return "truchet";
  } else if (hour >= 12 && hour < 18) {
    return "wave";
  } else {
    return "ripple";
  }
}
function GradientBackground() {
  const shape = getShapeByHour();
  return /* @__PURE__ */ jsx("div", { className: "absolute inset-0 -z-10", children: /* @__PURE__ */ jsx(
    GrainGradient,
    {
      style: {
        height: "100%",
        width: "100%",
        opacity: 0.3,
        animation: "fadeIn 2s ease 0.5s forwards"
      },
      colorBack: "hsl(0, 0%, 0%)",
      softness: 0.3,
      intensity: 0.25,
      noise: 0,
      shape,
      offsetX: 0,
      offsetY: 0,
      scale: 0.7,
      rotation: 0,
      speed: 0.5,
      colors: [
        "hsl(193, 85%, 66%)",
        "hsl(196, 100%, 83%)",
        "hsl(195, 100%, 50%)"
      ]
    }
  ) });
}
const paperMonoSerif = Paper_Mono();
function HomeComponent() {
  return /* @__PURE__ */ jsxs("div", { className: "h-screen w-screen overflow-hidden grid grid-rows-[auto_1fr_auto] relative", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { className: "relative flex-1 flex items-center justify-center overflow-hidden min-h-screen", children: [
      /* @__PURE__ */ jsx(GradientBackground, {}),
      /* @__PURE__ */ jsx("section", { className: "px-6 relative z-10", children: /* @__PURE__ */ jsx("h1", { className: `text-white text-2xl ${paperMonoSerif.className} animate-fadeIn`, children: "imagination is limit" }) })
    ] })
  ] });
}

export { HomeComponent as component };
//# sourceMappingURL=index-D9Ov0C2f.mjs.map
