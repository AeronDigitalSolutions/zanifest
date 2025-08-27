"use client";
import React from "react";
import styles from "@/styles/pages/Travel/travel5.module.css";
import { FaMale, FaFemale } from "react-icons/fa";

const Travel5: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* BACK LINK */}
      <div className={styles.backLink}>← Go back to plans</div>

      <div className={styles.wrapper}>
        {/* LEFT SECTION */}
        <div className={styles.leftSection}>
          <h2 className={styles.heading}>Step 1:</h2>
          <h3 className={styles.subHeading}>Personal details</h3>
          <p className={styles.traveller}>Traveller 1 (19 yrs)</p>

          <form className={styles.form}>
            <div className={styles.inputRow}>
              <input type="text" placeholder="Enter full name" />
              <div className={styles.gender}>
                <button type="button" className={styles.genderBtn}>
                  <FaMale /> Male
                </button>
                <button type="button" className={styles.genderBtn}>
                  <FaFemale /> Female
                </button>
              </div>
            </div>

            <div className={styles.inputRow}>
              <input type="text" placeholder="Enter date of birth (DD-MM-YYYY)" />
              <input type="text" placeholder="Nationality" value="Indian" readOnly />
            </div>

            <div className={styles.inputRow}>
              <input type="text" placeholder="Enter passport number" />
              <select>
                <option>Select visa type</option>
                <option>Tourist/Visitor Visa</option>
                <option>Work Visa</option>
              </select>
            </div>

            <div className={styles.inputRow}>
              <input type="text" placeholder="Enter pan number" />
              <div className={styles.phoneInput}>
                <select>
                  <option>+91</option>
                </select>
                <input type="text" placeholder="Mobile number" />
              </div>
            </div>

            <p className={styles.info}>
              📩 We will share the policy copy on this number
            </p>

            {/* Nominee */}
            <h4 className={styles.nomineeHeading}>Nominee Details</h4>
            <div className={styles.inputRow}>
              <input type="text" placeholder="Enter nominee full name" />
              <select>
                <option>Select nominee relation</option>
                <option>Father</option>
                <option>Mother</option>
                <option>Spouse</option>
                <option>Other</option>
              </select>
            </div>

            <button type="submit" className={styles.continueBtn}>
              Continue
            </button>
          </form>
        </div>

        {/* RIGHT SECTION - Premium Summary */}
        <div className={styles.rightSection}>
          <h3 className={styles.summaryTitle}>Premium Summary</h3>
          <div className={styles.summaryBox}>
            <h4>Trip Details</h4>
            <div className={styles.plan}>
              <p>Plan for: Traveller 1 (19 yrs)</p>
              <div className={styles.planDetails}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/61/ICICI_Bank_Logo.svg"
                  alt="Insurance Logo"
                  className={styles.logo}
                />
                <div>
                  <p className={styles.planName}>
                    International Plus Gold Without Sublimit
                  </p>
                  <p className={styles.sumInsured}>Sum Insured: $250,000</p>
                </div>
              </div>
              <p className={styles.premium}>Premium ₹2,677/-</p>
            </div>
            <div className={styles.total}>
              <span>Total Premium</span>
              <strong>₹2,677/-</strong>
              <small>(GST included)</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Travel5;
