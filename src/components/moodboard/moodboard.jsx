'use client';

import Image from "next/image";
import { useState } from "react";
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

/*
  Strategy:
  Canvas = 100% width
  3 columns, each column anchor point:
    Col 1 center: 16.5%
    Col 2 center: 50%
    Col 3 center: 83.5%

  Each card: left = colCenter - (cardWidth / 2)
  This ensures cards are always centered in their column
  regardless of card size.

  Card sizes (larger than before, gap stays same):
  Col 1 & 3: 15rem x 12rem  (landscape)
  Col 2 top 2: 14rem x 18rem (portrait)
  Col 2 bottom: 12rem x 16rem (portrait smaller)
*/

// Column center anchors
const COL1 = "16.5%";
const COL2 = "50%";
const COL3 = "83.5%";

// Card widths (must match --w in style)
const W_LAND  = "15rem";  // landscape col1 & col3
const W_PORT  = "14rem";  // portrait col2 top 2
const W_PORT2 = "12rem";  // portrait col2 bottom

const scatteredPositions = [
  // Col 1 — landscape
  { top: "5%",  colCenter: COL1, rotate: "-3deg", w: W_LAND,  h: "12rem" }, // img-1
  { top: "36%", colCenter: COL1, rotate: "4deg",  w: W_LAND,  h: "12rem" }, // img-4
  { top: "67%", colCenter: COL1, rotate: "-4deg", w: W_LAND,  h: "13rem" }, // img-7

  // Col 2 — portrait tall
  { top: "0%",  colCenter: COL2, rotate: "3deg",  w: W_PORT,  h: "18rem" }, // img-2
  { top: "34%", colCenter: COL2, rotate: "-5deg", w: W_PORT,  h: "18rem" }, // img-5
  { top: "67%", colCenter: COL2, rotate: "5deg",  w: W_PORT2, h: "16rem" }, // img-8

  // Col 3 — landscape
  { top: "4%",  colCenter: COL3, rotate: "-2deg", w: W_LAND,  h: "12rem" }, // img-3
  { top: "36%", colCenter: COL3, rotate: "4deg",  w: W_LAND,  h: "12rem" }, // img-6
  { top: "67%", colCenter: COL3, rotate: "-3deg", w: W_LAND,  h: "12rem" }, // img-9
];

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

      <div
        className={`${styles["moodboard-canvas"]} ${scattered ? styles["is-scattered"] : ""}`}
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

    </section>
  );
};

export default Moodboard;