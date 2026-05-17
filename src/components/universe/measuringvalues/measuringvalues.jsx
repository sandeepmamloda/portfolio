"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./measuringvalues.module.css";

const stats = [
  {
    id: 1,
    title: "Production Output",
    value: 300,
    suffix: "+",
    sub: "Scenes Filmed",
    desc: "Original films developed and produced in-house.",
  },
  {
    id: 2,
    title: "Festival Recognition",
    value: 20,
    suffix: "+",
    sub: "International Festivals",
    desc: "Recognized across global film festivals.",
  },
  {
    id: 3,
    title: "Audience Reach",
    value: 5,
    suffix: "M+",
    sub: "Views Worldwide",
    desc: "Audience reach across digital and theatrical platforms.",
  },
  {
    id: 4,
    title: "Development Pipeline",
    value: 20,
    suffix: "+",
    sub: "Scripts Developed",
    desc: "Ongoing original film development.",
  },
];

function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);

  return count;
}

function StatCard({ stat, animate }) {
  const count = useCounter(stat.value, 1800, animate);

  return (
    <div className={styles["card"]}>
      <svg
        className={styles["card-icon"]}
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="27"
        viewBox="0 0 35 27"
        fill="none"
      >
        <path
          d="M33.4687 11.025L23.6687 1.225C22.4437 -3.12924e-07 20.5187 -3.12924e-07 19.2937 1.225L9.49375 11.025C8.26875 12.25 8.26875 14.175 9.49375 15.4L19.2937 25.2C19.8187 25.725 20.6937 26.075 21.3937 26.075C22.0937 26.075 22.9687 25.725 23.4937 25.2L33.2938 15.4C34.6937 14.175 34.6937 12.075 33.4687 11.025ZM2.66875 12.775L13.6937 1.75L11.9437 0L0.91875 11.025C-0.30625 12.25 -0.30625 14.175 0.91875 15.4L11.9437 26.25L13.8687 24.325L2.84375 13.3C2.49375 13.3 2.49375 12.95 2.66875 12.775Z"
          fill="#FF0099"
        />
      </svg>
      <p className={styles["card-title"]}>{stat.title}</p>
      <div className={styles["card-stat"]}>
        <span className={styles["card-number"]}>{count}</span>
        <span className={styles["card-suffix"]}>{stat.suffix}</span>
        <span className={styles["card-sub"]}>{stat.sub}</span>
      </div>
      <p className={styles["card-desc"]}>{stat.desc}</p>
    </div>
  );
}

const Whatyouget = function () {
  const sectionRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimate(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles["whatyouget"]} ref={sectionRef}>
      <div className={styles["top-row"]}>
        <div className={styles["left-col"]}>
          <div className={styles["tag"]}>
            <span className={styles["tag-dot"]} />
            02 &nbsp; WHAT YOU GET
          </div>
        </div>

        <div className={styles["right-col"]}>
          <div className={styles["right-col-inner"]}>
            <div className={styles["heading-deco-row"]}>
              <h2 className={styles["heading"]}>
                MEASURABLE VALUES,
                <br />
                <span className={styles["heading-muted"]}>NOT PROMISES.</span>
              </h2>
              <div className={styles["deco-bars"]}>
                <div className={styles["deco-bars-gap"]} />
                <span /><span /><span /><span /><span />
                <span /><span /><span /><span /><span />
                <span /><span /><span /><span /><span />
                <span /><span /><span /><span /><span />
              </div>
            </div>

            <div className={styles["divider-row"]}>
              <svg
                className={styles["line-star"]}
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="15"
                viewBox="0 0 21 15"
                fill="none"
              >
                <path
                  d="M10.3327 0L11.1241 5.18717C11.264 6.10427 12.0162 6.80475 12.941 6.87909L20.6654 7.5L12.941 8.12091C12.0162 8.19525 11.264 8.89573 11.1241 9.81283L10.3327 15L9.54127 9.81283C9.40135 8.89573 8.64913 8.19525 7.7244 8.12091L0 7.5L7.7244 6.87909C8.64913 6.80475 9.40135 6.10427 9.54127 5.18717L10.3327 0Z"
                  fill="white"
                />
              </svg>
              <svg
                className={styles["line"]}
                height="1"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="#fff"
                  strokeWidth="1"
                />
              </svg>
              <p className={styles["subtitle"]}>
                Clear metrics, transparent
                <br />
                process, results you can rely on.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles["grid"]}>
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} animate={animate} />
        ))}
      </div>
    </section>
  );
};

export default Whatyouget;