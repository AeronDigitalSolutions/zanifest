
import React, { useState, useEffect } from 'react';
import styles from '@/styles/components/superadminsidebar/createagent.module.css';
import axios from 'axios';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const CreateAgent = () => {
  const [formData, setFormData] = useState({
  firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    agentCode: '',
    city: '',
    district: '',
    state: '',
    pinCode: '',
    adhaarNumber: '',
    panNumber: '',
    nomineeName: '',
    nomineeRelation: '',
    nomineeAadharNumber: '',
    nomineePanNumber: '',
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    branchLocation: '',
    assignedTo: '',
});

const [attachments, setAttachments] = useState<{
  [key: string]: File | null;
  panAttachment: File | null;
  adhaarAttachment: File | null;
  nomineePanAttachment: File | null;
  nomineeAdhaarAttachment: File | null;
  cancelledChequeAttachment: File | null;
}>({
  panAttachment: null,
  adhaarAttachment: null,
  nomineePanAttachment: null,
  nomineeAdhaarAttachment: null,
  cancelledChequeAttachment: null,
});


    const [panFile, setPanFile] = useState<File | null>(null);
    const [aadharFile, setAadharFile] = useState<File | null>(null);
    const [nomineePanFile, setNomineePanFile] = useState<File | null>(null);
    const [nomineeAadharFile, setNomineeAadharFile] = useState<File | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [districtManagers, setDistrictManagers] = useState([]);

  // Fetch district managers
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const res = await axios.get('/api/managers/agentDistrictDropdown');
        setDistrictManagers(res.data.managers);
      } catch (err) {
        console.error('Error fetching district managers:', err);
      }
    };
    fetchManagers();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    let updatedValue = value;

    if (['firstName', 'lastName' ,'district', 'city', 'state'].includes(id) && value.length > 0) {
      updatedValue = value.charAt(0).toUpperCase() + value.slice(1);
    }

    // setFormData({ ...formData, [id]: updatedValue });
     setFormData((prev) => ({ ...prev, [id]: updatedValue }));
  };

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { id, files } = e.target;

  setAttachments((prev) => {
    // If no file is selected, remove this field from state (make it optional)
    if (!files || files.length === 0) {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    }

    // Otherwise, store the selected file
    return {
      ...prev,
      [id]: files[0],
    };
  });
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

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const formDataToSend = new FormData();

  // Append all other fields from formData
  for (const key in formData) {
    formDataToSend.append(key, formData[key as keyof typeof formData]);
  }

  // Append all files under the same "files" key (array-style)
  const fileInputs = document.querySelectorAll<HTMLInputElement>('input[type="file"][name="files"]');
  
  fileInputs.forEach((input) => {
    if (input.files && input.files.length > 0) {
      Array.from(input.files).forEach((file) => {
        formDataToSend.append('files', file); // Append all files to the 'files' key
      });
    }
  });

  try {
    const res = await axios.post('/api/createagent', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (res.status === 200 || res.status === 201) {
      alert('Agent created successfully!');
    } else {
      alert('Error creating agent.');
    }
  } catch (err) {
    console.error('Submission error:', err);
    alert('Failed to create agent.');
  }
};



  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Create Agent</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="id">Agent Code</label>
            <input
              type="text"
              id="agentCode"
              className={styles.input}
              placeholder="Enter Agent Code"
              value={formData.agentCode}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="name">First Name</label>
            <input
              type="text"
              id="firstName"
              className={styles.input}
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="name">Last Name</label>
            <input
              type="text"
              id="lastName"
              className={styles.input}
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className={styles.input}
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="name">Phone Number</label>
            <input
              type="number"
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
              id="password"
              className={styles.input}
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
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

        <div className={styles.row}>

          <div className={styles.formGroup}>
            <label htmlFor="pincode">Pin Code</label>
            <input
              type="text"
              id="pinCode"
              className={styles.input}
              placeholder="Enter pincode"
              inputMode="numeric"
              maxLength={6}
              value={formData.pinCode}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="district">District</label>
            <input
              type="text"
              id="district"
              className={styles.input}
              placeholder="Enter district"
              value={formData.district}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              className={styles.input}
              placeholder="Enter city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              className={styles.input}
              placeholder="Enter state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="panNumber">PAN Number</label>
            <input
              type="text"
              id="panNumber"
              className={styles.input}
              value={formData.panNumber}
              onChange={handleChange}
            />
            <input
              type="file"
              name="files"
              id="panAttachment"
              onChange={handleFileChange}
              accept="image/*,application/pdf"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="adhaarNumber">Aadhaar Number</label>
            <input
              type="text"
              id="adhaarNumber"
              className={styles.input}
              value={formData.adhaarNumber}
              onChange={handleChange}
            />
            <input
              type="file"
              id="adhaarAttachment"
              name="files"
              onChange={handleFileChange}
              accept="image/*,application/pdf"
              multiple
            />
          </div>          
        </div>

         <h3>Nominee Details</h3>
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="nomineeName">Nominee Name</label>
            <input
              type="text"
              id="nomineeName"
              className={styles.input}
              placeholder="Enter nominee name"
              value={formData.nomineeName}
              onChange={handleChange}
            />
          </div>  

          <div className={styles.formGroup}>
            <label htmlFor="nomineeRelation">Nominee Relation</label>
            <input
              type="text"
              id="nomineeRelation"
              className={styles.input}
              placeholder="Enter nominee relation"
              value={formData.nomineeRelation}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="nomineePanAttachment">Nominee PAN Number</label>
            <input
              type="text"
              id="nomineePanNumber"
              className={styles.input}
              value={formData.nomineePanNumber}
              onChange={handleChange}
            />
            <input
              type="file"
              id="nomineePanAttachment"
              onChange={handleFileChange}
              name="files"
              accept="image/*,application/pdf"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="nomineeAdhaarAttachment">Nominee Aadhaar Attachment</label>
            <input
              type="text"
              id="nomineeAadharNumber"
              className={styles.input}
              value={formData.nomineeAadharNumber}
              onChange={handleChange}
            />
            <input
              type="file"
              name="files"
              id="nomineeAadhaarAttachment"
              onChange={handleFileChange}
              accept="image/*,application/pdf"
              multiple
            />
          </div>
        </div>


        <h3>Bank Details</h3>
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label htmlFor="bankName">Bank Name</label>
              <input type="text" id="bankName" name="bankName" placeholder="Enter Bank Name" value={formData.bankName} onChange={handleChange}  />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="accountHolder">Account Holder Name</label>
              <input type="text" id="accountHolderName" name="accountHolder" placeholder="Enter Account Holder's Name" value={formData.accountHolderName} onChange={handleChange}  />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="accountNumber">Account Number</label>
              <input type="text" id="accountNumber" name="accountNumber" placeholder="Enter Account Number" value={formData.accountNumber} onChange={handleChange}  />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="ifsc">IFSC Code</label>
              <input type="text" id="ifscCode" name="ifsc" placeholder="Enter IFSC Code" value={formData.accountNumber} onChange={handleChange}  />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="branchName">Branch Name</label>
              <input type="text" id="branchLocation" name="branchLocation" value={formData.branchLocation} onChange={handleChange} placeholder="Enter Branch Name" />
            </div>

            {/* <div className={styles.formGroup}>
              <label htmlFor="accountType">Account Type</label>
              <select id="accountType" name="accountType" required>
                <option value="">Select Account Type</option>
                <option value="savings">Savings</option>
                <option value="current">Current</option>
              </select>
            </div> */}

            <div className={styles.formGroup}>
              <label htmlFor="cancelledCheque">Upload Cancelled Cheque (Optional)</label>
              <input
              id="cancelledChequeAttachment" 
              name="files" 
              type="file"
              onChange={handleFileChange}
              
              accept="image/*,application/pdf" />
            </div>
          </div>


        <div className={styles.formGroup}>
          <label htmlFor="assignedTo">Assign to District Manager</label>
          <select
            id="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className={styles.input}
            required
          >
            <option value="">Select Manager</option>
            {districtManagers.map((manager: any) => (
              <option key={manager.managerId} value={manager.managerId}>
                {manager.name} ({manager.managerId})
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className={styles.submitButton}>
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateAgent;
