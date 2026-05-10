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
  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("00:00");
  const [isMuted, setIsMuted] = useState(false);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => setCurrentTime(formatTime(video.currentTime));
    const onLoadedMetadata = () => setDuration(formatTime(video.duration));
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    document.addEventListener("fullscreenchange", onFullscreenChange);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, []);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleFullscreen = () => {
    if (innerRef.current) {
      innerRef.current.requestFullscreen();
    }
  };

  const handleExitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleCenterClick = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  if (!decodedUrl) {
    return <p className={styles["error"]}>Video nahi mila.</p>;
  }

  return (
    <section className={styles["vp-wrapper"]}>
      <div
        className={styles["vp-inner"]}
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
        >
          <source src={decodedUrl} type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className={styles["vp-overlay"]} />

        {/* Title — normal mode only */}
        {!isFullscreen && (
          <div className={styles["vp-title"]}>
            <h1>{decodedTitle}</h1>
          </div>
        )}

        {/* CLOSE button — fullscreen only */}
        {isFullscreen && (
          <button
            className={styles["vp-close"]}
            onClick={(e) => { e.stopPropagation(); handleExitFullscreen(); }}
          >
            CLOSE
          </button>
        )}

        {/* Center Play/Pause Button */}
        <div className={styles["vp-center-play"]}>
          <span>{isPlaying ? "PAUSE" : "PLAY"}</span>
        </div>

        {/* Bottom Controls — normal mode */}
        {!isFullscreen && (
          <div
            className={styles["vp-controls"]}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles["vp-controls-left"]}>
              <button onClick={handlePlay}>[PLAY]</button>
              <button onClick={handlePause}>[PAUSE]</button>
              <button onClick={handleFullscreen}>[FULLSCREEN]</button>
            </div>
            <div className={styles["vp-controls-right"]}>
              <span>MORE PROJECTS</span>
            </div>
          </div>
        )}

        {/* Bottom Controls — fullscreen mode */}
        {isFullscreen && (
          <div
            className={styles["vp-fs-controls"]}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={styles["vp-fs-time"]}>
              {currentTime} / {duration}
            </span>
            <button
              className={styles["vp-fs-mute"]}
              onClick={handleMuteToggle}
            >
              {isMuted ? "🔇" : "🔊"}
            </button>
          </div>
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