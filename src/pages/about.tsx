"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import styles from "@/styles/about/herosection.module.css";
import Navbar from "@/components/ui/Navbar";
import aboutBg from "@/assets/About/about.png";
import logo from "@/assets/logo.png";
import layer10 from "@/assets/About/Layer 10.png";
import layer11 from "@/assets/About/Layer 11.png";
import layer14 from "@/assets/About/Layer 14.png";
import layer23 from "@/assets/About/Layer 23.png";
import mandeep from "@/assets/contact/Mandeep.jpeg";
import naresh from "@/assets/contact/Naresh.jpeg";
import mayak from "@/assets/contact/Mayak.jpeg";
import { ZodArray } from "zod";
import { FaShieldAlt, FaUsers, FaSmile, FaChartLine } from "react-icons/fa";
import Footer from "@/components/ui/Footer";


type ProfileKey = "mandeep" | "naresh" | "mayak";

type Profile = {
  name: string;
  img: StaticImageData;
  text: string;
};

export default function AboutPage() {
  const [active, setActive] = useState<ProfileKey>("mandeep");
const profiles: Record<ProfileKey, Profile> = {
  mandeep: {
    name: "Mandeep Rathee",
    img: mandeep,
    text: `Mandeep Rathee is the Founder and CEO of Zanifest Insurance Broker Pvt. Limited, based in Chandigarh. He is a science graduate from Hindu College and later completed a Business Management degree from GJU, Hisar. His professional qualifications also include Licentiate in General Insurance from III and an advanced certification in Product Management from IIT Guwahati.

He has worked with leading corporates for more than two decades, starting his career as a Management Trainee with Red Bull Energy Drink in 2005. Over the years, his professional journey took him through organizations such as Bharti AXA General Insurance, HDFC ERGO, and ICICI Lombard General Insurance, where he spent nearly 20 years in the general insurance space. His experience spans simple motor, health, and travel insurance to complex corporate and large project policies.

He has successfully led teams of over 100 professionals and managed insurance business for major private sector banks including ICICI Bank and HDFC Bank across Haryana, Punjab, Himachal Pradesh, and J&K.`
  },

  naresh: {
    name: "Naresh Dhiman",
    img: naresh,
    text: `Naresh Dhiman is a Director of Zanifest Insurance Broker, based in Bilaspur, Himachal Pradesh. He is a Business Graduate and also holds a Postgraduate degree from IMS, Shimla. With over 20 years of experience, Naresh has successfully handled diverse businesses across insurance companies, dealer networks, and start-up ventures.

Throughout his career, he has worked with reputed organizations such as Shriram General Insurance as a Senior Branch Manager, Bharti AXA General Insurance, Bajaj Allianz General Insurance, and has also managed the Mahindra dealer network across Himachal Pradesh. In addition, he has been a founder of an FMCG start-up, giving him hands-on entrepreneurial experience alongside corporate exposure.

Naresh is passionate about interacting with people and enjoys discussing innovative business ideas. An avid traveller and explorer, he brings strong business acumen and leadership capability, handling large business volumes with efficiency and ease.`
  },

  mayak: {
    name: "Mayank Thakur",
    img: mayak,
    text: `Mayank is a Director of the company, based in Dehradun. He brings with him extensive experience of 22 years, out of which 18 years have been dedicated to the general insurance industry. He is a Commerce postgraduate from DAV College, Dehradun, and has also completed a Diploma in Information Technology from Sikkim Manipal University.

Professionally, Mayank has worked with leading insurance organizations such as ICICI Lombard, Reliance General Insurance, Bharti AXA General Insurance, and the Royal Sundaram Group. He has handled the Uttar Pradesh and Uttarakhand regions extensively and possesses deep expertise across retail insurance, bancassurance, and corporate insurance domains.

An industry veteran, Mayank is known for his strong operational knowledge and people-centric approach. He is currently focused on building an honest, credible, and customer-friendly insurance organization from the ground up.

Outside of work, Mayank enjoys trekking and driving in the hills, plays badminton, loves listening to music, and—like most Indians—is a true tea enthusiast.`
  }
};


  const current = profiles[active];
  return (
    <>
    <Navbar/>
    <section className={styles.hero}>
      {/* Background */}
     <Image
  src={aboutBg}
  alt="About Background"
  fill
  priority
  sizes="100vw"
  className={styles.bgImage}
/>


      {/* Color overlay (NO heavy blur) */}
      <div className={styles.overlay}></div>

      {/* Center Card */}
      <div className={styles.card}>
        <Image
          src={logo}
          alt="Zanifest Logo"
          width={500}   // 🔥 LOGO BIG
          height={110}
          className={styles.logo}
        />

        <p className={styles.text}>
          redefining modern experiences by creating a seamless, engaging,
          and inclusive platform that brings people together, removes
          complexity, and ensures everyone can easily discover, access,
          and enjoy meaningful moments without barriers.
        </p>
      </div>
    </section>
        <section className={styles.aboutSection}>
        <div className={styles.aboutContainer}>
          
          {/* LEFT : IMAGES */}
          <div className={styles.imageStack}>
            <Image
              src={layer11}
              alt="Team discussion"
              className={styles.imageBack}
            />
            <Image
              src={layer10}
              alt="Business meeting"
              className={styles.imageFront}
            />
          </div>

          {/* RIGHT : TEXT */}
          <div className={styles.aboutContent}>
            <span className={styles.aboutTag}>ABOUT COMPANY</span>

            <h2 className={styles.aboutTitle}>
              Creating a better <br /> future for your loved <br /> once
            </h2>

            <p className={styles.aboutDesc}>
              Zanifest Insurance Broking is born to realize the dream of
              helping people by mitigating their risks and providing honest
              and most effective insurance solutions. Over the years, we
              discovered serious challenges in the insurance ecosystem.
              There is widespread mis-selling, service delays, and finding
              credible, trustworthy advice has become extremely difficult.
              Trust issues exist – and rightly so.
            </p>
          </div>
        </div>
      </section>
        {/* ===== VISION / MISSION SECTION ===== */}
      <section className={styles.vmSection}>
        <div className={styles.vmContainer}>

          {/* LEFT IMAGE */}
          <div className={styles.vmLeft}>
            <Image
              src={layer14}
              alt="Vision Mission Values"
              className={styles.vmHex}
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className={styles.vmRight}>

            {/* Mission */}
            <div className={styles.vmCard}>
              <Image src={layer23} alt="" className={styles.vmBg} />
              <div className={styles.vmTextWrap}>
                <h3 className={styles.vmTitle}>Mission</h3>
                <p className={styles.vmText}>
                  Wish to become a trusted insurance provider in the insurance
                  field. We want to cover all houses, business premises, projects,
                  vehicles, travellers, employees, and individuals to live a
                  sustainable, worry-free life.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className={styles.vmCard}>
              <Image src={layer23} alt="" className={styles.vmBg} />
              <div className={styles.vmTextWrap}>
                <h3 className={styles.vmTitle}>Vision</h3>
                <p className={styles.vmText}>
                  To become the most honest and transparent insurance provider
                  of India. We wish to be known as an institution of choice for
                  our commitment and fair business practices – ensuring Zanifest
                  Insurance Broker becomes the most honest and best insurance
                  broker of India.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
       
      {/* ================= LEADERSHIP ================= */}
<section className={styles.leaderSection}>
  {/* Tabs */}
  <div className={styles.tabs}>
    {(Object.keys(profiles) as ProfileKey[]).map((key) => (
      <button
        key={key}
        className={`${styles.tab} ${active === key ? styles.activeTab : ""}`}
        onClick={() => setActive(key)}
      >
        {profiles[key].name}
      </button>
    ))}
  </div>

  {/* Content */}
  <div className={styles.leaderContent}>
    {/* Left Image */}
    <div className={styles.leaderImage}>
      <Image
        src={current.img}
        alt={current.name}
        priority
      />
    </div>

    {/* Right Text */}
    <div className={styles.leaderText}>
      <p>{current.text}</p>
    </div>
  </div>

  {/* Stats Bar */}
  <div className={styles.statsBar}>
    <div className={styles.statItem}>
      <FaShieldAlt className={styles.statIcon} />
      <div className={styles.statText}>
        <h3>2.6k</h3>
        <span>Gave insurances</span>
      </div>
    </div>

    <div className={styles.statItem}>
      <FaUsers className={styles.statIcon} />
      <div className={styles.statText}>
        <h3>89+</h3>
        <span>Professional team</span>
      </div>
    </div>

    <div className={styles.statItem}>
      <FaSmile className={styles.statIcon} />
      <div className={styles.statText}>
        <h3>2.8k</h3>
        <span>Satisfied customers</span>
      </div>
    </div>

    <div className={styles.statItem}>
      <FaChartLine className={styles.statIcon} />
      <div className={styles.statText}>
        <h3>99%</h3>
        <span>Our success rate</span>
      </div>
    </div>
  </div>
</section>
<Footer/>

    </>
  );
}
