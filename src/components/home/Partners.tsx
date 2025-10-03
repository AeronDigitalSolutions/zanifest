"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/components/home/Partners.module.css";
import Image from "next/image";
import useSWR from "swr";

import img1 from "@/assets/home/car/1.png";
import img2 from "@/assets/home/car/2.png";
import img3 from "@/assets/home/car/6.png";

const CATEGORYLIST = [
  { name: "Health Insurance", icon: img1 },
  { name: "Motor Insurance", icon: img2 },
  { name: "Fire Insurance", icon: img3 },
];

interface PartnersProps {
  liveHeading?: string;
  liveImages?: string[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Partners({ liveHeading, liveImages }: PartnersProps) {
  const { data } = useSWR("/api/partnersApi", fetcher);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORYLIST[0]);
  const [heading, setHeading] = useState("Insurance Partner");
  const [partners, setPartners] = useState<string[]>([]);

  // Heading
  useEffect(() => {
    if (liveHeading !== undefined) setHeading(liveHeading);
    else if (data) setHeading(data.heading ?? "Insurance Partner");
  }, [liveHeading, data]);

  // Partners (images)
  useEffect(() => {
    if (liveImages !== undefined) setPartners(liveImages);
    else if (data) {
      const catData = data.categories.find((c: any) => c.category === selectedCategory.name);
      setPartners(catData?.images ?? []);
    }
  }, [liveImages, selectedCategory, data]);

  return (
    <div className={styles.cont}>
      {/* Heading */}
      <div className={styles.head}>
        <p className={styles.heading}>
          {heading.split(" ").slice(0, -1).join(" ")}{" "}
          <span className={styles.orange}>{heading.split(" ").slice(-1)}</span>
        </p>
      </div>

      <div className={styles.bottom}>
        {/* Left Category Tabs */}
        <div className={styles.catList}>
          {CATEGORYLIST.map((item, index) => (
            <div
              key={index}
              className={styles.catItem}
              onClick={() => setSelectedCategory(item)}
              style={{
                backgroundColor: selectedCategory.name === item.name ? "#dcf1ff" : "",
                borderLeft: selectedCategory.name === item.name ? "4px solid #4991c9" : "none",
              }}
            >
              <Image src={item.icon} alt={item.name} width={40} height={40} />
              <p className={styles.catName}>{item.name}</p>
            </div>
          ))}
        </div>

        {/* Right Dynamic Partners */}
        <div className={styles.partList}>
          {partners.length > 0 ? (
            partners.map((img: string, index: number) => (
              <div key={index} className={styles.partItem}>
                <Image
                  src={img}
                  alt={`partner-${index}`}
                  width={120}
                  height={80}
                  className={styles.imagePartner}
                />
              </div>
            ))
          ) : (
            <p style={{ padding: "20px", color: "#999" }}>No partners added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Partners;
