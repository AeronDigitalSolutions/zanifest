"use client";
import React, { useState } from "react";
import styles from "@/styles/pages/Shop/shop3.module.css";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";
import shriram from "@/assets/CommercialVehicle/shriram.png";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import { useRouter } from "next/navigation";
export default function Shop3() {
  const [isModalOpen, setIsModalOpen] = useState(false);
      const router = useRouter();
  return (
 // ✅ router instance
    
    <>
    <Navbar/>
    <div className={styles.container}>
      {/* Heading Section */}
      <div className={styles.header}>
        <h2>Secure Everything Inside Your Shop</h2>
        <p>
          Coverage for the essentials that keep your shop running - from
          furniture and appliances to all the goods you sell.
        </p>
      </div>

      {/* Coverage Options */}
      <div className={styles.coverOptions}>
        {[
          "5 Lakhs",
          "10 Lakhs",
          "15 Lakhs",
          "20 Lakhs",
          "25 Lakhs",
          "30 Lakhs",
          "35 Lakhs",
          "40 Lakhs",
        ].map((option, i) => (
          <button
            key={i}
            className={`${styles.coverButton} ${
              i === 0 ? styles.activeButton : ""
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Insurance Card */}
      <div className={styles.planCard}>
        <div className={styles.planHeader}>
          <Image src={shriram} alt="Shriram" className={styles.logo} />
          <h3>Rs. 590/year</h3>
          <p className={styles.gst}>GST included</p>
        </div>

        {/* Features */}
        <div className={styles.features}>
          <span className={styles.heading1}>Included Features</span>
          <p>
            <FaCheckCircle className={styles.icon} /> Fire
          </p>
          <p>
            <FaCheckCircle className={styles.icon} /> Stock or shop inventory
            coverage
          </p>
          <p>
            <FaCheckCircle className={styles.icon} /> Content Coverage
          </p>
        </div>

        {/* View More */}
        <a href="#" className={styles.viewMore}>
          View more details &gt;
        </a>
      </div>

      {/* Buttons */}
      <div className={styles.buttons}>
        <button className={styles.customize} onClick={() => setIsModalOpen(true)}
>Customize my plan</button>
        <button
          className={styles.buyNow}
               onClick={() => router.push("Shop5")}   >
          Buy now
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <>
          <div
            className={styles.overlay}
            onClick={() => setIsModalOpen(false)}
          />
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Help us assess your risks</h3>
              <button
                className={styles.closeBtn}
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Q1 */}
            <div className={styles.question}>
              <p>Buying Shop insurance for the first time?</p>
              <div className={styles.options}>
                <label>
                  <input type="radio" name="q1" /> Yes
                </label>
                <label>
                  <input type="radio" name="q1" /> No
                </label>
              </div>
            </div>

            {/* Q2 */}
            <div className={styles.question}>
              <p>
                Has your commercial property experienced any loss incidents in
                the last 3 years?
              </p>
              <div className={styles.options}>
                <label>
                  <input type="radio" name="q2" /> Yes
                </label>
                <label>
                  <input type="radio" name="q2" /> No
                </label>
              </div>
            </div>

            {/* Q3 */}
            <div className={styles.question}>
              <p>What type of construction is your property?</p>
              <div className={styles.options}>
                <label>
                  <input type="radio" name="q3" /> Pucca
                </label>
                <label>
                  <input type="radio" name="q3" /> Kuchha
                </label>
              </div>
            </div>

            {/* Q4 */}
            <div className={styles.question}>
              <p>Do you need insurance for your basement?</p>
              <div className={styles.options}>
                <label>
                  <input type="radio" name="q4" /> Yes
                </label>
                <label>
                  <input type="radio" name="q4" /> No
                </label>
              </div>
            </div>

            {/* Continue */}
            <button className={styles.continueBtn}            onClick={() => router.push("Shop5")}>
              Save &amp; Continue →
            </button>
          </div>
        </>
      )}
    </div>
    <Footer/>
    </>
  );
}
