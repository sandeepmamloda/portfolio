'use client';

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import styles from "./video-player.module.css";

const VideoPlayerContent = function () {
  const searchParams = useSearchParams();
  const videoUrl = searchParams.get("url");
  const title = searchParams.get("title");

  const decodedUrl = videoUrl ? decodeURIComponent(videoUrl) : null;
  const decodedTitle = title ? decodeURIComponent(title) : "";

  const videoRef = useRef(null);
  const innerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [titleVisible, setTitleVisible] = useState(true);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("00:00");
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const titleTimerRef = useRef(null);

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
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      setCurrentTime(formatTime(video.currentTime));
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };
    const onLoadedMetadata = () => setDuration(formatTime(video.duration));
    const onFullscreenChange = () => {
      const entering = !!document.fullscreenElement;
      setIsFullscreen(entering);
      if (entering && isMobile) {
        setTitleVisible(true);
        clearTimeout(titleTimerRef.current);
        titleTimerRef.current = setTimeout(() => setTitleVisible(false), 3000);
      }
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    document.addEventListener("fullscreenchange", onFullscreenChange);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      clearTimeout(titleTimerRef.current);
    };
  }, [isMobile]);

  const handlePlay = () => {
    if (videoRef.current) { videoRef.current.play(); setIsPlaying(true); }
  };

  const handlePause = () => {
    if (videoRef.current) { videoRef.current.pause(); setIsPlaying(false); }
  };

  const handleFullscreen = () => {
    if (innerRef.current) innerRef.current.requestFullscreen();
  };

  const handleExitFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleCenterClick = () => {
    if (window.innerWidth <= 1066) {
      if (!isFullscreen && innerRef.current) innerRef.current.requestFullscreen();
      isPlaying ? handlePause() : handlePlay();
    } else {
      isPlaying ? handlePause() : handlePlay();
    }
  };

  if (!decodedUrl) {
    return <p className={styles["error"]}>Video nahi mila.</p>;
  }

  return (
    <section className={styles["vp-wrapper"]}>
      <div
        className={`${styles["vp-inner"]} ${isFullscreen ? styles["vp-fs-active"] : ""}`}
        ref={innerRef}
        onClick={handleCenterClick}
      >
        {/* Video */}
        <video
          ref={videoRef}
          src={decodedUrl}
          playsInline
          loop
          className={styles["vp-video"]}
          suppressHydrationWarning
        >
          <source src={decodedUrl} type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className={styles["vp-overlay"]} />

        {/* ── FULLSCREEN MOBILE — title fade + controls ── */}
        {isFullscreen && isMobile && (
          <>
            {/* Title — fades out after 3s */}
            <div
              className={`${styles["vp-fs-mobile-title"]} ${!titleVisible ? styles["hidden"] : ""}`}
              onClick={(e) => e.stopPropagation()}
            >
              <h1>{decodedTitle}</h1>
              <button className={styles["vp-info-btn"]}>INFO</button>
            </div>

            {/* Progress Bar */}
            <div
              className={styles["vp-fs-mobile-progress"]}
              onClick={(e) => {
                e.stopPropagation();
                const rect = e.currentTarget.getBoundingClientRect();
                const ratio = (e.clientX - rect.left) / rect.width;
                if (videoRef.current) videoRef.current.currentTime = ratio * videoRef.current.duration;
              }}
            >
              <div className={styles["vp-fs-progress-fill"]} style={{ width: `${progress}%` }} />
            </div>

            {/* Bottom controls */}
            <div
              className={styles["vp-fs-mobile-controls"]}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles["vp-fs-play-btn"]}
                onClick={(e) => { e.stopPropagation(); isPlaying ? handlePause() : handlePlay(); }}
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
                    <rect x="0" y="0" width="4" height="18" rx="1" fill="white"/>
                    <rect x="8" y="0" width="4" height="18" rx="1" fill="white"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 18 21" fill="none">
                    <path d="M0 1.36819C0 1.13569 0.0554998 0.907685 0.1605 0.703685C0.5055 0.0436855 1.2855 -0.194815 1.905 0.172685L17.34 9.30469C17.55 9.42918 17.7225 9.61368 17.838 9.83718C18.183 10.4972 17.958 11.3297 17.34 11.6957L1.905 20.8277C1.71717 20.941 1.50187 21.0007 1.2825 21.0002C0.5745 21.0002 0 20.3882 0 19.6337V1.36819Z" fill="white"/>
                  </svg>
                )}
              </button>

              <button
                className={styles["vp-fs-mute"]}
                onClick={(e) => { e.stopPropagation(); handleMuteToggle(); }}
              >
                {isMuted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                    <line x1="23" y1="9" x2="17" y2="15"/>
                    <line x1="17" y1="9" x2="23" y2="15"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                  </svg>
                )}
              </button>

              <span className={styles["vp-fs-time"]}>{currentTime} / {duration}</span>
            </div>
          </>
        )}

        {/* ── NORMAL MODE — title + INFO ── */}
        {!isFullscreen && (
          <div className={styles["vp-title"]}>
            <h1>{decodedTitle}</h1>
            <button
              className={styles["vp-info-btn"]}
              onClick={(e) => e.stopPropagation()}
            >
              INFO
            </button>
          </div>
        )}

        {/* CLOSE button — fullscreen desktop (left aligned) */}
        {isFullscreen && !isMobile && (
          <button
            className={styles["vp-close"]}
            onClick={(e) => { e.stopPropagation(); handleExitFullscreen(); }}
          >
            CLOSE
          </button>
        )}

        {/* Back arrow — fullscreen mobile */}
        {isFullscreen && isMobile && (
          <button
            className={styles["vp-back-arrow"]}
            onClick={(e) => { e.stopPropagation(); handleExitFullscreen(); }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
        )}

        {/* Back arrow — normal mode mobile only */}
        {!isFullscreen && isMobile && (
          <button
            className={styles["vp-back-arrow"]}
            onClick={(e) => { e.stopPropagation(); window.history.back(); }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
        )}

        {/* Center Play/Pause — normal mode only */}
        {!isFullscreen && (
          <div className={styles["vp-center-play"]}>
            <span>{isPlaying ? "PAUSE" : "PLAY"}</span>
          </div>
        )}

        {/* Bottom Controls — normal mode */}
        {!isFullscreen && (
          <div
            className={styles["vp-controls"]}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles["vp-controls-left"]}>
              <button onClick={handlePlay}>[PLAY]</button>
              <button onClick={handlePause}>[PAUSE]</button>
              <button className={styles["vp-btn-fullscreen"]} onClick={handleFullscreen}>[FULLSCREEN]</button>
            </div>
            <div className={styles["vp-controls-right"]}>
              <span>MORE PROJECTS</span>
            </div>
          </div>
        )}

        {/* Fullscreen — Progress Bar + Controls (desktop) */}
        {isFullscreen && !isMobile && (
          <>
            <div
              className={styles["vp-fs-progress"]}
              onClick={(e) => {
                e.stopPropagation();
                const rect = e.currentTarget.getBoundingClientRect();
                const ratio = (e.clientX - rect.left) / rect.width;
                if (videoRef.current) videoRef.current.currentTime = ratio * videoRef.current.duration;
              }}
            >
              <div className={styles["vp-fs-progress-fill"]} style={{ width: `${progress}%` }} />
            </div>

            <div className={styles["vp-fs-controls"]} onClick={(e) => e.stopPropagation()}>
              <div className={styles["vp-fs-left"]}>
                <button
                  className={styles["vp-fs-play-btn"]}
                  onClick={(e) => { e.stopPropagation(); isPlaying ? handlePause() : handlePlay(); }}
                >
                  {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
                      <rect x="0" y="0" width="4" height="18" rx="1" fill="white"/>
                      <rect x="8" y="0" width="4" height="18" rx="1" fill="white"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 18 21" fill="none">
                      <path d="M0 1.36819C0 1.13569 0.0554998 0.907685 0.1605 0.703685C0.5055 0.0436855 1.2855 -0.194815 1.905 0.172685L17.34 9.30469C17.55 9.42918 17.7225 9.61368 17.838 9.83718C18.183 10.4972 17.958 11.3297 17.34 11.6957L1.905 20.8277C1.71717 20.941 1.50187 21.0007 1.2825 21.0002C0.5745 21.0002 0 20.3882 0 19.6337V1.36819Z" fill="white"/>
                    </svg>
                  )}
                </button>

                <button
                  className={styles["vp-fs-mute"]}
                  onClick={(e) => { e.stopPropagation(); handleMuteToggle(); }}
                >
                  {isMuted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                      <line x1="23" y1="9" x2="17" y2="15"/>
                      <line x1="17" y1="9" x2="23" y2="15"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                    </svg>
                  )}
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

const VideoPlayer = function () {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <VideoPlayerContent />
    </Suspense>
  );
};

export default VideoPlayer;