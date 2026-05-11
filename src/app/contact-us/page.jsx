// import Contact from "@/components/contact-us/contact-us";
// const Contactz=function(){
//     return (
//         <>
//           <Contact/>
//         </>
//     );
// }
// export default Contactz;

import Contact from "@/components/contact-us/contact-us";
import ParticleBackground from "./Particlebackground";
import styles from "./page.module.css";

const Contactz = function () {
  return (
    <div className={styles["particles"]}>
      <ParticleBackground />
      <Contact/>
    </div>
  );
};

export default Contactz;