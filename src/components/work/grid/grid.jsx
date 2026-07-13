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

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./grid.module.css";

gsap.registerPlugin(ScrollTrigger);

const gridData = [
  { id: 1, title: "Heer",                          date: "October 8, 2015",  duration: "13 min.",  video: "/videos/home/hero/hero.mp4"       },
  { id: 2, title: "I Am A Banana",                  date: "Feb , 2015",       duration: "13 min.",  video: "/videos/home/hero/work-ui-1.mp4"     },
  { id: 3, title: "Daily life of a Teenager",       date: "Jan 23, 2026",     duration: "10:41",    video: "/videos/home/hero/hero.mp4"  },
  { id: 4, title: "Vibrant Day at the Dead Parade", date: "Feb 04, 2026",     duration: "27:21",    video: "/videos/home/hero/work-ui-1.mp4"     },
  { id: 5, title: "Heer",                          date: "October 8, 2015",  duration: "13 min.",  video: "/videos/home/hero/hero.mp4"       },
  { id: 6, title: "I Am A Banana",                  date: "Feb , 2015",       duration: "13 min.",  video: "/videos/home/hero/work-ui-1.mp4"     },
  { id: 7, title: "Daily life of a Teenager",       date: "Jan 23, 2026",     duration: "10:41",    video: "/videos/home/hero/hero.mp4"  },
  { id: 8, title: "Vibrant Day at the Dead Parade", date: "Feb 04, 2026",     duration: "27:21",    video: "/videos/home/hero/work-ui-1.mp4"     },
];

const ITEMS_PER_PAGE = 4;

const Grid = function () {
  const videoRefs   = useRef({});
  const wrapperRefs = useRef({});
  const router      = useRouter();

  const sectionRef   = useRef(null);
  const h1Ref        = useRef(null);
  const descRef      = useRef(null);
  const toggleRef    = useRef(null);
  const gridRef      = useRef(null);
  const itemAnimRefs = useRef([]);
  const animatedIds  = useRef(new Set());

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const visibleItems = gridData.slice(0, visibleCount);
  const hasMore      = visibleCount < gridData.length;

  const handleLoadMore = () => setVisibleCount((prev) => prev + ITEMS_PER_PAGE);

  // ── Header animation — sirf ek baar, Journal wali exact pattern ──
  useEffect(() => {
    let ctx;

    const timer = setTimeout(() => {
      ctx = gsap.context(() => {

        // H1 — letter clip reveal
        const letters = h1Ref.current.innerText.split("");
        h1Ref.current.innerHTML = letters
          .map(l =>
            l === " "
              ? " "
              : `<span style="display:inline-block;overflow:hidden;line-height:1.15;vertical-align:bottom"><i style="display:inline-block;font-style:normal;will-change:transform">${l}</i></span>`
          )
          .join("");

        gsap.set(h1Ref.current.querySelectorAll("i"), { yPercent: 115 });
        gsap.to(h1Ref.current.querySelectorAll("i"), {
          yPercent: 0,
          duration: 2.2,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            scroller: document.documentElement,
            start: "top 75%",
            once: true,
          },
        });

        // Description — fade + y
        gsap.set(descRef.current, { opacity: 0, y: 18 });
        gsap.to(descRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            scroller: document.documentElement,
            start: "top 75%",
            once: true,
          },
        });

        // Toggle row — fade + y
        gsap.set(toggleRef.current, { opacity: 0, y: 14 });
        gsap.to(toggleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.6,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            scroller: document.documentElement,
            start: "top 75%",
            once: true,
          },
        });

      }, sectionRef);
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, []); // sirf mount pe

  // ── Card animations — Journal wali exact pattern ──
  useLayoutEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const newItems = visibleItems.filter((item) => !animatedIds.current.has(item.id));

    if (newItems.length === 0) return;

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();

      newItems.forEach((item, i) => {
        const el = itemAnimRefs.current[visibleItems.indexOf(item)];
        if (!el) return;

        animatedIds.current.add(item.id);

        if (isMobile) {
          gsap.set(el, { opacity: 0, y: 50 });
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              scroller: document.documentElement,
              start: "top 90%",
              once: true,
            },
            delay: i * 0.12,
          });
        } else {
          const parent = el.parentElement;
          if (parent) parent.style.perspective = "1200px";

          gsap.set(el, {
            opacity: 0,
            y: 55,
            rotateX: 16,
            transformOrigin: "bottom center",
            transformStyle: "preserve-3d",
          });

          gsap.to(el, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 2.0,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              scroller: document.documentElement,
              start: "top 90%",
              once: true,
            },
            delay: i % 2 === 0 ? 0.05 : 0.28,
            onComplete: () => {
              gsap.set(el, { clearProps: "rotateX,transformOrigin,transformStyle,willChange" });
            },
          });
        }
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [visibleCount]);

  // ── Mobile intersection observer ──
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
          if (ratio > maxRatio) { maxRatio = ratio; maxId = id; }
        });

        Object.keys(videoRefs.current).forEach((id) => {
          const video = videoRefs.current[id];
          if (!video) return;
          const vw = wrapperRefs.current[id]?.querySelector("[class*='video-wrapper']");
          if (id === maxId && maxRatio > 0.5) {
            video.play().catch(() => {});
            if (vw) vw.style.setProperty("--overlay-opacity", "0");
          } else {
            video.pause();
            if (vw) vw.style.setProperty("--overlay-opacity", "1");
          }
        });
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1.0] }
    );

    Object.values(wrapperRefs.current).forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [visibleCount]);

  const handleMouseEnter = (id) => {
    if (window.matchMedia("(max-width: 1066px)").matches) return;
    videoRefs.current[id]?.play().catch(() => {});
  };

  const handleMouseLeave = (id) => {
    if (window.matchMedia("(max-width: 1066px)").matches) return;
    videoRefs.current[id]?.pause();
  };

  const handleVideoClick = (item) => {
    const encodedUrl = encodeURIComponent(item.video);
    router.push(`/video-player?url=${encodedUrl}&title=${encodeURIComponent(item.title)}`);
  };

  return (
    <section ref={sectionRef} className={styles["grid-wrapper"]}>
      <div className={styles["grid-main"]}>

        {/* Header */}
        <div className={styles["grid-first-layer"]}>
          <div className="grid-first-layer-inner-1">
            <h1 ref={h1Ref}>WORK</h1>
          </div>
          <div className="grid-first-layer-inner-2">
            <p ref={descRef}>
              Sharing personal thoughts, work-in-progress ideas, and deep-dives
              about design. Learnings from a decade in the industry.
            </p>
          </div>
        </div>

        {/* Toggle */}
        <div ref={toggleRef} className={styles["grid-second-layer"]}>
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

        {/* Grid items */}
        <div
          ref={gridRef}
          className={styles["grid-third-layer"]}
          style={{ perspective: "1200px", overflow: "visible" }}
        >
          {visibleItems.map((item, index) => (
            <div
              className={styles["grid-items"]}
              key={item.id}
              data-id={String(item.id)}
              ref={(el) => {
                wrapperRefs.current[item.id] = el;
                itemAnimRefs.current[index]  = el;
              }}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={() => handleMouseLeave(item.id)}
              style={{ overflow: "visible" }}
            >
              <div
                className={styles["video-wrapper"]}
                onClick={() => handleVideoClick(item)}
              >
                <video
                  ref={(el) => (videoRefs.current[item.id] = el)}
                  muted loop playsInline preload="metadata"
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