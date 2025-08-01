// import React from 'react'
// import styles from "@/styles/about/herosection.module.css"
// import Image from "next/image";
 
// import team from "@/assets/pageImages/pexels-divinetechygirl-1181438.jpg"
// const Herosection = () => {
//   return (
//     <div className={styles.hero}>
      
//       {/* Overlay Content */}
//       <div className={styles.overlay}>
//         <h1>Finding you the best insurance since</h1>
//         <h2>2008</h2>

//         <div className={styles.buttons}>
//           <button>About Company</button>
//           <button className={styles.active}>Our Team</button>
//           <button>Careers</button>
//           <button>Awards</button>
//         </div>

//         <p>
//           We are proud to say that <strong>our team of over 14,000+ talented individuals</strong> consists
//           of the most brilliant and innovative technology, business, and marketing minds in India.
//         </p>
//       </div>

//       {/* Background Image */}
//       <div className={styles.bgImage}>
//         <Image
//           src={team}
//           alt="Team background"
//           fill
//           priority
//           style={{ objectFit: "cover" }}
//         />
//       </div>
//     </div>
//   )
// }

// export default Herosection

// components/Herosection.jsx
"use client";

import React from 'react'
import styles from "@/styles/about/herosection.module.css"
import Image from "next/image"
import team from "@/assets/pageImages/pexels-divinetechygirl-1181438.jpg"

const Herosection = () => {
  return (
    <div className={styles.hero}>
      
      {/* Background Image */}
      <div className={styles.bgImage}>
        <Image
          src={team}
          alt="Team background"
          fill
          priority
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Overlay Content */}
      <div className={styles.overlay}>
        <h1>Finding you the best insurance since</h1>
        <h2 className={styles.number}>2008</h2>

        <div className={styles.buttons}>
          <button>About Company</button>
          <button className={styles.active}>Our Team</button>
          <button>Careers</button>
          <button>Awards</button>
        </div>

        <p>
          We are proud to say that <strong>our team of over 14,000+ talented individuals</strong> consists
          of the most brilliant and innovative technology, business, and marketing minds in India.
        </p>
      </div>
    </div>
  )
}

export default Herosection;
