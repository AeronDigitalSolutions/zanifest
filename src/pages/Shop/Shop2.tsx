"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import shopIllustration from "@/assets/pageImages/fire_insurance.png";
import digit from "@/assets/pageImages/digit.png";
import reliance from "@/assets/pageImages/reliance.png";
import chola from "@/assets/home/chola ms.png";
import future from "@/assets/pageImages/insurance.png";
import styles from "@/styles/pages/Shop/shop2.module.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const Shop2 = () => {
  const router = useRouter();
  const [selectedBusiness, setSelectedBusiness] = useState("Offices");
  const [customBusiness, setCustomBusiness] = useState("");
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [ownerType, setOwnerType] = useState("Owned");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleBusinessClick = (option: string) => {
    if (option === "Other") {
      setIsOtherSelected(true);
      setSelectedBusiness("Other");
    } else {
      setIsOtherSelected(false);
      setSelectedBusiness(option);
      setCustomBusiness("");
    }
  };

  const handleCustomChange = (value: string) => {
    setCustomBusiness(value);
    setSelectedBusiness(value || "Other");
  };

  // ✅ Submit Data to Backend
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const step1 = localStorage.getItem("shopDataStep1");

      if (!step1) {
        alert("Please complete Step 1 first.");
        router.push("/Shop1");
        return;
      }

      const step1Data = JSON.parse(step1);

      const finalData = {
        ...step1Data,
        businessCategory: selectedBusiness.toLowerCase().replace(/ /g, "_"),
        businessType: isOtherSelected ? customBusiness : undefined,
        ownership: ownerType.toLowerCase(),
      };

      const res = await fetch("/api/shopinsurance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      const data = await res.json();

      if (!data.success) {
        alert("Save failed!");
        return;
      }

      localStorage.removeItem("shopDataStep1");

      alert("Data Saved ✔");

      router.push("/shop3");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        {/* LEFT SECTION */}
        <div className={styles.left}>
          <h4 className={styles.subHeading}>Shop Insurance</h4>
          <h2 className={styles.heading}>
            Get <span className={styles.highlight}>₹50 Lakh</span> cover starting
            at just <span className={styles.price}>₹3,400/year*</span>
          </h2>

          <div className={styles.features}>
            <span>🔥 Fire & Natural Disaster</span>
            <span>🔒 Theft within 7 days of Peril Occurrence</span>
          </div>

          <div className={styles.middle}>
            <Image
              src={shopIllustration}
              alt="Shop Fire Insurance Illustration"
              className={styles.illustration}
            />

            <div className={styles.partnersBox}>
              <p className={styles.partnerHeading}>10+ insurance partners</p>
              <div className={styles.partnersGrid}>
                <div className={styles.partner}>
                  <Image src={digit} alt="Digit" />
                </div>
                <div className={styles.partner}>
                  <Image src={reliance} alt="Reliance" />
                </div>
                <div className={styles.partner}>
                  <Image src={chola} alt="Chola MS" />
                </div>
                <div className={styles.partner}>
                  <Image src={future} alt="Future Generali" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className={styles.right} data-aos="fade-left">
          <div className={styles.card}>
            <h3 className={styles.cardHeading}>About your business</h3>

            <div className={styles.businessOptions}>
              {[
                "Offices",
                "Shops",
                "Hospitals and Clinics",
                "Restaurants",
                "Godown Storage (non hazardous goods)",
                "Other",
              ].map((option) => (
                <button
                  key={option}
                  className={`${styles.optionBtn} ${
                    selectedBusiness === option ? styles.active : ""
                  }`}
                  onClick={() => handleBusinessClick(option)}
                >
                  {option === "Other" && customBusiness && !isOtherSelected
                    ? customBusiness
                    : option}
                </button>
              ))}
            </div>

            {isOtherSelected && (
              <div className={styles.otherInputBox}>
                <input
                  type="text"
                  placeholder="Enter your business type"
                  value={customBusiness}
                  onChange={(e) => handleCustomChange(e.target.value)}
                  className={styles.textField}
                />
              </div>
            )}

            <p className={styles.subText}>Are you the owner or tenant?</p>
            <div className={styles.ownerTenant}>
              <div
                className={`${styles.option} ${
                  ownerType === "Owned" ? styles.active : ""
                }`}
                onClick={() => setOwnerType("Owned")}
              >
                <span>🏠</span>
                <p>Owned</p>
                <small>The person who owns the property</small>
              </div>
              <div
                className={`${styles.option} ${
                  ownerType === "Tenant" ? styles.active : ""
                }`}
                onClick={() => setOwnerType("Tenant")}
              >
                <span>🔑</span>
                <p>Tenant</p>
                <small>The person who rents the property</small>
              </div>
            </div>

            <button
              className={styles.continueBtn}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Saving..." : "Continue →"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shop2;
