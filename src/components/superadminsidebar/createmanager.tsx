// import React, { useEffect, useState } from 'react';
// import styles from '@/styles/components/superadminsidebar/createmanager.module.css';
// import { FiEye, FiEyeOff } from 'react-icons/fi';
// import axios from 'axios';

// const CreateManager = () => {
//   // const [formData, setFormData] = useState({
//   //   managerId: '',
//   //   name: '',
//   //   email: '',
//   //   password: '',
//   //   district: '',
//   //   state: '',
//   //   category: '',
//   //   assignedTo: '',
//   // });

// const [formData, setFormData] = useState({
//   firstName: '',
//   lastName: '',
//   email: '',
//   phone: '',
//   managerId: '',
//   dateOfJoining: '',

//   password: '',

//     pinCode: '',
//     city: '',
//     district: '',
//     state: '',

//   managerPanNumber: '',
//   managerAadharNumber: '',

//   nomineeName: '',
//   nomineeRelation: '',
//   nomineePanNumber: '',
//   nomineeAadharNumber: '',
//   accountHoldername: '',
//   bankName: '',
//   accountNumber: '',
//   ifscCode: '',
//   branchLoaction: '',
//   category: '',
//   assignedTo: '',
// });

// const [attachments, setAttachments] = useState({
//   managerPanAttachment: '',
//   managerAadharAttachment: '',
//   nomineePanAttachment: '',
//   nomineeAadharAttachment: '',
//   cancelledChequeAttachment: '',
// });

//   const [assignedToOptions, setAssignedToOptions] = useState([]);
//   const [showPassword, setShowPassword] = useState(false);

//   useEffect(() => {
//     const fetchManagers = async () => {
//       if (formData.category === 'state') {
//         const res = await fetch('/api/manager/byCategory?category=national');
//         const data = await res.json();
//         setAssignedToOptions(data);
//       } else if (formData.category === 'district') {
//         const res = await fetch('/api/manager/byCategory?category=state');
//         const data = await res.json();
//         setAssignedToOptions(data);
//       } else {
//         setAssignedToOptions([]);
//       }
//     };

//     fetchManagers();
//   }, [formData.category]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     let updatedValue = value;
//     if (
//       (name === 'managerId' || name === 'firstName' ||name === 'lastName' || name === 'state' || name === 'district') &&
//       value.length > 0
//     ) {
//       updatedValue = value.charAt(0).toUpperCase() + value.slice(1);
//     }
//     setFormData((prev) => ({ ...prev, [name]: updatedValue }));
//   };

// const fileToBase64 = (file: File): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = (error) => reject(error);
//   });
// };

// const MAX_FILE_SIZE_MB = 5; // Limit to 5MB

// const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//   const { name, files } = e.target;
//   if (files && files[0]) {
//     const file = files[0];

//     if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
//       alert(`File size should be less than ${MAX_FILE_SIZE_MB}MB`);
//       return;
//     }

//     if (!file.type.match(/(image|pdf)/)) {
//       alert('Only images or PDFs are allowed');
//       return;
//     }

//     const base64 = await fileToBase64(file);
//     setAttachments((prev) => ({
//       ...prev,
//       [name]: base64,
//     }));
//   }
// };

// //  if (formData.category !== 'national' && formData.assignedTo === '') {
// //       alert('State and district managers must be assigned to a manager.');
// //       return;
// //     }

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   const payload = {
//     ...formData,
//     ...attachments // Merge files as Base64 into the same object
//   };

//   try {
//     const res = await axios.post('/api/createmanager', payload, {
//       headers: { 'Content-Type': 'application/json' }
//     });

//     if (res.status === 200 || res.status === 201) {
//       alert('Manager created successfully!');
//     } else {
//       alert('Error creating manager.');
//     }
//   } catch (err) {
//     console.error('Submission error:', err);
//     alert('Failed to create manager.');
//   }
// };

//   const handleRoleChange = (e: React.FormEvent) => {
//     const { value } = e.target as HTMLInputElement;
//     setFormData((prev) => ({ ...prev, category: value }));
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.heading}>Create Manager</h2>
//       <form className={styles.form} onSubmit={handleSubmit}>
//         <div className={styles.row}>
//           <div className={styles.formGroup}>
//             <label htmlFor="managerId">Employee Code </label>
//             <input
//               type="text"
//               name="managerId"
//               id="managerId"
//               className={styles.input}
//               placeholder="Enter Employee Code"
//               value={formData.managerId}
//               onChange={handleChange}
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="firstName">First Name</label>
//             <input
//               type="text"
//               name="firstName"
//               id="firstName"
//               className={styles.input}
//               placeholder="Enter first name"
//               value={formData.firstName}
//               onChange={handleChange}
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label htmlFor="lastName">Last Name</label>
//             <input
//               type="text"
//               name="lastName"
//               id="lastName"
//               className={styles.input}
//               placeholder="Enter last name"
//               value={formData.lastName}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         <div className={styles.row}>
//           <div className={styles.formGroup}>
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               name="email"
//               id="email"
//               className={styles.input}
//               placeholder="Enter email"
//               value={formData.email}
//               onChange={handleChange}
//               pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="name">Phone Number</label>
//             <input
//               type="number"
//               name="phone"
//               id="phone"
//               className={styles.input}
//               placeholder="Enter your cell number"
//               value={formData.phone}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className={styles.formGroup} style={{ position: 'relative' }}>
//             <label htmlFor="password">Password</label>
//             <input
//               type={showPassword ? 'text' : 'password'}
//               name="password"
//               id="password"
//               className={styles.input}
//               placeholder="Enter password"
//               value={formData.password}
//               onChange={handleChange}
//             />
//             <span
//               className={styles.eyeIcon}
//               onClick={() => setShowPassword(!showPassword)}
//               style={{ position: 'absolute', right: 10, top: 38, cursor: 'pointer' }}
//             >
//               {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
//             </span>
//           </div>
//         </div>

//         <div className={styles.formGroup}>
//           <label htmlFor="dateOfJoining">Date of Joining</label>
//           <input
//             type="date"
//             name="dateOfJoining"
//             id="dateOfJoining"
//             className={styles.input}
//             value={formData.dateOfJoining}
//             onChange={handleChange}
//           />
//         </div>

//         <div className={styles.row}>
//           <div className={styles.formGroup}>
//             <label htmlFor="pinCode">Pincode</label>
//             <input
//               type="text"
//               name="pinCode"
//               id="pinCode"
//               inputMode="numeric"
//               maxLength={6}
//               className={styles.input}
//               placeholder="Enter district"
//               value={formData.pinCode}
//               onChange={handleChange}
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="city">City</label>
//             <input
//               type="text"
//               name="city"
//               id="city"
//               className={styles.input}
//               placeholder="Enter district"
//               value={formData.city}
//               onChange={handleChange}
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="district">District</label>
//             <input
//               type="text"
//               name="district"
//               id="district"
//               className={styles.input}
//               placeholder="Enter district"
//               value={formData.district}
//               onChange={handleChange}
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="state">State</label>
//             <input
//               type="text"
//               name="state"
//               id="state"
//               className={styles.input}
//               placeholder="Enter state"
//               value={formData.state}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//          <div className={styles.formGroup}>
//             <label htmlFor="managerPanNumber">PAN number</label>
//             <input
//               type="text"
//               name="managerPanNumber"
//               id="managerPanNumber"
//               className={styles.input}
//               placeholder="Enter Nominee PAN number"
//               value={formData.managerPanNumber}
//               onChange={handleChange}
//             />
//             <input
//               type="file"
//               name="managerPanAttachment"
//               id="managerPanAttachment"
//               onChange={handleFileChange}
//               accept="image/*,application/pdf"
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="managerAadharNumber">Aadhar number</label>
//             <input
//               type="text"
//               name="managerAadharNumber"
//               id="managerAadharNumber"
//               className={styles.input}
//               placeholder="Enter Nominee Aadhar number"
//               value={formData.managerAadharNumber}
//               onChange={handleChange}
//             />
//             <input
//               type="file"
//               name="managerAadharAttachment"
//               id="managerAadharAttachment"
//               onChange={handleFileChange}
//               accept="image/*,application/pdf"
//             />
//           </div>

//         {/* //nominee details  */}
//         <div className={styles.row}>

//           <div className={styles.formGroup}>
//             <label htmlFor="nomineeName">Nominee Name</label>
//             <input
//               type="text"
//               name="nomineeName"
//               id="nomineeName"
//               className={styles.input}
//               placeholder="Enter Nominee Name"
//               value={formData.nomineeName}
//               onChange={handleChange}
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="nomineeRelation">Nominee Relation</label>
//             <input
//               type="text"
//               name="nomineeRelation"
//               id="nomineeRelation"
//               className={styles.input}
//               placeholder="Enter Nominee Relation"
//               value={formData.nomineeRelation}
//               onChange={handleChange}
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="nomineePanNumber">Nominee PAN number</label>
//             <input
//               type="text"
//               name="nomineePanNumber"
//               id="nomineePanNumber"
//               className={styles.input}
//               placeholder="Enter Nominee PAN number"
//               value={formData.nomineePanNumber}
//               onChange={handleChange}
//             />
//             <input
//               type="file"
//               name="nomineePanAttachment"
//               id="nomineePanAttachment"
//               onChange={handleFileChange}
//               accept="image/*,application/pdf"
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="nomineeAadharNumber">Nominee Aadhar number</label>
//             <input
//               type="text"
//               name="nomineeAadharNumber"
//               id="nomineeAadharNumber"
//               className={styles.input}
//               placeholder="Enter Nominee Aadhar number"
//               value={formData.nomineeAadharNumber}
//               onChange={handleChange}
//             />
//             <input
//               type="file"
//               name="nomineeAadharAttachment"
//               id="nomineeAadharAttachment"
//               onChange={handleFileChange}
//               accept="image/*,application/pdf"
//             />
//           </div>

//         </div>

//         {/* //bank details  */}
//         <div className={styles.row}>

//           <div className={styles.formGroup}>
//             <label htmlFor="accountHoldername">Account Holder Name</label>
//             <input
//               type="text"
//               name="accountHoldername"
//               id="accountHoldername"
//               className={styles.input}
//               placeholder="Enter Account Holder Name"
//               value={formData.accountHoldername}
//               onChange={handleChange}
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="bankName">Bank Name</label>
//             <input
//               type="text"
//               name="bankName"
//               id="nabankNameme"
//               className={styles.input}
//               placeholder="Enter Bank Name"
//               value={formData.bankName}
//               onChange={handleChange}
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="accountNumber">Account Number</label>
//             <input
//               type="text"
//               name="accountNumber"
//               id="accountNumber"
//               className={styles.input}
//               placeholder="Enter Account Number"
//               value={formData.accountNumber}
//               onChange={handleChange}
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="ifscCode">IFSC code</label>
//             <input
//               type="text"
//               name="ifscCode"
//               id="ifscCode"
//               className={styles.input}
//               placeholder="Enter IFSC code"
//               value={formData.ifscCode}
//               onChange={handleChange}
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="branchLoaction">Branch Location</label>
//             <input
//               type="text"
//               name="branchLoaction"
//               id="branchLoaction"
//               className={styles.input}
//               placeholder="Enter Branch Location"
//               value={formData.branchLoaction}
//               onChange={handleChange}
//             />
//           </div>

//           <div className={styles.formGroup}>
//               <label htmlFor="cancelledCheque">Upload Cancelled Cheque (Optional)</label>
//               <input
//               id="cancelledChequeAttachment"
//               name="cancelledChequeAttachment"
//               type="file"
//               onChange={handleFileChange}
//               accept="image/*,application/pdf" />
//             </div>

//         </div>

//         <div className={`${styles.row} ${styles.radioRow}`}>
//           <label className={styles.radioLabel}>
//             <input
//               type="radio"
//               name="managerRole"
//               value="national"
//               checked={formData.category === 'national'}
//               onChange={handleRoleChange}
//             />
//             National Manager
//           </label>
//           <label className={styles.radioLabel}>
//             <input
//               type="radio"
//               name="managerRole"
//               value="state"
//               checked={formData.category === 'state'}
//               onChange={handleRoleChange}
//             />
//             State Manager
//           </label>
//           <label className={styles.radioLabel}>
//             <input
//               type="radio"
//               name="managerRole"
//               value="district"
//               checked={formData.category === 'district'}
//               onChange={handleRoleChange}
//             />
//             District Manager
//           </label>
//         </div>

//         {(formData.category === 'state' || formData.category === 'district') && (
//           <div className={styles.formGroup}>
//             <label htmlFor="assignedTo">Assign To</label>
//             <select
//               id="assignedTo"
//               name="assignedTo"
//               value={formData.assignedTo}
//               onChange={handleChange}
//               className={styles.input}
//               required
//             >
//               <option value="">Select a manager</option>
//               {assignedToOptions.map((manager: any) => (
//                 <option key={manager._id} value={manager._id}>
//                   {manager.managerId} - {manager.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         <button type="submit" className={styles.submitButton}>
//           Create
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateManager;

// import React, { useEffect, useState } from "react";
// import styles from "@/styles/components/superadminsidebar/createmanager.module.css";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import axios from "axios";

// const CreateManager = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     managerId: "",
//     dateOfJoining: "",
//     password: "",
//     pinCode: "",
//     city: "",
//     district: "",
//     state: "",
//     managerPanNumber: "",
//     managerAadharNumber: "",
//     nomineeName: "",
//     nomineeRelation: "",
//     nomineePanNumber: "",
//     nomineeAadharNumber: "",
//     accountHoldername: "",
//     bankName: "",
//     accountNumber: "",
//     ifscCode: "",
//     branchLoaction: "",
//     category: "",
//     assignedTo: "",
//   });

//   const [attachments, setAttachments] = useState({
//     managerPanAttachment: "",
//     managerAadharAttachment: "",
//     nomineePanAttachment: "",
//     nomineeAadharAttachment: "",
//     cancelledChequeAttachment: "",
//   });

//   const [assignedToOptions, setAssignedToOptions] = useState([]);
//   const [showPassword, setShowPassword] = useState(false);

//   useEffect(() => {
//     const fetchManagers = async () => {
//       if (formData.category === "state") {
//         const res = await fetch("/api/manager/byCategory?category=national");
//         const data = await res.json();
//         setAssignedToOptions(data);
//       } else if (formData.category === "district") {
//         const res = await fetch("/api/manager/byCategory?category=state");
//         const data = await res.json();
//         setAssignedToOptions(data);
//       } else {
//         setAssignedToOptions([]);
//       }
//     };

//     fetchManagers();
//   }, [formData.category]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     let updatedValue = value;

//     // Pincode validation
//     if (name === "pinCode") {
//       updatedValue = value.replace(/\D/g, ""); // only numbers
//       if (updatedValue.length > 6) updatedValue = updatedValue.slice(0, 6);
//     }

//     // PAN Card auto uppercase
//     if (
//       name === "managerPanNumber" ||
//       name === "nomineePanNumber"
//     ) {
//       updatedValue = value.toUpperCase();
//     }

//     // Aadhar Card formatting (4 digits space)
//     if (
//       name === "managerAadharNumber" ||
//       name === "nomineeAadharNumber"
//     ) {
//       updatedValue = value.replace(/\D/g, ""); // remove non-digits
//       updatedValue = updatedValue.slice(0, 12); // limit to 12 digits
//       updatedValue = updatedValue.replace(/(.{4})/g, "$1 ").trim(); // add space every 4 digits
//     }

//     if (
//       (name === "managerId" ||
//         name === "firstName" ||
//         name === "lastName" ||
//         name === "state" ||
//         name === "district") &&
//       value.length > 0
//     ) {
//       updatedValue = updatedValue.charAt(0).toUpperCase() + updatedValue.slice(1);
//     }

//     setFormData((prev) => ({ ...prev, [name]: updatedValue }));
//   };

//   const fileToBase64 = (file: File): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result as string);
//       reader.onerror = (error) => reject(error);
//     });
//   };

//   const MAX_FILE_SIZE_MB = 5;

//   const handleFileChange = async (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const { name, files } = e.target;
//     if (files && files[0]) {
//       const file = files[0];

//       if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
//         alert(`File size should be less than ${MAX_FILE_SIZE_MB}MB`);
//         return;
//       }

//       if (!file.type.match(/(image|pdf)/)) {
//         alert("Only images or PDFs are allowed");
//         return;
//       }

//       const base64 = await fileToBase64(file);
//       setAttachments((prev) => ({
//         ...prev,
//         [name]: base64,
//       }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const payload = { ...formData, ...attachments };

//     try {
//       const res = await axios.post("/api/createmanager", payload, {
//         headers: { "Content-Type": "application/json" },
//       });

//       if (res.status === 200 || res.status === 201) {
//         alert("Manager created successfully!");
//       } else {
//         alert("Error creating manager.");
//       }
//     } catch (err) {
//       console.error("Submission error:", err);
//       alert("Failed to create manager.");
//     }
//   };

//   const handleRoleChange = (e: React.FormEvent) => {
//     const { value } = e.target as HTMLInputElement;
//     setFormData((prev) => ({ ...prev, category: value }));
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.heading}>Create Manager</h2>
//       <form className={styles.form} onSubmit={handleSubmit}>
//         {/* Row 1 */}
//         <div className={styles.row}>
//           <div className={styles.formGroup}>
//             <label>Employee Code</label>
//             <input
//               type="text"
//               name="managerId"
//               value={formData.managerId}
//               onChange={handleChange}
//               className={styles.input}
//               placeholder="Enter Employee Code"
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label>First Name</label>
//             <input
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               className={styles.input}
//               placeholder="Enter First Name"
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label>Last Name</label>
//             <input
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               className={styles.input}
//               placeholder="Enter Last Name"
//             />
//           </div>
//         </div>

//         {/* Row 2 */}
//         <div className={styles.row}>
//           <div className={styles.formGroup}>
//             <label>Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className={styles.input}
//               placeholder="Enter Email"
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label>Phone Number</label>
//             <input
//               type="number"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className={styles.input}
//               placeholder="Enter Phone Number"
//             />
//           </div>
//           <div className={styles.formGroup} style={{ position: "relative" }}>
//             <label>Password</label>
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className={styles.input}
//               placeholder="Enter Password"
//             />
//             <span
//               className={styles.eyeIcon}
//               onClick={() => setShowPassword(!showPassword)}
//               style={{ position: "absolute", right: 10, top: 38, cursor: "pointer" }}
//             >
//               {showPassword ? <FiEyeOff /> : <FiEye />}
//             </span>

//           </div>
//         </div>

//         {/* Row 3 */}
//         <div className={styles.formGroup} style={{ width: "30%" }}>
//           <label>Date of Joining</label>
//           <input
//             type="date"
//             name="dateOfJoining"
//             value={formData.dateOfJoining}
//             onChange={handleChange}
//             className={styles.input}
//           />
//         </div>

//         {/* Address Details */}
//         <h3 className={styles.subHeading}>Address Details</h3>
//         <div className={styles.row}>
//           <div className={styles.formGroup}>
//             <label>Pincode</label>
//             <input
//               type="text"
//               name="pinCode"
//               value={formData.pinCode}
//               onChange={handleChange}
//               className={styles.input}
//               placeholder="Enter Pincode"
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label>City</label>
//             <input
//               type="text"
//               name="city"
//               value={formData.city}
//               onChange={handleChange}
//               className={styles.input}
//               placeholder="Enter City"
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label>District</label>
//             <input
//               type="text"
//               name="district"
//               value={formData.district}
//               onChange={handleChange}
//               className={styles.input}
//               placeholder="Enter District"
//             />
//           </div>
//         </div>

//         <div className={styles.row}>
//           <div className={styles.formGroup}>
//             <label>State</label>
//             <input
//               type="text"
//               name="state"
//               value={formData.state}
//               onChange={handleChange}
//               className={styles.input}
//               placeholder="Enter State"
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label>PAN Number</label>
//             <input
//               type="text"
//               name="managerPanNumber"
//               value={formData.managerPanNumber}
//               onChange={handleChange}
//               className={styles.input}
//               placeholder="Enter PAN Number"
//             />
//             <input
//               type="file"
//               name="managerPanAttachment"
//               onChange={handleFileChange}
//               accept="image/*,application/pdf"
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label>Aadhar Number</label>
//             <input
//               type="text"
//               name="managerAadharNumber"
//               value={formData.managerAadharNumber}
//               onChange={handleChange}
//               className={styles.input}
//               placeholder="Enter Aadhar Number"
//             />
//             <input
//               type="file"
//               name="managerAadharAttachment"
//               onChange={handleFileChange}
//               accept="image/*,application/pdf"
//             />
//           </div>
//         </div>

//         {/* Nominee Details */}
//         <h3 className={styles.subHeading}>Nominee Details</h3>
//         <div className={styles.row}>
//           <div className={styles.formGroup}>
//             <label>Nominee Name</label>
//             <input
//               type="text"
//               name="nomineeName"
//               value={formData.nomineeName}
//               onChange={handleChange}
//               className={styles.input}
//               placeholder="Enter Nominee Name"
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label>Nominee Relation</label>
//             <input
//               type="text"
//               name="nomineeRelation"
//               value={formData.nomineeRelation}
//               onChange={handleChange}
//               className={styles.input}
//               placeholder="Enter Nominee Relation"
//             />
//           </div>
//         </div>

//         <div className={styles.row}>
//           <div className={styles.formGroup}>
//             <label>Nominee PAN Number</label>
//             <input
//               type="text"
//               name="nomineePanNumber"
//               value={formData.nomineePanNumber}
//               onChange={handleChange}
//               className={styles.input}
//               placeholder="Enter PAN Number"
//             />
//             <input
//               type="file"
//               name="nomineePanAttachment"
//               onChange={handleFileChange}
//               accept="image/*,application/pdf"
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label>Nominee Aadhar Number</label>
//             <input
//               type="text"
//               name="nomineeAadharNumber"
//               value={formData.nomineeAadharNumber}
//               onChange={handleChange}
//               className={styles.input}
//               placeholder="Enter Aadhar Number"
//             />
//             <input
//               type="file"
//               name="nomineeAadharAttachment"
//               onChange={handleFileChange}
//               accept="image/*,application/pdf"
//             />
//           </div>
//         </div>

//         {/* Bank Details */}
//         <h3 className={styles.subHeading}>Bank Details</h3>
//         <div className={styles.row}>
//           <div className={styles.formGroup}>
//             <label>Account Holder Name</label>
//             <input
//               type="text"
//               name="accountHoldername"
//               value={formData.accountHoldername}
//               onChange={handleChange}
//               className={styles.input}
//               placeholder="Enter Account Holder Name"
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label>Bank Name</label>
//             <input
//               type="text"
//               name="bankName"
//               value={formData.bankName}
//               onChange={handleChange}
//               className={styles.input}
//               placeholder="Enter Bank Name"
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label>Account Number</label>
//             <input
//               type="text"
//               name="accountNumber"
//               value={formData.accountNumber}
//               onChange={handleChange}
//               className={styles.input}
//               placeholder="Enter Account Number"
//             />
//           </div>
//         </div>

//         <div className={styles.row}>
//           <div className={styles.formGroup}>
//             <label>IFSC Code</label>
//             <input
//               type="text"
//               name="ifscCode"
//               value={formData.ifscCode}
//               onChange={handleChange}
//               className={styles.input}
//               placeholder="Enter IFSC Code"
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label>Branch Location</label>
//             <input
//               type="text"
//               name="branchLoaction"
//               value={formData.branchLoaction}
//               onChange={handleChange}
//               className={styles.input}
//               placeholder="Enter Branch Location"
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label>Upload Cancelled Cheque (Optional)</label>
//             <input
//               type="file"
//               name="cancelledChequeAttachment"
//               onChange={handleFileChange}
//               accept="image/*,application/pdf"
//             />
//           </div>
//         </div>

//         {/* Role Selection */}
//         <div className={`${styles.row} ${styles.radioRow}`}>
//           <label className={styles.radioLabel}>
//             <input
//               type="radio"
//               name="managerRole"
//               value="national"
//               checked={formData.category === "national"}
//               onChange={handleRoleChange}
//             />
//             National Manager
//           </label>
//           <label className={styles.radioLabel}>
//             <input
//               type="radio"
//               name="managerRole"
//               value="state"
//               checked={formData.category === "state"}
//               onChange={handleRoleChange}
//             />
//             State Manager
//           </label>
//           <label className={styles.radioLabel}>
//             <input
//               type="radio"
//               name="managerRole"
//               value="district"
//               checked={formData.category === "district"}
//               onChange={handleRoleChange}
//             />
//             District Manager
//           </label>
//         </div>

//         {(formData.category === "state" ||
//           formData.category === "district") && (
//           <div className={styles.formGroup}>
//             <label>Assign To</label>
//             <select
//               name="assignedTo"
//               value={formData.assignedTo}
//               onChange={handleChange}
//               className={styles.input}
//             >
//               <option value="">Select a manager</option>
//               {assignedToOptions.map((manager: any) => (
//                 <option key={manager._id} value={manager._id}>
//                   {manager.managerId} - {manager.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {/* Submit Button */}
//         <button type="submit" className={styles.submitButton}>
//           Create
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateManager;


import React, { useEffect, useState } from "react";
import styles from "@/styles/components/superadminsidebar/createmanager.module.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";

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
import { useRef } from "react";


const CreateManager = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    managerId: "",
    dateOfJoining: "",
    password: "",
    pinCode: "",
    city: "",
    district: "",
    state: "",
    managerPanNumber: "",
    managerAadharNumber: "",
    nomineeName: "",
    nomineeRelation: "",
    nomineePanNumber: "",
    nomineeAadharNumber: "",
    accountHoldername: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    branchLoaction: "",
    category: "",
    assignedTo: "",
  });

  const [attachments, setAttachments] = useState({
    managerPanAttachment: "",
    managerAadharAttachment: "",
    nomineePanAttachment: "",
    nomineeAadharAttachment: "",
    cancelledChequeAttachment: "",
  });

  const [assignedToOptions, setAssignedToOptions] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchManagers = async () => {
      if (formData.category === "state") {
        const res = await fetch("/api/manager/byCategory?category=national");
        const data = await res.json();
        setAssignedToOptions(data);
      } else if (formData.category === "district") {
        const res = await fetch("/api/manager/byCategory?category=state");
        const data = await res.json();
        setAssignedToOptions(data);
      } else {
        setAssignedToOptions([]);
      }
    };

    fetchManagers();
  }, [formData.category]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let updatedValue = value;

    
    if (name === "pinCode") {
      updatedValue = value.replace(/\D/g, ""); 
      if (updatedValue.length > 6) updatedValue = updatedValue.slice(0, 6);
    }

    if (name === "managerPanNumber" || name === "nomineePanNumber") {
      updatedValue = value.toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
        .slice(0, 10);
    }

     if (name === "ifscCode") {
      updatedValue = value.toUpperCase().slice(0, 11);
    }
     if (name === "accountNumber") {
      updatedValue = value.replace(/[^0-9]/g, "");
    }
    if (name === "managerAadharNumber" || name === "nomineeAadharNumber") {
      updatedValue = value.replace(/\D/g, ""); 
      updatedValue = updatedValue.slice(0, 12); 
      updatedValue = updatedValue.replace(/(.{4})/g, "$1 ").trim(); 
    }

    if (
      (name === "managerId" ||
        name === "firstName" ||
        name === "lastName" ||
        name === "state" ||
        name === "district") &&
      value.length > 0
    ) {
      updatedValue =
        updatedValue.charAt(0).toUpperCase() + updatedValue.slice(1);
    }

    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const MAX_FILE_SIZE_MB = 5;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];

      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        alert(`File size should be less than ${MAX_FILE_SIZE_MB}MB`);
        return;
      }

      if (!file.type.match(/(image|pdf)/)) {
        alert("Only images or PDFs are allowed");
        return;
      }

      const base64 = await fileToBase64(file);
      setAttachments((prev) => ({
        ...prev,
        [name]: base64,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...formData, ...attachments };

    try {
      const res = await axios.post("/api/createmanager", payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 200 || res.status === 201) {
        alert("Manager created successfully!");
      } else {
        alert("Error creating manager.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to create manager.");
    }
  };

  const handleRoleChange = (e: React.FormEvent) => {
    const { value } = e.target as HTMLInputElement;
    setFormData((prev) => ({ ...prev, category: value }));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Create Manager</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Row 1 */}
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Employee Code</label>
            <input
              type="text"
              name="managerId"
              value={formData.managerId}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter Employee Code"
            />
          </div>
          <div className={styles.formGroup}>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter First Name"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter Last Name"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter Email"
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter Password"
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
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
        </div>

        {/* Row 3 */}
        <div className={styles.formGroup} style={{ width: "30%" }}>
          <label>Date of Joining</label>
          <input
            type="date"
            name="dateOfJoining"
            value={formData.dateOfJoining}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        {/* Address Details */}
        <h3 className={styles.subHeading}>Address Details</h3>
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Pincode</label>
            <input
              type="text"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter Pincode"
            />
          </div>
          <div className={styles.formGroup}>
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter City"
            />
          </div>
          <div className={styles.formGroup}>
            <label>District</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter District"
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter State"
            />
          </div>
          <div className={styles.formGroup}>
            <label>PAN Number</label>
            <input
              type="text"
              name="managerPanNumber"
              value={formData.managerPanNumber}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter PAN Number"
            />
         
            <Button
              label="Upload PAN"
              name="panAttachment"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Aadhar Number</label>
            <input
              type="text"
              name="managerAadharNumber"
              value={formData.managerAadharNumber}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter Aadhar Number"
            />

            <Button
              label="Upload Aadhaar"
              name="adhaarAttachment"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Nominee Details */}
        <h3 className={styles.subHeading}>Nominee Details</h3>
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Nominee Name</label>
            <input
              type="text"
              name="nomineeName"
              value={formData.nomineeName}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter Nominee Name"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Nominee Relation</label>
            <input
              type="text"
              name="nomineeRelation"
              value={formData.nomineeRelation}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter Nominee Relation"
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Nominee PAN Number</label>
            <input
              type="text"
              name="nomineePanNumber"
              value={formData.nomineePanNumber}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter PAN Number"
            />

            <Button
              label="Upload Nominee PAN"
              name="nomineePanAttachment"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Nominee Aadhar Number</label>
            <input
              type="text"
              name="nomineeAadharNumber"
              value={formData.nomineeAadharNumber}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter Aadhar Number"
            />

            <Button
              label="Upload Nominee Aadhaar"
              name="nomineeAadhaarAttachment"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Bank Details */}
        <h3 className={styles.subHeading}>Bank Details</h3>
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Account Holder Name</label>
            <input
              type="text"
              name="accountHoldername"
              value={formData.accountHoldername}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter Account Holder Name"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Bank Name</label>
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter Bank Name"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Account Number</label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter Account Number"
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>IFSC Code</label>
            <input
              type="text"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter IFSC Code"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Branch Location</label>
            <input
              type="text"
              name="branchLoaction"
              value={formData.branchLoaction}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter Branch Location"
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

        {/* Role Selection */}
        <div className={`${styles.row} ${styles.radioRow}`}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="managerRole"
              value="national"
              checked={formData.category === "national"}
              onChange={handleRoleChange}
            />
            National Manager
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="managerRole"
              value="state"
              checked={formData.category === "state"}
              onChange={handleRoleChange}
            />
            State Manager
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="managerRole"
              value="district"
              checked={formData.category === "district"}
              onChange={handleRoleChange}
            />
            District Manager
          </label>
        </div>

        {(formData.category === "state" ||
          formData.category === "district") && (
          <div className={styles.formGroup}>
            <label>Assign To</label>
            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className={styles.input}
            >
              <option value="">Select a manager</option>
              {assignedToOptions.map((manager: any) => (
                <option key={manager._id} value={manager._id}>
                  {manager.managerId} - {manager.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className={styles.submitButton}>
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateManager;
