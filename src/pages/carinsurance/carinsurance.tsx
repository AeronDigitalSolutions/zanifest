"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import UserDetails from "@/components/ui/UserDetails";
import styles from "@/styles/pages/carinsurance.module.css";
import Image from "next/image";
import { FaArrowRight, FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";

function CarInsurance() {
  const router = useRouter();
  const [carNumber, setCarNumber] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <UserDetails />
      <Navbar />

      {/* Main Section */}
      <div className={styles.cont}>
        <div className={styles.imageCont}>
          <Image
            src={require("@/assets/pageImages/blackcar.png")}
            alt="car Image"
            className={styles.image}
          />
        </div>
        <div className={styles.bottom}>
          <p className={styles.heading}>
            Compare & <b className={styles.bold}>save upto 90%</b> on car
            insurance
          </p>
          <div className={styles.form}>
            <input
              type="text"
              value={carNumber}
              onChange={(e) => setCarNumber(e.target.value.toUpperCase())}
              placeholder="Enter car number (eg - DL-10-CB-1234)"
              className={styles.input}
            />

            <button
              className={styles.button}
              onClick={() => {
                router.push("./carinsurance4");
              }}
            >
              View Prices <FaArrowRight />
            </button>

            <div className={styles.newCar}>
              Brand new car?{" "}
              <button
                onClick={() => setIsModalOpen(true)}
                className={styles.linkBtn}
              >
                click here
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* 🚗 Custom Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>We have found your vehicle</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className={styles.closeBtn}
              >
                <FaTimes />
              </button>
            </div>

            <div className={styles.modalBody}>
              {/* Left side vehicle info */}
              <div className={styles.vehicleInfo}>
                <input value="DL01LAG8279" readOnly className={styles.modalInput} />
                <input value="Truck" readOnly className={styles.modalInput} />
                <input
                  value="TATA MOTORS LTD"
                  readOnly
                  className={styles.modalInput}
                />
                <input value="LPT 709" readOnly className={styles.modalInput} />
                <input
                  value="g DCR39HSD 85B6M5 TT - CNG"
                  readOnly
                  className={styles.modalInput}
                />
                <input value="2022" readOnly className={styles.modalInput} />
              </div>

              {/* Right side form */}
              <div className={styles.userStep}>
                <p className={styles.subHeading}>
                  Almost done! Just one last step
                </p>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className={styles.modalInput}
                />
                <input
                  type="text"
                  placeholder="+91"
                  className={styles.modalInput}
                />
                <button className={styles.viewBtn}>View prices</button>
                <p className={styles.policyText}>
                  By clicking on 'View prices', you agree to our{" "}
                  <Link href="#">Privacy Policy</Link> &{" "}
                  <Link href="#">Terms of Use</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CarInsurance;
