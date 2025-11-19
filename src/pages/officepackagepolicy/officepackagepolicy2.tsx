"use client";
import React, { useState, useEffect } from "react";
import styles from "@/styles/pages/officepackagepolicy/Officepackagepolicy2.module.css";
import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import bajaj from "@/assets/pageImages/bajaj.png";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import yes from "@/assets/F&B_yes_icon.webp";
import no from "@/assets/F&B_no_icon.webp";
import step3 from "@/assets/loss.png";

interface ModalProps {
  showModal: boolean;
  modalStep: number;
  setModalStep: (n: number) => void;
  companyName: string;
  setCompanyName: (s: string) => void;
  transportMode: string;
  setTransportMode: (s: string) => void;
  coverAmount: string;
  handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  numberToWords: (num: string) => string;
  isContinueDisabled: () => boolean;
  handleModalContinue: () => Promise<void> | void;
  setShowModal: (b: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({
  showModal,
  modalStep,
  setModalStep,
  companyName,
  setCompanyName,
  transportMode,
  setTransportMode,
  coverAmount,
  handleAmountChange,
  numberToWords,
  isContinueDisabled,
  handleModalContinue,
  setShowModal,
}) => {
  if (!showModal) return null;

  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  const [fadeClass, setFadeClass] = useState(styles.fadeIn);

  useEffect(() => {
    // animate fade when step changes
    setFadeClass(styles.fadeOut);
    const timer = setTimeout(() => setFadeClass(styles.fadeIn), 200);
    return () => clearTimeout(timer);
  }, [modalStep]);

  // Allow only digits and limit to 6 chars for pincode
  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setCompanyName(value);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modalContent} ${fadeClass}`}>
        {/* STEP 1 - PINCODE INPUT */}
        {modalStep === 1 && (
          <div data-aos="fade">
            <h3 className={styles.modalTitle}>
              Best quotes for you are just moments away!
            </h3>
            <p className={styles.modalSubtitle}>Enter your pincode to get started.</p>

            <div className={styles.inputGroup}>
              <label htmlFor="pincode" className={styles.inputLabel}>
                Pincode
              </label>
              <input
                id="pincode"
                type="text"
                value={companyName}
                onChange={handleCompanyChange}
                className={styles.textInput}
                placeholder="Enter 6-digit pincode"
                maxLength={6}
                inputMode="numeric"
              />
            </div>

            <button
              onClick={() => {
                if (!isContinueDisabled()) handleModalContinue();
              }}
              disabled={isContinueDisabled()}
              className={`${styles.continueBtn} ${isContinueDisabled() ? styles.disabled : ""}`}
            >
              Continue &gt;
            </button>
          </div>
        )}

        {/* STEP 2 - YES / NO CHOICE */}
        {modalStep === 2 && (
          <div data-aos="fade" className={styles.step2Container}>
            <h3 className={styles.modalTitle}>Best quotes for you are just moments away!</h3>
            <p className={styles.modalSubtitle}>Buying fire & burglary insurance for the first time?</p>

            <div className={styles.choiceGrid}>
              <div
                className={`${styles.choiceCard} ${transportMode === "Yes" ? styles.activeChoice : ""}`}
                onClick={() => setTransportMode("Yes")}
                role="button"
                tabIndex={0}
              >
                <div className={styles.choiceIcon}>
                  <Image src={yes} alt="Yes" width={50} height={50} />
                </div>
                <p className={styles.choiceTitle}>Yes</p>
                <p className={styles.choiceDesc}>Buying for the first time</p>
                {transportMode === "Yes" && (
                  <div className={styles.checkmark}>
                    <FaCheck />
                  </div>
                )}
              </div>

              <div
                className={`${styles.choiceCard} ${transportMode === "No" ? styles.activeChoice : ""}`}
                onClick={() => setTransportMode("No")}
                role="button"
                tabIndex={0}
              >
                <div className={styles.choiceIcon}>
                  <Image src={no} alt="No" width={50} height={50} />
                </div>
                <p className={styles.choiceTitle}>No</p>
                <p className={styles.choiceDesc}>Existing policy is expiring</p>
                {transportMode === "No" && (
                  <div className={styles.checkmark}>
                    <FaCheck />
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => {
                if (!isContinueDisabled()) handleModalContinue();
              }}
              disabled={isContinueDisabled()}
              className={`${styles.viewQuoteBtn} ${isContinueDisabled() ? styles.disabled : ""}`}
            >
              Continue &gt;
            </button>
          </div>
        )}

        {/* STEP 3 - LOSS HISTORY */}
        {modalStep === 3 && (
          <div data-aos="fade" className={styles.lossHistoryContainer}>
            <h3 className={styles.modalTitle}>Loss History Overview</h3>

            <div className={styles.lossIconWrapper}>
              <Image src={step3} alt="Loss History" width={60} height={60} />
            </div>

            <p className={styles.lossQuestion}>
              Has your commercial property experienced any loss incidents in the last 3 years?
            </p>

            <div className={styles.lossChoiceRow}>
              <button
                className={`${styles.lossBtn} ${transportMode === "Yes" ? styles.activeLossBtn : ""}`}
                onClick={() => setTransportMode("Yes")}
              >
                Yes
              </button>
              <button
                className={`${styles.lossBtn} ${transportMode === "No" ? styles.activeLossBtn : ""}`}
                onClick={() => setTransportMode("No")}
              >
                No
              </button>
            </div>

            <button
              onClick={() => {
                if (!isContinueDisabled()) handleModalContinue();
              }}
              disabled={isContinueDisabled()}
              className={`${styles.viewQuotesBtn} ${isContinueDisabled() ? styles.disabled : ""}`}
            >
              View quotes &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Officepackagepolicy2: React.FC = () => {
  const [showModal, setShowModal] = useState(true);
  const [modalStep, setModalStep] = useState(1);
  const [companyName, setCompanyName] = useState(""); // used as pincode in modal
  const [transportMode, setTransportMode] = useState("");
  const [coverAmount, setCoverAmount] = useState("");
  const router = useRouter();

  const formatNumber = (num: string) =>
    num.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCoverAmount(formatNumber(e.target.value));

  const numberToWords = (num: string) => "One Rupee"; 

  const isContinueDisabled = () => {
    if (modalStep === 1) return !companyName.trim() || companyName.trim().length < 6;
    if (modalStep === 2) return !transportMode;
    if (modalStep === 3) return !transportMode;
    return false;
  };

  // Single handler in parent that moves through steps and performs final save on step 3
  const handleModalContinue = async () => {
    // Prevent continue if disabled
    if (isContinueDisabled()) return;

    // Move through steps
    if (modalStep < 3) {
      setModalStep((s) => s + 1);
      return;
    }

    // FINAL STEP: save data to backend
    try {
      const raw = sessionStorage.getItem("officepackage_initial");
      const step1step2 = raw ? JSON.parse(raw) : null;

      if (!step1step2) {
        alert("Something went wrong! Please re-enter details.");
        router.push("/officepackagepolicy");
        return;
      }

      const payload = {
        companyName: step1step2.companyName ?? "",
        mobile: step1step2.mobile ?? "",
        options: step1step2.options ?? {},
        pincode: companyName, // from modal
        firstTimeBuying: transportMode === "Yes",
        lossHistory: transportMode === "Yes",
      };

 const res = await fetch("/api/officepackagepolicyinsurance", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  credentials: "include",   
  body: JSON.stringify(payload),
});


      if (!res.ok) {
        // Attempt to read error body if available
        let errText = "";
        try {
          const errJson = await res.json();
          errText = errJson?.message ? `: ${errJson.message}` : "";
        } catch {
          // ignore parse error
        }
        throw new Error(`Failed to save data${errText}`);
      }

      // const saved = await res.json(); // optionally use saved result
      alert("Data saved successfully!");
      setShowModal(false);

      // Optionally navigate to a results page (uncomment & adjust if you have one)
      // router.push("/officepackage/results");
    } catch (err) {
      console.error(err);
      alert("Something went wrong! Please try again.");
    }
  };

  // If user closes modal via some external action you can call this
  const handleModalComplete = () => {
    setShowModal(false);
  };

  return (
    <>
      <Modal
        showModal={showModal}
        modalStep={modalStep}
        setModalStep={setModalStep}
        companyName={companyName}
        setCompanyName={setCompanyName}
        transportMode={transportMode}
        setTransportMode={setTransportMode}
        coverAmount={coverAmount}
        handleAmountChange={handleAmountChange}
        numberToWords={numberToWords}
        isContinueDisabled={isContinueDisabled}
        handleModalContinue={handleModalContinue}
        setShowModal={setShowModal}
      />

      {/* Page content blurred while modal is active */}
      <div className={`${styles.pageContent} ${showModal ? styles.blurred : ""}`}>
        <Navbar />

        {/* ---------- TOP BAR ---------- */}
        <div className={styles.topBar}>
          <button className={styles.backBtn} onClick={() => router.push("/Marine1")}>
            ←
          </button>
          <div className={styles.info}>
            <div>
              <span className={styles.label}>Commodity details</span>
              <span className={styles.value}>Electronic and white goods</span>
            </div>
            <div>
              <span className={styles.label}>Cover amount</span>
              <span className={styles.value}>₹ 1,23,456</span>
            </div>
            <div>
              <span className={styles.label}>Cover type</span>
              <span className={styles.value}>Annual open</span>
            </div>
            <div>
              <span className={styles.label}>Shipment type</span>
              <span className={styles.value}>Export</span>
            </div>
            <div>
              <span className={styles.label}>Mode of transport</span>
              <span className={styles.value}>Road</span>
            </div>
            <button className={styles.editBtn}>✎ Edit your search</button>
          </div>
        </div>

        {/* ---------- WRAPPER ---------- */}
        <div className={styles.wrapper}>
          {/* LEFT SECTION */}
          <div className={styles.leftsection}>
            {[...Array(5)].map((_, idx) => (
              <div className={styles.card} key={idx}>
                <span className={styles.recommended}>★ Recommended</span>
                <div className={styles.row}>
                  <div className={styles.section}>
                    <Image src={bajaj} alt="logo" className={styles.logo} />
                    <span className={styles.policyTitle}>All Risk Cover</span>
                  </div>
                  <div className={styles.coverBlock}>
                    <span className={styles.coveredLabel}>Covered amount</span>
                    <strong className={styles.coveredValue}>₹ 54,45,556</strong>
                  </div>
                  <button className={styles.quoteBtn} onClick={() => router.push("/Marine6")}>
                    Get quote
                  </button>
                </div>
                <div className={styles.coverages}>
                  <div className={styles.linetext}>
                    <span className={styles.coverLabel}>Top coverages</span>
                  </div>
                  <div className={styles.tagsRow}>
                    <div className={styles.tags}>
                      <span>
                        <FaCheck size={12} className={styles.tick} /> Theft / pilferage
                      </span>
                      <span>
                        <FaCheck size={12} className={styles.tick} /> Loading and unloading
                      </span>
                      <span>
                        <FaCheck size={12} className={styles.tick} /> Malicious damage
                      </span>
                      <span className={styles.more}>+4 risks covered</span>
                    </div>
                    <label className={styles.compare}>
                      <input type="checkbox" /> Add to compare
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SECTION */}
          <div className={styles.rightsection}>
            <div className={styles.right}>
              <h4 className={styles.title}>Events & Conference</h4>
              <div className={styles.thumbnail}>
                <button className={styles.playBtn}>▶</button>
              </div>
              <p className={styles.date}>
                13th February | 3:00 PM | <span className={styles.webinar}>Webinar (Online)</span>
              </p>
              <h5 className={styles.heading}>
                FIEO - Federation of Indian Export Organisation (Ministry of commerce)
              </h5>
              <p className={styles.desc}>
                Moments from our recent webinar on Role of Insurance in managing Export Supply Chain risk
              </p>
              <a href="#" className={styles.link}>
                Read more →
              </a>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Officepackagepolicy2;
