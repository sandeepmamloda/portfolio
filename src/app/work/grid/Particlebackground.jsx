"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      antialias: true, 
      alpha: true 
    });
    
    const W = window.innerWidth;
    const H = window.innerHeight;
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    // Field of view thoda kam kiya taaki perspective aur elegant lage
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    camera.position.z = 4;

    const COUNT = 5200; // Thode zyada particles for density
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    const phases = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 12; 
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10; 
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;  
      
      // Pure White with a hint of blue-ish silver for "Cool" look
      colors[i * 3]     = 0.9; // R
      colors[i * 3 + 1] = 0.95; // G
      colors[i * 3 + 2] = 1.0; // B

      speeds[i] = Math.random() * 0.3 + 0.05;
      phases[i] = Math.random() * Math.PI * 2;
    }

    // --- High Precision Sharp Circle Texture ---
    const sharpTex = (() => {
      const size = 64;
      const c = document.createElement('canvas');
      c.width = c.height = size;
      const ctx = c.getContext('2d');
      const r = size / 2;
      
      ctx.beginPath();
      ctx.arc(r, r, r * 0.4, 0, Math.PI * 2); // Chhota aur sharp circle
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 5; // Bahut halka sa soft edge sharpness barkarar rakhne ke liye
      ctx.shadowColor = 'white';
      ctx.fill();
      
      return new THREE.CanvasTexture(c);
    })();

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.035, // Ekdum chhota size
      map: sharpTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true, // Dur wale particles chhote dikhenge
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    let mouse = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5);
      mouse.y = -(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', onMouseMove);

    const clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      
      const posAttr = geo.attributes.position;
      
      for (let i = 0; i < COUNT; i++) {
        const ph = phases[i];
        const sp = speeds[i];

        // Linear Rising (Slow & Elegant)
        posAttr.array[i * 3 + 1] += sp * 0.005; 
        if (posAttr.array[i * 3 + 1] > 5) posAttr.array[i * 3 + 1] = -5;

        // Subtle Organic Floating
        posAttr.array[i * 3] += Math.sin(t * 0.5 + ph) * 0.0015;
      }

      posAttr.needsUpdate = true;

      // Mouse Lerping (Smooth movement)
      particles.rotation.y += (mouse.x * 0.15 - particles.rotation.y) * 0.03;
      particles.rotation.x += (mouse.y * 0.1 - particles.rotation.x) * 0.03;
      
      // Constant Cinematic Drift
      particles.rotation.z += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      geo.dispose();
      mat.dispose();
      sharpTex.dispose();
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