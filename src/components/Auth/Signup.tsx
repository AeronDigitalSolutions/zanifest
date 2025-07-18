import { useState, FormEvent } from "react";
import { useRouter } from "next/router";

import { IoIosArrowBack } from "react-icons/io";
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (userName.trim() && email.trim() && password.length >= 6) {
      setError(false);
      setTimeout(() => {
        router.push("/dashboard");
        setLoading(false);
      }, 1000);
    } else {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className={styles.cont}>
      <div className={styles.left}>
        <Image src={loginBanner} alt="signup-banner" className={styles.leftImage} />
      </div>

      <div className={styles.loginCont}>
        {/* <button className={styles.goback} onClick={() => router.push("/")}>
          <IoIosArrowBack size="30px" /> Back to Home
        </button> */}

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
                onChange={(e) => setUserName(e.target.value)}
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

            <div className={styles.formInput}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.showPasswordDiv}>
              <input
                type="checkbox"
                id="showPass"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className={styles.passCheck}
              />
              <label htmlFor="showPass">Show Password</label>
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