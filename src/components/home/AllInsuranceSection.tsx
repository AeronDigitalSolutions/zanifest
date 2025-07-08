import React from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";

import SingleHtmlCarousal from "../ui/SingleIHtmlCarousal";

import styles from "@/styles/components/home/AllInsuranceSection.module.css";

const SERVICESLIST = [
  {
    name: "Family Insurance",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    image: require("@/assets/home/services/1.png"),
  },
  {
    name: "Travel Insurance",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    image: require("@/assets/home/services/2.png"),
  },
  {
    name: "Home Insurance",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
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
