"use client";

import React, { useState } from "react";
import styles from "@/styles/pages/DoctorInd/doctorinsurance5.module.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Image from "next/image";
import { useRouter } from "next/navigation"; // ✅ Import router for navigation

import futureImg from "@/assets/doctor/Future_Generali_India_Life_Insurance_logo.jpg";
import UserDetails from "@/components/ui/UserDetails";

const ProposalForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const router = useRouter(); // ✅ Initialize router

  return (
    <>
      <UserDetails />
      <Navbar />
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          {/* ✅ Back button now navigates to DoctorInsurance2 */}
          <button
            className={styles.backBtn}
            onClick={() => router.push("DoctorInsurance2")}
          >
            ←
          </button>
          <h2 className={styles.title}>Proposal form</h2>
        </div>

        {/* Stepper */}
        <div className={styles.stepsWrapper}>
          <div className={styles.stepItem}>
            <div
              className={`${styles.circle} ${
                step > 1 ? styles.complete : step === 1 ? styles.active : ""
              }`}
            >
              {step > 1 ? "✓" : ""}
            </div>
            <div className={styles.stepText}>
              <span className={styles.stepTitle}>STEP 1</span>
              <span
                className={
                  step > 1
                    ? styles.stepComplete
                    : step === 1
                    ? styles.stepSub
                    : styles.stepSubInactive
                }
              >
                {step > 1 ? "Complete" : step === 1 ? "In process" : ""}
              </span>
            </div>
          </div>

          <div className={styles.line} />

          <div className={styles.stepItem}>
            <div
              className={`${styles.circle} ${
                step === 2 ? styles.active : step > 2 ? styles.complete : ""
              }`}
            >
              {step > 2 ? "✓" : ""}
            </div>
            <div className={styles.stepText}>
              <span className={styles.stepTitle}>STEP 2</span>
              <span
                className={
                  step === 2
                    ? styles.stepSub
                    : step > 2
                    ? styles.stepComplete
                    : styles.stepSubInactive
                }
              >
                {step === 2 ? "In process" : step > 2 ? "Complete" : "Incomplete"}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          {/* Left Section (Dynamic based on step) */}
          <div className={styles.formSection}>
            {step === 1 && (
              <>
                <h3 className={styles.subTitle}>Policy details</h3>
                <form className={styles.form}>
                  <div className={styles.row}>
                    <select className={styles.input}>
                      <option>Dr.</option>
                      <option>Mr.</option>
                      <option>Mrs.</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Insured name *"
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.row}>
                    <input
                      type="text"
                      placeholder="Date of birth *"
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.row}>
                    <input
                      type="text"
                      placeholder="Mobile *"
                      className={styles.input}
                    />
                    <input
                      type="email"
                      placeholder="Email id *"
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.row}>
                    <input
                      type="text"
                      placeholder="Address *"
                      className={styles.input}
                    />
                    <input
                      type="text"
                      placeholder="Address 2 *"
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.row}>
                    <input
                      type="text"
                      placeholder="State name"
                      className={styles.input}
                    />
                    <input
                      type="text"
                      placeholder="Pincode *"
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.row}>
                    <input
                      type="text"
                      placeholder="PAN number *"
                      className={styles.input}
                    />
                  </div>
                </form>
                <button
                  className={styles.continueBtn}
                  onClick={() => setStep(2)}
                >
                  Next
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <h3 className={styles.subTitle}>Additional details</h3>
                <form className={styles.form}>
                  <div className={styles.row}>
                    <input
                      type="text"
                      placeholder="Policy start date *"
                      className={styles.input}
                      defaultValue="21-08-2025"
                    />
                    <input
                      type="text"
                      placeholder="Policy end date *"
                      className={styles.input}
                      defaultValue="20-08-2026"
                    />
                  </div>
                  <div className={styles.row}>
                    <input
                      type="text"
                      placeholder="Territory"
                      className={styles.input}
                      defaultValue="India"
                    />
                    <input
                      type="text"
                      placeholder="Jurisdiction"
                      className={styles.input}
                      defaultValue="India"
                    />
                  </div>
                  <div className={styles.row}>
                    <input
                      type="text"
                      placeholder="Registration number *"
                      className={styles.input}
                    />
                    <input
                      type="text"
                      placeholder="Year of registration *"
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.row}>
                    <input
                      type="text"
                      placeholder="License year *"
                      className={styles.input}
                    />
                    <select className={styles.input}>
                      <option>Qualification</option>
                      <option>MBBS</option>
                      <option>MD</option>
                    </select>
                  </div>
                  <div className={styles.row}>
                    <input
                      type="text"
                      placeholder="Year of qualification *"
                      className={styles.input}
                    />
                    <input
                      type="text"
                      placeholder="Number of practice year *"
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.checkboxRow}>
                    <input type="checkbox" id="gst" />
                    <label htmlFor="gst">Add GST Number</label>
                  </div>
                </form>
                <div className={styles.row} style={{ marginTop: "1rem" }}>
                  <button
                    className={styles.backBtnNav}
                    onClick={() => setStep(1)}
                  >
                    Back
                  </button>
                  <button className={styles.continueBtn} onClick={() => router.push("DoctorInsurance7")}>Submit</button>
                </div>
              </>
            )}
          </div>

          {/* Right Section (Order Details same across steps) */}
          <div className={styles.orderSection}>
            <Image
              src={futureImg}
              alt="Future Generali"
              className={styles.logo}
            />
            <h4 className={styles.orderTitle}>Professional Indemnity</h4>
            <div className={styles.orderDetails}>
              <div>
                <span className={styles.label}>Plan name</span>
                <span className={styles.value}>Professional Indemnity</span>
              </div>
              <div>
                <span className={styles.label}>Cover amount</span>
                <span className={styles.value}>₹ 1 Crore</span>
              </div>
              <div className={styles.total}>
                <span>Total premium</span>
                <span className={styles.price}>₹ 5,553/-</span>
              </div>
            </div>
            {/* ✅ Continue button now navigates to DoctorInsurance7 */}
            <button
              className={styles.continueBtn}
              onClick={() => router.push("DoctorInsurance7")}
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProposalForm;
