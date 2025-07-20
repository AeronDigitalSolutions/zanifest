import React, { useState } from 'react';
import styles from '@/styles/components/superadminsidebar/createadmin.module.css';

const CreateAdmin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Create Admin</h2>
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

        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={isSuperAdmin}
              onChange={() => setIsSuperAdmin(!isSuperAdmin)}
            />
            Make Super Admin
          </label>
        </div>

        <button type="submit" className={styles.submitButton}>Create</button>
      </form>
    </div>
  );
};

export default CreateAdmin;