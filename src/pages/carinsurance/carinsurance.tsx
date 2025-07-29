  import React from "react";
  import Footer from "@/components/ui/Footer";
  import Navbar from "@/components/ui/Navbar";
  import UserDetails from "@/components/ui/UserDetails";

  import styles from "@/styles/pages/carinsurance.module.css";
  import Image from "next/image";
  import { FaArrowRight } from "react-icons/fa6";
  import {useRouter} from 'next/router';

  function carinsurance() {
    const router =useRouter();

    return (
      <div>
        <UserDetails />
        <Navbar />
        <div className={styles.cont}>
          <div className={styles.imageCont}>
            <Image
              src={require("@/assets/pageImages/blackcar.png")}
              alt="car Image"
              className={styles.image}
            />
          </div>
          <div className={styles.bottom}>
            <p className={styles.heading}>
              Compare & <b className={styles.bold}>save upto 90%</b> on car
              insurance
            </p>
            <div className={styles.form}>
              <input
                type="text"
                placeholder="Enter car number (eg - DL-10-CB-1234)"
                className={styles.input}
              />
            <button
    className={styles.button}
    onClick={() => router.push("./carinsurance2")}
  >
    View Prices <FaArrowRight />
  </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  export default carinsurance;
