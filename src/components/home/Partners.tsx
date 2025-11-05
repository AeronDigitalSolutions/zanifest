"use client";

import React, { useEffect, useState, useRef } from "react";
import styles from "@/styles/components/home/Partners.module.css";
import Image, { StaticImageData } from "next/image";
import useSWR from "swr";

import img1 from "@/assets/home/car/1.png";
import img2 from "@/assets/home/car/2.png";
import img3 from "@/assets/home/car/6.png";

interface Category {
  name: string;
  icon: StaticImageData;
}

interface PartnerCategory {
  category: string;
  images: string[];
}

interface PartnersApiResponse {
  heading?: string;
  categories: PartnerCategory[];
}

interface PartnersProps {
  liveHeading?: string;
  liveImages?: string[];
}

const CATEGORYLIST: Category[] = [
  { name: "Health Insurance", icon: img1 },
  { name: "Motor Insurance", icon: img2 },
  { name: "Fire Insurance", icon: img3 },
];

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Partners: React.FC<PartnersProps> = ({ liveHeading, liveImages }) => {
  const { data } = useSWR<PartnersApiResponse>("/api/partnersApi", fetcher);

  const [selectedCategory, setSelectedCategory] = useState<Category>(CATEGORYLIST[0]);
  const [heading, setHeading] = useState<string>("");
  const [partners, setPartners] = useState<string[]>([]);
  const [animate, setAnimate] = useState(false); // <-- animation flag
  const sectionRef = useRef<HTMLDivElement>(null);

  // ----------------- Heading -----------------
  useEffect(() => {
    if (liveHeading !== undefined) {
      setHeading(liveHeading);
    } else if (data) {
      setHeading(data.heading || ""); 
    }
  }, [liveHeading, data]);

  // ----------------- Partners (images) -----------------
  useEffect(() => {
    if (liveImages !== undefined) {
      setPartners(liveImages);
    } else if (data) {
      const catData = data.categories.find(c => c.category === selectedCategory.name);
      setPartners(catData?.images ?? []);
    }
  }, [liveImages, selectedCategory, data]);

  // ----------------- Scroll Trigger -----------------
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setAnimate(true); // trigger animation
            observer.unobserve(entry.target); // animate only once
          }
        });
      },
      { threshold: 0.3 } // trigger when 30% visible
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <div ref={sectionRef} className={styles.cont}>
      {/* Heading */}
      <div className={styles.head}>
        <p className={`${styles.heading} ${animate ? styles.animate : ""}`}>
          {heading.split(" ").slice(0, -1).join(" ")}{" "}
          <span className={styles.orange}>{heading.split(" ").slice(-1)}</span>
        </p>
      </div>

      {/* Bottom Section */}
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
            partners.map((img, index) => (
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
};

export default Partners;
