"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import useSWR from "swr";
import Partners from "../home/Partners";
import img1 from "@/assets/home/car/1.png";
import img2 from "@/assets/home/car/2.png";
import img3 from "@/assets/home/car/6.png";
import styles from "@/styles/components/superadminsidebar/partneradmin.module.css";

const CATEGORYLIST = [
  { name: "Health Insurance", icon: img1 },
  { name: "Motor Insurance", icon: img2 },
  { name: "Fire Insurance", icon: img3 },
];

const fetcher = (url: string) => fetch(url).then(res => res.json());

const PartnerAdmin = () => {
  const { data, mutate } = useSWR("/api/partnersApi", fetcher);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORYLIST[0]);
  const [heading, setHeading] = useState("Insurance Partner");
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      setHeading(data.heading || "Insurance Partner");
      const catData = data.categories.find((c: any) => c.category === selectedCategory.name);
      setImages(catData?.images || []);
    }
  }, [selectedCategory, data]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      if (images.length < 9) setImages(prev => [...prev, reader.result as string]);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSaveAll = async () => {
    const body = {
      heading,
      categories: CATEGORYLIST.map(cat =>
        cat.name === selectedCategory.name
          ? { category: cat.name, images }
          : { category: cat.name, images: data?.categories.find((c: any) => c.category === cat.name)?.images || [] }
      ),
    };

    await fetch("/api/partnersApi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    mutate();
    alert("Saved successfully!");
  };

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
        </div>

        {/* Partner Logos */}
        <div className={styles.card}>
          <h4>Partner Logos</h4>
          <div className={styles.imagesGrid}>
            {images.map((img, idx) => (
              <div key={idx} className={styles.imageWrapper}>
                <Image src={img} width={100} height={100} alt={`img-${idx}`} />
                <button className={styles.deleteBtn} onClick={() => handleDeleteImage(idx)}>X</button>
              </div>
            ))}
            {images.length < 9 && (
              <input type="file" onChange={handleImageUpload} accept="image/png,image/jpeg" />
            )}
          </div>
        </div>

        <button className={styles.saveBtn} onClick={handleSaveAll}>Save All</button>

        {/* Live Preview */}
        <div className={styles.card}>
          <h4>Live Preview</h4>
          <Partners liveHeading={heading} liveImages={images} />
        </div>
      </div>
    </div>
  );
};

export default PartnerAdmin;
