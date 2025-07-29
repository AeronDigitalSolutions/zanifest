"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaArrowRight } from "react-icons/fa6";
import styles from "@/styles/components/home/CarInsuranceSection.module.css";

const INSURANCELIST = [
  {
    name: "Family",
    image: require("@/assets/home/car/1.png"),
    link: "./health/healthinsurance",
  },
  {
    name: "Critical Illnes",//one s removed for a specific purpose
    image: require("@/assets/home/car/2.png"),
    link: "#",
  },
  {
    name: "Personal Accident",
    image: require("@/assets/home/car/3.png"),
    link: "#",
  },
  {
    name: "Car",
    image: require("@/assets/home/car/4.png"),
    link: "./carinsurance/carinsurance",
  },
  {
    name: "Two Wheeler",
    image: require("@/assets/home/car/5.png"),
    link: "./TwoWheeler/bikeinsurance",
  },
  {
    name: "Pay As you Drive",
    image: require("@/assets/home/car/6.png"),
    link: "#",
  },
  {
    name: "Third Party",
    image: require("@/assets/home/car/7.png"),
    link: "#",
  },
  {
    name: "Commercial Vehicle",
    image: require("@/assets/home/car/8.png"),
    link: "#",
  },
  {
    name: "Home",
    image: require("@/assets/home/car/9.png"),
    link: "#",
  },
  {
    name: "Home Loan",
    image: require("@/assets/home/car/10.png"),
    link: "#",
  },
];

function CarInsuraceSection() {
  const router = useRouter();

  const handleClick = (link: string) => {
    router.push(link);
  };

  return (
    <div className={styles.cont}>
      <div className={styles.head}>
        <div className={styles.heading}>Click to buy an </div>
        <div className={`${styles.heading} ${styles.orange}`}>Insurance</div>
      </div>

      <div className={styles.list}>
        {INSURANCELIST.map((item, index) => (
          <div
            className={styles.item}
            key={index}
            onClick={() => handleClick(item.link)}
          >
            <div className={styles.top}>
              <div className={styles.imageCont}>
                <Image
                  src={item.image}
                  alt={item.name}
                  className={styles.image}
                />
              </div>
            </div>
            <div className={styles.bottom}>
              <div>{item.name}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.bottomCont}>
        <div className={styles.button}>View All</div>
      </div>
    </div>
  );
}

export default CarInsuraceSection;
