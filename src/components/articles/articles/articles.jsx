'use client';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./articles.module.css";
import { articlesData } from "./articlesdata";

gsap.registerPlugin(ScrollTrigger);

const ITEMS_PER_PAGE = 4;

const Articles = function () {
  const router = useRouter();
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const sectionRef   = useRef(null);
  const h1Ref        = useRef(null);
  const descRef      = useRef(null);
  const itemAnimRefs = useRef({});
  const animatedIds  = useRef(new Set());

  const visibleItems = articlesData.slice(0, visibleCount);
  const hasMore      = visibleCount < articlesData.length;

  const handleItemClick = (item) => {
    router.push(
      `/articles/articles-individual?title=${encodeURIComponent(item.title)}&image=${encodeURIComponent(item.image)}&date=${encodeURIComponent(item.date)}&duration=${encodeURIComponent(item.duration)}&subtitle=${encodeURIComponent(item.subtitle)}&content=${encodeURIComponent(JSON.stringify(item.content))}`
    );
  };

  const handleLoadMore = () => setVisibleCount((prev) => prev + ITEMS_PER_PAGE);

  /* ── Hero text animation ── */
  useEffect(() => {
    let ctx;

    const timer = setTimeout(() => {
      ctx = gsap.context(() => {

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

      }, sectionRef);
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, []);

  /* ── Card scroll animations ── */
  useLayoutEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const newItems = visibleItems.filter((item) => !animatedIds.current.has(item.id));

    if (newItems.length === 0) return;

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();

      newItems.forEach((item, i) => {
        const el = itemAnimRefs.current[item.id];
        if (!el) return;

        animatedIds.current.add(item.id);

        if (isMobile) {
          gsap.set(el, { opacity: 0, y: 50 });
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              scroller: document.documentElement,
              start: "top 90%",
              once: true,
            },
            delay: i * 0.12,
          });
        } else {
          const parent = el.parentElement;
          if (parent) parent.style.perspective = "1200px";

          gsap.set(el, {
            opacity: 0,
            y: 55,
            rotateX: 16,
            transformOrigin: "bottom center",
            transformStyle: "preserve-3d",
          });

          gsap.to(el, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 2.0,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              scroller: document.documentElement,
              start: "top 90%",
              once: true,
            },
            delay: i % 2 === 0 ? 0.05 : 0.28,
            onComplete: () => {
              gsap.set(el, { clearProps: "rotateX,transformOrigin,transformStyle,willChange" });
            },
          });
        }
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [visibleCount]);

  return (
    <section ref={sectionRef} className={styles["grid-wrapper"]}>
      <div className={styles["grid-main"]}>

        <div className={styles["grid-first-layer"]}>
          <div>
            <h1 ref={h1Ref}>ARTICLES</h1>
          </div>
          <div>
            <p ref={descRef}>
              Stories, filmmaking insights, and creative explorations shaping the future of cinema, visual storytelling, and modern production.
            </p>
          </div>
        </div>

        <div
          className={styles["grid-third-layer"]}
          style={{ perspective: "1200px", overflow: "visible" }}
        >
          {visibleItems.map((item) => (
            <div
              className={styles["grid-items"]}
              key={item.id}
              ref={(el) => (itemAnimRefs.current[item.id] = el)}
              onClick={() => handleItemClick(item)}
              style={{ overflow: "visible" }}
            >
              <div className={styles["image-wrapper"]}>
                <Image src={item.image} alt={item.title} fill style={{ objectFit: "cover" }} />
              </div>
              <div className={styles["title"]}>
                <h2>{item.title}</h2>
              </div>
              <div className={styles["normal-text"]}>
                <p>{item.date}</p>
                <span></span>
                <p>{item.duration}</p>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className={styles["load-more-wrapper"]}>
            <button className={styles["load-more-btn"]} onClick={handleLoadMore}>
              <span className={styles["btn-text"]}>Load More</span>
              <span className={styles["btn-icon"]}>+</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default Articles;