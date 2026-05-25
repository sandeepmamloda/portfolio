// "use client"
// import styles from "./heroabout.module.css";

// const ImageBox = ({ children, imageSrc }) => {
//   return (
//     <div className={styles["img-wrapper"]} style={{ position: "relative" }}>
//       <img
//         src={imageSrc}
//         alt="hero"
//         style={{
//           width: "100%",
//           height: "100%",
//           objectFit: "cover",
//           borderRadius: "1.5rem",
//           display: "block",
//         }}
//       />
//       {children}
//     </div>
//   );
// };

// const Heroabout = function () {
//   return (
//     <section className={styles["heroabout-wrapper"]}>
//       <div className={styles["hero-video-wrapper"]}>
//         <video autoPlay muted loop playsInline>
//           <source src="/videos/about/about.mp4" type="video/mp4" />
//         </video>
//       </div>
//       <div className={styles["hero-text-wrapper"]}>
//         <ImageBox imageSrc="/images/normal.png">
//           <div className={styles["hero-text-left-1"]}>
//             <h1>WHERE SCRIPTS BECOME SIGHT</h1>
//           </div>
//           <div className={styles["hero-text-left-2"]}>
//             <p>
//               I tell stories through both the lens and the page where visuals
//               meet emotion and moments become cinema.
//             </p>
//           </div>
//           <div className={styles["hero-text-right-bottom"]}>
//             <p>FILM-MAKER &amp; WRITER</p>
//           </div>
//         </ImageBox>
//       </div>
//     </section>
//   );
// };

// export default Heroabout;

// ==============================================================================
"use client"
import { gsap } from "gsap"
import { useEffect, useRef } from "react"
import styles from "./heroabout.module.css"

const ImageBox = ({ children, imageSrc, imgRef }) => {
  return (
    <div className={styles["img-wrapper"]} style={{ position: "relative" }}>
      <div style={{ width: "100%", height: "100%", overflow: "hidden", borderRadius: "1.5rem" }}>
        <img
          ref={imgRef}
          src={imageSrc}
          alt="hero"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            willChange: "transform",
          }}
        />
      </div>
      {children}
    </div>
  )
}

const Heroabout = function () {
  const sectionRef = useRef(null)
  const videoRef   = useRef(null)
  const imgRef     = useRef(null)
  const h1Ref      = useRef(null)
  const paraRef    = useRef(null)
  const tagRef     = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.set(imgRef.current,  { scale: 1.12, opacity: 0 })
      gsap.set(h1Ref.current,   { yPercent: 100, opacity: 0 })
      gsap.set(paraRef.current, { y: 24, opacity: 0 })
      gsap.set(tagRef.current,  { y: 24, opacity: 0 })

      const tl = gsap.timeline()

      tl.to(imgRef.current, {
          scale: 1,
          opacity: 1,
          duration: 1.6,
          ease: "power3.out",
        }, 0)

        .to(h1Ref.current, {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          ease: "expo.out",
        }, 0.25)

        .to(paraRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        }, 0.45)

        .to(tagRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
        }, 0.6)

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={styles["heroabout-wrapper"]}
      style={{ transformOrigin: "center top" }}
    >
      <div ref={videoRef} className={styles["hero-video-wrapper"]}>
        <video autoPlay muted loop playsInline>
          <source src="/videos/about/about.mp4" type="video/mp4" />
        </video>
      </div>

      <div className={styles["hero-text-wrapper"]}>
        <ImageBox imageSrc="/images/normal.png" imgRef={imgRef}>
          <div className={styles["hero-text-left-1"]} style={{ overflow: "hidden" }}>
            <h1 ref={h1Ref} style={{ display: "inline-block" }}>
              WHERE SCRIPTS BECOME SIGHT
            </h1>
          </div>
          <div className={styles["hero-text-left-2"]}>
            <p ref={paraRef}>
              I tell stories through both the lens and the page where visuals
              meet emotion and moments become cinema.
            </p>
          </div>
          <div className={styles["hero-text-right-bottom"]}>
            <p ref={tagRef}>FILM-MAKER &amp; WRITER</p>
          </div>
        </ImageBox>
      </div>
    </section>
  )
}

export default Heroabout