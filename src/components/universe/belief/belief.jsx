"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import styles from "./belief.module.css";

gsap.registerPlugin(ScrollTrigger);

const BeliefSection = function () {
  const sectionRef  = useRef(null);
  const tagRef      = useRef(null);
  const subTextRef  = useRef(null);
  const quoteRef    = useRef(null);
  const videoRef    = useRef(null);

  useEffect(() => {
    let ctx;

    const timer = setTimeout(() => {
      ctx = gsap.context(() => {

        /* ── Tag — clip-path wipe left → right ── */
        gsap.set(tagRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 1 });
        gsap.to(tagRef.current, {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: tagRef.current,
            scroller: document.documentElement,
            start: "top 85%",
            once: true,
          },
        });

        /* ── SubText — clip-path wipe left → right ── */
        gsap.set(subTextRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 1 });
        gsap.to(subTextRef.current, {
          clipPath: "inset(0 0% 0 0)",
          duration: 2.0,
          ease: "expo.out",
          scrollTrigger: {
            trigger: subTextRef.current,
            scroller: document.documentElement,
            start: "top 85%",
            once: true,
          },
          delay: 0.2,
        });

        /* ── Quote — char by char light → dark scroll scrub ── */
        const rawText = quoteRef.current.innerText;

        quoteRef.current.innerHTML = rawText
          .split("")
          .map(ch =>
            ch === " "
              ? `<span style="display:inline-block;width:0.3em"> </span>`
              : `<span style="display:inline-block;color:#ffffff22">${ch}</span>`
          )
          .join("");

        const charEls = quoteRef.current.querySelectorAll("span");

        charEls.forEach((char, i) => {
          gsap.to(char, {
            color: "#ffffff",
            ease: "none",
            scrollTrigger: {
              trigger: quoteRef.current,
              scroller: document.documentElement,
              start: `top+=${i * 5} 85%`,
              end: `top+=${i * 5 + 40} 85%`,
              scrub: 0.6,
            },
          });
        });

        /* ── Video — clip-path wipe top → bottom ── */
        gsap.set(videoRef.current, { clipPath: "inset(0 0 100% 0)", opacity: 1 });
        gsap.to(videoRef.current, {
          clipPath: "inset(0 0 0% 0)",
          duration: 2.6,
          ease: "expo.out",
          scrollTrigger: {
            trigger: videoRef.current,
            scroller: document.documentElement,
            start: "top 85%",
            once: true,
          },
          delay: 0.2,
        });

      }, sectionRef);
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, []);

  return (
    <section className={styles.beliefSection} ref={sectionRef}>

      {/* ── TOP ROW ── */}
      <div className={styles.topRow}>

        {/* Left */}
        <div className={styles.leftCol}>
          <div className={styles.tag} ref={tagRef}>
            <span className={styles.tagDot} />
            04 &nbsp;BELIEF
          </div>
          <p className={styles.subText} ref={subTextRef}>
            The thinking behind how we work — guiding how we Write, Direct, and produce films.
          </p>
        </div>

        {/* Right — big quote */}
        <div className={styles.rightCol}>
          <h2 className={styles.quote} ref={quoteRef}>
            "Built to tell meaningful stories, not chase noise. Clear vision. Honest filmmaking. Lasting impact.
          </h2>
        </div>

      </div>

      {/* ── VIDEO ── */}
      <div className={styles.imageWrap} ref={videoRef}>
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