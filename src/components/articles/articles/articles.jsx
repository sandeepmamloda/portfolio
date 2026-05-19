'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./articles.module.css";

const articlesData = [
  {
    id: 1,
    title: "From Script to Screen",
    date: "Nov 18, 2025",
    duration: "10 Minutes",
    image: "/images/latest/from-script-to-screen.jpg",
  },
  {
    id: 2,
    title: "Cinematography That Speaks",
    date: "Jan 20, 2026",
    duration: "12 Minutes",
    image: "/images/latest/cinematography-that-speaks.jpg",
  },
  {
    id: 3,
    title: "Editing the Story",
    date: "Feb 12, 2026",
    duration: "8 Minutes",
    image: "/images/latest/editing-the-story.jpg",
  },
  {
    id: 4,
    title: "Film Festivals and Independent Cinema",
    date: "Mar 05, 2026",
    duration: "15 Minutes",
    image: "/images/latest/film-festivals-and-independent-cinema.jpg",
  },
  {
    id: 5,
    title: "The Language of Visual Storytelling",
    date: "Mar 18, 2026",
    duration: "11 Minutes",
    image: "/images/latest/from-script-to-screen.jpg",
  },
  {
    id: 6,
    title: "Sound Design in Modern Cinema",
    date: "Apr 02, 2026",
    duration: "9 Minutes",
    image: "/images/latest/cinematography-that-speaks.jpg",
  },
];

const ITEMS_PER_PAGE = 4;

const Articles = function () {
  const router = useRouter();
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const handleItemClick = (item) => {
    router.push(
      `/articles/articles-individual?title=${encodeURIComponent(item.title)}&image=${encodeURIComponent(item.image)}&date=${encodeURIComponent(item.date)}&duration=${encodeURIComponent(item.duration)}`
    );
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const visibleItems = articlesData.slice(0, visibleCount);
  const hasMore = visibleCount < articlesData.length;

  return (
    <section className={styles["grid-wrapper"]}>
      <div className={styles["grid-main"]}>

        {/* First Layer */}
        <div className={styles["grid-first-layer"]}>
          <div>
            <h1>ARTICLES</h1>
          </div>
          <div>
            <p>
              Stories, filmmaking insights, and creative explorations shaping the future of cinema, visual storytelling, and modern production.
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

        {/* Load More */}
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

export default Articles;