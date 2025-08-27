"use client";
import React, { useState } from "react";
import styles from "@/styles/pages/Home/homeinsurance2.module.css";
import { FiInfo } from "react-icons/fi";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import { MdKeyboardArrowLeft } from "react-icons/md";



const Homeinsurance2: React.FC = () => {
  const [houseValue, setHouseValue] = useState("");
  const [householdValue, setHouseholdValue] = useState("");
  const [city, setCity] = useState("");

  return (
    <div>
        <Navbar/>
    <div className={styles.container}>
      <h2 className={styles.heading}>Please help us with your property details</h2>

      {/* House Value Input */}
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="Enter current market value of your house (₹)"
          value={houseValue}
          onChange={(e) => setHouseValue(e.target.value)}
          className={styles.input}
        />
        <FiInfo className={styles.icon} />
      </div>

      {/* Most Chosen Values */}
      <p className={styles.subLabel}>Most chosen house values</p>
      <div className={styles.valueButtons}>
        <button className={styles.valueBtn}>₹1 Cr</button>
        <button className={styles.valueBtn}>₹75 L</button>
        <button className={styles.valueBtn}>₹50 L</button>
        <button className={styles.valueBtn}>₹40 L</button>
      </div>

      {/* Household Items */}
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="Value of household items (Rs.)"
          value={householdValue}
          onChange={(e) => setHouseholdValue(e.target.value)}
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
       <button className={styles.prevBtn}>
<MdKeyboardArrowLeft />
  Previous
</button>
        <button className={styles.nextBtn}>View Discounted Plans</button>
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
    <Footer/>
    </div>
  );
};

export default Homeinsurance2;
