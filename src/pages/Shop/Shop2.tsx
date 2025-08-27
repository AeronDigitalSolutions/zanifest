"use client";
import React from "react";
import Image from "next/image";

// Illustrations & Logos
import shopIllustration from "@/assets/pageImages/fire_insurance.png";
import digit from "@/assets/pageImages/digit.png";
import reliance from "@/assets/pageImages/reliance.png";
import chola from "@/assets/home/chola ms.png";
import future from "@/assets/pageImages/insurance.png";

import styles from "@/styles/pages/Shop/shop2.module.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const Shop2 = () => {
  return (
    <>
    <Navbar/>
    <div className={styles.wrapper}>
      {/* LEFT SECTION */}
      <div className={styles.left}>
        <h4 className={styles.subHeading}>Shop Insurance</h4>
        <h2 className={styles.heading}>
          Get <span className={styles.highlight}>₹50 Lakh</span> cover starting
          at just <span className={styles.price}>₹3,400/year*</span>
        </h2>

        {/* Features */}
        <div className={styles.features}>
          <span>🔥 Fire & Natural Disaster</span>
          <span>🔒 Theft within 7 days of Peril Occurrence</span>
        </div>

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
        <div className={styles.card}>
          <h3 className={styles.cardHeading}>About your business</h3>

          {/* Popular business */}
          <div className={styles.businessOptions}>
            <button>Offices</button>
            <button>Shops</button>
            <button>Hospitals and Clinics</button>
            <button>Restaurants</button>
            <button>Godown Storage (non hazardous goods)</button>
            <button>Other</button>
          </div>

          {/* Owner / Tenant */}
          <p className={styles.subText}>Are you the owner or tenant?</p>
          <div className={styles.ownerTenant}>
            <div className={`${styles.option} ${styles.active}`}>
              <span>🏠</span>
              <p>Owned</p>
              <small>The person who owns the property</small>
            </div>
            <div className={styles.option}>
              <span>🔑</span>
              <p>Tenant</p>
              <small>The person who rents the property</small>
            </div>
          </div>

          {/* Continue Button */}
          <button className={styles.continueBtn}>Continue →</button>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Shop2;
