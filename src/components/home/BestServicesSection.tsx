"use client";

import React from "react";
import useSWR from "swr";
import styles from "@/styles/components/home/BestServicesSection.module.css";
import { MdHeadsetMic } from "react-icons/md";
import { LuNotebookPen } from "react-icons/lu";
import { LiaMoneyBillSolid } from "react-icons/lia";
import { FaEllipsisH } from "react-icons/fa";

// Mapping icons
const iconMap = {
  support: <MdHeadsetMic size={40} />,
  claim: <LuNotebookPen size={40} />,
  installment: <LiaMoneyBillSolid size={40} />,
};

type ServiceType = keyof typeof iconMap;

interface ServiceItem {
  name: string;
  desc: string;
  type: ServiceType;
}

interface ServiceData {
  heading: string;
  services: ServiceItem[];
}

// Default fallback list
const LIST_FALLBACK: ServiceItem[] = [
  {
    name: "24X7 Support",
    desc: "Our dedicated customer support team is available 24/7 to guide you at every step of your insurance journey.",
    type: "support",
  },
  {
    name: "Easy Claim System",
    desc: "Hassle-free claim process designed to get you quick resolutions when you need them the most.",
    type: "claim",
  },
  {
    name: "Easy Installments",
    desc: "Flexible and easy premium installment options to suit every budget and keep you worry-free.",
    type: "installment",
  },
];

// Parser to highlight text inside <>
const parseHeading = (text: string) => {
  const regex = /<([^>]+)>/g;
  const parts: { text: string; isTag: boolean }[] = [];
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, match.index), isTag: false });
    }
    parts.push({ text: match[1], isTag: true });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), isTag: false });
  }
  return parts;
};

export default function BestServicesSection() {
  const { data } = useSWR<ServiceData>("/api/bestservice", (url: string) =>
    fetch(url).then((res) => res.json())
  );

  const heading = data?.heading || "Best <Service>";
  const serviceList =
    data?.services && data.services.length > 0 ? data.services : LIST_FALLBACK;

  return (
    <div className={styles.cont}>
      <div className={styles.head}>
        {/* Heading with orangered for <> */}
        <h1 className={styles.heading1}>
          {parseHeading(heading).map((part, idx) => (
            <span
              key={idx}
              style={{ color: part.isTag ? "orangered" : "black" }}
            >
              {part.text}
            </span>
          ))}
        </h1>

        <div className={styles.mobileEllipsis}>
          <FaEllipsisH style={{ color: "#fa621a", fontSize: "25px" }} />
        </div>
      </div>

      <div className={styles.list}>
        {serviceList.map((item, index) => (
          <div className={styles.item} key={item.type + "-" + index}>
            <div className={`${styles.imageCont} ${styles.selected}`}>
              {iconMap[item.type as ServiceType]}
            </div>
            <div className={styles.content}>
              <p className={styles.name}>{item.name}</p>
              <p className={styles.desc}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
