"use client";

import React, { useState } from "react";
import styles from "@/styles/about/herosection.module.css";
import Image from "next/image";
import team from "@/assets/pageImages/pexels-divinetechygirl-1181438.jpg";
import Aboutcompany from "@/components/About/Aboutcompany";
import Navbar from "@/components/ui/Navbar";
import OurTeam from "@/components/About/OurTeam";
import Award from "@/components/About/Award";
import Footer from "@/components/ui/Footer";

const Herosection = () => {
  const [activeSection, setActiveSection] = useState("");

  return (
    <>
        <div className={styles.fixedNavbar}>
    <Navbar />
  </div>

      <div className={styles.hero}>
        <div className={styles.bgImage}>
          <Image
            src={team}
            alt="Team background"
            fill
            priority
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className={styles.overlay}>
          <h1>Finding you the best insurance since</h1>
          <h2 className={styles.number}>2008</h2>

          <div className={styles.buttons}>
            <button
              type="button"
              onClick={() => setActiveSection("aboutcompany")}
            >
              About Company
            </button>
            <button
              type="button"
              onClick={() => setActiveSection("ourteam")}
            >
              Our Team
            </button>
            <button
              type="button"
              onClick={() => setActiveSection("awards")}
            >
              Awards
            </button>
          </div>

          <p>
            We are proud to say that{" "}
            <strong>our team of over 14,000+ talented individuals</strong>{" "}
            consists of the most brilliant and innovative technology, business,
            and marketing minds in India.
          </p>
        </div>
      </div>

      <div>
        {activeSection === "aboutcompany" && <Aboutcompany />}
        {activeSection === "ourteam" && <OurTeam />}
        {activeSection === "awards" && <Award />}
      </div>

      <Footer />
    </>
  );
};

export default Herosection;
