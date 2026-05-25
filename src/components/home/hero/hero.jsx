"use client"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef, useState } from "react"
import styles from "./hero.module.css"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { title: "Everyone has",   subtitle: "somewhere to be"  },
  { title: "Daily Life of",  subtitle: "a Teenager"       },
  { title: "Vibrant day at", subtitle: "the Dead Parade"  },
]

const DURATION = 4000

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const currentRef    = useRef(0)
  const startTimeRef  = useRef(null)
  const rafRef        = useRef(null)
  const fillRef       = useRef(null)

  const sectionRef    = useRef(null)
  const videoRefs     = useRef([])
  const h1Ref         = useRef(null)
  const bottomRef     = useRef(null)
  const stripRef      = useRef(null)
  const span1Ref      = useRef(null)
  const span2Ref      = useRef(null)
  const span3Ref      = useRef(null)

  useEffect(() => {
    const animate = (ts) => {
      if (!startTimeRef.current) startTimeRef.current = ts
      const elapsed = ts - startTimeRef.current
      const pct = Math.min((elapsed / DURATION) * 100, 100)
      if (fillRef.current) fillRef.current.style.width = pct + "%"
      if (elapsed >= DURATION) {
        const next = (currentRef.current + 1) % projects.length
        currentRef.current = next
        setCurrent(next)
        startTimeRef.current = ts
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current

      /* 1. H1 spans — slower stagger, gentler rise */
      gsap.from([span1Ref.current, span2Ref.current, span3Ref.current], {
        yPercent: 80,
        opacity: 0,
        stagger: 0.14,
        duration: 1.6,
        ease: "power3.out",
        delay: 0.2,
      })

      /* 2. Bottom content */
      gsap.from(bottomRef.current, {
        yPercent: 25,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
        delay: 0.65,
      })

      /* 3. Projects strip */
      gsap.from(stripRef.current, {
        yPercent: 40,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
        delay: 0.85,
      })

      /* 4. Video parallax — very subtle, long scrub */
      videoRefs.current.forEach((el) => {
        if (!el) return
        gsap.to(el, {
          scale: 1.08,
          yPercent: -5,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 2.5,
          },
        })
      })

      /* 5. H1 — very slow float */
      gsap.to(h1Ref.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 3,
        },
      })

      /* 6. Bottom text — gradual fade, starts later */
      gsap.to(bottomRef.current, {
        yPercent: -28,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "15% top",
          end: "65% top",
          scrub: 2,
        },
      })

      /* 7. Projects strip — starts even later */
      gsap.to(stripRef.current, {
        yPercent: -20,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "25% top",
          end: "75% top",
          scrub: 2,
        },
      })

      /* 8. EXIT — cinematic, very gradual */
      gsap.to(section, {
        scale: 0.9,
        opacity: 0,
        borderRadius: "20px",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "65% top",
          end: "bottom top",
          scrub: 2,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={styles["home-section-wrapper"]}
      style={{ transformOrigin: "center top", willChange: "transform, opacity", overflow: "hidden" }}
    >
      {[
        "/videos/home/hero/hero.mp4",
        "/videos/home/hero/footer.mp4",
        "/videos/home/hero/work-ui-1.mp4",
      ].map((src, i) => (
        <div
          key={i}
          ref={(el) => (videoRefs.current[i] = el)}
          className={`${styles["video-layer"]} ${i === 1 ? styles["video-blue"] : ""} ${i === 2 ? styles["video-orange"] : ""} ${current === i ? styles["video-active"] : ""}`}
          style={{ willChange: "transform" }}
        >
          <video autoPlay muted loop playsInline>
            <source src={src} type="video/mp4" />
          </video>
        </div>
      ))}

      <div className={styles["home-section-top-text-wrapper"]}>
        <div className={styles["top-content"]}>
          <h1 ref={h1Ref} style={{ overflow: "hidden" }}>
            <span ref={span1Ref} style={{ display: "inline-block" }}>HONEY</span>
            <span ref={span2Ref} style={{ display: "inline-block" }}>B.</span>
            <span ref={span3Ref} style={{ display: "inline-block" }}>SINGH</span>
          </h1>
        </div>
        <div ref={bottomRef} className={styles["bottom-content"]}>
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

      <div ref={stripRef} className={styles["projects-strip"]}>
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
  )
}