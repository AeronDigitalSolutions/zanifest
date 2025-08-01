import React from "react";

import { FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { BsFacebook } from "react-icons/bs";

import styles from "@/styles/components/ui/Footer.module.css";
import { useRouter } from "next/router";
import Image from "next/image";

const LIST = [
  {
    head: "Health Insurance",
    links: [
      "Family Floater Health Insurance",
      "Critical Illness Cover",
      "Personal Accident Policy",
    ],
  },
  {
    head: "Motor Insurance",
    links: [
      "Car Insurance",
      "Two Wheeler Insurance",
      "Pay as you Drive",
      "Third Party Insurance",
      "Commercial Vehicle Insurance",
    ],
  },
  {
    head: "Other Insurance",
    links: [
      "International Travel Insurance",
      "Home Insurance",
      "Home loan Insurance",
      "Director & Officer Insurance",
      "Transit Insurance (Marine)",
      "CPM Insurance",
      "Contractor All risk Insurance",
    ],
  },
];

function Footer() {
  return (
    <div className={styles.cont}>
      <div className={styles.top}>
        <div className={styles.list}>
          <div className={styles.head}>
            <Image
              src={require("@/assets/logowhite.png")}
              alt="logo"
              className={styles.logoImage}
            />
          </div>
          <div className={styles.desc}>
            The Zenifest is India's largest insurance aggregator, and has
            expanded its operations to the India.
          </div>
          <div className={styles.icons}>
            <FaLinkedin size={40} />
            <BsFacebook size={40} />
            <FaXTwitter size={40} />
          </div>
        </div>
        {LIST.map((item, index) => {
          return (
            <div key={index} className={styles.list}>
              <div className={styles.heading}>{item.head}</div>
              <div className={styles.linksList}>
                {item.links.map((link, index) => {
                  return (
                    <div key={link + index} className={styles.link}>
                      <a href="#" className={styles.atag}>
                        {link}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.bottom}>
        <div className={styles.bottomItem}>
          © 2025 Zenifest, All Rights Reserved.
        </div>
        {/* <div className={`${styles.bottomItem} ${styles.loginagent}`}>
          Login as Agent
        </div> */}
        <div className={styles.bottomLinks}>
          <div className={styles.bottomItem}>Privacy Policy</div>
          <div className={styles.bottomItem}>Terms & Conditions</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
