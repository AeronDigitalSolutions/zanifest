"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import styles from "@/styles/pages/DirectorOfficerLiabilityInsurance/DirectorInsurance2.module.css";

import tata from "@/assets/TATAAIGlogo.png";
import orientalinsurance from "@/assets/OrintalInsurance.png";
import sbi from "@/assets/sbi.png";
import hdfc from "@/assets/unitedindia.png";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

// Type definition for insurance plan
interface InsurancePlan {
  id: number;
  logo: StaticImageData; // <-- accept StaticImageData
  company: string;
  plan: string;
  price: string | null;
  instantCover: boolean;
  features: string[];
}

// Array of insurance plans
const insurancePlans: InsurancePlan[] = [
  {
    id: 1,
    logo: sbi,
    company: "SBI General Insurance Company Ltd",
    plan: "Directors & Officers Liability",
    price: "₹ 38,350",
    instantCover: true,
    features: [
      "Cover for Retired Directors",
      "Cover for failure / negligence to supervise against any Professional Indemnity related claims",
      "Cover for Heirs, Estates and Legal Representatives",
    ],
  },
  {
    id: 2,
    logo: tata,
    company: "Tata AIG General Insurance",
    plan: "Directors & Officers Liability",
    price: null,
    instantCover: false,
    features: [
      "Cover for Retired Directors",
      "Cover for failure / negligence to supervise against any Professional Indemnity related claims",
      "Cover for Heirs, Estates and Legal Representatives",
    ],
  },
  {
    id: 3,
    logo: orientalinsurance,
    company: "Oriental Insurance Company Ltd",
    plan: "Directors & Officers Liability",
    price: null,
    instantCover: false,
    features: [
      "Cover for Retired Directors",
      "Cover for failure / negligence to supervise against any Professional Indemnity related claims",
      "Cover for Heirs, Estates and Legal Representatives",
    ],
  },
];

const DirectorInsurance2: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<InsurancePlan | null>(null);

  // Open modal
  const openModal = (plan: InsurancePlan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  return (
    <>
      <Navbar />

      <div className={styles.pageContainer}>
        {/* Left Section */}
        <div className={styles.leftSection}>
          <div className={styles.detailsCard}>
            <div className={styles.detailsHeader}>
              <h3>Your details</h3>
              <button className={styles.editBtn}>✎ Edit</button>
            </div>
            <div className={styles.detailsContent}>
              <div>
                <h4>Territory</h4>
                <p>Worldwide Including US & Canada</p>
              </div>
              <div>
                <h4>Jurisdiction</h4>
                <p>Worldwide Including US & Canada</p>
              </div>
              <div>
                <h4>Limit of Liability</h4>
                <p>₹ 5 Crores</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className={styles.rightSection}>
          {insurancePlans.map((plan) => (
            <div key={plan.id} className={styles.planCard}>
              {plan.instantCover && (
                <div className={styles.instantTag}>Instant Risk Covered</div>
              )}

              <div className={styles.planHeader}>
                <div className={styles.planHeaderLeft}>
                  <Image
                    src={plan.logo} // StaticImageData works directly
                    alt={plan.company}
                    className={styles.logo}
                  />
                  <div>
                    <h4 className={styles.company}>{plan.company}</h4>
                    <p className={styles.planName}>
                      <span>Plan name</span> <strong>{plan.plan}</strong>
                    </p>
                  </div>
                </div>

                {plan.price ? (
                  <button
                    className={styles.priceBtn}
                    onClick={() => openModal(plan)}
                  >
                    {plan.price}
                  </button>
                ) : (
                  <button className={styles.quoteBtn}>Get Quote</button>
                )}
              </div>

              <div className={styles.features}>
                <p className={styles.featureTitle}>Top Features</p>
                <ul>
                  {plan.features.map((feature, i) => (
                    <li key={i}>
                      <span>✔</span> {feature}
                    </li>
                  ))}
                </ul>
                <button className={styles.viewBtn}>View All Features</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Section */}
 {/* Modal Section */}
{isModalOpen && selectedPlan && (
  <div className={styles.modalOverlay}>
    <div className={styles.modal}>
      <div className={styles.modalHeader}>
        <h3>Please answer a few questions before you proceed</h3>
        <button className={styles.closeModalBtn} onClick={closeModal}>✖</button>
      </div>

      <div className={styles.modalContent}>
        <form className={styles.questionsForm}>
          <div className={styles.question}>
            <p>Are you buying Directors & Officers policy for the first time?</p>
            <div className={styles.options}>
              <label>
                <input type="radio" name="firstTime" value="yes" />
                Yes
              </label>
              <label>
                <input type="radio" name="firstTime" value="no" />
                No
              </label>
            </div>
          </div>

          <div className={styles.question}>
            <p>Is your gross asset size more than 100 crores?</p>
            <div className={styles.options}>
              <label>
                <input type="radio" name="grossAsset" value="yes" />
                Yes
              </label>
              <label>
                <input type="radio" name="grossAsset" value="no" />
                No
              </label>
            </div>
          </div>

          <div className={styles.question}>
            <p>Is your company profitable?</p>
            <div className={styles.options}>
              <label>
                <input type="radio" name="profitable" value="yes" />
                Yes
              </label>
              <label>
                <input type="radio" name="profitable" value="no" />
                No
              </label>
            </div>
          </div>

          <div className={styles.question}>
            <p>Do you have any domiciled presence outside India?</p>
            <div className={styles.options}>
              <label>
                <input type="radio" name="domiciled" value="yes" />
                Yes
              </label>
              <label>
                <input type="radio" name="domiciled" value="no" />
                No
              </label>
            </div>
          </div>

          <div className={styles.question}>
            <p>Are any of your directors working as a director with any other entity which is registered outside India or has a subsidiary/holding outside India?</p>
            <div className={styles.options}>
              <label>
                <input type="radio" name="otherDirectors" value="yes" />
                Yes
              </label>
              <label>
                <input type="radio" name="otherDirectors" value="no" />
                No
              </label>
            </div>
          </div>

          <div className={styles.question}>
            <p>Are your annual reports for the past three years qualified by auditors?</p>
            <div className={styles.options}>
              <label>
                <input type="radio" name="annualReports" value="yes" />
                Yes
              </label>
              <label>
                <input type="radio" name="annualReports" value="no" />
                No
              </label>
            </div>
          </div>

          <button type="submit" className={styles.saveBtn}>Save & Continue</button>
        </form>
      </div>
    </div>
  </div>
)}


      <Footer />
    </>
  );
};

export default DirectorInsurance2;
