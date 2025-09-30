// /components/home/HowWorksSections.tsx
"use client"; 
import React from "react"; 
import styles from "@/styles/components/home/HowWorksSections.module.css"; 
import Image from "next/image"; 
import { FaEllipsisH } from "react-icons/fa"; 
import useSWR from "swr"; 
import axios from "axios"; 

// Fetcher function for SWR 
const fetcher = (url: string) => axios.get(url).then(res => res.data); 

export default function HowWorksSections() { 
 
  const { data, error } = useSWR("/api/howworksapi", fetcher, { refreshInterval: 5000 }); 

  if (error) return <p>Failed to load data</p>; 
  if (!data) return <p>Loading...</p>; 

  // Destructure dynamic data
  const { mainHeading, servicesHeading, steps = [], services = [] } = data; 

  // Default props for Next/Image (adjust as per your CSS and original image sizes)
  const defaultImageProps = {
    width: 100, 
    height: 100,
    style: { objectFit: 'contain' as 'contain' }
  };
  
  return ( 
    <div className={styles.cont}> 
      <div className={styles.head}> 
        <div className={styles.heading}> 
          {mainHeading.split(" ").map((word: string, idx: number) => 
            word.toLowerCase().includes("work") ? ( 
              <span key={idx} className={styles.orange}>{word}</span> 
            ) : ( 
              <span key={idx}> {word} </span> 
            ) 
          )} 
          <div className={styles.mobileEllipsis}> 
            <FaEllipsisH style={{ color: "#fa621a", fontSize: "25px" }} /> 
          </div> 
        </div> 
      </div> 

      {/* Steps (How We Work) - 3 Divs */} 
      <div className={styles.bottom}> 
        {steps.map((item: any, index: number) => ( 
          <div key={index} className={styles.item}> 
            {/* Image from Base64 string/URL */}
            {item.image && (
              <Image 
                src={item.image} 
                alt={item.name} 
                className={styles.image} 
                {...defaultImageProps}
              />
            )}
            <h2 className={styles.name}>{item.name}</h2> 
            <h6 className={styles.desc}>{item.desc}</h6> 
          </div> 
        ))} 
      </div> 

      {/* Services Heading: Pay Less Cover More */} 
      <div className={styles.servciesCont}> 
        <div className={styles.heading}> 
          {servicesHeading.split(" ").map((word: string, idx: number) => 
            word.toLowerCase().includes("less") ? ( 
              <span key={idx} className={styles.orange}>{word} </span> 
            ) : ( 
              <span key={idx}>{word} </span> 
            ) 
          )} 
        </div> 
        <div className={styles.mobileEllipsis}> 
          <FaEllipsisH style={{ color: "#fa621a", fontSize: "25px" }} /> 
        </div> 
        
        {/* Services (Pay Less Cover More) - 8 Divs */}
        <div className={styles.services}> 
          {services.map((item: any, index: number) => ( 
            <div className={styles.serviceItem} key={index}> 
              <div className={styles.servicetop}> 
                {/* Image from Base64 string/URL */}
                {item.image && (
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    className={styles.serviceImage} 
                    width={50} // Smaller size for these images
                    height={50}
                    style={defaultImageProps.style}
                  />
                )}
                <h2 className={styles.serviceName}>{item.name}</h2> 
              </div> 
              {/* Desc is used as the button text/price */}
              <button className={styles.serviceDesc}>{item.desc}</button> 
            </div> 
          ))} 
        </div> 
      </div> 
    </div> 
  ); 
}