"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/components/superadminsidebar/createagent.module.css";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useSearchParams } from "next/navigation";

// ------------------------
// File Input Button Component
// ------------------------
interface ButtonProps {
  label: string;
  name: string;
  accept?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ label, name, accept, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else setFileName("");
    onChange(e);
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <button className={styles.documentsBtn} type="button" onClick={handleClick}>
          <span className={styles.folderContainer}>
            {/* SVG FILE UI - SAME AS OLD */}
            <svg className={styles.fileBack} width={146} height={113} viewBox="0 0 146 113" fill="none">
              <path d="M0 4C0 1.79086 1.79086 0 4 0H50.3802C51.8285 0 53.2056 0.627965 54.1553 1.72142L64.3303 13.4371C65.2799 14.5306 66.657 15.1585 68.1053 15.1585H141.509C143.718 15.1585 145.509 16.9494 145.509 19.1585V109C145.509 111.209 143.718 113 141.509 113H3.99999C1.79085 113 0 111.209 0 109V4Z" fill="url(#paint0_linear_117_4)" />
              <defs>
                <linearGradient id="paint0_linear_117_4" x1={0} y1={0} x2="72.93" y2="95.4804" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#a040fd" />
                  <stop offset={1} stopColor="#5f41f3" />
                </linearGradient>
              </defs>
            </svg>

            <svg className={styles.filePage} width={88} height={99} viewBox="0 0 88 99" fill="none">
              <rect width={88} height={99} fill="url(#paint0_linear_117_6)" />
              <defs>
                <linearGradient id="paint0_linear_117_6" x1={0} y1={0} x2={81} y2="160.5" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" />
                  <stop offset={1} stopColor="#686868" />
                </linearGradient>
              </defs>
            </svg>

            <svg className={styles.fileFront} width={160} height={79} viewBox="0 0 160 79" fill="none">
              <path d="M0.29306 12.2478C0.133905 9.38186 2.41499 6.97059 5.28537 6.97059H30.419H58.1902C59.5751 6.97059 60.9288 6.55982 62.0802 5.79025L68.977 1.18034C70.1283 0.410771 71.482 0 72.8669 0H77H155.462C157.87 0 159.733 2.1129 159.43 4.50232L150.443 75.5023C150.19 77.5013 148.489 79 146.474 79H7.78403C5.66106 79 3.9079 77.3415 3.79019 75.2218L0.29306 12.2478Z" fill="url(#paint0_linear_117_5)" />
              <defs>
                <linearGradient id="paint0_linear_117_5" x1="38.7619" y1="8.71323" x2="66.9106" y2="82.8317" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#a040fd" />
                  <stop offset={1} stopColor="#5251f2" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <p className={styles.text}>Upload File</p>
        </button>
      </div>

      {fileName && <p style={{ fontSize: "12px", marginTop: 5, color: "#555" }}>{fileName}</p>}

      <input ref={fileInputRef} type="file" name={name} accept={accept} style={{ display: "none" }} onChange={handleFileChange} />
    </div>
  );
};

// ------------------------
// MAIN COMPONENT
// ------------------------
const CreateAgent = () => {
  const searchParams = useSearchParams();
  const loginId = searchParams.get("loginId");

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    agentCode: "",
    city: "",
    district: "",
    state: "",
    pinCode: "",
    adhaarNumber: "",
    panNumber: "",
    nomineeName: "",
    nomineeRelation: "",
    nomineeAadharNumber: "",
    nomineePanNumber: "",
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    branchLocation: "",
    assignedTo: "",
  });

  const [attachments, setAttachments] = useState({
    panAttachment: null as string | null,
    adhaarAttachment: null as string | null,
    nomineePanAttachment: null as string | null,
    nomineeAadhaarAttachment: null as string | null,
    cancelledChequeAttachment: null as string | null,
  });

  const [districtManagers, setDistrictManagers] = useState<any[]>([]);

  // ------------------------
  // Prefill From AgentLogin
  // ------------------------
  useEffect(() => {
    const loadLoginDetails = async () => {
      if (!loginId) return;

      try {
        const res = await fetch(`/api/auth/fetchLogin?loginId=${loginId}`);
        const data = await res.json();

        if (!res.ok) return;

        const fullName = data.name || "";
        const parts = fullName.trim().split(" ");

        const firstName = parts[0] || "";
        const lastName = parts.slice(1).join(" ");

        setFormData((prev) => ({
          ...prev,
          firstName,
          lastName,
          email: data.email,
          password: data.password,
        }));
      } catch (err) {
        console.error("Prefill Error:", err);
      }
    };

    loadLoginDetails();
  }, [loginId]);

  // ------------------------
  // Fetch District Managers
  // ------------------------
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const res = await axios.get("/api/managers/agentDistrictDropdown");
        setDistrictManagers(res.data.managers);
      } catch (err) {
        console.error("Error fetching managers:", err);
      }
    };
    fetchManagers();
  }, []);

  // ------------------------
  // Base64 Convert
  // ------------------------
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  // ------------------------
  // Handles Form Input
  // ------------------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    let updated = value;

    if (["firstName", "lastName", "city", "district", "state"].includes(id)) {
      updated = value.charAt(0).toUpperCase() + value.slice(1);
    }

    if (id === "pinCode") updated = value.replace(/\D/g, "").slice(0, 6);

    if (id === "panNumber" || id === "nomineePanNumber")
      updated = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);

    if (id === "accountNumber") updated = value.replace(/[^0-9]/g, "");

    if (id === "adhaarNumber" || id === "nomineeAadharNumber") {
      updated = value.replace(/\D/g, "").slice(0, 12).replace(/(.{4})/g, "$1 ");
    }

    setFormData((prev) => ({ ...prev, [id]: updated }));
  };

  // ------------------------
  // File Change
  // ------------------------
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files && files[0]) {
      const base64 = await fileToBase64(files[0]);
      setAttachments((prev) => ({ ...prev, [name]: base64 }));
    }
  };

  // ------------------------
  // PINCODE Auto-fill
  // ------------------------
  const handlePincodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setFormData((prev) => ({ ...prev, pinCode: value }));

    if (value.length === 6) {
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${value}`);
        const data = await res.json();

        if (data[0]?.Status === "Success") {
          const po = data[0].PostOffice?.[0];

          setFormData((prev) => ({
            ...prev,
            city: po?.District || "",
            district: po?.Name || "",
            state: po?.State || "",
          }));
        }
      } catch (err) {
        console.error("Pincode Error:", err);
      }
    }
  };

  // ------------------------
  // Submit
  // ------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginId) {
      alert("Missing loginId. Please signup again.");
      return;
    }

    const payload = { ...formData, ...attachments, loginId };

    try {
      const res = await fetch("/api/createagent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Agent created successfully!");
      } else {
        alert(result.error || "Error creating agent.");
      }
    } catch (err) {
      console.error(err);
      alert("Submission error occurred.");
    }
  };

  // ------------------------
  // UI RENDER (OLD DESIGN EXACT SAME)
  // ------------------------
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Create Agent</h2>

      <form className={styles.form} onSubmit={handleSubmit}>

        {/* ROW 1 */}
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Agent Code</label>
            <input id="agentCode" value={formData.agentCode} onChange={handleChange} className={styles.input} required />
          </div>

          <div className={styles.formGroup}>
            <label>First Name</label>
            <input id="firstName" value={formData.firstName} onChange={handleChange} className={styles.input} required />
          </div>

          <div className={styles.formGroup}>
            <label>Last Name</label>
            <input id="lastName" value={formData.lastName} onChange={handleChange} className={styles.input} required />
          </div>
        </div>

        {/* ROW 2 */}
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input type="email" id="email" value={formData.email} onChange={handleChange} className={styles.input} required />
          </div>

          <div className={styles.formGroup}>
            <label>Phone Number</label>
            <input type="text" inputMode="numeric" id="phone" value={formData.phone}
              onChange={(e) => {
                let v = e.target.value.replace(/\D/g, "");
                if (v.length > 10) v = v.slice(0, 10);
                setFormData((prev) => ({ ...prev, phone: v }));
              }}
              className={styles.input} required />
          </div>

          <div className={styles.formGroup} style={{ position: "relative" }}>
            <label>Password</label>
            <input type={showPassword ? "text" : "password"} id="password"
              value={formData.password} onChange={handleChange}
              className={styles.input} required />

            <span className={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: "absolute", right: 10, top: 38, cursor: "pointer" }}>
              {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </span>
          </div>
        </div>

        {/* ADDRESS SECTION */}
        <h3>Address Details</h3>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Pin Code</label>
            <input id="pinCode" value={formData.pinCode} onChange={handlePincodeChange} className={styles.input} required />
          </div>

          <div className={styles.formGroup}>
            <label>City</label>
            <input id="city" value={formData.city} onChange={handleChange} className={styles.input} required />
          </div>

          <div className={styles.formGroup}>
            <label>District</label>
            <input id="district" value={formData.district} onChange={handleChange} className={styles.input} required />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>State</label>
            <input id="state" value={formData.state} onChange={handleChange} className={styles.input} required />
          </div>

          <div className={styles.formGroup}>
            <label>PAN Number</label>
            <input id="panNumber" value={formData.panNumber} onChange={handleChange} className={styles.input} />
            <Button label="Upload PAN" name="panAttachment" accept="image/*,application/pdf" onChange={handleFileChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Aadhaar Number</label>
            <input id="adhaarNumber" value={formData.adhaarNumber} onChange={handleChange} className={styles.input} />
            <Button label="Upload Aadhaar" name="adhaarAttachment" accept="image/*,application/pdf" onChange={handleFileChange} />
          </div>
        </div>

        {/* NOMINEE DETAILS */}
        <h3>Nominee Details</h3>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Nominee Name</label>
            <input id="nomineeName" value={formData.nomineeName} onChange={handleChange} className={styles.input} />
          </div>

          <div className={styles.formGroup}>
            <label>Nominee Relation</label>
            <input id="nomineeRelation" value={formData.nomineeRelation} onChange={handleChange} className={styles.input} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Nominee PAN Number</label>
            <input id="nomineePanNumber" value={formData.nomineePanNumber} onChange={handleChange} className={styles.input} />
            <Button label="Upload Nominee PAN" name="nomineePanAttachment" accept="image/*,application/pdf" onChange={handleFileChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Nominee Aadhaar Number</label>
            <input id="nomineeAadharNumber" value={formData.nomineeAadharNumber} onChange={handleChange} className={styles.input} />
            <Button label="Upload Nominee Aadhaar" name="nomineeAadhaarAttachment" accept="image/*,application/pdf" onChange={handleFileChange} />
          </div>
        </div>

        {/* BANK DETAILS */}
        <h3>Bank Details</h3>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Account Holder Name</label>
            <input id="accountHolderName" value={formData.accountHolderName} onChange={handleChange} className={styles.input} />
          </div>

          <div className={styles.formGroup}>
            <label>Bank Name</label>
            <input id="bankName" value={formData.bankName} onChange={handleChange} className={styles.input} />
          </div>

          <div className={styles.formGroup}>
            <label>Account Number</label>
            <input id="accountNumber" value={formData.accountNumber} onChange={handleChange} className={styles.input} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>IFSC Code</label>
            <input id="ifscCode" value={formData.ifscCode} onChange={handleChange} className={styles.input} />
          </div>

          <div className={styles.formGroup}>
            <label>Branch Location</label>
            <input id="branchLocation" value={formData.branchLocation} onChange={handleChange} className={styles.input} />
          </div>

          <div className={styles.formGroup}>
            <label>Upload Cancelled Cheque</label>
            <Button label="Upload Cancelled Cheque" name="cancelledChequeAttachment" accept="image/*,application/pdf" onChange={handleFileChange} />
          </div>
        </div>

        {/* ASSIGN MANAGER */}
        <div className={styles.formGroup}>
          <label>Assign to District Manager</label>
          <select id="assignedTo" value={formData.assignedTo} onChange={handleChange} className={styles.input} required>
            <option value="">Select Manager</option>
            {districtManagers.map((m) => (
              <option key={m.managerId} value={m.managerId}>
                {m.name} ({m.managerId})
              </option>
            ))}
          </select>
        </div>

        {/* SUBMIT BUTTON */}
        <div style={{ textAlign: "center" }}>
          <button type="submit" className={styles.submitButton}>Create</button>
        </div>

      </form>
    </div>
  );
};

export default CreateAgent;
