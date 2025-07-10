import React from "react";
import { useRouter } from 'next/router';
import styles from "@/styles/pages/health/health1.module.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import manicon from '@/assets/health/manicon.webp';
import Image from 'next/image';
import UserDetails from "@/components/ui/UserDetails";
import { IoIosArrowBack } from "react-icons/io";

const Health1 = () => {
    const router = useRouter();

  //    const handleClick = () => {
  //   router.push('./health3');
  // };

  return (
    <div>
             <UserDetails />
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.title}>Select your age</h2>
        <div className={styles.formWrapper}>
          <div className={styles.selectAge}>
            <Image src={manicon} alt="User Icon" className={styles.avatar} />

            <select className={styles.dropdown}>
              <option value="">Your age</option>
              <option value="18-25">18 - 25</option>
              <option value="26-35">26 - 35</option>
              <option value="36-45">36 - 45</option>
              <option value="46+">46+</option>
            </select>
          </div>
          <button className={styles.continueBtn} onClick={() => router.push('./health3')}>Continue ›</button>
        </div>
        <button className={styles.backBtn} onClick={() => router.push('./healthinsurance')}>
          <IoIosArrowBack className={styles.arrowBack} />
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Health1;
