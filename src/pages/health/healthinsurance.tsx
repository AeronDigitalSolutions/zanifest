import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import UserDetails from "@/components/ui/UserDetails";
import React, { useState } from "react";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa6";
import { useRouter } from "next/router";
import styles from "@/styles/pages/healthinsurance.module.css";

const MEMBERS = [
  // Basic Members
  { id: 1, name: "Self", maleImg: require("@/assets/pageImages/health/1.webp"), femaleImg: require("@/assets/pageImages/health/2.webp") },
  { id: 2, name: "Spouse", maleImg: require("@/assets/pageImages/health/2.webp"), femaleImg: require("@/assets/pageImages/health/1.webp") },
  { id: 3, name: "Son", maleImg: require("@/assets/pageImages/health/3.webp"), femaleImg: require("@/assets/pageImages/health/3.webp") },
  { id: 4, name: "Daughter", maleImg: require("@/assets/pageImages/health/4.webp"), femaleImg: require("@/assets/pageImages/health/4.webp") },
  { id: 5, name: "Father", maleImg: require("@/assets/pageImages/health/5.webp"), femaleImg: require("@/assets/pageImages/health/5.webp") },
  { id: 6, name: "Mother", maleImg: require("@/assets/pageImages/health/6.webp"), femaleImg: require("@/assets/pageImages/health/6.webp") },
  { id: 7, name: "Grandfather", maleImg: require("@/assets/pageImages/health/5.webp"), femaleImg: require("@/assets/pageImages/health/5.webp") },
  { id: 8, name: "Grandmother", maleImg: require("@/assets/pageImages/health/6.webp"), femaleImg: require("@/assets/pageImages/health/6.webp") },
  { id: 9, name: "Father-in-law", maleImg: require("@/assets/pageImages/health/3.webp"), femaleImg: require("@/assets/pageImages/health/3.webp") },
  { id: 10, name: "Mother-in-law", maleImg: require("@/assets/pageImages/health/4.webp"), femaleImg: require("@/assets/pageImages/health/4.webp") },
];

function HealthInsurance() {
  const [selectedMan, setSelectedMan] = useState<boolean>(true); // true = Male, false = Female
  const [selectedMember, setSelectedMember] = useState<number>(0);
  const [showMore, setShowMore] = useState<boolean>(false);
  const router = useRouter();

  // Adjust names based on gender
  const getAdjustedMembers = () => {
    return MEMBERS.map((m) => {
      if (m.id === 1) {
        // Self
        return {
          ...m,
          name: "Self",
          image: selectedMan ? m.maleImg : m.femaleImg,
        };
      } else if (m.id === 2) {
        // Spouse
        return {
          ...m,
          name: selectedMan ? "Wife" : "Husband",
          image: selectedMan ? m.maleImg : m.femaleImg,
        };
      } else {
        return { ...m, image: selectedMan ? m.maleImg : m.femaleImg };
      }
    });
  };

  return (
    <div>
      <UserDetails />
      <Navbar />

      <div className={styles.cont}>
        <div className={styles.head}>
          <h2 className={styles.heading}>Find top plans for you</h2>

          <div className={styles.switchCont}>
            <button
              className={`${styles.switch} ${selectedMan ? styles.selectedSwitch : ""}`}
              onClick={() => setSelectedMan(true)}
            >
              Male
            </button>
            <button
              className={`${styles.switch} ${!selectedMan ? styles.selectedSwitch : ""}`}
              onClick={() => setSelectedMan(false)}
            >
              Female
            </button>
          </div>

          <p style={{ fontWeight: "bold" }}>Select member you want to insure</p>
        </div>

        {/* Show First 6 Members */}
        <div className={styles.middle}>
          {getAdjustedMembers()
            .slice(0, 6)
            .map((item) => (
              <button
                key={item.id}
                className={`${styles.item} ${selectedMember == item.id ? styles.selectedItem : ""}`}
                onClick={() => setSelectedMember(item.id)}
              >
                <Image src={item.image} alt={item.name} className={styles.itemImage} />
                <h3 className={styles.itemName}>{item.name}</h3>
              </button>
            ))}
        </div>

        {/* Show More Members */}
        {showMore && (
          <div className={styles.middle}>
            {getAdjustedMembers()
              .slice(6) 
              .map((item) => (
                <button
                  key={item.id}
                  className={`${styles.item} ${selectedMember == item.id ? styles.selectedItem : ""}`}
                  onClick={() => setSelectedMember(item.id)}
                >
                  <Image src={item.image} alt={item.name} className={styles.itemImage} />
                  <h3 className={styles.itemName}>{item.name}</h3>
                </button>
              ))}
          </div>
        )}

        {/* Show More Link */}
        <p
          className={styles.moreLink}
          onClick={() => setShowMore(!showMore)}
          style={{ color: "orangered", cursor: "pointer", marginTop: "10px" }}
        >
          {showMore ? "Show less" : "More members ▼"}
        </p>

        <button className={styles.continueButton} onClick={() => router.push("./health1")}>
          Continue <FaChevronRight size={10} />
        </button>

        <p className={styles.disclamir}>
          By clicking on 'Continue', you agree to our{" "}
          <b className={styles.terms}>privacy policy, terms of use</b> &{" "}
          <b className={styles.terms}>Disclaimer</b>
        </p>
      </div>

      <Footer />
    </div>
  );
}

export default HealthInsurance;
