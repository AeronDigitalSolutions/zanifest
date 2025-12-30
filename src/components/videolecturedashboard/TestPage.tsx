"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/components/videolecturedashboard/Testpage.module.css";

const QUESTIONS = [
  { id: 1, q: "What is the standard distance between the target and archer in Olympic archery?", choices: ["50 meters", "70 meters", "100 meters", "120 meters"], answer: 1 },
  { id: 2, q: "Life insurance primarily provides:", choices: ["Long-term savings", "Financial protection for family", "Hospital bill coverage", "Shopping discounts"], answer: 1 },
  { id: 3, q: "Motor insurance covers:", choices: ["Vehicle damage and third-party liability", "Life cover", "House fire", "Travel delays"], answer: 0 },
  { id: 4, q: "Health insurance mainly provides:", choices: ["Hospital and medical expense coverage", "Car repair", "Tax rebate only", "Shopping coupons"], answer: 0 },
  { id: 5, q: "ULIP is a combination of:", choices: ["Insurance and Investment", "Loan and EMI", "Travel and Health", "None of the above"], answer: 0 },
  { id: 6, q: "Term insurance offers:", choices: ["Pure life cover", "Guaranteed returns", "No risk", "Free medical tests"], answer: 0 },
  { id: 7, q: "Who receives the insurance payout?", choices: ["Beneficiary", "Agent", "Bank", "Doctor"], answer: 0 },
  { id: 8, q: "Premium means:", choices: ["Amount paid to the insurance company", "Bonus amount", "Penalty fees", "Cashback"], answer: 0 },
  { id: 9, q: "Travel insurance covers:", choices: ["Trip cancellation, baggage loss, and medical emergencies", "Buying flight tickets", "Visa charges", "Luggage color selection"], answer: 0 },
  { id: 10, q: "Policy maturity refers to:", choices: ["End of policy term with payout", "Start of policy", "Loan approval", "Penalty charges"], answer: 0 },
];

export default function TestPage({ onClose }: { onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  /* ===============================
     MARK TEST STARTED IN DB
  =============================== */
  useEffect(() => {
    fetch("/api/agent/save-training-progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ testStarted: true }),
    });
  }, []);

  function selectChoice(qid: number, choiceIdx: number) {
    setAnswers((prev) => ({ ...prev, [qid]: choiceIdx }));
  }

  function handleSubmit() {
    let s = 0;
    QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.answer) s++;
    });
    setScore(s);
    setShowResult(true);
  }

  return (
    <div className={styles.testWrap}>
      {!showResult ? (
        <div className={styles.card}>
          <div className={styles.header}>Agent Certification Test</div>

          <div className={styles.questionBox}>
            Q{index + 1}. {QUESTIONS[index].q}
          </div>

          <div className={styles.answersGrid}>
            {QUESTIONS[index].choices.map((c, i) => (
              <button
                key={i}
                className={`${styles.choiceBtn} ${
                  answers[QUESTIONS[index].id] === i ? styles.selected : ""
                }`}
                onClick={() => selectChoice(QUESTIONS[index].id, i)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className={styles.navRow}>
            <button
              onClick={() => setIndex((i) => i - 1)}
              disabled={index === 0}
              className={styles.navBtn}
            >
              Previous
            </button>

            {index < QUESTIONS.length - 1 ? (
              <button
                onClick={() => setIndex((i) => i + 1)}
                className={styles.navBtn}
              >
                Next
              </button>
            ) : (
              <button onClick={handleSubmit} className={styles.submitBtn}>
                Submit Test
              </button>
            )}
          </div>
        </div>
      ) : (
        <ResultDialog score={score} onClose={onClose} />
      )}
    </div>
  );
}

/* ===============================
   RESULT DIALOG
=============================== */
function ResultDialog({
  score,
  onClose,
}: {
  score: number;
  onClose: () => void;
}) {
  const pass = score >= 6;

  async function handlePass() {
    await fetch("/api/agent/complete-training", {
      method: "POST",
      credentials: "include",
    });

    await fetch("/api/agent/save-training-progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ testCompleted: true }),
    });

    window.location.href = "/agentpage";
  }

  return (
    <div className={styles.resultWrap}>
      <div className={styles.resultCard}>
        <p className={styles.score}>{score} / 10</p>

        <div className={styles.actions}>
          {pass ? (
            <button className={styles.linkBtn} onClick={handlePass}>
              Go to Dashboard
            </button>
          ) : (
            <button
              className={styles.linkBtn}
              onClick={() => window.location.replace("/videolectures")}
            >
              Return to Training
            </button>
          )}

          <button className={styles.greyBtn} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
