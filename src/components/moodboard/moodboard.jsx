'use client';

import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import styles from "./moodboard.module.css";

const moodboardImages = [
  { id: 1, src: "/images/moodboard/img-1.png", alt: "Moodboard 1" },
  { id: 2, src: "/images/moodboard/img-2.jpg", alt: "Moodboard 2" },
  { id: 3, src: "/images/moodboard/img-3.png", alt: "Moodboard 3" },
  { id: 4, src: "/images/moodboard/img-4.png", alt: "Moodboard 4" },
  { id: 5, src: "/images/moodboard/img-5.jpg", alt: "Moodboard 5" },
  { id: 6, src: "/images/moodboard/img-6.png", alt: "Moodboard 6" },
  { id: 7, src: "/images/moodboard/img-7.jpg", alt: "Moodboard 7" },
  { id: 8, src: "/images/moodboard/img-8.jpg", alt: "Moodboard 8" },
  { id: 9, src: "/images/moodboard/img-9.jpg", alt: "Moodboard 9" },
];

const COL1 = "16.5%";
const COL2 = "50%";
const COL3 = "83.5%";
const W_LAND  = "15rem";
const W_PORT  = "14rem";
const W_PORT2 = "12rem";

const scatteredPositions = [
  { top: "5%",  colCenter: COL1, rotate: "-3deg", w: W_LAND,  h: "12rem" },
  { top: "36%", colCenter: COL1, rotate: "4deg",  w: W_LAND,  h: "12rem" },
  { top: "67%", colCenter: COL1, rotate: "-4deg", w: W_LAND,  h: "13rem" },
  { top: "0%",  colCenter: COL2, rotate: "3deg",  w: W_PORT,  h: "18rem" },
  { top: "34%", colCenter: COL2, rotate: "-5deg", w: W_PORT,  h: "18rem" },
  { top: "67%", colCenter: COL2, rotate: "5deg",  w: W_PORT2, h: "16rem" },
  { top: "4%",  colCenter: COL3, rotate: "-2deg", w: W_LAND,  h: "12rem" },
  { top: "36%", colCenter: COL3, rotate: "4deg",  w: W_LAND,  h: "12rem" },
  { top: "67%", colCenter: COL3, rotate: "-3deg", w: W_LAND,  h: "12rem" },
];

const STACK_COUNT = 9;
const THROW_THRESHOLD = 72;
const THROW_DISTANCE  = 440;

const SPRING        = "cubic-bezier(0.34, 1.5,  0.64, 1)";
const EASE_OUT_EXPO = "cubic-bezier(0.16, 1,    0.3,  1)";
const EASE_IN_BACK  = "cubic-bezier(0.36, 0,    0.66, -0.56)";
const EASE_OUT_BACK = "cubic-bezier(0.34, 1.3,  0.64, 1)";

const getStackTransform = (i) => ({
  offsetY: i * 9,
  scale:   1 - i * 0.045,
  rotate:  i * -10,
});

const stackCSS = (i) => {
  const { offsetY, scale, rotate } = getStackTransform(i);
  return `translateY(-${offsetY}px) scale(${scale}) rotate(${rotate}deg)`;
};

// Directly mutate DOM — never goes through React render
const dom = (el, transform, ms = 0, ease = "none") => {
  if (!el) return;
  el.style.transition = ms ? `transform ${ms}ms ${ease}` : "none";
  el.style.transform  = transform;
};

// Place every card at its resting stack position — no transitions
const hardReset = (els, ti, total) => {
  for (let si = 0; si < total; si++) {
    const ci = (ti + si) % total;
    const el = els[ci];
    if (!el) continue;
    el.style.transition = "none";
    el.style.zIndex     = String(STACK_COUNT - Math.min(si, STACK_COUNT - 1));
    el.style.transform  = stackCSS(Math.min(si, STACK_COUNT - 1));
  }
};

// ─── MobileDeck ────────────────────────────────────────────────────────────
const MobileDeck = () => {
  const total = moodboardImages.length;

  // topIndex ONLY drives the counter text — nothing else
  // All animation state lives in refs
  const [displayIndex, setDisplayIndex] = useState(1);

  const cardEls     = useRef({});   // cardIndex → DOM node
  const ti          = useRef(0);    // current top card index (ground truth)
  const isDragging  = useRef(false);
  const startX      = useRef(0);
  const startY      = useRef(0);
  const dragX       = useRef(0);
  const velX        = useRef(0);
  const lastT       = useRef(0);
  const lastX       = useRef(0);
  const isAnimating = useRef(false);
  const rafId       = useRef(null);

  // Mount: attach passive touch listeners directly on the canvas div
  // so we can call e.preventDefault() (React synthetic events can't do this
  // reliably with passive:false on newer browsers)
  const canvasRef = useRef(null);

  // ── Initial DOM setup after mount ────────────────────────────
  useEffect(() => {
    hardReset(cardEls.current, 0, total);
  }, []); // runs exactly once — never again

  const setCardRef = useCallback((el, ci) => {
    if (el) cardEls.current[ci] = el;
  }, []);

  // ── Non-passive touch listeners on the canvas ─────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener("touchstart",  handleTouchStart, { passive: true  });
    canvas.addEventListener("touchmove",   handleTouchMove,  { passive: false });
    canvas.addEventListener("touchend",    handleTouchEnd,   { passive: true  });
    canvas.addEventListener("touchcancel", handleTouchEnd,   { passive: true  });

    return () => {
      canvas.removeEventListener("touchstart",  handleTouchStart);
      canvas.removeEventListener("touchmove",   handleTouchMove);
      canvas.removeEventListener("touchend",    handleTouchEnd);
      canvas.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── rAF drag paint ─────────────────────────────────────────────
  const paintDrag = () => {
    rafId.current = null;
    const d    = dragX.current;
    const topI = ti.current;

    // Capped rubber-band rotation
    const rot  = Math.sign(d) * Math.min(Math.abs(d) * 0.075, 14);
    // Card lifts as it's pulled — max 16px
    const lift = Math.min(Math.abs(d) * 0.032, 16);
    // Micro scale-up = "picked up" feel
    const sc   = 1 + Math.min(Math.abs(d) * 0.00022, 0.032);

    dom(
      cardEls.current[topI % total],
      `translateX(${d}px) translateY(-${lift}px) rotate(${rot}deg) scale(${sc})`
    );

    // Back cards reveal with ease-out parallax
    const raw   = Math.min(Math.abs(d) / 100, 1);
    const eased = 1 - (1 - raw) * (1 - raw);   // ease-out quad

    for (let si = 1; si < Math.min(STACK_COUNT, total); si++) {
      const ci   = (topI + si) % total;
      const el   = cardEls.current[ci];
      if (!el) continue;
      // Depth falloff: each deeper card moves proportionally less
      const p    = eased * Math.pow(0.82, si - 1);
      const base = getStackTransform(si);
      const next = getStackTransform(si - 1);
      dom(el, `translateY(-${
        base.offsetY + (next.offsetY - base.offsetY) * p
      }px) scale(${
        base.scale + (next.scale - base.scale) * p
      }) rotate(${
        base.rotate + (next.rotate - base.rotate) * p
      }deg)`);
    }
  };

  const scheduleDrag = (dx) => {
    dragX.current = dx;
    if (!rafId.current) {
      rafId.current = requestAnimationFrame(paintDrag);
    }
  };

  // ── Snap back ──────────────────────────────────────────────────
  const snapBack = () => {
    if (rafId.current) { cancelAnimationFrame(rafId.current); rafId.current = null; }
    const topI = ti.current;

    dom(cardEls.current[topI % total],
      "translateX(0) translateY(0) rotate(0deg) scale(1)",
      500, SPRING
    );

    for (let si = 1; si < Math.min(STACK_COUNT, total); si++) {
      const ci = (topI + si) % total;
      const el = cardEls.current[ci];
      if (!el) continue;
      setTimeout(() => {
        el.style.transition = `transform 420ms ${EASE_OUT_BACK}`;
        el.style.transform  = stackCSS(si);
      }, si * 20);
    }
  };

  // ── Send to bottom ─────────────────────────────────────────────
  const sendToBottom = (dx) => {
    if (rafId.current) { cancelAnimationFrame(rafId.current); rafId.current = null; }

    const dir    = dx > 0 ? 1 : -1;
    const speed  = Math.abs(velX.current);
    const flyMs  = Math.max(220, Math.min(380, 800 / (speed + 1)));
    const topI   = ti.current;
    const topEl  = cardEls.current[topI % total];
    if (!topEl) return;

    const bottom = getStackTransform(STACK_COUNT - 1);

    // Phase 1 — card swooshes out
    topEl.style.transition = `transform ${flyMs}ms ${EASE_OUT_EXPO}`;
    topEl.style.transform  =
      `translateX(${dir * THROW_DISTANCE}px) translateY(-28px) rotate(${dir * 20}deg) scale(0.88)`;

    // Phase 2 — teleport behind stack, dive into bottom slot
    const arcStart = flyMs * 0.52;
    setTimeout(() => {
      topEl.style.transition = "none";
      topEl.style.zIndex     = "0";
      topEl.style.transform  =
        `translateX(0px) translateY(${bottom.offsetY + 52}px) scale(${bottom.scale - 0.04}) rotate(${bottom.rotate}deg)`;
      void topEl.offsetHeight; // flush repaint
      topEl.style.transition = `transform 290ms ${EASE_IN_BACK}`;
      topEl.style.transform  =
        `translateX(0px) translateY(${bottom.offsetY}px) scale(${bottom.scale}) rotate(${bottom.rotate}deg)`;
    }, arcStart);

    // Phase 3 — back cards cascade up
    for (let si = 1; si < Math.min(STACK_COUNT, total); si++) {
      const ci     = (topI + si) % total;
      const el     = cardEls.current[ci];
      const target = getStackTransform(si - 1);
      if (!el) continue;
      setTimeout(() => {
        el.style.transition = `transform 370ms ${EASE_OUT_BACK}`;
        el.style.transform  =
          `translateY(-${target.offsetY}px) scale(${target.scale}) rotate(${target.rotate}deg)`;
      }, si * 15);
    }

    // Phase 4 — hard-reset AFTER animation — update ti ref + counter
    const settle = Math.max(flyMs, arcStart + 300) + 80;
    setTimeout(() => {
      const nextTi = (topI + 1) % total;
      ti.current = nextTi;
      hardReset(cardEls.current, nextTi, total);
      isAnimating.current = false;
      setDisplayIndex(nextTi + 1); // counter only
    }, settle);
  };

  // ── Touch handlers (attached via addEventListener above) ───────
  function handleTouchStart(e) {
    if (isAnimating.current) return;
    isDragging.current = true;
    startX.current     = e.touches[0].clientX;
    startY.current     = e.touches[0].clientY;
    dragX.current      = 0;
    velX.current       = 0;
    lastT.current      = Date.now();
    lastX.current      = e.touches[0].clientX;
  }

  function handleTouchMove(e) {
    if (!isDragging.current) return;
    const cx = e.touches[0].clientX;
    const cy = e.touches[0].clientY;
    const dx = cx - startX.current;
    const dy = cy - startY.current;

    // If mostly vertical scroll and not yet committed to drag — cancel
    if (Math.abs(dy) > Math.abs(dx) && Math.abs(dragX.current) < 8) {
      isDragging.current = false;
      snapBack();
      return;
    }

    e.preventDefault(); // blocks page scroll while swiping card

    const now = Date.now();
    const dt  = now - lastT.current;
    if (dt > 0) velX.current = (cx - lastX.current) / dt;
    lastT.current = now;
    lastX.current = cx;
    scheduleDrag(dx);
  }

  function handleTouchEnd() {
    if (!isDragging.current) return;
    isDragging.current = false;
    const shouldThrow =
      Math.abs(dragX.current) > THROW_THRESHOLD ||
      Math.abs(velX.current) > 0.42;
    if (shouldThrow) {
      isAnimating.current = true;
      sendToBottom(dragX.current !== 0 ? dragX.current : velX.current);
    } else {
      snapBack();
    }
    dragX.current = 0;
  }

  // ── Mouse handlers (React synthetic — fine for mouse) ──────────
  const onMouseDown = (e) => {
    if (isAnimating.current) return;
    isDragging.current = true;
    startX.current     = e.clientX;
    dragX.current      = 0;
    velX.current       = 0;
    lastT.current      = Date.now();
    lastX.current      = e.clientX;
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    const now = Date.now();
    const dt  = now - lastT.current;
    if (dt > 0) velX.current = (e.clientX - lastX.current) / dt;
    lastT.current = now;
    lastX.current = e.clientX;
    scheduleDrag(e.clientX - startX.current);
  };

  const onMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const shouldThrow =
      Math.abs(dragX.current) > THROW_THRESHOLD ||
      Math.abs(velX.current) > 0.42;
    if (shouldThrow) {
      isAnimating.current = true;
      sendToBottom(dragX.current !== 0 ? dragX.current : velX.current);
    } else {
      snapBack();
    }
    dragX.current = 0;
  };

  return (
    <div className={styles["deck-wrapper"]}>
      <div
        ref={canvasRef}
        className={styles["deck-canvas"]}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {moodboardImages.map((img, cardIndex) => (
          <div
            key={cardIndex}
            ref={(el) => setCardRef(el, cardIndex)}
            className={styles["deck-card"]}
            style={{
              // ← NO transform here — hardReset sets it after mount via useEffect
              // React will never overwrite transform after initial render
              zIndex:     STACK_COUNT - Math.min(cardIndex, STACK_COUNT - 1),
              willChange: "transform",
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              style={{ objectFit: "cover" }}
              draggable={false}
            />
          </div>
        ))}
      </div>

      <p className={styles["deck-counter"]}>
        {displayIndex} / {total}
      </p>
      <p className={styles["deck-hint"]}>swipe to explore</p>
    </div>
  );
};

// ─── Moodboard ────────────────────────────────────────────────────────────────
const Moodboard = () => {
  const [scattered, setScattered] = useState(false);

  return (
    <section className={styles["moodboard-wrapper"]}>

      <div className={styles["moodboard-header"]}>
        <h1>MOODBOARD</h1>
        <p>
          Sharing personal thoughts, work-in-progress ideas, and deep-dives
          about design. Learnings from a decade in the industry.
        </p>
      </div>

      {/* Desktop */}
      <div
        className={`${styles["moodboard-canvas"]} ${styles["desktop-only"]} ${scattered ? styles["is-scattered"] : ""}`}
        onMouseEnter={() => setScattered(true)}
        onMouseLeave={() => setScattered(false)}
      >
        {moodboardImages.map((img, index) => {
          const pos = scatteredPositions[index];
          return (
            <div
              key={img.id}
              className={styles["moodboard-card"]}
              style={{
                "--top":        pos.top,
                "--col-center": pos.colCenter,
                "--rotate":     pos.rotate,
                "--delay":      `${index * 50}ms`,
                "--w":          pos.w,
                "--h":          pos.h,
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          );
        })}
      </div>

      {/* Mobile */}
      <div className={styles["mobile-only"]}>
        <MobileDeck />
      </div>

    </section>
  );
};

export default Moodboard;