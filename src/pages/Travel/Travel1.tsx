"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import styles from "@/styles/pages/Travel/travel1.module.css";
import {
  FiShield,
  FiXCircle,
  FiBriefcase,
  FiBox,
  FiUsers,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import schengenImg from "@/assets/travel/liberty.jpg";
import usaImg from "@/assets/travel/liberty.jpg";
import germanyImg from "@/assets/travel/liberty.jpg";
import ukImg from "@/assets/travel/liberty.jpg";
import franceImg from "@/assets/travel/liberty.jpg";
import netherlandsImg from "@/assets/travel/liberty.jpg";

import AOS from "aos";
import "aos/dist/aos.css";

type Country = { name: string; img: any };

const countries: Country[] = [
  { name: "Schengen", img: schengenImg },
  { name: "USA", img: usaImg },
  { name: "Germany", img: germanyImg },
  { name: "United Kingdom", img: ukImg },
  { name: "France", img: franceImg },
  { name: "Netherlands", img: netherlandsImg },
];

function isoDate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

type CalendarProps = {
  year: number;
  month: number;
  startDate: string;
  endDate: string;
  onSelectDate: (date: string) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
};

function CalendarMonth({
  year,
  month,
  startDate,
  endDate,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
}: CalendarProps) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const days: (Date | null)[] = [];
  for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(new Date(year, month, d));
  }

  const isInRange = (d: Date) => {
    if (!startDate || !endDate) return false;
    const s = new Date(startDate);
    const e = new Date(endDate);
    return d >= s && d <= e;
  };

  const isSelected = (d: Date) =>
    (startDate && isoDate(d) === startDate) ||
    (endDate && isoDate(d) === endDate);

  return (
    <div
      className={styles.calendarMonth}
    
    >
      <div className={styles.calendarHeader}>
        <button className={styles.navBtn} onClick={onPrevMonth}>
          <FiChevronLeft />
        </button>
        <span className={styles.monthName}>
          {firstDay.toLocaleString("default", { month: "long" })} {year}
        </span>
        <button className={styles.navBtn} onClick={onNextMonth}>
          <FiChevronRight />
        </button>
      </div>
      <div className={styles.calendarGrid}>
        {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
          <div key={d} className={styles.calendarDayName}>
            {d}
          </div>
        ))}
        {days.map((d, idx) =>
          d ? (
            <button
              key={idx}
              className={`${styles.calendarDate} 
                ${isInRange(d) ? styles.inRange : ""} 
                ${isSelected(d) ? styles.selectedDate : ""}`}
              onClick={() => onSelectDate(isoDate(d))}
             
            >
              {d.getDate()}
            </button>
          ) : (
            <div key={idx} className={styles.emptyCell}></div>
          )
        )}
      </div>
    </div>
  );
}

export default function TravelInsurance() {
  const router = useRouter();

  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTravellerModal, setShowTravellerModal] = useState(false);

  const [travellers, setTravellers] = useState<number>(1);
  const [travellerAge, setTravellerAge] = useState("");
  const [medicalCondition, setMedicalCondition] = useState<string>("No");

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const toggleCountry = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  const handleSelectDate = (date: string) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate("");
    } else if (startDate && !endDate) {
      if (new Date(date) >= new Date(startDate)) {
        setEndDate(date);
      } else {
        setStartDate(date);
      }
    }
  };

  const tripDuration =
    startDate && endDate
      ? Math.ceil(
          (new Date(endDate).getTime() - new Date(startDate).getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1
      : 0;

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear((y) => y - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear((y) => y + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        {/* Left column */}
        <section className={styles.leftSection}>
          <h1 className={styles.heading}>
            Travel worry free starting at{" "}
            <span className={styles.price}>₹18/day*</span>
          </h1>
          <p className={styles.subText}>
            Instant quotes. Global coverage. Easy claims.
          </p>

          <h2 className={styles.whyHeading}>
            Why smart travellers choose insurance?
          </h2>

          <ul className={styles.featureList}>
            <li>
              <span className={`${styles.icon} ${styles.green}`}>
                <FiShield />
              </span>
              Medical emergencies
            </li>
            <li>
              <span className={`${styles.icon} ${styles.red}`}>
                <FiXCircle />
              </span>
              Flight delays or cancellations
            </li>
            <li>
              <span className={`${styles.icon} ${styles.yellow}`}>
                <FiBriefcase />
              </span>
              Lost baggage & passport
            </li>
            <li>
              <span className={`${styles.icon} ${styles.blue}`}>
                <FiBox />
              </span>
              Theft or loss of belongings
            </li>
          </ul>
        </section>

        {/* Right column */}
        <section
          className={styles.rightSection}
          aria-label="Travel form"
          data-aos="fade-left"
        >
          <h3 className={styles.formHeading}>Where are you travelling to?</h3>

          <div className={styles.searchWrap}>
            <input
              type="text"
              placeholder="Search country"
              className={styles.inputBox}
              value={query}
              onChange={(e) =>
                setQuery(
                  e.target.value.replace(/\b\w/g, (char) => char.toUpperCase())
                )
              }
            />
          </div>

          <div className={styles.popularChoices}>
            <p className={styles.popularText}>
              Popular choices{" "}
              <span className={styles.muted}>
                (You can add more than one country)
              </span>
            </p>

            <div className={styles.countryList}>
              {filteredCountries.map((c) => {
                const active = selected.includes(c.name);
                return (
                  <button
                    type="button"
                    key={c.name}
                    className={`${styles.countryCard} ${
                      active ? styles.countryActive : ""
                    }`}
                    onClick={() => toggleCountry(c.name)}
                  >
                    <Image
                      src={c.img}
                      alt={c.name}
                      className={styles.countryImg}
                      width={60}
                      height={60}
                    />
                    <span className={styles.countryName}>{c.name}</span>
                  </button>
                );
              })}
            </div>

            {selected.length > 0 && (
              <div className={styles.selectedPills}>
                {selected.map((n) => (
                  <span className={styles.pill} key={n}>
                    {n}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className={styles.dateRow}>
            <div className={styles.dateField}>
              <label className={styles.dateLabel}>Start date</label>
              <button
                type="button"
                className={styles.dateBtn}
                onClick={() => setShowCalendar(true)}
              >
                <FiCalendar />
                {startDate ? startDate : "Select date"}
              </button>
            </div>

            <div className={styles.dateField}>
              <label className={styles.dateLabel}>End date</label>
              <button
                type="button"
                className={styles.dateBtn}
                onClick={() => setShowCalendar(true)}
              >
                <FiCalendar />
                {endDate ? endDate : "Select date"}
              </button>
            </div>
          </div>

          <div className={styles.travellerBox}>
            <div className={styles.travellerLeft}>
              <FiUsers className={styles.travellerIcon} />
              <span>{travellers} Traveller(s)</span>
            </div>
            <button
              type="button"
              className={styles.addBtn}
              onClick={() => setShowTravellerModal(true)}
            >
              + Add travellers
            </button>
          </div>

          <button
            className={styles.exploreBtn}
            onClick={() => router.push("/Travel/Travel4")}
          >
            Explore Plans
          </button>
        </section>
      </div>

      <Footer />

      {/* Calendar Drawer Modal */}
      {showCalendar && (
        <div className={styles.drawerOverlay} data-aos="fade">
          <div className={styles.drawer}>
            <button
              className={styles.closeBtn}
              onClick={() => setShowCalendar(false)}
            >
              <FiXCircle />
            </button>

            <h2 className={styles.modalHeading}>
              When are you planning to travel to{" "}
              {selected.length > 0 ? selected[0] : "your destination"}?
            </h2>
            <p className={styles.modalSubtext}>
              Don’t worry, you can update dates later
            </p>

            <div className={styles.dateRow}>
              <div className={styles.dateField}>
                <label className={styles.dateLabel}>Start date</label>
                <div className={styles.dateBtn}>
                  <FiCalendar />
                  {startDate ? startDate : "Select date"}
                </div>
              </div>
              <div className={styles.dateField}>
                <label className={styles.dateLabel}>End date</label>
                <div className={styles.dateBtn}>
                  <FiCalendar />
                  {endDate ? endDate : "Select date"}
                </div>
              </div>
            </div>

            <div className={styles.calendarBox}>
              <CalendarMonth
                year={currentYear}
                month={currentMonth}
                startDate={startDate}
                endDate={endDate}
                onSelectDate={handleSelectDate}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
              />
              <CalendarMonth
                year={currentMonth === 11 ? currentYear + 1 : currentYear}
                month={(currentMonth + 1) % 12}
                startDate={startDate}
                endDate={endDate}
                onSelectDate={handleSelectDate}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
              />
            </div>

            {tripDuration > 0 && (
              <p className={styles.tripDuration}>
                Trip duration: {tripDuration} days
              </p>
            )}

            <button
              className={styles.modalContinueBtn}
              onClick={() => setShowCalendar(false)}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Travellers Drawer Modal */}
      {showTravellerModal && (
        <div className={styles.drawerOverlay}>
          <div className={styles.drawer}>
            <h2 className={styles.modalHeading}>How many travellers?</h2>
            <div className={styles.signInStrip}>
              <span>
                Insured your travel from us before?
                <br />
                <span className={styles.spantext}>
                  Sign In to fetch your saved details
                </span>
              </span>
              <button className={styles.signInBtn}>Sign in</button>
            </div>

            <div className={styles.travellerCountBtns}>
              {[1, 2, 3, 4, 5, "6+"].map((num) => (
                <button
                  key={num}
                  className={`${styles.travellerCountBtn} ${
                    travellers.toString() === num.toString()
                      ? styles.travellerActive
                      : ""
                  }`}
                  onClick={() =>
                    setTravellers(num === "6+" ? 6 : (num as number))
                  }
                >
                  {num}
                </button>
              ))}
            </div>

            <select
              className={styles.ageSelect}
              value={travellerAge}
              onChange={(e) => setTravellerAge(e.target.value)}
            >
              <option value="">Select age</option>
              {Array.from({ length: 100 }, (_, i) => i + 1).map((age) => (
                <option key={age} value={age}>
                  {age}
                </option>
              ))}
            </select>

            <p className={styles.medicalQ}>
              Do any of the travellers have pre-existing medical conditions like
              high BP, diabetes, or any other health issues?
            </p>
            <span className={styles.spantext}>
              This helps us find the right plan for you
            </span>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="medical"
                  value="Yes"
                  checked={medicalCondition === "Yes"}
                  onChange={(e) => setMedicalCondition(e.target.value)}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="medical"
                  value="No"
                  checked={medicalCondition === "No"}
                  onChange={(e) => setMedicalCondition(e.target.value)}
                />
                No
              </label>
            </div>

            <button
              className={styles.modalContinueBtn1}
              onClick={() => setShowTravellerModal(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}
