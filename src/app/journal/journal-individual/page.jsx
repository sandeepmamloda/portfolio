import Journal from "@/components/journal/journal-individual/journal-individual";
import ParticleBackground from "./Particlebackground";
import styles from "./page.module.css";

const JournalPage = function () {
  return (
    <div className={styles["particles"]}>
      <ParticleBackground />
      <Journal />
    </div>
  );
};

export default JournalPage;