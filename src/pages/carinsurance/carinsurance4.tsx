
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import styles from "@/styles/pages/carinsurance4.module.css";
import carImage from "@/assets/pageImages/blackcar.png";
import UserDetails from "@/components/ui/UserDetails";
import { useRouter } from "next/router";
import { IoIosArrowBack } from "react-icons/io";

const daysOfWeek = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

interface GenerateMonthFn {
  (year: number, month: number): (number | string)[];
}

const generateMonth: GenerateMonthFn = (year, month) => {
  const firstDay: number = new Date(year, month, 1).getDay();
  const totalDays: number = new Date(year, month + 1, 0).getDate();

  const dates: (number | string)[] = Array(firstDay).fill(""); // empty slots before 1st
  for (let i = 1; i <= totalDays; i++) dates.push(i);

  while (dates.length % 7 !== 0) dates.push(""); // pad to full weeks

  return dates;
};

const CarInsurance4 = () => {
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [monthsShown, setMonthsShown] = useState<number>(2);
  const [currentMonth, setCurrentMonth] = useState<number>(7); // Start from August 2025

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

  const getMonthData = (offset = 0) => {
    const month = currentMonth + offset;
    const year = 2025 + Math.floor(month / 12);
    const actualMonth = month % 12;

    const label = new Date(year, actualMonth).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    const dates = generateMonth(year, actualMonth);
    return { dates, label: label.toUpperCase() };
  };

  const current = getMonthData(0);
  const next = getMonthData(1);

  return (
    <div className={styles.mainContainer}>
      <UserDetails />
      <Navbar />
 {/* <button
    className={styles.backBtn}
    onClick={() => router.push("./carinsurance2")} // or use router.back() for dynamic back
  >
    <IoIosArrowBack className={styles.arrowBack} />
  </button> */}
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
  <div className={styles.calendarWrapper}>
    {/* === Current Month === */}
    <div className={styles.calendar}>
      <div className={styles.header}>
        <span
          className={styles.arrow}
          onClick={() => setCurrentMonth((prev) => prev - 1)}
        >
          ◀
        </span>

        <span className={styles.monthYear}>{current.label}</span>

        {/* ✅ Add right arrow ONLY when showing 1 month (mobile) */}
        {monthsShown === 1 && (
          <span
            className={styles.arrow}
            onClick={() => setCurrentMonth((prev) => prev + 1)}
          >
            ▶
          </span>
        )}
      </div>

      <div className={styles.daysRow}>
        {daysOfWeek.map((day) => (
          <div key={day} className={styles.day}>
            {day}
          </div>
        ))}
        {current.dates.map((date, index) => (
          <div
            key={index}
            className={`${styles.date} ${date ? styles.clickable : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              if (date) router.push("./carinsurance5");
            }}
          >
            {date}
          </div>
        ))}
      </div>
    </div>

    {/* === Next Month (Desktop Only) === */}
    {monthsShown === 2 && (
      <div className={styles.calendar}>
        <div className={styles.header}>
          <span className={styles.monthYear}>{next.label}</span>
          <span
            className={styles.arrow}
            onClick={() => setCurrentMonth((prev) => prev + 1)}
          >
            ▶
          </span>
        </div>

        <div className={styles.daysRow}>
          {daysOfWeek.map((day) => (
            <div key={day} className={styles.day}>
              {day}
            </div>
          ))}
          {next.dates.map((date, index) => (
            <div
              key={index}
              className={`${styles.date} ${date ? styles.clickable : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                if (date) router.push("./carinsurance5");
              }}
            >
              {date}
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
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
