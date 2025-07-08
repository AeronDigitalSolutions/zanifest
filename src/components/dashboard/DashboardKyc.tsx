import React, { useState } from "react";
import { LuUser } from "react-icons/lu";
import { RiBarChartBoxLine } from "react-icons/ri";
import { FiInfo } from "react-icons/fi";

import styles from "@/styles/components/dashboard/DashboardKyc.module.css";
import FloatingLabelInput from "../ui/FloatingLabelInput";

function DashboardKyc() {
  const [aadhar, setAadhar] = useState<any>();
  return (
    <div className={styles.cont}>
      <div>
        Hi, Demo user <LuUser />
      </div>
      <div className={styles.inner}>
        <div>
          <div className={styles.head1}>
            <RiBarChartBoxLine /> Adhaar Verification
          </div>
          <h2 style={{ fontSize: "32px" }}>Enter Aadhaar Number</h2>
          <p>
            Please enter your 12 - digit Aadhaar number to begin the
            Verification process
          </p>
        </div>
        <div className={styles.middle}>
          <FloatingLabelInput
            label="Aadhar Number"
            value={aadhar}
            onChange={setAadhar}
            id="aadhar"
            type="number"
          />
          <div className={styles.info}>
            <FiInfo />
            Your Aadhaar data is securely encrypted and protected
          </div>
        </div>
        <div className={styles.bottom}>
          <button className={styles.button}>Proceed To Verification</button>
          <p>
            By continuing, you agree to our and Terms of Service and Privacy
            Policy
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardKyc;
