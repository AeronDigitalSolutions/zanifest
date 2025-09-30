// src/pages/admin/PartnerAdmin.tsx
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import useSWR from "swr";
import Partners from "../home/Partners";
import img1 from "@/assets/home/car/1.png"
import img2 from "@/assets/home/car/2.png"
import img3 from "@/assets/home/car/6.png"

const CATEGORYLIST = [
  { name: "Health Insurance", icon: img1 },
  { name: "Motor Insurance", icon: img2 },
  { name: "Fire Insurance", icon: img3 },
];

const fetcher = (url: string) => fetch(url).then(res => res.json());

const PartnerAdmin = () => {
  const { data, mutate } = useSWR("/api/partnersApi", fetcher);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORYLIST[0]);
  const [headings, setHeadings] = useState<Record<string, string>>({});
  const [images, setImages] = useState<string[]>([]);

  // Initialize headings and images when data or category changes
  useEffect(() => {
    const catData = data?.find((d: any) => d.category === selectedCategory.name);
    
    setHeadings(prev => ({
      ...prev,
      [selectedCategory.name]: catData?.heading || "Insurance Partner",
    }));

    setImages(catData?.images || []);
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
    await fetch("/api/partnersApi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: selectedCategory.name,
        heading: headings[selectedCategory.name] || "Insurance Partner",
        images,
      }),
    });
    mutate();
    alert("Saved successfully!");
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* Left Category Selector */}
      <div>
        {CATEGORYLIST.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              cursor: "pointer",
              fontWeight: selectedCategory.name === item.name ? "bold" : "normal",
            }}
            onClick={() => setSelectedCategory(item)}
          >
            <Image src={item.icon} width={50} height={50} alt={item.name} />
            <span style={{ marginLeft: "10px" }}>{item.name}</span>
          </div>
        ))}
      </div>

      {/* Right Editor */}
      <div style={{ flex: 1 }}>
        {/* Heading Input */}
        <div style={{ marginBottom: 20 }}>
          <input
            type="text"
            value={headings[selectedCategory.name] || "Insurance Partner"}
            onChange={(e) =>
              setHeadings(prev => ({
                ...prev,
                [selectedCategory.name]: e.target.value,
              }))
            }
            placeholder="Category Heading"
            style={{ padding: "10px", fontSize: "16px", width: "80%" }}
          />
        </div>

        {/* Partner Logos */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: 10 }}>
          {images.map((img, idx) => (
            <div key={idx} style={{ position: "relative" }}>
              <Image src={img} width={100} height={100} alt={`img-${idx}`} />
              <button
                onClick={() => handleDeleteImage(idx)}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  cursor: "pointer",
                }}
              >
                X
              </button>
            </div>
          ))}
          {images.length < 9 && (
            <input type="file" onChange={handleImageUpload} accept="image/png,image/jpeg" />
          )}
        </div>

        <button
          onClick={handleSaveAll}
          style={{ padding: "10px 20px", background: "orange", color: "#fff", border: "none", cursor: "pointer" }}
        >
          Save All
        </button>

        {/* Live Preview */}
        <section style={{ marginTop: 24 }}>
          <h3>Live Preview</h3>
          <Partners liveHeading={headings[selectedCategory.name]} liveImages={images} />
        </section>
      </div>
    </div>
  );
};

export default PartnerAdmin;
