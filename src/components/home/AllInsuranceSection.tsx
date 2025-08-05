import React from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";

import SingleHtmlCarousal from "../ui/SingleIHtmlCarousal";

import styles from "@/styles/components/home/AllInsuranceSection.module.css";

const SERVICESLIST = [
  {
    name: "Family Insurance",
    desc: "Protect your loved ones with comprehensive family coverage designed to secure health, future, and peace of mind.",
    image: require("@/assets/home/services/1.png"),
  },
  {
    name: "Travel Insurance",
    desc: "Stay worry-free on your journeys with travel insurance that covers medical emergencies, delays, and unexpected cancellations.",
    image: require("@/assets/home/services/2.png"),
  },
  {
    name: "Home Insurance",
    desc: "Safeguard your home and belongings from natural disasters, theft, and unforeseen events with our reliable home insurance plans.",
    image: require("@/assets/home/services/3.png"),
  },
];

function AllInsuranceSection() {
  return (
    <div className={styles.cont}>
      <div className={styles.head}>
        <div className={styles.heading}>
          <div className={styles.text}>
            We're Giving all the
            <div className={styles.orange}>Insurance</div>
            Services to you
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        {SERVICESLIST.map((item, index) => {
          return (
            <div className={styles.serviceItem} key={index}>
              <Image
                src={item.image}
                alt={item.name}
                className={styles.image}
              />
              <h2 className={styles.name}>{item.name}</h2>
              <h6 className={styles.desc}>{item.desc}</h6>
              <div className={styles.arrow}>
                <FaArrowRight />
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.bottomCarousal}>
        {/* ya nahi */}
        <SingleHtmlCarousal
          items={SERVICESLIST.map((item, index) => {
            return (
              <div className={styles.serviceItem} key={index}>
                <Image
                  src={item.image}
                  alt={item.name}
                  className={styles.image}
                />
                <h2 className={styles.name}>{item.name}</h2>
                <h6 className={styles.desc}>{item.desc}</h6>
                <div className={styles.arrow}>
                  <FaArrowRight />
                </div>
              </div>
            );
          })}
        />
      </div>
    </div>
  );
}

export default AllInsuranceSection;
