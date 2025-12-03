// src/components/VideoLectureDashboard/Sidebar.tsx
"use client";
import React from "react";
import styles from "@/styles/components/videolecturedashboard/Sidebar.module.css";

export default function Sidebar({ videos, current, completed, onSelect }: any) {
  return (
    <aside className={styles.sidebar}>
      <h3 className={styles.title}>Lectures</h3>

      <ul className={styles.list}>
        {videos.map((v: any) => (
          <li key={v.id} className={`${styles.item} ${current === v.id ? styles.active : ""}`}>
            <button
              className={styles.btn}
              onClick={() => onSelect(v.id)}
              disabled={v.id !== 1 && !completed[v.id - 1]}
            >
              <span>{v.title}</span>
              <span className={styles.status}>
                {completed[v.id] ? "✓" : "🔒"}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
