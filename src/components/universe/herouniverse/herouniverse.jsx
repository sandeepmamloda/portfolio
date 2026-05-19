import styles from "./herouniverse.module.css";

const Herouniverse = function () {
  return (
    <section className={styles["herouniverse"]}>

      {/* Tag */}
      <div className={styles["tag"]}>
        <span className={styles["tag-dot"]} />
        01 &nbsp;WHO WE ARE
      </div>

      {/* Top Row */}
      <div className={styles["top-row"]}>

        {/* Logo */}
        <h1 className={styles["logo"]}>HONEYVERSE</h1>

        {/* Right Side */}
        <div className={styles["right"]}>

          {/* Description */}
          <p className={styles["desc"]}>
            HONEYVERSE is a daring film production company known for its
            unapologetically tacky, bold visual identity and a deep passion for
            storytelling. Embracing loud aesthetics, vibrant creativity, and
            unconventional style, THE UNIVERSE produces films that celebrate
            emotion, chaos, and imagination.
          </p>

        </div>
      </div>

      {/* Media Section */}
      <div className={styles["media-wrap"]}>
        <video
          src="/videos/honeyverse/honeyverse.mp4"
          autoPlay
          muted
          loop
          playsInline
          className={styles["media"]}
        />
      </div>

    </section>
  );
};

export default Herouniverse;