import Hero from "@/components/home/hero/hero";
import ParticleBackground from "./Particlebackground";
import styles from "./page-copy.module.css";
const Home=function(){
  return(
    <div className={styles["particles"]}>
        <ParticleBackground/>
        <Hero/>
    </div>
  );
}
export default Home;
