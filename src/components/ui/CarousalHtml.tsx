"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "@/styles/components/home/FeedBackSection.module.css";

interface CarouselItem {
  desc: string;
  image: string;
  name: string;
  post: string;
}

interface CarouselProps {
  items: CarouselItem[];
}

export default function Carousel({ items }: CarouselProps) {
  const [currentItems, setCurrentItems] = useState<CarouselItem[]>([]);
  const [isSliding, setIsSliding] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const CARD_WIDTH = 380; // Width of one card + gap

  useEffect(() => {
    const initial = [...items, ...items.slice(0, 3)]; // Add 3 more for looping
    setCurrentItems(initial);
  }, [items]);

  useEffect(() => {
    const interval = setInterval(() => {
      slideNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentItems]);

  const slideNext = () => {
    if (!trackRef.current) return;

    setIsSliding(true);
    const track = trackRef.current;
    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translateX(-${CARD_WIDTH}px)`;

    setTimeout(() => {
      setIsSliding(false);
      track.style.transition = "none";
      track.style.transform = "translateX(0)";

      setCurrentItems((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first]; // Rotate cards
      });
    }, 500);
  };

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.carouselWindow}>
        <div className={styles.track} ref={trackRef}>
          {currentItems.map((item, index) => (
            <div className={styles.serviceItem} key={index}>
              <h6 className={styles.desc}>{item.desc}</h6>
              <div className={styles.itemBottom}>
                <Image
                  src={item.image}
                  alt={item.name}
                  className={styles.image}
                  width={100}
                  height={100}
                />
                <div className={styles.namePost}>
                  <h2 className={styles.name}>{item.name}</h2>
                  <h2 className={styles.post}>{item.post}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
