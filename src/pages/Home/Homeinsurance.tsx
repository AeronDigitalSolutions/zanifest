"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/pages/Home/homeinsurance.module.css";
import { FiUser, FiPhone } from "react-icons/fi";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import { FaCheckCircle, FaWhatsapp } from "react-icons/fa";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";


const Homeinsurance: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [whatsappUpdates, setWhatsappUpdates] = useState(false);
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("+91 ");
  const router = useRouter();

  const handleOptionChange = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  // ✅ Just navigate to /homeinsurance2
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("Homeinsurance2");
  };

  // ✅ Full Name handler (capitalize each word)
  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // sirf letters & space
    input = input
      .split(" ")
      .filter(Boolean) // extra spaces hatao
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
    setFullName(input);
  };

  // ✅ Mobile handler
  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const prefix = "+91 ";
    let input = e.target.value;

    if (!input.startsWith(prefix)) {
      input = prefix;
    }

    const digitsOnly = input.substring(prefix.length).replace(/\D/g, "");
    const limitedDigits = digitsOnly.slice(0, 10);

    setMobile(prefix + limitedDigits);
  };
   // AOS animation
    useEffect(() => {
      AOS.init({ duration: 1000, once: true });
    }, []);
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

        {/* ✅ form with navigation */}
        <form className={styles.form} onSubmit={handleSubmit} data-aos="fade-right">
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Full Name"
              className={styles.input}
              value={fullName}
              onChange={handleFullNameChange}
            />{" "}
            <FiUser className={styles.inputIcon} />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="tel"
              placeholder="Mobile Number"
              className={styles.input}
              value={mobile}
              onChange={handleMobileChange}
              maxLength={14} // +91 + 10 digits = 14 chars
            />{" "}
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

          {/* ✅ Navigate to /homeinsurance2 */}
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
