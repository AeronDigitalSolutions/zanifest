"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/components/Auth/Login.module.css";
import Image from "next/image";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function AdminLogin() {
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // ✅ show loader
    setError(false);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(true);
        alert(data.message || "Login failed");
        setLoading(false);
        return;
      }

      if (data.role === "superadmin") {
        router.push("/superadmin");
      } else if (data.role === "admin") {
        router.push("/admindashboard");
      } else {
        alert("Unauthorized Role");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false); // ✅ hide loader
    }
  };

  return (
    <div className={styles.cont}>
      {/* 🔥 Full Page Loader */}
      {loading && (
        <div className={styles.loaderOverlay}>
          <AiOutlineLoading3Quarters className={styles.pageLoader} />
          <p>Loading, please wait...</p>
        </div>
      )}

      <div className={styles.left}>
        <Image
          src={require("@/assets/loginbanner.png")}
          alt="image"
          className={styles.leftImage}
        />
      </div>

      <div className={styles.loginCont}>
        <div className={styles.formDiv}>
          <div className={styles.logo}>
            <Image
              src={require("@/assets/logo.png")}
              alt="logo"
              className={styles.logoImage}
            />
          </div>

          <h1 className={styles.heading}>Admin Login</h1>
          <p className={styles.headingp}>
            Access to the most powerful tool in the entire design and web
            industry.
          </p>

          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div className={styles.error}>
              {error && <h4>Invalid Credentials</h4>}
            </div>

            <div className={styles.formInput}>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="E-mail Address"
                required
                className={styles.input}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.formInput}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                required
                className={styles.input}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className={styles.showPasswordDiv}>
              <input
                type="checkbox"
                id="showP"
                className={styles.passCheck}
                onClick={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="showP">Show Password</label>
            </div>

            <button
              className={styles.loginButton}
              disabled={loading}
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
