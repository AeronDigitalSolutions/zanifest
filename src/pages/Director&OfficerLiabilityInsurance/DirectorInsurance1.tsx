"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/pages/Director&OfficerLiabilityInsurance/DirectorInsurance1.module.css";
import {
  FaCheck,
  FaChevronLeft,
  FaShieldAlt,
  FaUserShield,
  FaWhatsapp,
} from "react-icons/fa";

// 🔹 Import insurer logos
import tata from "@/assets/TATAAIGlogo.png";
import orientalinsurance from "@/assets/OrintalInsurance.png";
import sbi from "@/assets/sbi.png";
import hdfc from "@/assets/unitedindia.png";
import director from "@/assets/Director.webp";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import "aos/dist/aos.css";
import { useEffect } from "react";
import AOS from "aos";
import { useRouter } from "next/navigation";

const DirectorInsurance1: React.FC = () => {
  const [whatsapp, setWhatsapp] = useState(true);

  const [step, setStep] = useState(1);
  const [industry, setIndustry] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const nextStep = () => setStep((s) => Math.min(3, s + 1));
  const prevStep = () => setStep((s) => Math.max(1, s - 1));
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        {/* ---------------- Left Section ---------------- */}
        <div className={styles.left}>
          <h4 className={styles.title}>Office Package Policy</h4>
          <h1 className={styles.mainHeading}>
            Get <span>₹50 Lakh</span> cover for just<span>₹4,000/year</span>+
          </h1>

          <div className={styles.features}>
            <span>
              <FaCheck className={styles.tick} />
              Fire damage to building & it's content
            </span>
            <span>
              <FaCheck className={styles.tick} />
              Damage to electronic equipments
            </span>
          </div>

          {/* ---------- Insurance Partners ---------- */}
          <div className={styles.imagePartnerRow}>
            <div className={styles.imageWrap}>
              <Image
                src={director}
                alt="Directors & Officers Liability"
                width={200}
                height={200}
                className={styles.directorImg}
                priority
              />
            </div>

            <div className={styles.partners}>
              <h3>10+ insurance partners</h3>
              <div className={styles.partnerRow}>
                <Image
                  src={hdfc}
                  alt="HDFC Ergo"
                  width={60}
                  height={40}
                  className={styles.partnerLogo}
                />
                <Image
                  src={orientalinsurance}
                  alt="Oriental Insurance"
                  width={60}
                  height={40}
                  className={styles.partnerLogo}
                />
                <Image
                  src={tata}
                  alt="Tata AIG"
                  width={60}
                  height={40}
                  className={styles.partnerLogo}
                />
                <Image
                  src={sbi}
                  alt="SBI General"
                  width={60}
                  height={40}
                  className={styles.partnerLogo}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- Right Section ---------------- */}
        <div className={styles.right} data-aos="fade-left">
          {/* ---------- Step 1 ---------- */}
          {step === 1 && (
            <div className={styles.card}>
              <h2>
                Get plans & check premium for your company instantly
                <span className={styles.step}>Step 1/3</span>
              </h2>

              <label className={styles.label}>Mobile number</label>
              <div className={styles.inputWrap}>
                <input type="text" placeholder="enter mobile number" />
                <FaCheck className={styles.iconCheck} />
              </div>
              <span className={styles.note}>
                <FaShieldAlt /> We don’t spam
              </span>
              <button className={styles.primaryBtn} onClick={nextStep}>
                View quotes →
              </button>

              <div className={styles.badge}>
                <FaUserShield className={styles.badgeIcon} />
                <p className={styles.badgetext}>
                  Only certified Zanifest expert will assist you
                </p>
              </div>

              <div className={styles.whatsappRow}>
                <div className={styles.wpLeft}>
                  <FaWhatsapp className={styles.wpIcon} />
                  <span>Get Quotes on Whatsapp</span>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={whatsapp}
                    onChange={() => setWhatsapp(!whatsapp)}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>

              {/* 🔹 Added disclaimer text */}
              <p className={styles.disclaimer}>
                By clicking on{" "}
                <span className={styles.bold}>"View quotes"</span>, you agree to
                our{" "}
                <a href="#" className={styles.link}>
                  Privacy Policy
                </a>
                ,
                <a href="#" className={styles.link}>
                  {" "}
                  Terms of Use
                </a>{" "}
                &
                <a href="#" className={styles.link}>
                  {" "}
                  +Disclaimer
                </a>
              </p>
            </div>
          )}

          {/* ---------- Step 2 ---------- */}
          {step === 2 && (
            <div className={styles.card} data-aos="fade-left">
              <button className={styles.backBtn} onClick={prevStep}>
                <FaChevronLeft /> Back
              </button>
              <h2>
                About your business{" "}
                <span className={styles.step}>Step 2/3</span>
              </h2>

              <label className={styles.label}>Company name</label>
              <input
                type="text"
                placeholder="Company name"
                className={styles.input}
              />

              <label className={styles.label}>Industry category</label>
              <select
                className={styles.select}
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              >
                <option value="">Select industry</option>
                <option>Banking Finance and Insurance (BFSI)</option>
                <option>
                  Computers, IT Services, Technology and Telecommunication
                </option>
                <option>Construction & real estate</option>
                <option>Manufacturing</option>
                <option>Medical & pharmaceuticals</option>
                <option>NGO</option>
                <option>Others</option>
                <option>Retail & E-commerce</option>
                <option>Services</option>
              </select>

              {industry && (
                <>
                  <label className={styles.label}>Sub-Category</label>
                  <select
                    className={styles.select}
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                  >
                    <option value="">Select sub-category</option>
                    <option>Consulting</option>
                    <option>IT & Technology services</option>
                    <option>Network security</option>
                    <option>Research and Development</option>
                    <option>Support</option>
                    <option>Telecom equipment and supplies</option>
                    <option>Telecom service provider</option>
                    <option>Training</option>
                  </select>
                </>
              )}

              <button className={styles.primaryBtn} onClick={nextStep}>
                Continue →
              </button>
            </div>
          )}

          {/* ---------- Step 3 ---------- */}
          {/* ---------- Step 3 ---------- */}
          {step === 3 && (
            <div className={styles.card} data-aos="fade-left">
              <button className={styles.backBtn} onClick={prevStep}>
                <FaChevronLeft /> Back
              </button>
              <h2>
                About your business{" "}
                <span className={styles.step}>Step 3/3</span>
              </h2>

              <label className={styles.label}>Territory</label>
              <div className={styles.dualInput}>
                <input
                  type="text"
                  placeholder="Enter territory"
                  className={styles.input}
                />
              </div>

              <label className={styles.label}>Jurisdiction</label>
              <div className={styles.dualInput}>
                <input
                  type="text"
                  placeholder="Enter jurisdiction"
                  className={styles.input}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Company Turnover</label>
                <div className={styles.currencyRow}>
                  <input
                    type="text"
                    placeholder="Enter turnover (e.g. ₹ 5,00,00,000)"
                    className={styles.input}
                  />
                </div>
                <p className={styles.hint}>Example: Five Crore</p>
              </div>

              <label className={styles.label}>Limit of Liability</label>
              <div className={styles.fieldGroup}>
                <input
                  type="text" 
                  placeholder="Enter limit of liability"
                  className={styles.input}
                />
                <p className={styles.hint}>i Example: 30000000</p>
              </div>

              <button
                className={styles.primaryBtn}
                onClick={() => router.push("DirectorInsurance2")}
              >
                Continue →
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DirectorInsurance1;
