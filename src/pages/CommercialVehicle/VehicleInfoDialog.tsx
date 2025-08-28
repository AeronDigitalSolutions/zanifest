"use client";
import React, { useState } from "react";
import styles from "@/styles/pages/CommercialVehicle/VehicleInfoDialog.module.css";
import { FiEdit2, FiMapPin } from "react-icons/fi";
import { FaTruck, FaCar } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import { GiGearStickPattern } from "react-icons/gi";
import { useRouter} from "next/router";

interface VehicleInfoDialogProps {
  onClose: () => void;
  onChooseVehicle: () => void; // ✅ add callback
}

const VehicleInfoDialog: React.FC<VehicleInfoDialogProps> = ({
  onClose,
  onChooseVehicle,
}) => {
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const router = useRouter();  

  return (

    <div className={styles.overlay}>
      <div className={styles.dialog}>
        {/* Left Section */}
        <div className={styles.left}>
          <h3 className={styles.heading}>✅ We have found your vehicle</h3>

          <div className={styles.infoBox}>
            <div className={styles.item}>
              <FiMapPin className={styles.icon} />
              <span>DL01LAG8279</span>
              <FiEdit2 className={styles.editIcon} />
            </div>
            <div className={styles.item}>
              <FaTruck className={styles.icon} />
              <span>Truck</span>
              <FiEdit2
                className={styles.editIcon}
                onClick={onChooseVehicle} // ✅ open ChooseVehicleDialog
              />
            </div>
            <div className={styles.item}>
              <FaCar className={styles.icon} />
              <span>TATA MOTORS LTD</span>
              <FiEdit2 className={styles.editIcon} />
            </div>
            <div className={styles.item}>
              <FaCar className={styles.icon} />
              <span>LPT 709</span>
              <FiEdit2 className={styles.editIcon} />
            </div>
            <div className={styles.item}>
              <GiGearStickPattern className={styles.icon} />
              <span>g DCR39HSD 85B6M5 TT - CNG</span>
              <FiEdit2 className={styles.editIcon} />
            </div>
            <div className={styles.item}>
              <BsCalendarDate className={styles.icon} />
              <span>2022</span>
              <FiEdit2 className={styles.editIcon} />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className={styles.right}>
          <h3 className={styles.heading}>Almost done! Just one last step</h3>

          <input
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Enter your mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className={styles.input}
          />

          <button
            className={styles.viewBtn}
            onClick={() => router.push("/CommercialVehicle/CommercialVehicle5")}
          >
            View prices
          </button>
          <p className={styles.terms}>
            By clicking on 'View prices', you agree to our{" "}
            <a href="#">Privacy Policy</a> & <a href="#">Terms of Use</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VehicleInfoDialog;
