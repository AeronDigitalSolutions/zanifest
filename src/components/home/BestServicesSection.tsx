import React from "react";

import styles from "@/styles/components/home/BestServicesSection.module.css";

import { MdHeadsetMic } from "react-icons/md";
import { LuNotebookPen } from "react-icons/lu";
import { LiaMoneyBillSolid } from "react-icons/lia";

const LIST = [
  {
    name: "24X7 Support",
    desc: "Our dedicated customer support team is available 24/7 to guide you at every step of your insurance journey.",
    image: <MdHeadsetMic size={40} />,
  },
  {
    name: "Easy Claim System",
    desc: "Hassle-free claim process designed to get you quick resolutions when you need them the most.",
    image: <LuNotebookPen size={40} />,
  },
  {
    name: "Easy Installments",
    desc: "Flexible and easy premium installment options to suit every budget and keep you worry-free.",
    image: <LiaMoneyBillSolid size={40} />,
  },
];

function BestServicesSection() {
  return (
    <div className={styles.cont}>
     <div className={styles.head}>
  <h1 className={styles.heading1}>
    Best <span className={styles.heading2}>Service</span>
  </h1>
</div>

      <div className={styles.list}>
        {LIST.map((item, index) => {
          return (
            <div className={`${styles.item}`} key={index}>
              <div className={`${styles.imageCont} ${styles.selected}`}>
                {item.image}
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

export default BestServicesSection;
