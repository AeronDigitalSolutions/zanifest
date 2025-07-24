"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FiEye, FiEyeOff } from "react-icons/fi";
import logo from "@/assets/logo.png"; 
import styles from "@/styles/components/superadminsidebar/changepassword.module.css";

const resetpassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* <div className={styles.logoContainer}>
          <Image src={logo} alt="Logo" width={100} />
        </div> */}

        <h2 className={styles.title}>Reset Password</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
         

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
               Current Password
            </label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
              />
              <span className={styles.eyeIcon} onClick={handleTogglePassword}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
               New Password
            </label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
              />
              <span className={styles.eyeIcon} onClick={handleTogglePassword}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>

         

          <button type="submit" className={styles.loginBtn}>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default resetpassword;
