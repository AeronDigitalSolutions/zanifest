"use client";
import { useEffect, useState, useRef } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/router";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import UserDetails from "@/components/ui/UserDetails";
import womanicon from "@/assets/pageImages/health/2.webp";
import manicon from "@/assets/health/manicon.webp";
import styles from "@/styles/pages/health/health.module.css";

const Health = () => {
  const [step, setStep] = useState<number>(1);
  const [gender, setGender] = useState<string>("male");
  const [members, setMembers] = useState<{ name: string; image: any }[]>([]);
  const [ages, setAges] = useState<{ [key: number]: string }>({});
  const [isOpenIndex, setIsOpenIndex] = useState<number | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [mobile, setMobile] = useState("");
  const [fullName, setFullName] = useState("");
  const [selectedDiseases, setSelectedDiseases] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const cities = [
    "Delhi",
    "Bengaluru",
    "Pune",
    "Hyderabad",
    "Mumbai",
    "Thane",
    "Gurgaon",
    "Chennai",
    "Ghaziabad",
    "Ernakulam",
  ];
  const ageOptions = Array.from({ length: 101 }, (_, i) => i.toString());

  // 🧠 Capture gender & selected members from query
  useEffect(() => {
    if (router.query.gender) setGender(router.query.gender as string);

    if (router.query.members) {
      try {
        const parsed = JSON.parse(router.query.members as string);
        setMembers(parsed);
      } catch {
        console.error("Error parsing members");
      }
    }
  }, [router.query]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const handleAgeSelect = (index: number, age: string) => {
    setAges((prev) => ({ ...prev, [index]: age }));
    setIsOpenIndex(null);
  };

  // 🧩 Members UI
  const renderMembers = () => (
    <div className={styles.step1MembersList}>
      {members.map((m, idx) => (
        <div key={idx} className={styles.step1MemberCard}>
          {/* Image: if m.image is a string use it, otherwise let Next/Image handle static import */}
          <Image
            src={typeof m.image === "string" ? (m.image as string) : (m.image as any)}
            alt={m.name}
            className={styles.step1MemberIcon}
          />
          <p>{m.name}</p>

          <div className={styles.step1Dropdown} ref={dropdownRef}>
            <button
              type="button"
              className={styles.step1DropdownToggle}
              onClick={() => setIsOpenIndex(isOpenIndex === idx ? null : idx)}
            >
              {ages[idx] ? `Age: ${ages[idx]}` : "Select Age"}{" "}
              <span className={`${styles.step1Arrow} ${isOpenIndex === idx ? styles.up : ""}`}>
                ▼
              </span>
            </button>

            {isOpenIndex === idx && (
              <ul className={styles.step1DropdownMenu}>
                {ageOptions.map((age) => (
                  <li
                    key={age}
                    className={ages[idx] === age ? styles.step1SelectedOption : ""}
                    onClick={() => handleAgeSelect(idx, age)}
                  >
                    {age}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  // 🧠 Submit data to backend (robust)
  const handleSubmit = async () => {
    try {
      // validation: ages for all members
      if (!members || members.length === 0) {
        alert("No members selected. Please go back and select members.");
        router.push("/healthinsurance");
        return;
      }

      for (let i = 0; i < members.length; i++) {
        const ageStr = ages[i];
        if (!ageStr) {
          alert(`Please select age for all members. Missing age for ${members[i].name}`);
          setStep(1);
          return;
        }
        const ageNum = Number(ageStr);
        if (isNaN(ageNum)) {
          alert(`Invalid age selected for ${members[i].name}`);
          setStep(1);
          return;
        }
      }

      if (!selectedCity) {
        alert("Please select a city.");
        setStep(2);
        return;
      }

      if (!fullName || fullName.trim().length < 2) {
        alert("Please enter a valid full name.");
        setStep(3);
        return;
      }

      if (!/^[0-9]\d{10}$/.test(mobile)) {
        alert("Please enter a valid 10-digit mobile number starting with 6-9.");
        setStep(3);
        return;
      }

      const payload = {
        gender,
        members: members.map((m, i) => {
          const img = typeof m.image === "string" ? m.image : (m.image as any)?.src || "";
          return {
            name: m.name,
            image: img,
            age: Number(ages[i]),
          };
        }),
        city: selectedCity || "",
        fullName,
        mobile,
        medicalHistory: selectedDiseases,
      };

      console.debug("Submitting payload:", payload);

      const res = await fetch("/api/healthinsurance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // read raw text first (robust if server returns non-json)
      const raw = await res.text();
      let data: any = null;
      try {
        data = raw ? JSON.parse(raw) : null;
      } catch (err) {
        console.warn("Response not JSON:", raw);
      }

      if (!res.ok) {
        // server returned non-2xx
        console.error("API returned non-OK:", res.status, raw);
        const message = data?.message || raw || res.statusText;
        alert("❌ Failed to save data: " + message);
        return;
      }

      // if server returned 2xx
      if (data && data.success) {
        alert("Health insurance data saved successfully!");
        router.push("./health6");
      } else {
        // if data is absent but res.ok, show raw
        const message = data?.message || raw || "Unknown response from server";
        console.error("Save response but success flag false:", data, raw);
        alert("❌ Failed to save data: " + message);
      }
    } catch (error: any) {
      console.error("Submit error:", error);
      alert("Something went wrong while saving data. " + (error?.message || ""));
    }
  };

  return (
    <div>
      <UserDetails />
      <Navbar />

      <div className={styles.wrapper}>
        <div className={styles.step1Wrapper}>
          <div className={styles.step1Header}>
            <button
              className={styles.step1BackBtn}
              onClick={() =>
                step > 1 ? setStep(step - 1) : router.push("/healthinsurance")
              }
            >
              <IoIosArrowBack />
            </button>

            {step !== 1 && (
              <Image
                src={gender === "female" ? womanicon : manicon}
                alt="User Icon"
                className={styles.userIcon}
              />
            )}
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <>
              <h2 className={styles.step1Heading}>Select Age for Each Member</h2>
              {renderMembers()}
              <button
                className={styles.step1ContinueBtn}
                onClick={() => {
                  if (Object.keys(ages).length !== members.length) {
                    alert("Please select age for all members.");
                    return;
                  }
                  setStep(2);
                }}
              >
                Continue
              </button>
            </>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className={styles.rightContent}>
              <h2>Select your city</h2>
              <div className={styles.searchBar}>
                <input
                  type="text"
                  placeholder="Search your city"
                  onChange={(e) => {
                    // optional: you can implement search to filter `cities`
                  }}
                />
                <FaSearch className={styles.searchIcon} />
              </div>
              <div className={styles.popularCities}>
                {cities.map((city, idx) => (
                  <button
                    key={idx}
                    className={`${styles.cityButton} ${selectedCity === city ? styles.selectedCity : ""}`}
                    onClick={() => setSelectedCity(city)}
                  >
                    {city}
                  </button>
                ))}
              </div>
              <button className={styles.continueBtn} onClick={() => setStep(3)}>
                Continue
              </button>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className={styles.formSection}>
              <h2 className={styles.heading}>Save your progress</h2>
              <p className={styles.subtext}>Get to plans directly next time you visit us</p>

              <input
                type="text"
                placeholder="Your full name"
                className={styles.input}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                />
              </div>

              <button className={styles.continueBtn} onClick={() => setStep(4)}>
                Continue
              </button>
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div className={styles.content}>
              <h2 className={styles.title}>Medical history</h2>
              <p className={styles.subtitle}>
                Do any member(s) have any existing illnesses for which they take regular medication?
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
                    <input
                      type="checkbox"
                      checked={selectedDiseases.includes(option)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          if (option === "None of these") {
                            setSelectedDiseases(["None of these"]);
                          } else {
                            setSelectedDiseases((prev) =>
                              prev.filter((x) => x !== "None of these").concat(option)
                            );
                          }
                        } else {
                          setSelectedDiseases((prev) => prev.filter((d) => d !== option));
                        }
                      }}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>

              <button className={styles.button} onClick={handleSubmit}>
                View plans ›
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Health;
