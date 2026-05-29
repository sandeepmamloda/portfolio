"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import styles from "./team.module.css";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    id: 1,
    name: "Honey B. Singh",
    role: "Founder & Executive Producer",
    desc: "The driving force behind the production company, the Founder & Executive Producer oversees the creative vision.",
    image: "/team/honey.jpg",
  },
  {
    id: 2,
    name: "Mark Collins",
    role: "Cinematographer",
    desc: "The Cinematographer is responsible for the visual style of the film.",
    image: "/images/universe/mark-collins.jpg",
  },
  {
    id: 3,
    name: "Sarah Patel",
    role: "Production Designer",
    desc: "The Production Designer creates the overall look of the film, including sets and locations.",
    image: "/images/universe/sarah-patel.jpg",
  },
  {
    id: 4,
    name: "James Wong",
    role: "Editor",
    desc: "The Editor is in charge of assembling the footage and shaping the final version of the film.",
    image: "/images/universe/james-wong.jpg",
  },
];

const DiamondIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="34" height="28" viewBox="0 0 34 28" fill="none">
    <rect x="11" y="0.0263672" width="6" height="22" rx="3" transform="rotate(30 11 0.0263672)" fill="#FF0099"/>
    <rect x="28" y="21.0264" width="6" height="22" rx="3" transform="rotate(90 28 21.0264)" fill="#FF0099"/>
    <rect width="6" height="22" rx="3" transform="matrix(-0.866025 0.5 0.5 0.866025 22.9961 0)" fill="#FF0099"/>
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
<path d="M7.93755 0.416737C8.06867 -0.138913 8.85947 -0.138912 8.99059 0.416738L10.3497 6.17621C10.3967 6.37568 10.5525 6.53142 10.7519 6.57849L16.5114 7.93755C17.0671 8.06867 17.0671 8.85947 16.5114 8.99059L10.7519 10.3497C10.5525 10.3967 10.3967 10.5525 10.3497 10.7519L8.99059 16.5114C8.85947 17.0671 8.06867 17.0671 7.93755 16.5114L6.57849 10.7519C6.53142 10.5525 6.37568 10.3967 6.17621 10.3497L0.416737 8.99059C-0.138913 8.85947 -0.138912 8.06867 0.416738 7.93755L6.17621 6.57849C6.37568 6.53142 6.53142 6.37568 6.57849 6.17621L7.93755 0.416737Z" fill="white"/>
</svg>
);

function MemberCard({ member }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`${styles.card} ${hovered ? styles.cardHovered : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.cardImageWrap}>
        <img
          src={member.image}
          alt={member.name}
          className={styles.cardImage}
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.parentElement.classList.add(styles.noImage);
          }}
        />
        <div className={styles.cardOverlay} />
      </div>

      <div className={styles.cardBody}>
        <DiamondIcon />
        <p className={styles.cardName}>{member.name}</p>
        <p className={styles.cardRole}>{member.role}</p>
        <div className={styles.cardDivider} />
        <p className={styles.cardDesc}>{member.desc}</p>
      </div>
    </div>
  );
}

const TeamSection = function () {
  const sectionRef  = useRef(null);
  const tagRef      = useRef(null);
  const headingRef  = useRef(null);
  const bodyRef     = useRef(null);
  const btnRef      = useRef(null);
  const cardRefs    = useRef([]);
  // ── NEW ──
  const canvasRef   = useRef(null);

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

        /* ── Tag — clip-path wipe ── */
        gsap.set(tagRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 1 });
        gsap.to(tagRef.current, {
          clipPath: "inset(0 0% 0 0)",
          duration: 2.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: tagRef.current,
            scroller: document.documentElement,
            start: "top 85%",
            once: true,
          },
        });

        /* ── Heading — char by char light → dark scroll scrub ── */
        const rawText = headingRef.current.innerText;

        headingRef.current.innerHTML = rawText
          .split("\n")
          .map(line =>
            line
              .split("")
              .map(ch =>
                ch === " "
                  ? `<span style="display:inline-block;width:0.3em"> </span>`
                  : `<span style="display:inline-block;color:#ffffff22">${ch}</span>`
              )
              .join("")
          )
          .join("<br/>");

        const charEls = headingRef.current.querySelectorAll("span");

        charEls.forEach((char, i) => {
          gsap.to(char, {
            color: "#ffffff",
            ease: "none",
            scrollTrigger: {
              trigger: headingRef.current,
              scroller: document.documentElement,
              start: `top+=${i * 28} 65%`,
              end: `top+=${i * 28 + 50} 65%`,
              scrub: 0.8,
            },
          });
        });

        /* ── Body text — fade + y ── */
        gsap.set(bodyRef.current, { opacity: 0, y: 24 });
        gsap.to(bodyRef.current, {
          opacity: 1,
          y: 0,
          duration: 2.4,
          ease: "expo.out",
          scrollTrigger: {
            trigger: bodyRef.current,
            scroller: document.documentElement,
            start: "top 85%",
            once: true,
          },
          delay: 0.5,
        });

        /* ── CTA Button — clip-path wipe ── */
        gsap.set(btnRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 1 });
        gsap.to(btnRef.current, {
          clipPath: "inset(0 0% 0 0)",
          duration: 2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: btnRef.current,
            scroller: document.documentElement,
            start: "top 90%",
            once: true,
          },
          delay: 0.4,
        });

        /* ── Cards — clip-path wipe staggered ── */
        cardRefs.current.forEach((el, i) => {
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
            delay: i * 0.25,
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
    <section className={styles.teamSection} ref={sectionRef}>
      <div className={styles.leftCol}>

        <div className={styles.tag} ref={tagRef}>
          {/* ── CHANGED: canvas sonar dot instead of static span ── */}
          <canvas ref={canvasRef} className={styles["tag-dot-canvas"]} />
          03 &nbsp;EXPERTS
        </div>

        <h2 className={styles.heading} ref={headingRef}>
          {`THE TEAM\nBEHIND WHAT\nYOU SEE.`}
        </h2>

        <p className={styles.bodyText} ref={bodyRef}>
          Behind every great film is a team of passionate storytellers, creators, and problem-solvers. Our crew brings together creative vision, technical expertise, and years of production experience to craft films that connect with audiences and leave a lasting impact. From concept development to final cut, every project is driven by collaboration, innovation, and a shared love for storytelling.
        </p>

        <button className={styles.ctaBtn} ref={btnRef}>
          <StarIcon /> WORK WITH US
        </button>

      </div>

      <div className={styles.grid}>
        {teamMembers.map((member, i) => (
          <div
            key={member.id}
            ref={(el) => (cardRefs.current[i] = el)}
            className={`${styles.gridItem} ${i % 2 === 1 ? styles.gridItemOffset : ""}`}
          >
            <MemberCard member={member} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;