// import VideoPlayer from "@/components/video-player/video-player";

// const Page = function () {
//   return (
//     <>
//       <VideoPlayer />
//     </>
//   );
// };

// export default Page;

import VideoPlayer from "@/components/video-player/video-player";
import ParticleBackground from "./Particlebackground";
import styles from "./page.module.css";

const Page = function () {
  return (
    <div className={styles["particles"]}>
      <ParticleBackground />
      <VideoPlayer/>
    </div>
  );
};

export default Page;