"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/about/herosection.module.css";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

import director1 from "@/assets/contact/Mandeep.jpeg";
import director2 from "@/assets/contact/Naresh.jpeg";
import director3 from "@/assets/contact/Mayak.jpeg";

import slide1 from "@/assets/contact/contact.png";
import slide2 from "@/assets/contact/sliders2.png";
import slide3 from "@/assets/contact/slider3.png";
import whatweoffer from "@/assets/contact/whatweoffer-removebg-preview.png";
const slides = [slide1, slide2, slide3]

const AboutUsPage = () => {
  const [current, setCurrent] = useState(0);

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

      {/* ===== HERO / CAROUSEL ===== */}
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
          <h1 className={styles.pageTitle}>ABOUT US</h1>

          <div className={styles.heroYear}>2026</div>

          <p className={styles.heroDesc}>
            We wish to be known as an institution of choice for our commitment
            and fair business practices. Ensuring that Zanifest Insurance Broker
            becomes the most Honest and Best Insurance Broker of India.
          </p>
        </div>
      </section>

      {/* ================= WHY ZANIFEST ================= */}
      <section className={styles.section}>
        <div className={styles.grid}>
          <div className={styles.cleanImageWrap}>
            <Image
              src={slide1}
              alt="Zanifest Team"
              fill
              className={styles.imageContain}
            />
          </div>

          <div className={styles.content}>
            <p className={styles.subtitle}>Our Purpose</p>
            <h2 className={styles.title}>Why Zanifest Exists</h2>
            <p className={styles.textJustify}>
              Zanifest Insurance Broking is born to realize the dream of helping
              people by mitigating their risks and providing honest and most
              effective insurance solutions.
              <br />
              <br />
              Over the years, we discovered serious challenges in the insurance
              ecosystem. There is widespread mis-selling, service delays, and
              finding credible, trustworthy advice has become extremely
              difficult. Trust issues exist — and rightly so.
            </p>
          </div>
        </div>
      </section>

      {/* ================= OUR APPROACH ================= */}
      <section className={styles.section}>
        <div className={styles.grid}>
          <div className={styles.cleanImageWrap}>
            <Image
              src={slide1}
              alt="Our Approach"
              fill
              className={styles.imageContain}
            />
          </div>

          <div className={styles.content}>
            <p className={styles.subtitle}>Our Approach</p>
            <h2 className={styles.title}>Bridging the Trust Gap</h2>

            <p className={styles.textJustify}>
              There are very few professionals who have seen both sides of the
              insurance industry — as a corporate employee and as a broker.
              Fortunately, we are one of those few.
              <br />
              <br />
              With more than 20 years of corporate experience, we understand how
              companies decide premiums, what they cover, how they cover, and
              why claims are sometimes deducted or denied.
            </p>

            <p className={styles.textJustify}>
              Insurance needs compassion, but technology has replaced human
              warmth. At Zanifest, we blend compassion with technology —
              delivering personalised solutions and standing by our customers
              when they need us the most.
            </p>

            <p className={styles.highlightText}>
              We promise to help our customers choose the best insurance cover.
              <br />
              <strong>!! Vada Suraksha Ka !!</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ================= WHAT WE OFFER ================= */}
      <section className={styles.section}>
        <div className={styles.grid}>
          {/* LEFT IMAGE */}
          <div className={styles.offerImageSticky}>
            <Image
              src={whatweoffer}
              alt="What We Offer"
              width={480}
              height={480}
              className={styles.offerImage}
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className={styles.content}>
            <p className={styles.subtitle}>Our Services</p>
            <h2 className={styles.title}>What We Offer</h2>

            <p className={styles.textJustify}>
              With more than 20 years of experience in insurance, we are now at
              your service to help you choosing best and customized insurance
              solutions. Zanifest is working to ensure a worry-free life as we
              optimally protect people, their families and their businesses.
              <br />
              <br />
              Not only this, with our vast insurance network of 30+ insurance
              partners, a team of expert insurance advisors and round the clock
              dedicated claim assistance, we are the perfect insurance partners
              for our customers. We offer all lines of product to our clients,
              be it:
            </p>

            <ul className={styles.offerList}>
              <li>
                <strong>Individuals Policies:</strong> Health Insurance, Motor
                Insurance, Travel Insurance, Home Insurance, Cyber Insurance,
                Personal Accident, Critical Illness and Pet Insurance policies
              </li>

              <li>
                <strong>Business Policies:</strong> Shop Insurance, Business
                Trade Policies, Fire Policy, Marine and Business All Risk
                Policies, EAR (Erection All Risk Policy)
              </li>

              <li>
                <strong>Doctors and Hospitals:</strong> Doctors Liability
                Insurance, Fire Insurance and Machinery Breakdown Policy
              </li>

              <li>
                <strong>Educational Institutes:</strong> Group Mediclaim, Group
                Personal Accident, Fire and EEI Policy, Equipment and Motor
                Policy for Buses
              </li>

              <li>
                <strong>Contractors & Project Builders:</strong> Contractors All
                Risk Policy, Fire Policy and Surety Bond Policy
              </li>

              <li>
                <strong>Offices:</strong> Office Package Policy and Electronic
                Equipment Policy
              </li>

              <li>
                <strong>Hotels & Cafes:</strong> Fire, All Risk and Public
                Liability Covers
              </li>

              <li>
                <strong>Exporters:</strong> Open Marine, STOP and Product
                Liability Policies
              </li>

              <li>
                <strong>Jewelers:</strong> Jewelers Block Policies
              </li>

              <li>
                <strong>Startups & Corporates:</strong> Group Health Insurance
                for staff and Fire Policy for office or warehouse
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= FOUNDER ================= */}
      <section className={`${styles.section} ${styles.lightBg}`}>
        <div className={styles.grid}>
          <div className={styles.stickyImageWrap}>
            <Image
              src={director1}
              alt="Founder"
              width={420}
              height={420}
              className={styles.stickyImage}
            />
          </div>

          <div className={styles.content}>
            <p className={styles.subtitle}>About the Founder</p>
            <h2 className={styles.title}>Mandeep Rathee</h2>
            <p className={styles.textJustify}>
              Mandeep Rathee is a Founder and CEO of Zanifest Insurance Broker
              Pvt. Limited based at Chandigarh. He is a science graduate from
              “Hindu College” and then took a Business Management Degree from
              “GJU, Hisar”. His professional qualification also includes
              Licentiate in General insurance from “III” and advanced
              certification in Product Management from “IIT Guwahati”.
              <br />
              <br />
              He has worked with leading corporates for more than two decades,
              starting his journey as a Management Trainee with Red Bull Energy
              Drink back in 2005. Over the years, his professional journey took
              him through different organizations like Bharti AXA general
              Insurance, HDFC ERGO, and ICICI Lombard General Insurance, where
              he spent almost 20 years in the General insurance space doing all
              lines of products ranging from simple motor, health and travel
              insurances to complex business and group policies of large
              projects and corporates. He has handled a team 100 plus employees
              and managed 2 largest private sector Indian Banks ICICI Bank and
              HDFC Bank for their insurance business in entire Haryana, Punjab,
              Himachal and J&K.
            </p>
          </div>
        </div>
      </section>

      {/* ================= DIRECTOR ================= */}
      <section className={`${styles.section} ${styles.lightBg}`}>
        <div className={styles.grid}>
          <div className={styles.squareImageWrap}>
            <Image
              src={director2}
              alt="Director"
              fill
              className={styles.imageContain}
            />
          </div>

          <div className={styles.content}>
            <p className={styles.subtitle}>About the Founder</p>

            <h2 className={styles.title}>Naresh Dhiman</h2>
            <p className={styles.textJustify}>
              Naresh is a Director of Zanifest Insurance Broker based at
              Bilaspur, Himachal Pradesh. He is business Graduate and also a
              Post Graduate from IMS , Shimla. He is having 20 years of
              experience in Handling Various business, insurance companies,
              dealers and start-ups. He loves to Interact with people and
              discuss business ideas with them. He is an avid traveller and
              explorer.
              <br />
              <br />
              He has worked with Shriram General Insurance as senior Branch
              Manager, with Bharti Axa General Insurance, handled Mahindra
              dealers network in Himachal , Bajaj Allianz General Insurance and
              a FMCG startup founder as well. Business runs in his veins and he
              is capable of handling large business volumes with ease.
            </p>
          </div>
        </div>
      </section>

      {/* ================= DIRECTOR ================= */}
      <section className={`${styles.section} ${styles.lightBg}`}>
        <div className={styles.grid}>
          <div className={styles.squareImageWrap}>
            <Image
              src={director3}
              alt="Director"
              fill
              className={styles.imageContain}
            />
          </div>

          <div className={styles.content}>
            <p className={styles.subtitle}>About the Founder</p>

            <h2 className={styles.title}>Mayank Thakur</h2>
            <p className={styles.textJustify}>
              Mayank is a Director of the company based at Dehradun. He is
              having vast experience of 22 years out of which 18 years he has
              spent with various general insurance companies. He is a Commerce
              Post Graduate from DAV College, Dehradun and also done diploma in
              Information Technology from Sikkim Manipal University. He like
              Tracking and driving in hills, a badminton player, fond of
              listening music and a tea lover like all Indians
              <br />
              <br />
              He has worked with ICICI Lombard, Reliance General Insurance,
              Bharti Axa General and Royal Sundaram group in various capacities
              and handled UP and Uttarakhand Area extensively. From Retail
              business to bancassurance and corporates, Mayank is an expert in
              all lines of general insurance businesses. He is an industry
              veteran and working now to build an Honest, credible and customer
              friendly organisation from scratch.
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
              Wish to become a trusted insurance provider in the insurance
              field. We want to cover all houses, business premises, projects,
              vehicles, travellers, employees, and individuals to live a
              sustainable, worry-free life — eventually making India reach the
              top of the world happiness index.
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
