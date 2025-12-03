// src/components/VideoLectureDashboard/VideoPlayer.tsx
"use client";
import React, { useRef } from "react";
import styles from "@/styles/components/videolecturedashboard/VideoPlayer.module.css";

export default function VideoPlayer({ src, onEnded }: { src: string; onEnded: () => void }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <div className={styles.videoWrap}>
      <video
        ref={videoRef}
        className={styles.video}
        controls
        onEnded={onEnded}
        src={src}
      />
      <div className={styles.hint}>Watch full video to unlock next lecture.</div>
    </div>
  );
}
