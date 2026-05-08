// import Grid from "@/components/work/grid/grid";
// import styles from "./page.module.css";

// const Work = function () {
//   return (
//     <div className={styles.workPage}>
//       <Grid />
//     </div>
//   );
// };

// export default Work;
// ===============================================-================
import Grid from "@/components/work/grid/grid";
import ParticleBackground from "./Particlebackground";
import styles from "./page.module.css";

const Work = function () {
  return (
    <div className={styles["particles"]}>
      <ParticleBackground />
        <Grid />
    </div>
  );
};

export default Work;