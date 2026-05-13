// import List from "@/components/work/list/list"
// const Work=function(){
//     return (
//         <>
//           <List/>
//         </>
//     );
// }
// export default Work;
// ===============================================-================
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