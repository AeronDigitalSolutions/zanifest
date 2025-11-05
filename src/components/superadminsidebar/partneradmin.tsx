"use client";

import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import useSWR from "swr";
import Partners from "../home/Partners";
import img1 from "@/assets/home/car/1.png";
import img2 from "@/assets/home/car/2.png";
import img3 from "@/assets/home/car/6.png";
import styles from "@/styles/components/superadminsidebar/partneradmin.module.css";

// ----------------- Types -----------------
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

// ----------------- Constants -----------------
const CATEGORYLIST: Category[] = [
  { name: "Health Insurance", icon: img1 },
  { name: "Motor Insurance", icon: img2 },
  { name: "Fire Insurance", icon: img3 },
];

const fetcher = (url: string) => fetch(url).then(res => res.json());

// ----------------- Component -----------------
const PartnerAdmin: React.FC = () => {
  const { data, mutate } = useSWR<PartnersApiResponse>("/api/partnersApi", fetcher);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [heading, setHeading] = useState<string>("");
  const [imagesMap, setImagesMap] = useState<{ [key: string]: string[] }>({});

  // ----------------- Populate state from DB -----------------
  useEffect(() => {
    if (data) {
      setHeading(data.heading || "");

      const map: { [key: string]: string[] } = {};
      CATEGORYLIST.forEach(cat => {
        const catData = data.categories.find(c => c.category === cat.name);
        map[cat.name] = catData?.images || [];
      });
      setImagesMap(map);

      if (!selectedCategory) setSelectedCategory(CATEGORYLIST[0]);
    }
  }, [data]);

  // ----------------- Image Upload -----------------
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !selectedCategory) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagesMap(prev => {
        const updated = { ...prev };
        if (updated[selectedCategory.name].length < 9) {
          updated[selectedCategory.name] = [...updated[selectedCategory.name], reader.result as string];
        }
        return updated;
      });
    };
    reader.readAsDataURL(file);
  };

  // ----------------- Delete Image -----------------
  const handleDeleteImage = (index: number) => {
    if (!selectedCategory) return;
    setImagesMap(prev => {
      const updated = { ...prev };
      updated[selectedCategory.name] = updated[selectedCategory.name].filter((_, i) => i !== index);
      return updated;
    });
  };

  // ----------------- Save All -----------------
  const handleSaveAll = async () => {
    const body: PartnersApiResponse = {
      heading,
      categories: CATEGORYLIST.map(cat => ({
        category: cat.name,
        images: imagesMap[cat.name] || [],
      })),
    };

    await fetch("/api/partnersApi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    mutate();
    alert("Saved successfully!");
  };

  // ----------------- Delete Heading -----------------
  const handleDeleteHeading = async () => {
    await fetch("/api/partnersApi/deleteHeading", { method: "POST" });
    setHeading("");
    mutate();
    alert("Heading deleted successfully!");
  };

  if (!selectedCategory) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      {/* Left Category Selector */}
      <div className={styles.categoryList}>
        {CATEGORYLIST.map((item, idx) => (
          <div
            key={idx}
            className={`${styles.categoryItem} ${selectedCategory.name === item.name ? styles.active : ""}`}
            onClick={() => setSelectedCategory(item)}
          >
            <Image src={item.icon} width={50} height={50} alt={item.name} />
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      {/* Right Editor */}
      <div className={styles.editor}>
        {/* Global Heading Input */}
        <div className={styles.card}>
          <h4>Heading</h4>
          <input
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            placeholder="Enter heading"
          />
          <button className={styles.deleteBtn} onClick={handleDeleteHeading} style={{ marginTop: "10px" }}>
            Delete Heading
          </button>
        </div>

        {/* Partner Logos */}
        <div className={styles.card}>
          <h4>Partner Logos</h4>
          <div className={styles.imagesGrid}>
            {(imagesMap[selectedCategory.name] || []).map((img, idx) => (
              <div key={idx} className={styles.imageWrapper}>
                <Image src={img} width={100} height={100} alt={`img-${idx}`} />
                <button className={styles.deleteBtn} onClick={() => handleDeleteImage(idx)}>X</button>
              </div>
            ))}
            {(imagesMap[selectedCategory.name]?.length || 0) < 9 && (
              <input type="file" onChange={handleImageUpload} accept="image/png,image/jpeg" />
            )}
          </div>
        </div>

        {/* Save Button */}
        <button className={styles.saveBtn} onClick={handleSaveAll}>Save All</button>

        {/* Live Preview */}
        <div className={styles.card}>
          <h4>Live Preview</h4>
          <Partners
            liveHeading={heading}
            liveImages={imagesMap[selectedCategory.name] || []}
          />
        </div>
      </div>
    </div>
  );
};

export default PartnerAdmin;
