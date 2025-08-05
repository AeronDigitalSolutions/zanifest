// src/components/OurOrigin.jsx
import React from "react";
import Image from "next/image";                             
import styles from "@/styles/pages/ourteam.module.css";
import teamImg from '@/assets/pageImages/team.jpg'
import agentimg from '@/assets/pageImages/agent.jpg'

const Aboutcompany = () => {     
  return (
    <>
    <section className={styles.originSection}>
      <div className={styles.content}>
        <p className={styles.subtitle}>Our origin</p>
        <h2 className={styles.title}>How it all started</h2>
        <p className={styles.description}>
          Zanifest was founded in ....... with one objective: bringing transparency in insurance. 
          The founders wanted to reimagine insurance, so they started by simplifying all the information 
          around plans, ending the rampant mis-selling, and preventing policy lapses.
        </p>
      </div>

      <div className={styles.imagesContainer}>
        <div className={styles.decorativeShape}></div>

 <Image
          src={teamImg}
          alt="Team background"
          fill
          priority
          style={{ objectFit: "cover" }}
        />     
           <div className={styles.smallImageWrapper}>
          {/* <img src={agentsImage} alt="Agents" className={styles.smallImage} /> */}
           <Image
                    src={agentimg}
                    alt="Team background"
                    fill
                    priority
                    style={{ objectFit: "cover" }}
                  />
        </div>
      </div>
    </section>
     <section className={styles.originSection}>
       <div className={styles.imagesContainer}>
        <div className={styles.decorativeShape}></div>

 <Image
          src={teamImg}
          alt="Team background"
          fill
          priority
          style={{ objectFit: "cover" }}
        />     
           <div className={styles.smallImageWrapper}>
          {/* <img src={agentsImage} alt="Agents" className={styles.smallImage} /> */}
           <Image
                    src={agentimg}
                    alt="Team background"
                    fill
                    priority
                    style={{ objectFit: "cover" }}
                  />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.subtitle}>Our origin</p>
        <h2 className={styles.title}>How it all started</h2>
        <p className={styles.description}>
          Zanifest was founded in ....... with one objective: bringing transparency in insurance. 
          The founders wanted to reimagine insurance, so they started by simplifying all the information 
          around plans, ending the rampant mis-selling, and preventing policy lapses.
        </p>
      </div>

     
    </section>
    </>
  );
};

export default Aboutcompany;
