"use client"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"
import styles from "./introduction.module.css"

gsap.registerPlugin(ScrollTrigger)

const Introduction = function () {
  const sectionRef = useRef(null)
  const h2Ref      = useRef(null)
  const paraRef    = useRef(null)

  useEffect(() => {
  if (!sectionRef.current) return

  // ✅ Lenis initialize hone ka wait karo
  const timer = setTimeout(() => {

    const ctx = gsap.context(() => {
      const rawText = paraRef.current.textContent ?? ""
      paraRef.current.innerHTML = rawText
        .trim()
        .split(/\s+/)
        .map(word => `<span style="display:inline-block">${word}</span>`)
        .join(" ")

      const words = paraRef.current.querySelectorAll("span")

      gsap.set(words, { opacity: 0, y: 18 })
      gsap.set(h2Ref.current, { yPercent: 80, opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller: document.documentElement, // ✅
          start: "top 70%",
          toggleActions: "play none none none",
          markers: false,
        },
      })

      tl.to(h2Ref.current, {
        yPercent: 0,
        opacity: 1,
        duration: 1.4,
        ease: "expo.out",
      }, 0)
      .to(words, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: { each: 0.03, from: "start" },
      }, 0.3)

    })

    return () => ctx.revert()

  }, 100) // ← 100ms kaafi hai

  return () => clearTimeout(timer)
}, [])

  return (
    <section ref={sectionRef} className={styles["introduction-wrapper"]}>
      <div className={styles["introduction-main"]}>
        <div className={styles["introduction-left"]}>
          <h2 ref={h2Ref}>introduction</h2>
        </div>
        <div className={styles["introduction-right"]}>
          <p ref={paraRef}>
            Honey is an Indian-Canadian writer-director who graduated from the film production MFA from New York University's Tisch School of the Arts Asia in Singapore in 2015. For the past four years, Honey has been writing, directing and producing short films, music videos and commercials which have won awards and played at film festivals. Honey's short film HEER (2015) has won many awards including Best Short Film at the London Asian Film Festival and Emerging Female Filmmaker at the Dada Saheb Phalke Film Festival in Delhi, India. HEER was screened at some of the most prestigious film festivals geared towards children including Toronto International Film Festival for Kids, Doha's Ajyal Youth Film Festival and the Montreal World Film Festival. Honey's first-ever commercial, which she wrote-directed for the MOFILM competition, won 3rd place and subsequently Haagen Dazs incorporated it in their China campaign so it played in movie theatres all over the country this past spring. Honey was invited to attend the NALIP's Diverse Women in Media Residency Lab 2015 (which is the only screenplay lab in the world geared towards women-of-colour) to further develop her South Asian cross-cultural romantic-comedy script with other female creatives and mentors. Honey is currently developing her first feature film which is a East-meets-West cross-cultural romantic comedy titled I AM A BANANA! The film has been chosen for the 15th Hong Kong - Asia Film Financing Forum (HAF).
          </p>
        </div>
      </div>
    </section>
  )
}

export default Introduction