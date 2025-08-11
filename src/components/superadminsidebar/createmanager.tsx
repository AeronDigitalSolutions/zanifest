
import React, { useEffect, useState } from 'react';
import styles from '@/styles/components/superadminsidebar/createmanager.module.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';

const CreateManager = () => {
  // const [formData, setFormData] = useState({
  //   managerId: '',
  //   name: '',
  //   email: '',
  //   password: '',
  //   district: '',
  //   state: '',
  //   category: '',
  //   assignedTo: '',
  // });

const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  managerId: '',
  dateOfJoining: '',

  password: '',
  
    pinCode: '',
    city: '',
    district: '',
    state: '',
  

  managerPanNumber: '',
  managerAadharNumber: '',

  nomineeName: '',
  nomineeRelation: '',
  nomineePanNumber: '',
  nomineeAadharNumber: '',
  accountHoldername: '',
  bankName: '',
  accountNumber: '',
  ifscCode: '',
  branchLoaction: '',
  category: '',
  assignedTo: '',
});

const [attachments, setAttachments] = useState({
  managerPanAttachment: '',
  managerAadharAttachment: '',
  nomineePanAttachment: '',
  nomineeAadharAttachment: '',
  cancelledChequeAttachment: '',
});



  const [assignedToOptions, setAssignedToOptions] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchManagers = async () => {
      if (formData.category === 'state') {
        const res = await fetch('/api/manager/byCategory?category=national');
        const data = await res.json();
        setAssignedToOptions(data);
      } else if (formData.category === 'district') {
        const res = await fetch('/api/manager/byCategory?category=state');
        const data = await res.json();
        setAssignedToOptions(data);
      } else {
        setAssignedToOptions([]);
      }
    };

    fetchManagers();
  }, [formData.category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let updatedValue = value;
    if (
      (name === 'managerId' || name === 'firstName' ||name === 'lastName' || name === 'state' || name === 'district') &&
      value.length > 0
    ) {
      updatedValue = value.charAt(0).toUpperCase() + value.slice(1);
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

const MAX_FILE_SIZE_MB = 5; // Limit to 5MB

const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, files } = e.target;
  if (files && files[0]) {
    const file = files[0];

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      alert(`File size should be less than ${MAX_FILE_SIZE_MB}MB`);
      return;
    }

    if (!file.type.match(/(image|pdf)/)) {
      alert('Only images or PDFs are allowed');
      return;
    }

    const base64 = await fileToBase64(file);
    setAttachments((prev) => ({
      ...prev,
      [name]: base64,
    }));
  }
};


//  if (formData.category !== 'national' && formData.assignedTo === '') {
//       alert('State and district managers must be assigned to a manager.');
//       return;
//     }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const payload = {
    ...formData,
    ...attachments // Merge files as Base64 into the same object
  };

  try {
    const res = await axios.post('/api/createmanager', payload, {
      headers: { 'Content-Type': 'application/json' }
    });

    if (res.status === 200 || res.status === 201) {
      alert('Manager created successfully!');
      
    } else {
      alert('Error creating manager.');
    }
  } catch (err) {
    console.error('Submission error:', err);
    alert('Failed to create manager.');
  }
};


  const handleRoleChange = (e: React.FormEvent) => {
    const { value } = e.target as HTMLInputElement;
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handlePincodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;

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


  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Create Manager</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="managerId">Employee Code </label>
            <input
              type="text"
              name="managerId"
              id="managerId"
              className={styles.input}
              placeholder="Enter Employee Code"
              value={formData.managerId}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className={styles.input}
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className={styles.input}
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className={styles.input}
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="name">Phone Number</label>
            <input
              type="number"
              name="phone"
              id="phone"
              className={styles.input}
              placeholder="Enter your cell number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup} style={{ position: 'relative' }}>
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              className={styles.input}
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
            <span
              className={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: 10, top: 38, cursor: 'pointer' }}
            >
              {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </span>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="dateOfJoining">Date of Joining</label>
          <input
            type="date"
            name="dateOfJoining"
            id="dateOfJoining"
            className={styles.input}
            value={formData.dateOfJoining}
            onChange={handleChange}
          />
        </div>


        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="pinCode">Pincode</label>
            <input
              type="text"
              name="pinCode"
              id="pinCode"
              inputMode="numeric"
              maxLength={6}
              className={styles.input}
              placeholder="Enter district"
              value={formData.pinCode}
onChange={handlePincodeChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              id="city"
              className={styles.input}
              placeholder="Enter district"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="district">District</label>
            <input
              type="text"
              name="district"
              id="district"
              className={styles.input}
              placeholder="Enter district"
              value={formData.district}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="state">State</label>
            <input
              type="text"
              name="state"
              id="state"
              className={styles.input}
              placeholder="Enter state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
        </div>

         <div className={styles.formGroup}>
            <label htmlFor="managerPanNumber">PAN number</label>
            <input
              type="text"
              name="managerPanNumber"
              id="managerPanNumber"
              className={styles.input}
              placeholder="Enter Nominee PAN number"
              value={formData.managerPanNumber}
              onChange={handleChange}
            />
            <input
              type="file"
              name="managerPanAttachment"
              id="managerPanAttachment"
              onChange={handleFileChange}
              accept="image/*,application/pdf"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="managerAadharNumber">Aadhar number</label>
            <input
              type="text"
              name="managerAadharNumber"
              id="managerAadharNumber"
              className={styles.input}
              placeholder="Enter Nominee Aadhar number"
              value={formData.managerAadharNumber}
              onChange={handleChange}
            />
            <input
              type="file"
              name="managerAadharAttachment"
              id="managerAadharAttachment"
              onChange={handleFileChange}
              accept="image/*,application/pdf"
            />
          </div>




        {/* //nominee details  */}
        <div className={styles.row}>

          <div className={styles.formGroup}>
            <label htmlFor="nomineeName">Nominee Name</label>
            <input
              type="text"
              name="nomineeName"
              id="nomineeName"
              className={styles.input}
              placeholder="Enter Nominee Name"
              value={formData.nomineeName}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="nomineeRelation">Nominee Relation</label>
            <input
              type="text"
              name="nomineeRelation"
              id="nomineeRelation"
              className={styles.input}
              placeholder="Enter Nominee Relation"
              value={formData.nomineeRelation}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="nomineePanNumber">Nominee PAN number</label>
            <input
              type="text"
              name="nomineePanNumber"
              id="nomineePanNumber"
              className={styles.input}
              placeholder="Enter Nominee PAN number"
              value={formData.nomineePanNumber}
              onChange={handleChange}
            />
            <input
              type="file"
              name="nomineePanAttachment"
              id="nomineePanAttachment"
              onChange={handleFileChange}
              accept="image/*,application/pdf"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="nomineeAadharNumber">Nominee Aadhar number</label>
            <input
              type="text"
              name="nomineeAadharNumber"
              id="nomineeAadharNumber"
              className={styles.input}
              placeholder="Enter Nominee Aadhar number"
              value={formData.nomineeAadharNumber}
              onChange={handleChange}
            />
            <input
              type="file"
              name="nomineeAadharAttachment"
              id="nomineeAadharAttachment"
              onChange={handleFileChange}
              accept="image/*,application/pdf"
            />
          </div>

        </div>

        {/* //bank details  */}
        <div className={styles.row}>

          <div className={styles.formGroup}>
            <label htmlFor="accountHoldername">Account Holder Name</label>
            <input
              type="text"
              name="accountHoldername"
              id="accountHoldername"
              className={styles.input}
              placeholder="Enter Account Holder Name"
              value={formData.accountHoldername}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="bankName">Bank Name</label>
            <input
              type="text"
              name="bankName"
              id="nabankNameme"
              className={styles.input}
              placeholder="Enter Bank Name"
              value={formData.bankName}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="accountNumber">Account Number</label>
            <input
              type="text"
              name="accountNumber"
              id="accountNumber"
              className={styles.input}
              placeholder="Enter Account Number"
              value={formData.accountNumber}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="ifscCode">IFSC code</label>
            <input
              type="text"
              name="ifscCode"
              id="ifscCode"
              className={styles.input}
              placeholder="Enter IFSC code"
              value={formData.ifscCode}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="branchLoaction">Branch Location</label>
            <input
              type="text"
              name="branchLoaction"
              id="branchLoaction"
              className={styles.input}
              placeholder="Enter Branch Location"
              value={formData.branchLoaction}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
              <label htmlFor="cancelledCheque">Upload Cancelled Cheque (Optional)</label>
              <input
              id="cancelledChequeAttachment" 
              name="cancelledChequeAttachment" 
              type="file"
              onChange={handleFileChange}
              accept="image/*,application/pdf" />
            </div>

        </div>

        <div className={`${styles.row} ${styles.radioRow}`}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="managerRole"
              value="national"
              checked={formData.category === 'national'}
              onChange={handleRoleChange}
            />
            National Manager
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="managerRole"
              value="state"
              checked={formData.category === 'state'}
              onChange={handleRoleChange}
            />
            State Manager
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="managerRole"
              value="district"
              checked={formData.category === 'district'}
              onChange={handleRoleChange}
            />
            District Manager
          </label>
        </div>

        {(formData.category === 'state' || formData.category === 'district') && (
          <div className={styles.formGroup}>
            <label htmlFor="assignedTo">Assign To</label>
            <select
              id="assignedTo"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className={styles.input}
              required
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

        <button type="submit" className={styles.submitButton}>
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateManager;
