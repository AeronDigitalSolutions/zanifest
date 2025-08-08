import React from "react";
import Image from "next/image";

import Carousel from "../ui/CarousalHtml";

import FeedbackMobile from "../ui/FeedbackMobile";

import styles from "@/styles/components/home/FeedBackSection.module.css";

const LIST = [
  {
    name: "Mach Nelson",
    post: "CEO",
    desc: "Contrar y to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old",
    image: require("@/assets/home/feedback/1.png"),
  },
  {
    post: "CEO",
    name: "David Doe",
    desc: "Contrar y to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old",
    image: require("@/assets/home/feedback/2.png"),
  },
  {
    name: "John Nick",
    post: "CEO",
    desc: "Contrar y to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old",
    image: require("@/assets/home/feedback/3.png"),
  },
  {
    name: "Mach Nelson",
    post: "CEO",
    desc: "Contrar y to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old",
    image: require("@/assets/home/feedback/1.png"),
  },
  {
    post: "CEO",
    name: "David Doe",
    desc: "Contrar y to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old",
    image: require("@/assets/home/feedback/2.png"),
  },
  {
    name: "John Nick",
    post: "CEO",
    desc: "Contrar y to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old",
    image: require("@/assets/home/feedback/3.png"),
  },
];

function FeedBackSection() {
  const slides = LIST.map((item, index) => (
    <div className={styles.serviceItem} key={index}>
      <h6 className={styles.desc}>{item.desc}</h6>
      <div className={styles.itemBottom}>
        <Image src={item.image} alt={item.name} className={styles.image} />
        <div className={styles.namePost}>
          <h2 className={styles.name}>{item.name}</h2>
          <h2 className={styles.post}>{item.post}</h2>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <div className={styles.cont}>
        <div className={styles.head}>
         <div className={styles.heading}>
  What Our Customers <span className={styles.orange}>Are Saying?</span>
</div>

        </div>
        <div className={styles.bottom}>
          {/* mobile screen carousal - testimonial*/}
          <div className={styles.singlecar}>
            
            <FeedbackMobile items={slides} />
          </div>
          {/* for laptop carousal ya */}
          <div className={styles.multicar}>
            <Carousel items={LIST} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedBackSection;
