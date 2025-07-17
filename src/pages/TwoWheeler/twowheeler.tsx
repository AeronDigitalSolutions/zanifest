import styles from "@/styles/pages/TwoWheeler/twowheeler.module.css";
import Image from "next/image";
import scooterImg from "@/assets/motorcycle.png"; // rename your uploaded image to scooter.png and place it in assets folder
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import UserDetails from "@/components/ui/UserDetails";
import {useRouter} from 'next/router';

const years = Array.from({ length: 22 }, (_, i) => 2024 - i); // 2024 to 2003

export default function twowheeler() {
    const router =useRouter();
    
  return (
    <div>
              <UserDetails />
              <Navbar />
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <div className={styles.imageWrapper}>
          <Image
            src={scooterImg}
            alt="Scooter"
            className={styles.image}
            priority
          />
        </div>
      </div>

      <div className={styles.rightSection}>
        <button className={styles.backButton}>❮</button>
        <h2 className={styles.question}>When did you buy your Bike/Scooter?</h2>
        <div className={styles.yearGrid}>
          {years.map((year) => (
            <button key={year} className={styles.yearButton} onClick={()=>{router.push('./twowheeler3')}}>
              {year}
            </button>
          ))}
        </div>
      </div>
    </div>
          <Footer />
    </div>
  );
}
