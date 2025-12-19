"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import VideoPlayer from "./VideoPlayer";
import TestPage from "./TestPage";
import styles from "@/styles/components/videolecturedashboard/VideoLectureDashboard.module.css";

const VIDEO_LIST = [
  { id: 1, title: "Video Lecture 1", src: "/video/videolecture1.mp4" },
  { id: 2, title: "Video Lecture 2", src: "/video/videolecture1.mp4" },
  { id: 3, title: "Video Lecture 3", src: "/video/videolecture3.mp4" },
];

export default function VideoLectureDashboard() {
  const [current, setCurrent] = useState(1);
  const [completed, setCompleted] = useState<Record<number, boolean>>({});
  const [showTest, setShowTest] = useState(false);

  useEffect(() => {
    // ✅ If already passed → skip training
    if (localStorage.getItem("agentTestPassed") === "true") {
      window.location.href = "/agentpage";
      return;
    }

    const savedVideo = Number(
      localStorage.getItem("training_currentVideo") || 1
    );
    const savedCompleted = JSON.parse(
      localStorage.getItem("training_completed") || "{}"
    );
    const testStarted =
      localStorage.getItem("training_testStarted") === "true";

    setCurrent(savedVideo);
    setCompleted(savedCompleted);
    setShowTest(testStarted);
  }, []);

  useEffect(() => {
    localStorage.setItem("training_currentVideo", String(current));
  }, [current]);

  function handleVideoEnd(id: number) {
    const newCompleted = { ...completed, [id]: true };
    setCompleted(newCompleted);
    localStorage.setItem(
      "training_completed",
      JSON.stringify(newCompleted)
    );

    if (id < VIDEO_LIST.length) {
      setCurrent(id + 1);
    }
  }

  function handleSidebarClick(id: number) {
    if (id === 1 || completed[id - 1]) {
      setCurrent(id);
    }
  }

  const allCompleted =
    Object.keys(completed).length === VIDEO_LIST.length;

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
              key={current}
              src={currentVideo.src}
              videoId={current}
              onEnded={() => handleVideoEnd(current)}
            />

            {allCompleted && (
              <button
                className={styles.startTest}
                onClick={() => {
                  localStorage.setItem("training_testStarted", "true");
                  setShowTest(true);
                }}
              >
                Start Test
              </button>
            )}
          </>
        ) : (
          <TestPage
            onClose={() => {
              localStorage.removeItem("training_testStarted");
              setShowTest(false);
            }}
          />
        )}
      </main>
    </div>
  );
}
