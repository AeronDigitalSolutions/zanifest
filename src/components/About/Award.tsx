// components/Achievements.tsx
"use client";
import React from "react";
import styles from "@/styles/pages/award.module.css";
import FAQSection from "../home/FAQSection";

const Award = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        <span className={styles.highlight}>Our Achievements</span>
        <span className={styles.line}></span>
      </h2>
      <p className={styles.description}>
        We don’t do it for the awards. But we appreciate being noticed.
        Zanifest has won over 50 awards over the years, for its innovative
        business model, marketing strategies & customer focus.
      </p>

      <div className={styles.cards}>
        <div className={styles.card}>
          <img src="/images/futech.png" alt="FE Futech Awards" />
          <p className={styles.cardText}>
            Best Fintech Provider (Silver) - <br /> FE FuTech Awards 2024
          </p>
        </div>

        <div className={styles.card}>
          <img src="/images/dgplus.png" alt="ET DIGIPLUS Awards" />
          <p className={styles.cardText}>
            Best Fintech Campaign (Silver) <br />
            for Term Insurance for women campaign at ET DIGIPLUS 2024
          </p>
        </div>

        <div className={styles.card}>
          <img src="/images/excellence.png" alt="ETBFSI Awards" />
          <p className={styles.cardText}>
            Best use of consumer tech for <br />
            PB Meet - ETBFSI Awards 2023
          </p>
        </div>
      </div>
      <FAQSection/>
    </div>
  );
};

export default Award;
