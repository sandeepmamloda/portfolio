// "use client";
// import { useState, useEffect } from "react";
// import styles from "./navbar.module.css";
// import Link from "next/link";

// const Navbar = function () {
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth > 1066) setMenuOpen(false);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggleMenu = () => setMenuOpen((prev) => !prev);
//   const closeMenu = () => setMenuOpen(false);

//   return (
//     <header className={styles["header-wrapper"]}>

//       <div className={styles["header-main"]}>

//         <div className={styles["header-right"]}>
//           <nav className={styles["logo"]}>
//             <Link href="/" onClick={closeMenu}>Portfolio</Link>
//           </nav>
//         </div>

//         <div className={styles["header-left"]}>
//           <nav>
//             <Link href="/about">ABOUT</Link>
//             <Link href="/work/list">WORK</Link>
//             <Link href="/press">PRESS</Link>
//             <Link href="/journal/journal">JOURNAL</Link>
//             <Link href="/moodboard">MOODBOARD</Link>
//             <Link href="/universe">THE UNIVERSE</Link>
//             <Link href="/contact-us">CONTACT</Link>
//           </nav>
//         </div>

//         <button
//           className={`${styles["hamburger"]} ${menuOpen ? styles["open"] : ""}`}
//           onClick={toggleMenu}
//           aria-label="Toggle menu"
//           aria-expanded={menuOpen}
//         >
//           <span></span>
//           <span></span>
//           <span></span>
//         </button>

//       </div>

//       {/* ✅ menuOpen false ho tab render hi mat karo */}
//       {menuOpen && (
//         <div className={`${styles["mobile-menu"]} ${styles["mobile-menu--open"]}`}>
//           <nav onClick={closeMenu}>
//             <Link href="/about">ABOUT</Link>
//             <Link href="/work/list">WORK</Link>
//             <Link href="/press/press">PRESS</Link>
//             <Link href="/journal/journal">JOURNAL</Link>
//             <Link href="/moodboard">MOODBOARD</Link>
//             <Link href="/universe">THE UNIVERSE</Link>
//             <Link href="/contact-us">CONTACT</Link>
//           </nav>
//         </div>
//       )}

//     </header>
//   );
// };

// export default Navbar;


// ========================================================================
"use client";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";

const Navbar = function () {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const logoRef   = useRef(null);
  const navRef    = useRef(null);
  const burgerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1066) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* ── Mount animation ── */
  useEffect(() => {
    const ctx = gsap.context(() => {

      const tl = gsap.timeline();

      /* Header — clip-path upar se neeche */
      tl.from(headerRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 1,
        ease: "expo.inOut",
      })

      /* Logo — clip-path left se right */
      .from(logoRef.current, {
        clipPath: "inset(0 100% 0 0)",
        duration: 1,
        ease: "expo.out",
      }, "-=0.4")

      /* Nav links — staggered clip-path left se right */
      .from(navRef.current?.querySelectorAll("a"), {
        clipPath: "inset(0 100% 0 0)",
        duration: 0.7,
        ease: "expo.out",
        stagger: 0.08,
      }, "-=0.6")

      /* Hamburger — clip-path left se right */
      .from(burgerRef.current, {
        clipPath: "inset(0 100% 0 0)",
        duration: 0.6,
        ease: "expo.out",
      }, "-=0.4");

    });

    return () => ctx.revert();
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header ref={headerRef} className={styles["header-wrapper"]}>
        <div className={styles["header-main"]}>

          <div className={styles["header-right"]}>
            <nav className={styles["logo"]} ref={logoRef}>
              <Link href="/" onClick={closeMenu}>HONEY</Link>
            </nav>
          </div>

          <div className={styles["header-left"]}>
            <nav ref={navRef}>
              <Link href="/about">ABOUT</Link>
              <Link href="/work/list">WORK</Link>
              <Link href="/press">PRESS</Link>
              <Link href="/journal/journal">JOURNAL</Link>
              <Link href="/moodboard">MOODBOARD</Link>
              <Link href="/universe">THE UNIVERSE</Link>
              <Link href="/contact-us">CONTACT</Link>
            </nav>
          </div>

          <button
            ref={burgerRef}
            className={`${styles["hamburger"]} ${menuOpen ? styles["open"] : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

        </div>
      </header>

      {/* ── FULLSCREEN OVERLAY ── */}
      <div className={`${styles["overlay"]} ${menuOpen ? styles["overlay--open"] : ""}`}>

        {/* Top bar */}
        <div className={styles["overlay-header"]}>
          <div className={styles["overlay-logo"]}>
            <div className={styles["overlay-logo-box"]}>
              <span>B</span>
            </div>
            <span className={styles["overlay-logo-text"]}>HONEY B. SINGH</span>
          </div>
          <button className={styles["overlay-close"]} onClick={closeMenu}>
            <span>MENU</span> <span>✕</span>
          </button>
        </div>

        {/* Nav links */}
        <nav className={styles["overlay-nav"]} onClick={closeMenu}>
          <Link href="/">HOME</Link>
          <Link href="/about">ABOUT</Link>
          <Link href="/work/list">WORK</Link>
          <Link href="/press">PRESS</Link>
          <Link href="/journal/journal">JOURNAL</Link>
          <Link href="/moodboard">MOODBOARD</Link>
          <Link href="/contact-us">CONTACT</Link>
          <Link href="/universe">HONEYVERSE</Link>
        </nav>

        {/* Bottom section */}
        <div className={styles["overlay-bottom"]}>
          <div className={styles["overlay-bottom-block"]}>
            <span className={styles["overlay-bottom-label"]}>Let's Talk</span>
            <a href="mailto:Hello@honeybsingh.com" className={styles["overlay-bottom-email"]}>
              Hello@honeybsingh.com
            </a>
          </div>
          <div className={styles["overlay-bottom-block"]}>
            <span className={styles["overlay-bottom-label"]}>Let's Connect</span>
            <div className={styles["overlay-social-links"]}>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">INSTAGRAM</a>
              <a href="https://x.com" target="_blank" rel="noreferrer">X</a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer">YOUTUBE</a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer">TIKTOK</a>
              <a href="https://tumblr.com" target="_blank" rel="noreferrer">TUMBLR</a>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Navbar;