import React, { useState, useEffect } from "react";
import styles from "@/styles/components/home/Partners.module.css";
import Image from "next/image";

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
    name: "Travel Insurance",
    image: require("@/assets/home/car/3.png"),
    partners: [
      require("@/assets/home/partners/7.png"),
      require("@/assets/home/partners/8.png"),
    ],
  },
  {
    name: "Shop Insurance",
    image: require("@/assets/home/car/4.png"),
    partners: [
      require("@/assets/home/partners/9.png"),
      require("@/assets/home/partners/10.png"),
    ],
  },
  {
    name: "Home Insurance",
    image: require("@/assets/home/car/5.png"),
    partners: [
      require("@/assets/home/partners/11.png"),
      require("@/assets/home/partners/12.png"),
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
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORYLIST[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className={styles.cont}>
      <div className={styles.head}>
        <div className={`${styles.heading} ${styles.orange}`}>Insurance</div>
        <div className={styles.heading}>Partner</div>
      </div>

      <div className={styles.bottom}>
        {/* Category List */}
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
          <div className={styles.catList}>
            {/* Dropdown Toggle */}
          <div className={styles.mobileDropdownHeader}>
  <div className={styles.catItem}>
    <Image
      src={selectedCategory.image}
      alt={selectedCategory.name}
      className={styles.image}
    />
    <p className={styles.catName}>{selectedCategory.name}</p>
  </div>
  <button
    className={styles.dropdownBtn}
    onClick={() => setDropdownOpen(!dropdownOpen)}
  >
    {dropdownOpen ? "▲" : "▼"}
  </button>
</div>


            {/* Dropdown Items */}
            {dropdownOpen &&
              CATEGORYLIST.map((item, index) => (
                <div
                  key={index}
                  className={styles.catItem}
                  onClick={() => {
                    setSelectedCategory(item);
                    setDropdownOpen(false);
                  }}
                  style={{
                    cursor: "pointer",
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
        )}

        {/* Partner List for Selected Category */}
        <div className={styles.partList}>
          {selectedCategory.partners.map((img, index) => (
            <div key={index} className={styles.partItem}>
              <Image src={img} alt="partner" className={styles.imagePartner} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Partners;
