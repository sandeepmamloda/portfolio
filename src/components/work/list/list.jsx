"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./list.module.css";

const workVideos = [
  {
    title: "Amplifying the Tuner",
    type: "Commercial",
    duration: "15:30",
    video: "/videos/work/work.mp4",
  },
  {
    title: "Everyone has somewhere to be",
    type: "Social",
    duration: "17:21",
    video: "/videos/work/footer.mp4",
  },
  {
    title: "Daily life of a Teenager",
    type: "Social",
    duration: "10:41",
    video: "/videos/work/work.mp4",
  },
  {
    title: "Vibrant Day at the Dead Parade",
    type: "Promotional",
    duration: "27:21",
    video: "/videos/work/footer.mp4",
  },
  {
    title: "Beyond the Game",
    type: "Commercial",
    duration: "21:10",
    video: "/videos/work/hero.mp4",
  },
  {
    title: "The Price of Silence",
    type: "Social",
    duration: "18:20",
    video: "/videos/work/footer.mp4",
  },
  {
    title: "Fragments of Reality",
    type: "Social",
    duration: "11:40",
    video: "/videos/work/contact-us.mp4",
  },
];

const Work = function () {
  const [activeVideo, setActiveVideo] = useState(0);
  const router = useRouter();

  // ✅ 1. Grid wala click handler add kiya
  const handleVideoClick = (item) => {
    const encodedUrl = encodeURIComponent(item.video);
    router.push(`/video-player?url=${encodedUrl}&title=${encodeURIComponent(item.title)}`);
  };

  return (
    <section className={styles["work-wrapper"]}>
      <div className={styles["work-main"]}>

        {/* Videos */}
        <div className={styles["work-image-wrapper"]}>
          {workVideos.map((item, index) => (
            <video
              key={index}
              autoPlay
              muted
              loop
              playsInline
              className={`${styles["bg-video"]} ${
                activeVideo === index ? styles["active-video"] : ""
              }`}
            >
              <source src={item.video} type="video/mp4" />
            </video>
          ))}
        </div>

        {/* Content */}
        <div className={styles["text-wrapper"]}>
          <h1>WORK</h1>

          <div className={styles["list-wrapper"]}>

            {/* Toggle Buttons */}
            <div className={styles["toggle-buttons"]}>
              <div
                className={styles["grid"]}
                onClick={() => router.push("/work/grid")}
              >
                <span>Grid</span>
              </div>
              <div className={styles["list"]}>
                <span>List</span>
              </div>
            </div>

            {/* List Main */}
            <div className={styles["list-main"]}>
              <div className={styles["list-head"]}>
                <span>Name</span>
                <span>Type</span>
                <span>Duration</span>
              </div>

              {workVideos.map((item, index) => (
                <div
                  key={index}
                  className={styles["list-items"]}
                  onMouseEnter={() => setActiveVideo(index)}
                  onClick={() => handleVideoClick(item)} // ✅ 2. Click handler lagaya
                >
                  <h3>{item.title}</h3>
                  <p>{item.type}</p>
                  <span>{item.duration}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Work;