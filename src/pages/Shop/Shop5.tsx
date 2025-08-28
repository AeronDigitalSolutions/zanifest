"use client";
import React from "react";
import styles from "@/styles/pages/Shop/shop5.module.css";
import { FiEdit2 } from "react-icons/fi";
import Image from "next/image";
import shriram from "@/assets/CommercialVehicle/shriram.png"
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { useRouter } from "next/navigation";
export default function Shop5() {
  const router = useRouter(); 
  return (
      // ✅ router instance
    
    <>
    <Navbar/>
    <div className={styles.wrapper}>
      {/* Left Section - Proposal Form */}
      <div className={styles.formSection}>
        <h2 className={styles.heading}>Proposal form</h2>

        {/* Customer details */}
        <div className={styles.card}>
          <h3 className={styles.subHeading}>Customer details</h3>
          <div className={styles.row}>
            <select className={styles.input}>
              <option>Mr.</option>
              <option>Mrs.</option>
              <option>Miss</option>
            </select>
            <input className={styles.input} placeholder="First name *" />
            <input className={styles.input} placeholder="Middle name" />
            <input className={styles.input} placeholder="Last name *" />
          </div>
          <div className={styles.row}>
            <input className={styles.input} placeholder="Mobile *" />
            <div className={styles.inputIcon}>
              <input className={styles.input} placeholder="Email id *" />
              <FiEdit2 className={styles.icon} />
            </div>
          </div>
        </div>

        {/* Risk address */}
        <div className={styles.card}>
          <h3 className={styles.subHeading}>Risk address</h3>
          <input className={styles.inputFull} placeholder="Address *" />
          <div className={styles.row}>
            <input className={styles.input} placeholder="City name *" />
            <input className={styles.input} placeholder="State name *" />
            <input className={styles.input} placeholder="Pincode *" />
          </div>
        </div>

        {/* Insured Entity */}
        <div className={styles.card}>
          <h3 className={styles.subHeading}>Insured Entity</h3>
          <div className={styles.row}>
            <input className={styles.input} placeholder="Company/owner *" />
            <input className={styles.input} placeholder="Shop type *" />
          </div>
          <div className={styles.row}>
            <input className={styles.input} placeholder="Policy issue date *" />
            <input className={styles.input} placeholder="Policy end date *" />
          </div>
          <div className={styles.row}>
            <input className={styles.input} placeholder="GSTIN no. (optional)" />
            <input className={styles.input} placeholder="PAN no. *" />
          </div>
        </div>

        {/* Loan details */}
        <div className={styles.card}>
          <h3 className={styles.subHeading}>Loan details</h3>
          <input className={styles.inputFull} placeholder="Hypothecation Loan details" />
        </div>

        {/* Addons */}
        <div className={styles.card}>
          <h3 className={styles.subHeading}>Addons</h3>

          <div className={styles.addonRow}>
            <div>
              <h4>Burglary</h4>
              <p>
                Coverage includes loss or damage to property caused by burglary or
                attempt with intention of committing robbery.
              </p>
            </div>
            <span className={styles.sumInsured}>Sum insured ₹ 5,00,000</span>
          </div>

          <div className={styles.addonRow}>
            <div>
              <h4>Terrorism</h4>
              <p>
                Terrorism includes coverage against any losses due to terrorism subject to policy T&C.
              </p>
            </div>
            <span className={styles.sumInsured}>Sum insured ₹ 5,00,000</span>
          </div>

          <div className={styles.addonRow}>
            <div>
              <h4>Cash in Safe / Cash Back</h4>
              <p>
                Coverage for the loss of money from a safe in the premises caused by burglary or
                housebreaking.
              </p>
            </div>
            <span className={styles.sumInsured}>Sum insured ₹ 5,00,000</span>
          </div>

          <div className={styles.addonRow}>
            <div>
              <h4>Cash in Counter</h4>
              <p>
                Loss or damage from the insured cash counter in shop caused by burglary / housebreaking.
              </p>
            </div>
            <span className={styles.sumInsured}>Sum insured ₹ 5,00,000</span>
          </div>
        </div>
      </div>

      {/* Right Section - Order details */}
      <div className={styles.orderSection}>
        <div className={styles.orderCard}>
          <div className={styles.orderHeader}>
            <Image src={shriram} alt="Shriram" className={styles.orderLogo} />
            <h3>Shri Shopkeeper Package</h3>
          </div>

          <div className={styles.orderInfo}>
            <p>
              <span>Sum insured</span> <span>₹ 5,00,000</span>
            </p>
            <p>
              <span>Base premium</span> <span>₹ 500</span>
            </p>
            <p>
              <span>Add-on</span>
            </p>
            <ul>
              <li>Burglary</li>
              <li>Terrorism</li>
              <li>Cash in Safe</li>
              <li>Cash in Counter</li>
            </ul>
            <p>
              <span>GST</span> <span>₹ 0</span>
            </p>
          </div>

          <div className={styles.total}>
            <h4>Total premium</h4>
            <h3>₹ 590/-</h3>
          </div>

          <button className={styles.proceedBtn}            onClick={() => router.push("Shop6")}>Proceed</button>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
