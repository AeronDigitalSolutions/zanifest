"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaArrowRight } from "react-icons/fa6";

import styles from "@/styles/components/home/CarInsuranceSection.module.css";
import { FaEllipsisH } from "react-icons/fa";

const INSURANCELIST = [
  {
    name: "Family Health Insurance",
    image: require("@/assets/home/car/1.png"),
    link: "./health/healthinsurance",
  },
  {
    name: "Marine Insurance",
    image: require("@/assets/ship.png"),
    link: "#",
  },
  {
    name: "Travel Insurance",
    image: require("@/assets/airplane.png"),
    link: "./marineinsurance/marineinsurance8",
  },
  {
    name: "Car Insurance",
    image: require("@/assets/home/car/4.png"),
    link: "./carinsurance/carinsurance",
  },
  {
    name: "⁠2 wheeler Insurance",
    image: require("@/assets/home/car/5.png"),
    link: "./TwoWheeler/bikeinsurance",
  },
  {
    name: "Shop Insurance",
    image: require("@/assets/shops.png"),
    link: "./Shop/Shop1",
  },
  {
    name: "Third Party Insurance",
    image: require("@/assets/home/car/7.png"),
    link: "./ThirdParty/Thirdparty1",
  },
  {
    name: "Commercial Vehicle",
    image: require("@/assets/3d-truck.png"),
    link: "./CommercialVehicle/CommercialVehicle1",
  },
  {
    name: "Home Insurance",
    image: require("@/assets/home/car/9.png"),
    link: "#",
  },
  {
    name: "Office Package Policy",
    image: require("@/assets/office-building.png"),
    link: "#",
  },
   {
    name: "Doctor Indemnity Insurance",
    image: require("@/assets/medical-team.png"),
    link: "./DoctorInd/DoctorInsurance",
  },
   {
    name: "Director & Officer Liability Insurance",
    image: require("@/assets/workspace.png"),
    link: "#",
  },
];

function CarInsuraceSection() {
  const router = useRouter();

  const handleClick = (link: string) => {
    router.push(link).then(() => {
      window.scrollTo(0, 0);
    });
  };

  return (
    <div className={styles.cont}>
      <div className={styles.head}>
        <div className={styles.heading}>
          Click to buy an <span className={styles.orange}>Insurance</span>
        </div>
          
      </div>
      <div className={styles.mobileEllipsis}>
          <FaEllipsisH style={{ color: "#fa621a", fontSize:"25px" }} />
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

 
    </div>
  );
}

export default CarInsuraceSection;