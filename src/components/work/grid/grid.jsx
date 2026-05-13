// 'use client';

// import { useRouter } from "next/navigation";
// import { useEffect, useRef, useState } from "react";
// import styles from "./grid.module.css";

// const gridData = [
//   {
//     id: 1,
//     title: "Heer",
//     date: "October 8, 2015",
//     duration: "13 min.",
//     video: "/videos/home/hero/hero.mp4",
//   },
//   {
//     id: 2,
//     title: "I Am A Banana",
//     date: "Feb , 2015",
//     duration: "13 min.",
//     video: "/videos/home/hero/footer.mp4",
//   },
//   {
//     id: 3,
//     title: "Daily life of a Teenager",
//     date: "Jan 23, 2026",
//     duration: "10:41",
//     video: "/videos/home/hero/work-ui-1.mp4",
//   },
//   {
//     id: 4,
//     title: "Vibrant Day at the Dead Parade",
//     date: "Feb 04, 2026",
//     duration: "27:21",
//     video: "/videos/home/hero/footer.mp4",
//   },
//   {
//     id: 5,
//     title: "Heer",
//     date: "October 8, 2015",
//     duration: "13 min.",
//     video: "/videos/home/hero/hero.mp4",
//   },
//   {
//     id: 6,
//     title: "I Am A Banana",
//     date: "Feb , 2015",
//     duration: "13 min.",
//     video: "/videos/home/hero/footer.mp4",
//   },
//   {
//     id: 7,
//     title: "Daily life of a Teenager",
//     date: "Jan 23, 2026",
//     duration: "10:41",
//     video: "/videos/home/hero/work-ui-1.mp4",
//   },
//   {
//     id: 8,
//     title: "Vibrant Day at the Dead Parade",
//     date: "Feb 04, 2026",
//     duration: "27:21",
//     video: "/videos/home/hero/footer.mp4",
//   },
// ];

// const ITEMS_PER_PAGE = 4;

// const Grid = function () {
//   const videoRefs = useRef({});
//   const wrapperRefs = useRef({});
//   const router = useRouter();
//   const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

//   const visibleItems = gridData.slice(0, visibleCount);
//   const hasMore = visibleCount < gridData.length;

//   const handleLoadMore = () => {
//     setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
//   };

//   // ✅ Mobile IntersectionObserver — ek waqt ek hi video
//   useEffect(() => {
//     const isMobile = window.matchMedia("(max-width: 1066px)").matches;
//     if (!isMobile) return;

//     // ✅ Sabse zyada visible video track karo
//     const visibilityMap = {};

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           const id = entry.target.dataset.id;
//           visibilityMap[id] = entry.intersectionRatio;
//         });

//         // ✅ Sabse zyada visible wala find karo
//         let maxRatio = 0;
//         let maxId = null;
//         Object.entries(visibilityMap).forEach(([id, ratio]) => {
//           if (ratio > maxRatio) {
//             maxRatio = ratio;
//             maxId = id;
//           }
//         });

//         // ✅ Sirf maxId wala play, baaki pause
//         Object.keys(videoRefs.current).forEach((id) => {
//           const video = videoRefs.current[id];
//           if (!video) return;
//           if (id === maxId && maxRatio > 0.5) {
//             video.play().catch(() => {});
//           } else {
//             video.pause();
//           }
//         });
//       },
//       {
//         threshold: [0, 0.25, 0.5, 0.75, 1.0],
//       }
//     );

//     // ✅ Sab wrappers observe karo
//     Object.values(wrapperRefs.current).forEach((el) => {
//       if (el) observer.observe(el);
//     });

//     return () => observer.disconnect();
//   }, [visibleCount]); // ✅ load more hone pe re-run

//   const handleMouseEnter = (id) => {
//     const isMobile = window.matchMedia("(max-width: 1066px)").matches;
//     if (isMobile) return;
//     videoRefs.current[id]?.play().catch(() => {});
//   };

//   const handleMouseLeave = (id) => {
//     const isMobile = window.matchMedia("(max-width: 1066px)").matches;
//     if (isMobile) return;
//     videoRefs.current[id]?.pause();
//   };

//   const handleVideoClick = (item) => {
//     const encodedUrl = encodeURIComponent(item.video);
//     router.push(`/video-player?url=${encodedUrl}&title=${encodeURIComponent(item.title)}`);
//   };

//   return (
//     <section className={styles["grid-wrapper"]}>
//       <div className={styles["grid-main"]}>
//         <div className={styles["grid-first-layer"]}>
//           <div className="grid-first-layer-inner-1">
//             <h1>WORK</h1>
//           </div>
//           <div className="grid-first-layer-inner-2">
//             <p>
//               Sharing personal thoughts, work-in-progress ideas, and deep-dives
//               about design. Learnings from a decade in the industry.
//             </p>
//           </div>
//         </div>

//         <div className={styles["grid-second-layer"]}>
//           <div className={styles["grid-second-layer-grid"]}>
//             <span>Grid</span>
//           </div>
//           <div
//             className={styles["grid-second-layer-list"]}
//             onClick={() => router.push("/work/list")}
//           >
//             <span>List</span>
//           </div>
//         </div>

//         <div className={styles["grid-third-layer"]}>
//           {visibleItems.map((item) => (
//             <div
//               className={styles["grid-items"]}
//               key={item.id}
//               data-id={String(item.id)}
//               ref={(el) => (wrapperRefs.current[item.id] = el)}
//               onMouseEnter={() => handleMouseEnter(item.id)}
//               onMouseLeave={() => handleMouseLeave(item.id)}
//             >
//               <div
//                 className={styles["video-wrapper"]}
//                 onClick={() => handleVideoClick(item)}
//               >
//                 <video
//                   ref={(el) => (videoRefs.current[item.id] = el)}
//                   muted
//                   loop
//                   playsInline
//                   preload="metadata"
//                 >
//                   <source src={item.video} type="video/mp4" />
//                 </video>
//               </div>

//               <div className={styles["title"]}>
//                 <h2>{item.title}</h2>
//               </div>

//               <div className={styles["normal-text"]}>
//                 <p>{item.date}</p>
//                 <span></span>
//                 <p>{item.duration}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {hasMore && (
//           <div className={styles["load-more-wrapper"]}>
//             <button className={styles["load-more-btn"]} onClick={handleLoadMore}>
//               <span>Load More</span>
//               <span className={styles["btn-icon"]}>+</span>
//             </button>
//           </div>
//         )}

//       </div>
//     </section>
//   );
// };

// export default Grid;

// ================================new-changes=====================================
'use client';

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./grid.module.css";

const gridData = [
  {
    id: 1,
    title: "Heer",
    date: "October 8, 2015",
    duration: "13 min.",
    video: "/videos/home/hero/hero.mp4",
  },
  {
    id: 2,
    title: "I Am A Banana",
    date: "Feb , 2015",
    duration: "13 min.",
    video: "/videos/home/hero/footer.mp4",
  },
  {
    id: 3,
    title: "Daily life of a Teenager",
    date: "Jan 23, 2026",
    duration: "10:41",
    video: "/videos/home/hero/work-ui-1.mp4",
  },
  {
    id: 4,
    title: "Vibrant Day at the Dead Parade",
    date: "Feb 04, 2026",
    duration: "27:21",
    video: "/videos/home/hero/footer.mp4",
  },
  {
    id: 5,
    title: "Heer",
    date: "October 8, 2015",
    duration: "13 min.",
    video: "/videos/home/hero/hero.mp4",
  },
  {
    id: 6,
    title: "I Am A Banana",
    date: "Feb , 2015",
    duration: "13 min.",
    video: "/videos/home/hero/footer.mp4",
  },
  {
    id: 7,
    title: "Daily life of a Teenager",
    date: "Jan 23, 2026",
    duration: "10:41",
    video: "/videos/home/hero/work-ui-1.mp4",
  },
  {
    id: 8,
    title: "Vibrant Day at the Dead Parade",
    date: "Feb 04, 2026",
    duration: "27:21",
    video: "/videos/home/hero/footer.mp4",
  },
];

const ITEMS_PER_PAGE = 4;

const Grid = function () {
  const videoRefs = useRef({});
  const wrapperRefs = useRef({});
  const router = useRouter();
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const visibleItems = gridData.slice(0, visibleCount);
  const hasMore = visibleCount < gridData.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 1066px)").matches;
    if (!isMobile) return;

    const visibilityMap = {};

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.dataset.id;
          visibilityMap[id] = entry.intersectionRatio;
        });

        let maxRatio = 0;
        let maxId = null;
        Object.entries(visibilityMap).forEach(([id, ratio]) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            maxId = id;
          }
        });

        Object.keys(videoRefs.current).forEach((id) => {
          const video = videoRefs.current[id];
          if (!video) return;

          // ✅ video-wrapper element find karo
          const vw = wrapperRefs.current[id]?.querySelector("[class*='video-wrapper']");

          if (id === maxId && maxRatio > 0.5) {
            video.play().catch(() => {});
            // ✅ overlay hato
            if (vw) vw.style.setProperty("--overlay-opacity", "0");
          } else {
            video.pause();
            // ✅ overlay wapas lao
            if (vw) vw.style.setProperty("--overlay-opacity", "1");
          }
        });
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1.0],
      }
    );

    Object.values(wrapperRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [visibleCount]);

  const handleMouseEnter = (id) => {
    const isMobile = window.matchMedia("(max-width: 1066px)").matches;
    if (isMobile) return;
    videoRefs.current[id]?.play().catch(() => {});
  };

  const handleMouseLeave = (id) => {
    const isMobile = window.matchMedia("(max-width: 1066px)").matches;
    if (isMobile) return;
    videoRefs.current[id]?.pause();
  };

  const handleVideoClick = (item) => {
    const encodedUrl = encodeURIComponent(item.video);
    router.push(`/video-player?url=${encodedUrl}&title=${encodeURIComponent(item.title)}`);
  };

  return (
    <section className={styles["grid-wrapper"]}>
      <div className={styles["grid-main"]}>
        <div className={styles["grid-first-layer"]}>
          <div className="grid-first-layer-inner-1">
            <h1>WORK</h1>
          </div>
          <div className="grid-first-layer-inner-2">
            <p>
              Sharing personal thoughts, work-in-progress ideas, and deep-dives
              about design. Learnings from a decade in the industry.
            </p>
          </div>
        </div>

        <div className={styles["grid-second-layer"]}>
          <div className={styles["grid-second-layer-grid"]}>
            <span>Grid</span>
          </div>
          <div
            className={styles["grid-second-layer-list"]}
            onClick={() => router.push("/work/list")}
          >
            <span>List</span>
          </div>
        </div>

        <div className={styles["grid-third-layer"]}>
          {visibleItems.map((item) => (
            <div
              className={styles["grid-items"]}
              key={item.id}
              data-id={String(item.id)}
              ref={(el) => (wrapperRefs.current[item.id] = el)}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={() => handleMouseLeave(item.id)}
            >
              <div
                className={styles["video-wrapper"]}
                onClick={() => handleVideoClick(item)}
              >
                <video
                  ref={(el) => (videoRefs.current[item.id] = el)}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source src={item.video} type="video/mp4" />
                </video>
              </div>

              <div className={styles["title"]}>
                <h2>{item.title}</h2>
              </div>

              <div className={styles["normal-text"]}>
                <p>{item.date}</p>
                <span></span>
                <p>{item.duration}</p>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className={styles["load-more-wrapper"]}>
            <button className={styles["load-more-btn"]} onClick={handleLoadMore}>
              <span>Load More</span>
              <span className={styles["btn-icon"]}>+</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default Grid;