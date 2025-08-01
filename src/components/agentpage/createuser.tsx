"use client";
import React, { useState } from "react";
import styles from "@/styles/components/superadminsidebar/changepassword.module.css"; 

const CreateUser = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/admin/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to create user");

      alert("User created successfully");
      setFullName("");
      setEmail("");
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Create User</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="fullname" className={styles.label}>
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <button type="submit" className={styles.loginBtn}>
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
