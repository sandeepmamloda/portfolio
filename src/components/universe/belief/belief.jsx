"use client";
import styles from "./belief.module.css";

const BeliefSection = function () {
  return (
    <section className={styles.beliefSection}>

      {/* ── TOP ROW ── */}
      <div className={styles.topRow}>

        {/* Left */}
        <div className={styles.leftCol}>
          <div className={styles.tag}>
            <span className={styles.tagDot} />
            04 &nbsp;BELIEF
          </div>
          <p className={styles.subText}>
            The thinking behind how we work — guiding how we Write, Direct, and produce films.
          </p>
        </div>

        {/* Right — big quote */}
        <div className={styles.rightCol}>
          <h2 className={styles.quote}>
            “Built to tell meaningful stories, not chase noise. Clear vision. Honest filmmaking. Lasting impact.
          </h2>
        </div>

      </div>

      {/* ── VIDEO ── */}
      <div className={styles.imageWrap}>
        <video
          className={styles.image}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/belief/belief.mp4" type="video/mp4" />
        </video>
      </div>

    </section>
  );
};

export default BeliefSection;