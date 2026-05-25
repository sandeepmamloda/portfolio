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
  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="15" viewBox="0 0 21 15" fill="none">
    <path
      d="M10.3327 0L11.1241 5.18717C11.264 6.10427 12.0162 6.80475 12.941 6.87909L20.6654 7.5L12.941 8.12091C12.0162 8.19525 11.264 8.89573 11.1241 9.81283L10.3327 15L9.54127 9.81283C9.40135 8.89573 8.64913 8.19525 7.7244 8.12091L0 7.5L7.7244 6.87909C8.64913 6.80475 9.40135 6.10427 9.54127 5.18717L10.3327 0Z"
      fill="white"
    />
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

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Tag — clip-path wipe ── */
      gsap.set(tagRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 1 });
      gsap.to(tagRef.current, {
        clipPath: "inset(0 0% 0 0)",
        duration: 2.2,        // 1.6 → 2.2
        ease: "expo.out",
        scrollTrigger: {
          trigger: tagRef.current,
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
            start: `top+=${i * 28} 65%`,   // 18 → 28
            end: `top+=${i * 28 + 50} 65%`, // 30 → 50
            scrub: 0.8,                      // 0.2 → 0.8
          },
        });
      });

      /* ── Body text — fade + y ── */
      gsap.set(bodyRef.current, { opacity: 0, y: 24 });
      gsap.to(bodyRef.current, {
        opacity: 1,
        y: 0,
        duration: 2.4,        // 1.8 → 2.4
        ease: "expo.out",
        scrollTrigger: {
          trigger: bodyRef.current,
          start: "top 85%",
          once: true,
        },
        delay: 0.5,           // 0.3 → 0.5
      });

      /* ── CTA Button — clip-path wipe ── */
      gsap.set(btnRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 1 });
      gsap.to(btnRef.current, {
        clipPath: "inset(0 0% 0 0)",
        duration: 2,          // 1.4 → 2
        ease: "expo.out",
        scrollTrigger: {
          trigger: btnRef.current,
          start: "top 90%",
          once: true,
        },
        delay: 0.4,           // 0.2 → 0.4
      });

      /* ── Cards — clip-path wipe staggered ── */
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { clipPath: "inset(0 100% 0 0)", opacity: 1 });
        gsap.to(el, {
          clipPath: "inset(0 0% 0 0)",
          duration: 2.2,      // 1.6 → 2.2
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
          delay: i * 0.25,    // 0.15 → 0.25
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.teamSection} ref={sectionRef}>
      <div className={styles.leftCol}>

        <div className={styles.tag} ref={tagRef}>
          <span className={styles.tagDot} />
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