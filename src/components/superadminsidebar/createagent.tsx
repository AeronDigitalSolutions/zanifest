// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import styles from "@/styles/components/superadminsidebar/createagent.module.css";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import { useSearchParams } from "next/navigation";

// /* ================= TYPES ================= */
// type FormDataType = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   phone: string;
//   city: string;
//   district: string;
//   state: string;
//   pinCode: string;
//   adhaarNumber: string;
//   panNumber: string;
//   nomineeName: string;
//   nomineeRelation: string;
//   nomineeAadharNumber: string;
//   nomineePanNumber: string;
//   accountHolderName: string;
//   bankName: string;
//   accountNumber: string;
//   ifscCode: string;
//   branchLocation: string;
// };

// type AttachmentType = {
//   panAttachment: string | null;
//   adhaarAttachment: string | null;
//   nomineePanAttachment: string | null;
//   nomineeAadhaarAttachment: string | null;
//   cancelledChequeAttachment: string | null;
// };

// /* ================= FILE INPUT ================= */
// interface FileInputProps {
//   label: string;
//   name: keyof AttachmentType;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// const FileInput: React.FC<FileInputProps> = ({ label, name, onChange }) => {
//   const fileRef = useRef<HTMLInputElement>(null);
//   const [fileName, setFileName] = useState("No file chosen");

//   return (
//     <div className={styles.simpleUploadWrapper}>
//       <label className={styles.uploadLabel}>{label}</label>
//       <div className={styles.simpleUploadBox}>
//         <button
//           type="button"
//           className={styles.chooseBtn}
//           onClick={() => fileRef.current?.click()}
//         >
//           Choose File
//         </button>
//         <span className={styles.fileName}>{fileName}</span>
//         <input
//           ref={fileRef}
//           type="file"
//           name={name}
//           style={{ display: "none" }}
//           onChange={(e) => {
//             if (e.target.files?.[0]) setFileName(e.target.files[0].name);
//             onChange(e);
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// /* ================= MAIN ================= */
// const createagent = () => {
//   const searchParams = useSearchParams();
//   const loginId = searchParams.get("loginId");
//   const isEditMode = searchParams.get("mode") === "edit";

//   const [showPassword, setShowPassword] = useState(false);
//   const [rejectedFields, setRejectedFields] = useState<(keyof FormDataType)[]>(
//     []
//   );

//   const [formData, setFormData] = useState<FormDataType>({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     phone: "",
//     city: "",
//     district: "",
//     state: "",
//     pinCode: "",
//     adhaarNumber: "",
//     panNumber: "",
//     nomineeName: "",
//     nomineeRelation: "",
//     nomineeAadharNumber: "",
//     nomineePanNumber: "",
//     accountHolderName: "",
//     bankName: "",
//     accountNumber: "",
//     ifscCode: "",
//     branchLocation: "",
//   });

//   const [attachments, setAttachments] = useState<AttachmentType>({
//     panAttachment: null,
//     adhaarAttachment: null,
//     nomineePanAttachment: null,
//     nomineeAadhaarAttachment: null,
//     cancelledChequeAttachment: null,
//   });

//   /* ================= FIELD LOCK ================= */
//   const isLocked = (field: keyof FormDataType) =>
//     isEditMode && rejectedFields.length > 0 && !rejectedFields.includes(field);

//   /* ================= PREFILL ================= */
//   // ================= PREFILL FOR FIRST-TIME AGENT =================
//   useEffect(() => {
//     if (!loginId || isEditMode) return;

//     const loadLoginData = async () => {
//       try {
//         const res = await fetch(`/api/auth/fetchLogin?loginId=${loginId}`);
//         const data = await res.json();
//         if (!res.ok) return;

//         const fullName = data.name || "";
//         const parts = fullName.split(" ");

//         setFormData((prev) => ({
//           ...prev,
//           firstName: parts[0] || "",
//           lastName: parts.slice(1).join(" "),
//           email: data.email,
//           password: data.password,
//         }));
//       } catch (err) {
//         console.error("Login prefill error", err);
//       }
//     };

//     loadLoginData();
//   }, [loginId, isEditMode]);
//   // ================= PREFILL FOR REJECTED AGENT (EDIT MODE) =================
//   useEffect(() => {
//     if (!loginId || !isEditMode) return;

//     const loadRejectedAgent = async () => {
//       try {
//         const res = await fetch(`/api/agent/by-loginId?loginId=${loginId}`);
//         const data = await res.json();
//         if (!res.ok) return;

//         setFormData((prev) => ({
//           ...prev,
//           ...data.agent, // 🔥 full agent data
//         }));

//         setRejectedFields(data.agent.rejectedFields || []);
//       } catch (err) {
//         console.error("Edit-mode prefill error", err);
//       }
//     };

//     loadRejectedAgent();
//   }, [loginId, isEditMode]);

//   /* ================= PINCODE (🔥 FIXED) ================= */
//   const handlePincodeChange = async (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const value = e.target.value.replace(/\D/g, "").slice(0, 6);
//     setFormData((prev) => ({ ...prev, pinCode: value }));

//     if (value.length === 6) {
//       const res = await fetch(`https://api.postalpincode.in/pincode/${value}`);
//       const data = await res.json();
//       const po = data[0]?.PostOffice?.[0];
//       if (po) {
//         setFormData((prev) => ({
//           ...prev,
//           city: po.District,
//           district: po.Name,
//           state: po.State,
//         }));
//       }
//     }
//   };

//   /* ================= FILE ================= */
//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const key = e.target.name as keyof AttachmentType;
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = () => {
//       setAttachments((prev) => ({ ...prev, [key]: reader.result as string }));
//     };
//     reader.readAsDataURL(file);
//   };

//   /* ================= INPUT ================= */
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const id = e.target.id as keyof FormDataType;
//     setFormData((prev) => ({ ...prev, [id]: e.target.value }));
//   };

//   /* ================= ATTACHMENT MAP (🔥 CRITICAL FIX) ================= */
//   const attachmentMap: Partial<
//     Record<keyof FormDataType, keyof AttachmentType>
//   > = {
//     panNumber: "panAttachment",
//     adhaarNumber: "adhaarAttachment",
//     nomineePanNumber: "nomineePanAttachment",
//     nomineeAadharNumber: "nomineeAadhaarAttachment",
//   };

//   /* ================= SUBMIT ================= */
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const payload = isEditMode
//       ? rejectedFields.reduce(
//           (acc, field) => {
//             acc[field] = formData[field];
//             const attachmentKey = attachmentMap[field];
//             if (attachmentKey && attachments[attachmentKey]) {
//               acc[attachmentKey] = attachments[attachmentKey];
//             }
//             return acc;
//           },
//           { loginId } as any
//         )
//       : { ...formData, ...attachments, loginId };

//     const res = await fetch("/api/createagent", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     const data = await res.json();
//     alert(res.ok ? "Application submitted successfully" : data.error);
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.heading}>Create Agent</h2>

//       <form className={styles.form} onSubmit={handleSubmit}>
//         {/* PERSONAL DETAILS */}
//         <div className={styles.row}>
//           {/* ✔ Agent Code removed completely */}

//           <div className={styles.formGroup}>
//             <label>First Name</label>
//             <input
//               id="firstName"
//               value={formData.firstName}
//               disabled={isLocked("firstName")}
//               className={styles.input}
//               onChange={handleChange}
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label>Last Name</label>
//             <input
//               id="lastName"
//               value={formData.lastName}
//               disabled={isLocked("lastName")}
//               className={styles.input}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         <div className={styles.row}>
//           <div className={styles.formGroup}>
//             <label>Email</label>
//             <input
//               id="email"
//               type="email"
//               disabled={isEditMode}
//               value={formData.email}
//               className={styles.input}
//               onChange={handleChange}
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label>Phone</label>
//             <input
//               id="phone"
//               className={styles.input}
//               disabled={isLocked("phone")}
//               value={formData.phone}
//               onChange={handleChange}
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label>Password</label>

//             <div className={styles.passwordWrapper}>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 value={formData.password}
//                 // disabled={false}
//                 disabled={isLocked("password")}
//                 onChange={handleChange}
//                 className={styles.input}
//               />

//               <span
//                 className={styles.eyeIcon}
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* ADDRESS SECTION */}
//         <h3>Address Details</h3>

//         <div className={styles.row}>
//           <div className={styles.formGroup}>
//             <label>Pin Code</label>
//             <input
//               id="pinCode"
//               className={styles.input}
//               disabled={isLocked("pinCode")}
//               value={formData.pinCode}
//               onChange={handlePincodeChange}
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label>City</label>
//             <input
//               id="city"
//               className={styles.input}
//               value={formData.city}
//               disabled={isLocked("city")}
//               onChange={handleChange}
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label>District</label>
//             <input
//               id="district"
//               className={styles.input}
//               value={formData.district}
//               disabled={isLocked("district")}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         <div className={styles.row}>
//           <div className={styles.formGroup}>
//             <label>State</label>
//             <input
//               id="state"
//               className={styles.input}
//               value={formData.state}
//               onChange={handleChange}
//               disabled={isLocked("state")}
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label>PAN Number</label>
//             <input
//               id="panNumber"
//               className={styles.input}
//               // disabled={!rejectedFields.includes("panNumber")}
//               disabled={isEditMode && !rejectedFields.includes("panNumber")}
//               value={formData.panNumber}
//               onChange={handleChange}
//             />

//             <FileInput
//               label="Upload PAN"
//               name="panAttachment"
//               onChange={handleFileChange}
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label>Aadhaar Number</label>
//             <input
//               id="adhaarNumber"
//               className={styles.input}
//               // disabled={!rejectedFields.includes("adhaarNumber")}
//               disabled={isEditMode && !rejectedFields.includes("adhaarNumber")}
//               value={formData.adhaarNumber}
//               onChange={handleChange}
//             />

//             <FileInput
//               label="Upload Aadhaar"
//               name="adhaarAttachment"
//               onChange={handleFileChange}
//             />
//           </div>
//         </div>

//         {/* NOMINEE DETAILS */}
//         <h3>Nominee Details</h3>

//         <div className={styles.row}>
//           <div className={styles.formGroup}>
//             <label>Nominee Name</label>
//             <input
//               id="nomineeName"
//               disabled={isLocked("nomineeName")}
//               className={styles.input}
//               value={formData.nomineeName}
//               onChange={handleChange}
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label>Nominee Relation</label>
//             <input
//               id="nomineeRelation"
//               className={styles.input}
//               disabled={isLocked("nomineeRelation")}
//               value={formData.nomineeRelation}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         <div className={styles.row}>
//           <div className={styles.formGroup}>
//             <label>Nominee PAN Number</label>
//             <input
//               id="nomineePanNumber"
//               disabled={isLocked("nomineePanNumber")}
//               className={styles.input}
//               value={formData.nomineePanNumber}
//               onChange={handleChange}
//             />
//             <FileInput
//               label="Upload Nominee PAN"
//               name="nomineePanAttachment"
//               onChange={handleFileChange}
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label>Nominee Aadhaar Number</label>
//             <input
//               id="nomineeAadharNumber"
//               disabled={isLocked("nomineeAadharNumber")}
//               className={styles.input}
//               value={formData.nomineeAadharNumber}
//               onChange={handleChange}
//             />
//             <FileInput
//               label="Upload Nominee Aadhaar"
//               name="nomineeAadhaarAttachment"
//               onChange={handleFileChange}
//             />
//           </div>
//         </div>

//         {/* BANK DETAILS */}
//         <h3>Bank Details</h3>

//         <div className={styles.row}>
//           <div className={styles.formGroup}>
//             <label>Account Holder Name</label>
//             <input
//               id="accountHolderName"
//               disabled={isLocked("accountHolderName")}
//               className={styles.input}
//               value={formData.accountHolderName}
//               onChange={handleChange}
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label>Bank Name</label>
//             <input
//               id="bankName"
//               className={styles.input}
//               disabled={isLocked("bankName")}
//               value={formData.bankName}
//               onChange={handleChange}
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label>Account Number</label>
//             <input
//               id="accountNumber"
//               disabled={isLocked("accountNumber")}
//               className={styles.input}
//               value={formData.accountNumber}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         <div className={styles.row}>
//           <div className={styles.formGroup}>
//             <label>IFSC Code</label>
//             <input
//               id="ifscCode"
//               disabled={isLocked("ifscCode")}
//               className={styles.input}
//               value={formData.ifscCode}
//               onChange={handleChange}
//             />
//           </div>
// {/* -------- */}
//           <div className={styles.formGroup}>
//             <label>Branch Location</label>
//             <input
//               id="branchLocation"
//               disabled={isLocked("branchLocation")}
//               className={styles.input}
//               value={formData.branchLocation}
//               onChange={handleChange}
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label>Upload Cancelled Cheque</label>
//             <FileInput
//               label="Upload Cancelled Cheque"
//               name="cancelledChequeAttachment"
//               onChange={handleFileChange}
//             />
//           </div>
//         </div>

//         {/* SUBMIT */}
//         <div style={{ textAlign: "center" }}>
//           <button className={styles.submitButton} type="submit">
//             {isEditMode ? "Resubmit" : "Create"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default createagent;

"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/components/superadminsidebar/createagent.module.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

/* ================= TYPES ================= */
type FormDataType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  city: string;
  district: string;
  state: string;
  pinCode: string;
  adhaarNumber: string;
  panNumber: string;
  nomineeName: string;
  nomineeRelation: string;
  nomineeAadharNumber: string;
  nomineePanNumber: string;
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  branchLocation: string;
};
type AttachmentType = {
  panAttachment: string | null;
  panFileName?: string;

  adhaarAttachment: string | null;
  adhaarFileName?: string;

  nomineePanAttachment: string | null;
  nomineePanFileName?: string;

  nomineeAadhaarAttachment: string | null;
  nomineeAadhaarFileName?: string;

  cancelledChequeAttachment: string | null;
  cancelledChequeFileName?: string;
};

/* ================= FILE INPUT ================= */
interface FileInputProps {
  label: string;
  name: keyof AttachmentType;
  fileName?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<FileInputProps> = ({
  label,
  name,
  fileName,
  onChange,
}) => {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.simpleUploadWrapper}>
      <label>{label}</label>

      <div className={styles.simpleUploadBox}>
        <button type="button" onClick={() => fileRef.current?.click()}>
          Choose File
        </button>

        <span title={fileName || "No file chosen"}>
          {fileName || "No file chosen"}
        </span>

        <input
          ref={fileRef}
          type="file"
          name={name}
          hidden
          onChange={onChange}
        />
      </div>
    </div>
  );
};


/* ================= MAIN ================= */
const CreateAgent = () => {
  const searchParams = useSearchParams();
  const loginId = searchParams.get("loginId");
  const isEditMode = searchParams.get("mode") === "edit";
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [rejectedFields, setRejectedFields] = useState<(keyof FormDataType)[]>(
    []
  );

  const router = useRouter();

  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<FormDataType>({
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
  const isLocked = (field: keyof FormDataType) => {
    if (!isEditMode) return false;
    if (rejectedFields.length === 0) return true;
    return !rejectedFields.includes(field);
  };

  const [attachments, setAttachments] = useState<AttachmentType>({
    panAttachment: null,
    adhaarAttachment: null,
    nomineePanAttachment: null,
    nomineeAadhaarAttachment: null,
    cancelledChequeAttachment: null,
  });
  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = "Required";
      if (!formData.lastName) newErrors.lastName = "Required";
      if (!formData.phone) newErrors.phone = "Required";
      if (!formData.password) newErrors.password = "Required";
    }

    if (step === 2) {
      if (!formData.pinCode) newErrors.pinCode = "Required";
      if (!formData.panNumber) newErrors.panNumber = "Required";
      if (!formData.adhaarNumber) newErrors.adhaarNumber = "Required";
      if (!attachments.panAttachment)
        newErrors.panAttachment = "Upload required";
      if (!attachments.adhaarAttachment)
        newErrors.adhaarAttachment = "Upload required";
    }

    if (step === 3) {
      if (!formData.nomineeName) newErrors.nomineeName = "Required";
      if (!formData.nomineeRelation) newErrors.nomineeRelation = "Required";
      if (!formData.nomineePanNumber) newErrors.nomineePanNumber = "Required";
      if (!formData.nomineeAadharNumber)
        newErrors.nomineeAadharNumber = "Required";
    }

    if (step === 4) {
      if (!formData.accountHolderName) newErrors.accountHolderName = "Required";
      if (!formData.bankName) newErrors.bankName = "Required";
      if (!formData.accountNumber) newErrors.accountNumber = "Required";
      if (!formData.ifscCode) newErrors.ifscCode = "Required";
        if (!formData.branchLocation) newErrors.branchLocation = "Required";
      if (!attachments.cancelledChequeAttachment)
        newErrors.cancelledChequeAttachment = "Upload required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= PREFILL LOGIN DATA ================= */
  useEffect(() => {
    if (!loginId) return;

    fetch(`/api/auth/fetchLogin?loginId=${loginId}`)
      .then((r) => r.json())
      .then((d) => {
        const parts = (d.name || "").split(" ");
        setFormData((p) => ({
          ...p,
          firstName: p.firstName || parts[0] || "",
          lastName: p.lastName || parts.slice(1).join(" "),
          email: p.email || d.email || "",
          password: p.password || d.password || "",
        }));
      });
  }, [loginId]);

  /* ================= PREFILL REJECTED AGENT ================= */
  useEffect(() => {
    if (!loginId || !isEditMode) return;

    fetch(`/api/agent/by-loginId?loginId=${loginId}`)
      .then((r) => r.json())
      .then((d) => {
        if (!d?.agent) return;
        setFormData((p) => ({ ...p, ...d.agent }));
        setRejectedFields(d.agent.rejectedFields || []);
      });
  }, [loginId, isEditMode]);

  /* ================= HANDLERS ================= */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id as keyof FormDataType;
    setFormData((p) => ({ ...p, [id]: e.target.value }));
  };
  const handlePincodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setFormData((p) => ({ ...p, pinCode: value }));

    if (value.length === 6) {
      const res = await fetch(`https://api.postalpincode.in/pincode/${value}`);
      const data = await res.json();
      const po = data[0]?.PostOffice?.[0];
      if (po) {
        setFormData((p) => ({
          ...p,
          city: po.District,
          district: po.Name,
          state: po.State,
        }));
      }
    }
  };
const shortFileName = (name: string, limit = 5) => {
  if (!name) return "";
  const extIndex = name.lastIndexOf(".");
  const ext = extIndex !== -1 ? name.slice(extIndex) : "";
  const base = name.slice(0, extIndex !== -1 ? extIndex : name.length);

  return base.length > limit
    ? base.slice(0, limit) + "..." + ext
    : name;
};

 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const key = e.target.name as keyof AttachmentType;
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    setAttachments((p) => ({
      ...p,
      [key]: reader.result as string,

      // 👇 filename limited to 5 letters
      [`${key.replace("Attachment", "")}FileName`]: shortFileName(file.name),
    }));
  };

  reader.readAsDataURL(file);
};


  /* ================= VALIDATION ================= */
  const validateBeforeSubmit = () => {
    const requiredFields: (keyof FormDataType)[] = [
      "firstName",
      "lastName",
      "phone",
      "pinCode",
      "panNumber",
      "adhaarNumber",
      "nomineeName",
      "nomineeRelation",
      "nomineePanNumber",
      "nomineeAadharNumber",
      "accountHolderName",
      "bankName",
      "accountNumber",
      "ifscCode",
      "branchLocation",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Missing required field: ${field}`);
        return false;
      }
    }

    const requiredAttachments: (keyof AttachmentType)[] = [
      "panAttachment",
      "adhaarAttachment",
      "nomineePanAttachment",
      "nomineeAadhaarAttachment",
      "cancelledChequeAttachment",
    ];

    for (const att of requiredAttachments) {
      if (!attachments[att]) {
        alert(`Please upload ${att}`);
        return false;
      }
    }

    return true;
  };
  const attachmentMap: Partial<
    Record<keyof FormDataType, keyof AttachmentType>
  > = {
    panNumber: "panAttachment",
    adhaarNumber: "adhaarAttachment",
  };
  /* ================= SUBMIT ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
 if (!validateStep()) return;
    const payload = isEditMode
      ? rejectedFields.reduce(
          (acc, field) => {
            acc[field] = formData[field];
            const att = attachmentMap[field];
            if (att && attachments[att]) acc[att] = attachments[att];
            return acc;
          },
          { loginId } as any
        )
      : { ...formData, ...attachments, loginId };

    const res = await fetch("/api/createagent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) setShowSuccess(true);
  };

  // only digits helper
  const onlyDigits = (value: string, max: number) =>
    value.replace(/\D/g, "").slice(0, max);

  // Aadhaar formatter 1234 5678 9012
  const formatAadhaar = (value: string) =>
    value
      .replace(/\D/g, "")
      .slice(0, 12)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  // PAN formatter ABCDE1234F
  const formatPAN = (value: string) =>
    value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 10);

  const onlyLetters = (value: string) => value.replace(/[^a-zA-Z\s]/g, "");

  const onlyLettersWithHyphen = (value: string) =>
    value.replace(/[^a-zA-Z\s-]/g, "");

  const formatIFSC = (value: string) =>
    value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 11);

  /* ================= UI ================= */
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Create Agent</h2>

        <div className={styles.stepHeader}>
          <span className={styles.stepText}>
            Step {step} of {totalSteps}
          </span>

          <div className={styles.stepDots}>
            {[1, 2, 3, 4].map((s) => (
              <span
                key={s}
                className={`${styles.dot} ${step >= s ? styles.activeDot : ""}`}
              />
            ))}
          </div>

          <span className={styles.percentText}>
            {Math.round((step / totalSteps) * 100)}% complete
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <h3>Basic Details</h3>
            <input
              id="firstName"
              placeholder="First Name"
              disabled
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              id="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
                className={errors.lastName ? styles.errorInput : ""}

            />
            <input id="email" value={formData.email} disabled />
           <input
  id="phone"
  placeholder="Phone"
  value={formData.phone}
  onChange={(e) =>
    setFormData((p) => ({
      ...p,
      phone: onlyDigits(e.target.value, 10),
    }))
  }
  className={errors.phone ? styles.errorInput : ""}
/>
 

            <div className={styles.passwordWrapper}>
              <input
                id="password"
                disabled
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h3>Address & KYC</h3>
            <input
              placeholder="Pin Code"
              value={formData.pinCode}
              onChange={handlePincodeChange}
              className={errors.pinCode ? styles.errorInput : ""}
            />
            <input placeholder="City" value={formData.city} disabled />
            <input placeholder="State" value={formData.state} disabled />

            <input
              id="panNumber"
              placeholder="PAN Number"
              value={formData.panNumber}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  panNumber: formatPAN(e.target.value),
                }))
              }
              className={errors.panNumber ? styles.errorInput : ""}
            />
      
           <FileInput
  label="Upload PAN"
  name="panAttachment"
  fileName={attachments.panFileName}
  onChange={handleFileChange}
  
/>

            <input
              id="adhaarNumber"
              placeholder="Aadhaar Number"
              disabled={isLocked("adhaarNumber")}
              value={formData.adhaarNumber}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  adhaarNumber: formatAadhaar(e.target.value),
                }))
              }
                className={errors.adhaarNumber ? styles.errorInput : ""}

            />
     
           <FileInput
  label="Upload Aadhaar"
  name="adhaarAttachment"
  fileName={attachments.adhaarFileName}
  onChange={handleFileChange}
/>
  
          </>
        )}

        {step === 3 && (
          <>
            <h3>Nominee Details</h3>
            <input
              id="nomineeName"
              placeholder="Nominee Name"
              value={formData.nomineeName}
              onChange={handleChange}
                className={errors.nomineeName ? styles.errorInput : ""}

            />
            <input
              id="nomineeRelation"
              placeholder="Relation"
              value={formData.nomineeRelation}
              onChange={handleChange}
                className={errors.nomineeRelation ? styles.errorInput : ""}
            />
           {/* Nominee PAN */}
<div className={styles.docRow}>
  <input
    id="nomineePanNumber"
    placeholder="Nominee PAN Number"
    value={formData.nomineePanNumber}
    onChange={(e) =>
      setFormData((p) => ({
        ...p,
        nomineePanNumber: formatPAN(e.target.value),
      }))
    }
    className={errors.nomineePanNumber ? styles.errorInput : ""}
  />

  <FileInput
    label="Upload PAN"
    name="nomineePanAttachment"
    fileName={attachments.nomineePanFileName}
    onChange={handleFileChange}
  />
</div>

{/* Nominee Aadhaar */}
<div className={styles.docRow}>
  <input
    id="nomineeAadharNumber"
    placeholder="Nominee Aadhaar Number"
    value={formData.nomineeAadharNumber}
    onChange={(e) =>
      setFormData((p) => ({
        ...p,
        nomineeAadharNumber: formatAadhaar(e.target.value),
      }))
    }
    className={errors.nomineeAadharNumber ? styles.errorInput : ""}
  />

  <FileInput
    label="Upload Aadhaar"
    name="nomineeAadhaarAttachment"
    fileName={attachments.nomineeAadhaarFileName}
    onChange={handleFileChange}
  />
</div>

          </>
        )}

        {step === 4 && (
          <>
            <h3>Bank Details</h3>
            <input
              id="accountHolderName"
              placeholder="Account Holder Name"
              value={formData.accountHolderName}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  accountHolderName: onlyLetters(e.target.value),
                }))
              }
              className={errors.accountHolderName ? styles.errorInput : ""}
            />
            <input
              id="bankName"
              placeholder="Bank Name"
              value={formData.bankName}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  bankName: onlyLetters(e.target.value),
                }))
              }
              className={errors.bankName ? styles.errorInput : ""}
            />
            <input
              id="accountNumber"
              placeholder="Account Number"
              value={formData.accountNumber}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  accountNumber: onlyDigits(e.target.value, 18),
                }))
              }
              className={errors.accountNumber ? styles.errorInput : ""}
            />
            <input
              id="ifscCode"
              placeholder="IFSC Code"
              value={formData.ifscCode}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  ifscCode: formatIFSC(e.target.value),
                }))
              }
              className={errors.ifscCode ? styles.errorInput : ""}
            />
            <input
              id="branchLocation"
              placeholder="Branch Location"
              value={formData.branchLocation}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  branchLocation: onlyLettersWithHyphen(e.target.value),
                }))
              }
              className={errors.branchLocation ? styles.errorInput : ""}
            />

            <FileInput
  label="Upload Cancelled Cheque"
  name="cancelledChequeAttachment"
  fileName={attachments.cancelledChequeFileName}
  onChange={handleFileChange}
/>
          </>
        )}

        <div className={styles.actions}>
          {step > 1 && (
            <button type="button" onClick={() => setStep(step - 1)}>
              Back
            </button>
          )}
          {step < totalSteps ? (
           <button
  type="button"
  onClick={() => {
    if (validateStep()) {
      setStep(step + 1);
    }
  }}
>
  Continue
</button>
          ) : (
            <button type="submit">
              {isEditMode ? "Resubmit" : "Submit for Verification"}
            </button>
          )}
        </div>
      </form>
      {showSuccess && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 24,
              borderRadius: 12,
              width: 320,
              textAlign: "center",
            }}
          >
            <p style={{ marginBottom: 20 }}>
              Agent application submitted successfully. Status will be updated
              after verification.
            </p>
            <button
              onClick={() => {
                setShowSuccess(false);
                router.push("/");
              }}
              style={{
                background: "#ff8a1f",
                color: "#fff",
                border: "none",
                padding: "10px 24px",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              Go to home page
            </button>
          </div>
        </div>
      )}

      {/* ===== BOTTOM STEP INDICATOR ===== */}
      <div className={styles.bottomSteps}>
        <div
          className={`${styles.stepItem} ${
            step === 1 ? styles.activeStep : ""
          }`}
        >
          Step 1 <span>Basic Details</span>
        </div>

        <div className={styles.arrow}>›</div>

        <div
          className={`${styles.stepItem} ${
            step === 2 ? styles.activeStep : ""
          }`}
        >
          Step 2 <span>Address & KYC</span>
        </div>

        <div className={styles.arrow}>›</div>

        <div
          className={`${styles.stepItem} ${
            step === 3 ? styles.activeStep : ""
          }`}
        >
          Step 3 <span>Nominee Details</span>
        </div>

        <div className={styles.arrow}>›</div>

        <div
          className={`${styles.stepItem} ${
            step === 4 ? styles.activeStep : ""
          }`}
        >
          Step 4 <span>Bank Details</span>
        </div>
      </div>
    </div>
  );
};

export default CreateAgent;
