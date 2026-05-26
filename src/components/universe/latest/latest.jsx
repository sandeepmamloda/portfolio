"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import styles from "./latest.module.css";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    id: 1,
    date: "18 NOVEMBER 2025",
    title: "From Script to Screen",
    image: "/images/latest/from-script-to-screen.jpg",
  },
  {
    id: 2,
    date: "20 JANUARY 2026",
    title: "Cinematography That Speaks",
    image: "/images/latest/cinematography-that-speaks.jpg",
  },
  {
    id: 3,
    date: "12 FEBRUARY 2026",
    title: "Editing the Story",
    image: "/images/latest/editing-the-story.jpg",
  },
  {
    id: 4,
    date: "05 MARCH 2026",
    title: "Film Festivals and Independent Cinema",
    image: "/images/latest/film-festivals-and-independent-cinema.jpg",
  },
];

const StarIcon = ({ spin }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21" height="15"
    viewBox="0 0 21 15"
    fill="none"
    className={spin ? styles.starSpin : ""}
  >
    <path
      d="M10.3327 0L11.1241 5.18717C11.264 6.10427 12.0162 6.80475 12.941 6.87909L20.6654 7.5L12.941 8.12091C12.0162 8.19525 11.264 8.89573 11.1241 9.81283L10.3327 15L9.54127 9.81283C9.40135 8.89573 8.64913 8.19525 7.7244 8.12091L0 7.5L7.7244 6.87909C8.64913 6.80475 9.40135 6.10427 9.54127 5.18717L10.3327 0Z"
      fill="white"
    />
  </svg>
);

const LatestForm = function () {
  const router = useRouter();

  const sectionRef  = useRef(null);
  const tagRef      = useRef(null);
  const headingRef  = useRef(null);
  const subtitleRef = useRef(null);
  const btnRef      = useRef(null);
  const cardRefs    = useRef([]);

  const handleCardClick = (article) => {
    router.push(
      `/articles/articles-individual?title=${encodeURIComponent(article.title)}&image=${encodeURIComponent(article.image)}&date=${encodeURIComponent(article.date)}`
    );
  };

  const handleAllArticles = () => {
    router.push("/articles/articles");
  };

  useEffect(() => {
    let ctx;

    const timer = setTimeout(() => {
      ctx = gsap.context(() => {

        /* ── Tag ── */
        gsap.set(tagRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 0 });
        gsap.to(tagRef.current, {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 1.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: tagRef.current,
            scroller: document.documentElement,
            start: "top 85%",
            once: true,
          },
        });

        /* ── Heading ── */
        gsap.set(headingRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 0 });
        gsap.to(headingRef.current, {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 2.0,
          ease: "expo.out",
          scrollTrigger: {
            trigger: headingRef.current,
            scroller: document.documentElement,
            start: "top 85%",
            once: true,
          },
          delay: 0.15,
        });

        /* ── Subtitle ── */
        gsap.set(subtitleRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 0 });
        gsap.to(subtitleRef.current, {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 2.0,
          ease: "expo.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            scroller: document.documentElement,
            start: "top 85%",
            once: true,
          },
          delay: 0.25,
        });

        /* ── Button ── */
        gsap.set(btnRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 0 });
        gsap.to(btnRef.current, {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 1.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: btnRef.current,
            scroller: document.documentElement,
            start: "top 90%",
            once: true,
          },
          delay: 0.35,
        });

        /* ── Cards ── */
        cardRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.set(el, { clipPath: "inset(0 100% 0 0)", opacity: 0 });
          gsap.to(el, {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            duration: 2.0,
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              scroller: document.documentElement,
              start: "top 88%",
              once: true,
            },
            delay: i * 0.15,
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
    <section className={styles.section} ref={sectionRef}>

      {/* ── TOP ROW ── */}
      <div className={styles.topRow}>
        <div className={styles.leftCol}>
          <div className={styles.tag} ref={tagRef}>
            <span className={styles.tagDot} />
            05 &nbsp;INSIGHTS
          </div>
          <h2 className={styles.heading} ref={headingRef}>
            LATEST FROM OUR STUDIO
          </h2>
        </div>

        <div className={styles.rightCol}>
          <p className={styles.subtitle} ref={subtitleRef}>
            Stories, filmmaking insights, and creative explorations shaping the future of
            cinema, visual storytelling, and modern production.
          </p>

          <button className={styles.ctaBtn} onClick={handleAllArticles} ref={btnRef}>
            <span className={styles.btnInner}>
              <span className={`${styles.btnRow} ${styles.btnRowDefault}`}>
                <StarIcon /> ALL ARTICLES
              </span>
              <span className={`${styles.btnRow} ${styles.btnRowHover}`}>
                <StarIcon spin /> ALL ARTICLES
              </span>
            </span>
          </button>
        </div>
      </div>

      {/* ── ARTICLES GRID ── */}
      <div className={styles.grid}>
        {articles.map((article, i) => (
          <div
            key={article.id}
            ref={(el) => (cardRefs.current[i] = el)}
            className={`${styles.card} ${styles[`card${i + 1}`]}`}
            onClick={() => handleCardClick(article)}
          >
            <p className={styles.cardDate}>{article.date}</p>
            <div className={styles.cardImageWrap}>
              <img
                src={article.image}
                alt={article.title}
                className={styles.cardImage}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <p className={styles.cardTitle}>{article.title}</p>
          </div>
        ))}
      </div>

    </section>
  );
};

export default LatestForm;