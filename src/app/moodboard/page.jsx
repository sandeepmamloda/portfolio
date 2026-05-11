import Moodboard from "@/components/moodboard/moodboard";
import ParticleBackground from "./Particlebackground";
import styles from "./page.module.css";

const Page = function () {
  return (
    <div className={styles["particles"]}>
      <ParticleBackground />
      <Moodboard/>
    </div>
  );
};

export default Page;