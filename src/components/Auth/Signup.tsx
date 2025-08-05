import { useState, FormEvent } from "react";
import { useRouter } from "next/router";


import { FiEye, FiEyeOff } from "react-icons/fi";
import Image from "next/image";
import styles from "@/styles/components/Auth/Login.module.css";

import loginBanner from "@/assets/loginbanner.png";
import logo from "@/assets/logo.png";

export default function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Signup successful");
      router.push("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className={styles.cont}>
      <div className={styles.left}>
        <Image src={loginBanner} alt="signup-banner" className={styles.leftImage} />
      </div>

      <div className={styles.loginCont}>
        <div className={styles.formDiv}>
          <div className={styles.logo}>
            <Image src={logo} alt="logo" className={styles.logoImage} />
          </div>

          <h1 className={styles.heading}>Join the Loggin Platform</h1>
          <p className={styles.headingp}>
            Create your account to unlock the full potential of our tools.
          </p>

          <form onSubmit={handleSubmit} className={styles.loginForm}>
            {error && (
              <div className={styles.error}>
                <h4>Please fill all fields properly</h4>
              </div>
            )}

            <div className={styles.formInput}>
              <input
                type="text"
                placeholder="Full Name"
                value={userName}
                onChange={(e) => {
                  const input = e.target.value;
                  const capitalized = input.charAt(0).toUpperCase() + input.slice(1);
                  setUserName(capitalized);
                }}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formInput}>
              <input
                type="email"
                placeholder="E-mail Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            {/* Password Input with Icon */}
            <div className={styles.formInput} style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#555",
                }}
              >
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </span>
            </div>

            <button
              className={styles.loginButton}
              disabled={loading}
              type="submit"
            >
              {loading ? "Registering..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
