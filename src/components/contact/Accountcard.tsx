import React from 'react';
import Image from 'next/image';
// import illustration from '@/assets/family.svg';
import styles from '@/styles/contact/accountcard.module.css';

export default function AccountCard() {
  return (
    <div className={styles.card}>
     

      <div className={styles.content}>
        <h3 className={styles.heading}>My account</h3>
        <p className={styles.subheading}>Fastest One-stop Servicing Gateway</p>

        <div className={styles.grid}>
          <p>⭐ Download policy</p>
          <p>⭐ Raise a query</p>
          <p>⭐ Share feedback</p>
          <p>⭐ Track policy status</p>
          <p>⭐ Request a callback</p>
          <p>⭐ View policy details & more</p>
        </div>

        <button className={styles.button}>Login to my account</button>
      </div>
    </div>
  );
}
