import React, { useState } from "react";
import { LuUser } from "react-icons/lu";
import { RiBarChartBoxLine } from "react-icons/ri";
import { FiInfo } from "react-icons/fi";

import styles from "@/styles/components/dashboard/DashboardKyc.module.css";

function DashboardKyc() {
  const [aadhar, setAadhar] = useState("");

  const handleAadharChange = (value: string) => {
    const raw = value.replace(/\D/g, "").slice(0, 12); // digits only, max 12
    const formatted = raw.replace(/(.{4})/g, "$1 ").trim(); // format: xxxx xxxx xxxx
    setAadhar(formatted);
  };

  return (
    <div className={styles.cont}>
      <div>
        Hi, Demo user <LuUser />
      </div>
      <div className={styles.inner}>
        <div>
          <div className={styles.head1}>
            <RiBarChartBoxLine /> Aadhaar Verification
          </div>
          <h2 style={{ fontSize: "32px" }}>Enter Aadhaar Number</h2>
          <p>
            Please enter your 12-digit Aadhaar number to begin the verification
            process.
          </p>
        </div>

        <div className={styles.middle}>
          <input
            type="text"
            placeholder="Aadhaar Number"
            value={aadhar}
            onChange={(e) => handleAadharChange(e.target.value)}
            className={styles.input}
            maxLength={14} // 12 digits + 2 spaces
          />
          <div className={styles.info}>
            <FiInfo />
            Your Aadhaar data is securely encrypted and protected
          </div>
        </div>

        <div className={styles.bottom}>
          <button className={styles.button}>Proceed To Verification</button>
          <p>
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardKyc;

