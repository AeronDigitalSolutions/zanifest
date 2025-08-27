"use client";
import React, { useState } from "react";
import styles from "@/styles/pages/Home/homeinsurance.module.css";
import { FiUser, FiPhone } from "react-icons/fi";
import { div } from "framer-motion/client";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import { FaCheckCircle, FaWhatsapp } from "react-icons/fa";

const Homeinsurance: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [whatsappUpdates, setWhatsappUpdates] = useState(false);

  const handleOptionChange = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  return (
    <div>
        <Navbar/>
    <div className={styles.container}>
      <h3 className={styles.subTitle}>
        Elite protection for your house & valuables from theft & damage!
      </h3>
      <h1 className={styles.title}>
        Compare & Save <span>upto 25%*</span>
      </h1>

        <div className={styles.badges}>
      <span className={styles.badge}>
        <FaCheckCircle className={styles.badgeIcon} />
        Bank Approved
      </span>
      <span className={styles.badge}>
        <FaCheckCircle className={styles.badgeIcon} />
        Discounted Plans
      </span>
      <span className={styles.badge}>
        <FaCheckCircle className={styles.badgeIcon} />
        Free Addons
      </span>
    </div>

      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Full Name"
            className={styles.input}
          />
          <FiUser className={styles.inputIcon} />
        </div>

        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Mobile Number"
            className={styles.input}
          />
          <FiPhone className={styles.inputIcon} />
          <span className={styles.noSpam}>We don’t spam</span>
        </div>

        <div className={styles.coverSection}>
          <p className={styles.coverTitle}>
            What do you want to cover? <span>(Optional)</span>
          </p>
          <div className={styles.options}>
            {[
              "Home Structure",
              "Insurance For Loan",
              "Household Items",
              "Jewellery & Valuables",
              "Home Loan Protection",
            ].map((option) => (
              <label key={option} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleOptionChange(option)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className={styles.submitBtn}>
          View Free Quotes
        </button>
<div className={styles.whatsapp}>
        <FaWhatsapp className={styles.icon} />
        <span className={styles.label}>Get Updates on WhatsApp</span>

        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={whatsappUpdates}
            onChange={() => setWhatsappUpdates(!whatsappUpdates)}
          />
          <span className={styles.slider}></span>
        </label>
      </div>

      {/* Terms & Privacy */}
      <p className={styles.terms}>
        By clicking on “Continue”, you agree to our{" "}
        <a href="#">Privacy Policy</a> and <a href="#">Terms of Use</a>
      </p>

      
      </form>
    </div>
    <Footer/>
    </div>
  );
};

export default Homeinsurance;
