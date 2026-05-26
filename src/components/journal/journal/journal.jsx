// 'use client';

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import styles from "./journal.module.css";

// const journalData = [
//   {
//     id: 1,
//     title: "Balancing Creativity and Deadlines",
//     date: "Feb 04, 2026",
//     duration: "15 Minutes",
//     image: "/images/journal/Balancing-Creativity-and-Deadlines.jpg",
//   },
//   {
//     id: 2,
//     title: "Navigating the complexity of simplicity",
//     date: "Jan 23, 2026",
//     duration: "12 Minutes",
//     image: "/images/journal/Navigating-the-complexity-of-simplicity.jpg",
//   },
//   {
//     id: 3,
//     title: "The joy of slow living",
//     date: "Feb 04, 2026",
//     duration: "15 Minutes",
//     image: "/images/journal/The-joy-of-slow-living.jpg",
//   },
//   {
//     id: 4,
//     title: "The Power of Networking for Enterprise",
//     date: "Jan 23, 2026",
//     duration: "12 Minutes",
//     image: "/images/journal/The-Power-of-Networking-for-Enterprise.jpg",
//   },
//   {
//     id: 5,
//     title: "The Art of Mindful Creation",
//     date: "Mar 10, 2026",
//     duration: "8 Minutes",
//     image: "/images/journal/Balancing-Creativity-and-Deadlines.jpg",
//   },
//   {
//     id: 6,
//     title: "Finding Flow in Chaos",
//     date: "Apr 01, 2026",
//     duration: "11 Minutes",
//     image: "/images/journal/The-joy-of-slow-living.jpg",
//   },
// ];

// const ITEMS_PER_PAGE = 4;

// const Journal = function () {
//   const router = useRouter();
//   const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

//   const handleItemClick = (item) => {
//     router.push(`/journal/journal-individual?title=${encodeURIComponent(item.title)}&image=${encodeURIComponent(item.image)}&date=${encodeURIComponent(item.date)}&duration=${encodeURIComponent(item.duration)}`);
//   };

//   const handleLoadMore = () => {
//     setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
//   };

//   const visibleItems = journalData.slice(0, visibleCount);
//   const hasMore = visibleCount < journalData.length;

//   return (
//     <section className={styles["grid-wrapper"]}>
//       <div className={styles["grid-main"]}>

//         {/* First Layer */}
//         <div className={styles["grid-first-layer"]}>
//           <div>
//             <h1>JOURNAL</h1>
//           </div>
//           <div>
//             <p>
//               Sharing personal thoughts, work-in-progress ideas, and deep-dives about design. Learnings from a decade in the industry.
//             </p>
//           </div>
//         </div>

//         {/* Grid Items */}
//         <div className={styles["grid-third-layer"]}>
//           {visibleItems.map((item) => (
//             <div
//               className={styles["grid-items"]}
//               key={item.id}
//               onClick={() => handleItemClick(item)}
//             >
//               <div className={styles["image-wrapper"]}>
//                 <Image
//                   src={item.image}
//                   alt={item.title}
//                   fill
//                   style={{ objectFit: "cover" }}
//                 />
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

//         {/* Load More Button */}
//         {hasMore && (
//           <div className={styles["load-more-wrapper"]}>
//             <button
//               className={styles["load-more-btn"]}
//               onClick={handleLoadMore}
//             >
//               <span className={styles["btn-text"]}>Load More</span>
//               <span className={styles["btn-icon"]}>+</span>
//             </button>
//           </div>
//         )}

//       </div>
//     </section>
//   );
// };

// export default Journal;


// ========================================================================================================
'use client';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./journal.module.css";

gsap.registerPlugin(ScrollTrigger);

const journalData = [
  {
    id: 1,
    title: "Balancing Creativity and Deadlines",
    date: "Feb 04, 2026",
    duration: "15 Minutes",
    image: "/images/journal/Balancing-Creativity-and-Deadlines.jpg",
    subtitle: "How creative professionals can thrive under pressure without losing their spark.",
    content: [
      {
        heading: "Introduction",
        body: "In today's fast-paced creative industry, professionals constantly face the tension between imaginative freedom and the hard constraints of deadlines. This balance is not just a logistical challenge — it is a fundamental part of the creative experience. The pressure of time can either stifle creativity or sharpen it, depending on how it is managed.\n\nFor many designers, writers, and artists, deadlines create a paradox. On one hand, they provide structure and purpose. On the other, they can trigger anxiety that blocks the very creativity they are meant to channel. Understanding this dynamic is the first step toward mastering it.",
      },
      {
        heading: "The Psychology of Creative Pressure",
        body: "Research in cognitive psychology suggests that moderate levels of pressure can enhance focus and output. This is often referred to as the Yerkes-Dodson principle — performance improves with arousal up to a point, after which it begins to decline. For creative work, this means that some deadline pressure is not just acceptable, it is beneficial.\n\nHowever, when deadlines become overwhelming, the brain shifts into survival mode. The prefrontal cortex — responsible for creative thinking and complex problem solving — becomes less active. This is why tight, unrealistic deadlines often produce mediocre work. The key is finding the zone of productive tension.",
      },
      {
        heading: "Practical Strategies for Balance",
        body: "The most effective creative professionals develop systems that protect both the quality of their work and their ability to deliver on time. Time-blocking is one such strategy — dedicating specific hours to deep creative work, free from interruptions, emails, or meetings. This preserves the mental bandwidth needed for genuine creative thinking.\n\nAnother powerful approach is working in iterations. Rather than waiting for the perfect idea before beginning, creative professionals who embrace rough drafts and early prototypes consistently produce stronger final work. The act of making something — anything — breaks the paralysis that often comes with a blank page and a looming deadline.",
      },
      {
        heading: "Building a Sustainable Creative Practice",
        body: "Long-term creative health requires more than just managing individual projects. It requires building habits and environments that sustain both productivity and inspiration over time. This means regular periods of rest, exposure to new ideas outside your field, and honest reflection on what is and is not working in your process.\n\nOrganizations that understand this invest in their creative teams by building reasonable timelines, celebrating process as much as outcome, and creating psychological safety for experimentation. When creatives feel supported rather than pressured, they consistently produce their best work.",
      },
      {
        heading: "Conclusion",
        body: "Balancing creativity and deadlines is not about choosing one over the other. It is about developing the awareness, tools, and habits that allow both to coexist and reinforce each other. The most successful creative professionals are not those who never feel pressure — they are those who have learned to work with it, channel it, and ultimately transform it into some of their most meaningful work.",
      },
    ],
  },
  {
    id: 2,
    title: "Navigating the complexity of simplicity",
    date: "Jan 23, 2026",
    duration: "12 Minutes",
    image: "/images/journal/Navigating-the-complexity-of-simplicity.jpg",
    subtitle: "Why the pursuit of simplicity is one of the most demanding creative challenges.",
    content: [
      {
        heading: "Introduction",
        body: "Simplicity is often misunderstood as the absence of complexity. In reality, true simplicity is one of the most difficult things to achieve in design, communication, or any creative endeavor. It requires a deep understanding of the subject, the courage to remove what feels important, and the skill to make what remains feel effortless.\n\nThe history of design is filled with examples of work that appears simple but conceals enormous complexity beneath its surface. Apple's early product interfaces, Dieter Rams' industrial designs, and the typography of great editorial designers all share this quality — they feel obvious in retrospect, but required immense effort and judgment to create.",
      },
      {
        heading: "Why Simplicity Is Hard",
        body: "The default tendency in most creative work is to add. When something feels incomplete, the instinct is to add more — more features, more explanation, more visual elements. Simplicity demands the opposite instinct: to question what can be removed without losing meaning.\n\nThis is cognitively demanding. Every element we remove requires us to trust that what remains is strong enough to carry the work. That trust is difficult to develop, especially in collaborative environments where stakeholders often equate quantity with quality. Learning to defend restraint is as important as developing the instinct for it.",
      },
      {
        heading: "The Process of Simplification",
        body: "Achieving simplicity is not a single decision — it is an iterative process of refinement. The best designers and writers often produce their most complex work first, then systematically strip it back. This approach ensures that nothing essential is lost in the pursuit of clarity.\n\nEditing is therefore one of the most undervalued creative skills. Whether editing a paragraph, a user interface, or a product feature set, the ability to identify and remove the non-essential is what separates good work from great work. It requires both analytical thinking and strong aesthetic judgment.",
      },
      {
        heading: "Simplicity in Communication",
        body: "In written and verbal communication, simplicity is equally valuable and equally difficult. The ability to explain a complex idea clearly — without oversimplifying or losing nuance — is a rare skill. It requires a thorough understanding of the subject and a precise command of language.\n\nThe best communicators are those who have done the hard work of understanding something deeply before attempting to explain it simply. As Einstein is often quoted, if you cannot explain something simply, you do not understand it well enough.",
      },
      {
        heading: "Conclusion",
        body: "The pursuit of simplicity is not a shortcut — it is one of the longest and most demanding paths in creative work. But the results justify the effort. Work that achieves genuine simplicity is more accessible, more memorable, and more enduring than work that tries to impress through complexity. In a world saturated with information and visual noise, simplicity is not just an aesthetic choice. It is a form of respect for the audience.",
      },
    ],
  },
  {
    id: 3,
    title: "The joy of slow living",
    date: "Feb 04, 2026",
    duration: "15 Minutes",
    image: "/images/journal/The-joy-of-slow-living.jpg",
    subtitle: "Rediscovering peace and purpose in a world that never stops moving.",
    content: [
      {
        heading: "Introduction",
        body: "We live in a culture that celebrates speed. Faster decisions, faster delivery, faster growth. The idea that slowing down could be a form of progress feels almost counterintuitive in this environment. Yet a growing number of people are discovering that the relentless pursuit of speed comes at a significant cost — to their wellbeing, their relationships, and the quality of their work.\n\nSlow living is not about doing less. It is about doing things with more intention, more presence, and more care. It is a deliberate response to a culture of constant acceleration, and it offers something that speed rarely can: genuine satisfaction.",
      },
      {
        heading: "The Cost of Constant Speed",
        body: "The psychological and physical costs of living at high speed are well documented. Chronic stress, reduced attention spans, shallow relationships, and a persistent sense of dissatisfaction are among the most common consequences. Many people describe moving through their lives so quickly that they rarely experience the moments they are working so hard to create.\n\nThis is the central paradox of modern busyness: we optimize our lives for efficiency in order to have more time, but the very act of optimizing consumes the time and presence we were trying to create. The faster we move, the more the texture of daily life disappears.",
      },
      {
        heading: "What Slow Living Actually Looks Like",
        body: "Slow living manifests differently for different people. For some, it means cooking meals from scratch and eating without screens. For others, it means walking instead of driving, reading physical books, or spending evenings without a schedule. The common thread is intentionality — making conscious choices about how time and attention are spent.\n\nIt does not require moving to the countryside or abandoning ambition. Many people who practice slow living are deeply engaged with demanding careers and full social lives. The difference is that they have developed a relationship with time that is deliberate rather than reactive.",
      },
      {
        heading: "Daily Rituals That Anchor the Day",
        body: "One of the most practical expressions of slow living is the cultivation of daily rituals. A morning walk, a quiet cup of tea before the day begins, an evening without devices — these small practices create pockets of stillness that anchor the rest of the day. They are not productivity hacks. They are moments of genuine presence.\n\nResearch in positive psychology consistently shows that people who maintain regular rituals report higher levels of wellbeing and a greater sense of meaning in their daily lives. Rituals create structure, but more importantly, they create the experience of time passing in a way that feels meaningful rather than wasted.",
      },
      {
        heading: "Conclusion",
        body: "Slow living is ultimately about the quality of attention we bring to our lives. It is a recognition that not everything needs to be optimized, that some things become more valuable when they take longer, and that presence is one of the rarest and most precious things we can offer — to ourselves and to the people around us. In choosing to slow down, we are not falling behind. We are, in a very real sense, finally arriving.",
      },
    ],
  },
  {
    id: 4,
    title: "The Power of Networking for Enterprise",
    date: "Jan 23, 2026",
    duration: "12 Minutes",
    image: "/images/journal/The-Power-of-Networking-for-Enterprise.jpg",
    subtitle: "Building meaningful connections that drive collaboration, innovation, and long-term business growth.",
    content: [
      {
        heading: "Introduction",
        body: "In today's highly competitive business landscape, enterprises cannot rely solely on internal resources to grow and innovate. Success increasingly depends on the strength of relationships an organization builds both inside and outside its ecosystem. Networking plays a critical role in creating these connections.\n\nFor enterprises, networking is not just about meeting new people or exchanging contacts. It is about building a strategic web of relationships that enables knowledge sharing, collaboration, new opportunities, and long-term partnerships. Organizations that invest in strong networks often gain a significant advantage in innovation, market reach, and resilience.",
      },
      {
        heading: "What Networking Means for Enterprises",
        body: "Enterprise networking goes beyond casual professional interaction. It involves building structured relationships with stakeholders such as industry peers, clients, partners, investors, suppliers, and even competitors.\n\nThese relationships create channels through which ideas, insights, and opportunities can flow. When enterprises actively participate in industry communities, conferences, and partnerships, they position themselves within a larger ecosystem that supports growth and collaboration.\n\nIn essence, networking transforms an enterprise from a standalone organization into a connected participant within a dynamic business environment.",
      },
      {
        heading: "Driving Innovation Through Connections",
        body: "One of the most powerful outcomes of networking is innovation. When enterprises connect with professionals from diverse industries and backgrounds, they gain exposure to new ideas, technologies, and perspectives.\n\nThese interactions often spark creative thinking and help organizations discover solutions they might not have developed internally. Strategic collaborations, joint ventures, and cross-industry partnerships frequently emerge from strong professional networks.\n\nNetworking therefore acts as a catalyst that helps enterprises stay ahead in rapidly evolving markets.",
      },
      {
        heading: "Expanding Business Opportunities",
        body: "Networking opens doors to opportunities that might otherwise remain inaccessible. Through trusted relationships, enterprises gain access to new clients, partnerships, and market insights.\n\nReferrals and recommendations often originate from well-established networks. A single introduction can lead to a valuable business deal, strategic alliance, or entry into a new market.\n\nBy nurturing relationships over time, enterprises create a reliable pipeline of opportunities that support sustainable growth.",
      },
      {
        heading: "Strengthening Organizational Reputation",
        body: "While external relationships are important, internal networking within the organization is equally valuable. Encouraging employees across departments to connect and collaborate helps break down silos and improves communication.\n\nInternal networking promotes knowledge sharing, faster problem solving, and stronger teamwork. It also fosters a culture of collaboration where employees feel empowered to contribute ideas and work together toward common goals.",
      },
      {
        heading: "Conclusion",
        body: "The power of networking lies in its ability to connect people, ideas, and opportunities. For enterprises, strong networks create pathways for innovation, collaboration, and long-term growth.\n\nOrganizations that prioritize building meaningful relationships both internally and externally position themselves for greater resilience and success. In a world where connections often determine opportunities, networking is not simply a professional skill. It is a strategic asset that fuels the future of enterprise growth.",
      },
    ],
  },
  {
    id: 5,
    title: "The Art of Mindful Creation",
    date: "Mar 10, 2026",
    duration: "8 Minutes",
    image: "/images/journal/Balancing-Creativity-and-Deadlines.jpg",
    subtitle: "How mindfulness transforms the creative process from struggle to flow.",
    content: [
      {
        heading: "Introduction",
        body: "Creativity and mindfulness might seem like separate practices — one active and generative, the other still and receptive. But the most productive creative states are deeply mindful ones. When we create with full presence, without judgment or distraction, our work takes on a quality that is difficult to achieve any other way.\n\nMindful creation is not a mystical concept. It is a practical approach to the creative process that draws on the principles of attention training to produce better work with less resistance and more genuine engagement.",
      },
      {
        heading: "The Mindful Creative State",
        body: "Psychologist Mihaly Csikszentmihalyi's research on flow states describes the optimal creative experience as one of complete absorption in a task — time disappears, self-consciousness fades, and the work feels effortless. This state is not random. It is consistently associated with a specific set of conditions: clear goals, immediate feedback, and a balance between challenge and skill.\n\nMindfulness practice trains the same qualities that flow requires: sustained attention, reduced self-judgment, and the ability to return focus when the mind wanders. Regular meditators consistently report that their creative work becomes more fluid and less forced over time.",
      },
      {
        heading: "Removing the Inner Critic",
        body: "One of the greatest obstacles to creative work is the inner critic — the voice that judges every idea before it has a chance to develop. This critical voice is not entirely unhelpful; it plays an important role in the editing and refinement phase of creative work. But when it activates during the generative phase, it stops creativity before it begins.\n\nMindfulness helps by creating a different relationship with this inner voice. Rather than believing every critical thought, practitioners learn to observe them without being controlled by them. This creates the psychological space needed for ideas to emerge and develop before being evaluated.",
      },
      {
        heading: "Practical Mindfulness for Creatives",
        body: "Incorporating mindfulness into a creative practice does not require long meditation sessions. Simple practices such as taking three conscious breaths before beginning work, spending five minutes in silence before a creative session, or practicing single-tasking rather than multitasking can significantly shift the quality of creative attention.\n\nPhysical environments also matter. Spaces that are calm, organized, and free from unnecessary stimulation support the focused awareness that creative work requires. Many creative professionals report that small environmental changes — removing their phone from the workspace, working near natural light, or using consistent ambient sound — dramatically improve their ability to enter and sustain a focused creative state.",
      },
      {
        heading: "Conclusion",
        body: "The art of mindful creation is ultimately the art of being fully present with the work in front of you. It is the practice of showing up for the creative process with curiosity rather than judgment, with patience rather than urgency, and with the trust that genuine attention is the most powerful creative tool available. When we create mindfully, we do not just produce better work — we experience the process itself as meaningful.",
      },
    ],
  },
  {
    id: 6,
    title: "Finding Flow in Chaos",
    date: "Apr 01, 2026",
    duration: "11 Minutes",
    image: "/images/journal/The-joy-of-slow-living.jpg",
    subtitle: "Strategies for staying focused and productive when everything feels overwhelming.",
    content: [
      {
        heading: "Introduction",
        body: "Chaos is an unavoidable feature of creative and professional life. Projects change direction, priorities shift, unexpected problems emerge, and the carefully constructed plans we rely on dissolve without warning. The question is not how to eliminate chaos — that is not possible. The question is how to find and maintain a state of productive flow within it.\n\nPeople who consistently perform well under chaotic conditions are not simply more resilient by nature. They have developed specific mental models, habits, and practices that allow them to orient themselves quickly, focus on what matters, and continue moving forward even when the environment around them is unstable.",
      },
      {
        heading: "What Networking Means for Enterprises",
        body: `Enterprise networking goes beyond casual professional interaction. It involves building structured relationships with stakeholders such as industry peers, clients, partners, investors, suppliers, and even competitors.

These relationships create channels through which ideas, insights, and opportunities can flow. When enterprises actively participate in industry communities, conferences, and partnerships, they position themselves within a larger ecosystem that supports growth and collaboration.

In essence, networking transforms an enterprise from a standalone organization into a connected participant within a dynamic business environment.`,
      },
      {
        heading: "Driving Innovation Through Connections",
        body: `One of the most powerful outcomes of networking is innovation. When enterprises connect with professionals from diverse industries and backgrounds, they gain exposure to new ideas, technologies, and perspectives.

These interactions often spark creative thinking and help organizations discover solutions they might not have developed internally. Strategic collaborations, joint ventures, and cross-industry partnerships frequently emerge from strong professional networks.

Networking therefore acts as a catalyst that helps enterprises stay ahead in rapidly evolving markets.`,
      },
      {
        heading: "Expanding Business Opportunities",
        body: `Networking opens doors to opportunities that might otherwise remain inaccessible. Through trusted relationships, enterprises gain access to new clients, partnerships, and market insights.

Referrals and recommendations often originate from well-established networks. A single introduction can lead to a valuable business deal, strategic alliance, or entry into a new market.

By nurturing relationships over time, enterprises create a reliable pipeline of opportunities that support sustainable growth.`,
      },
      {
        heading: "Strengthening Organizational Reputation",
        body: `While external relationships are important, internal networking within the organization is equally valuable. Encouraging employees across departments to connect and collaborate helps break down silos and improves communication.

Internal networking promotes knowledge sharing, faster problem solving, and stronger teamwork. It also fosters a culture of collaboration where employees feel empowered to contribute ideas and work together toward common goals.`,
      },
      {
        heading: "Conclusion",
        body: `The power of networking lies in its ability to connect people, ideas, and opportunities. For enterprises, strong networks create pathways for innovation, collaboration, and long-term growth. Organizations that prioritize building meaningful relationships both internally and externally position themselves for greater resilience and success. In a world where connections often determine opportunities, networking is not simply a professional skill. It is a strategic asset that fuels the future of enterprise growth.`,
      },
    ],
  },
];

const ITEMS_PER_PAGE = 4;

const Journal = function () {
  const router = useRouter();
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const sectionRef   = useRef(null);
  const h1Ref        = useRef(null);
  const descRef      = useRef(null);
  const itemAnimRefs = useRef({});
  const animatedIds  = useRef(new Set());

  const visibleItems = journalData.slice(0, visibleCount);
  const hasMore      = visibleCount < journalData.length;

  const handleItemClick = (item) => {
    router.push(
      `/journal/journal-individual?title=${encodeURIComponent(item.title)}&image=${encodeURIComponent(item.image)}&date=${encodeURIComponent(item.date)}&duration=${encodeURIComponent(item.duration)}&subtitle=${encodeURIComponent(item.subtitle)}&content=${encodeURIComponent(JSON.stringify(item.content))}`
    );
  };

  const handleLoadMore = () => setVisibleCount((prev) => prev + ITEMS_PER_PAGE);

  // ─── Hero text animation ─────────────────────────────────────────────────────
  useEffect(() => {
    let ctx;

    const timer = setTimeout(() => {
      ctx = gsap.context(() => {

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

      }, sectionRef);
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, []);

  // ─── Card scroll animations ──────────────────────────────────────────────────
  useLayoutEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const newItems = visibleItems.filter((item) => !animatedIds.current.has(item.id));

    if (newItems.length === 0) return;

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();

      newItems.forEach((item, i) => {
        const el = itemAnimRefs.current[item.id];
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

  return (
    <section ref={sectionRef} className={styles["grid-wrapper"]}>
      <div className={styles["grid-main"]}>

        <div className={styles["grid-first-layer"]}>
          <div>
            <h1 ref={h1Ref}>JOURNAL</h1>
          </div>
          <div>
            <p ref={descRef}>
              Sharing personal thoughts, work-in-progress ideas, and deep-dives about design. Learnings from a decade in the industry.
            </p>
          </div>
        </div>

        <div
          className={styles["grid-third-layer"]}
          style={{ perspective: "1200px", overflow: "visible" }}
        >
          {visibleItems.map((item) => (
            <div
              className={styles["grid-items"]}
              key={item.id}
              ref={(el) => (itemAnimRefs.current[item.id] = el)}
              onClick={() => handleItemClick(item)}
              style={{ overflow: "visible" }}
            >
              <div className={styles["image-wrapper"]}>
                <Image src={item.image} alt={item.title} fill style={{ objectFit: "cover" }} />
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
              <span className={styles["btn-text"]}>Load More</span>
              <span className={styles["btn-icon"]}>+</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default Journal;