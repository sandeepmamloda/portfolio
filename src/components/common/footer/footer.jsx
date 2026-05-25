"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import styles from "./footer.module.css";

gsap.registerPlugin(ScrollTrigger);

const VideoText = ({ src, text, letterSpacing = -5}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const video = document.createElement("video");

    video.src = src;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();

    let animId;

    const getLetterSpacing = () => {
      return window.innerWidth <= 840 ? 0 : letterSpacing;
    };

    const getTotalWidth = (txt) => {
      const ls = getLetterSpacing();
      let total = 0;
      for (let i = 0; i < txt.length; i++) {
        total += ctx.measureText(txt[i]).width + ls;
      }
      return total - ls;
    };

    const drawTextWithSpacing = (txt, x, y) => {
      const ls = getLetterSpacing();
      let currentX = x;
      for (let i = 0; i < txt.length; i++) {
        ctx.fillText(txt[i], currentX, y);
        currentX += ctx.measureText(txt[i]).width + ls;
      }
    };

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.clearRect(0, 0, w, h);

      let fontSize = h * 0.9;
      ctx.font = `900 ${fontSize}px 'Interblack'`;

      while (getTotalWidth(text) > w * 0.98) {
        fontSize -= 2;
        ctx.font = `900 ${fontSize}px 'Interblack'`;
      }

      ctx.textBaseline = "middle";
      ctx.textAlign = "left";

      ctx.fillStyle = "#fff";
      drawTextWithSpacing(text, 0, h / 2);

      ctx.globalCompositeOperation = "source-in";
      ctx.drawImage(video, 0, 0, w, h);

      ctx.globalCompositeOperation = "source-over";

      animId = requestAnimationFrame(draw);
    };

    const start = async () => {
      try {
        await video.play();
        document.fonts
          .load(`900 ${canvas.height * 0.9}px "Interblack"`)
          .then(() => { draw(); });
      } catch (err) {
        console.log(err);
      }
    };

    start();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animId);
      video.pause();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [src, text, letterSpacing]);

  return (
    <a href="/" className={styles["name-link"]}>
      <canvas ref={canvasRef} className={styles["name-canvas"]} />
    </a>
  );
};

const Footer = function () {
  const pathname     = usePathname();
  const footerRef    = useRef(null);
  const taglineRef   = useRef(null);
  const canvasWrap   = useRef(null);
  const sitemapRef   = useRef(null);
  const linksRef     = useRef(null);
  const bottomRef    = useRef(null);

  useEffect(() => {

    ScrollTrigger.getAll().forEach(t => t.kill());

    /* mobile check */
    const isMobile = window.innerWidth <= 768;

    const ctx = gsap.context(() => {

      /* ── Tagline ── */
      gsap.from(taglineRef.current, {
        clipPath: "inset(0 100% 0 0)",
        duration: isMobile ? 1.2 : 2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: taglineRef.current,
          start: "top 95%",
          once: true,
        },
      });

      /* ── Canvas (HONEY B. SINGH) ── */
      gsap.from(canvasWrap.current, {
        clipPath: "inset(0 100% 0 0)",
        duration: isMobile ? 1.6 : 2.4,
        ease: "expo.out",
        scrollTrigger: {
          trigger: canvasWrap.current,
          start: "top 95%",
          once: true,
        },
        delay: 0.3,
      });

      /* ── Sitemap col ── */
      gsap.from(sitemapRef.current, {
        clipPath: isMobile ? "inset(0 100% 0 0)" : "inset(0 0 100% 0)",
        duration: isMobile ? 1.2 : 2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sitemapRef.current,
          start: "top 95%",
          once: true,
        },
        delay: isMobile ? 0 : 0.2,
      });

      /* ── Sitemap links — staggered ── */
      const sitemapLinks = sitemapRef.current?.querySelectorAll("li");
      gsap.from(sitemapLinks, {
        clipPath: "inset(0 100% 0 0)",
        duration: isMobile ? 0.9 : 1.2,
        ease: "expo.out",
        stagger: isMobile ? 0.06 : 0.1,
        scrollTrigger: {
          trigger: sitemapRef.current,
          start: "top 92%",
          once: true,
        },
        delay: isMobile ? 0.2 : 0.5,
      });

      /* ── Links col ── */
      gsap.from(linksRef.current, {
        clipPath: isMobile ? "inset(0 100% 0 0)" : "inset(0 0 100% 0)",
        duration: isMobile ? 1.2 : 2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: linksRef.current,
          start: "top 95%",
          once: true,
        },
        delay: isMobile ? 0 : 0.3,
      });

      /* ── Links items — staggered ── */
      const extLinks = linksRef.current?.querySelectorAll("li");
      gsap.from(extLinks, {
        clipPath: "inset(0 100% 0 0)",
        duration: isMobile ? 0.9 : 1.2,
        ease: "expo.out",
        stagger: isMobile ? 0.06 : 0.1,
        scrollTrigger: {
          trigger: linksRef.current,
          start: "top 92%",
          once: true,
        },
        delay: isMobile ? 0.2 : 0.5,
      });

      /* ── Bottom bar ── */
      gsap.from(bottomRef.current, {
        clipPath: "inset(0 100% 0 0)",
        duration: isMobile ? 1.2 : 2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: bottomRef.current,
          start: "top 98%",
          once: true,
        },
        delay: 0.3,
      });

    }, footerRef);

    return () => ctx.revert();

  }, [pathname]);

  return (
    <>
      <footer className={styles.footer} ref={footerRef}>
        <div className={styles["main"]}>
          <div className={styles["top-content"]}>

            {/* Left */}
            <div className={styles["left-col"]}>
              <p className={styles.tagline} ref={taglineRef}>
                Filmmaker &amp; Writer
              </p>
              <div ref={canvasWrap}>
                <VideoText
                  src="/videos/footer/footer.mp4"
                  text="HONEY B. SINGH"
                  letterSpacing={-5}
                />
              </div>
            </div>

            {/* Sitemap */}
            <div className={styles["sitemap-col"]} ref={sitemapRef}>
              <h3 className={styles["col-title"]}>Sitemap</h3>
              <ul className={styles["site-links"]}>
                <li><a href="/about">About</a></li>
                <li><a href="/journal/journal">Journal</a></li>
                <li><a href="/work/list">Work</a></li>
                <li><a href="/moodboard">Moodboard</a></li>
                <li><a href="/press">Press</a></li>
                <li><a href="/universe">THE UNIVERSE</a></li>
                <li></li>
                <li><a href="/contact-us">Contact</a></li>
              </ul>
            </div>

            {/* Links */}
            <div className={styles["links-col"]} ref={linksRef}>
              <h3 className={styles["col-title"]}>Links</h3>
              <ul className={styles["ext-links"]}>
                <li>
                  <a href="https://theuniverse.com" target="_blank" rel="noreferrer">
                    The Universe
                    <em className={styles.arrow}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.4141 0.999965H10.8994V9.48525M10.8994 0.999965L0.999884 10.8995" stroke="#FF0099" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </em>
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer">
                    Instagram
                    <em className={styles.arrow}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.4141 0.999965H10.8994V9.48525M10.8994 0.999965L0.999884 10.8995" stroke="#FF0099" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </em>
                  </a>
                </li>
                <li>
                  <a href="https://tumblr.com" target="_blank" rel="noreferrer">
                    Tumblr
                    <em className={styles.arrow}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.4141 0.999965H10.8994V9.48525M10.8994 0.999965L0.999884 10.8995" stroke="#FF0099" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </em>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer">
                    Twitter
                    <em className={styles.arrow}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.4141 0.999965H10.8994V9.48525M10.8994 0.999965L0.999884 10.8995" stroke="#FF0099" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </em>
                  </a>
                </li>
              </ul>
            </div>

          </div>

          <div className={styles["bottom-content"]} ref={bottomRef}>
            <span className={styles.copyright}>
              © Honey B. Singh All Rights Reserved
            </span>
            <a href="/privacy-policy" className={styles.privacy}>
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;