"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Three depth layers — each moves at different speed/brightness
// giving natural parallax depth without changing particle size
const LAYERS = [
  { count: 10000, zRange: 2.0, speedMul: 0.4, ampMul: 0.6, alphaMul: 0.10 }, // bg — slow, dim
  { count: 8000,  zRange: 0.5, speedMul: 1.0, ampMul: 1.0, alphaMul: 0.18 }, // mid
  { count: 4000,  zRange: 0.1, speedMul: 1.6, ampMul: 1.3, alphaMul: 0.28 }, // fg — fast, bright
];

const vertexShader = `
  attribute float seed;
  attribute float offset;
  attribute float aAlpha;
  varying float vAlpha;
  varying float vBrightness;
  uniform float uTime;
  uniform float uSpeedMul;
  uniform float uAmpMul;
  uniform float uAlphaMul;

  float hash(float n) { return fract(sin(n) * 43758.5453123); }

  void main() {
    float px = position.x;
    float py = position.y;

    float speedX = hash(seed * 1.3) * 0.6 + 0.2;
    float speedY = hash(seed * 2.7) * 0.4 + 0.15;
    float ampX   = (hash(seed * 3.1) * 0.25 + 0.05) * uAmpMul;
    float ampY   = (hash(seed * 4.9) * 0.20 + 0.05) * uAmpMul;

    float dx = sin(uTime * speedX * uSpeedMul + offset       + py * 0.30) * ampX
             + cos(uTime * 0.40  * uSpeedMul  + offset * 1.3            ) * ampX * 0.5;
    float dy = cos(uTime * speedY * uSpeedMul + offset       + px * 0.25) * ampY
             + sin(uTime * 0.35  * uSpeedMul  + offset * 0.9            ) * ampY * 0.5;

    vec3 pos = position;
    pos.x += dx;
    pos.y += dy;

    // Two waves at different angles — interference pattern = attractive moiré
    float wave1 = sin(px * 0.5  + uTime * 0.9 * uSpeedMul + offset      ) * 0.5 + 0.5;
    float wave2 = sin((px + py) * 0.35 - uTime * 0.6 * uSpeedMul + offset * 0.7) * 0.5 + 0.5;
    float waveCombined = wave1 * 0.65 + wave2 * 0.35;

    float frame   = floor(uTime * 20.0);
    float flicker = hash(seed + frame * 0.09) * 0.20 + 0.80;

    vAlpha      = waveCombined * flicker * uAlphaMul * aAlpha;
    vBrightness = waveCombined;

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 1.6;
    gl_Position  = projectionMatrix * mvPos;
  }
`;

const fragmentShader = `
  varying float vAlpha;
  varying float vBrightness;

  void main() {
    if (vAlpha < 0.008) discard;
    // Wave crest = slightly warmer white, trough = cooler — very subtle
    float r = 1.0;
    float g = 0.97 + vBrightness * 0.03;
    float b = 0.92 + vBrightness * 0.05;
    gl_FragColor = vec4(r, g, b, vAlpha);
  }
`;

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
    });

    const W = window.innerWidth;
    const H = window.innerHeight;
    renderer.setSize(W, H);
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, W / H, 0.1, 1000);
    camera.position.z = 5;

    // Build each layer as a separate Points object
    const materials = [];

    LAYERS.forEach(({ count, zRange, speedMul, ampMul, alphaMul }) => {
      const positions = new Float32Array(count * 3);
      const seeds     = new Float32Array(count);
      const offsets   = new Float32Array(count);
      const alphas    = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 24;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 24;
        positions[i * 3 + 2] = (Math.random() - 0.5) * zRange;
        seeds[i]   = Math.random() * 100.0;
        offsets[i] = Math.random() * 6.2832;
        alphas[i]  = Math.random() * 0.5 + 0.5; // per-particle brightness variation
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("seed",     new THREE.BufferAttribute(seeds, 1));
      geo.setAttribute("offset",   new THREE.BufferAttribute(offsets, 1));
      geo.setAttribute("aAlpha",   new THREE.BufferAttribute(alphas, 1));

      const mat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite:  false,
        uniforms: {
          uTime:     { value: 0 },
          uSpeedMul: { value: speedMul },
          uAmpMul:   { value: ampMul },
          uAlphaMul: { value: alphaMul },
        },
        vertexShader,
        fragmentShader,
      });

      materials.push(mat);
      scene.add(new THREE.Points(geo, mat));
    });

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    let animId;
    let t = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.01;
      materials.forEach(m => { m.uniforms.uTime.value = t; });
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      scene.children.forEach(child => {
        child.geometry.dispose();
      });
      materials.forEach(m => m.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}