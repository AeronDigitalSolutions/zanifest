import React from "react";
import styles from "@/styles/pages/cart/healthinsurancecart.module.css";
import Image from "next/image";
import careLogo from "@/assets/liclogo.png"; // replace with actual image
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import UserDetails from "@/components/ui/UserDetails";

const healthinsurancecart = () => {
 
  return (
    <div>
                  <UserDetails />
                  <Navbar />
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Left Section */}
        <div className={styles.left}>
          <div className={styles.planCard}>
            <div className={styles.planHeader}>
              <Image src={careLogo} alt="Care Logo" className={styles.logo} />
              <div className={styles.planTitle}>
                <h3>Care Supreme Direct</h3>
                <p>
                  <span className={styles.link}>View all features</span> •{" "}
                  <span className={styles.green}>202 Cashless hospitals</span>{" "}
                  (+Cashless anywhere support)
                </p>
              </div>
            </div>
            </div>
<div className={styles.planCard}>
            <div className={styles.section}>
              <h4>Cover Amount</h4>
              <p>
                Is this cover amount sufficient?{" "}
                <span className={styles.green}>Let’s find out ›</span>
              </p>
              <select className={styles.selectInput}>
                <option><strong>₹10 Lakh</strong></option>
              </select>
            </div>
            </div>
<div className={styles.planCard}>
            <div className={styles.section}>
              <h4>Policy Period</h4>
              <p>
                Choosing a multi-year plan saves your money and the trouble of
                remembering yearly renewals.
              </p>
              <div className={styles.periodOptions}>
                <div className={`${styles.option} ${styles.selected}`}>
                  <input type="radio" checked readOnly />
                  <span>1 Year @ ₹12,151</span>
                </div>
                <div className={styles.option}>
                  <input type="radio" readOnly />
                  <span>
                    2 Years @ ₹23,389 <em>Save ₹ 872</em>
                  </span>
                </div>
                <div className={styles.option}>
                  <input type="radio" readOnly />
                  <span>
                    3 Years @ ₹34,324 <em>Save ₹ 2,035</em>
                  </span>
                </div>
              </div>
              <p className={styles.subText}>
                Premiums are inclusive of inbuilt riders worth ₹522.{" "}
                <span className={styles.link}>View list ›</span>
              </p>
              <p className={styles.subText}>
                Easy EMI options starting from{" "}
                <span className={styles.bold}>₹1,087/month</span>.{" "}
                <span className={styles.link}>View details ›</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className={styles.right}>
          <div className={styles.summaryCard}>
            <h4>Summary</h4>
            <hr/>
            <div className={styles.summaryRow}>
              <span>Premium - 1 year</span>
              <strong>₹12,151</strong>
            </div>
<div><strong>Select Rider(s)</strong></div>
            <div className={styles.summaryItem}>
              
              <div>
                <p className={styles.warning}>Missing out on benefits</p>
                </div>
                <div>
                <span className={styles.link}>View riders</span>
              </div>
            </div>
<div><strong>Select Add-ons</strong></div>
            <div className={styles.summaryItem}>
              
              <div>
                <p className={styles.warning}>No add-ons selected</p>
                </div>
                <div>
                <span className={styles.link}>View add-ons</span>
              </div>
            </div>

            <p className={styles.error}>
              ⚠️ Port option is only available from <strong>₹15 Lakh </strong> or above cover
              amount{" "}
              <span className={styles.link}>Change cover amount ›</span>
            </p>

            <div className={styles.totalRow}>
              <span>Total premium</span>
              <strong>₹12,151</strong>
            </div>

            <div className={styles.benefitBox}>
              Get up to <strong>₹5,645</strong> in benefits.{" "}
              <span className={styles.link}>See how ›</span>
            </div>

            <button className={styles.proceedBtn}>Proceed to proposal</button>
          </div>
        </div>
      </div>
      
    </div>
    <Footer />
        </div>
  );
};

export default healthinsurancecart;
