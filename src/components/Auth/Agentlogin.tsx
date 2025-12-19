"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import styles from "@/styles/components/Auth/Login.module.css";
import Image from "next/image";
import { body } from "framer-motion/client";

export default function Agentlogin() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function onSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/agent/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userName,
          password,
        }),
      });

      console.log("agent body:", body);

      const data = await res.json();

      if (!res.ok) {
        setError(true);
        alert(data.message || "Login failed. Please check your credentials.");
        return;
      }

      console.log("Login Success:", data);

      // ✅ Save agent auth data
      localStorage.setItem("agentToken", data.token);
      localStorage.setItem("agentName", data.agent?.name || "");

      setError(false);

      // ✅ UPDATED TRAINING LOGIC
      const testPassed =
        localStorage.getItem("agentTestPassed") === "true";

      if (testPassed) {
        // already passed → skip training
        router.push("/agentpage");
      } else {
        // not passed → go to training (resume handled there)
        router.push("/videolectures");
      }

      console.log("Redirect executed successfully");
    } catch (err) {
      console.error("Login failed:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && (
        <div className={styles.loaderOverlay}>
          <FaSpinner className={styles.loaderIcon} />
          <p className={styles.loaderText}>Logging in...</p>
        </div>
      )}

      <div className={styles.cont}>
        {/* LEFT IMAGE SECTION */}
        <div className={styles.left}>
          <Image
            src={require("@/assets/loginbanner.png")}
            alt="image"
            className={styles.leftImage}
          />
        </div>

        {/* LOGIN FORM */}
        <div className={styles.loginCont}>
          <div className={styles.formDiv}>
            {/* LOGO */}
            <div className={styles.logo}>
              <Image
                src={require("@/assets/logo.png")}
                alt="logo"
                className={styles.logoImage}
              />
            </div>

            <h1 className={styles.heading}>Agent Login</h1>
            <p className={styles.headingp}>
              Access to the most powerful tool in the insurance industry.
            </p>

            <form className={styles.loginForm} onSubmit={onSubmit}>
              <div className={styles.error}>
                {error && <h4>Invalid Credentials</h4>}
              </div>

              {/* EMAIL INPUT */}
              <div className={styles.formInput}>
                <input
                  type="text"
                  placeholder="E-mail Address"
                  required
                  className={styles.input}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              {/* PASSWORD INPUT */}
              <div className={styles.formInput}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  className={styles.input}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* SHOW PASSWORD */}
              <div className={styles.showPasswordDiv}>
                <input
                  type="checkbox"
                  id="showP"
                  className={styles.passCheck}
                  onClick={() => setShowPassword(!showPassword)}
                />
                <label htmlFor="showP">Show Password</label>
              </div>

              {/* LOGIN BUTTON */}
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
    </>
  );
}
