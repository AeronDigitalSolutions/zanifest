import { useState } from "react";
import { useRouter } from "next/router";
import { IoIosArrowBack } from "react-icons/io";
import styles from "@/styles/components/Auth/Login.module.css";
import Image from "next/image";
import { signIn } from "next-auth/react";



export default function Login() {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
const [email, setEmail] = useState<string>("");
  const router = useRouter();

  // async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   setLoading(true);

  //   if (userName === "admin" && password === "admin@123") {
  //     setError(false);
  //     router.push("/dashboard");
  //   } else {
  //     setError(true);
  //   }

  //   setLoading(false);
  // }


  //added by ashwina
//   const onSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   const res = await fetch('/api/auth/login', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ email, password }),
//   });

//   const data = await res.json();
//   console.log(data);
//   if (res.ok) {
//     router.push("/dashboard");
//   } else {
//     alert(data.message);
//   }
// };

//letting nextauth handle 

const onSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  //using auth.js callback -> work is being done by [...nextauth].ts
  const res = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  if (res?.ok) {
    router.push("/dashboard");
  } else {
    alert("Invalid credentials");
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
            Get more things done with Login platform.
          </h1>
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
                onChange={(e) => setEmail(e.target.value)}
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
              {loading ? "Loading" : "Login"}
            </button>

            <p className={styles.signupLink}>
              Don't have an account?{" "}
              <span
                className={styles.signupText}
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}