"use client";
import React, { useState } from "react";
import styles from "@/styles/pages/Home/homeinsurance.module.css";
import { FiUser, FiPhone } from "react-icons/fi";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import { FaCheckCircle, FaWhatsapp } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Homeinsurance: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [whatsappUpdates, setWhatsappUpdates] = useState(false);
  const router = useRouter();

  const handleOptionChange = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };
  const router = useRouter();

  // ✅ Just navigate to /homeinsurance2
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("Homeinsurance2");
  };

  return (
    <div>
      <Navbar />
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

<<<<<<< HEAD
        {/* ✅ form with navigation */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input type="text" placeholder="Full Name" className={styles.input} />
=======
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Full Name"
              className={styles.input}
            />
>>>>>>> origin/khushiinsurance20
            <FiUser className={styles.inputIcon} />
          </div>

          <div className={styles.inputGroup}>
<<<<<<< HEAD
            <input type="text" placeholder="Mobile Number" className={styles.input} />
=======
            <input
              type="text"
              placeholder="Mobile Number"
              className={styles.input}
            />
>>>>>>> origin/khushiinsurance20
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

<<<<<<< HEAD
          {/* ✅ Navigate to /homeinsurance2 */}
          <button type="submit" className={styles.submitBtn}>
            View Free Quotes
          </button>

          <div className={styles.whatsapp}>
            <FaWhatsapp className={styles.icon} />
            <span className={styles.label}>Get Updates on WhatsApp</span>
=======
          <button
            type="button" // prevent form submit
            className={styles.submitBtn}
            onClick={() => router.push("Homeinsurance2")}
          >
            View Free Quotes
          </button>
          <div className={styles.whatsapp}>
            <FaWhatsapp className={styles.icon} />
            <span className={styles.label}>Get Updates on WhatsApp</span>

>>>>>>> origin/khushiinsurance20
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={whatsappUpdates}
                onChange={() => setWhatsappUpdates(!whatsappUpdates)}
              />
              <span className={styles.slider}></span>
            </label>
          </div>

<<<<<<< HEAD
=======
          {/* Terms & Privacy */}
>>>>>>> origin/khushiinsurance20
          <p className={styles.terms}>
            By clicking on “Continue”, you agree to our{" "}
            <a href="#">Privacy Policy</a> and <a href="#">Terms of Use</a>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Homeinsurance;
