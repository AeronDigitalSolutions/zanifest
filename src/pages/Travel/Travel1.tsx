"use client";
import React, { useState } from "react";
import styles from "@/styles/pages/Travel/travel1.module.css";
import { FaUserPlus } from "react-icons/fa";

const Travel1: React.FC = () => {
  const [step, setStep] = useState<0 | 1 | 2>(0); // 0 = no modal, 1 = travel dates, 2 = travellers

  return (
    <div className={styles.container}>
      {/* LEFT SECTION */}
      <div className={styles.leftSection}>
        <h2 className={styles.heading}>
          Travel worry free starting at <span>₹18/day*</span>
        </h2>
        <p className={styles.subtext}>
          Instant quotes. Global coverage. Easy claims.
        </p>

        <h3 className={styles.whyChoose}>
          Why smart travellers choose insurance?
        </h3>
        <ul className={styles.benefits}>
          <li>
            <span className={styles.iconGreen}>🛡️</span> Medical emergencies
          </li>
          <li>
            <span className={styles.iconOrange}>✈️</span> Flight delays or cancellations
          </li>
          <li>
            <span className={styles.iconYellow}>🎒</span> Lost baggage & passport
          </li>
          <li>
            <span className={styles.iconBlue}>🔒</span> Theft or personal loss of belongings
          </li>
        </ul>
      </div>

      {/* RIGHT SECTION */}
      <div className={styles.rightSection}>
        <h3 className={styles.formHeading}>Where are you travelling to?</h3>
        <input
          type="text"
          placeholder="Search country"
          className={styles.searchInput}
        />

        <div className={styles.popularChoices}>
          <p className={styles.popularText}>
            Popular choices (You can add more than one country)
          </p>
          <div className={styles.choicesGrid}>
            <div className={styles.choice}>Schengen</div>
            <div className={styles.choice}>USA</div>
            <div className={styles.choice}>Germany</div>
            <div className={styles.choice}>United Kingdom</div>
            <div className={styles.choice}>France</div>
            <div className={styles.choice}>Netherlands</div>
          </div>
        </div>

        <div className={styles.dateTravellerRow}>
          <input type="text" placeholder="Start date" className={styles.inputBox} />
          <input type="text" placeholder="End date" className={styles.inputBox} />
        </div>

        <div className={styles.travellerRow}>
          <div className={styles.travellerBox}>0 Traveller(s)</div>
          <button className={styles.addTraveller}>
            <FaUserPlus /> Add travellers
          </button>
        </div>

        <button
          className={styles.exploreBtn}
          onClick={() => setStep(1)}
        >
          Explore Plans &gt;
        </button>
      </div>

      {/* MODAL 1 - Travel Dates */}
      {step === 1 && (
        <div className={styles.modalOverlay} onClick={() => setStep(0)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3>When are you planning to travel to USA?</h3>
              <button
                className={styles.closeBtn}
                onClick={() => setStep(0)}
              >
                ✖
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.dateInputs}>
                <div>
                  <label>Start date</label>
                  <input type="text" value="21 Aug 2025" readOnly />
                </div>
                <div>
                  <label>End date</label>
                  <input type="text" value="11 Sep 2025" readOnly />
                </div>
              </div>

              {/* Calendar UI placeholder */}
              <div className={styles.calendarBox}>
                <p>[Calendar UI Here]</p>
              </div>

              <p className={styles.tripDuration}>Trip duration: 22 days</p>
            </div>

            <button
              className={styles.continueBtn}
              onClick={() => setStep(2)}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* MODAL 2 - Travellers */}
      {step === 2 && (
        <div className={styles.modalOverlay} onClick={() => setStep(0)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3>How many travellers?</h3>
              <button
                className={styles.closeBtn}
                onClick={() => setStep(0)}
              >
                ✖
              </button>
            </div>

            <div className={styles.modalBody}>
              <p className={styles.signInText}>
                Insured your travel from us before? <button className={styles.signInBtn}>Sign in</button>
              </p>

              {/* Travellers count */}
              <div className={styles.travellerCount}>
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
                <button>5</button>
                <button>6+</button>
              </div>

              {/* Age selector */}
              <select className={styles.ageSelect}>
                <option>Select age</option>
                <option>Below 18</option>
                <option>18-40</option>
                <option>41-60</option>
                <option>60+</option>
              </select>

              {/* Medical conditions */}
              <div className={styles.medicalSection}>
                <p>
                  Do any of the travellers have pre-existing medical conditions like high BP, diabetes, or any other health issues?
                </p>
                <div className={styles.radioGroup}>
                  <label><input type="radio" name="medical" /> Yes</label>
                  <label><input type="radio" name="medical" /> No</label>
                </div>
              </div>
            </div>

            <button className={styles.continueBtn}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Travel1;
