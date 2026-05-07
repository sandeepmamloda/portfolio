"use client"
import { useEffect, useRef } from "react";
import styles from "./heroabout.module.css";

const ParticleBox = ({ children }) => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let raf;
    let particles = [];

    const init = () => {
      // getBoundingClientRect gives true CSS rendered size
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      const W = rect.width;
      const H = rect.height;

      // Set internal canvas resolution = CSS size × dpr (no blur on retina)
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.scale(dpr, dpr);

      const COLS = 70;
      const ROWS = Math.round((H / W) * COLS);
      const PW = W / COLS;
      const PH = H / ROWS;
      const RADIUS = 90;

      // r = half of cell diagonal → zero gap between touching circles
      const BASE_R = Math.sqrt(PW * PW + PH * PH) / 2;

      class Particle {
        constructor(x, y) {
          this.ox = x; this.oy = y;
          this.x = x; this.y = y;
          this.vx = 0; this.vy = 0;
        }
        update() {
          const dx = this.x - mouse.current.x;
          const dy = this.y - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < RADIUS) {
            const force = (RADIUS - dist) / RADIUS;
            const angle = Math.atan2(dy, dx);
            const push = force * force * 10;
            this.vx += Math.cos(angle) * push;
            this.vy += Math.sin(angle) * push;
          }
          this.vx += (this.ox - this.x) * 0.06;
          this.vy += (this.oy - this.y) * 0.06;
          this.vx *= 0.78;
          this.vy *= 0.78;
          this.x += this.vx;
          this.y += this.vy;
        }
        draw() {
          const dx = this.x - mouse.current.x;
          const dy = this.y - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const t = Math.max(0, 1 - dist / RADIUS);
          const g = Math.round(120 + t * 60);
          ctx.fillStyle = `rgba(${g}, ${g}, ${g}, ${1 + t * 0.15})`;
          ctx.beginPath();
          ctx.arc(this.x, this.y, BASE_R + t * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      particles = [];
      for (let row = 0; row < ROWS; row++)
        for (let col = 0; col < COLS; col++)
          particles.push(new Particle(col * PW + PW / 2, row * PH + PH / 2));

      const loop = () => {
        ctx.clearRect(0, 0, W, H);
        for (const p of particles) { p.update(); p.draw(); }
        raf = requestAnimationFrame(loop);
      };

      cancelAnimationFrame(raf);
      loop();
    };

    // Wait one frame so canvas has its CSS layout size
    raf = requestAnimationFrame(init);

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    const onLeave = () => { mouse.current = { x: -999, y: -999 }; };
    const onTouch = (e) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      mouse.current = {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    };
    const onTouchEnd = () => { mouse.current = { x: -999, y: -999 }; };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("touchmove", onTouch, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("touchmove", onTouch);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div className={styles["img-wrapper"]} style={{ position: "relative" }}>
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          borderRadius: "1.5rem",
          cursor: "crosshair",
        }}
      />
      {children}
    </div>
  );
};

const Heroabout = function () {
  return (
    <section className={styles["heroabout-wrapper"]}>
      <div className={styles["hero-video-wrapper"]}>
        <video autoPlay muted loop playsInline>
          <source src="/videos/about/about.mp4" type="video/mp4" />
        </video>
      </div>
      <div className={styles["hero-text-wrapper"]}>
        <ParticleBox>
          <div className={styles["hero-text-left-1"]}>
            <h1>WHERE SCRIPTS BECOME SIGHT</h1>
          </div>
          <div className={styles["hero-text-left-2"]}>
            <p>
              I tell stories through both the lens and the page where visuals
              meet emotion and moments become cinema.
            </p>
          </div>
          <div className={styles["hero-text-right-bottom"]}>
            <p>FILM-MAKER &amp; WRITER</p>
          </div>
        </ParticleBox>
      </div>
    </section>
  );
};

export default Heroabout;