"use client";

import styles from "./press.module.css";

const pressVideos = [
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
    video: "/videos/work/work.mp4",
  },
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

          <h1>PRESS</h1>

          <div className={styles["list-wrapper"]}>

            {/* List Main */}
            <div className={styles["list-main"]}>

              <div className={styles["list-head"]}>
                <span>Name</span>
                <span>Type</span>
                <span>Duration</span>
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