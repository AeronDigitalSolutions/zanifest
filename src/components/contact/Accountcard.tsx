// import React from 'react';
// import Image from 'next/image';
// // import illustration from '@/assets/family.svg';
// import styles from '@/styles/contact/accountcard.module.css';

// export default function AccountCard() {
//   return (
//     <div className={styles.card}>
     

//       <div className={styles.content}>
//         <h3 className={styles.heading}>My account</h3>
//         <p className={styles.subheading}>Fastest One-stop Servicing Gateway</p>

//         <div className={styles.grid}>
//           <p>⭐ Download policy</p>
//           <p>⭐ Raise a query</p>
//           <p>⭐ Share feedback</p>
//           <p>⭐ Track policy status</p>
//           <p>⭐ Request a callback</p>
//           <p>⭐ View policy details & more</p>
//         </div>

//         <button className={styles.button}>Login to my account</button>
//       </div>
//     </div>
//   );
// }
import styles from '@/styles/contact/accountcard.module.css';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import contactimg from "@/assets/pageImages/contacticons.png"


const features = [
  'Download policy',
  'Raise a query',
  'Share feedback',
  'Track policy status',
  'Request a callback',
  'View policy details & more',
];

export default function AccountCard() {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardContent}>
        <div className={styles.imageWrapper}>
          <Image
            src={contactimg} 
            alt="Family Illustration"
            width={240}
            height={240}
          />
        </div>

        <div className={styles.textSection}>
          <h2 className={styles.title}>My account</h2>
          <p className={styles.subtitle}>Fastest One-stop Servicing Gateway</p>

          <div className={styles.featureGrid}>
            {features.map((feature, i) => (
              <div key={i} className={styles.featureItem}>
                <FaStar className={styles.starIcon} />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <button className={styles.loginButton}>Login to my account</button>
        </div>
      </div>
    </div>
  );
}
