"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/components/home/HowWorksSections.module.css";
import Image from "next/image";
import { FaEllipsisH } from "react-icons/fa";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data.data);

export default function HowWorksSections() {
  const { data, error } = useSWR("/api/howworksapi", fetcher, {
    refreshInterval: 5000,
  });

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [animateheading, setAnimateheading] = useState(false);

  // Trigger animation only when section enters viewport 
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimateheading(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  if (error) return <p>Failed to load data</p>;
  if (!data) return <p>Loading...</p>;

  const { mainHeading = "", servicesHeading = "", steps = [], services = [] } =
    data;

  const defaultImageProps = {
    width: 100,
    height: 100,
    style: { objectFit: "contain" as "contain" },
  };

  const renderHeading = (text: string) => {
    const parts = text.split(/(<[^>]+>)/g);
    return parts.map((part, idx) =>
      part.startsWith("<") && part.endsWith(">") ? (
        <span key={idx} className={styles.orange}>
          {part.slice(1, -1)}
        </span>
      ) : (
        <span key={idx}>{part}</span>
      )
    );
  };

  return (
    <div ref={sectionRef} className={styles.cont}>
      {/* Main Heading */}
      <div className={styles.head}>
        <div
          className={`${styles.heading} ${
            animateheading ? styles.animateOnce : ""
          }`}
        >
          {renderHeading(mainHeading)}
          <div className={styles.mobileEllipsis}>
            <FaEllipsisH style={{ color: "#fa621a", fontSize: "25px" }} />
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className={styles.bottom}>
        {steps.map((item: any, index: number) => (
          <div key={index} className={styles.item}>
            {item.image && (
              <Image
                src={item.image}
                alt={item.name || `step-${index}`}
                className={styles.image}
                {...defaultImageProps}
                unoptimized
              />
            )}
            <h2 className={styles.name}>{item.name}</h2>
            <h6 className={styles.desc}>{item.desc}</h6>
          </div>
        ))}
      </div>

      {/* Services Heading */}
      <div className={styles.servciesCont}>
        <div
          className={`${styles.heading} ${
            animateheading ? styles.animateOnce : ""
          }`}
        >
          {renderHeading(servicesHeading)}
        </div>
        <div className={styles.mobileEllipsis}>
          <FaEllipsisH style={{ color: "#fa621a", fontSize: "25px" }} />
        </div>

        {/* Services */}
        <div className={styles.services}>
          {services.map((item: any, index: number) => (
            <div className={styles.serviceItem} key={index}>
              <div className={styles.servicetop}>
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name || `service-${index}`}
                    className={styles.serviceImage}
                    width={50}
                    height={50}
                    unoptimized
                    style={defaultImageProps.style}
                  />
                )}
                <h2 className={styles.serviceName}>{item.name}</h2>
              </div>
              <button className={styles.serviceDesc}>{item.desc}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
