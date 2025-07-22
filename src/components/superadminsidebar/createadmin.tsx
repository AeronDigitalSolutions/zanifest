import React, { useState } from 'react';
import styles from '@/styles/components/superadminsidebar/createadmin.module.css';

const CreateAdmin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      userName, // ✅ change from `name` to `userName`
      email,
      password,
      role: isSuperAdmin ? 'superadmin' : 'admin'
    };

    try {
      const res = await fetch('/api/createadmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (res.ok) {
        alert('Admin created successfully!');
        setUserName('');
        setEmail('');
        setPassword('');
        setIsSuperAdmin(false);
        setShowPassword(false);
      } else {
        alert(result.message || 'Failed to create admin.');
      }
    } 
    catch (error) {
      console.error('Error creating admin:', error);
      alert('Server error!');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Create Admin</h2>
      <form className={styles.form} onSubmit={handleSubmit}> 
        {/* Row 1: First Name + Last Name */}
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="fullName">First Name</label>
            <input type="text" id="userName" className={styles.input} placeholder="Enter full name" 
            value={userName}
            onChange={(e)=> setUserName(e.target.value) }
            />
          </div>
          {/* <div className={styles.formGroup}>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" className={styles.input} placeholder="Enter last name" />
          </div> */}
        </div>

        {/* Row 2: Email + Password */}
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className={styles.input} placeholder="Enter email" 
             value={email}
            onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className={styles.input}
              placeholder="Enter password"
               value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          </div>
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


