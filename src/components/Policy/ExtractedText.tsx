// /components/policy/ExtractedText.tsx
"use client";
import React from "react";
import styles from "@/styles/pages/listofpolicy.module.css";

const ExtractedText = ({ text }: { text: string }) => {
  return (
    <div className={styles.textSection}>
      <h2>Extracted PDF Text</h2>

      <textarea
        className={styles.textArea}
        value={text}
        readOnly
      />
    </div>
  );
};

export default ExtractedText;
