"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/about/herosection.module.css";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

import slide1 from "@/assets/pageImages/pexels-divinetechygirl-1181438.jpg";
import slide2 from "@/assets/pageImages/team.jpg";
import slide3 from "@/assets/pageImages/agent.jpg";

const slides = [slide1, slide2, slide3];

const AboutUsPage = () => {
  const [current, setCurrent] = useState(0);

  /* ===== AUTO HERO SLIDER ===== */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <div className={styles.fixedNavbar}>
        <Navbar />
      </div>

      {/* ===== HERO CAROUSEL ===== */}
      <section className={styles.hero}>
        {slides.map((img, index) => (
          <div
            key={index}
            className={`${styles.slide} ${
              index === current ? styles.active : ""
            }`}
          >
            <Image
              src={img}
              alt="Zanifest Insurance"
              fill
              priority={index === 0}
              className={styles.heroImage}
            />
          </div>
        ))}

        <div className={styles.overlay}>
          <h1>Finding you the best insurance since</h1>
          <h2 className={styles.year}>2026</h2>

          <p className={styles.heroText}>
            We wish to be known as an institution of choice for our commitment
            and fair business practices. Ensuring that Zanifest Insurance Broker
            becomes the most Honest and Best Insurance Broker of India.
          </p>
        </div>
      </section>

      {/* ================= ABOUT COMPANY ================= */}
      <section className={styles.section}>
        <div className={styles.grid}>
          <div className={styles.imageWrap}>
            <Image src={slide2} alt="Zanifest Team" fill className={styles.image} />
          </div>

          <div className={styles.content}>
            <p className={styles.subtitle}>Our Purpose</p>
            <h2 className={styles.title}>Why Zanifest Exists</h2>
            <p className={styles.text}>
              Zanifest Insurance Broking is born to realize the dream of helping
              people by mitigating their risks and providing honest and most
              effective insurance solutions.
              <br /><br />
              Over the years, we discovered serious challenges in the insurance
              ecosystem. There is widespread mis-selling, service delays, and
              finding credible, trustworthy advice has become extremely difficult.
              Trust issues exist — and rightly so.
            </p>
          </div>
        </div>
      </section>

      {/* ================= ABOUT DIRECTOR ================= */}
      <section className={`${styles.section} ${styles.lightBg}`}>
        <div className={styles.grid}>
          <div className={styles.imageWrap}>
            <Image src={slide3} alt="Founder" fill className={styles.image} />
          </div>

          <div className={styles.content}>
            <p className={styles.subtitle}>About the Founder</p>
            <h2 className={styles.title}>Mandeep Rathee</h2>
            <p className={styles.text}>
              I am Mandeep Rathee, Founder and CEO of Zanifest Insurance Broker
              Pvt. Limited. I have worked with leading corporates for almost
              two decades, starting my journey as a Management Trainee at
              Red Bull Energy Drink in 2005.
              <br /><br />
              Over the years, my professional journey took me through reputed
              organizations such as Bharti AXA, HDFC ERGO, and finally ICICI
              Lombard General Insurance, where I spent nearly 18 years in the
              general insurance space.
            </p>
          </div>
        </div>
      </section>

      {/* ================= VISION ================= */}
      <section className={styles.section}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <h2 className={styles.title}>Our Vision</h2>
            <p className={styles.text}>
              Wish to become a trusted insurance provider in the insurance field.
              We want to cover all houses, business premises, projects, vehicles,
              travellers, employees, and individuals to live a sustainable,
              worry-free life — eventually making India reach the top of the
              world happiness index.
            </p>
          </div>

          <div className={styles.imageWrap}>
            <Image src={slide2} alt="Vision" fill className={styles.image} />
          </div>
        </div>
      </section>

      {/* ================= MISSION ================= */}
      <section className={`${styles.section} ${styles.lightBg}`}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <h2 className={styles.title}>Our Mission</h2>
            <p className={styles.text}>
              To become the most honest and transparent insurance provider of
              India. We want to deliver our four core service promises:
            </p>

            <ul className={styles.list}>
              <li>Agility</li>
              <li>Honesty</li>
              <li>Transparency</li>
              <li>Ease</li>
            </ul>

            <p className={styles.text}>
              We wish to be known as an institution of choice for our commitment
              and fair business practices — ensuring Zanifest Insurance Broker
              becomes the most honest and best insurance broker of India.
            </p>
          </div>

          <div className={styles.imageWrap}>
            <Image src={slide3} alt="Mission" fill className={styles.image} />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutUsPage;
