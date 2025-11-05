"use client";

import React, { useState } from "react";
import { LuUser } from "react-icons/lu";
import { RiBarChartBoxLine } from "react-icons/ri";
import { FiInfo } from "react-icons/fi";
import styles from "@/styles/components/dashboard/DashboardKyc.module.css";
import { useAuth } from "@/context/AuthContext";

interface OtpResponse {
  client_id?: string;
  status?: string;
  message?: string;
  [key: string]: any;
}

const DashboardKyc: React.FC = () => {
  const [aadhar, setAadhar] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [clientId, setClientId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { user } = useAuth();

  const handleAadharChange = (value: string) => {
    const raw = value.replace(/\D/g, "").slice(0, 12);
    const formatted = raw.replace(/(.{4})/g, "$1 ").trim();
    setAadhar(formatted);
  };

  const handleProceed = async () => {
    const cleanAadhaar = aadhar.replace(/\s/g, "");
    if (cleanAadhaar.length !== 12) {
      alert("Please enter a valid 12-digit Aadhaar number.");
      return;
    }

    try {
      const res = await fetch("/api/sendAadhaarOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aadhaarNumber: cleanAadhaar }),
      });

      const data: OtpResponse = await res.json();
      console.log("OTP Sent Response:", data);

      if (data?.client_id) {
        setClientId(data.client_id);
        setShowModal(true);
      } else {
        alert(data?.message || "Failed to send OTP. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    }
  };

  const handleOtpVerify = async () => {
    try {
      const res = await fetch("/api/verifyAadhaarOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client_id: clientId, otp }),
      });

      const data: OtpResponse = await res.json();
      console.log("OTP Verify Response:", data);

      if (data.status === "success" || data.status === "VALID") {
        alert("Aadhaar verified successfully!");
        setShowModal(false);
      } else {
        alert(data?.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    }
  };

  return (
    <div className={styles.cont}>
      <div>
        Hi, {user?.name || "User"} <LuUser />
      </div>

      <div className={styles.inner}>
        <div>
          <div className={styles.head1}>
            <RiBarChartBoxLine /> Aadhaar Verification
          </div>
          <h2 style={{ fontSize: "32px" }}>Enter Aadhaar Number</h2>
          <p>
            Please enter your 12-digit Aadhaar number to begin the verification process.
          </p>
        </div>

        <div className={styles.middle}>
          <input
            type="text"
            placeholder="Aadhaar Number"
            value={aadhar}
            onChange={(e) => handleAadharChange(e.target.value)}
            className={styles.input}
            maxLength={14}
          />
          <div className={styles.info}>
            <FiInfo />
            Your Aadhaar data is securely encrypted and protected
          </div>
        </div>

        <div className={styles.bottom}>
          <button className={styles.button} onClick={handleProceed}>
            Proceed To Verification
          </button>
          <p>By continuing, you agree to our Terms of Service and Privacy Policy.</p>
        </div>
      </div>

      {/* OTP Modal */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Enter OTP</h3>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter the OTP sent to your registered mobile"
              className={styles.input}
            />
            <div className={styles.modalButtons}>
              <button onClick={handleOtpVerify} className={styles.button}>
                Verify OTP
              </button>
              <button onClick={() => setShowModal(false)} className={styles.cancelBtn}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardKyc;
