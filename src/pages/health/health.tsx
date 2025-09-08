import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/router";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import UserDetails from "@/components/ui/UserDetails";

import manicon from "@/assets/health/manicon.webp";
import styles from "@/styles/pages/health/health.module.css";

const Health3 = () => {
  const [step, setStep] = useState<number>(1);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [mobile, setMobile] = useState("");
  const [fullName, setFullName] = useState("");

  const router = useRouter();

  const cities = [
    "Delhi",
    "Bengaluru",
    "Pune",
    "Hyderabad",
    "Mumbai",
    "Thane",
    "Gurgaon",
    "Chennai",
    "Ghaziabad",
    "Ernakulam",
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, "");
    if (numericValue.length <= 10) {
      setMobile(numericValue);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const capitalized = value
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
    setFullName(capitalized);
  };

  const renderRightSection = () => {
    if (step === 1) {
      return (
        <div className={styles.rightContent}>
          <h2>Select your city</h2>
          <div className={styles.searchBar}>
            <input type="text" placeholder="Search your city" />
            <FaSearch className={styles.searchIcon} />
          </div>
          <div className={styles.popularCities}>
            {cities.map((city, idx) => (
              <button
                key={idx}
                className={`${styles.cityButton} ${
                  selectedCity === city ? styles.selectedCity : ""
                }`}
                onClick={() => setSelectedCity(city)}
              >
                {city}
              </button>
            ))}
          </div>
          <button className={styles.continueBtn} onClick={() => setStep(2)}>
            Continue
          </button>
        </div>
      );
    }

    if (step === 2) {
      return (
        <div className={styles.formSection}>
          <h2 className={styles.heading}>Save your progress</h2>
          <p className={styles.subtext}>
            Get to plans directly next time you visit us
          </p>

          <input
            type="text"
            placeholder="Your full name"
            className={styles.input}
            value={fullName}
            onChange={handleNameChange}
          />

          <div className={styles.phoneGroup}>
            <span className={styles.code}>+91</span>
            <input
              type="tel"
              placeholder="Enter mobile number"
              className={styles.mobileInput}
              inputMode="numeric"
              maxLength={10}
              value={mobile}
              onChange={handleMobileChange}
            />
          </div>

          <button className={styles.continueBtn} onClick={() => setStep(3)}>
            Continue
          </button>
        </div>
      );
    }

    if (step === 3) {
      return (
        <div className={styles.content}>
          <h2 className={styles.title}>Medical history</h2>
          <p className={styles.subtitle}>
            Do any member(s) have any existing illnesses for which they take
            regular medication?
          </p>

          <div className={styles.optionsGrid}>
            {[
              "Diabetes",
              "Blood Pressure",
              "Heart disease",
              "Any Surgery",
              "Thyroid",
              "Asthma",
              "Other disease",
              "None of these",
            ].map((option) => (
              <label className={styles.option} key={option}>
                <input type="checkbox" />
                <span>{option}</span>
              </label>
            ))}
          </div>

          <button
            className={styles.button}
            onClick={() => router.push("./health6")}
          >
            View plans ›
          </button>
        </div>
      );
    }
  };

  return (
    <div>
      <UserDetails />
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.contentWrapper}>
          <button
            className={styles.backBtn}
            onClick={() => (step > 1 ? setStep(step - 1) : router.push("./health1"))}
          >
            <IoIosArrowBack className={styles.arrowBack} />
          </button>

          <Image src={manicon} alt="User Icon" className={styles.userIcon} />
          {renderRightSection()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Health3;
