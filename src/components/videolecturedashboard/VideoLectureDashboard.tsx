// src/components/VideoLectureDashboard/VideoLectureDashboard.tsx
"use client";
import React, { useState } from "react";
import Sidebar from "@/components/videolecturedashboard/sidebar";
import VideoPlayer from "@/components/videolecturedashboard/VideoPlayer";
import styles from "@/styles/components/videolecturedashboard/VideoLectureDashboard.module.css";
import TestPage from "./TestPage";

const VIDEO_LIST = [
  { id: 1, title: "Video Lecture 1", src: "@/assets/video/videoplayback.mp4"},
  { id: 2, title: "Video Lecture 2", src: "@/assets/video/videoplayback.mp4"},
  { id: 3, title: "Video Lecture 3",src: "@/assets/video/videoplayback.mp4"},
];

export default function VideoLectureDashboard() {
  const [current, setCurrent] = useState<number>(1);
  const [completed, setCompleted] = useState<Record<number, boolean>>({
    1: false, 2: false, 3: false
  });
  const [showTest, setShowTest] = useState(false);

  function handleVideoEnd(id: number) {
    setCompleted(prev => ({ ...prev, [id]: true }));
    if (id < 3) setCurrent(id + 1);
  }

  function handleSidebarClick(id: number) {
    if (id === 1) return setCurrent(1);
    if (completed[id - 1]) setCurrent(id);
  }

  return (
    <div className={styles.container}>
      <Sidebar
        videos={VIDEO_LIST}
        current={current}
        completed={completed}
        onSelect={handleSidebarClick}
      />

      <main className={styles.main}>
        {!showTest ? (
          <>
            <h2 className={styles.heading}>
              {VIDEO_LIST.find(v => v.id === current)?.title}
            </h2>

            <VideoPlayer
              key={current}
              src={VIDEO_LIST.find(v => v.id === current)!.src}
              onEnded={() => handleVideoEnd(current)}
            />

            <div className={styles.controlsRow}>
              <button
                className={styles.prevNext}
                onClick={() => setCurrent(p => Math.max(1, p - 1))}
                disabled={current === 1}
              >
                Previous
              </button>

              <button
                className={styles.startTest}
                onClick={() => setShowTest(true)}
                disabled={!(completed[1] && completed[2] && completed[3])}
              >
                Start Test
              </button>

              <button
                className={styles.prevNext}
                onClick={() => setCurrent(p => Math.min(3, p + 1))}
                disabled={current === 3 || !completed[current]}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <TestPage onClose={() => setShowTest(false)} />
        )}
      </main>
    </div>
  );
}
