import Image from "next/image";
import styles from "@/styles/pages/health/health5.module.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import manicon from "@/assets/health/manicon.webp";
import { IoIosArrowBack } from "react-icons/io";
import UserDetails from "@/components/ui/UserDetails";
import {useRouter} from 'next/router'
import { useEffect } from "react";
const health5 = () => {
  const router =useRouter();
useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, []);
  return (
    <div>
      <UserDetails />
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.avatarSection}>
            <button className={styles.backButton}onClick={() => router.push('./health4')}>
              <IoIosArrowBack size={22} />
            </button>
            <div className={styles.avatar}>
              <Image src={manicon} alt="User Icon" width={120} height={120} />
            </div>
          </div>

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

            <button className={styles.button} onClick={()=>{router.push('./health6')}}>View plans ›</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default health5;
