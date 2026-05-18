import Herouniverse from "@/components/universe/herouniverse/herouniverse";
import Measuringvalues from "@/components/universe/measuringvalues/measuringvalues";
import styles from "./page.module.css";
import ParticleBackground from "./Particlebackground";
import Team from "@/components/universe/team/team";
import Belief from "@/components/universe/belief/belief";
import Latest from "@/components/universe/latest/latest";
const Universe=function(){
    return (
        <div className={styles["particles"]}>
          <ParticleBackground />
          <Herouniverse/>
          <Measuringvalues/>
          <Team/>
          <Belief/>
          <Latest/>
        </div>
    );
}
export default Universe;