"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/pages/cardetailsdialog.module.css";



interface ChooseVehicleDialogProps {
  onClose: () => void;
  onSelectVehicle: (vehicle: string) => void;
  onBackToInfo: () => void;
  onNextToBrand: () => void;
}

const car = [
  { label: "Delhi"},
  { label: "Gurgaon"},
  { label: "Noida"},
  { label: "Faridabad"},
  { label: "Ghaziabad"},
  { label: "Meerut"},
  { label: "Agra"},
  { label: "Lucknow"},
  { label: "Kanpur"},
  { label: "Prayagraj"},
  { label: "Varanasi"},
  { label: "Aligarh"},
];

const ChoosecarDialog: React.FC<ChooseVehicleDialogProps> = ({
  onClose,
  onSelectVehicle,
  onBackToInfo,
  onNextToBrand,
}) => {
  const [active, setActive] = useState("Truck");

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        {/* Left Image */}
        <div className={styles.left}>
          <Image
            src={require("@/assets/pageImages/blackcar.png")}
            alt="car Image"
            className={styles.image}
          />
        </div>

        {/* Right Content */}
        <div className={styles.right}>
          <div className={styles.header}>
            <button className={styles.arrowBtn} onClick={onBackToInfo}>
              ‹
            </button>
            <span>Select City</span>
            <button className={styles.arrowBtn} onClick={onNextToBrand}>
              ›
            </button>
          </div>

          <div className={styles.vehicleGrid}>
            {car.map((v) => (
              <button
                key={v.label}
                onClick={() => {
                  setActive(v.label);
                  onSelectVehicle(v.label);
                }}
                className={`${styles.vehicleBtn} ${
                  active === v.label ? styles.active : ""
                }`}
              >
                <span>{v.label}</span>
              </button>
            ))}
          </div>

          <div className={styles.otherType}>
            <a href="#">Other Vehicle Type</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChoosecarDialog;
