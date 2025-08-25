"use client";
import React, { useState } from "react";
import styles from "@/styles/pages/CommercialVehicle/VehicleModelDialog.module.css";
import { FiMapPin, FiEdit2, FiSearch } from "react-icons/fi";
import { FaTruck, FaCar } from "react-icons/fa";

interface VehicleModelDialogProps {
  onClose: () => void;
  vehicleNumber: string;
  selectedVehicle: string;
  selectedBrand: string;
  onSelectModel: (model: string) => void;   // ✅ New prop
}

const VehicleModelDialog: React.FC<VehicleModelDialogProps> = ({
  onClose,
  vehicleNumber,
  selectedVehicle,
  selectedBrand,
  onSelectModel,
}) => {
  const [search, setSearch] = useState("");

  const models = [
    "TRAX",
    "MATADOR",
    "TEMPO",
    "TEMPO TRAVELLER",
    "TEMPO TRAX",
    "TRAVELLER",
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
          </div>
        </div>

        {/* Right Section */}
        <div className={styles.right}>
          <div className={styles.header}>
            <button onClick={onClose} className={styles.backBtn}>←</button>
            <h3>Search Vehicle Model</h3>
          </div>

          {/* Search Bar */}
          <div className={styles.searchBox}>
            <FiSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search Vehicle Model"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Models List */}
          <div className={styles.modelsGrid}>
            {models
              .filter((m) =>
                m.toLowerCase().includes(search.toLowerCase())
              )
              .map((model, i) => (
                <button
                  key={i}
                  className={styles.modelBtn}
                  onClick={() => onSelectModel(model)} // ✅ Trigger next step
                >
                  {model}
                  <span className={styles.arrow}>›</span>
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleModelDialog;
