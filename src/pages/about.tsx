"use client";

import React, { useState } from "react";
import styles from "@/styles/about/herosection.module.css";
import Image from "next/image";
import team from "@/assets/pageImages/pexels-divinetechygirl-1181438.jpg";

import Aboutcompany from "@/components/About/Aboutcompany";
import OurTeam from "@/components/About/OurTeam";
import Award from "@/components/About/Award";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const Herosection = () => {
  const [activeSection, setActiveSection] = useState("aboutcompany");

  return (
    <>
      <div className={styles.fixedNavbar}>
        <Navbar />
      </div>

      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <Image
          src={team}
          alt="Zanifest Team"
          fill
          priority
          className={styles.heroImage}
        />

        <div className={styles.overlay}>
          <h1>Finding you the best insurance since</h1>
          <h2 className={styles.number}>2025</h2>

          <div className={styles.buttons}>
            <button
              className={activeSection === "aboutcompany" ? styles.active : ""}
              onClick={() => setActiveSection("aboutcompany")}
            >
              About Company
            </button>

            <button
              className={activeSection === "ourteam" ? styles.active : ""}
              onClick={() => setActiveSection("ourteam")}
            >
              About Director
            </button>

            <button
              className={activeSection === "awards" ? styles.active : ""}
              onClick={() => setActiveSection("awards")}
            >
              Vision & Mission
            </button>
          </div>

          <p>
          We wish to be known as an institution of choice for our commitment and fair business practices. Ensuring that Zanifest Insurance Broker becomes the most Honest and Best Insurance Broker of India.
          </p>
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <main>
        {activeSection === "aboutcompany" && <Aboutcompany />}
        {activeSection === "ourteam" && <OurTeam />}
        {activeSection === "awards" && <Award />}
      </main>

      <Footer />
    </>
  );
};

export default Herosection;
