"use client";
import React, { useState } from "react";
import styles from "@/styles/pages/CommercialVehicle/VehicleVariantDialog.module.css";
import { FiMapPin, FiSearch } from "react-icons/fi";
import { FaTruck, FaCar } from "react-icons/fa";
import { BiGasPump } from "react-icons/bi";

interface SelectFuelTypeProps {
  onClose: () => void;
  vehicleNumber: string;
  selectedVehicle: string;
  selectedBrand: string;
  selectedModel: string;
  selectedVariant: string;
  selectedFuel: string;
  onBackToModel: () => void;
  onNextToYear: () => void;
  onSelectFuel: (fuel: string) => void; // ✅ renamed
}

const SelectFuelType: React.FC<SelectFuelTypeProps> = ({
  onClose,
  vehicleNumber,
  selectedVehicle,
  selectedBrand,
  selectedModel,
  selectedVariant,
  selectedFuel,
  onBackToModel,
  onNextToYear,
  onSelectFuel,
}) => {
  const [search, setSearch] = useState("");

  const fuelTypes = [
    { name: "Petrol" },
    { name: "Diesel" },
    { name: "CNG" },
    { name: "Electric" },
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
            <div className={styles.selectionItem}>
              <FaCar className={styles.icon} /> {selectedVariant}
            </div>
            {selectedFuel && (
              <div className={styles.selectionItem}>
                <BiGasPump className={styles.icon} /> {selectedFuel}
              </div>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className={styles.right}>
          <div className={styles.header}>
            <button className={styles.arrowBtn} onClick={onBackToModel}>
              ‹
            </button>
            <span>Search Car Fuel Type</span>
            <button className={styles.arrowBtn} onClick={onNextToYear}>
              ›
            </button>
          </div>

          {/* Search Bar */}
          <div className={styles.searchBox}>
            <FiSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search car fuel type"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Fuel List */}
          <div className={styles.variantGrid}>
            {fuelTypes
              .filter((v) => v.name.toLowerCase().includes(search.toLowerCase()))
              .map((v, i) => (
                <button
                  key={i}
                  className={styles.variantBtn}
                  onClick={() => onSelectFuel(v.name)}
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

export default SelectFuelType;
