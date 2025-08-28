import React from "react";
import styles from "@/styles/pages/marine/marine.module.css";
import Image from "next/image";

// Assets
import tata from "@/assets/home/partners/2.png";
import orientalinsurance from "@/assets/home/partners/1.png";
import sbi from "@/assets/home/partners/13.png";
import hdfc from "@/assets/home/partners/4.png";
import marine from "@/assets/marine/marine-prequote-bannerv2.webp";

// Icons
import { FaCogs } from "react-icons/fa";

const Marine1: React.FC = () => {
  return (
    <section className={styles.container}>
      <div className={styles.left}>
        {/* Heading */}
        <h4 className={styles.subheading}>Marine Insurance</h4>
        <h1 className={styles.heading}>
          <span className={styles.iconWrapper}><FaCogs /></span>
          Compare and Save <span className={styles.highlight}>upto 42%</span>
          <sup>++</sup>
        </h1>

        {/* Features */}
        <div className={styles.features}>
          <span><FaCogs /> Overturning or Derailement</span>
          <span><FaCogs /> Breakage of bridge</span>
          <span><FaCogs /> Collision</span>
        </div>

        {/* Illustration */}
        <div className={styles.illustration}>
          <Image src={marine} alt="Truck and Plane" priority />
        </div>

        {/* Insurance Partners */}
        <div className={styles.partners}>
          <h3>10+ insurance partners</h3>
          <div className={styles.partnerGrid}>
            <Image src={hdfc} alt="HDFC Ergo" />
            <Image src={orientalinsurance} alt="Oriental Insurance" />
            <Image src={tata} alt="Tata AIG" />
            <Image src={sbi} alt="SBI General" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Marine1;
