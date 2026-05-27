"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import styles from "./herouniverse.module.css";

gsap.registerPlugin(ScrollTrigger);

const Herouniverse = function () {
  const sectionRef  = useRef(null);
  const tagRef      = useRef(null);
  const logoRef     = useRef(null);
  const descRef     = useRef(null);
  const mediaRef    = useRef(null);
  const canvasRef   = useRef(null);

  useEffect(() => {
    /* ── Sonar dot canvas ── */
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const DPR    = window.devicePixelRatio || 1;
    const SIZE   = 28;
    canvas.width  = SIZE * DPR;
    canvas.height = SIZE * DPR;
    ctx.scale(DPR, DPR);

    const CX = SIZE / 2;
    const CY = SIZE / 2;
    const DOT_R = 7;

    const BURST_DELAY = [0, 320, 640];
    const RING_DUR    = 1600;
    const CYCLE       = 3600;
    const MAX_R       = SIZE / 2 - 1;

    const rings = BURST_DELAY.map(d => ({
      delay: d, active: false, bornAt: 0, lastCycle: -1, r: 0, opacity: 0,
    }));

    let startTime = null;
    let rafId;

    const easeOut = t => 1 - Math.pow(1 - t, 2.8);
    const easeIn  = t => t * t * t;

    const tick = (ts) => {
      if (!startTime) startTime = ts;
      const now = ts - startTime;

      rings.forEach(ring => {
        const cycle     = Math.floor((now - ring.delay) / CYCLE);
        const phase     = (now - ring.delay) % CYCLE;
        if (cycle < 0) { ring.opacity = 0; return; }
        if (cycle !== ring.lastCycle && phase < 80) {
          ring.lastCycle = cycle;
          ring.active    = true;
          ring.bornAt    = now;
        }
        if (!ring.active) { ring.opacity = 0; return; }
        const age = now - ring.bornAt;
        const t   = Math.min(age / RING_DUR, 1);
        ring.r    = DOT_R + easeOut(t) * (MAX_R - DOT_R);
        if      (t < 0.06) ring.opacity = (t / 0.06) * 0.7;
        else if (t < 0.65) ring.opacity = 0.7 - ((t - 0.06) / 0.59) * 0.3;
        else               ring.opacity = 0.4 * (1 - easeIn((t - 0.65) / 0.35));
        if (t >= 1) { ring.active = false; ring.opacity = 0; }
      });

      ctx.clearRect(0, 0, SIZE, SIZE);

      /* rings */
      rings.forEach(ring => {
        if (ring.opacity <= 0.002) return;
        ctx.beginPath();
        ctx.arc(CX, CY, ring.r + 2, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(138, 56, 245, ${ring.opacity * 0.2})`;
        ctx.lineWidth   = 4;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(CX, CY, ring.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(138, 56, 245, ${ring.opacity})`;
        ctx.lineWidth   = 1;
        ctx.stroke();
      });

      /* dot */
      ctx.beginPath();
      ctx.arc(CX, CY, DOT_R, 0, Math.PI * 2);
      ctx.fillStyle = "#8A38F5";
      ctx.fill();

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    /* ── GSAP animations ── */
    let ctx2;
    const timer = setTimeout(() => {
      ctx2 = gsap.context(() => {

        gsap.set(tagRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 1 });
        gsap.to(tagRef.current, {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.8,
          ease: "expo.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: tagRef.current,
            scroller: document.documentElement,
            start: "top 85%",
            once: true,
          },
        });

        const letters = logoRef.current.innerText.split("");
        logoRef.current.innerHTML = letters
          .map(l =>
            l === " "
              ? "&nbsp;"
              : `<span style="display:inline-block;overflow:hidden;line-height:1"><i style="display:inline-block;font-style:normal">${l}</i></span>`
          )
          .join("");

        const letterEls = logoRef.current.querySelectorAll("i");
        gsap.set(letterEls, { yPercent: 110 });
        gsap.to(letterEls, {
          yPercent: 0,
          duration: 2.8,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: logoRef.current,
            scroller: document.documentElement,
            start: "top 85%",
            once: true,
          },
          delay: 0.2,
        });

        gsap.set(descRef.current, { opacity: 0, y: 20 });
        gsap.to(descRef.current, {
          opacity: 1,
          y: 0,
          duration: 2.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: descRef.current,
            scroller: document.documentElement,
            start: "top 85%",
            once: true,
          },
          delay: 0.6,
        });

        gsap.set(mediaRef.current, { opacity: 0, scale: 1.08, filter: "blur(8px) brightness(0.4)" });
        gsap.to(mediaRef.current, {
          opacity: 1,
          scale: 1,
          filter: "blur(0px) brightness(1)",
          duration: 2.6,
          ease: "expo.out",
          scrollTrigger: {
            trigger: mediaRef.current,
            scroller: document.documentElement,
            start: "top 80%",
            once: true,
          },
          delay: 0.4,
        });

      }, sectionRef);
    }, 100);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
      ctx2?.revert();
    };
  }, []);

  return (
    <section className={styles["herouniverse"]} ref={sectionRef}>

      {/* Tag */}
      <div className={styles["tag"]} ref={tagRef}>
        <canvas ref={canvasRef} className={styles["tag-dot-canvas"]} />
        01 &nbsp;WHO WE ARE
      </div>

      {/* Top Row */}
      <div className={styles["top-row"]}>

        {/* Logo */}
        <h1 className={styles["logo"]} ref={logoRef}>HONEYVERSE</h1>

        {/* Right Side */}
        <div className={styles["right"]}>

          {/* Description */}
          <p className={styles["desc"]} ref={descRef}>
            HONEYVERSE is a daring film production company known for its
            unapologetically tacky, bold visual identity and a deep passion for
            storytelling. Embracing loud aesthetics, vibrant creativity, and
            unconventional style, THE UNIVERSE produces films that celebrate
            emotion, chaos, and imagination.
          </p>

        </div>
      </div>

      {/* Media Section */}
      <div className={styles["media-wrap"]} ref={mediaRef}>
        <video
          src="/videos/honeyverse/honeyverse.mp4"
          autoPlay
          muted
          loop
          playsInline
          className={styles["media"]}
        />
      </div>

    </section>
  );
};

export default Herouniverse;