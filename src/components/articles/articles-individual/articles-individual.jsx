'use client';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
import styles from "./articles-individual.module.css";

gsap.registerPlugin(ScrollTrigger);

const ArticlesIndividualContent = function () {
  const searchParams = useSearchParams();
  const router       = useRouter();

  const articleRef  = useRef(null);
  const backBtnRef  = useRef(null);
  const h1Ref       = useRef(null);
  const subtitleRef = useRef(null);
  const metaRef     = useRef(null);
  const heroRef     = useRef(null);
  const sectionsRef = useRef([]);

  const title    = searchParams.get("title")    || "";
  const image    = searchParams.get("image")    || "";
  const date     = searchParams.get("date")     || "";
  const duration = searchParams.get("duration") || "";
  const subtitle = searchParams.get("subtitle") || "";

  let content = [];
  try {
    content = JSON.parse(searchParams.get("content") || "[]");
  } catch {
    content = [];
  }

  useEffect(() => {
    let ctx;

    const timer = setTimeout(() => {
      ctx = gsap.context(() => {

        /* ── Back button — clip-path wipe left to right ── */
        gsap.set(backBtnRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 1 });
        gsap.to(backBtnRef.current, {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.6,
          ease: "expo.out",
          delay: 0.2,
        });

        /* ── H1 — letter by letter curtain reveal ── */
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
          duration: 2.4,
          ease: "expo.out",
          stagger: 0.06,
          delay: 0.3,
        });

        /* ── Subtitle — clip-path wipe left to right ── */
        gsap.set(subtitleRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 1 });
        gsap.to(subtitleRef.current, {
          clipPath: "inset(0 0% 0 0)",
          duration: 2.0,
          ease: "expo.out",
          delay: 0.7,
        });

        /* ── Meta — clip-path wipe left to right ── */
        gsap.set(metaRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 1 });
        gsap.to(metaRef.current, {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.8,
          ease: "expo.out",
          delay: 0.9,
        });

        /* ── Hero image — clip-path wipe top to bottom ── */
        gsap.set(heroRef.current, { clipPath: "inset(0 0 100% 0)", opacity: 1 });
        gsap.to(heroRef.current, {
          clipPath: "inset(0 0 0% 0)",
          duration: 2.8,
          ease: "expo.out",
          delay: 0.5,
        });

        /* ── Article sections — clip-path wipe left to right on scroll ── */
        sectionsRef.current.forEach((el, i) => {
          if (!el) return;
          gsap.set(el, { clipPath: "inset(0 100% 0 0)", opacity: 1 });
          gsap.to(el, {
            clipPath: "inset(0 0% 0 0)",
            duration: 2.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              scroller: document.documentElement,
              start: "top 88%",
              once: true,
            },
            delay: 0.1 * i,
          });
        });

      }, articleRef);
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, []);

  return (
    <article className={styles["article-wrapper"]} ref={articleRef}>

      {/* Header */}
      <div className={styles["header"]}>
        <button
          className={styles["back-btn"]}
          ref={backBtnRef}
          onClick={() => router.back()}
        >
          BACK
        </button>
        <h1 ref={h1Ref}>{title}</h1>
      </div>

      {/* Subtitle aur Meta */}
      <div className={styles["title-section"]}>
        <p className={styles["subtitle"]} ref={subtitleRef}>
          {subtitle || "Stories, filmmaking insights, and creative explorations shaping the future of cinema and visual storytelling."}
        </p>
        <div className={styles["meta"]} ref={metaRef}>
          <span>{date}</span>
          <span className={styles["dot"]}>·</span>
          <span>{duration}</span>
        </div>
      </div>

      {/* Hero Image */}
      <div className={styles["hero-image"]} ref={heroRef}>
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      {/* Article Body */}
      <div className={styles["article-body"]}>
        {content.length > 0 ? (
          content.map((section, index) => (
            <section
              key={index}
              className={styles["section"]}
              ref={(el) => (sectionsRef.current[index] = el)}
            >
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          ))
        ) : (
          <>
            <section className={styles["section"]} ref={(el) => (sectionsRef.current[0] = el)}>
              <h2>Introduction</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </section>
            <section className={styles["section"]} ref={(el) => (sectionsRef.current[1] = el)}>
              <h2>Behind the Process</h2>
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
              <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
            </section>
            <section className={styles["section"]} ref={(el) => (sectionsRef.current[2] = el)}>
              <h2>The Creative Vision</h2>
              <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>
            </section>
            <section className={styles["section"]} ref={(el) => (sectionsRef.current[3] = el)}>
              <h2>Crafting the Narrative</h2>
              <p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.</p>
              <p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est.</p>
            </section>
            <section className={styles["section"]} ref={(el) => (sectionsRef.current[4] = el)}>
              <h2>Conclusion</h2>
              <p>Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.</p>
              <p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.</p>
            </section>
          </>
        )}
      </div>

    </article>
  );
};

const ArticlesIndividual = function () {
  return (
    <Suspense fallback={<div className={styles["loading"]}>Loading...</div>}>
      <ArticlesIndividualContent />
    </Suspense>
  );
};

export default ArticlesIndividual;