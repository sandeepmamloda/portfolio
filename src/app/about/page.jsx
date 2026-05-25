import Heroabout from "@/components/about/heroabout/heroabout";
import Introduction from "@/components/about/introduction/introduction";
import ParticleBackground from "./Particlebackground";
import styles from "./page.module.css";
const About=function(){
    return (
        
    <div className={styles["particles"]}>
        <ParticleBackground/>
        <Heroabout/>
        <Introduction/>
    </div>
    );
}
export default About;




