"use client";
import React from "react";
import styles from "@/styles/pages/Shop/shop1.module.css";
import Image from "next/image";

// Illustrations & Logos
import shopIllustration from "@/assets/pageImages/fire_insurance.png";
import digit from "@/assets/pageImages/digit.png";
import reliance from "@/assets/pageImages/reliance.png";
import chola from "@/assets/home/chola ms.png";
import future from "@/assets/pageImages/insurance.png";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { IoLogoWhatsapp } from "react-icons/io";

const Shop1: React.FC = () => {
  return (
    <>
    <Navbar/>
    <div className={styles.container}>
      {/* LEFT SECTION */}
      <div className={styles.left}>
        <p className={styles.subHeading}>Shop Insurance</p>
        <h1 className={styles.heading}>
          Get <span className={styles.highlight}>₹50 Lakh</span> cover starting
          at just <span className={styles.highlightRed}>₹3,400/year</span>
          <sup>+</sup>
        </h1>

        {/* Features */}
        <ul className={styles.features}>
          <li>Fire & Natural Disaster</li>
          <li>Theft within 7 days of Peril Occurrence</li>
        </ul>

        <div className={styles.middle}>
          {/* Illustration */}
          <Image
            src={shopIllustration}
            alt="Shop Fire Insurance Illustration"
            className={styles.illustration}
          />

          {/* Insurance partners */}
          <div className={styles.partnersBox}>
            <p className={styles.partnerHeading}>10+ insurance partners</p>
            <div className={styles.partnersGrid}>
              <div className={styles.partner}>
                <Image src={digit} alt="Digit" />
              </div>
              <div className={styles.partner}>
                <Image src={reliance} alt="Reliance" />
              </div>
              <div className={styles.partner}>
                <Image src={chola} alt="Chola MS" />
              </div>
              <div className={styles.partner}>
                <Image src={future} alt="Future Generali" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className={styles.right}>
        <h2 className={styles.formHeading}>
          Get free quotes in 30 seconds
        </h2>

        {/* Radio group */}
        <div className={styles.radioGroup}>
          <label>
            <input type="radio" name="shopType" defaultChecked />
            Rented Shop
          </label>
          <label>
            <input type="radio" name="shopType" />
            Owned Shop
          </label>
        </div>

        {/* Input fields */}
        <input
          type="text"
          placeholder="Enter your shop pincode"
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Enter your mobile number"
          className={styles.input}
        />

        {/* CTA */}
        <button className={styles.cta}>View Free Quotes</button>

        {/* WhatsApp line */}
        <div className={styles.whatsapp} >
          Get updates on WhatsApp
          <IoLogoWhatsapp  className={styles.whatsappIcon}/>

        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Shop1;
