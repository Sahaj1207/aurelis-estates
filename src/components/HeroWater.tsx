import React, { useEffect, useRef } from "react";

interface HeroWaterProps {
  // The hero photograph this surface sits on; its pixels and crop are reused
  imageRef: React.RefObject<HTMLImageElement | null>;
}

// Outline of the reflecting pool in the hero photograph, in image UV space
// (origin top-left), wound so each edge's outward normal faces away from the water.
const POOL_OUTLINE = [
  [0.12, 0.7],
  [0.33, 0.605],
  [0.62, 0.6],
  [0.895, 0.65],
  [0.8, 1.05],
  [0.3, 1.05],
];

const VERT = `#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const COMMON = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform vec4 uCover; // image UV = screen UV * xy + zw (object-fit: cover)

const vec2 POOL[6] = vec2[6](${POOL_OUTLINE.map(
  ([x, y]) => `vec2(${x.toFixed(3)}, ${y.toFixed(3)})`
).join(", ")});

vec2 imageUv() {
  return vec2(vUv.x, 1.0 - vUv.y) * uCover.xy + uCover.zw;
}

// 1 on the water, 0 on stone, with a soft shoreline
float poolMask(vec2 p) {
  float d = -1.0;
  for (int i = 0; i < 6; i++) {
    vec2 a = POOL[i];
    vec2 e = POOL[(i + 1) % 6] - a;
    d = max(d, dot(p - a, normalize(vec2(e.y, -e.x))));
  }
  return 1.0 - smoothstep(-0.022, 0.004, d);
}`;

// One step of the 2D wave equation. R holds the surface height now, G the height
// one step ago; together they carry velocity, so waves travel, interfere and
// reflect off the pool walls instead of merely fading.
const SIM_FRAG = `${COMMON}
uniform sampler2D uState;
uniform vec2 uTexel;
uniform vec2 uSimSize;
uniform vec2 uP0;
uniform vec2 uP1;
uniform float uStrength;
uniform float uRadius;
uniform float uDamping;

void main() {
  vec4 s = texture(uState, vUv);
  float sum =
    texture(uState, vUv + vec2(uTexel.x, 0.0)).r +
    texture(uState, vUv - vec2(uTexel.x, 0.0)).r +
    texture(uState, vUv + vec2(0.0, uTexel.y)).r +
    texture(uState, vUv - vec2(0.0, uTexel.y)).r;
  float h = (sum * 0.5 - s.g) * uDamping;

  if (uStrength > 0.0) {
    // Press the surface down along the pointer's path since the last step
    vec2 g = vUv * uSimSize;
    vec2 a = uP0 * uSimSize;
    vec2 ab = uP1 * uSimSize - a;
    float t = clamp(dot(g - a, ab) / max(dot(ab, ab), 1e-4), 0.0, 1.0);
    float d = length(g - (a + ab * t));
    h -= uStrength * exp(-(d * d) / (uRadius * uRadius));
  }

  // Stone holds the surface at rest, which is what makes waves bounce back
  h *= poolMask(imageUv());
  outColor = vec4(h, s.r, 0.0, 1.0);
}`;

// Draws the photograph through the moving surface: the slope of the water bends
// the reflection and catches a little of the interior's warm light.
const RENDER_FRAG = `${COMMON}
uniform sampler2D uState;
uniform sampler2D uImage;
uniform vec2 uTexel;

void main() {
  vec2 iuv = imageUv();
  float m = poolMask(iuv);
  float hx = texture(uState, vUv + vec2(uTexel.x, 0.0)).r - texture(uState, vUv - vec2(uTexel.x, 0.0)).r;
  float hy = texture(uState, vUv + vec2(0.0, uTexel.y)).r - texture(uState, vUv - vec2(0.0, uTexel.y)).r;
  vec2 slope = vec2(hx, -hy);

  vec2 bend = clamp(slope * 0.45, -0.022, 0.022) * m;
  vec3 color = texture(uImage, iuv + bend).rgb;

  vec3 normal = normalize(vec3(-slope * 26.0, 1.0));
  float glint = pow(clamp(dot(normal, normalize(vec3(-0.25, 0.62, 0.74))), 0.0, 1.0), 48.0);
  color += vec3(1.0, 0.85, 0.6) * glint * 0.3;
  color *= 1.0 - clamp(length(slope) * 1.6, 0.0, 0.18);

  // Only the water is drawn; the rest of the photograph shows through untouched
  outColor = vec4(color * m, m);
}`;

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) ?? "shader compile failed");
  }
  return shader;
}

function link(gl: WebGL2RenderingContext, vert: WebGLShader, fragSource: string) {
  const program = gl.createProgram()!;
  gl.attachShader(program, vert);
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fragSource));
  gl.bindAttribLocation(program, 0, "aPos");
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) ?? "program link failed");
  }
  return program;
}

export const HeroWater: React.FC<HeroWaterProps> = ({ imageRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    const section = canvas?.closest("section");
    if (!canvas || !image || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      powerPreference: "low-power",
    });
    // The height field needs a float render target; without one the photograph simply stays still
    if (!gl || !(gl.getExtension("EXT_color_buffer_float") || gl.getExtension("EXT_color_buffer_half_float"))) {
      return;
    }

    let simProgram: WebGLProgram;
    let renderProgram: WebGLProgram;
    try {
      const vert = compile(gl, gl.VERTEX_SHADER, VERT);
      simProgram = link(gl, vert, SIM_FRAG);
      renderProgram = link(gl, vert, RENDER_FRAG);
    } catch {
      return;
    }

    const uniforms = (program: WebGLProgram, names: string[]) =>
      Object.fromEntries(names.map((n) => [n, gl.getUniformLocation(program, n)]));
    const simU = uniforms(simProgram, [
      "uState", "uTexel", "uSimSize", "uP0", "uP1", "uStrength", "uRadius", "uDamping", "uCover",
    ]);
    const renderU = uniforms(renderProgram, ["uState", "uImage", "uTexel", "uCover"]);

    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const makeTexture = () => {
      const tex = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      return tex;
    };

    const imageTex = makeTexture();
    const state = [makeTexture(), makeTexture()];
    const targets = [gl.createFramebuffer()!, gl.createFramebuffer()!];
    let simW = 0;
    let simH = 0;
    let current = 0;
    let cover = [1, 1, 0, 0];
    let ready = false;

    const measure = () => {
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      if (!cw || !ch || !image.naturalWidth) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);

      // Match the <img>'s object-fit: cover crop exactly
      const [px, py] = getComputedStyle(image)
        .objectPosition.split(" ")
        .map((v) => (v.endsWith("%") ? parseFloat(v) / 100 : 0.5));
      const canvasAspect = cw / ch;
      const imageAspect = image.naturalWidth / image.naturalHeight;
      if (canvasAspect > imageAspect) {
        const fy = imageAspect / canvasAspect;
        cover = [1, fy, 0, (1 - fy) * py];
      } else {
        const fx = canvasAspect / imageAspect;
        cover = [fx, 1, (1 - fx) * px, 0];
      }

      // The pool is seen at a low angle, so the grid has extra rows: waves that are
      // circular on the surface read as the wide ellipses the eye expects.
      const nextW = cw < 768 ? 176 : 256;
      const nextH = Math.min(640, Math.round(nextW * (ch / cw) * 2.2));
      if (nextW === simW && nextH === simH) return;
      simW = nextW;
      simH = nextH;
      state.forEach((tex, i) => {
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, simW, simH, 0, gl.RGBA, gl.HALF_FLOAT, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, targets[i]);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
      });
    };

    // Pointer disturbance queued for the next simulation step, in canvas UV (origin bottom-left)
    let last: [number, number] | null = null;
    let segment: { from: [number, number]; to: [number, number]; strength: number } | null = null;

    const toUv = (clientX: number, clientY: number): [number, number] => {
      const rect = canvas.getBoundingClientRect();
      return [(clientX - rect.left) / rect.width, 1 - (clientY - rect.top) / rect.height];
    };

    const disturb = (clientX: number, clientY: number, press: boolean) => {
      const point = toUv(clientX, clientY);
      const from = press || !last ? point : last;
      const rect = canvas.getBoundingClientRect();
      const travel = Math.hypot((point[0] - from[0]) * rect.width, (point[1] - from[1]) * rect.height);
      // A faster hand moves more water
      const strength = press ? 0.13 : Math.min(0.085, 0.01 + travel * 0.0013);
      segment = {
        from: segment && !press ? segment.from : from,
        to: point,
        strength: Math.max(strength, segment?.strength ?? 0),
      };
      last = point;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse") disturb(e.clientX, e.clientY, false);
    };
    const onPointerDown = (e: PointerEvent) => disturb(e.clientX, e.clientY, true);
    const onPointerLeave = () => {
      last = null;
    };
    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) disturb(touch.clientX, touch.clientY, false);
    };
    const onTouchEnd = () => {
      last = null;
    };

    let frame = 0;
    let visible = false;
    let previousTime = 0;
    let accumulator = 0;
    let nextAmbient = 1200;
    const STEP = 1000 / 60;

    const step = () => {
      const next = 1 - current;
      gl.bindFramebuffer(gl.FRAMEBUFFER, targets[next]);
      gl.viewport(0, 0, simW, simH);
      gl.useProgram(simProgram);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, state[current]);
      gl.uniform1i(simU.uState, 0);
      gl.uniform2f(simU.uTexel, 1 / simW, 1 / simH);
      gl.uniform2f(simU.uSimSize, simW, simH);
      gl.uniform4f(simU.uCover, cover[0], cover[1], cover[2], cover[3]);
      gl.uniform1f(simU.uDamping, 0.988);
      gl.uniform1f(simU.uRadius, 3.2);
      if (segment) {
        gl.uniform2f(simU.uP0, segment.from[0], segment.from[1]);
        gl.uniform2f(simU.uP1, segment.to[0], segment.to[1]);
        gl.uniform1f(simU.uStrength, segment.strength);
        segment = null;
      } else {
        gl.uniform1f(simU.uStrength, 0);
      }
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      current = next;
    };

    const draw = () => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(renderProgram);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, state[current]);
      gl.uniform1i(renderU.uState, 0);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, imageTex);
      gl.uniform1i(renderU.uImage, 1);
      gl.uniform2f(renderU.uTexel, 1 / simW, 1 / simH);
      gl.uniform4f(renderU.uCover, cover[0], cover[1], cover[2], cover[3]);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const tick = (time: number) => {
      frame = requestAnimationFrame(tick);
      const delta = Math.min(50, time - (previousTime || time));
      previousTime = time;

      // A stray drop now and then keeps the surface alive when nobody is touching it
      nextAmbient -= delta;
      if (nextAmbient <= 0 && !segment) {
        nextAmbient = 2600 + Math.random() * 3200;
        const ix = 0.3 + Math.random() * 0.45;
        const iy = 0.68 + Math.random() * 0.26;
        const point: [number, number] = [
          (ix - cover[2]) / cover[0],
          1 - (iy - cover[3]) / cover[1],
        ];
        segment = { from: point, to: point, strength: 0.045 };
      }

      // Fixed timestep so wave speed is the same on a 60Hz phone and a 144Hz monitor
      accumulator += delta;
      let steps = 0;
      while (accumulator >= STEP && steps < 3) {
        step();
        accumulator -= STEP;
        steps += 1;
      }
      if (steps === 3) accumulator = 0;
      draw();
    };

    const start = () => {
      if (frame || !ready || !visible || document.hidden) return;
      previousTime = 0;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const upload = () => {
      measure();
      if (!simW) return;
      try {
        gl.bindTexture(gl.TEXTURE_2D, imageTex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      } catch {
        return;
      }
      ready = true;
      canvas.style.opacity = "1";
      start();
    };

    if (image.complete && image.naturalWidth) upload();
    else image.addEventListener("load", upload, { once: true });

    const resizeObserver = new ResizeObserver(() => {
      if (ready) measure();
    });
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    intersectionObserver.observe(section);

    const onVisibility = () => (document.hidden ? stop() : start());
    const onContextLost = (e: Event) => {
      e.preventDefault();
      ready = false;
      stop();
      canvas.style.opacity = "0";
    };

    section.addEventListener("pointermove", onPointerMove, { passive: true });
    section.addEventListener("pointerdown", onPointerDown, { passive: true });
    section.addEventListener("pointerleave", onPointerLeave, { passive: true });
    section.addEventListener("touchmove", onTouchMove, { passive: true });
    section.addEventListener("touchend", onTouchEnd, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    canvas.addEventListener("webglcontextlost", onContextLost);

    return () => {
      stop();
      image.removeEventListener("load", upload);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerdown", onPointerDown);
      section.removeEventListener("pointerleave", onPointerLeave);
      section.removeEventListener("touchmove", onTouchMove);
      section.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.style.opacity = "0";
      [imageTex, ...state].forEach((tex) => gl.deleteTexture(tex));
      targets.forEach((fb) => gl.deleteFramebuffer(fb));
      gl.deleteBuffer(quad);
      gl.deleteProgram(simProgram);
      gl.deleteProgram(renderProgram);
    };
  }, [imageRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-[1200ms] ease-out"
    />
  );
};
