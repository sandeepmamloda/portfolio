import List from "@/components/work/list/list";
import ParticleBackground from "./Particlebackground";
import styles from "./page.module.css";

const Work = function () {
  return (
    <div className={styles["particles"]}>
        <ParticleBackground />
        <List />
    </div>
  );
};

export default Work;