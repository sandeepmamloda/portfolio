"use client";

import styles from "./press.module.css";

const pressVideos = [
  {
    title: "Best Short Film",
    type: "18th Annual London Asian Film Festival, London England",
    duration: "March 2016",
    video: "/videos/work/work.mp4",
  },
  {
    title: "Best Emerging Female Filmmaker",
    type: "7th Annual Dadasaheb Phalke Film Festival, New Delhi",
    duration: " April 2015",
    video: "/videos/work/footer.mp4",
  },
  {
    title: "Producer Craft Award",
    type: "New York University Tisch School of the Arts Asia Craft Awards",
    duration: "April 2015",
    video: "/videos/work/work.mp4",
  },
  {
    title: "Best Cinematography, Jury Award",
    type: "7th Annual Dadasaheb Phalke Film Festival, New Delhi",
    duration: " April 2015",
    video: "/videos/work/footer.mp4",
  },
  {
    title: "Production Design Craft Award",
    type: "New York University Tisch School of the Arts Asia Craft Awards",
    duration: " April 2015",
    video: "/videos/work/hero.mp4",
  },
  {
    title: " Best Editing, Jury Award",
    type: "7th Annual Dadasaheb Phalke Film Festival, New Delhi",
    duration: " April 2015",
    video: "/videos/work/footer.mp4",
  },
  // {
  //   title: "Fragments of Reality",
  //   type: "Social",
  //   duration: "11:40",
  //   video: "/videos/work/work.mp4",
  // },
];

const Press = function () {
  return (
    <section className={styles["press-wrapper"]}>
      <div className={styles["press-main"]}>

        {/* Single Background Video */}
        <div className={styles["press-image-wrapper"]}>
          <video
            autoPlay
            muted
            loop
            playsInline
            className={styles["bg-video"]}
          >
            <source src={pressVideos[0].video} type="video/mp4" />
          </video>
        </div>

        {/* Content */}
        <div className={styles["text-wrapper"]}>

          <div className={styles["press-header"]}>
            <h1>PRESS</h1>
            <p className={styles["press-desc"]}>
              Sharing personal thoughts, work-in-progress ideas, and deep-dives about design. Learnings from a decade in the industry.
            </p>
          </div>

          <div className={styles["list-wrapper"]}>

            {/* List Main */}
            <div className={styles["list-main"]}>

              <div className={styles["list-head"]}>
                <span>NAME</span>
                <span>AT</span>
                <span>DATE</span>
              </div>

              {pressVideos.map((item, index) => (
                <div
                  key={index}
                  className={styles["list-items"]}
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

export default Press;