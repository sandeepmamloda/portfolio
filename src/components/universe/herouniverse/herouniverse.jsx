// import styles from "./herouniverse.module.css";

// const Herouniverse = function () {
//   return (
//     <section className={styles["herouniverse"]}>

//       {/* Tag */}
//       <div className={styles["tag"]}>
//         <span className={styles["tag-dot"]} />
//         01 &nbsp;WHO WE ARE
//       </div>

//       {/* Top Row */}
//       <div className={styles["top-row"]}>

//         {/* Logo */}
//         <h1 className={styles["logo"]}>HONEYVERSE</h1>

//         {/* Right Side */}
//         <div className={styles["right"]}>

//           {/* Description */}
//           <p className={styles["desc"]}>
//             HONEYVERSE is a daring film production company known for its
//             unapologetically tacky, bold visual identity and a deep passion for
//             storytelling. Embracing loud aesthetics, vibrant creativity, and
//             unconventional style, THE UNIVERSE produces films that celebrate
//             emotion, chaos, and imagination.
//           </p>

//         </div>
//       </div>

//       {/* Media Section */}
//       <div className={styles["media-wrap"]}>
//         <video
//           src="/videos/honeyverse/honeyverse.mp4"
//           autoPlay
//           muted
//           loop
//           playsInline
//           className={styles["media"]}
//         />
//       </div>

//     </section>
//   );
// };

// export default Herouniverse;

// =====================================================================
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import styles from "./herouniverse.module.css";

gsap.registerPlugin(ScrollTrigger);

const Herouniverse = function () {
  const sectionRef  = useRef(null);
  const tagRef      = useRef(null);
  const logoRef     = useRef(null);
  const descRef     = useRef(null);
  const mediaRef    = useRef(null);

  useEffect(() => {
    let ctx;

    const timer = setTimeout(() => {
      ctx = gsap.context(() => {

        /* ── Tag — clip-path wipe left to right ── */
        gsap.set(tagRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 1 });
        gsap.to(tagRef.current, {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.8,
          ease: "expo.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: tagRef.current,
            scroller: document.documentElement,
            start: "top 85%",
            once: true,
          },
        });

        /* ── Logo — letter by letter curtain reveal ── */
        const letters = logoRef.current.innerText.split("");
        logoRef.current.innerHTML = letters
          .map(l =>
            l === " "
              ? "&nbsp;"
              : `<span style="display:inline-block;overflow:hidden;line-height:1"><i style="display:inline-block;font-style:normal">${l}</i></span>`
          )
          .join("");

        const letterEls = logoRef.current.querySelectorAll("i");
        gsap.set(letterEls, { yPercent: 110 });
        gsap.to(letterEls, {
          yPercent: 0,
          duration: 2.8,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: logoRef.current,
            scroller: document.documentElement,
            start: "top 85%",
            once: true,
          },
          delay: 0.2,
        });

        /* ── Description — fade + y ── */
        gsap.set(descRef.current, { opacity: 0, y: 20 });
        gsap.to(descRef.current, {
          opacity: 1,
          y: 0,
          duration: 2.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: descRef.current,
            scroller: document.documentElement,
            start: "top 85%",
            once: true,
          },
          delay: 0.6,
        });

        /* ── Media — scale + brightness reveal ── */
        gsap.set(mediaRef.current, { opacity: 0, scale: 1.08, filter: "blur(8px) brightness(0.4)" });
        gsap.to(mediaRef.current, {
          opacity: 1,
          scale: 1,
          filter: "blur(0px) brightness(1)",
          duration: 2.6,
          ease: "expo.out",
          scrollTrigger: {
            trigger: mediaRef.current,
            scroller: document.documentElement,
            start: "top 80%",
            once: true,
          },
          delay: 0.4,
        });

      }, sectionRef);
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, []);

  return (
    <section className={styles["herouniverse"]} ref={sectionRef}>

      {/* Tag */}
      <div className={styles["tag"]} ref={tagRef}>
        <span className={styles["tag-dot"]} />
        01 &nbsp;WHO WE ARE
      </div>

      {/* Top Row */}
      <div className={styles["top-row"]}>

        {/* Logo */}
        <h1 className={styles["logo"]} ref={logoRef}>HONEYVERSE</h1>

        {/* Right Side */}
        <div className={styles["right"]}>

          {/* Description */}
          <p className={styles["desc"]} ref={descRef}>
            HONEYVERSE is a daring film production company known for its
            unapologetically tacky, bold visual identity and a deep passion for
            storytelling. Embracing loud aesthetics, vibrant creativity, and
            unconventional style, THE UNIVERSE produces films that celebrate
            emotion, chaos, and imagination.
          </p>

        </div>
      </div>

      {/* Media Section */}
      <div className={styles["media-wrap"]} ref={mediaRef}>
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