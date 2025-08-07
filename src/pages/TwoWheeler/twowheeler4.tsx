import styles from "@/styles/pages/TwoWheeler/twowheeler4.module.css";
import Image from "next/image";
import scooterImg from "@/assets/motorcycle.png"; // rename your uploaded image to scooter.png and place it in assets folder
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import UserDetails from "@/components/ui/UserDetails";
import { FaArrowLeft } from "react-icons/fa";
import {useRouter} from 'next/router';

const popularModels = [
  "Activa", "CB Shine", "CB Unicorn", "Aviator",
  "Dio", "Dream Yuga", "Activa E", "CB 300R",
  "CB 350", "NX", "QC1", "XL"
];

const otherModels = [
  "CB", "Shine", "Unicorn", "CB Twister", "Activa-I", "CB 350 RS"
];

export default function twowheeler4() {
    const router =useRouter();
  
  return (
        <div>
              <UserDetails />
              <Navbar />
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.left}>
          <button className={styles.backButton} onClick={() => router.push("./twowheeler3")}>
            <FaArrowLeft />
          </button>
          <h3 className={styles.title}>Select two wheeler model</h3>
          <input
            type="text"
            placeholder="Search Honda two wheeler model"
            className={styles.searchInput}
          />

          <p className={styles.sectionTitle}>Popular models</p>
          <div className={styles.grid}>
            {popularModels.map((model, idx) => (
              <div key={idx} className={styles.modelCard} onClick={()=>{router.push('./twowheeler5')}}>
                {model}
              </div>
            ))}
          </div>

          <p className={styles.sectionTitle}>Other models</p>
          <div className={styles.grid}>
            {otherModels.map((model, idx) => (
              <div key={idx} className={styles.modelCard} onClick={()=>{router.push('./twowheeler5')}} >
                {model}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.imageWrapper}>
            <Image src={scooterImg} alt="Scooter" className={styles.image} />
          </div>
        </div>
      </div>
          </div>         
           <Footer />
    </div>
  );
}
