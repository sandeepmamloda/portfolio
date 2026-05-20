'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import styles from "./video-player.module.css";

// ── Default info data (fallback) ─────────────────────────────────
const DEFAULT_INFO = {
  director: "John Doe",
  year: "2024",
  duration: "13 min.",
  category: "Commercial",
  description: `A visually striking short film exploring the intersection of
light and shadow. Filmed across three cities over seven days,
this piece captures raw human emotion through a cinematic lens.
Every frame was crafted with intention — from the golden-hour
sequences in the desert to the stark, minimalist interiors that
anchor the narrative.`,
};

// ── Reusable Info Panel ──────────────────────────────────────────
const InfoPanel = ({ onClose, isContained = false, data = DEFAULT_INFO }) => (
  <div
    className={isContained ? styles["info-panel-contained"] : styles["info-panel"]}
    onClick={onClose}
  >
    <div className={styles["info-content"]} onClick={(e) => e.stopPropagation()}>
      <div className={styles["info-header"]}>
        <h2 className={styles["info-heading"]}>INFO</h2>
        <button className={styles["info-close"]} onClick={onClose}>✕</button>
      </div>
      <div className={styles["info-body"]}>
        {data.director   && <p>Director: {data.director}</p>}
        {data.year       && <p>Year: {data.year}</p>}
        {data.duration   && <p>Duration: {data.duration}</p>}
        {data.category   && <p>Category: {data.category}</p>}
        {data.description && <p>{data.description}</p>}
      </div>
    </div>
  </div>
);

// ── Full Video Player Page ───────────────────────────────────────
const VideoPlayerContent = function () {
  const searchParams = useSearchParams();
  const videoUrl   = searchParams.get("url");
  const title      = searchParams.get("title");

  const infoData = {
    director:    searchParams.get("director")    || DEFAULT_INFO.director,
    year:        searchParams.get("year")        || DEFAULT_INFO.year,
    duration:    searchParams.get("duration")    || DEFAULT_INFO.duration,
    category:    searchParams.get("category")    || DEFAULT_INFO.category,
    description: searchParams.get("description") || DEFAULT_INFO.description,
  };

  const decodedUrl   = videoUrl ? decodeURIComponent(videoUrl) : null;
  const decodedTitle = title    ? decodeURIComponent(title)    : "";

  const videoRef      = useRef(null);
  const innerRef      = useRef(null);
  const titleTimerRef = useRef(null);

  const [isPlaying,    setIsPlaying]    = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile,     setIsMobile]     = useState(false);
  const [titleVisible, setTitleVisible] = useState(true);
  const [currentTime,  setCurrentTime]  = useState("00:00");
  const [duration,     setDuration]     = useState("00:00");
  const [isMuted,      setIsMuted]      = useState(false);
  const [progress,     setProgress]     = useState(0);
  const [isInfoOpen,   setIsInfoOpen]   = useState(false);

  // Hide global header when info panel is open
  useEffect(() => {
    if (isInfoOpen) {
      document.body.classList.add("info-panel-open");
    } else {
      document.body.classList.remove("info-panel-open");
    }
    return () => document.body.classList.remove("info-panel-open");
  }, [isInfoOpen]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = isMuted;
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      setCurrentTime(formatTime(video.currentTime));
      if (video.duration) setProgress((video.currentTime / video.duration) * 100);
    };
    const onLoadedMetadata   = () => setDuration(formatTime(video.duration));
    const onFullscreenChange = () => {
      const entering = !!document.fullscreenElement;
      setIsFullscreen(entering);
      if (entering && isMobile) {
        setTitleVisible(true);
        clearTimeout(titleTimerRef.current);
        titleTimerRef.current = setTimeout(() => setTitleVisible(false), 3000);
      }
    };

    video.addEventListener("timeupdate",          onTimeUpdate);
    video.addEventListener("loadedmetadata",      onLoadedMetadata);
    document.addEventListener("fullscreenchange", onFullscreenChange);

    return () => {
      video.removeEventListener("timeupdate",          onTimeUpdate);
      video.removeEventListener("loadedmetadata",      onLoadedMetadata);
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      clearTimeout(titleTimerRef.current);
    };
  }, [isMobile]);

  const handlePlay           = () => { if (videoRef.current) { videoRef.current.play();  setIsPlaying(true);  } };
  const handlePause          = () => { if (videoRef.current) { videoRef.current.pause(); setIsPlaying(false); } };
  const handleFullscreen     = () => { if (innerRef.current) innerRef.current.requestFullscreen(); };
  const handleExitFullscreen = () => { if (document.fullscreenElement) document.exitFullscreen(); };

  const handleMuteToggle = () => {
    const video = videoRef.current;
    if (!video) return;
    const newMuted = !isMuted;
    video.muted = newMuted;
    setIsMuted(newMuted);
  };

  const handleCenterClick = () => {
    if (window.innerWidth <= 1066) {
      if (!isFullscreen && innerRef.current) innerRef.current.requestFullscreen();
      isPlaying ? handlePause() : handlePlay();
    } else {
      isPlaying ? handlePause() : handlePlay();
    }
  };

  if (!decodedUrl) return <p className={styles["error"]}>Video nahi mila.</p>;

  return (
    <section className={styles["vp-wrapper"]}>

      <div
        className={`${styles["vp-inner"]} ${isFullscreen ? styles["vp-fs-active"] : ""}`}
        ref={innerRef}
        onClick={handleCenterClick}
      >
        {isInfoOpen && (
          <InfoPanel
            onClose={() => setIsInfoOpen(false)}
            isContained={false}
            data={infoData}
          />
        )}

        <video
          ref={videoRef}
          src={decodedUrl}
          playsInline
          loop
          muted={false}
          className={styles["vp-video"]}
          suppressHydrationWarning
        >
          <source src={decodedUrl} type="video/mp4" />
        </video>

        <div className={styles["vp-overlay"]} />

        {/* FULLSCREEN MOBILE */}
        {isFullscreen && isMobile && !isInfoOpen && (
          <>
            <div
              className={`${styles["vp-fs-mobile-title"]} ${!titleVisible ? styles["hidden"] : ""}`}
              onClick={(e) => e.stopPropagation()}
            >
              <h1>{decodedTitle}</h1>
              <button
                className={styles["vp-info-btn"]}
                onClick={(e) => { e.stopPropagation(); setIsInfoOpen(true); }}
              >INFO</button>
            </div>

            <div
              className={styles["vp-fs-mobile-progress"]}
              onClick={(e) => {
                e.stopPropagation();
                const rect  = e.currentTarget.getBoundingClientRect();
                const ratio = (e.clientX - rect.left) / rect.width;
                if (videoRef.current) videoRef.current.currentTime = ratio * videoRef.current.duration;
              }}
            >
              <div className={styles["vp-fs-progress-fill"]} style={{ width: `${progress}%` }} />
            </div>

            <div className={styles["vp-fs-mobile-controls"]} onClick={(e) => e.stopPropagation()}>
              <button className={styles["vp-fs-play-btn"]} onClick={(e) => { e.stopPropagation(); isPlaying ? handlePause() : handlePlay(); }}>
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              <button className={styles["vp-fs-mute"]} onClick={(e) => { e.stopPropagation(); handleMuteToggle(); }}>
                {isMuted ? <MuteOffIcon /> : <MuteOnIcon />}
              </button>
              <span className={styles["vp-fs-time"]}>{currentTime} / {duration}</span>
            </div>

            <button className={styles["vp-back-arrow"]} onClick={(e) => { e.stopPropagation(); handleExitFullscreen(); }}>
              <BackArrowIcon />
            </button>
          </>
        )}

        {/* NORMAL MODE */}
        {!isFullscreen && !isInfoOpen && (
          <div className={styles["vp-title"]}>
            <h1>{decodedTitle}</h1>
            <button className={styles["vp-info-btn"]} onClick={(e) => { e.stopPropagation(); setIsInfoOpen(true); }}>
              INFO
            </button>
          </div>
        )}

        {isFullscreen && !isMobile && !isInfoOpen && (
          <button className={styles["vp-close"]} onClick={(e) => { e.stopPropagation(); handleExitFullscreen(); }}>
            CLOSE
          </button>
        )}

        {!isFullscreen && !isInfoOpen && (
          <div className={styles["vp-center-play"]}>
            <span>{isPlaying ? "PAUSE" : "PLAY"}</span>
          </div>
        )}

        {!isFullscreen && !isInfoOpen && (
          <div className={styles["vp-controls"]} onClick={(e) => e.stopPropagation()}>
            <div className={styles["vp-controls-left"]}>
              <button onClick={handlePlay}>[PLAY]</button>
              <button onClick={handlePause}>[PAUSE]</button>
              <button className={styles["vp-btn-fullscreen"]} onClick={handleFullscreen}>[FULLSCREEN]</button>
            </div>
            <div className={styles["vp-controls-right"]}>
              <Link href="/work/list" className={styles["vp-more-link"]}>MORE PROJECTS</Link>
            </div>
          </div>
        )}

        {isFullscreen && !isMobile && !isInfoOpen && (
          <>
            <div
              className={styles["vp-fs-progress"]}
              onClick={(e) => {
                e.stopPropagation();
                const rect  = e.currentTarget.getBoundingClientRect();
                const ratio = (e.clientX - rect.left) / rect.width;
                if (videoRef.current) videoRef.current.currentTime = ratio * videoRef.current.duration;
              }}
            >
              <div className={styles["vp-fs-progress-fill"]} style={{ width: `${progress}%` }} />
            </div>

            <div className={styles["vp-fs-controls"]} onClick={(e) => e.stopPropagation()}>
              <div className={styles["vp-fs-left"]}>
                <button className={styles["vp-fs-play-btn"]} onClick={(e) => { e.stopPropagation(); isPlaying ? handlePause() : handlePlay(); }}>
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
                <button className={styles["vp-fs-mute"]} onClick={(e) => { e.stopPropagation(); handleMuteToggle(); }}>
                  {isMuted ? <MuteOffIcon /> : <MuteOnIcon />}
                </button>
                <span className={styles["vp-fs-time"]}>{currentTime} / {duration}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

// ── Video Preview Card ───────────────────────────────────────────
export const VideoPreviewCard = function ({ videoUrl, title, info }) {
  const videoRef = useRef(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isPlaying,  setIsPlaying]  = useState(false);

  const resolvedInfo = { ...DEFAULT_INFO, ...info };

  // Hide global header when info panel is open
  useEffect(() => {
    if (isInfoOpen) {
      document.body.classList.add("info-panel-open");
    } else {
      document.body.classList.remove("info-panel-open");
    }
    return () => document.body.classList.remove("info-panel-open");
  }, [isInfoOpen]);

  const handleTogglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) { video.pause(); setIsPlaying(false); }
    else           { video.play();  setIsPlaying(true);  }
  };

  return (
    <div className={styles["preview-card"]}>
      {isInfoOpen && (
        <InfoPanel
          onClose={() => setIsInfoOpen(false)}
          isContained={true}
          data={resolvedInfo}
        />
      )}

      <video
        ref={videoRef}
        src={videoUrl}
        playsInline
        loop
        muted
        className={styles["preview-video"]}
        onClick={handleTogglePlay}
      />

      <div className={styles["preview-overlay"]} />

      {!isInfoOpen && (
        <div className={styles["preview-title"]}>
          <h3>{title}</h3>
          <button
            className={styles["vp-info-btn"]}
            onClick={(e) => { e.stopPropagation(); setIsInfoOpen(true); }}
          >
            INFO
          </button>
        </div>
      )}
    </div>
  );
};

// ── SVG Icons ────────────────────────────────────────────────────
const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 18 21" fill="none">
    <path d="M0 1.36819C0 1.13569 0.0554998 0.907685 0.1605 0.703685C0.5055 0.0436855 1.2855 -0.194815 1.905 0.172685L17.34 9.30469C17.55 9.42918 17.7225 9.61368 17.838 9.83718C18.183 10.4972 17.958 11.3297 17.34 11.6957L1.905 20.8277C1.71717 20.941 1.50187 21.0007 1.2825 21.0002C0.5745 21.0002 0 20.3882 0 19.6337V1.36819Z" fill="white"/>
  </svg>
);
const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
    <rect x="0" y="0" width="4" height="18" rx="1" fill="white"/>
    <rect x="8" y="0" width="4" height="18" rx="1" fill="white"/>
  </svg>
);
const MuteOnIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
  </svg>
);
const MuteOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <line x1="23" y1="9" x2="17" y2="15"/>
    <line x1="17" y1="9" x2="23" y2="15"/>
  </svg>
);
const BackArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);

// ── Default Export ───────────────────────────────────────────────
const VideoPlayer = function () {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <VideoPlayerContent />
    </Suspense>
  );
};

export default VideoPlayer;