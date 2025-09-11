"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/pages/CommercialVehicle/choosevehicledialog.module.css";

// React Icons
import { FaTruck, FaTractor, FaBus } from "react-icons/fa";
import { MdElectricRickshaw, MdDirectionsBus } from "react-icons/md";
import { PiVanFill } from "react-icons/pi";
import { GiMineTruck } from "react-icons/gi";
import { TbBus } from "react-icons/tb";
import { RiMotorbikeFill } from "react-icons/ri";
import { BiLoader } from "react-icons/bi";

interface ChooseVehicleDialogProps {
  onClose: () => void;
  onSelectVehicle: (vehicle: string) => void;
  onBackToInfo: () => void;
  onNextToBrand: () => void;
}

const car = [
  { label: "SUV", icon: <PiVanFill size={45} /> },
  { label: "Compact car", icon: <RiMotorbikeFill size={45} /> },
  { label: "Hatchback", icon: <MdElectricRickshaw size={45} /> },
  { label: "A-segment", icon: <BiLoader size={45} /> },
  { label: "Microcar", icon: <FaTruck size={45} /> },
  { label: "Utility vehicle", icon: <GiMineTruck size={45} /> },
  { label: "D-segment", icon: <MdDirectionsBus size={45} /> },
  { label: "Minivan", icon: <FaTractor size={45} /> },
  { label: "Sedan", icon: <TbBus size={45} /> },
  { label: "Luxury car", icon: <FaBus size={45} /> },
  { label: "Coupe", icon: <RiMotorbikeFill size={45} /> },
  { label: "E-segment", icon: <FaTruck size={45} /> },
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
            <span>Choose the type of your vehicle</span>
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
                {v.icon}
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
