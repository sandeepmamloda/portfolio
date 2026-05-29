"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import styles from "./belief.module.css";

gsap.registerPlugin(ScrollTrigger);

const BeliefSection = function () {
  const sectionRef  = useRef(null);
  const tagRef      = useRef(null);
  const subTextRef  = useRef(null);
  const quoteRef    = useRef(null);
  const videoRef    = useRef(null);
  // ── NEW ──
  const canvasRef   = useRef(null);

  useEffect(() => {
    // ── Sonar dot canvas ──
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
        const cycle = Math.floor((now - ring.delay) / CYCLE);
        const phase = (now - ring.delay) % CYCLE;
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

      ctx.beginPath();
      ctx.arc(CX, CY, DOT_R, 0, Math.PI * 2);
      ctx.fillStyle = "#8A38F5";
      ctx.fill();

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    // ── GSAP animations ──
    let ctx_gsap;

    const timer = setTimeout(() => {
      ctx_gsap = gsap.context(() => {

        /* ── Tag — clip-path wipe left → right ── */
        gsap.set(tagRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 1 });
        gsap.to(tagRef.current, {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: tagRef.current,
            scroller: document.documentElement,
            start: "top 85%",
            once: true,
          },
        });

        /* ── SubText — clip-path wipe left → right ── */
        gsap.set(subTextRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 1 });
        gsap.to(subTextRef.current, {
          clipPath: "inset(0 0% 0 0)",
          duration: 2.0,
          ease: "expo.out",
          scrollTrigger: {
            trigger: subTextRef.current,
            scroller: document.documentElement,
            start: "top 85%",
            once: true,
          },
          delay: 0.2,
        });

        /* ── Quote — char by char light → dark scroll scrub ── */
        const rawText = quoteRef.current.innerText;

        quoteRef.current.innerHTML = rawText
          .split("")
          .map(ch =>
            ch === " "
              ? `<span style="display:inline-block;width:0.3em"> </span>`
              : `<span style="display:inline-block;color:#ffffff22">${ch}</span>`
          )
          .join("");

        const charEls = quoteRef.current.querySelectorAll("span");

        charEls.forEach((char, i) => {
          gsap.to(char, {
            color: "#ffffff",
            ease: "none",
            scrollTrigger: {
              trigger: quoteRef.current,
              scroller: document.documentElement,
              start: `top+=${i * 5} 85%`,
              end: `top+=${i * 5 + 40} 85%`,
              scrub: 0.6,
            },
          });
        });

        /* ── Video — clip-path wipe top → bottom ── */
        gsap.set(videoRef.current, { clipPath: "inset(0 0 100% 0)", opacity: 1 });
        gsap.to(videoRef.current, {
          clipPath: "inset(0 0 0% 0)",
          duration: 2.6,
          ease: "expo.out",
          scrollTrigger: {
            trigger: videoRef.current,
            scroller: document.documentElement,
            start: "top 85%",
            once: true,
          },
          delay: 0.2,
        });

      }, sectionRef);
    }, 100);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
      ctx_gsap?.revert();
    };
  }, []);

  return (
    <section className={styles.beliefSection} ref={sectionRef}>

      {/* ── TOP ROW ── */}
      <div className={styles.topRow}>

        {/* Left */}
        <div className={styles.leftCol}>
          <div className={styles.tag} ref={tagRef}>
            {/* ── CHANGED: canvas sonar dot instead of static span ── */}
            <canvas ref={canvasRef} className={styles["tag-dot-canvas"]} />
            04 &nbsp;BELIEF
          </div>
          <p className={styles.subText} ref={subTextRef}>
            The thinking behind how we work — guiding how we Write, Direct, and produce films.
          </p>
        </div>

        {/* Right — big quote */}
        <div className={styles.rightCol}>
          <h2 className={styles.quote} ref={quoteRef}>
            "Built to tell meaningful stories, not chase noise. Clear vision. Honest filmmaking. Lasting impact.
          </h2>
        </div>

      </div>

      {/* ── VIDEO ── */}
      <div className={styles.imageWrap} ref={videoRef}>
        <video
          className={styles.image}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/belief/belief.mp4" type="video/mp4" />
        </video>
      </div>

    </section>
  );
};

export default BeliefSection;