"use client";
import React from "react";
import Image from "next/image";
import styles from "@/styles/pages/team.module.css";

// Static image imports
import img2 from "@/assets/pageImages/CEO1.webp";
import img3 from "@/assets/pageImages/CEO2[1].webp";

const teamMembers = [
  {
    name: "Yashish Dahiya",
    title: "Co-Founder & Group CEO",
    image: img2,
  },
  {
    name: "Alok Bansal",
    title: "Co-Founder & Executive Vice Chairman",
    image: img2,
  },
  {
    name: "Sarbvir Singh",
    title: "President & CEO - Zanifest",
    image: img3,
  },
];

const OurTeam = () => {
  return (
    <section className={styles.teamSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          Meet the team
          <span className={styles.titleUnderline}></span>
        </h2>
        <p className={styles.description}>
          Our leadership brings together an energetic group of people with a
          wealth of experience and commitment towards helping people make better
          financial decisions.
        </p>

        <div className={styles.cardGrid}>
          {teamMembers.map((member, index) => (
            <div key={index} className={styles.card}>
              <Image
                src={member.image}
                alt={member.name}
                className={styles.cardImage}
                width={200}
                height={200}
                objectFit="cover"
              />
              <h3 className={styles.cardName}>{member.name}</h3>
              <p className={styles.cardTitle}>{member.title}</p>
            </div>
          ))}
        </div>
        
        <div className={styles.cardGrid}>
          {teamMembers.map((member, index) => (
            <div key={index} className={styles.card}>
              <Image
                src={member.image}
                alt={member.name}
                className={styles.cardImage}
                width={200}
                height={200}
                objectFit="cover"
              />
              <h3 className={styles.cardName}>{member.name}</h3>
              <p className={styles.cardTitle}>{member.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
