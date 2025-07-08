import React from "react";
import Image from "next/image";

import { FaArrowRight } from "react-icons/fa6";

import styles from "@/styles/components/home/CarInsuranceSection.module.css";

const INSURANCELIST = [
  { name: "Family", image: require("@/assets/home/car/1.png") },
  { name: "Critical Illness", image: require("@/assets/home/car/2.png") },
  {name: "Personal Accident", image: require("@/assets/home/car/3.png")},
  { name: "Car", image: require("@/assets/home/car/4.png") },
  { name: "Two Wheeler", image: require("@/assets/home/car/5.png") },
  { name: "Pay As you Drive", image: require("@/assets/home/car/6.png") },
  { name: "Third Party", image: require("@/assets/home/car/7.png") },
  {name: "Commercial Vehicle", image: require("@/assets/home/car/8.png")},
  { name: "Home", image: require("@/assets/home/car/9.png") },
  { name: "Home Loan", image: require("@/assets/home/car/10.png") },
];

function CarInsuraceSection() {
  return (
    <div className={styles.cont}>
      <div className={styles.head}>
        <div className={styles.heading}>Click to buy an </div>
        <div className={`${styles.heading} ${styles.orange}`}>Insurance</div>
      </div>
      <div className={styles.list}>
        {INSURANCELIST.map((item, index) => {
          return (
            <div className={styles.item} key={index}>
              <div className={styles.top}>
                <div className={styles.imageCont}>
                  <Image
                    src={item.image}
                    alt="Image"
                    className={styles.image}
                  />
                </div>
              </div>
              <div className={styles.bottom}>
                <div>{item.name}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.bottomCont}>
        <div className={styles.button}>View All</div>
      </div>
    </div>
  );
}

export default CarInsuraceSection;
