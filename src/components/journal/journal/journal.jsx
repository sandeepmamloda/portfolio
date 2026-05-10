'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./journal.module.css";

const journalData = [
  {
    id: 1,
    title: "Balancing Creativity and Deadlines",
    date: "Feb 04, 2026",
    duration: "15 Minutes",
    image: "/images/journal/Balancing-Creativity-and-Deadlines.jpg",
  },
  {
    id: 2,
    title: "Navigating the complexity of simplicity",
    date: "Jan 23, 2026",
    duration: "12 Minutes",
    image: "/images/journal/Navigating-the-complexity-of-simplicity.jpg",
  },
  {
    id: 3,
    title: "The joy of slow living",
    date: "Feb 04, 2026",
    duration: "15 Minutes",
    image: "/images/journal/The-joy-of-slow-living.jpg",
  },
  {
    id: 4,
    title: "The Power of Networking for Enterprise",
    date: "Jan 23, 2026",
    duration: "12 Minutes",
    image: "/images/journal/The-Power-of-Networking-for-Enterprise.jpg",
  },
  {
    id: 5,
    title: "The Art of Mindful Creation",
    date: "Mar 10, 2026",
    duration: "8 Minutes",
    image: "/images/journal/Balancing-Creativity-and-Deadlines.jpg",
  },
  {
    id: 6,
    title: "Finding Flow in Chaos",
    date: "Apr 01, 2026",
    duration: "11 Minutes",
    image: "/images/journal/The-joy-of-slow-living.jpg",
  },
];

const ITEMS_PER_PAGE = 4;

const Journal = function () {
  const router = useRouter();
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const handleItemClick = (item) => {
    router.push(`/journal/journal-individual?title=${encodeURIComponent(item.title)}&image=${encodeURIComponent(item.image)}&date=${encodeURIComponent(item.date)}&duration=${encodeURIComponent(item.duration)}`);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const visibleItems = journalData.slice(0, visibleCount);
  const hasMore = visibleCount < journalData.length;

  return (
    <section className={styles["grid-wrapper"]}>
      <div className={styles["grid-main"]}>

        {/* First Layer */}
        <div className={styles["grid-first-layer"]}>
          <div>
            <h1>JOURNAL</h1>
          </div>
          <div>
            <p>
              Sharing personal thoughts, work-in-progress ideas, and deep-dives about design. Learnings from a decade in the industry.
            </p>
          </div>
        </div>

        {/* Grid Items */}
        <div className={styles["grid-third-layer"]}>
          {visibleItems.map((item) => (
            <div
              className={styles["grid-items"]}
              key={item.id}
              onClick={() => handleItemClick(item)}
            >
              <div className={styles["image-wrapper"]}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className={styles["title"]}>
                <h2>{item.title}</h2>
              </div>

              <div className={styles["normal-text"]}>
                <p>{item.date}</p>
                <span></span>
                <p>{item.duration}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className={styles["load-more-wrapper"]}>
            <button
              className={styles["load-more-btn"]}
              onClick={handleLoadMore}
            >
              <span className={styles["btn-text"]}>Load More</span>
              <span className={styles["btn-icon"]}>+</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default Journal;