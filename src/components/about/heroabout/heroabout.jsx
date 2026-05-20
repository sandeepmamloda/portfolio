"use client"
import styles from "./heroabout.module.css";

const ImageBox = ({ children, imageSrc }) => {
  return (
    <div className={styles["img-wrapper"]} style={{ position: "relative" }}>
      <img
        src={imageSrc}
        alt="hero"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "1.5rem",
          display: "block",
        }}
      />
      {children}
    </div>
  );
};

const Heroabout = function () {
  return (
    <section className={styles["heroabout-wrapper"]}>
      <div className={styles["hero-video-wrapper"]}>
        <video autoPlay muted loop playsInline>
          <source src="/videos/about/about.mp4" type="video/mp4" />
        </video>
      </div>
      <div className={styles["hero-text-wrapper"]}>
        <ImageBox imageSrc="/images/normal.png">
          <div className={styles["hero-text-left-1"]}>
            <h1>WHERE SCRIPTS BECOME SIGHT</h1>
          </div>
          <div className={styles["hero-text-left-2"]}>
            <p>
              I tell stories through both the lens and the page where visuals
              meet emotion and moments become cinema.
            </p>
          </div>
          <div className={styles["hero-text-right-bottom"]}>
            <p>FILM-MAKER &amp; WRITER</p>
          </div>
        </ImageBox>
      </div>
    </section>
  );
};

export default Heroabout;