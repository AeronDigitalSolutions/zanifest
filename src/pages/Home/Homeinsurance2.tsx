"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/pages/Home/homeinsurance2.module.css";
import { FiInfo } from "react-icons/fi";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

const Homeinsurance2: React.FC = () => {
  const [houseValue, setHouseValue] = useState("");
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [householdValue, setHouseholdValue] = useState("");
  const [city, setCity] = useState("");
  const router = useRouter();

  // Initialize AOS animations
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Convert number to Indian comma format
  const formatIndianNumber = (num: number) => {
    return num.toLocaleString("en-IN");
  };

  // Preset options mapping
  const presetOptions: Record<string, number> = {
    "₹1 Cr": 10000000,
    "₹75 L": 7500000,
    "₹50 L": 5000000,
    "₹40 L": 4000000,
  };

  const wordsMap: Record<string, string> = {
    "₹1 Cr": "One Crore Only",
    "₹75 L": "Seventy-Five Lakh Only",
    "₹50 L": "Fifty Lakh Only",
    "₹40 L": "Forty Lakh Only",
  };

  const [houseTextValue, setHouseTextValue] = useState("");

  // Handle preset selection
  const handleSelectValue = (value: string) => {
    const num = presetOptions[value];
    setSelectedValue(value);
    setHouseValue(formatIndianNumber(num));
    setHouseTextValue(wordsMap[value]);
  };

  // Handle manual input (clear selected preset)
  const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^\d]/g, ""); // only digits
    if (val) {
      const formatted = Number(val).toLocaleString("en-IN");
      setHouseValue(formatted);
    } else {
      setHouseValue("");
    }
    if (selectedValue) setSelectedValue(null); // deselect preset
    setHouseTextValue("");
  };

  // Handle household input and validate
  const handleHouseholdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^\d]/g, "");
    if (!val) {
      setHouseholdValue("");
      return;
    }

    const householdNum = parseInt(val);
    const houseNum = parseInt(houseValue.replace(/,/g, "")) || 0;

    if (householdNum > houseNum) {
      alert("Household value cannot be greater than the current market value!");
      return;
    }

    const formatted = Number(val).toLocaleString("en-IN");
    setHouseholdValue(formatted);
  };

  // Function to handle final submission
  const handleSubmitData = async () => {
    const step1Data = localStorage.getItem("homeInsuranceStep1");

    if (!step1Data) {
      alert("Please fill the first step first!");
      router.push("Homeinsurance");
      return;
    }

    const step1Parsed = JSON.parse(step1Data);

    const payload = {
      ...step1Parsed,
      propertyDetails: {
        houseValue,
        householdItemsValue: householdValue,
        cityName: city,
      },
    };

    try {
      const response = await fetch("/api/homeinsurance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        alert(" Data saved successfully!");
        localStorage.removeItem("homeInsuranceStep1");
        router.push("Homeinsurance3");
      } else {
        alert(" Failed to save data: " + result.message);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container} data-aos="fade-left">
        <h2 className={styles.heading}>
          Please help us with your property details
        </h2>

        {/* House Value Input */}
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Enter current market value of your house (₹)"
            value={houseValue}
            onChange={handleManualInput}
            className={styles.input}
          />
          <FiInfo className={styles.icon} />
        </div>

        {/* Display text like “One Crore Only” */}
        {houseTextValue && (
          <p className={styles.helperText}>{houseTextValue}</p>
        )}

        {/* Most Chosen Values */}
        <p className={styles.subLabel}>Most chosen house values</p>
        <div className={styles.valueButtons}>
          {Object.keys(presetOptions).map((val) => (
            <button
              key={val}
              onClick={() => handleSelectValue(val)}
              className={`${styles.valueBtn} ${
                selectedValue === val ? styles.activeValueBtn : ""
              }`}
            >
              {val}
            </button>
          ))}
        </div>

        {/* Household Items */}
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Value of household items (Rs.)"
            value={householdValue}
            onChange={handleHouseholdChange}
            className={styles.input}
          />
          <FiInfo className={styles.icon} />
        </div>

        {/* City Input */}
        <input
          type="text"
          placeholder="City name (Optional)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={styles.input}
        />

        {/* Navigation Buttons */}
        <div className={styles.buttonGroup}>
          <button
            className={styles.prevBtn}
            onClick={() => router.push("Homeinsurance")}
          >
            <MdKeyboardArrowLeft />
            Previous
          </button>

          <button className={styles.nextBtn} onClick={handleSubmitData}>
            View Discounted Plans
          </button>
        </div>

        {/* OR Divider */}
        <div className={styles.divider}>
          <span>OR</span>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottomText}>
          <span>Need insurance for entire housing society? </span>
          <a href="#">Click here</a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homeinsurance2;
