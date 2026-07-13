"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./list.module.css";

gsap.registerPlugin(ScrollTrigger);

const workVideos = [
  { title: "Amplifying the Tuner",           type: "Commercial",  duration: "15:30", video: "/videos/work/work.mp4"       },
  { title: "Everyone has somewhere to be",   type: "Social",      duration: "17:21", video: "/videos/work/contact-us.mp4"     },
  { title: "Daily life of a Teenager",       type: "Social",      duration: "10:41", video: "/videos/work/work.mp4"       },
  { title: "Vibrant Day at the Dead Parade", type: "Promotional", duration: "27:21", video: "/videos/work/contact-us.mp4"     },
  { title: "Beyond the Game",                type: "Commercial",  duration: "21:10", video: "/videos/work/hero.mp4"       },
  { title: "The Price of Silence",           type: "Social",      duration: "18:20", video: "/videos/work/contact-us.mp4"     },
  { title: "Fragments of Reality",           type: "Social",      duration: "11:40", video: "/videos/work/contact-us.mp4" },
];

const Work = function () {
  const [activeVideo, setActiveVideo] = useState(0);
  const router = useRouter();

  const sectionRef  = useRef(null);
  const h1Ref       = useRef(null);
  const listRef     = useRef(null);
  const listHeadRef = useRef(null);
  const toggleRef   = useRef(null);
  const itemRefs    = useRef([]);

  const handleVideoClick = (item) => {
    const encodedUrl = encodeURIComponent(item.video);
    router.push(`/video-player?url=${encodedUrl}&title=${encodeURIComponent(item.title)}`);
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    let ctx;

    const timer = setTimeout(() => {

      ctx = gsap.context(() => {

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
          duration: 3.2,       // 2.2 → 3.2
          ease: "expo.out",
          stagger: 0.14,       // 0.1 → 0.14
          delay: 0.4,          // 0.3 → 0.4
        });

        /* ── Toggle buttons — fade + y ── */
        gsap.set(toggleRef.current, { opacity: 0, y: 16 });
        gsap.to(toggleRef.current, {
          opacity: 1,
          y: 0,
          duration: 2.2,       // 1.6 → 2.2
          ease: "expo.out",
          delay: 1.2,          // 0.8 → 1.2
        });

        /* ── List head — clip-path wipe ── */
        gsap.set(listHeadRef.current, { clipPath: "inset(0 100% 0 0)" });
        gsap.to(listHeadRef.current, {
          clipPath: "inset(0 0% 0 0)",
          duration: 2.0,       // 1.4 → 2.0
          ease: "expo.out",
          scrollTrigger: {
            trigger: listHeadRef.current,
            scroller: document.documentElement,
            start: "top 90%",
            once: true,
          },
        });

        /* ── List items — clip-path wipe ── */
        gsap.set(itemRefs.current, { clipPath: "inset(0 100% 0 0)" });

        itemRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.to(el, {
            clipPath: "inset(0 0% 0 0)",
            duration: 2.2,     // 1.6 → 2.2
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              scroller: document.documentElement,
              start: "top 90%",
              once: true,
            },
            delay: i * 0.18,   // 0.12 → 0.18
          });
        });

      }, sectionRef);

    }, 100);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles["work-wrapper"]}>
      <div className={styles["work-main"]}>

        <div className={styles["work-image-wrapper"]}>
          {workVideos.map((item, index) => (
            <video
              key={index}
              autoPlay muted loop playsInline
              className={`${styles["bg-video"]} ${activeVideo === index ? styles["active-video"] : ""}`}
            >
              <source src={item.video} type="video/mp4" />
            </video>
          ))}
        </div>

        <div className={styles["text-wrapper"]}>
          <h1 ref={h1Ref}>WORK</h1>

          <div className={styles["list-wrapper"]}>

            <div ref={toggleRef} className={styles["toggle-buttons"]}>
              <div className={styles["grid"]} onClick={() => router.push("/work/grid")}>
                <span>Grid</span>
              </div>
              <div className={styles["list"]}>
                <span>List</span>
              </div>
            </div>

            <div ref={listRef} className={styles["list-main"]}>
              <div ref={listHeadRef} className={styles["list-head"]}>
                <span>Name</span>
                <span>Type</span>
                <span>Duration</span>
              </div>

              {workVideos.map((item, index) => (
                <div
                  key={index}
                  ref={(el) => (itemRefs.current[index] = el)}
                  className={styles["list-items"]}
                  onMouseEnter={() => setActiveVideo(index)}
                  onClick={() => handleVideoClick(item)}
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