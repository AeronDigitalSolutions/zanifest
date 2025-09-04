import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/pages/health/health1.module.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import manicon from "@/assets/health/manicon.webp";
import Image from "next/image";
import UserDetails from "@/components/ui/UserDetails";
import { IoIosArrowBack } from "react-icons/io";

const Health1 = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAge, setSelectedAge] = useState("Select Age");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (age: string) => {
    setSelectedAge(age);
    setIsOpen(false);
  };

  return (
    <div>
      <UserDetails />
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.title}>Select your age</h2>
        <div className={styles.formWrapper}>
          <div className={styles.selectAge}>
            <Image src={manicon} alt="User Icon" className={styles.avatar} />

            {/* ✅ Custom Dropdown */}
            <div className={styles.customdropdown} ref={dropdownRef}>
              <button
                type="button"
                className={styles.dropdowntoggle}
                onClick={() => setIsOpen(!isOpen)}
              >
                {selectedAge}
                <span className={`${styles.arrow} ${isOpen ? styles.up : ""}`}>
                  ▼
                </span>
              </button>

              {isOpen && (
                <ul className={styles.dropdownmenu}>
                  {["18 - 25", "26 - 35", "36 - 45", "46+"].map((age) => (
                    <li
                      key={age}
                      className={selectedAge === age ? styles.selectedOption : ""}
                      onClick={() => handleSelect(age)}
                    >
                      {age}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <button
            className={styles.continueBtn}
            onClick={() => router.push("./health3")}
          >
            Continue ›
          </button>
        </div>
        <button
          className={styles.backBtn}
          onClick={() => router.push("./healthinsurance")}
        >
          <IoIosArrowBack className={styles.arrowBack} />
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Health1;
