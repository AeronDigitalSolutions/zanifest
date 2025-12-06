"use client";
import React, { useState } from "react";
import Sidebar from "@/components/videolecturedashboard/sidebar";
import VideoPlayer from "@/components/videolecturedashboard/VideoPlayer";
import styles from "@/styles/components/videolecturedashboard/VideoLectureDashboard.module.css";
import TestPage from "./TestPage";

const VIDEO_LIST = [
  { id: 1, title: "Video Lecture 1", src: "/video/videolecture1.mp4" },
  { id: 2, title: "Video Lecture 2", src: "/video/videolecture1.mp4" },
  { id: 3, title: "Video Lecture 3", src: "/video/videolecture3.mp4" },
];

export default function VideoLectureDashboard() {
  const [current, setCurrent] = useState(1);
  const [completed, setCompleted] = useState({
    1: false,
    2: false,
    3: false,
  });

  const [showTest, setShowTest] = useState(false);

  // NO AUTOPLAY EVER
  function handleVideoEnd(id: number) {
    setCompleted((prev) => ({ ...prev, [id]: true }));

    // Move to next video, but DO NOT autoplay
    if (id < VIDEO_LIST.length) {
      setCurrent(id + 1);
    }
  }

  function handleSidebarClick(id: number) {
    if (id === 1) return setCurrent(1);
    if (completed[id - 1 as keyof typeof completed]) setCurrent(id);
  }

  function goPrev() {
    setCurrent((p) => Math.max(1, p - 1));
  }

  function goNext() {
    if (current < VIDEO_LIST.length && completed[current as keyof typeof completed]) {
      setCurrent((p) => p + 1);
    }
  }

  const currentVideo = VIDEO_LIST.find((v) => v.id === current)!;

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
            <h2 className={styles.heading}>{currentVideo.title}</h2>

            <VideoPlayer
              key={current}       // 🔥 Forces full reload of video element
              src={currentVideo.src}
              onEnded={() => handleVideoEnd(current)}
            />

            <div className={styles.controlsRow}>
              <button
                className={styles.prevNext}
                onClick={goPrev}
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
                onClick={goNext}
                disabled={!completed[current as keyof typeof completed] || current === VIDEO_LIST.length}
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
