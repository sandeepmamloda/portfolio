"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./navbar.module.css";

const HamburgerMenu = function () {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Button — header-main ke andar */}
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

      {/* ✅ Dropdown — header-main ke bahar render hoga via portal */}
      {typeof document !== "undefined" &&
        (() => {
          const { createPortal } = require("react-dom");
          const headerEl = document.querySelector(`.${styles["header-wrapper"]}`);
          return headerEl
            ? createPortal(
                <div className={`${styles["mobile-menu"]} ${menuOpen ? styles["mobile-menu--open"] : ""}`}>
                  <nav onClick={closeMenu}>
                    <Link href="/about">ABOUT</Link>
                    <Link href="/work">WORK</Link>
                    <Link href="/press">PRESS</Link>
                    <Link href="/journal">JOURNAL</Link>
                    <Link href="/moodboard">MOODBOARD</Link>
                    <Link href="/universe">THE UNIVERSE</Link>
                    <Link href="/contact">CONTACT</Link>
                  </nav>
                </div>,
                headerEl
              )
            : null;
        })()}
    </>
  );
};

export default HamburgerMenu;