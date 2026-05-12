"use client";
import { useState, useEffect } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";

const Navbar = function () {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1066) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles["header-wrapper"]}>

      <div className={styles["header-main"]}>

        <div className={styles["header-right"]}>
          <nav className={styles["logo"]}>
            <Link href="/" onClick={closeMenu}>Portfolio</Link>
          </nav>
        </div>

        <div className={styles["header-left"]}>
          <nav>
            <Link href="/about">ABOUT</Link>
            <Link href="/work">WORK</Link>
            <Link href="/press">PRESS</Link>
            <Link href="/journal">JOURNAL</Link>
            <Link href="/moodboard">MOODBOARD</Link>
            <Link href="/universe">THE UNIVERSE</Link>
            <Link href="/contact">CONTACT</Link>
          </nav>
        </div>

        <button
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

      {/* ✅ menuOpen false ho tab render hi mat karo */}
      {menuOpen && (
        <div className={`${styles["mobile-menu"]} ${styles["mobile-menu--open"]}`}>
          <nav onClick={closeMenu}>
            <Link href="/about">ABOUT</Link>
            <Link href="/work">WORK</Link>
            <Link href="/press">PRESS</Link>
            <Link href="/journal">JOURNAL</Link>
            <Link href="/moodboard">MOODBOARD</Link>
            <Link href="/universe">THE UNIVERSE</Link>
            <Link href="/contact">CONTACT</Link>
          </nav>
        </div>
      )}

    </header>
  );
};

export default Navbar;