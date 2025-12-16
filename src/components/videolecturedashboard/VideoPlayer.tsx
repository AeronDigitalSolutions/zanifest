"use client";
import React, { useRef, useEffect, useState } from "react";
import styles from "@/styles/components/videolecturedashboard/VideoPlayer.module.css";

export default function VideoPlayer({ src, onEnded }: any) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let lastTime = 0;

    function updateTime() {
      if (!video) return;

      // Prevent skipping
      if (video.currentTime > lastTime + 0.5) {
        video.currentTime = lastTime;
      }

      lastTime = video.currentTime;

      // update progress %
      const percent = (video.currentTime / video.duration) * 100;
      setProgress(percent || 0);
    }

    video.addEventListener("timeupdate", updateTime);
    return () => video.removeEventListener("timeupdate", updateTime);
  }, [src]);

  return (
    <div className={styles.videoWrap}>
      <div className={styles.progressContainer}>
        <div className={styles.progressBar} style={{ width: `${progress}%` }}>
          {Math.round(progress)}%
        </div>
      </div>

      <video
        ref={videoRef}
        className={styles.video}
        controls
        controlsList="nodownload"
        onEnded={onEnded}
      >
        <source src={src} />
      </video>
    </div>
  );
}
