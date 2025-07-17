import styles from "@/styles/pages/TwoWheeler/twowheeler3.module.css";
import Image from "next/image";
import scooterImg from "@/assets/motorcycle.png"; // rename your uploaded image to scooter.png and place it in assets folder
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import UserDetails from "@/components/ui/UserDetails";
import { FaArrowLeft } from 'react-icons/fa';
import {useRouter} from 'next/router';

const makes = [
  { name: 'Honda', image: require('@/assets/home/partners/1.png') },
  { name: 'Bajaj', image: require('@/assets/home/partners/1.png') },
  { name: 'TVS', image: require('@/assets/home/partners/1.png') },
  { name: 'Yamaha', image: require('@/assets/home/partners/1.png') },
  { name: 'Hero Motorcorp', image: require('@/assets/home/partners/1.png') },
  { name: 'Royal Enfield', image: require('@/assets/home/partners/1.png') },
  { name: 'Suzuki', image: require('@/assets/home/partners/1.png') },
  { name: 'Mahindra', image: require('@/assets/home/partners/1.png') },
  { name: 'KTM', image: require('@/assets/home/partners/1.png') },
  { name: 'LML', image: require('@/assets/home/partners/1.png') },
  { name: 'Ola', image: require('@/assets/home/partners/1.png') },
  { name: 'Harley Davidson', image: require('@/assets/home/partners/1.png') },
];


export default function twowheeler3() {
    const router =useRouter();
    
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
    <div key={index} className={styles.makeCard} onClick={()=>{router.push('./twowheeler4')}}>
      <Image src={make.image} alt={make.name} className={styles.makeIcon} />
      <span>{make.name}</span>
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
