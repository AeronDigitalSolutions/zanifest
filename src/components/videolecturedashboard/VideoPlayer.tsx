"use client";
import React, { useRef, useEffect } from "react";
import styles from "@/styles/components/videolecturedashboard/VideoPlayer.module.css";

export default function VideoPlayer({ src, onEnded }: { src: string; onEnded: () => void }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // 🔥 FIX: force reload video when src changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [src]);

  return (
    <div className={styles.videoWrap}>
      <video
        ref={videoRef}
        className={styles.video}
        controls
        onEnded={onEnded}
      >
        <source src={src} type="video/mp4" />
      </video>

      <div className={styles.hint}>
        Watch full video to unlock next lecture.
      </div>
    </div>
  );
}
