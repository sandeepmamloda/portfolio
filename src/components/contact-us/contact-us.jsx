// "use client";

// import styles from "./contact-us.module.css";

// export default function ContactSection() {
//   return (
//     <section className={styles.contactSection}>
//       {/* Header — card ke bahar */}
//       <div className={styles.contactHeader}>
//         <h1 className={styles.contactTitle}>CONTACT</h1>
//         <p className={styles.contactDesc}>
//           Sharing personal thoughts, work-in-progress ideas, and deep-dives
//           about design. Learnings from a decade in the industry.
//         </p>
//       </div>

//       {/* Body Card — form + video dono andar */}
//       <div className={styles.contactCard}>
//         {/* Form */}
//         <div className={styles.contactForm}>
//           <div className={styles.formGroup}>
//             <label htmlFor="contact-name">Name</label>
//             <input id="contact-name" type="text" placeholder="Value" />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="contact-enquiry">Enquiry</label>
//             <input id="contact-enquiry" type="text" placeholder="Value" />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="contact-email">Email</label>
//             <input id="contact-email" type="email" placeholder="Value" />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="contact-message">Message</label>
//             <textarea id="contact-message" placeholder="Value" rows={3} />
//           </div>

//           <button className={styles.submitBtn}>Submit</button>
//         </div>

//         {/* Video Section */}
//         <div className={styles.contactVideoWrapper}>
//           <div className={styles.videoFrame}>
//             <video
//               className={styles.contactVideo}
//               src="/videos/contact-us/contact-us.mp4"
//               autoPlay
//               loop
//               playsInline
//               suppressHydrationWarning
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
// =============================================================================
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import styles from "./contact-us.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef  = useRef(null);
  const h1Ref       = useRef(null);
  const descRef     = useRef(null);
  const cardRef     = useRef(null);
  const formRef     = useRef(null);
  const videoRef    = useRef(null);

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {

        // ── H1 — letter clip reveal ──
        const letters = h1Ref.current.innerText.split("");
        h1Ref.current.innerHTML = letters
          .map(l =>
            l === " "
              ? " "
              : `<span style="display:inline-block;overflow:hidden;line-height:1.15;vertical-align:bottom"><i style="display:inline-block;font-style:normal;will-change:transform">${l}</i></span>`
          )
          .join("");

        gsap.set(h1Ref.current.querySelectorAll("i"), { yPercent: 115 });
        gsap.to(h1Ref.current.querySelectorAll("i"), {
          yPercent: 0,
          duration: 2.2,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            scroller: document.documentElement,
            start: "top 75%",
            once: true,
          },
        });

        // ── Description — fade + y ──
        gsap.set(descRef.current, { opacity: 0, y: 18 });
        gsap.to(descRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            scroller: document.documentElement,
            start: "top 75%",
            once: true,
          },
        });

        // ── Card — 3D flip-in (Journal card jaisa) ──
        if (cardRef.current) {
          cardRef.current.style.perspective = "1200px";
          gsap.set(cardRef.current, {
            opacity: 0,
            y: 55,
            rotateX: 14,
            transformOrigin: "bottom center",
            transformStyle: "preserve-3d",
          });
          gsap.to(cardRef.current, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 2.0,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              scroller: document.documentElement,
              start: "top 70%",
              once: true,
            },
            delay: 0.2,
            onComplete: () => {
              gsap.set(cardRef.current, {
                clearProps: "rotateX,transformOrigin,transformStyle,willChange",
              });
            },
          });
        }

        // ── Form fields — staggered slide-up ──
        if (formRef.current) {
          const fields = formRef.current.querySelectorAll(
            "." + styles.formGroup + ", ." + styles.submitBtn
          );
          gsap.set(fields, { opacity: 0, y: 28 });
          gsap.to(fields, {
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: "expo.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              scroller: document.documentElement,
              start: "top 65%",
              once: true,
            },
            delay: 0.5,
          });
        }

        // ── Video — fade + scale-up ──
        if (videoRef.current) {
          gsap.set(videoRef.current, { opacity: 0, scale: 0.92 });
          gsap.to(videoRef.current, {
            opacity: 1,
            scale: 1,
            duration: 1.8,
            ease: "expo.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              scroller: document.documentElement,
              start: "top 65%",
              once: true,
            },
            delay: 0.45,
          });
        }

      }, sectionRef);
    }, 80);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={sectionRef} className={styles.contactSection}>
      {/* Header */}
      <div className={styles.contactHeader}>
        <h1 ref={h1Ref} className={styles.contactTitle}>CONTACT</h1>
        <p ref={descRef} className={styles.contactDesc}>
          Sharing personal thoughts, work-in-progress ideas, and deep-dives
          about design. Learnings from a decade in the industry.
        </p>
      </div>

      {/* Body Card */}
      <div ref={cardRef} className={styles.contactCard}>
        {/* Form */}
        <div ref={formRef} className={styles.contactForm}>
          <div className={styles.formGroup}>
            <label htmlFor="contact-name">Name</label>
            <input id="contact-name" type="text" placeholder="Value" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="contact-enquiry">Enquiry</label>
            <input id="contact-enquiry" type="text" placeholder="Value" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="contact-email">Email</label>
            <input id="contact-email" type="email" placeholder="Value" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="contact-message">Message</label>
            <textarea id="contact-message" placeholder="Value" rows={3} />
          </div>

          <button className={styles.submitBtn}>Submit</button>
        </div>

        {/* Video */}
        <div ref={videoRef} className={styles.contactVideoWrapper}>
          <div className={styles.videoFrame}>
            <video
              className={styles.contactVideo}
              src="/videos/contact-us/contact-us.mp4"
              autoPlay
              loop
              playsInline
              suppressHydrationWarning
            />
          </div>
        </div>
      </div>
    </section>
  );
}