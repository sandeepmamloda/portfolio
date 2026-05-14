'use client';

import Image from "next/image";
import { useRef, useState } from "react";
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

const getStackTransform = (i) => {
  const offsetY = i * 8;
  const scale = 1 - i * 0.04;
  const rotate = i * -12;
  return { offsetY, scale, rotate };
};

const MobileDeck = function () {
  const total = moodboardImages.length;
  const [topIndex, setTopIndex] = useState(0);

  const isDragging   = useRef(false);
  const startX       = useRef(0);
  const startY       = useRef(0);
  const currentDragX = useRef(0);
  const isAnimating  = useRef(false);
  const topCardRef   = useRef(null);
  const cardRefs     = useRef([]);

  // ── live drag: top card follows finger exactly ──────────────
  const applyDrag = (dx) => {
    const top = topCardRef.current;
    if (!top) return;

    const rot  = dx * 0.07;
    const lift = Math.abs(dx) * 0.025;
    top.style.transition = "none";
    top.style.transform  = `translateX(${dx}px) translateY(-${lift}px) rotate(${rot}deg) scale(1)`;

    // linear progress — no easing during drag so back cards
    // move 1:1 with finger, zero perceived lag
    const progress = Math.min(Math.abs(dx) / 130, 1);

    cardRefs.current.forEach((card) => {
      if (!card) return;
      const i      = parseInt(card.dataset.si);
      const base   = getStackTransform(i);
      const target = getStackTransform(i - 1);
      const oY = base.offsetY + (target.offsetY - base.offsetY) * progress;
      const sc = base.scale   + (target.scale   - base.scale)   * progress;
      const ro = base.rotate  + (target.rotate  - base.rotate)  * progress;
      card.style.transition = "none";
      card.style.transform  = `translateY(-${oY}px) scale(${sc}) rotate(${ro}deg)`;
    });
  };

  // ── snap back with spring bounce ────────────────────────────
  const snapBack = () => {
    const top = topCardRef.current;
    if (top) {
      top.style.transition = "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
      top.style.transform  = "translateX(0px) translateY(0px) rotate(0deg) scale(1)";
    }
    cardRefs.current.forEach((card) => {
      if (!card) return;
      const i = parseInt(card.dataset.si);
      const { offsetY, scale, rotate } = getStackTransform(i);
      card.style.transition = "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
      card.style.transform  = `translateY(-${offsetY}px) scale(${scale}) rotate(${rotate}deg)`;
    });
  };

  // ── throw: card flies out, stack steps forward ──────────────
  const throwCard = (dx) => {
    const dir  = dx > 0 ? 1 : -1;
    const top  = topCardRef.current;
    if (!top) return;

    top.style.transition = "transform 0.42s cubic-bezier(0.215, 0.61, 0.355, 1)";
    top.style.transform  = `translateX(${dir * 320}px) translateY(-20px) rotate(${dir * 28}deg) scale(0.92)`;

    cardRefs.current.forEach((card) => {
      if (!card) return;
      const i      = parseInt(card.dataset.si);
      const target = getStackTransform(i - 1);
      card.style.transition = "transform 0.42s cubic-bezier(0.34, 1.2, 0.64, 1)";
      card.style.transform  = `translateY(-${target.offsetY}px) scale(${target.scale}) rotate(${target.rotate}deg)`;
    });

    setTimeout(() => {
      isAnimating.current = false;
      setTopIndex((prev) => (prev + 1) % total);
    }, 420);
  };

  // ── touch handlers ──────────────────────────────────────────
  const onTouchStart = (e) => {
    if (isAnimating.current) return;
    isDragging.current   = true;
    startX.current       = e.touches[0].clientX;
    startY.current       = e.touches[0].clientY;
    currentDragX.current = 0;
  };

  const onTouchMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.touches[0].clientX - startX.current;
    const dy = e.touches[0].clientY - startY.current;
    // agar vertical scroll zyada hai to drag cancel karo
    if (Math.abs(dy) > Math.abs(dx) && Math.abs(currentDragX.current) < 10) {
      isDragging.current = false;
      snapBack();
      return;
    }
    currentDragX.current = dx;
    applyDrag(dx);
  };

  const onTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (Math.abs(currentDragX.current) > 75) {
      isAnimating.current = true;
      throwCard(currentDragX.current);
    } else {
      snapBack();
    }
    currentDragX.current = 0;
  };

  // ── mouse handlers ──────────────────────────────────────────
  const onMouseDown = (e) => {
    if (isAnimating.current) return;
    isDragging.current   = true;
    startX.current       = e.clientX;
    currentDragX.current = 0;
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    currentDragX.current = e.clientX - startX.current;
    applyDrag(currentDragX.current);
  };

  const onMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (Math.abs(currentDragX.current) > 75) {
      isAnimating.current = true;
      throwCard(currentDragX.current);
    } else {
      snapBack();
    }
    currentDragX.current = 0;
  };

  return (
    <div className={styles["deck-wrapper"]}>
      <div
        className={styles["deck-canvas"]}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {[...Array(Math.min(STACK_COUNT, total))].map((_, idx) => {
          const i          = STACK_COUNT - 1 - idx;       // bottom → top render
          const cardIndex  = (topIndex + i) % total;
          const isTop      = i === 0;
          const img        = moodboardImages[cardIndex];
          const { offsetY, scale, rotate } = getStackTransform(i);

          return (
            <div
              key={`${topIndex}-${i}`}
              ref={isTop
                ? topCardRef
                : (el) => {
                    if (el) el.dataset.si = i;
                    cardRefs.current[i - 1] = el;
                  }
              }
              className={styles["deck-card"]}
              style={{
                transform:  `translateY(-${offsetY}px) scale(${scale}) rotate(${rotate}deg)`,
                zIndex:     STACK_COUNT - i,
                transition: "none",
                willChange: "transform",                   // GPU layer
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
          );
        })}
      </div>

      <p className={styles["deck-counter"]}>
        {(topIndex % total) + 1} / {total}
      </p>
      <p className={styles["deck-hint"]}>swipe to explore</p>
    </div>
  );
};

const Moodboard = function () {
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