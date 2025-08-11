import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";

import styles from "@/styles/components/home/FAQSection.module.css";

const QUESTIONS = [
  {
    ques: "Which type of cancer is covered?",
    ans: "Yes, there is an age limit . The age span is between 18-50 for this product. This age groups are important for some critical illnesses. Insurers can renew their policies every other year till 51 years old.",
  },
  {
    ques: "Are there any age limit?",
    ans: "Yes, there is an age limit . The age span is between 18-50 for this product. This age groups are important for some critical illnesses. Insurers can renew their policies every other year till 51 years old.",
  },
  {
    ques: "How 25% cash back works?",
    ans: "Yes, there is an age limit . The age span is between 18-50 for this product. This age groups are important for some critical illnesses. Insurers can renew their policies every other year till 51 years old.",
  },
  {
    ques: "How  I use 3 year premium option?",
    ans: "Yes, there is an age limit . The age span is between 18-50 for this product. This age groups are important for some critical illnesses. Insurers can renew their policies every other year till 51 years old.",
  },
  {
    ques: "What is the process to get lump sum payment when risk is realized?",
    ans: "Yes, there is an age limit . The age span is between 18-50 for this product. This age groups are important for some critical illnesses. Insurers can renew their policies every other year till 51 years old.",
  },
];

function FAQSection() {
  const [ansIndex, setAnsIndex] = useState<number | null>(null);

  return (
    <div>
      <div className={styles.cont}>
        <div className={styles.head}>
          <div className={styles.heading}>
  Frequently Asked <span className={styles.orange}>Questions</span>
</div>

        </div>
        <div className={styles.bottom}>
          <div className={styles.list}>
            {QUESTIONS.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`${styles.item}`}
                  onClick={() => {
                    setAnsIndex(index);
                  }}
                >
                  <p
                    className={`${styles.ques}  ${
                      index == ansIndex ? styles.active : ""
                    }`}
                  >
                    {item.ques}
                  </p>
                  {index == ansIndex && (
                    <p className={styles.ans}>{item.ans}</p>
                  )}

                  <div className={styles.rightIndicator}>
                    {index == ansIndex ? <TiMinus /> : <FaPlus />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQSection;
