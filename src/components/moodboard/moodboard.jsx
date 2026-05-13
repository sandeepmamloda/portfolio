// 'use client';

// import Image from "next/image";
// import { useState } from "react";
// import styles from "./moodboard.module.css";

// const moodboardImages = [
//   { id: 1, src: "/images/moodboard/img-1.png", alt: "Moodboard 1" },
//   { id: 2, src: "/images/moodboard/img-2.jpg", alt: "Moodboard 2" },
//   { id: 3, src: "/images/moodboard/img-3.png", alt: "Moodboard 3" },
//   { id: 4, src: "/images/moodboard/img-4.png", alt: "Moodboard 4" },
//   { id: 5, src: "/images/moodboard/img-5.jpg", alt: "Moodboard 5" },
//   { id: 6, src: "/images/moodboard/img-6.png", alt: "Moodboard 6" },
//   { id: 7, src: "/images/moodboard/img-7.jpg", alt: "Moodboard 7" },
//   { id: 8, src: "/images/moodboard/img-8.jpg", alt: "Moodboard 8" },
//   { id: 9, src: "/images/moodboard/img-9.jpg", alt: "Moodboard 9" },
// ];

// /*
//   Strategy:
//   Canvas = 100% width
//   3 columns, each column anchor point:
//     Col 1 center: 16.5%
//     Col 2 center: 50%
//     Col 3 center: 83.5%

//   Each card: left = colCenter - (cardWidth / 2)
//   This ensures cards are always centered in their column
//   regardless of card size.

//   Card sizes (larger than before, gap stays same):
//   Col 1 & 3: 15rem x 12rem  (landscape)
//   Col 2 top 2: 14rem x 18rem (portrait)
//   Col 2 bottom: 12rem x 16rem (portrait smaller)
// */

// // Column center anchors
// const COL1 = "16.5%";
// const COL2 = "50%";
// const COL3 = "83.5%";

// // Card widths (must match --w in style)
// const W_LAND  = "15rem";  // landscape col1 & col3
// const W_PORT  = "14rem";  // portrait col2 top 2
// const W_PORT2 = "12rem";  // portrait col2 bottom

// const scatteredPositions = [
//   // Col 1 — landscape
//   { top: "5%",  colCenter: COL1, rotate: "-3deg", w: W_LAND,  h: "12rem" }, // img-1
//   { top: "36%", colCenter: COL1, rotate: "4deg",  w: W_LAND,  h: "12rem" }, // img-4
//   { top: "67%", colCenter: COL1, rotate: "-4deg", w: W_LAND,  h: "13rem" }, // img-7

//   // Col 2 — portrait tall
//   { top: "0%",  colCenter: COL2, rotate: "3deg",  w: W_PORT,  h: "18rem" }, // img-2
//   { top: "34%", colCenter: COL2, rotate: "-5deg", w: W_PORT,  h: "18rem" }, // img-5
//   { top: "67%", colCenter: COL2, rotate: "5deg",  w: W_PORT2, h: "16rem" }, // img-8

//   // Col 3 — landscape
//   { top: "4%",  colCenter: COL3, rotate: "-2deg", w: W_LAND,  h: "12rem" }, // img-3
//   { top: "36%", colCenter: COL3, rotate: "4deg",  w: W_LAND,  h: "12rem" }, // img-6
//   { top: "67%", colCenter: COL3, rotate: "-3deg", w: W_LAND,  h: "12rem" }, // img-9
// ];

// const Moodboard = function () {
//   const [scattered, setScattered] = useState(false);

//   return (
//     <section className={styles["moodboard-wrapper"]}>

//       <div className={styles["moodboard-header"]}>
//         <h1>MOODBOARD</h1>
//         <p>
//           Sharing personal thoughts, work-in-progress ideas, and deep-dives
//           about design. Learnings from a decade in the industry.
//         </p>
//       </div>

//       <div
//         className={`${styles["moodboard-canvas"]} ${scattered ? styles["is-scattered"] : ""}`}
//         onMouseEnter={() => setScattered(true)}
//         onMouseLeave={() => setScattered(false)}
//       >
//         {moodboardImages.map((img, index) => {
//           const pos = scatteredPositions[index];
//           return (
//             <div
//               key={img.id}
//               className={styles["moodboard-card"]}
//               style={{
//                 "--top":        pos.top,
//                 "--col-center": pos.colCenter,
//                 "--rotate":     pos.rotate,
//                 "--delay":      `${index * 50}ms`,
//                 "--w":          pos.w,
//                 "--h":          pos.h,
//               }}
//             >
//               <Image
//                 src={img.src}
//                 alt={img.alt}
//                 fill
//                 style={{ objectFit: "cover" }}
//               />
//             </div>
//           );
//         })}
//       </div>

//     </section>
//   );
// };

// export default Moodboard;
// =================================================================
// 'use client';

// import Image from "next/image";
// import { useState } from "react";
// import styles from "./moodboard.module.css";

// const moodboardImages = [
//   { id: 1, src: "/images/moodboard/img-1.png", alt: "Moodboard 1" },
//   { id: 2, src: "/images/moodboard/img-2.jpg", alt: "Moodboard 2" },
//   { id: 3, src: "/images/moodboard/img-3.png", alt: "Moodboard 3" },
//   { id: 4, src: "/images/moodboard/img-4.png", alt: "Moodboard 4" },
//   { id: 5, src: "/images/moodboard/img-5.jpg", alt: "Moodboard 5" },
//   { id: 6, src: "/images/moodboard/img-6.png", alt: "Moodboard 6" },
//   { id: 7, src: "/images/moodboard/img-7.jpg", alt: "Moodboard 7" },
//   { id: 8, src: "/images/moodboard/img-8.jpg", alt: "Moodboard 8" },
//   { id: 9, src: "/images/moodboard/img-9.jpg", alt: "Moodboard 9" },
// ];

// /*
//   Strategy:
//   Canvas = 100% width
//   3 columns, each column anchor point:
//     Col 1 center: 16.5%
//     Col 2 center: 50%
//     Col 3 center: 83.5%

//   Each card: left = colCenter - (cardWidth / 2)
//   This ensures cards are always centered in their column
//   regardless of card size.

//   Card sizes (larger than before, gap stays same):
//   Col 1 & 3: 15rem x 12rem  (landscape)
//   Col 2 top 2: 14rem x 18rem (portrait)
//   Col 2 bottom: 12rem x 16rem (portrait smaller)
// */

// // Column center anchors
// const COL1 = "16.5%";
// const COL2 = "50%";
// const COL3 = "83.5%";

// // Card widths (must match --w in style)
// const W_LAND  = "15rem";  // landscape col1 & col3
// const W_PORT  = "14rem";  // portrait col2 top 2
// const W_PORT2 = "12rem";  // portrait col2 bottom

// const scatteredPositions = [
//   // Col 1 — landscape
//   { top: "5%",  colCenter: COL1, rotate: "-3deg", w: W_LAND,  h: "12rem" }, // img-1
//   { top: "36%", colCenter: COL1, rotate: "4deg",  w: W_LAND,  h: "12rem" }, // img-4
//   { top: "67%", colCenter: COL1, rotate: "-4deg", w: W_LAND,  h: "13rem" }, // img-7

//   // Col 2 — portrait tall
//   { top: "0%",  colCenter: COL2, rotate: "3deg",  w: W_PORT,  h: "18rem" }, // img-2
//   { top: "34%", colCenter: COL2, rotate: "-5deg", w: W_PORT,  h: "18rem" }, // img-5
//   { top: "67%", colCenter: COL2, rotate: "5deg",  w: W_PORT2, h: "16rem" }, // img-8

//   // Col 3 — landscape
//   { top: "4%",  colCenter: COL3, rotate: "-2deg", w: W_LAND,  h: "12rem" }, // img-3
//   { top: "36%", colCenter: COL3, rotate: "4deg",  w: W_LAND,  h: "12rem" }, // img-6
//   { top: "67%", colCenter: COL3, rotate: "-3deg", w: W_LAND,  h: "12rem" }, // img-9
// ];

// const Moodboard = function () {
//   const [scattered, setScattered] = useState(false);

//   return (
//     <section className={styles["moodboard-wrapper"]}>

//       <div className={styles["moodboard-header"]}>
//         <h1>MOODBOARD</h1>
//         <p>
//           Sharing personal thoughts, work-in-progress ideas, and deep-dives
//           about design. Learnings from a decade in the industry.
//         </p>
//       </div>

//       <div
//         className={`${styles["moodboard-canvas"]} ${scattered ? styles["is-scattered"] : ""}`}
//         onMouseEnter={() => setScattered(true)}
//         onMouseLeave={() => setScattered(false)}
//       >
//         {moodboardImages.map((img, index) => {
//           const pos = scatteredPositions[index];
//           return (
//             <div
//               key={img.id}
//               className={styles["moodboard-card"]}
//               style={{
//                 "--top":        pos.top,
//                 "--col-center": pos.colCenter,
//                 "--rotate":     pos.rotate,
//                 "--delay":      `${index * 50}ms`,
//                 "--w":          pos.w,
//                 "--h":          pos.h,
//               }}
//             >
//               <Image
//                 src={img.src}
//                 alt={img.alt}
//                 fill
//                 style={{ objectFit: "cover" }}
//               />
//             </div>
//           );
//         })}
//       </div>

//     </section>
//   );
// };

// export default Moodboard;
// =================================================================
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

const STACK_COUNT = 4;

const getStackTransform = (i) => {
  const offsetY = i * 8;
  const scale = 1 - i * 0.04;
  const rotate = i * -4;
  return { offsetY, scale, rotate };
};

const MobileDeck = function () {
  const total = moodboardImages.length;
  // ✅ infinite counter — % se wrap hoga
  const [topIndex, setTopIndex] = useState(0);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentDragX = useRef(0);
  const topCardRef = useRef(null);
  const isThrown = useRef(false);
  const cardRefs = useRef([]);

  const moveTopCard = (dx) => {
    const card = topCardRef.current;
    if (!card) return;
    const rotate = dx * 0.06;
    card.style.transition = "none";
    card.style.transform = `translateX(${dx}px) rotate(${rotate}deg) scale(1)`;
  };

  const animateStackCards = (dx) => {
    const progress = Math.min(Math.abs(dx) / 150, 1);
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const actualI = i + 1;
      const base = getStackTransform(actualI);
      const target = getStackTransform(actualI - 1);
      const offsetY = base.offsetY + (target.offsetY - base.offsetY) * progress;
      const scale = base.scale + (target.scale - base.scale) * progress;
      const rotate = base.rotate + (target.rotate - base.rotate) * progress;
      card.style.transition = "none";
      card.style.transform = `translateY(-${offsetY}px) scale(${scale}) rotate(${rotate}deg)`;
    });
  };

  const resetStackCards = () => {
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const actualI = i + 1;
      const { offsetY, scale, rotate } = getStackTransform(actualI);
      card.style.transition = "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)";
      card.style.transform = `translateY(-${offsetY}px) scale(${scale}) rotate(${rotate}deg)`;
    });
  };

  const resetTopCard = () => {
    const card = topCardRef.current;
    if (!card) return;
    card.style.transition = "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)";
    card.style.transform = `translateX(0px) rotate(0deg) scale(1)`;
    resetStackCards();
  };

  const throwCard = (dir) => {
    const card = topCardRef.current;
    if (!card) return;
    const throwX = dir === 'right' ? '130%' : '-130%';
    const throwRotate = dir === 'right' ? '25deg' : '-25deg';
    card.style.transition = "transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    card.style.transform = `translateX(${throwX}) rotate(${throwRotate})`;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const actualI = i + 1;
      const target = getStackTransform(actualI - 1);
      card.style.transition = "transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      card.style.transform = `translateY(-${target.offsetY}px) scale(${target.scale}) rotate(${target.rotate}deg)`;
    });
  };

  const onTouchStart = (e) => {
    if (isThrown.current) return;
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
    currentDragX.current = 0;
  };

  const onTouchMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.touches[0].clientX - startX.current;
    currentDragX.current = dx;
    moveTopCard(dx);
    animateStackCards(dx);
  };

  const onTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const dx = currentDragX.current;
    if (Math.abs(dx) > 80) {
      isThrown.current = true;
      throwCard(dx > 0 ? 'right' : 'left');
      setTimeout(() => {
        isThrown.current = false;
        // ✅ infinite — bas +1 karo, % total se wrap hoga
        setTopIndex((prev) => (prev + 1) % total);
      }, 350);
    } else {
      resetTopCard();
    }
    currentDragX.current = 0;
  };

  const onMouseDown = (e) => {
    if (isThrown.current) return;
    isDragging.current = true;
    startX.current = e.clientX;
    currentDragX.current = 0;
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startX.current;
    currentDragX.current = dx;
    moveTopCard(dx);
    animateStackCards(dx);
  };

  const onMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const dx = currentDragX.current;
    if (Math.abs(dx) > 80) {
      isThrown.current = true;
      throwCard(dx > 0 ? 'right' : 'left');
      setTimeout(() => {
        isThrown.current = false;
        setTopIndex((prev) => (prev + 1) % total);
      }, 350);
    } else {
      resetTopCard();
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
        {[...Array(Math.min(STACK_COUNT, total))].map((_, i) => {
          const cardIndex = (topIndex + (total - i)) % total;
          const isTop = i === 0;
          const img = moodboardImages[cardIndex];
          const { offsetY, scale, rotate } = getStackTransform(i);

          return (
            <div
              key={cardIndex} // ✅ topIndex nahi — cardIndex use karo, re-mount nahi hoga
              ref={isTop ? topCardRef : (el) => (cardRefs.current[i - 1] = el)}
              className={styles["deck-card"]}
              style={{
                transform: `translateY(-${offsetY}px) scale(${scale}) rotate(${rotate}deg)`,
                zIndex: STACK_COUNT - i + 1,
                transition: isTop ? "none" : "transform 0.4s ease",
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

      {/* ✅ Counter — current + 1 dikhao, infinite feel ke liye */}
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