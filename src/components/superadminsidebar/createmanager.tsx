

import React, { useState } from 'react';
import styles from '@/styles/components/superadminsidebar/createmanager.module.css';

const CreateManager = () => {
  const [selectedRole, setSelectedRole] = useState('');
  
  const [formData, setFormData] = useState({
  name: '',
  email: '',
  password: '',
  district: '',
  state: '',
  category: '',
  assignedTo: '', // 👈 Add this line
});


  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.FormEvent) => {
    const { id, value } = e.target as HTMLInputElement;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRoleChange = (e: React.FormEvent) => {
    const { value } = e.target as HTMLInputElement;
    setFormData((prev) => ({ ...prev, category: value }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    let assignedTo = null;

    if (formData.category === 'district') {
      // If assignedTo is stored as a string, no parsing needed
      assignedTo = formData.assignedTo?.trim();

      if (!assignedTo) {
        alert("Please select a valid state manager.");
        return;
      }
    }

    const response = await fetch("/api/createmanager", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        assignedTo: assignedTo || null, // keep null for national/state managers
      }),
    });

    if (!response.ok) throw new Error("Failed to create manager");

    alert("Manager created successfully!");
  } catch (err) {
    console.error("Error:", err);
    alert("Error creating manager");
  }
};



  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Create Manager</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" className={styles.input} placeholder="Enter full name" value={formData.name} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" className={styles.input} placeholder="Enter email" value={formData.email} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input type={showPassword ? 'text' : 'password'} id="password" className={styles.input} placeholder="Enter password" value={formData.password} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="district">District</label>
          <input type="text" id="district" className={styles.input} placeholder="Enter district" value={formData.district} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="state">State</label>
          <input type="text" id="state" className={styles.input} placeholder="Enter state" value={formData.state} onChange={handleChange} />
        </div>

        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input type="radio" name="managerRole" value="national" checked={formData.category === 'national'} onChange={handleRoleChange} />
            Make National Manager
          </label>
          <label className={styles.radioLabel}>
            <input type="radio" name="managerRole" value="state" checked={formData.category === 'state'} onChange={handleRoleChange} />
            Make State Manager
          </label>
          <label className={styles.radioLabel}>
            <input type="radio" name="managerRole" value="district" checked={formData.category === 'district'} onChange={handleRoleChange} />
            Make District Manager
          </label>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
            Show Password
          </label>
        </div>

        <button type="submit" className={styles.submitButton}>Create</button>
      </form>
    </div>
  );
};

export default CreateManager;