import{r as d,j as i}from"./main-CZT1w5fq.js";import{H}from"./header-D2utcZlW.js";import{p as O,s as I,g,S as F,d as X,a as k,b as Y}from"./shader-mount-BjV1lhC-.js";import{D as z,a as D,d as N}from"./dithering-vvkEDeeQ.js";const q=`#version 300 es
precision lowp float;

uniform mediump vec2 u_resolution;
uniform mediump float u_pixelRatio;
uniform mediump float u_originX;
uniform mediump float u_originY;
uniform mediump float u_worldWidth;
uniform mediump float u_worldHeight;
uniform mediump float u_fit;

uniform mediump float u_scale;
uniform mediump float u_rotation;
uniform mediump float u_offsetX;
uniform mediump float u_offsetY;

uniform vec4 u_colorFront;
uniform vec4 u_colorBack;
uniform vec4 u_colorHighlight;

uniform sampler2D u_image;
uniform mediump float u_imageAspectRatio;

uniform float u_type;
uniform float u_pxSize;
uniform bool u_originalColors;
uniform float u_colorSteps;

out vec4 fragColor;

float getUvFrame(vec2 uv, vec2 px) {
  float left   = step(-px.x, uv.x);
  float right  = step(uv.x, 1.);
  float bottom = step(-px.y, uv.y);
  float top    = step(uv.y, 1. + px.y);

  return left * right * bottom * top;
}

${O}

const int bayer2x2[4] = int[4](0, 2, 3, 1);
const int bayer4x4[16] = int[16](
  0,  8,  2, 10,
 12,  4, 14,  6,
  3, 11,  1,  9,
 15,  7, 13,  5
);

const int bayer8x8[64] = int[64](
   0, 32,  8, 40,  2, 34, 10, 42,
  48, 16, 56, 24, 50, 18, 58, 26,
  12, 44,  4, 36, 14, 46,  6, 38,
  60, 28, 52, 20, 62, 30, 54, 22,
   3, 35, 11, 43,  1, 33,  9, 41,
  51, 19, 59, 27, 49, 17, 57, 25,
  15, 47,  7, 39, 13, 45,  5, 37,
  63, 31, 55, 23, 61, 29, 53, 21
);

float getBayerValue(vec2 uv, int size) {
  ivec2 pos = ivec2(mod(uv, float(size)));
  int index = pos.y * size + pos.x;

  if (size == 2) {
    return float(bayer2x2[index]) / 4.0;
  } else if (size == 4) {
    return float(bayer4x4[index]) / 16.0;
  } else if (size == 8) {
    return float(bayer8x8[index]) / 64.0;
  }
  return 0.0;
}


void main() {

  #define USE_IMAGE_SIZING
  #define USE_PIXELIZATION
  ${I}

  vec2 dithering_uv = pxSizeUv;
  vec2 ditheringNoise_uv = u_resolution * uv;
  vec4 image = texture(u_image, imageUV);
  float frame = getUvFrame(imageUV, pxSize / u_resolution.xy);

  int type = int(floor(u_type));
  float dithering = 0.0;

  float lum = dot(vec3(.2126, .7152, .0722), image.rgb);

  switch (type) {
    case 1: {
      dithering = step(hash21(ditheringNoise_uv), lum);
    } break;
    case 2:
      dithering = getBayerValue(dithering_uv, 2);
      break;
    case 3:
      dithering = getBayerValue(dithering_uv, 4);
      break;
    default:
      dithering = getBayerValue(dithering_uv, 8);
      break;
  }


  float steps = max(floor(u_colorSteps), 1.);
  float ditherAmount = 1.0 / (steps);

  vec3 color = vec3(0.0);
  float opacity = 1.;

  dithering -= .5;
  float brightness = clamp(lum + dithering * ditherAmount, 0.0, 1.0);
  brightness = mix(0.0, brightness, frame);
  float quantLum = floor(brightness * steps + 0.5) / steps;

  if (u_originalColors == true) {
    vec3 normColor = image.rgb / max(lum, 0.001);
    color = normColor * quantLum;

    float quantAlpha = floor(image.a * steps + 0.5) / steps;
    opacity = mix(quantLum, 1., quantAlpha);
  } else {
    vec3 fgColor = u_colorFront.rgb * u_colorFront.a;
    float fgOpacity = u_colorFront.a;
    vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
    float bgOpacity = u_colorBack.a;
    vec3 hlColor = u_colorHighlight.rgb * u_colorHighlight.a;
    float hlOpacity = u_colorHighlight.a;

    fgColor = mix(fgColor, hlColor, step(1.02 - .02 * u_colorSteps, brightness));
    fgOpacity = mix(fgOpacity, hlOpacity, step(1.02 - .02 * u_colorSteps, brightness));

    color = fgColor * quantLum;
    opacity = fgOpacity * quantLum;
    color += bgColor * (1.0 - opacity);
    opacity += bgOpacity * (1.0 - opacity);
  }


  fragColor = vec4(color, opacity);
}
`;function E(t,r){var a,s,u;for(const l in t){if(l==="colors"){const c=Array.isArray(t.colors),f=Array.isArray(r.colors);if(!c||!f){if(Object.is(t.colors,r.colors)===!1)return!1;continue}if(((a=t.colors)==null?void 0:a.length)!==((s=r.colors)==null?void 0:s.length)||!((u=t.colors)!=null&&u.every((m,p)=>{var n;return m===((n=r.colors)==null?void 0:n[p])})))return!1;continue}if(Object.is(t[l],r[l])===!1)return!1}return!0}const e={params:{...X,speed:1,frame:0,scale:.6,colorBack:"#000000",colorFront:"#00b2ff",shape:"sphere",type:"4x4",size:2}},U=d.memo(function({speed:r=e.params.speed,frame:a=e.params.frame,colorBack:s=e.params.colorBack,colorFront:u=e.params.colorFront,shape:l=e.params.shape,type:c=e.params.type,pxSize:f,size:m=f===void 0?e.params.size:f,fit:p=e.params.fit,scale:n=e.params.scale,rotation:h=e.params.rotation,originX:_=e.params.originX,originY:x=e.params.originY,offsetX:y=e.params.offsetX,offsetY:v=e.params.offsetY,worldWidth:b=e.params.worldWidth,worldHeight:S=e.params.worldHeight,...w}){const C={u_colorBack:g(s),u_colorFront:g(u),u_shape:D[l],u_type:z[c],u_pxSize:m,u_fit:k[p],u_scale:n,u_rotation:h,u_offsetX:y,u_offsetY:v,u_originX:_,u_originY:x,u_worldWidth:b,u_worldHeight:S};return i.jsx(F,{...w,speed:r,frame:a,fragmentShader:N,uniforms:C})}),o={params:{...Y,fit:"cover",speed:0,frame:0,colorFront:"#94ffaf",colorBack:"#000c38",colorHighlight:"#eaff94",type:"8x8",size:2,colorSteps:2,originalColors:!1}},V=d.memo(function({speed:r=o.params.speed,frame:a=o.params.frame,colorFront:s=o.params.colorFront,colorBack:u=o.params.colorBack,colorHighlight:l=o.params.colorHighlight,image:c="",type:f=o.params.type,colorSteps:m=o.params.colorSteps,originalColors:p=o.params.originalColors,pxSize:n,size:h=n===void 0?o.params.size:n,fit:_=o.params.fit,scale:x=o.params.scale,rotation:y=o.params.rotation,originX:v=o.params.originX,originY:b=o.params.originY,offsetX:S=o.params.offsetX,offsetY:w=o.params.offsetY,worldWidth:C=o.params.worldWidth,worldHeight:B=o.params.worldHeight,...j}){const A={u_image:c,u_colorFront:g(s),u_colorBack:g(u),u_colorHighlight:g(l),u_type:z[f],u_pxSize:h,u_colorSteps:m,u_originalColors:p,u_fit:k[_],u_rotation:y,u_scale:x,u_offsetX:S,u_offsetY:w,u_originX:v,u_originY:b,u_worldWidth:C,u_worldHeight:B};return i.jsx(F,{...j,speed:r,frame:a,fragmentShader:q,uniforms:A})},E);function G(){const[t,r]=d.useState(!1);return d.useEffect(()=>{if(typeof navigator<"u"){const a=navigator.userAgent.toLowerCase();a.includes("firefox")&&!a.includes("edge")&&!a.includes("opr")&&(r(!0),console.log("Você está usando o Firefox"))}},[]),i.jsxs("div",{className:"relative w-screen h-screen overflow-hidden",children:[i.jsx(H,{}),i.jsxs("main",{className:"relative flex-1 flex items-center justify-center h-full w-full",children:[i.jsx("div",{className:"absolute inset-0",children:i.jsx(V,{width:window.innerWidth,height:window.innerHeight,image:"/img/G2r4MlMXIAAC3s2.jpeg",colorBack:"#000000",colorFront:"#2c2a26",colorHighlight:"#ccff00",originalColors:!1,size:2,colorSteps:2})}),i.jsxs("section",{className:"relative z-10 transition-all duration-700",children:[i.jsx(U,{width:960,height:540,colorBack:"rgba(0,0,0,0)",colorFront:"#ff4800",shape:"sphere",type:"4x4",size:2,speed:1,scale:.6}),t&&i.jsx("p",{className:"p-3 flex rounded-xl text-md transition-all font-mono duration-700 text-center border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",children:"Opps, unfortunately Firefox is not yet enabled for this page, try another browser"})]})]})]})}export{G as component};
