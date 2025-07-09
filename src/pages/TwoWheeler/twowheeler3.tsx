import styles from "@/styles/pages/twowheeler/twowheeler3.module.css";
import Image from "next/image";
import scooterImg from "@/assets/motorcycle.png"; // rename your uploaded image to scooter.png and place it in assets folder
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import UserDetails from "@/components/ui/UserDetails";
import { FaArrowLeft } from 'react-icons/fa';


const makes = [
  'Honda', 'Bajaj', 'TVS', 'Yamaha',
  'Hero Motorcorp', 'Royal Enfield', 'Suzuki', 'Mahindra',
  'KTM', 'LML', 'Ola', 'Harley Davidson'
];

export default function twowheeler3() {
  return (
    <div>
              <UserDetails />
              <Navbar />
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.left}>
          <button className={styles.backButton}><FaArrowLeft /></button>
          <h3>Select two wheeler make</h3>
          <input
            type="text"
            placeholder="Search two wheeler make"
            className={styles.searchInput}
          />
          <p className={styles.popularTitle}>Popular makes</p>
          <div className={styles.grid}>
            {makes.map((make, index) => (
              <div key={index} className={styles.makeCard}>
                {make}
              </div>
            ))}
          </div>
          <p className={styles.searchText}>Can’t find your bike’s make? Click here to search</p>
        </div>
        <div className={styles.right}>
          <div className={styles.scooterImageWrapper}>
            <Image src={scooterImg} alt="Scooter" className={styles.scooterImage} />
          </div>
        </div>
      </div>
    </div>          <Footer />
    </div>
  );
}
