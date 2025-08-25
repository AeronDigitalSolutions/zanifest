"use client";
import React, { useState } from "react";
import styles from "@/styles/pages/CommercialVehicle/VehicleVariantDialog.module.css";
import { FiMapPin, FiEdit2, FiSearch } from "react-icons/fi";
import { FaTruck, FaCar } from "react-icons/fa";

interface VehicleVariantDialogProps {
  onClose: () => void;
  vehicleNumber: string;
  selectedVehicle: string;
  selectedBrand: string;
  selectedModel: string;
  onSelectVariant: (variant: string) => void;   // ✅ New prop
}

const VehicleVariantDialog: React.FC<VehicleVariantDialogProps> = ({
  onClose,
  vehicleNumber,
  selectedVehicle,
  selectedBrand,
  selectedModel,
  onSelectVariant,
}) => {
  const [search, setSearch] = useState("");

  const variants = [
    { name: "35000 GVW - DIESEL", weight: "35000", seating: "3" },
    { name: "BSIV - DIESEL", weight: "35200", seating: "3" },
    { name: "CAR CARRIER GVW 35200 - DIESEL", weight: "35200", seating: "3" },
    { name: "TT CBC - DIESEL", weight: "35200", seating: "3" },
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
              <FiEdit2 className={styles.editIcon} />
            </div>
            <div className={styles.selectionItem}>
              <FaTruck className={styles.icon} /> {selectedVehicle}
              <FiEdit2 className={styles.editIcon} />
            </div>
            <div className={styles.selectionItem}>
              <FaCar className={styles.icon} /> {selectedBrand}
              <FiEdit2 className={styles.editIcon} />
            </div>
            <div className={styles.selectionItem}>
              <FaCar className={styles.icon} /> {selectedModel}
              <FiEdit2 className={styles.editIcon} />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className={styles.right}>
          <div className={styles.header}>
            <button onClick={onClose} className={styles.backBtn}>←</button>
            <h3>Search Vehicle Variant</h3>
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
                  onClick={() => onSelectVariant(v.name)}   // ✅ Trigger parent
                >
                  <div className={styles.variantName}>{v.name}</div>
                  <div className={styles.variantInfo}>
                    Weight: {v.weight} | Seating Capacity: {v.seating}
                  </div>
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
