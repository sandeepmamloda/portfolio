import styles from "./hero.module.css";

const Hero = function() {
  return (
    <>
      <section className={styles["home-section-wrapper"]}>
        <div className={styles["home-section-video"]}>
          <video autoPlay muted loop playsInline>
            <source src="/videos/home/hero/hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div className={styles["home-section-top-text-wrapper"]}>
          <div className={styles["top-content"]}>
            <h1>
              <span>HONEY</span>
              <span>B.</span>
              <span>SINGH</span>
            </h1>
          </div>
          <div className={styles["bottom-content"]}>
            <div className={styles["content"]}>
                <p>WRITER</p>
                <p>FILM-MAKER/DIRECTOR</p>
            </div>
            <div className={styles["content"]}>
                <p>BASED IN</p>
                <p>ABU DHABI, UAE</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;