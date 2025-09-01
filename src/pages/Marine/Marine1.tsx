import React, { useState } from "react";
import styles from "@/styles/pages/marine/marine.module.css";
import Image from "next/image";

// Assets
import tata from "@/assets/home/partners/2.png";
import orientalinsurance from "@/assets/home/partners/1.png";
import sbi from "@/assets/home/partners/13.png";
import hdfc from "@/assets/home/partners/4.png";
import marine from "@/assets/marine/marine-prequote-bannerv2.webp";
import { useRouter } from "next/navigation";
import { MdArrowBackIos } from "react-icons/md";



// Icons
import {
  FaCheck,
  FaChevronDown,
  FaCogs,
  FaMobileAlt,
  FaShieldAlt,
  FaUserShield,
  FaWhatsapp,
} from "react-icons/fa";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const Marine: React.FC = () => {
  const [whatsapp, setWhatsapp] = useState(true);
  const [step, setStep] = useState(1);

  // Step 2 states
  const [commodity, setCommodity] = useState("");
  const [coverType, setCoverType] = useState("single");
  const [shipmentType, setShipmentType] = useState("inland");
  const [showDropdown, setShowDropdown] = useState(false);

  // Commodity options array
  const commodityOptions = [
    "New machinery or equipment for industrial use",
    "Iron & steel rods, metal pipes, tubes",
    "Electronic and white goods",
    "Automobiles",
    "All types of FMCG commodities",
    "Machinery machine tools spares duly packed/lashed",
    "All kinds of food like oils essence flavours and other various packed items",
    "Auto spare parts",
    "Graphite and marble"
  ];
    const router = useRouter();
  

  return (
    <>
    <Navbar/>
    <section className={styles.container}>
      {/* === Left Section === */}
      <div className={styles.left}>
        <h4 className={styles.subheading}>Marine Insurance</h4>
        <h1 className={styles.heading}>
          <span className={styles.iconWrapper}>
            <FaCogs />
          </span>
          Compare and Save <span className={styles.highlight}>upto 42%</span>
          <sup className={styles.sup}>++</sup>
        </h1>

        {/* Features */}
        <div className={styles.features}>
          <span>
            <FaCheck className={styles.tick}/> Overturning or Derailement
          </span>
          <span>
            <FaCheck  className={styles.tick}/> Breakage of bridge
          </span>
          <span>
            <FaCheck  className={styles.tick}/> Collision
          </span>
        </div>

        {/* Illustration + Partners */}
        <div className={styles.row}>
          <div className={styles.illustration}>
            <Image src={marine} alt="Truck and Plane" priority />
          </div>
          <div className={styles.partners}>
            <h3>10+ insurance partners</h3>
            <div className={styles.partnerGrid}>
              <Image className={styles.img} src={hdfc} alt="HDFC Ergo" />
              <Image  className={styles.img} src={orientalinsurance} alt="Oriental Insurance" />
              <Image  className={styles.img} src={tata} alt="Tata AIG" />
              <Image src={sbi} alt="SBI General" />
            </div>
          </div>
        </div>
      </div>

      {/* === Right Section (Form Card) === */}
      <div className={styles.right}>
        <div className={styles.card}>
          {step === 1 && (
            <>
              <div className={styles.header}>

                <h2>
                  Get <span className={styles.blue}>₹10 Lakh</span> cover
                  starting at
                </h2>
                <p className={styles.price}>
                  ₹591<span>/transit<sup>+</sup></span>
                </p>
                <span className={styles.step}>Step 1/2</span>
              </div>

              {/* Input */}
              <div className={styles.inputWrapper}>
                <FaMobileAlt className={styles.inputIcon} />
                <input type="text" placeholder="Mobile number" />
                <span className={styles.note}>
                  <FaShieldAlt /> We don't spam
                </span>
              </div>

              {/* CTA */}
              <button className={styles.cta} onClick={() => setStep(2)}>
                View plans <span className={styles.arrow}>›</span>
              </button>

              {/* Badge */}
              <div className={styles.badge}>
                <FaUserShield className={styles.badgeIcon} />
                <p className={styles.badgetext}>Only certified Policybazaar expert will assist you</p>
              </div>

              {/* WhatsApp toggle */}
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

              {/* Footer */}
              <p className={styles.footer}>
                By clicking on <b>"View plans"</b>, you agree to our{" "}
                <a href="#">Privacy Policy</a>, <a href="#">Terms of Use</a> &{" "}
                <a href="#">Disclaimer</a>
              </p>
            </>
          )}

          {step === 2 && (
            <>
              <div className={styles.header}>
                                <MdArrowBackIos size={20} className={styles.arrow}/>

                <h2>Let's get your goods insured</h2>
                <span className={styles.step}>Step 2/2</span>
              </div>

              {/* Commodity Type */}
              <label className={styles.label}>
                What type of goods are you sending?
              </label>
               
              {/* Dropdown Input */}
              <div className={styles.dropdownWrapper}>
                <div 
                  className={styles.dropdownInput}
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <input
                    type="text"
                    placeholder="Commodity type"
                    value={commodity}
                    onChange={(e) => setCommodity(e.target.value)}
                    className={styles.commodityInput}
                    readOnly
                  />
                  <FaChevronDown className={`${styles.dropdownIcon} ${showDropdown ? styles.rotated : ''}`} />
                </div>
                
                {showDropdown && (
                  <div className={styles.dropdownList}>
                    {commodityOptions.map((item, i) => (
                      <div
                        key={i}
                        className={`${styles.dropdownItem} ${
                          commodity === item ? styles.selectedItem : ""
                        }`}
                        onClick={() => {
                          setCommodity(item);
                          setShowDropdown(false);
                        }}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <p className={styles.popularText}>
                Select most popular commodity type
              </p>
              <div className={styles.optionsGrid}>
                {commodityOptions.slice(0, 5).map((item, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`${styles.optionBtn} ${
                      commodity === item ? styles.activeOption : ""
                    }`}
                    onClick={() => setCommodity(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Type of Cover */}
              <label className={styles.label}>What type of cover do you want?</label>
              <div className={styles.radioRow}>
                <label
                  className={`${styles.radioCard} ${
                    coverType === "single" ? styles.activeCard : ""
                  }`}
                  onClick={() => setCoverType("single")}
                >
                  <input type="radio" checked={coverType === "single"} readOnly />
                  <h4>Single transit</h4>
                  <p>Covers your single journey from one location to another.</p>
                </label>

                <label
                  className={`${styles.radioCard} ${
                    coverType === "annual" ? styles.activeCard : ""
                  }`}
                  onClick={() => setCoverType("annual")}
                >
                  <input type="radio" checked={coverType === "annual"} readOnly />
                  <h4>Annual open</h4>
                  <p>Covers your shipments throughout the year.</p>
                </label>
              </div>

              {/* Shipment type */}
              <label className={styles.label}>Where will your goods be shipped?</label>
              <div className={styles.radioRow}>
                {["inland", "export", "import"].map((type) => (
                  <label
                    key={type}
                    className={`${styles.radioBtn} ${
                      shipmentType === type ? styles.activeRadio : ""
                    }`}
                    onClick={() => setShipmentType(type)}
                  >
                    <input
                      type="radio"
                      checked={shipmentType === type}
                      readOnly
                    />
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </label>
                ))}
              </div>

              {/* Continue */}
              <button className={styles.cta}  onClick={() => router.push("Marine5")}>Continue ›</button>
            </>
          )}
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default Marine;