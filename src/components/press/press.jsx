"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import styles from "./press.module.css";

gsap.registerPlugin(ScrollTrigger);

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
    duration: "April 2015",
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
    duration: "April 2015",
    video: "/videos/work/footer.mp4",
  },
  {
    title: "Production Design Craft Award",
    type: "New York University Tisch School of the Arts Asia Craft Awards",
    duration: "April 2015",
    video: "/videos/work/hero.mp4",
  },
  {
    title: "Best Editing, Jury Award",
    type: "7th Annual Dadasaheb Phalke Film Festival, New Delhi",
    duration: "April 2015",
    video: "/videos/work/footer.mp4",
  },
];

const Press = function () {
  const sectionRef   = useRef(null);
  const h1Ref        = useRef(null);
  const descRef      = useRef(null);
  const listRef      = useRef(null);
  const listHeadRef  = useRef(null);
  const itemRefs     = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── H1 — letters clip reveal ── */
      const letters = h1Ref.current.innerText.split("");
      h1Ref.current.innerHTML = letters
        .map(l =>
          l === " "
            ? " "
            : `<span style="display:inline-block;overflow:hidden;line-height:1"><i style="display:inline-block;font-style:normal">${l}</i></span>`
        )
        .join("");

      const letterEls = h1Ref.current.querySelectorAll("i");
      gsap.set(letterEls, { yPercent: 110 });
      gsap.to(letterEls, {
        yPercent: 0,
        duration: 2.2,
        ease: "expo.out",
        stagger: 0.1,
        delay: 0.3,
      });

      /* ── Description — fade + y ── */
      gsap.set(descRef.current, { opacity: 0, y: 16 });
      gsap.to(descRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.6,
        ease: "expo.out",
        delay: 0.9,
      });

      /* ── List head — clip-path wipe ── */
      gsap.set(listHeadRef.current, { clipPath: "inset(0 100% 0 0)" });
      gsap.to(listHeadRef.current, {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 80%",
          once: true,
        },
        delay: 0.1,
      });

      /* ── List items — clip-path wipe ── */
      gsap.set(itemRefs.current, { clipPath: "inset(0 100% 0 0)" });

      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.6,
          ease: "expo.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 75%",
            once: true,
          },
          delay: 0.2 + i * 0.15,
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles["press-wrapper"]}>
      <div className={styles["press-main"]}>

        <div className={styles["press-image-wrapper"]}>
          <video autoPlay muted loop playsInline className={styles["bg-video"]}>
            <source src={pressVideos[0].video} type="video/mp4" />
          </video>
        </div>

        <div className={styles["text-wrapper"]}>

          <div className={styles["press-header"]}>
            <h1 ref={h1Ref}>PRESS</h1>
            <p ref={descRef} className={styles["press-desc"]}>
              Sharing personal thoughts, work-in-progress ideas, and deep-dives about design. Learnings from a decade in the industry.
            </p>
          </div>

          <div className={styles["list-wrapper"]}>
            <div ref={listRef} className={styles["list-main"]}>

              <div ref={listHeadRef} className={styles["list-head"]}>
                <span>NAME</span>
                <span>AT</span>
                <span>DATE</span>
              </div>

              {pressVideos.map((item, index) => (
                <div
                  key={index}
                  ref={(el) => (itemRefs.current[index] = el)}
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