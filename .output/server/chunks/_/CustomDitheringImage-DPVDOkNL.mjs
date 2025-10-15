import { memo } from 'react';
import { ShaderMount } from '@paper-design/shaders-react';
import { ShaderFitOptions, DitheringTypes, DitheringShapes, getShaderColorFromString } from '@paper-design/shaders';
import { jsx } from 'react/jsx-runtime';

const customDitheringImageShader = `#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_fit;
uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;
uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;

uniform vec4 u_colorBack;
uniform vec4 u_colorFront;
uniform float u_shape;
uniform float u_type;
uniform float u_pxSize;

// Novos uniforms para imagem
uniform sampler2D u_image;
uniform float u_mixFactor; // Controla mistura entre imagem e shapes

out vec4 fragColor;

// Fun\xE7\xF5es de noise simplificadas
float snoise(vec2 v) {
  return fract(sin(dot(v, vec2(12.9898, 78.233))) * 43758.5453);
}

float hash11(float p) {
  return fract(sin(p) * 43758.5453);
}

float hash21(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

const float TWO_PI = 6.28318530718;

vec2 rotate(vec2 v, float angle) {
  float s = sin(angle);
  float c = cos(angle);
  mat2 m = mat2(c, -s, s, c);
  return m * v;
}

// Matrizes Bayer para dithering
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
  float t = .5 * u_time;

  // Coordenadas b\xE1sicas
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 objectUV = (uv - 0.5) * vec2(u_worldWidth, u_worldHeight) / u_scale;
  objectUV = rotate(objectUV, u_rotation) + vec2(u_offsetX, u_offsetY);
  vec2 pxSizeUv = uv * u_resolution / u_pxSize;
  vec2 ditheringNoise_uv = uv * u_resolution;

  // Calcular shape baseado no tipo
  float shape = 0.;
  if (u_shape < 1.5) {
    // Simplex noise simplificado
    vec2 shapeUV = objectUV * .001;
    shape = snoise(shapeUV - vec2(0., .3 * t));
    shape = 0.5 + 0.5 * shape;
    shape = smoothstep(0.3, 0.9, shape);
  } else if (u_shape < 2.5) {
    // Warp
    vec2 shapeUV = objectUV * .003;
    for (float i = 1.0; i < 6.0; i++) {
      shapeUV.x += 0.6 / i * cos(i * 2.5 * shapeUV.y + t);
      shapeUV.y += 0.6 / i * cos(i * 1.5 * shapeUV.x + t);
    }
    shape = .15 / abs(sin(t - shapeUV.y - shapeUV.x));
    shape = smoothstep(0.02, 1., shape);
  } else if (u_shape < 3.5) {
    // Dots
    vec2 shapeUV = objectUV * .05;
    float stripeIdx = floor(2. * shapeUV.x / TWO_PI);
    float rand = hash11(stripeIdx * 10.);
    rand = sign(rand - .5) * pow(.1 + abs(rand), .4);
    shape = sin(shapeUV.x) * cos(shapeUV.y - 5. * rand * t);
    shape = pow(abs(shape), 6.);
  } else if (u_shape < 4.5) {
    // Sine wave
    vec2 shapeUV = objectUV * 4.;
    float wave = cos(.5 * shapeUV.x - 2. * t) * sin(1.5 * shapeUV.x + t) * (.75 + .25 * cos(3. * t));
    shape = 1. - smoothstep(-1., 1., shapeUV.y + wave);
  } else if (u_shape < 5.5) {
    // Ripple
    float dist = length(objectUV);
    float waves = sin(pow(dist, 1.7) * 7. - 3. * t) * .5 + .5;
    shape = waves;
  } else if (u_shape < 6.5) {
    // Swirl
    float l = length(objectUV);
    float angle = 6. * atan(objectUV.y, objectUV.x) + 4. * t;
    float twist = 1.2;
    float offset = pow(l, -twist) + angle / TWO_PI;
    float mid = smoothstep(0., 1., pow(l, twist));
    shape = mix(0., fract(offset), mid);
  } else {
    // Sphere
    vec2 shapeUV = objectUV * 2.;
    float d = 1. - pow(length(shapeUV), 2.);
    vec3 pos = vec3(shapeUV, sqrt(max(0., d)));
    vec3 lightPos = normalize(vec3(cos(1.5 * t), .8, sin(1.25 * t)));
    shape = .5 + .5 * dot(lightPos, pos);
    shape *= step(0., d);
  }

  // Sample da imagem
  vec4 imageColor = texture(u_image, uv);
  float imageLum = dot(vec3(.2126, .7152, .0722), imageColor.rgb);

  // Misturar shape com imagem baseado no mixFactor
  float combinedValue = mix(imageLum, shape, u_mixFactor);

  // Aplicar dithering
  int type = int(floor(u_type));
  float dithering = 0.0;

  switch (type) {
    case 1: {
      dithering = step(hash21(ditheringNoise_uv), combinedValue);
    } break;
    case 2:
      dithering = getBayerValue(pxSizeUv, 2);
      break;
    case 3:
      dithering = getBayerValue(pxSizeUv, 4);
      break;
    default:
      dithering = getBayerValue(pxSizeUv, 8);
      break;
  }

  dithering -= .5;
  float res = step(.5, combinedValue + dithering);

  vec3 fgColor = u_colorFront.rgb * u_colorFront.a;
  float fgOpacity = u_colorFront.a;
  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  float bgOpacity = u_colorBack.a;

  vec3 color = fgColor * res;
  float opacity = fgOpacity * res;

  color += bgColor * (1. - opacity);
  opacity += bgOpacity * (1. - opacity);

  fragColor = vec4(color, opacity);
}
`;
const CustomDitheringImage = memo(function CustomDitheringImageImpl({
  // Props do Dithering
  speed = 1,
  frame = 0,
  colorBack = "#000000",
  colorFront = "#00b2ff",
  shape = "sphere",
  type = "4x4",
  size = 2,
  // Props da imagem
  image,
  mixFactor = 0.5,
  // 0 = só imagem, 1 = só shapes
  // Props de sizing
  fit = "contain",
  scale = 1,
  rotation = 0,
  originX = 0.5,
  originY = 0.5,
  offsetX = 0,
  offsetY = 0,
  worldWidth = 1,
  worldHeight = 1,
  ...props
}) {
  const uniforms = {
    // Uniforms do Dithering
    u_colorBack: getShaderColorFromString(colorBack),
    u_colorFront: getShaderColorFromString(colorFront),
    u_shape: DitheringShapes[shape],
    u_type: DitheringTypes[type],
    u_pxSize: size,
    // Novos uniforms
    u_image: image,
    u_mixFactor: mixFactor,
    // Uniforms de sizing
    u_fit: ShaderFitOptions[fit],
    u_scale: scale,
    u_rotation: rotation,
    u_offsetX: offsetX,
    u_offsetY: offsetY,
    u_originX: originX,
    u_originY: originY,
    u_worldWidth: worldWidth,
    u_worldHeight: worldHeight
  };
  return jsx(ShaderMount, {
    ...props,
    speed,
    frame,
    fragmentShader: customDitheringImageShader,
    uniforms
  });
});

export { CustomDitheringImage as C };
//# sourceMappingURL=CustomDitheringImage-DPVDOkNL.mjs.map
