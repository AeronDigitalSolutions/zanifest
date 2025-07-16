import styles from "@/styles/pages/health/health4.module.css";
import Image from "next/image";
import manicon from '@/assets/health/manicon.webp';
import { IoIosArrowBack } from "react-icons/io";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import UserDetails from "@/components/ui/UserDetails";
import {useRouter} from 'next/router';
import { useEffect } from "react";
const health4 = () => {
  const router =useRouter();
useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, []);
  return (
            <div>
                     <UserDetails />
          <Navbar />
           <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.imageSection}>
          <button className={styles.backButton} onClick={() => router.push('./health3')}>
            <IoIosArrowBack size={20} />
          </button>
          <div className={styles.avatar}>
            <Image src={manicon} alt="User Icon" width={120} height={120} />
          </div>
        </div>
        <div className={styles.formSection}>
          <h2 className={styles.heading}>Save your progress</h2>
          <p className={styles.subtext}>Get to plans directly next time you visit us</p>

          <input
            type="text"
            placeholder="Your full name"
            className={styles.input}
          />

          <div className={styles.phoneGroup}>
            <select className={styles.select}>
              <option>India</option>
              <option>USA</option>
              <option>UK</option>
            </select>
            <span className={styles.code}>+91</span>
            <input
              type="tel"
              placeholder="Enter mobile number"
              className={styles.mobileInput}
            />
          </div>

          <button className={styles.continueBtn} onClick={()=>{router.push('./health5')}}>Continue</button>
        </div>
      </div>
    </div>

          <Footer />
    </div>
  );
};

export default health4;
