"use client";

import { useEffect, useRef } from "react";
import styles from "./footer.module.css";

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

    // ✅ Responsive letterSpacing
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
          .then(() => {
            draw();
          });
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

  return <canvas ref={canvasRef} className={styles["name-canvas"]} />;
};

const Footer = function () {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles["main"]}>
          <div className={styles["top-content"]}>

            {/* Left */}
            <div className={styles["left-col"]}>
              <p className={styles.tagline}>Filmmaker &amp; Writer</p>

              <VideoText
                src="/videos/footer/footer.mp4"
                text="HONEY B. SINGH"
                letterSpacing={-5} 
              />
            </div>

            {/* Sitemap */}
            <div className={styles["sitemap-col"]}>
              <h3 className={styles["col-title"]}>Sitemap</h3>

              <ul className={styles["site-links"]}>
                <li><a href="/about">About</a></li>
                <li><a href="/journal">Journal</a></li>
                <li><a href="/work">Work</a></li>
                <li><a href="/moodboard">Moodboard</a></li>
                <li><a href="/press">Press</a></li>
                <li><a href="/the-universe">THE UNIVERSE</a></li>
                <li></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>

            {/* Links */}
            <div className={styles["links-col"]}>
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

          <div className={styles["bottom-content"]}>
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