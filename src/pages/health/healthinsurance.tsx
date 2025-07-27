import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import UserDetails from "@/components/ui/UserDetails";
import React, { useState } from "react";
import Image from "next/image";
import { FaAngleDown, FaChevronRight } from "react-icons/fa6";
import {useRouter} from 'next/router'
import styles from "@/styles/pages/healthinsurance.module.css";
import { useEffect } from "react";
const MEMBERLIST = [
  { id: 1, name: "Self", image: require("@/assets/pageImages/health/1.webp") },
  { id: 2, name: "Spouse", image: require("@/assets/pageImages/health/2.webp") },
  { id: 3, name: "Son", image: require("@/assets/pageImages/health/3.webp") },
  {
    id: 4,
    name: "Daughter",
    image: require("@/assets/pageImages/health/4.webp"),
  },
  {
    id: 5,
    name: "Father",
    image: require("@/assets/pageImages/health/5.webp"),
  },
  {
    id: 6,
    name: "Mother",
    image: require("@/assets/pageImages/health/6.webp"),
  },
];

function healthinsurance() {
  const [selectedMan, setSelectedMan] = useState<boolean>(true);
  const [selectedMember, setSelectedMember] = useState<number>(0);
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
    }
  }, []);
  return (
    <div>
      <UserDetails />
      <Navbar />
      <div className={styles.cont}>
        <div className={styles.head}>
          <h2 className={styles.heading}>Find top plans for you</h2>
          <div className={styles.switchCont}>
            <button
              className={`${styles.switch} ${
                selectedMan ? styles.selectedSwitch : ""
              }`}
              onClick={() => {
                setSelectedMan(true);
              }}
            >
              Male
            </button>
            <button
              className={`${styles.switch} ${
                !selectedMan ? styles.selectedSwitch : ""
              }`}
              onClick={() => {
                setSelectedMan(false);
              }}
            >
              Female
            </button>
          </div>
          <p style={{ fontWeight: "bold" }}>Select member you want to insure</p>
        </div>
        <div className={styles.middle}>
          {MEMBERLIST.map((item, index) => {
            return (
              <button
                key={item.id}
                className={`${styles.item} ${
                  selectedMember == item.id ? styles.selectedItem : ""
                }`}
                onClick={() => {
                  setSelectedMember(item.id);
                }}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  className={styles.itemImage}
                />
                <h3 className={styles.itemName}>{item.name}</h3>
              </button>
            );
          })}
        </div>

        <button className={styles.continueButton} onClick={()=>{router.push('./health1')}}>
          Continue <FaChevronRight size={10} />
        </button>

        <p className={styles.disclamir}>
          By clicking on 'Continue', you agree to our{" "}
          <b className={styles.terms}> privacy policy, terms of use </b> &{" "}
          <b className={styles.terms}> Disclaimer</b>
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default healthinsurance;
