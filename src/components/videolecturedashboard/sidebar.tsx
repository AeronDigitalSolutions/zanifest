"use client";
import React from "react";
import styles from "@/styles/components/videolecturedashboard/VideoLectureDashboard.module.css";
import { FaCheckCircle } from "react-icons/fa";
import { MdPlayCircle } from "react-icons/md";
import { AiOutlineLock } from "react-icons/ai";

export default function Sidebar({ videos, current, completed, onSelect }: any) {
  const completedCount = Object.values(completed).filter(Boolean).length;
  const progress = Math.round((completedCount / videos.length) * 100);

  function isLocked(id: number) {
  return id !== 1 && !completed[id];
}


  return (
    <aside className={styles.sidebar}>
      <div className={styles.menuTitle}>Video Lecture Status</div>

      <div className={styles.progressPercent}>{progress}% Completed</div>

      <div className={styles.progressContainer}>
        <div className={styles.progressBar} style={{ width: progress + "%" }}></div>
      </div>

      <div className={styles.menuTitle}>VIDEO LESSONS</div>

      {videos.map((v: any) => {
        const locked = isLocked(v.id);
        const active = current === v.id;

        return (
          <div
            key={v.id}
            className={`${styles.sidebarItem} 
            ${active ? styles.activeItem : ""} 
            ${locked ? styles.lockedItem : ""}`}
            onClick={() => !locked && onSelect(v.id)}
          >
            {locked ? (
              <AiOutlineLock size={20} />
            ) : completed[v.id] ? (
              <FaCheckCircle size={20} color={active ? "white" : "green"} />
            ) : (
              <MdPlayCircle size={20} />
            )}
            {v.title}
          </div>
        );
      })}
    </aside>
  );
}
