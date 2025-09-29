"use client";

import React from "react";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { FaEllipsisH } from "react-icons/fa";
import SingleHtmlCarousal from "../ui/SingleIHtmlCarousal";
import styles from "@/styles/components/home/AllInsuranceSection.module.css";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const FALLBACK_SERVICES = [
  {
    name: "Family Insurance",
    desc: "Protect your loved ones with comprehensive family coverage designed to secure health, future, and peace of mind.",
    image: "/assets/home/services/1.png",
    link: "#",
  },
  {
    name: "Travel Insurance",
    desc: "Stay worry-free on your journeys with travel insurance that covers medical emergencies, delays, and unexpected cancellations.",
    image: "/assets/home/services/2.png",
    link: "#",
  },
  {
    name: "Home Insurance",
    desc: "Safeguard your home and belongings from natural disasters, theft, and unforeseen events with our reliable home insurance plans.",
    image: "/assets/home/services/3.png",
    link: "#",
  },
];

function AllInsuranceSection() {
  const { data } = useSWR("/api/allinsuranceapi", fetcher, {
    refreshInterval: 10000,
  });

  const heading = data?.heading || "We're Giving all the Insurance Services to you";
  const services = data?.services || FALLBACK_SERVICES;

  const headingParts = heading.split(" ");
  const orangeWordIndex = headingParts.findIndex(
    (word: string) =>
      word.toLowerCase() === "insurance" || word.toLowerCase() === "services"
  );

  const beforeOrange =
    orangeWordIndex !== -1
      ? headingParts.slice(0, orangeWordIndex).join(" ")
      : heading;
  const orangeWord =
    orangeWordIndex !== -1 ? headingParts[orangeWordIndex] : "";
  const afterOrange =
    orangeWordIndex !== -1
      ? headingParts.slice(orangeWordIndex + 1).join(" ")
      : "";

  return (
    <div className={styles.cont}>
      <div className={styles.head}>
        <div className={styles.heading}>
          <span className={styles.text}>
            {beforeOrange}{" "}
            {orangeWord && <span className={styles.orange}>{orangeWord}</span>}{" "}
            {afterOrange}
          </span>
        </div>
        <div className={styles.mobileEllipsis}>
          <FaEllipsisH style={{ color: "#fa621a", fontSize: "25px" }} />
        </div>
      </div>

      <div className={styles.bottom}>
        {services.map((item: any, index: number) => (
          <div className={styles.serviceItem} key={index}>
            <Image
              src={item.image}
              alt={item.name}
              width={100}
              height={100}
              className={styles.image}
            />
            <h2 className={styles.name}>{item.name}</h2>
            <h6 className={styles.desc}>{item.desc}</h6>
            <Link href={item?.link || "#"} className={styles.arrow}>
              <FaArrowRight />
            </Link>
          </div>
        ))}
      </div>

      <div className={styles.bottomCarousal}>
        <SingleHtmlCarousal
          items={services.map((item: any, index: number) => (
            <div className={styles.serviceItem} key={index}>
              <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
                className={styles.image}
              />
              <h2 className={styles.name}>{item.name}</h2>
              <h6 className={styles.desc}>{item.desc}</h6>
              <Link href={item?.link || "#"} className={styles.arrow}>
                <FaArrowRight />
              </Link>
            </div>
          ))}
        />
      </div>
    </div>
  );
}

export default AllInsuranceSection;
