// src/components/VideoLectureDashboard/TestPage.tsx
"use client";
import React, { useState } from "react";
import styles from "@/styles/components/videolecturedashboard/Testpage.module.css";
import { useRouter } from "next/navigation";

const QUESTIONS = [
  { id: 1, q: "What is 2 + 2?", choices: ["3", "4", "5"], answer: 1 },
  { id: 2, q: "HTML stands for?", choices: ["Hyper Text Markup Language", "Hot Mail", "None"], answer: 0 },
  { id: 3, q: "Tag for image?", choices: ["<img>", "<image>", "<pic>"], answer: 0 },
  { id: 4, q: "CSS stands for?", choices: ["Cascading Style Sheets", "Computer Style Sheets", "None"], answer: 0 },
  { id: 5, q: "JS is:", choices: ["Programming Language", "Markup", "Style"], answer: 0 },
  { id: 6, q: "React is:", choices: ["Library", "Database", "OS"], answer: 0 },
  { id: 7, q: "Ordered list tag?", choices: ["<ol>", "<ul>", "<li>"], answer: 0 },
  { id: 8, q: "JS file extension?", choices: [".js", ".html", ".css"], answer: 0 },
  { id: 9, q: "React state hook?", choices: ["useState", "useEffect", "useRef"], answer: 0 },
  { id: 10, q: "Flex horizontal property?", choices: ["flex-direction: row", "display: grid", "position: absolute"], answer: 0 },
];

export default function TestPage({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  function selectChoice(qid: number, choiceIdx: number) {
    setAnswers(prev => ({ ...prev, [qid]: choiceIdx }));
  }

  function goNext() {
    if (index < QUESTIONS.length - 1) setIndex(i => i + 1);
  }
  function goPrev() {
    if (index > 0) setIndex(i => i - 1);
  }

  function handleSubmit() {
    let s = 0;
    QUESTIONS.forEach(q => {
      if (answers[q.id] === q.answer) s += 1;
    });
    setScore(s);
    setShowResult(true);
  }

  return (
    <div className={styles.testWrap}>
      <div className={styles.header}>Test - 10 MCQs</div>

      {!showResult ? (
        <div className={styles.card}>
          <div className={styles.qHead}>Question {index + 1} of {QUESTIONS.length}</div>
          <div className={styles.question}>{QUESTIONS[index].q}</div>

          <div className={styles.choices}>
            {QUESTIONS[index].choices.map((c, i) => (
              <label key={i} className={styles.choice}>
                <input
                  type="radio"
                  name={`q_${QUESTIONS[index].id}`}
                  checked={answers[QUESTIONS[index].id] === i}
                  onChange={() => selectChoice(QUESTIONS[index].id, i)}
                />
                <span>{c}</span>
              </label>
            ))}
          </div>

          <div className={styles.navRow}>
            <button onClick={goPrev} disabled={index === 0} className={styles.navBtn}>Previous</button>
            {index < QUESTIONS.length - 1 ? (
              <button onClick={goNext} className={styles.navBtn}>Next</button>
            ) : (
              <button onClick={handleSubmit} className={styles.submitBtn}>Submit</button>
            )}
          </div>
        </div>
      ) : (
        <ResultDialog score={score} onClose={onClose} onRetry={() => { setShowResult(false); setAnswers({}); setIndex(0); }} />
      )}
    </div>
  );
}

function ResultDialog({ score, onClose, onRetry }: { score: number; onClose: () => void; onRetry: () => void }) {
  const pass = score >= 6; // pass threshold
  return (
    <div className={styles.resultWrap}>
      <div className={styles.resultCard}>
        <h3>Your Score</h3>
        <p className={styles.score}>{score} / 10</p>
        <p className={styles.status}>{pass ? "Passed" : "Failed"}</p>

        <div className={styles.actions}>
          {pass ? (
            <button onClick={() => { window.location.href = "/agent-dashboard"; }} className={styles.linkBtn}>Go to Agent Dashboard</button>
          ) : (
            <button onClick={onRetry} className={styles.linkBtn}>Start Again</button>
          )}
          <button onClick={onClose} className={styles.greyBtn}>Close</button>
        </div>
      </div>
    </div>
  );
}
