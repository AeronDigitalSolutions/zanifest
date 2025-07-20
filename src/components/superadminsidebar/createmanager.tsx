

import React, { useState } from 'react';
import styles from '@/styles/components/superadminsidebar/createmanager.module.css';

const CreateManager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Create Manager</h2>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="fullName">Full Name</label>
          <input type="text" id="fullName" className={styles.input} placeholder="Enter full name" />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" className={styles.input} placeholder="Enter email" />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            className={styles.input}
            placeholder="Enter password"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="district">District</label>
          <input type="text" id="district" className={styles.input} placeholder="Enter district" />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="state">State</label>
          <input type="text" id="state" className={styles.input} placeholder="Enter state" />
        </div>

        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="managerRole"
              value="national"
              checked={selectedRole === 'national'}
              onChange={(e) => setSelectedRole(e.target.value)}
            />
            Make National Manager
          </label>

          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="managerRole"
              value="state"
              checked={selectedRole === 'state'}
              onChange={(e) => setSelectedRole(e.target.value)}
            />
            Make State Manager
          </label>

          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="managerRole"
              value="district"
              checked={selectedRole === 'district'}
              onChange={(e) => setSelectedRole(e.target.value)}
            />
            Make District Manager
          </label>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Show Password
          </label>
        </div>

        <button type="submit" className={styles.submitButton}>Create</button>
      </form>
    </div>
  );
};

export default CreateManager;