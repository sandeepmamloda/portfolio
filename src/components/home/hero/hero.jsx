"use client"
import { useEffect, useRef, useState } from "react";
import styles from "./hero.module.css";

const projects = [
  { title: "Everyone has", subtitle: "somewhere to be" },
  { title: "Daily Life of", subtitle: "a Teenager" },
  { title: "Vibrant day at", subtitle: "the Dead Parade" },
];

const DURATION = 4000;

const Hero = function () {
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);
  const startTimeRef = useRef(null);
  const rafRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    const animate = (ts) => {
      if (!startTimeRef.current) startTimeRef.current = ts;
      const elapsed = ts - startTimeRef.current;
      const pct = Math.min((elapsed / DURATION) * 100, 100);

      if (fillRef.current) {
        fillRef.current.style.width = pct + "%";
      }

      if (elapsed >= DURATION) {
        const next = (currentRef.current + 1) % projects.length;
        currentRef.current = next;
        setCurrent(next);
        startTimeRef.current = ts;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section className={styles["home-section-wrapper"]}>

      <div className={`${styles["video-layer"]} ${current === 0 ? styles["video-active"] : ""}`} >
        <video autoPlay muted loop playsInline>
          <source src="/videos/home/hero/hero.mp4" type="video/mp4" />
        </video>
      </div>
      <div className={`${styles["video-layer"]} ${styles["video-blue"]} ${current === 1 ? styles["video-active"] : ""}`}>
        <video autoPlay muted loop playsInline>
          <source src="/videos/home/hero/footer.mp4" type="video/mp4" />
        </video>
      </div>
      <div className={`${styles["video-layer"]} ${styles["video-orange"]} ${current === 2 ? styles["video-active"] : ""}`}>
        <video autoPlay muted loop playsInline>
          <source src="/videos/home/hero/work-ui-1.mp4" type="video/mp4" />
        </video>
      </div>
      <div className={styles["home-section-top-text-wrapper"]}>
        <div className={styles["top-content"]}>
          <h1>
            <span>HONEY</span>
            <span>B.</span>
            <span>SINGH</span>
          </h1>
        </div>
        <div className={styles["bottom-content"]}>
          <div className={styles["content"]}>
            <p>WRITER</p>
            <p>FILM-MAKER/DIRECTOR</p>
          </div>
          <div className={styles["content"]}>
            <p>BASED IN</p>
            <p>ABU DHABI, UAE</p>
          </div>
        </div>
      </div>

      <div className={styles["projects-strip"]}>
        <p className={styles["project-counter"]}>{current + 1}/{projects.length}</p>
        <div className={styles["progress-track"]}>
          <div ref={fillRef} className={styles["progress-fill"]} />
        </div>
        <div className={styles["projects-list"]}>
          {projects.map((project, i) => (
            <div
              key={i}
              className={`${styles["project-item"]} ${i === current ? styles["project-active"] : ""}`}
            >
              <p>{project.title}</p>
              <p>{project.subtitle}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Hero;