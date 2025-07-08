import React from "react";

import styles from "@/styles/components/home/BestServicesSection.module.css";

import { MdHeadsetMic } from "react-icons/md";
import { LuNotebookPen } from "react-icons/lu";
import { LiaMoneyBillSolid } from "react-icons/lia";

const LIST = [
  {
    name: "24X7 Support",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industr",
    image: <MdHeadsetMic size={40} />,
  },
  {
    name: "Easy Clain System",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industr",
    image: <LuNotebookPen size={40} />,
  },
  {
    name: "Easy Installments",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industr",
    image: <LiaMoneyBillSolid size={40} />,
  },
];

function BestServicesSection() {
  return (
    <div className={styles.cont}>
      <div className={styles.head}>
        <h1 className={styles.heading1}>Best</h1>
        <h1 className={styles.heading2}>Service</h1>
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
