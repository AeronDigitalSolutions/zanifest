"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/components/superadminsidebar/createagent.module.css";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useSearchParams } from "next/navigation";

// -------------------------------------------------
// NEW SIMPLE FILE UPLOAD BUTTON
// -------------------------------------------------
interface FileInputProps {
  label: string;
  name: string;
  accept?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<FileInputProps> = ({ label, name, accept, onChange }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("No file chosen");

  const handleSelect = () => fileRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else setFileName("No file chosen");

    onChange(e);
  };

  return (
    <div className={styles.simpleUploadWrapper}>
      <label className={styles.uploadLabel}>{label}</label>

      <div className={styles.simpleUploadBox}>
        <button type="button" className={styles.chooseBtn} onClick={handleSelect}>
          Choose File
        </button>
        <span className={styles.fileName}>{fileName}</span>

        <input
          ref={fileRef}
          type="file"
          name={name}
          accept={accept}
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

// -------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------
const createagent = () => {
  const searchParams = useSearchParams();
  const loginId = searchParams.get("loginId");

  const [showPassword, setShowPassword] = useState(false);

  // ✔ Agent Code removed from formData
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
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
  });

  const [attachments, setAttachments] = useState({
    panAttachment: null as string | null,
    adhaarAttachment: null as string | null,
    nomineePanAttachment: null as string | null,
    nomineeAadhaarAttachment: null as string | null,
    cancelledChequeAttachment: null as string | null,
  });

  // Prefill
  useEffect(() => {
    const loadLoginDetails = async () => {
      if (!loginId) return;

      try {
        const res = await fetch(`/api/auth/fetchLogin?loginId=${loginId}`);
        const data = await res.json();
        if (!res.ok) return;

        const fullName = data.name || "";
        const parts = fullName.trim().split(" ");

        setFormData((prev) => ({
          ...prev,
          firstName: parts[0] || "",
          lastName: parts.slice(1).join(" "),
          email: data.email,
          password: data.password,
        }));
      } catch (error) {
        console.error("Prefill error", error);
      }
    };

    loadLoginDetails();
  }, [loginId]);

  // File convert
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files && files[0]) {
      const base64 = await fileToBase64(files[0]);
      setAttachments((prev) => ({ ...prev, [name]: base64 }));
    }
  };

  // Input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // PIN Auto-fill
  const handlePincodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setFormData((prev) => ({ ...prev, pinCode: value }));

    if (value.length === 6) {
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${value}`);
        const data = await res.json();
        const po = data[0]?.PostOffice?.[0];

        if (po) {
          setFormData((prev) => ({
            ...prev,
            city: po.District,
            district: po.Name,
            state: po.State,
          }));
        }
      } catch (err) {
        console.error("Pincode error", err);
      }
    }
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      ...attachments,
      loginId,
      // agentCode removed completely
    };

    try {
      const res = await fetch("/api/createagent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) alert("Agent created successfully!");
      else alert(result.error || "Error creating agent");
    } catch (error) {
      console.error(error);
      alert("Unexpected error");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Create Agent</h2>

      <form className={styles.form} onSubmit={handleSubmit}>

        {/* PERSONAL DETAILS */}
        <div className={styles.row}>
          {/* ✔ Agent Code removed completely */}
          
          <div className={styles.formGroup}>
            <label>First Name</label>
            <input id="firstName" value={formData.firstName} className={styles.input} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Last Name</label>
            <input id="lastName" value={formData.lastName} className={styles.input} onChange={handleChange} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input id="email" type="email" value={formData.email} className={styles.input} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Phone</label>
            <input id="phone" className={styles.input} value={formData.phone} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Password</label>

            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
              />

              <span className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </span>
            </div>
          </div>
        </div>

        {/* ADDRESS SECTION */}
        <h3>Address Details</h3>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Pin Code</label>
            <input id="pinCode" className={styles.input} value={formData.pinCode} onChange={handlePincodeChange} />
          </div>

          <div className={styles.formGroup}>
            <label>City</label>
            <input id="city" className={styles.input} value={formData.city} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>District</label>
            <input id="district" className={styles.input} value={formData.district} onChange={handleChange} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>State</label>
            <input id="state" className={styles.input} value={formData.state} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>PAN Number</label>
            <input id="panNumber" className={styles.input} value={formData.panNumber} onChange={handleChange} />

            <FileInput label="Upload PAN" name="panAttachment" onChange={handleFileChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Aadhaar Number</label>
            <input id="adhaarNumber" className={styles.input} value={formData.adhaarNumber} onChange={handleChange} />

            <FileInput label="Upload Aadhaar" name="adhaarAttachment" onChange={handleFileChange} />
          </div>
        </div>

        {/* NOMINEE DETAILS */}
        <h3>Nominee Details</h3>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Nominee Name</label>
            <input id="nomineeName" className={styles.input} value={formData.nomineeName} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Nominee Relation</label>
            <input id="nomineeRelation" className={styles.input} value={formData.nomineeRelation} onChange={handleChange} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Nominee PAN Number</label>
            <input id="nomineePanNumber" className={styles.input} value={formData.nomineePanNumber} onChange={handleChange} />
            <FileInput label="Upload Nominee PAN" name="nomineePanAttachment" onChange={handleFileChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Nominee Aadhaar Number</label>
            <input id="nomineeAadharNumber" className={styles.input} value={formData.nomineeAadharNumber} onChange={handleChange} />
            <FileInput label="Upload Nominee Aadhaar" name="nomineeAadhaarAttachment" onChange={handleFileChange} />
          </div>
        </div>

        {/* BANK DETAILS */}
        <h3>Bank Details</h3>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Account Holder Name</label>
            <input id="accountHolderName" className={styles.input} value={formData.accountHolderName} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Bank Name</label>
            <input id="bankName" className={styles.input} value={formData.bankName} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Account Number</label>
            <input id="accountNumber" className={styles.input} value={formData.accountNumber} onChange={handleChange} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>IFSC Code</label>
            <input id="ifscCode" className={styles.input} value={formData.ifscCode} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Branch Location</label>
            <input id="branchLocation" className={styles.input} value={formData.branchLocation} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Upload Cancelled Cheque</label>
            <FileInput label="Upload Cancelled Cheque" name="cancelledChequeAttachment" onChange={handleFileChange} />
          </div>
        </div>

        {/* SUBMIT */}
        <div style={{ textAlign: "center" }}>
          <button className={styles.submitButton} type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default createagent;
