

import React, { useState } from 'react';
import styles from '@/styles/components/superadminsidebar/createagent.module.css';

const CreateAgent = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Create Agent</h2>
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
          <label htmlFor="district">District</label>
          <input type="text" id="district" className={styles.input} placeholder="Enter district" />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="city">City</label>
          <input type="text" id="city" className={styles.input} placeholder="Enter city" />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="state">State</label>
          <input type="text" id="state" className={styles.input} placeholder="Enter state" />
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

export default CreateAgent;