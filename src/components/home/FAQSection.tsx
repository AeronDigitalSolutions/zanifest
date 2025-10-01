"use client";

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { FaEllipsisH, FaPlus } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";
import styles from "@/styles/components/home/FAQSection.module.css";

type QA = { ques: string; ans: string };

type Props = {
  headingOverride?: string;
  questionsOverride?: QA[];
};

export default function FAQSection({ headingOverride, questionsOverride }: Props) {
  const { data } = useSWR("/api/faq", (url) => fetch(url).then(res => res.json()));
  const heading = headingOverride || data?.heading || "Frequently Asked Questions";
  const questions: QA[] = questionsOverride || data?.questions || [];

  // By default, first question open
  const [ansIndex, setAnsIndex] = useState<number>(0);

  // Reset open question if questions array changes (useful for admin live preview)
  useEffect(() => {
    if (questions.length > 0) setAnsIndex(0);
  }, [questions]);

  // Custom heading renderer (handle <...> for orange color)
  const renderHeading = (text: string) => {
    const regex = /<([^>]+)>/g;
const parts: (string | React.ReactNode)[] = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index)); // normal text
      }
      parts.push(
        <span key={match.index} className={styles.orange}>
          {match[1]}
        </span>
      );
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return <>{parts}</>;
  };

  return (
    <div className={styles.cont}>
      <div className={styles.head}>
        <div className={styles.heading}>{renderHeading(heading)}</div>
      </div>

      <div className={styles.mobileEllipsis}>
        <FaEllipsisH style={{ color: "#fa621a", fontSize: "20px" }} />
      </div>

      <div className={styles.bottom}>
        <div className={styles.list}>
          {questions.map((item, index) => (
            <div
              key={index}
              className={styles.item}
              onClick={() => setAnsIndex(index)}
            >
              <p className={`${styles.ques} ${index === ansIndex ? styles.active : ""}`}>
                {item.ques}
              </p>
              {index === ansIndex && <p className={styles.ans}>{item.ans}</p>}
              <div className={styles.rightIndicator}>
                {index === ansIndex ? <TiMinus /> : <FaPlus />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
