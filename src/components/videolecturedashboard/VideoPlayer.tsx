"use client";
import React, { useRef, useEffect, useState } from "react";
import styles from "@/styles/components/videolecturedashboard/VideoPlayer.module.css";

export default function VideoPlayer({ src, videoId, onEnded }: any) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  /* 🔹 Restore last watched time */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const savedTime = localStorage.getItem(`video_time_${videoId}`);
    if (savedTime) {
      video.currentTime = Number(savedTime);
    }
  }, [videoId]);

  /* 🔹 Track time + prevent skipping */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let lastTime = video.currentTime;

    function updateTime() {
      if (!video) return;

      // ❌ prevent forward skip
      if (video.currentTime > lastTime + 0.5) {
        video.currentTime = lastTime;
      }

      lastTime = video.currentTime;

      // ✅ save progress
      localStorage.setItem(
        `video_time_${videoId}`,
        String(video.currentTime)
      );

      // progress %
      const percent = (video.currentTime / video.duration) * 100;
      setProgress(percent || 0);
    }

    video.addEventListener("timeupdate", updateTime);
    return () => video.removeEventListener("timeupdate", updateTime);
  }, [videoId]);

  /* 🔹 Clear saved time on completion */
  function handleEnded() {
    localStorage.removeItem(`video_time_${videoId}`);
    onEnded();
  }

  return (
    <div className={styles.videoWrap}>
      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${progress}%` }}
        >
          {Math.round(progress)}%
        </div>
      </div>

      <video
        ref={videoRef}
        className={styles.video}
        controls
        controlsList="nodownload"
        onEnded={handleEnded}
      >
        <source src={src} />
      </video>
    </div>
  );
}
