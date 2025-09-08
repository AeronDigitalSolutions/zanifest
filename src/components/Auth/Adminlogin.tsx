import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/components/Auth/Login.module.css";
import Image from "next/image";
import { toast } from 'react-hot-toast';


export default function AdminLogin() {
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState("");

  const router = useRouter();

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

  try {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    // console.log("Login response:", data);

    // if (data.token) {
    //   localStorage.setItem('token', data.token);  // ✅ Save it
    //   // console.log('Token saved:', data.token);
    // }

    if (!res.ok) {
      toast.error(data.message || "Login failed");
      return;
    }

    // Redirect based on role
    if (data.role === "superadmin") {
      // window.location.href = "/superadmin";
      router.push("/superadmin");
    } else if (data.role === "admin") {
      // window.location.href = "/admin";
      router.push("/admindashboard");
    } else {
      toast.error("Unauthorized Role");
    }
  } catch (error) 
  {
    console.error("Login error:", error);
    toast.error("Something went wrong");
  }
};


  return (
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

          <h1 className={styles.heading}>
            Admin Login 
          </h1>
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
              {loading ? "Loading" : "Login"}
            </button>

            {/* <p className={styles.signupLink}>
              Don't have an account?{" "}
              <span
                className={styles.signupText}
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </span>
            </p> */}
          </form>
        </div>
      </div>
    </div>
  );
}