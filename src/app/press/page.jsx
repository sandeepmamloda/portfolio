import Pressz from "@/components/press/press";
import ParticleBackground from "./Particlebackground";
import styles from "./page.module.css";
const Press=function(){
    return (
        <div className={styles["particles"]}>
          <ParticleBackground />
          <Pressz/>
        </div>
    );
}
export default Press;