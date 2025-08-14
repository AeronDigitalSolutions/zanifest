import React, { useState, useEffect } from "react";
import styles from "@/styles/components/home/Partners.module.css";
import Image from "next/image";
import { FaEllipsisH } from "react-icons/fa";

const CATEGORYLIST = [
  {
    name: "Health Insurance",
    image: require("@/assets/home/car/1.png"),
    partners: [
      require("@/assets/home/partners/1.png"),
      require("@/assets/home/partners/2.png"),
      require("@/assets/home/partners/3.png"),
    ],
  },
  {
    name: "Motor Insurance",
    image: require("@/assets/home/car/2.png"),
    partners: [
      require("@/assets/home/partners/4.png"),
      require("@/assets/home/partners/5.png"),
      require("@/assets/home/partners/6.png"),
    ],
  },
  {
    name: "Fire Insurance",
    image: require("@/assets/home/car/6.png"),
    partners: [
      require("@/assets/home/partners/13.png"),
      require("@/assets/home/partners/14.png"),
      require("@/assets/home/partners/15.png"),
    ],
  },
];

function Partners() {
  // start desktop; updates after mount so no SSR errors
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORYLIST[0]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className={styles.cont}>
      <div className={styles.head}>
        <p className={styles.heading}>
          <span className={styles.orange}>Insurance</span> Partner
        </p>
      </div>
        <div className={styles.mobileEllipsis}>
          <FaEllipsisH style={{ color: "#fa621a", fontSize:"25px" }} />
        </div>

      <div className={styles.bottom}>
        {/* DESKTOP: exactly the same structure as before */}
        {!isMobile ? (
          <div className={styles.catList}>
            {CATEGORYLIST.map((item, index) => (
              <div
                key={index}
                className={styles.catItem}
                onClick={() => setSelectedCategory(item)}
                style={{
                  backgroundColor:
                    selectedCategory.name === item.name ? "#dcf1ff" : "",
                  borderLeft:
                    selectedCategory.name === item.name
                      ? "4px solid #4991c9"
                      : "none",
                }}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  className={styles.image}
                />
                <p className={styles.catName}>{item.name}</p>
              </div>
            ))}
          </div>
        ) : (
          /* MOBILE: horizontal image + name tabs (from CATEGORYLIST) */
          <div className={styles.mobileTabs} role="tablist" aria-label="categories">
            {CATEGORYLIST.map((item, index) => {
              const active = selectedCategory.name === item.name;
              return (
                <button
                  key={index}
                  className={`${styles.mobileTab} ${active ? styles.active : ""}`}
                  onClick={() => setSelectedCategory(item)}
                  aria-pressed={active}
                  role="tab"
                  type="button"
                >
                 
                  <span className={styles.mobileTabName}>{item.name}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* partners grid (updates from selectedCategory) */}
        <div className={styles.partList}>
          {selectedCategory.partners.map((img, index) => (
            <div key={index} className={styles.partItem}>
              <Image
                src={img}
                alt={`partner-${index}`}
                className={styles.imagePartner}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Partners;
