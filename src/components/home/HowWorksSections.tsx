import React from "react";

import styles from "@/styles/components/home/HowWorksSections.module.css";
import { desc, image } from "framer-motion/client";
import Image from "next/image";
import { FaEllipsisH } from "react-icons/fa";

const LIST = [
  {
    name: "Fill Your Details",
    desc: "Fill in your details and get insurance policy premium quotes from top-rated insurers instantly.",
    image: require("@/assets/home/works/1.png"),
  },
  {
    name: "Select a Plan",
    desc: "From numerous available quotes, choose the one that best suits your requirements and budget.",
    image: require("@/assets/home/works/2.png"),
  },
  {
    name: "Make Payment and sit back",
    desc: "Pay online and get your policy right away in your inbox.",
    image: require("@/assets/home/works/3.png"),
  },
];

const SERVICES = [
  {
    heading: "Pay Less Cover More",
    image: require("@/assets/home/works/4.png"),
    name: "Lorem Ipsum is simply dummy text",
    desc: "999 / Month",
  },
  {
    heading: "Pay Less Cover More",

    image: require("@/assets/home/works/4.png"),
    name: "Lorem Ipsum is simply dummy text",
    desc: "999 / Month",
  },
  {
    heading: "Pay Less Cover More",
    image: require("@/assets/home/works/4.png"),
    name: "Lorem Ipsum is simply dummy text",
    desc: "999 / Month",
  },
  {
    heading: "Pay Less Cover More",
    image: require("@/assets/home/works/4.png"),
    name: "Lorem Ipsum is simply dummy text",
    desc: "999 / Month",
  },
  {
    heading: "Pay Less Cover More",
    image: require("@/assets/home/works/4.png"),
    name: "Lorem Ipsum is simply dummy text",
    desc: "999 / Month",
  },
  {
    heading: "Pay Less Cover More",
    image: require("@/assets/home/works/4.png"),
    name: "Lorem Ipsum is simply dummy text",
    desc: "999 / Month",
  },
  {
    heading: "Pay Less Cover More",
    image: require("@/assets/home/works/4.png"),
    name: "Lorem Ipsum is simply dummy text",
    desc: "999 / Month",
  },
  {
    heading: "Pay Less Cover More",
    image: require("@/assets/home/works/4.png"),
    name: "Lorem Ipsum is simply dummy text",
    desc: "999 / Month",
  },
];

function HowWorksSections() {
  return (
    <div className={styles.cont}>
      <div className={styles.head}>
       <div className={styles.heading}>
  How We <span className={styles.orange}>Work?</span>
   <div className={styles.mobileEllipsis}>
          <FaEllipsisH style={{ color: "#fa621a", fontSize:"25px" }} />
        </div>
</div>


      </div>
      <div className={styles.bottom}>
        {LIST.map((item, index) => {
          return (
            <div key={index} className={styles.item}>
              <Image
                src={item.image}
                alt={item.name}
                className={styles.image}
              />
              <h2 className={styles.name}>{item.name}</h2>
              <h6 className={styles.desc}>{item.desc}</h6>
            </div>
          );
        })}
      </div>
      
      <div className={styles.servciesCont}>
        <div className={styles.heading}>
          Pay <span className={styles.orange}> Less </span>Cover More
        </div>
         <div className={styles.mobileEllipsis}>
          <FaEllipsisH style={{ color: "#fa621a", fontSize:"25px" }} />
        </div>
        <div className={styles.services}>
          {SERVICES.map((item, index) => {
            return (
              <div className={styles.serviceItem} key={index}>
                <div className={styles.servicetop}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    className={styles.serviceImage}
                  />
                  <h2 className={styles.serviceName}>{item.name}</h2>
                </div>
                <h6 className={styles.serviceDesc}>{item.desc}</h6>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HowWorksSections;
