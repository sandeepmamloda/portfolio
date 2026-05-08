import styles from "./list.module.css";

const Work = function () {
  return (
    <section className={styles["work-wrapper"]}>
      <div className={styles["work-main"]}>

        {/* Background Video */}
        <div className={styles["work-image-wrapper"]}>
          <video autoPlay muted loop playsInline>
            <source src="/videos/work/work.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Content */}
        <div className={styles["text-wrapper"]}>

          <h1>WORK</h1>

          <div className={styles["list-wrapper"]}>

            {/* Toggle Buttons */}
            <div className={styles["toggle-buttons"]}>

              <div className={styles["grid"]}>
                <span>Grid</span>
              </div>

              <div className={styles["list"]}>
                <span>List</span>
              </div>

            </div>

            {/* List Main */}
            <div className={styles["list-main"]}>

              <div className={styles["list-head"]}>
                <span>Name</span>
                <span>Type</span>
                <span>Duration</span>
              </div>

              <div className={styles["list-items"]}>
                <h3>Amplifying the Tuner</h3>
                <p>Commercial</p>
                <span>15:30</span>
              </div>

              <div className={styles["list-items"]}>
                <h3>Everyone has somewhere to be</h3>
                <p>Social</p>
                <span>17:21</span>
              </div>

              <div className={styles["list-items"]}>
                <h3>Daily life of a Teenager</h3>
                <p>Social</p>
                <span>10:41</span>
              </div>

              <div className={styles["list-items"]}>
                <h3>Vibrant Day at the Dead Parade</h3>
                <p>Promotional</p>
                <span>27:21</span>
              </div>

              <div className={styles["list-items"]}>
                <h3>Beyond the Game</h3>
                <p>Commercial</p>
                <span>21:10</span>
              </div>

              <div className={styles["list-items"]}>
                <h3>The Price of Silence</h3>
                <p>Social</p>
                <span>18:20</span>
              </div>

              <div className={styles["list-items"]}>
                <h3>Fragments of Reality</h3>
                <p>Social</p>
                <span>11:40</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Work;