var V=Object.defineProperty;var P=(t,e,o)=>e in t?V(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o;var n=(t,e,o)=>P(t,typeof e!="symbol"?e+"":e,o);import{r as p,j as O}from"./main-CZT1w5fq.js";const H=`#version 300 es
precision mediump float;

layout(location = 0) in vec4 a_position;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_imageAspectRatio;

uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;

uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

uniform float u_pxSize;

out vec2 v_objectUV;
out vec2 v_objectBoxSize;
out vec2 v_objectHelperBox;

out vec2 v_responsiveUV;
out vec2 v_responsiveBoxSize;
out vec2 v_responsiveHelperBox;
out vec2 v_responsiveBoxGivenSize;

out vec2 v_patternUV;
out vec2 v_patternBoxSize;
out vec2 v_patternHelperBox;

out vec2 v_imageUV;

// #define ADD_HELPERS

vec3 getBoxSize(float boxRatio, vec2 givenBoxSize) {
  vec2 box = vec2(0.);
  // fit = none
  box.x = boxRatio * min(givenBoxSize.x / boxRatio, givenBoxSize.y);
  float noFitBoxWidth = box.x;
  if (u_fit == 1.) { // fit = contain
    box.x = boxRatio * min(u_resolution.x / boxRatio, u_resolution.y);
  } else if (u_fit == 2.) { // fit = cover
    box.x = boxRatio * max(u_resolution.x / boxRatio, u_resolution.y);
  }
  box.y = box.x / boxRatio;
  return vec3(box, noFitBoxWidth);
}

void main() {
  gl_Position = a_position;

  vec2 uv = gl_Position.xy * .5;
  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
  givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
  float r = u_rotation * 3.14159265358979323846 / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);


  // ===================================================
  // Sizing api for graphic objects with fixed ratio
  // (currently supports only ratio = 1)

  float fixedRatio = 1.;
  vec2 fixedRatioBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );

  v_objectBoxSize = getBoxSize(fixedRatio, fixedRatioBoxGivenSize).xy;
  vec2 objectWorldScale = u_resolution.xy / v_objectBoxSize;

  #ifdef ADD_HELPERS
  v_objectHelperBox = uv;
  v_objectHelperBox *= objectWorldScale;
  v_objectHelperBox += boxOrigin * (objectWorldScale - 1.);
  #endif

  v_objectUV = uv;
  v_objectUV *= objectWorldScale;
  v_objectUV += boxOrigin * (objectWorldScale - 1.);
  v_objectUV += graphicOffset;
  v_objectUV /= u_scale;
  v_objectUV = graphicRotation * v_objectUV;


  // ===================================================


  // ===================================================
  // Sizing api for graphic objects with either givenBoxSize ratio or canvas ratio.
  // Full-screen mode available with u_worldWidth = u_worldHeight = 0

  v_responsiveBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  float responsiveRatio = v_responsiveBoxGivenSize.x / v_responsiveBoxGivenSize.y;
  v_responsiveBoxSize = getBoxSize(responsiveRatio, v_responsiveBoxGivenSize).xy;
  vec2 responsiveBoxScale = u_resolution.xy / v_responsiveBoxSize;

  #ifdef ADD_HELPERS
  v_responsiveHelperBox = uv;
  v_responsiveHelperBox *= responsiveBoxScale;
  v_responsiveHelperBox += boxOrigin * (responsiveBoxScale - 1.);
  #endif

  v_responsiveUV = uv;
  v_responsiveUV *= responsiveBoxScale;
  v_responsiveUV += boxOrigin * (responsiveBoxScale - 1.);
  v_responsiveUV += graphicOffset;
  v_responsiveUV /= u_scale;
  v_responsiveUV.x *= responsiveRatio;
  v_responsiveUV = graphicRotation * v_responsiveUV;
  v_responsiveUV.x /= responsiveRatio;

  // ===================================================


  // ===================================================
  // Sizing api for patterns
  // (treating graphics as a image u_worldWidth x u_worldHeight size)

  float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
  vec2 patternBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  patternBoxRatio = patternBoxGivenSize.x / patternBoxGivenSize.y;

  vec3 boxSizeData = getBoxSize(patternBoxRatio, patternBoxGivenSize);
  v_patternBoxSize = boxSizeData.xy;
  float patternBoxNoFitBoxWidth = boxSizeData.z;
  vec2 patternBoxScale = u_resolution.xy / v_patternBoxSize;

  #ifdef ADD_HELPERS
  v_patternHelperBox = uv;
  v_patternHelperBox *= patternBoxScale;
  v_patternHelperBox += boxOrigin * (patternBoxScale - 1.);
  #endif

  v_patternUV = uv;
  v_patternUV += graphicOffset / patternBoxScale;
  v_patternUV += boxOrigin;
  v_patternUV -= boxOrigin / patternBoxScale;
  v_patternUV *= u_resolution.xy;
  v_patternUV /= u_pixelRatio;
  if (u_fit > 0.) {
    v_patternUV *= (patternBoxNoFitBoxWidth / v_patternBoxSize.x);
  }
  v_patternUV /= u_scale;
  v_patternUV = graphicRotation * v_patternUV;
  v_patternUV += boxOrigin / patternBoxScale;
  v_patternUV -= boxOrigin;
  // x100 is a default multiplier between vertex and fragmant shaders
  // we use it to avoid UV presision issues
  v_patternUV *= .01;

  // ===================================================


  // ===================================================
  // Sizing api for images

  vec2 imageBoxSize;
  if (u_fit == 1.) { // contain
    imageBoxSize.x = min(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else if (u_fit == 2.) { // cover
    imageBoxSize.x = max(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else {
    imageBoxSize.x = min(10.0, 10.0 / u_imageAspectRatio * u_imageAspectRatio);
  }
  imageBoxSize.y = imageBoxSize.x / u_imageAspectRatio;
  vec2 imageBoxScale = u_resolution.xy / imageBoxSize;

  #ifdef ADD_HELPERS
  vec2 imageHelperBox = uv;
  imageHelperBox *= imageBoxScale;
  imageHelperBox += boxOrigin * (imageBoxScale - 1.);
  #endif

  v_imageUV = uv;
  v_imageUV *= imageBoxScale;
  v_imageUV += boxOrigin * (imageBoxScale - 1.);
  v_imageUV += graphicOffset;
  v_imageUV /= u_scale;
  v_imageUV.x *= u_imageAspectRatio;
  v_imageUV = graphicRotation * v_imageUV;
  v_imageUV.x /= u_imageAspectRatio;

  v_imageUV += .5;
  v_imageUV.y = 1. - v_imageUV.y;

  // ===================================================

}`,z=1920*1080*4;let T=class{constructor(e,o,i,s,r=0,a=0,l=2,f=z){n(this,"parentElement");n(this,"canvasElement");n(this,"gl");n(this,"program",null);n(this,"uniformLocations",{});n(this,"fragmentShader");n(this,"rafId",null);n(this,"lastRenderTime",0);n(this,"currentFrame",0);n(this,"speed",0);n(this,"currentSpeed",0);n(this,"providedUniforms");n(this,"hasBeenDisposed",!1);n(this,"resolutionChanged",!0);n(this,"textures",new Map);n(this,"minPixelRatio");n(this,"maxPixelCount");n(this,"isSafari",L());n(this,"uniformCache",{});n(this,"textureUnitMap",new Map);n(this,"initProgram",()=>{const e=D(this.gl,H,this.fragmentShader);e&&(this.program=e)});n(this,"setupPositionAttribute",()=>{const e=this.gl.getAttribLocation(this.program,"a_position"),o=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o);const i=[-1,-1,1,-1,-1,1,-1,1,1,-1,1,1];this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(i),this.gl.STATIC_DRAW),this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0)});n(this,"setupUniforms",()=>{const e={u_time:this.gl.getUniformLocation(this.program,"u_time"),u_pixelRatio:this.gl.getUniformLocation(this.program,"u_pixelRatio"),u_resolution:this.gl.getUniformLocation(this.program,"u_resolution")};Object.entries(this.providedUniforms).forEach(([o,i])=>{if(e[o]=this.gl.getUniformLocation(this.program,o),i instanceof HTMLImageElement){const s=`${o}AspectRatio`;e[s]=this.gl.getUniformLocation(this.program,s)}}),this.uniformLocations=e});n(this,"renderScale",1);n(this,"parentWidth",0);n(this,"parentHeight",0);n(this,"parentDevicePixelWidth",0);n(this,"parentDevicePixelHeight",0);n(this,"devicePixelsSupported",!1);n(this,"resizeObserver",null);n(this,"setupResizeObserver",()=>{this.resizeObserver=new ResizeObserver(([e])=>{var o;if(e!=null&&e.borderBoxSize[0]){const i=(o=e.devicePixelContentBoxSize)==null?void 0:o[0];i!==void 0&&(this.devicePixelsSupported=!0,this.parentDevicePixelWidth=i.inlineSize,this.parentDevicePixelHeight=i.blockSize),this.parentWidth=e.borderBoxSize[0].inlineSize,this.parentHeight=e.borderBoxSize[0].blockSize}this.handleResize()}),this.resizeObserver.observe(this.parentElement)});n(this,"handleVisualViewportChange",()=>{var e;(e=this.resizeObserver)==null||e.disconnect(),this.setupResizeObserver()});n(this,"handleResize",()=>{let e=0,o=0;const i=Math.max(1,window.devicePixelRatio),s=(visualViewport==null?void 0:visualViewport.scale)??1;if(this.devicePixelsSupported){const c=Math.max(1,this.minPixelRatio/i);e=this.parentDevicePixelWidth*c*s,o=this.parentDevicePixelHeight*c*s}else{let c=Math.max(i,this.minPixelRatio)*s;if(this.isSafari){const g=I();c*=Math.max(1,g)}e=Math.round(this.parentWidth)*c,o=Math.round(this.parentHeight)*c}const r=Math.sqrt(this.maxPixelCount)/Math.sqrt(e*o),a=Math.min(1,r),l=Math.round(e*a),f=Math.round(o*a),u=l/Math.round(this.parentWidth);(this.canvasElement.width!==l||this.canvasElement.height!==f||this.renderScale!==u)&&(this.renderScale=u,this.canvasElement.width=l,this.canvasElement.height=f,this.resolutionChanged=!0,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.render(performance.now()))});n(this,"render",e=>{if(this.hasBeenDisposed)return;if(this.program===null){console.warn("Tried to render before program or gl was initialized");return}const o=e-this.lastRenderTime;this.lastRenderTime=e,this.currentSpeed!==0&&(this.currentFrame+=o*this.currentSpeed),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.useProgram(this.program),this.gl.uniform1f(this.uniformLocations.u_time,this.currentFrame*.001),this.resolutionChanged&&(this.gl.uniform2f(this.uniformLocations.u_resolution,this.gl.canvas.width,this.gl.canvas.height),this.gl.uniform1f(this.uniformLocations.u_pixelRatio,this.renderScale),this.resolutionChanged=!1),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.currentSpeed!==0?this.requestRender():this.rafId=null});n(this,"requestRender",()=>{this.rafId!==null&&cancelAnimationFrame(this.rafId),this.rafId=requestAnimationFrame(this.render)});n(this,"setTextureUniform",(e,o)=>{if(!o.complete||o.naturalWidth===0)throw new Error(`Paper Shaders: image for uniform ${e} must be fully loaded`);const i=this.textures.get(e);i&&this.gl.deleteTexture(i),this.textureUnitMap.has(e)||this.textureUnitMap.set(e,this.textureUnitMap.size);const s=this.textureUnitMap.get(e);this.gl.activeTexture(this.gl.TEXTURE0+s);const r=this.gl.createTexture();this.gl.bindTexture(this.gl.TEXTURE_2D,r),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,o);const a=this.gl.getError();if(a!==this.gl.NO_ERROR||r===null){console.error("Paper Shaders: WebGL error when uploading texture:",a);return}this.textures.set(e,r);const l=this.uniformLocations[e];if(l){this.gl.uniform1i(l,s);const f=`${e}AspectRatio`,u=this.uniformLocations[f];if(u){const c=o.naturalWidth/o.naturalHeight;this.gl.uniform1f(u,c)}}});n(this,"areUniformValuesEqual",(e,o)=>e===o?!0:Array.isArray(e)&&Array.isArray(o)&&e.length===o.length?e.every((i,s)=>this.areUniformValuesEqual(i,o[s])):!1);n(this,"setUniformValues",e=>{this.gl.useProgram(this.program),Object.entries(e).forEach(([o,i])=>{let s=i;if(i instanceof HTMLImageElement&&(s=`${i.src.slice(0,200)}|${i.naturalWidth}x${i.naturalHeight}`),this.areUniformValuesEqual(this.uniformCache[o],s))return;this.uniformCache[o]=s;const r=this.uniformLocations[o];if(!r){console.warn(`Uniform location for ${o} not found`);return}if(i instanceof HTMLImageElement)this.setTextureUniform(o,i);else if(Array.isArray(i)){let a=null,l=null;if(i[0]!==void 0&&Array.isArray(i[0])){const f=i[0].length;if(i.every(u=>u.length===f))a=i.flat(),l=f;else{console.warn(`All child arrays must be the same length for ${o}`);return}}else a=i,l=a.length;switch(l){case 2:this.gl.uniform2fv(r,a);break;case 3:this.gl.uniform3fv(r,a);break;case 4:this.gl.uniform4fv(r,a);break;case 9:this.gl.uniformMatrix3fv(r,!1,a);break;case 16:this.gl.uniformMatrix4fv(r,!1,a);break;default:console.warn(`Unsupported uniform array length: ${l}`)}}else typeof i=="number"?this.gl.uniform1f(r,i):typeof i=="boolean"?this.gl.uniform1i(r,i?1:0):console.warn(`Unsupported uniform type for ${o}: ${typeof i}`)})});n(this,"getCurrentFrame",()=>this.currentFrame);n(this,"setFrame",e=>{this.currentFrame=e,this.lastRenderTime=performance.now(),this.render(performance.now())});n(this,"setSpeed",(e=1)=>{this.speed=e,this.setCurrentSpeed(document.hidden?0:e)});n(this,"setCurrentSpeed",e=>{this.currentSpeed=e,this.rafId===null&&e!==0&&(this.lastRenderTime=performance.now(),this.rafId=requestAnimationFrame(this.render)),this.rafId!==null&&e===0&&(cancelAnimationFrame(this.rafId),this.rafId=null)});n(this,"setMaxPixelCount",(e=z)=>{this.maxPixelCount=e,this.handleResize()});n(this,"setMinPixelRatio",(e=2)=>{this.minPixelRatio=e,this.handleResize()});n(this,"setUniforms",e=>{this.setUniformValues(e),this.providedUniforms={...this.providedUniforms,...e},this.render(performance.now())});n(this,"handleDocumentVisibilityChange",()=>{this.setCurrentSpeed(document.hidden?0:this.speed)});n(this,"dispose",()=>{this.hasBeenDisposed=!0,this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.gl&&this.program&&(this.textures.forEach(e=>{this.gl.deleteTexture(e)}),this.textures.clear(),this.gl.deleteProgram(this.program),this.program=null,this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,null),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,null),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.getError()),this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null),visualViewport==null||visualViewport.removeEventListener("resize",this.handleVisualViewportChange),document.removeEventListener("visibilitychange",this.handleDocumentVisibilityChange),this.uniformLocations={},this.canvasElement.remove(),delete this.parentElement.paperShaderMount});if(e instanceof HTMLElement)this.parentElement=e;else throw new Error("Paper Shaders: parent element must be an HTMLElement");if(!document.querySelector("style[data-paper-shader]")){const g=document.createElement("style");g.innerHTML=W,g.setAttribute("data-paper-shader",""),document.head.prepend(g)}const u=document.createElement("canvas");this.canvasElement=u,this.parentElement.prepend(u),this.fragmentShader=o,this.providedUniforms=i,this.currentFrame=a,this.minPixelRatio=l,this.maxPixelCount=f;const c=u.getContext("webgl2",s);if(!c)throw new Error("Paper Shaders: WebGL is not supported in this browser");this.gl=c,this.initProgram(),this.setupPositionAttribute(),this.setupUniforms(),this.setUniformValues(this.providedUniforms),this.setupResizeObserver(),visualViewport==null||visualViewport.addEventListener("resize",this.handleVisualViewportChange),this.setSpeed(r),this.parentElement.setAttribute("data-paper-shader",""),this.parentElement.paperShaderMount=this,document.addEventListener("visibilitychange",this.handleDocumentVisibilityChange)}};function U(t,e,o){const i=t.createShader(e);return i?(t.shaderSource(i,o),t.compileShader(i),t.getShaderParameter(i,t.COMPILE_STATUS)?i:(console.error("An error occurred compiling the shaders: "+t.getShaderInfoLog(i)),t.deleteShader(i),null)):null}function D(t,e,o){const i=t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT),s=i?i.precision:null;s&&s<23&&(e=e.replace(/precision\s+(lowp|mediump)\s+float;/g,"precision highp float;"),o=o.replace(/precision\s+(lowp|mediump)\s+float/g,"precision highp float").replace(/\b(uniform|varying|attribute)\s+(lowp|mediump)\s+(\w+)/g,"$1 highp $3"));const r=U(t,t.VERTEX_SHADER,e),a=U(t,t.FRAGMENT_SHADER,o);if(!r||!a)return null;const l=t.createProgram();return l?(t.attachShader(l,r),t.attachShader(l,a),t.linkProgram(l),t.getProgramParameter(l,t.LINK_STATUS)?(t.detachShader(l,r),t.detachShader(l,a),t.deleteShader(r),t.deleteShader(a),l):(console.error("Unable to initialize the shader program: "+t.getProgramInfoLog(l)),t.deleteProgram(l),t.deleteShader(r),t.deleteShader(a),null)):null}const W=`@layer paper-shaders {
  :where([data-paper-shader]) {
    isolation: isolate;
    position: relative;

    & canvas {
      contain: strict;
      display: block;
      position: absolute;
      inset: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      corner-shape: inherit;
    }
  }
}`;function L(){const t=navigator.userAgent.toLowerCase();return t.includes("safari")&&!t.includes("chrome")&&!t.includes("android")}function I(){const t=(visualViewport==null?void 0:visualViewport.scale)??1,e=(visualViewport==null?void 0:visualViewport.width)??window.innerWidth,o=window.innerWidth-document.documentElement.clientWidth,i=t*e+o,s=outerWidth/i,r=Math.round(100*s);return r%5===0?r/100:r===33?1/3:r===67?2/3:r===133?4/3:s}const Z=`
in vec2 v_objectUV;
in vec2 v_responsiveUV;
in vec2 v_responsiveBoxGivenSize;
in vec2 v_patternUV;
in vec2 v_imageUV;`,K=`
in vec2 v_objectBoxSize;
in vec2 v_objectHelperBox;
in vec2 v_responsiveBoxSize;
in vec2 v_responsiveHelperBox;
in vec2 v_patternBoxSize;
in vec2 v_patternHelperBox;`,J=`
uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;

uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;`,Q=`

  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  #ifdef USE_PIXELIZATION
    float pxSize = u_pxSize * u_pixelRatio;
    vec2 pxSizeUv = gl_FragCoord.xy;
    pxSizeUv -= .5 * u_resolution;
    pxSizeUv /= pxSize;
    uv = floor(pxSizeUv) * pxSize / u_resolution.xy;    
    uv += .5;
  #endif
  uv -= .5;

  
  // ===================================================
  // sizing params shared between objects and patterns
  
  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
  givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
  float r = u_rotation * 3.14159265358979323846 / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);

  
  // ===================================================
  // Sizing api for objects (graphics with fixed ratio)

  #ifdef USE_OBJECT_SIZING
    float fixedRatio = 1.;
    vec2 fixedRatioBoxGivenSize = vec2(
      (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
      (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
    );
    vec2 objectBoxSize = vec2(0.);
    // fit = none
    objectBoxSize.x = fixedRatio * min(fixedRatioBoxGivenSize.x / fixedRatio, fixedRatioBoxGivenSize.y);
    if (u_fit == 1.) { // fit = contain
      objectBoxSize.x = fixedRatio * min(u_resolution.x / fixedRatio, u_resolution.y);
    } else if (u_fit == 2.) {  // fit = cover
      objectBoxSize.x = fixedRatio * max(u_resolution.x / fixedRatio, u_resolution.y);
    }
    objectBoxSize.y = objectBoxSize.x / fixedRatio;
    vec2 objectWorldScale = u_resolution.xy / objectBoxSize;
  
    #ifdef ADD_HELPERS
      vec2 objectHelperBox = gl_FragCoord.xy / u_resolution.xy;
      objectHelperBox -= .5;
      objectHelperBox *= objectWorldScale;
      objectHelperBox += boxOrigin * (objectWorldScale - 1.);  
    #endif
  
    vec2 objectUV = uv;
    objectUV *= objectWorldScale;
    objectUV += boxOrigin * (objectWorldScale - 1.);
    objectUV += vec2(-u_offsetX, u_offsetY);
    objectUV /= u_scale;
    objectUV = graphicRotation * objectUV;
  #endif
  
  // ===================================================
 
  // ===================================================
  // Sizing api for patterns (graphics respecting u_worldWidth / u_worldHeight ratio)
  
  #ifdef USE_PATTERN_SIZING
    float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
    vec2 patternBoxGivenSize = vec2(
      (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
      (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
    );
    vec2 patternBoxSize = vec2(0.);
    // fit = none
    patternBoxSize.x = patternBoxRatio * min(patternBoxGivenSize.x / patternBoxRatio, patternBoxGivenSize.y);
    float patternWorldNoFitBoxWidth = patternBoxSize.x;
    if (u_fit == 1.) {  // fit = contain
      patternBoxSize.x = patternBoxRatio * min(u_resolution.x / patternBoxRatio, u_resolution.y);
    } else if (u_fit == 2.) {  // fit = cover
      patternBoxSize.x = patternBoxRatio * max(u_resolution.x / patternBoxRatio, u_resolution.y);
    }
    patternBoxSize.y = patternBoxSize.x / patternBoxRatio;
    vec2 patternWorldScale = u_resolution.xy / patternBoxSize;
  
    #ifdef ADD_HELPERS  
      vec2 patternHelperBox = gl_FragCoord.xy / u_resolution.xy;
      patternHelperBox -= .5;
      patternHelperBox *= patternWorldScale;
      patternHelperBox += boxOrigin * (patternWorldScale - 1.);  
    #endif
  
    vec2 patternUV = uv;
    patternUV += vec2(-u_offsetX, u_offsetY) / patternWorldScale;
    patternUV += boxOrigin;
    patternUV -= boxOrigin / patternWorldScale;
    patternUV *= u_resolution.xy;
    patternUV /= u_pixelRatio;
    if (u_fit > 0.) {
      patternUV *= (patternWorldNoFitBoxWidth / patternBoxSize.x);
    }
    patternUV /= u_scale;
    patternUV = graphicRotation * patternUV;
    patternUV += boxOrigin / patternWorldScale;
    patternUV -= boxOrigin;
    patternUV += .5;
  #endif
    
  // ===================================================
 
  // ===================================================
  // Sizing api for image filters
  
  #ifdef USE_IMAGE_SIZING

    vec2 imageBoxSize;
    if (u_fit == 1.) { // contain
      imageBoxSize.x = min(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
    } else if (u_fit == 2.) { // cover
      imageBoxSize.x = max(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
    } else {
      imageBoxSize.x = min(10.0, 10.0 / u_imageAspectRatio * u_imageAspectRatio);
    }
    imageBoxSize.y = imageBoxSize.x / u_imageAspectRatio;
    vec2 imageBoxScale = u_resolution.xy / imageBoxSize;

    #ifdef ADD_HELPERS
      vec2 imageHelperBox = uv;
      imageHelperBox *= imageBoxScale;
      imageHelperBox += boxOrigin * (imageBoxScale - 1.);
    #endif

    vec2 imageUV = uv;
    imageUV *= imageBoxScale;
    imageUV += boxOrigin * (imageBoxScale - 1.);
    imageUV += graphicOffset;
    imageUV /= u_scale;
    imageUV.x *= u_imageAspectRatio;
    imageUV = graphicRotation * imageUV;
    imageUV.x /= u_imageAspectRatio;
    
    imageUV += .5;
    imageUV.y = 1. - imageUV.y;
  #endif
`,ee=`
  vec2 worldBoxDist = abs(helperBox);
  float boxStroke = (step(max(worldBoxDist.x, worldBoxDist.y), .5) - step(max(worldBoxDist.x, worldBoxDist.y), .495));
  color.rgb = mix(color.rgb, vec3(1., 0., 0.), boxStroke);
  opacity += boxStroke;

  vec2 boxOriginCopy = vec2(.5 - u_originX, u_originY - .5);
  vec2 boxOriginDist = helperBox + boxOriginCopy;
  boxOriginDist.x *= (boxSize.x / boxSize.y);
  float boxOriginPoint = 1. - smoothstep(0., .05, length(boxOriginDist));
  
  vec2 graphicOriginPointDist = helperBox + vec2(-u_offsetX, u_offsetY);
  graphicOriginPointDist.x *= (boxSize.x / boxSize.y);
  float graphicOriginPoint = 1. - smoothstep(0., .05, length(graphicOriginPointDist));
  
  color.rgb = mix(color.rgb, vec3(0., 1., 0.), boxOriginPoint);
  opacity += boxOriginPoint;
  color.rgb = mix(color.rgb, vec3(0., 0., 1.), graphicOriginPoint);
  opacity += graphicOriginPoint;
`,te={fit:"contain",scale:1,rotation:0,offsetX:0,offsetY:0,originX:.5,originY:.5,worldWidth:0,worldHeight:0},ie={fit:"none",scale:1,rotation:0,offsetX:0,offsetY:0,originX:.5,originY:.5,worldWidth:0,worldHeight:0},oe={none:0,contain:1,cover:2},re=`
#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846
`,ne=`
vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}
`,ae=`
  float hash11(float p) {
    p = fract(p * 0.3183099) + 0.1;
    p *= p + 19.19;
    return fract(p * p);
  }
`,se=`
  float hash21(vec2 p) {
    p = fract(p * vec2(0.3183099, 0.3678794)) + 0.1;
    p += dot(p, p + 19.19);
    return fract(p.x * p.y);
  }
`,le=`
  float randomR(vec2 p) {
    vec2 uv = floor(p) / 100. + .5;
    return texture(u_noiseTexture, fract(uv)).r;
  }
`,ce=`
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
    -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
`;function ue(t){if(Array.isArray(t))return t.length===4?t:t.length===3?[...t,1]:B;if(typeof t!="string")return B;let e,o,i,s=1;if(t.startsWith("#"))[e,o,i,s]=j(t);else if(t.startsWith("rgb"))[e,o,i,s]=M(t);else if(t.startsWith("hsl"))[e,o,i,s]=C(F(t));else return console.error("Unsupported color format",t),B;return[b(e,0,1),b(o,0,1),b(i,0,1),b(s,0,1)]}function j(t){t=t.replace(/^#/,""),t.length===3&&(t=t.split("").map(r=>r+r).join("")),t.length===6&&(t=t+"ff");const e=parseInt(t.slice(0,2),16)/255,o=parseInt(t.slice(2,4),16)/255,i=parseInt(t.slice(4,6),16)/255,s=parseInt(t.slice(6,8),16)/255;return[e,o,i,s]}function M(t){const e=t.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+))?\s*\)$/i);return e?[parseInt(e[1]??"0")/255,parseInt(e[2]??"0")/255,parseInt(e[3]??"0")/255,e[4]===void 0?1:parseFloat(e[4])]:[0,0,0,1]}function F(t){const e=t.match(/^hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*([0-9.]+))?\s*\)$/i);return e?[parseInt(e[1]??"0"),parseInt(e[2]??"0"),parseInt(e[3]??"0"),e[4]===void 0?1:parseFloat(e[4])]:[0,0,0,1]}function C(t){const[e,o,i,s]=t,r=e/360,a=o/100,l=i/100;let f,u,c;if(o===0)f=u=c=l;else{const g=(m,v,h)=>(h<0&&(h+=1),h>1&&(h-=1),h<.16666666666666666?m+(v-m)*6*h:h<.5?v:h<.6666666666666666?m+(v-m)*(.6666666666666666-h)*6:m),_=l<.5?l*(1+a):l+a-l*a,d=2*l-_;f=g(d,_,r+1/3),u=g(d,_,r),c=g(d,_,r-1/3)}return[f,u,c,s]}const b=(t,e,o)=>Math.min(Math.max(t,e),o),B=[0,0,0,1];function G(){if(typeof window>"u"){console.warn("Paper Shaders: can’t create an image on the server");return}const t=new Image;return t.src=X,t}const X="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";function Y(t){const e=p.useRef(void 0),o=p.useCallback(i=>{const s=t.map(r=>{if(r!=null){if(typeof r=="function"){const a=r,l=a(i);return typeof l=="function"?l:()=>{a(null)}}return r.current=i,()=>{r.current=null}}});return()=>{s.forEach(r=>r==null?void 0:r())}},t);return p.useMemo(()=>t.every(i=>i==null)?null:i=>{e.current&&(e.current(),e.current=void 0),i!=null&&(e.current=o(i))},t)}async function E(t){const e={},o=[],i=r=>{try{return r.startsWith("/")||new URL(r),!0}catch{return!1}},s=r=>{try{return r.startsWith("/")?!1:new URL(r,window.location.origin).origin!==window.location.origin}catch{return!1}};return Object.entries(t).forEach(([r,a])=>{if(typeof a=="string"){if(!a){e[r]=G();return}if(!i(a)){console.warn(`Uniform "${r}" has invalid URL "${a}". Skipping image loading.`);return}const l=new Promise((f,u)=>{const c=new Image;s(a)&&(c.crossOrigin="anonymous"),c.onload=()=>{e[r]=c,f()},c.onerror=()=>{console.error(`Could not set uniforms. Failed to load image at ${a}`),u()},c.src=a});o.push(l)}else e[r]=a}),await Promise.all(o),e}const N=p.forwardRef(function({fragmentShader:e,uniforms:o,webGlContextAttributes:i,speed:s=0,frame:r=0,width:a,height:l,minPixelRatio:f,maxPixelCount:u,style:c,...g},_){const[d,m]=p.useState(!1),v=p.useRef(null),h=p.useRef(null),w=p.useRef(i);p.useEffect(()=>((async()=>{const S=await E(o);v.current&&!h.current&&(h.current=new T(v.current,e,S,w.current,s,r,f,u),m(!0))})(),()=>{var S;(S=h.current)==null||S.dispose(),h.current=null}),[e]),p.useEffect(()=>{let x=!1;return(async()=>{var R;const A=await E(o);x||(R=h.current)==null||R.setUniforms(A)})(),()=>{x=!0}},[o,d]),p.useEffect(()=>{var x;(x=h.current)==null||x.setSpeed(s)},[s,d]),p.useEffect(()=>{var x;(x=h.current)==null||x.setMaxPixelCount(u)},[u,d]),p.useEffect(()=>{var x;(x=h.current)==null||x.setMinPixelRatio(f)},[f,d]),p.useEffect(()=>{var x;(x=h.current)==null||x.setFrame(r)},[r,d]);const y=Y([v,_]);return O.jsx("div",{ref:y,style:a!==void 0||l!==void 0?{width:a,height:l,...c}:c,...g})});N.displayName="ShaderMount";export{N as S,oe as a,te as b,J as c,ie as d,ce as e,re as f,ue as g,ae as h,ee as i,Z as j,K as k,se as p,ne as r,Q as s,le as t};
