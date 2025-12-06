
import { useState } from "react";
import { useRouter } from "next/navigation";   // ✅ Correct router for App Router
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

  async function onSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/agent/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        // ❗ CHANGE THIS FIELD IF YOUR BACKEND EXPECTS loginId
        body: JSON.stringify({
          email: userName,
          password,
        }),
      });
      console.log("agent body:", body); 

      const data = await res.json(); // ✅ Only once

      if (!res.ok) {
        setError(true);
        alert(data.message || "Login failed. Please check your credentials.");
        return;
      }

      // Save token & agent info in localStorage
      localStorage.setItem("agentToken", data.token);
      localStorage.setItem("agentName", data.agent?.name || "");

      setError(false);

      // ✅ Redirect after successful login
      console.log("redirecting to agent page");
      router.push("/agentpage");
      console.log("successfully redirected to agent page");
    } catch (err) {
      console.log("error in try block");
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

            <h1 className={styles.heading}>Agent Login</h1>
            <p className={styles.headingp}>
              Access to the most powerful tool in the entire design and web industry.
            </p>

            <form className={styles.loginForm} onSubmit={onSubmit}>
              <div className={styles.error}>
                {error && <h4>Invalid Credentials</h4>}
              </div>

              <div className={styles.formInput}>
                <input
                  type="text"
                  name="uname"
                  id="uname"
                  placeholder="E-mail Address"
                  required
                  className={styles.input}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div className={styles.formInput}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="pass"
                  id="pass"
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
    </>
  );
}
