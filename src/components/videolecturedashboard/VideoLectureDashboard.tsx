"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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
  const [checking, setChecking] = useState(true);

  const searchParams = useSearchParams();
  const forceTest = searchParams.get("mode") === "test";

  useEffect(() => {
    fetch("/api/agent/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data?.agent?.trainingCompleted) {
          window.location.replace("/agentpage");
          return;
        }

        const savedVideo = Number(
          localStorage.getItem("training_currentVideo") || 1
        );
        const savedCompleted = JSON.parse(
          localStorage.getItem("training_completed") || "{}"
        );

        setCurrent(savedVideo);
        setCompleted(savedCompleted);

        if (
          forceTest ||
          Object.keys(savedCompleted).length === VIDEO_LIST.length
        ) {
          setShowTest(true);
        }

        setChecking(false);
      })
      .catch(() => setChecking(false));
  }, [forceTest]);

  useEffect(() => {
    localStorage.setItem("training_currentVideo", String(current));
  }, [current]);

  function handleVideoEnd(id: number) {
    const updated = { ...completed, [id]: true };
    setCompleted(updated);

    localStorage.setItem(
      "training_completed",
      JSON.stringify(updated)
    );

    if (id < VIDEO_LIST.length) {
      setCurrent(id + 1);
    }

    if (id === VIDEO_LIST.length) {
      setShowTest(true);
    }
  }

  if (checking) return null;

  return (
    <div className={styles.container}>
      <Sidebar
        videos={VIDEO_LIST}
        current={current}
        completed={completed}
        onSelect={setCurrent}
      />

      <main className={styles.main}>
        {!showTest ? (
          <>
            <h2 className={styles.heading}>
              {VIDEO_LIST[current - 1].title}
            </h2>

            <VideoPlayer
              key={current}
              src={VIDEO_LIST[current - 1].src}
              videoId={current}
              onEnded={() => handleVideoEnd(current)}
            />
          </>
        ) : (
          <TestPage onClose={() => setShowTest(false)} />
        )}
      </main>
    </div>
  );
}
