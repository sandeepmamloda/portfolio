import Articlesindividual from "@/components/articles/articles-individual/articles-individual";
import ParticleBackground from "./Particlebackground";
import styles from "./page.module.css";
const About=function(){
    return (
        
    <div className={styles["particles"]}>
        <ParticleBackground/>
        <Articlesindividual/>
    </div>
    );
}
export default About;




