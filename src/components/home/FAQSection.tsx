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

  const renderHeading = (text: string) => {
    const words = text.split(" ");
    return (
      <>
        {words.slice(0, -1).join(" ")}{" "}
        <span className={styles.orange}>{words.slice(-1)}</span>
      </>
    );
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
              onClick={() => setAnsIndex(index)} // always open clicked question
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
