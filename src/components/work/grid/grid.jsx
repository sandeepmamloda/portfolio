'use client';

import { useRouter } from "next/navigation";
import { useRef } from "react";
import styles from "./grid.module.css";

const gridData = [
  {
    id: 1,
    title: "Heer",
    date: "October 8, 2015",
    duration: "13 min.",
    video: "/videos/home/hero/hero.mp4",
  },
  {
    id: 2,
    title: "I Am A Banana",
    date: "Feb , 2015",
    duration: "13 min.",
    video: "/videos/home/hero/footer.mp4",
  },
  {
    id: 3,
    title: "Daily life of a Teenager",
    date: "Jan 23, 2026",
    duration: "10:41",
    video: "/videos/home/hero/work-ui-1.mp4",
  },
  {
    id: 4,
    title: "Vibrant Day at the Dead Parade",
    date: "Feb 04, 2026",
    duration: "27:21",
    video: "/videos/home/hero/footer.mp4",
  },
];

const Grid = function () {
  const videoRefs = useRef({});
  const router = useRouter();

  const handleMouseEnter = (id) => {
    const video = videoRefs.current[id];
    if (video) {
      video.play().catch((err) => console.log("Video play error:", err));
    }
  };

  const handleMouseLeave = (id) => {
    const video = videoRefs.current[id];
    if (video) {
      video.pause();
    }
  };

  const handleVideoClick = (item) => {
    const encodedUrl = encodeURIComponent(item.video);
    router.push(`/video-player?url=${encodedUrl}&title=${encodeURIComponent(item.title)}`);
  };

  return (
    <section className={styles["grid-wrapper"]}>
      <div className={styles["grid-main"]}>
        <div className={styles["grid-first-layer"]}>
          <div className="grid-first-layer-inner-1">
            <h1>WORK</h1>
          </div>
          <div className="grid-first-layer-inner-2">
            <p>
              Sharing personal thoughts, work-in-progress ideas, and deep-dives
              about design. Learnings from a decade in the industry.
            </p>
          </div>
        </div>

        <div className={styles["grid-second-layer"]}>
          <div className={styles["grid-second-layer-grid"]}>
            <span>Grid</span>
          </div>
          <div
            className={styles["grid-second-layer-list"]}
            onClick={() => router.push("/work/list")}
          >
            <span>List</span>
          </div>
        </div>

        <div className={styles["grid-third-layer"]}>
          {gridData.map((item) => (
            <div
              className={styles["grid-items"]}
              key={item.id}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={() => handleMouseLeave(item.id)}
            >
              <div
                className={styles["video-wrapper"]}
                onClick={() => handleVideoClick(item)}
              >
                <video
                  ref={(el) => (videoRefs.current[item.id] = el)}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source src={item.video} type="video/mp4" />
                </video>
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
      </div>
    </section>
  );
};

export default Grid;