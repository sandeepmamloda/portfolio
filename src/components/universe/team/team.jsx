"use client";
import { useState } from "react";
import styles from "./team.module.css";

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
  return (
    <section className={styles.teamSection}>
      <div className={styles.leftCol}>
        <div className={styles.tag}>
          <span className={styles.tagDot} />
          03 &nbsp; EXPERTS
        </div>

        <h2 className={styles.heading}>
          THE TEAM
          <br />
          <span className={styles.headingMuted}>BEHIND WHAT</span>
          <br />
          YOU SEE.
        </h2>

        <p className={styles.bodyText}>
          Behind every great film is a team of passionate storytellers, creators,
          and problem-solvers. Our crew brings together creative vision, technical
          expertise, and years of production experience to craft films that connect
          with audiences and leave a lasting impact. From concept development to
          final cut, every project is driven by collaboration, innovation, and a
          shared love for storytelling.
        </p>

        <button className={styles.ctaBtn}>
          <StarIcon /> WORK WITH US
        </button>
      </div>

      <div className={styles.grid}>
        {teamMembers.map((member, i) => (
          <div
            key={member.id}
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