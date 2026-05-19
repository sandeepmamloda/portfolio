import Articles from "@/components/articles/articles/articles";
import ParticleBackground from "./Particlebackground";
import styles from "./page.module.css";
const Page=function(){
    return (
        
    <div className={styles["particles"]}>
        <ParticleBackground/>
        <Articles/>
    </div>
    );
}
export default Page;




