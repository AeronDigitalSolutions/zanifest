// "use client";
import React from "react";
import styles from "@/styles/pages/CommercialVehicle/SelectionFormDialog.module.css";
import { FiEdit2, FiMapPin } from "react-icons/fi";
import { FaTruck, FaCar } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import { useRouter} from "next/router";
interface SelectionFormDialogProps {
  onClose: () => void;
  vehicleNumber: string;
  selectedVehicle: string;
  selectedBrand: string;
  selectedModel: string;
  selectedVariant: string;
  selectedYear: number;
}

const SelectionFormDialog: React.FC<SelectionFormDialogProps> = ({
  onClose,
  vehicleNumber,
  selectedVehicle,
  selectedBrand,
  selectedModel,
  selectedVariant,
  selectedYear,
}) => {
  const router = useRouter();  

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        {/* Left Section */}
        <div className={styles.left}>
          <h3 className={styles.heading}>Your selection</h3>
          <div className={styles.selectionBox}>
            <div className={styles.item}>
              <FiMapPin className={styles.icon} />
              <span>{vehicleNumber}</span>
              <FiEdit2 className={styles.editIcon} />
            </div>
            <div className={styles.item}>
              <FaTruck className={styles.icon} />
              <span>{selectedVehicle}</span>
              <FiEdit2 className={styles.editIcon} />
            </div>
            <div className={styles.item}>
              <FaCar className={styles.icon} />
              <span>{selectedBrand}</span>
              <FiEdit2 className={styles.editIcon} />
            </div>
            <div className={styles.item}>
              <FaCar className={styles.icon} />
              <span>{selectedModel}</span>
              <FiEdit2 className={styles.editIcon} />
            </div>
            <div className={styles.item}>
              <FaTruck className={styles.icon} />
              <span>{selectedVariant}</span>
              <FiEdit2 className={styles.editIcon} />
            </div>
            <div className={styles.item}>
              <BsCalendarDate className={styles.icon} />
              <span>{selectedYear}</span>
              <FiEdit2 className={styles.editIcon} />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className={styles.right}>
          <h3 className={styles.headingRight}>
            Almost done! Just one last step
          </h3>
          <input
            type="text"
            placeholder="Enter your full name"
            className={styles.inputRed}
          />
          <input
            type="text"
            placeholder="Enter your mobile number"
            className={styles.input}
          />

       
          <button
            className={styles.viewBtn}
            onClick={() => router.push("/CommercialVehicle/CommercialVehicle5")}
          >
            View prices
          </button>

          <p className={styles.policyText}>
            By clicking on 'View prices', you agree to our{" "}
            <a href="#">Privacy Policy</a> & <a href="#">Terms of Use</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelectionFormDialog;
