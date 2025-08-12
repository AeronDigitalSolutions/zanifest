import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/components/superadminsidebar/createagent.module.css";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface ButtonProps {
  label: string;
  name: string;
  accept?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ label, name, accept, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName("");
    }
    onChange(e);
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <button
          className={styles.documentsBtn}
          type="button"
          onClick={handleClick}
        >
          <span className={styles.folderContainer}>
            <svg
              className={styles.fileBack}
              width={146}
              height={113}
              viewBox="0 0 146 113"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 4C0 1.79086 1.79086 0 4 0H50.3802C51.8285 0 53.2056 0.627965 54.1553 1.72142L64.3303 13.4371C65.2799 14.5306 66.657 15.1585 68.1053 15.1585H141.509C143.718 15.1585 145.509 16.9494 145.509 19.1585V109C145.509 111.209 143.718 113 141.509 113H3.99999C1.79085 113 0 111.209 0 109V4Z"
                fill="url(#paint0_linear_117_4)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_117_4"
                  x1={0}
                  y1={0}
                  x2="72.93"
                  y2="95.4804"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#a040fd" />
                  <stop offset={1} stopColor="#5f41f3" />
                </linearGradient>
              </defs>
            </svg>
            <svg
              className={styles.filePage}
              width={88}
              height={99}
              viewBox="0 0 88 99"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width={88} height={99} fill="url(#paint0_linear_117_6)" />
              <defs>
                <linearGradient
                  id="paint0_linear_117_6"
                  x1={0}
                  y1={0}
                  x2={81}
                  y2="160.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" />
                  <stop offset={1} stopColor="#686868" />
                </linearGradient>
              </defs>
            </svg>
            <svg
              className={styles.fileFront}
              width={160}
              height={79}
              viewBox="0 0 160 79"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.29306 12.2478C0.133905 9.38186 2.41499 6.97059 5.28537 6.97059H30.419H58.1902C59.5751 6.97059 60.9288 6.55982 62.0802 5.79025L68.977 1.18034C70.1283 0.410771 71.482 0 72.8669 0H77H155.462C157.87 0 159.733 2.1129 159.43 4.50232L150.443 75.5023C150.19 77.5013 148.489 79 146.474 79H7.78403C5.66106 79 3.9079 77.3415 3.79019 75.2218L0.29306 12.2478Z"
                fill="url(#paint0_linear_117_5)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_117_5"
                  x1="38.7619"
                  y1="8.71323"
                  x2="66.9106"
                  y2="82.8317"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#a040fd" />
                  <stop offset={1} stopColor="#5251f2" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <p className={styles.text}>Upload File</p>
        </button>
      </div>
      {/* Show file name if available */}
      {fileName && (
        <p style={{ fontSize: "12px", marginTop: "5px", color: "#555" }}>
          {fileName}
        </p>
      )}
      <input
        ref={fileInputRef}
        type="file"
        name={name}
        accept={accept}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

const CreateAgent: React.FC = () => {
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

  const [showPassword, setShowPassword] = useState(false);
  const [districtManagers, setDistrictManagers] = useState<any[]>([]);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const res = await axios.get("/api/managers/agentDistrictDropdown");
        setDistrictManagers(res.data.managers);
      } catch (err) {
        console.error("Error fetching district managers:", err);
      }
    };
    fetchManagers();
  }, []);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    let updatedValue = value;
    

    if (
      ["firstName", "lastName", "district", "city", "state"].includes(id) &&
      value.length > 0
    ) {
      updatedValue = value.charAt(0).toUpperCase() + value.slice(1);
    }

    if (id === "pinCode") {
      updatedValue = value.replace(/\D/g, "").slice(0, 6);
    }

    if (id === "panNumber" || id === "nomineePanNumber") {
      updatedValue = value
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "")
        .slice(0, 10);
    }
      // Agent Code → always uppercase
    if (id === "agentCode") {
      updatedValue = value.toUpperCase();
    }

     if (id === "ifscCode") {
      updatedValue = value.toUpperCase().slice(0, 11);
    }
     if (id === "accountNumber") {
      updatedValue = value.replace(/[^0-9]/g, "");
    }

    
    if (id === "adhaarNumber" || id === "nomineeAadharNumber") {
      let digits = value.replace(/\D/g, "").slice(0, 12);
      updatedValue = digits.replace(/(.{4})/g, "$1 ").trim();
    }

    setFormData((prev) => ({ ...prev, [id]: updatedValue }));
  };

  

// const [attachments, setAttachments] = useState<Record<string, string>>({});

const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, files } = e.target;
  if (files && files[0]) {
    const base64 = await fileToBase64(files[0]);
    setAttachments((prev) => ({
      ...prev,
      [name]: base64, // store Base64 string
    }));
  }
};



//   const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   try {
//     const data = new FormData();

//     // Append text data
//     Object.entries(formData).forEach(([key, value]) => {
//       data.append(key, value);
//     });

//     // Append files
//     Object.entries(fileData).forEach(([key, file]) => {
//       if (file) data.append(key, file);
//     });

//     await axios.post('/api/createagent', data, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     alert('Agent created successfully!');
//     // reset if needed
//   } catch (err) {
//     console.error('Error creating agent:', err);
//     alert('Failed to create agent');
//   }
// };

//submit handler -> but no url being stored in db
//  const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   const formDataToSend = new FormData();

//   // Append all other fields from formData
//   for (const key in formData) {
//     formDataToSend.append(key, formData[key as keyof typeof formData]);
//   }

//   // Append each attachment file
//   Object.entries(attachments).forEach(([key, file]) => {
//     if (file) {
//       formDataToSend.append(key, file);
//     }
//   });

//   try {
//     const res = await axios.post('/api/createagent', formDataToSend, {
//       headers: {
//         'Content-Type': 'multipart/form-data', // let browser set boundary
//       },
//     });

//     if (res.status === 200 || res.status === 201) {
//       alert('Agent created successfully!');
//     } else {
//       alert('Error creating agent.');
//     }
//   } catch (err) {
//     console.error('Submission error:', err);
//     alert('Failed to create agent.');
//   }
// };
const handlePincodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  // let value = e.target.value;
  const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);


  // Update pin code immediately
  setFormData((prev) => ({ ...prev, pinCode: value }));

  // If valid 6-digit pincode, fetch city & state
  if (value.length === 6 && /^\d{6}$/.test(value)) {
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${value}`);
      const data = await res.json();

      if (data[0]?.Status === "Success") {
        const postOffice = data[0]?.PostOffice?.[0];
        setFormData((prev) => ({
          ...prev,
          city: postOffice?.District || "",
          district: postOffice?.Name || "",
          state: postOffice?.State || ""
        }));
      } else {
        console.warn("Invalid pincode or no data found");
      }
    } catch (error) {
      console.error("Error fetching city/state from pincode:", error);
    }
  }
};


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const res = await fetch('/api/createagent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...formData,
      attachments // already contains Base64 strings
    })
  });

  if (res.ok) {
    alert('Agent created successfully!');
  } else {
    alert('Error creating agent.');
  }
};

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Create Agent</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Row 1 */}
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Agent Code</label>
            <input
              id="agentCode"
              value={formData.agentCode}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>First Name</label>
            <input
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Last Name</label>
            <input
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Phone Number</label>

                <input
              type="text"
              inputMode="numeric"
              id="phone"
              value={formData.phone}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "");
                if (value.length > 10) value = value.slice(0, 10);
                setFormData((prev) => ({ ...prev, phone: value }));
              }}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup} style={{ position: "relative" }}>
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              required
            />
            <span
              className={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: 10,
                top: 38,
                cursor: "pointer",
              }}
            >
              {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </span>
          </div>
        </div>

        <h3>Address Details</h3>
        {/* Address Rows */}
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Pin Code</label>
            <input
              id="pinCode"
              value={formData.pinCode}
             onChange={handlePincodeChange}
              className={styles.input}
              required
            />
          </div>

          {/* <div className={styles.formGroup}>
            <label htmlFor="district">District</label>
            <input
              type="text"
              id="district"
              className={styles.input}
              required
            />
          </div> */}
          <div className={styles.formGroup}>
            <label>City</label>
            <input
              id="city"
              value={formData.city}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>District</label>
            <input
              id="district"
              value={formData.district}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>State</label>
            <input
              id="state"
              value={formData.state}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>PAN Number</label>
            <input
              id="panNumber"
              value={formData.panNumber}
              onChange={handleChange}
              className={styles.input}
            />
            <Button
              label="Upload PAN"
              name="panAttachment"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Aadhaar Number</label>
            <input
              id="adhaarNumber"
              value={formData.adhaarNumber}
              onChange={handleChange}
              className={styles.input}
            />
            <Button
              label="Upload Aadhaar"
              name="adhaarAttachment"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <h3>Nominee Details</h3>
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Nominee Name</label>
            <input
              id="nomineeName"
              value={formData.nomineeName}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Nominee Relation</label>
            <input
              id="nomineeRelation"
              value={formData.nomineeRelation}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Nominee PAN Number</label>
            <input
              id="nomineePanNumber"
              value={formData.nomineePanNumber}
              onChange={handleChange}
              className={styles.input}
            />
            <Button
              label="Upload Nominee PAN"
              name="nomineePanAttachment"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Nominee Aadhaar Number</label>
            <input
              id="nomineeAadharNumber"
              value={formData.nomineeAadharNumber}
              onChange={handleChange}
              className={styles.input}
            />
            <Button
              label="Upload Nominee Aadhaar"
              name="nomineeAadhaarAttachment"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <h3>Bank Details</h3>
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Account Holder Name</label>
            <input
              id="accountHolderName"
              value={formData.accountHolderName}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Bank Name</label>
            <input
              id="bankName"
              value={formData.bankName}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Account Number</label>
            <input
              id="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>IFSC Code</label>
            <input
              id="ifscCode"
              value={formData.ifscCode}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Branch Location</label>
            <input
              id="branchLocation"
              value={formData.branchLocation}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Upload Cancelled Cheque (Optional)</label>
            <Button
              label="Upload Cancelled Cheque"
              name="cancelledChequeAttachment"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Assign to District Manager</label>
          <select
            id="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className={styles.input}
            required
          >
            <option value="">Select Manager</option>
            {districtManagers.map((manager) => (
              <option key={manager.managerId} value={manager.managerId}>
                {manager.name} ({manager.managerId})
              </option>
            ))}
          </select>
        </div>

        <div style={{ textAlign: "center" }}>
          <button type="submit" className={styles.submitButton}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAgent;
