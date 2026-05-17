import Herouniverse from "@/components/universe/herouniverse/herouniverse";
import Measuringvalues from "@/components/universe/measuringvalues/measuringvalues";
import styles from "./page.module.css";
import ParticleBackground from "./Particlebackground";
const Universe=function(){
    return (
        <div className={styles["particles"]}>
          <ParticleBackground />
          <Herouniverse/>
          <Measuringvalues/>
        </div>
    );
}
export default Universe;