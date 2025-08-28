"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // ✅ Import router
import styles from "@/styles/pages/DoctorInd/doctorinsurance.module.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import UserDetails from "@/components/ui/UserDetails";
import manager from "@/assets/doctor/stethoscope.png";

const InsurancePage: React.FC = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [whatsapp, setWhatsapp] = useState(true);

  const router = useRouter(); // ✅ Initialize router

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to DoctorInsurance2 page
    router.push("DoctorInsurance2"); // ✅ Replace with your actual route
  };

  return (
    <>
      <UserDetails />
      <Navbar />

      <section className={styles.wrapper}>
        <div className={styles.inner}>
          {/* Left Text Content */}
          <div className={styles.textBlock}>
            <h4 className={styles.subHeading}>
              Professional Indemnity Insurance for Doctors
            </h4>

            <h1 className={styles.title}>
              Get <span className={styles.highlight}>₹1 crore</span> cover starting at
            </h1>

            <div className={styles.priceRow}>
              <span className={styles.price}>₹2,500/year</span>
              <sup className={styles.plus}>+</sup>
            </div>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.inputWrap}>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.input}
                  autoComplete="name"
                />
                {name && <span className={styles.check}>✔</span>}
              </div>

              <div className={styles.inputWrap}>
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className={styles.input}
                  autoComplete="tel"
                />
                {mobile && <span className={styles.check}>✔</span>}
              </div>

              <button className={styles.btn} type="submit">
                View plans
              </button>
            </form>

            <div className={styles.inlineSmall}>
              <label className={styles.whatsappLabel}>
                <input
                  type="checkbox"
                  checked={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.checked)}
                  className={styles.checkbox}
                />
                <span>Get Updates on WhatsApp</span>
              </label>
              <span className={styles.whatsIcon}>💬</span>
            </div>

            <p className={styles.terms}>
              By clicking on "View plans" you agree to our{" "}
              <a href="#" className={styles.link}>
                Privacy Policy
              </a>{" "}
              &{" "}
              <a href="#" className={styles.link}>
                Terms Of Use
              </a>
            </p>

            <div className={styles.features}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>⚖️</span>
                <p className={styles.featureText}>Medico-Legal Lawyer Panel</p>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>⏱️</span>
                <p className={styles.featureText}>Within 6 hrs Lawyer Allocation</p>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>📑</span>
                <p className={styles.featureText}>10000+ Doctors Covered</p>
              </div>
            </div>
          </div>

          {/* Right Image (hidden on mobile via CSS) */}
          <div className={styles.imageBlock}>
            <Image
              src={manager}
              alt="Stethoscope"
              className={styles.stethoscopeImg}
              priority
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default InsurancePage;
