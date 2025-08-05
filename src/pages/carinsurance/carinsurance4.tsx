import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import styles from "@/styles/pages/carinsurance4.module.css";
import carImage from "@/assets/pageImages/blackcar.png";
import "react-datepicker/dist/react-datepicker.css";
import UserDetails from "@/components/ui/UserDetails";
import { useRouter } from "next/router";

const CarInsurance4 = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [monthsShown, setMonthsShown] = useState<number>(2); // default desktop

  useEffect(() => {
    const updateMonths = () => {
      if (window.innerWidth <= 768) {
        setMonthsShown(1); // mobile
      } else {
        setMonthsShown(2); // desktop
      }
    };

    updateMonths();
    window.addEventListener("resize", updateMonths);
    return () => window.removeEventListener("resize", updateMonths);
  }, []);

  return (
    <div className={styles.mainContainer}>
      <UserDetails />
      <Navbar />

      <div className={styles.pageContainer}>
        <div className={styles.leftSection}>
          <div className={styles.outerBox}>
            <div className={styles.innerBox}>
              <div className={styles.headingBox}>
                <h2 className={styles.heading}>
                  When does your 'Own Damage' policy expire?
                </h2>
                <p className={styles.subtext}>
                  This is the policy you bought last year
                </p>
              </div>

              <div className={styles.datepickerWrapper}>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                    router.push("./carinsurance5");
                  }}
                  inline
                  monthsShown={monthsShown}
                  calendarClassName={styles.customCalendar}
                />
              </div>

              <div className={styles.helpLinkContainer}>
                <a href="#" className={styles.helpLink}>
                  Don't know policy expiry date?
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.imageContainer}>
            <Image
              src={carImage}
              alt="Car"
              className={styles.carImage}
              priority
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CarInsurance4;
