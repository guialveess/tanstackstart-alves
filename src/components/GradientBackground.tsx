"use client";

import { GrainGradient } from "@paper-design/shaders-react";

function getShapeByHour(): "ripple" | "wave" | "truchet" {
  const hour = new Date().getHours();

  if (hour >= 6 && hour < 12) {
    return "truchet";
  } else if (hour >= 12 && hour < 18) {
    return "wave";
  } else {
    return "ripple";
  }
}

export function GradientBackground() {
  const shape = getShapeByHour();

  return (
    <div className="absolute inset-0 -z-10">
      <GrainGradient
        style={{
          height: "100%",
          width: "100%",
          opacity: 0.3,
          animation: "fadeIn 2s ease 0.5s forwards",
        }}
        colorBack="hsl(0, 0%, 0%)"
        softness={0.3}
        intensity={0.25}
        noise={0}
        shape={shape}
        offsetX={0}
        offsetY={0}
        scale={0.7}
        rotation={0}
        speed={0.5}
        colors={[
          "hsl(193, 85%, 66%)",
          "hsl(196, 100%, 83%)",
          "hsl(195, 100%, 50%)",
        ]}
      />
    </div>
  );
}
