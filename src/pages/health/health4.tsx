import styles from "@/styles/pages/health/health4.module.css";
import Image from "next/image";
import manicon from '@/assets/health/manicon.webp';
import { IoIosArrowBack } from "react-icons/io";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import UserDetails from "@/components/ui/UserDetails";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

const Health4 = () => {
  const router = useRouter();
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, ""); // Allow only digits
    if (numericValue.length <= 10) {
      setMobile(numericValue);
    }
  };

  return (
    <div>
      <UserDetails />
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <button className={styles.backBtn} onClick={() => router.push('./health3')}>
          <IoIosArrowBack className={styles.arrowBack} />
        </button>
          <div className={styles.imageSection}>
           
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

            <button
              className={styles.continueBtn}
              onClick={() => router.push('./health5')}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Health4;
