"use client";
import React, { useState } from "react";
import styles from "@/styles/components/videolecturedashboard/Testpage.module.css";

const QUESTIONS = [
  {
    id: 1,
    q: "What is the standard distance between the target and archer in Olympics?",
    choices: ["50 meters", "70 meters", "100 meters", "120 meters"],
    answer: 1,
  },
  {
    id: 2,
    q: "Life insurance is mainly for:",
    choices: [
      "Long-term savings",
      "Financial protection for family",
      "Hospital bills",
      "Shopping discounts",
    ],
    answer: 1,
  },
  {
    id: 3,
    q: "Motor insurance covers:",
    choices: [
      "Car damage & third-party liability",
      "Life cover",
      "House fire",
      "Travel delays",
    ],
    answer: 0,
  },
  {
    id: 4,
    q: "Health insurance provides:",
    choices: [
      "Hospital expense coverage",
      "Car repair",
      "Income tax rebate only",
      "Shopping coupons",
    ],
    answer: 0,
  },
  {
    id: 5,
    q: "ULIP is a combination of:",
    choices: [
      "Insurance + Investment",
      "Loan + EMI",
      "Travel + Health",
      "None",
    ],
    answer: 0,
  },
  {
    id: 6,
    q: "Term insurance offers:",
    choices: [
      "Pure life cover",
      "Guaranteed returns",
      "No risk",
      "Free medical tests",
    ],
    answer: 0,
  },
  {
    id: 7,
    q: "Who receives the insurance payout?",
    choices: ["Beneficiary", "Agent", "Bank", "Doctor"],
    answer: 0,
  },
  {
    id: 8,
    q: "Premium refers to:",
    choices: [
      "Amount paid to insurance company",
      "Bonus amount",
      "Penalty fees",
      "Cashback",
    ],
    answer: 0,
  },
  {
    id: 9,
    q: "Travel insurance covers:",
    choices: [
      "Trip loss, baggage, medical",
      "Buying tickets",
      "Visa charges",
      "Luggage color choice",
    ],
    answer: 0,
  },
  {
    id: 10,
    q: "Policy maturity means:",
    choices: [
      "End of policy term & payout",
      "Start of policy",
      "Loan approval",
      "Penalty",
    ],
    answer: 0,
  },
];

export default function TestPage({ onClose }: { onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  function selectChoice(qid: number, choiceIdx: number) {
    setAnswers((prev) => ({ ...prev, [qid]: choiceIdx }));
  }

  function goNext() {
    if (index < QUESTIONS.length - 1) setIndex((i) => i + 1);
  }

  function goPrev() {
    if (index > 0) setIndex((i) => i - 1);
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
          <div className={styles.header}>SIMPLE QUIZ</div>

          <div className={styles.questionBox}>{QUESTIONS[index].q}</div>

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
              onClick={goPrev}
              disabled={index === 0}
              className={styles.navBtn}
            >
              Previous
            </button>

            {index < QUESTIONS.length - 1 ? (
              <button onClick={goNext} className={styles.navBtn}>
                Next
              </button>
            ) : (
              <button onClick={handleSubmit} className={styles.submitBtn}>
                Submit
              </button>
            )}
          </div>
        </div>
      ) : (
        <ResultDialog
          score={score}
          onClose={onClose}
          onRetry={() => {
            setShowResult(false);
            setAnswers({});
            setIndex(0);
          }}
        />
      )}
    </div>
  );
}

function ResultDialog({
  score,
  onClose,
  onRetry,
}: {
  score: number;
  onClose: () => void;
  onRetry: () => void;
}) {
  const pass = score >= 6;
// inside ResultDialog (PASS CASE ONLY)

if (pass) {
  localStorage.setItem("agentTestPassed", "true");

  // ✅ cleanup training data
  localStorage.removeItem("training_currentVideo");
  localStorage.removeItem("training_completed");
  localStorage.removeItem("training_testStarted");

  window.location.href = "/agentpage";
}

  return (
    <div className={styles.resultWrap}>
      <div className={styles.resultCard}>
        <h3>Your Score</h3>
        <p className={styles.score}>{score} / 10</p>
        <p className={styles.status}>{pass ? "Passed" : "Failed"}</p>

        <div className={styles.actions}>
          {pass ? (
         <button
  className={styles.linkBtn}
  onClick={() => {
    document.cookie = "agentTestPassed=true; path=/; max-age=31536000"; 
    localStorage.setItem("agentTestPassed", "true");
    window.location.href = "/agentpage";
  }}
>
  Go to Dashboard
</button>


          ) : (
            <button className={styles.linkBtn} onClick={onRetry}>
              Try Again
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
