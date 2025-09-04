import { useState } from "react";
import { useRouter } from "next/router";
import { FaSpinner } from "react-icons/fa"; // ✅ Spinner icon
import styles from "@/styles/components/Auth/Login.module.css";
import Image from "next/image";

export default function Agentlogin() {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true); // ✅ show loader overlay

    try {
      const res = await fetch("/api/agent/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userName, password }),
      });

      if (!res.ok) {
        alert("Login failed. Please check your credentials.");
        setError(true);
        setLoading(false);
        return;
      }

      const data = await res.json();
      console.log("Login successful:", data);

      localStorage.setItem("agentToken", data.token);
      localStorage.setItem("agentName", data.agent.name);

      setError(false);
      router.push("/agentpage");
    } catch (err) {
      console.error("Login failed:", err);
      setError(true);
      setLoading(false);
    }
  }

  return (
    <>
      {/* ✅ Full-page overlay loader */}
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
              Access to the most powerful tool in the entire design and web
              industry.
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
