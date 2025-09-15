"use client";
import React, { useState } from "react";
import styles from "@/styles/pages/CommercialVehicle/VehicleVariantDialog.module.css";
import { FiMapPin, FiSearch } from "react-icons/fi";
import { FaTruck, FaCar } from "react-icons/fa";

interface VehicleVariantDialogProps {
  onClose: () => void;
  vehicleNumber: string;
  selectedVehicle: string;
  selectedBrand: string;
  selectedModel: string;
  onBackToModel: () => void;
  onNextToYear: () => void;
  onSelectVariant: (variant: string) => void;
}

const VehicleVariantDialog: React.FC<VehicleVariantDialogProps> = ({
  onClose,
  vehicleNumber,
  selectedVehicle,
  selectedBrand,
  selectedModel,
  onSelectVariant,
  onBackToModel,
  onNextToYear,
}) => {
  const [search, setSearch] = useState("");

  const variants = [
    { name: "LXI" },
    { name: "VXI" },
    { name: "ZXI" },
    { name: "ZXI Plus" },
    { name: "VXI AT" },
  ];

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        {/* Left Section */}
        <div className={styles.left}>
          <h3 className={styles.leftTitle}>Your selection</h3>
          <div className={styles.selectionBox}>
            <div className={styles.selectionItem}>
              <FiMapPin className={styles.icon} /> {vehicleNumber}
            </div>
            <div className={styles.selectionItem}>
              <FaTruck className={styles.icon} /> {selectedVehicle}
            </div>
            <div className={styles.selectionItem}>
              <FaCar className={styles.icon} /> {selectedBrand}
            </div>
            <div className={styles.selectionItem}>
              <FaCar className={styles.icon} /> {selectedModel}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className={styles.right}>
          <div className={styles.header}>
            <button className={styles.arrowBtn} onClick={onBackToModel}>
              ‹
            </button>
            <span>Search Vehicle Variant</span>
            <button className={styles.arrowBtn} onClick={onNextToYear}>
              ›
            </button>
          </div>

          {/* Search Bar */}
          <div className={styles.searchBox}>
            <FiSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search Vehicle Variant"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Variant List */}
          <div className={styles.variantGrid}>
            {variants
              .filter((v) => v.name.toLowerCase().includes(search.toLowerCase()))
              .map((v, i) => (
                <button
                  key={i}
                  className={styles.variantBtn}
                  onClick={() => onSelectVariant(v.name)}
                >
                  <div className={styles.variantName}>{v.name}</div>
                  <span className={styles.arrow}></span>
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleVariantDialog;
