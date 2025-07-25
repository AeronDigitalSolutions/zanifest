import React from "react";
import Image from "next/image";

import styles from "@/styles/components/home/DemoSection.module.css";

const DEMOLIST = [
  {
    name: "Over 9 Million",
    desc: "customers trust us & have bought t heir insurance on Policybazaar",
    image: require("@/assets/home/demo/1.png"),
    color: "#e7f9f7",
  },
  {
    name: "50+ Insurers",
    desc: "partnered with us so that you can compare easily & transparently",
    image: require("@/assets/home/demo/2.png"),
    color: "#ebf2f8",
  },
  {
    name: "Great Price",
    desc: "for all kinds of insurance plans available online for all kinds of insurance plans available online",
    image: require("@/assets/home/demo/3.png"),
    color: "#f9e5e2",
  },
  {
    name: "Claims",
    desc: "support built in with every policy for help, when you need it the most",
    image: require("@/assets/home/demo/4.png"),
    color: "#faf6e2",
  },
];

function DemoSection() {
  return (
    <div className={styles.cont}>
      <div className={styles.head}>
        <div className={styles.heading}>
          Why is <div style={{ color: "#fa621a" }}>ZENIFEST</div> India's go-to for
          insurance?
        </div>
        <div className={styles.subHeading}>
          Demo Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500
        </div>
      </div>
      <div className={styles.list}>
        {DEMOLIST.map((item, index) => {
          return (
            <div key={index} className={styles.item}>
              <div
                className={styles.imageCont}
                style={{ backgroundColor: `${item.color}` }}
              >
                <Image src={item.image} alt="icon" className={styles.image} />
              </div>
              <div className={styles.content}>
                <p className={styles.name}>{item.name}</p>
                <p className={styles.desc}>{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DemoSection;
