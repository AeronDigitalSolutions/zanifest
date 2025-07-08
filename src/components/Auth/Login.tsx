import { useState } from "react";
import { useRouter } from "next/router";

import { IoIosArrowBack } from "react-icons/io";

import styles from "@/styles/components/Auth/Login.module.css";
import Image from "next/image";

export default function Login() {
  const [userName, setUserName] = useState<any>();
  const [password, setPassword] = useState<any>();
  const [showPassword, setShowPassword] = useState<any>(false);
  const [error, setError] = useState<any>(false);
  const [loading, setLoading] = useState<any>(false);

  const router = useRouter();

  async function onSubmit(event: any) {
    event.preventDefault();
    setLoading(true);

    if (userName == "admin" && password == "admin@123") {
      setError(false);
      router.push("/dashboard");
    } else {
      setError(true);
    }
    setLoading(false);
  }

  return (
    <div className={`${styles.cont}`}>
      <div className={styles.left}>
        <Image
          src={require("@/assets/loginbanner.png")}
          alt="image"
          className={styles.leftImage}
        />
      </div>
      <div className={styles.loginCont}>
        {/* <button
          className={`${styles.goback}`}
          onClick={() => {
            router.push("/");
          }}
        >
          <IoIosArrowBack size="30px" /> Back to Home
        </button> */}

        <div className={`${styles.formDiv}`}>
          <div className={styles.logo}>
            <Image
              src={require("@/assets/logo.png")}
              alt="logo"
              className={styles.logoImage}
            />
          </div>
          <h1 className={`${styles.heading}`}>
            Get more things done with Loggin platform.
          </h1>
          <p className={`${styles.headingp}`}>
            Access to the most powerfull tool in the entire design and web
            industry.
          </p>
          <form action="" className={styles.loginForm} onSubmit={onSubmit}>
            <div className={`${styles.error}`}>
              {error && <h4>Invalid Credentials</h4>}
            </div>
            <div className={styles.formInput}>
              <input
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                type="text"
                name="uname"
                id="uname"
                placeholder="E-mail Address"
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formInput}>
              <input
                className={styles.input}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type={showPassword ? "text" : "password"}
                name="pass"
                id="pass"
                placeholder={showPassword ? "Password" : "Password"}
                required
              />
            </div>
            <div className={`${styles.showPasswordDiv}`}>
              <input
                type="checkbox"
                id="showP"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className={`${styles.passCheck}`}
              />
              <label htmlFor="showP">Show Password</label>
            </div>

            <button
              className={styles.loginButton}
              disabled={loading}
              type="submit"
            >
              {loading ? "Loading" : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
