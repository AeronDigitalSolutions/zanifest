
import React, { useState } from 'react';
import styles from '@/styles/components/superadminsidebar/createadmin.module.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const CreateAdmin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const capitalizeFirstLetter = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const capitalized = capitalizeFirstLetter(e.target.value);
    setUserName(capitalized);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      userName,
      email,
      password,
      role: isSuperAdmin ? 'superadmin' : 'admin',
    };

    try {
      const res = await fetch('/api/createadmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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
    } catch (error) {
      console.error('Error creating admin:', error);
      alert('Server error!');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Create Admin</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="userName">First Name</label>
            <input
              type="text"
              id="userName"
              className={styles.input}
              placeholder="Enter full name"
              value={userName}
              onChange={handleUserNameChange}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className={styles.input}
              placeholder="Enter email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

       <div className={styles.formGroup} style={{ position: 'relative' }}>
  <label htmlFor="password">Password</label>
  <input
    type={showPassword ? 'text' : 'password'}
    id="password"
    className={styles.input}
    placeholder="Enter password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <span
    className={styles.eyeIcon}
    style={{ position: 'absolute', right: 10, top: 38, cursor: 'pointer' }}
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <FiEyeOff /> : <FiEye />}
  </span>
</div>

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

        <button type="submit" className={styles.submitButton}>
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateAdmin;
