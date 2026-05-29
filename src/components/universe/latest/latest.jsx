"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import styles from "./latest.module.css";
import { useRouter } from "next/navigation";
import { articlesData } from "./articlesdata";

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
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
    <path d="M7.93755 0.416737C8.06867 -0.138913 8.85947 -0.138912 8.99059 0.416738L10.3497 6.17621C10.3967 6.37568 10.5525 6.53142 10.7519 6.57849L16.5114 7.93755C17.0671 8.06867 17.0671 8.85947 16.5114 8.99059L10.7519 10.3497C10.5525 10.3967 10.3967 10.5525 10.3497 10.7519L8.99059 16.5114C8.85947 17.0671 8.06867 17.0671 7.93755 16.5114L6.57849 10.7519C6.53142 10.5525 6.37568 10.3967 6.17621 10.3497L0.416737 8.99059C-0.138913 8.85947 -0.138912 8.06867 0.416738 7.93755L6.17621 6.57849C6.37568 6.53142 6.53142 6.37568 6.57849 6.17621L7.93755 0.416737Z" fill="white"/>
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
  // ── NEW ──
  const canvasRef   = useRef(null);

  const handleCardClick = (article) => {
    const fullData = articlesData.find(
      (a) => a.title.toLowerCase() === article.title.toLowerCase()
    );
    router.push(
      `/articles/articles-individual?title=${encodeURIComponent(article.title)}&image=${encodeURIComponent(article.image)}&date=${encodeURIComponent(article.date)}&duration=${encodeURIComponent(fullData?.duration || "")}&subtitle=${encodeURIComponent(fullData?.subtitle || "")}&content=${encodeURIComponent(JSON.stringify(fullData?.content || []))}`
    );
  };

  const handleAllArticles = () => {
    router.push("/articles/articles");
  };

  useEffect(() => {
    // ── Sonar dot canvas ──
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const DPR    = window.devicePixelRatio || 1;
    const SIZE   = 28;
    canvas.width  = SIZE * DPR;
    canvas.height = SIZE * DPR;
    ctx.scale(DPR, DPR);

    const CX = SIZE / 2;
    const CY = SIZE / 2;
    const DOT_R = 7;

    const BURST_DELAY = [0, 320, 640];
    const RING_DUR    = 1600;
    const CYCLE       = 3600;
    const MAX_R       = SIZE / 2 - 1;

    const rings = BURST_DELAY.map(d => ({
      delay: d, active: false, bornAt: 0, lastCycle: -1, r: 0, opacity: 0,
    }));

    let startTime = null;
    let rafId;

    const easeOut = t => 1 - Math.pow(1 - t, 2.8);
    const easeIn  = t => t * t * t;

    const tick = (ts) => {
      if (!startTime) startTime = ts;
      const now = ts - startTime;

      rings.forEach(ring => {
        const cycle = Math.floor((now - ring.delay) / CYCLE);
        const phase = (now - ring.delay) % CYCLE;
        if (cycle < 0) { ring.opacity = 0; return; }
        if (cycle !== ring.lastCycle && phase < 80) {
          ring.lastCycle = cycle;
          ring.active    = true;
          ring.bornAt    = now;
        }
        if (!ring.active) { ring.opacity = 0; return; }
        const age = now - ring.bornAt;
        const t   = Math.min(age / RING_DUR, 1);
        ring.r    = DOT_R + easeOut(t) * (MAX_R - DOT_R);
        if      (t < 0.06) ring.opacity = (t / 0.06) * 0.7;
        else if (t < 0.65) ring.opacity = 0.7 - ((t - 0.06) / 0.59) * 0.3;
        else               ring.opacity = 0.4 * (1 - easeIn((t - 0.65) / 0.35));
        if (t >= 1) { ring.active = false; ring.opacity = 0; }
      });

      ctx.clearRect(0, 0, SIZE, SIZE);

      rings.forEach(ring => {
        if (ring.opacity <= 0.002) return;
        ctx.beginPath();
        ctx.arc(CX, CY, ring.r + 2, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(138, 56, 245, ${ring.opacity * 0.2})`;
        ctx.lineWidth   = 4;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(CX, CY, ring.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(138, 56, 245, ${ring.opacity})`;
        ctx.lineWidth   = 1;
        ctx.stroke();
      });

      ctx.beginPath();
      ctx.arc(CX, CY, DOT_R, 0, Math.PI * 2);
      ctx.fillStyle = "#8A38F5";
      ctx.fill();

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    // ── GSAP animations ──
    let ctx_gsap;

    const timer = setTimeout(() => {
      ctx_gsap = gsap.context(() => {

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
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
      ctx_gsap?.revert();
    };
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>

      {/* ── TOP ROW ── */}
      <div className={styles.topRow}>
        <div className={styles.leftCol}>
          <div className={styles.tag} ref={tagRef}>
            {/* ── CHANGED: canvas sonar dot instead of static span ── */}
            <canvas ref={canvasRef} className={styles["tag-dot-canvas"]} />
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