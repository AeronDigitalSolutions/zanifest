"use client";
import styles from "@/styles/pages/TwoWheeler/twowheeler3.module.css";
import Image from "next/image";
import scooterImg from "@/assets/motorcycle.png";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import UserDetails from "@/components/ui/UserDetails";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/router";

const makes = [
  { name: "Honda", image: require("@/assets/home/hondacar.png") },
  { name: "Bajaj", image: require("@/assets/home/bajaj logo.png") },
  { name: "TVS", image: require("@/assets/home/tvs logo.png") },
  { name: "Yamaha", image: require("@/assets/home/yamaha.png") },
  { name: "Hero Motorcorp", image: require("@/assets/home/hero (2).png") },
  { name: "Royal Enfield", image: require("@/assets/home/royal logo.png") },
  { name: "Suzuki", image: require("@/assets/home/SuzukiLogo (2).png") },
  { name: "Mahindra", image: require("@/assets/home/Mahindra.png") },
  { name: "KTM", image: require("@/assets/home/ktm.png") },
  { name: "LML", image: require("@/assets/home/lml.png") },
  { name: "Ola", image: require("@/assets/home/ola.png") },
  { name: "Harley Davidson", image: require("@/assets/home/harley.png") },
];

export default function Twowheeler3() {
  const router = useRouter();

  return (
    <div>
      <UserDetails />
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.left}>
            <button className={styles.backButton} onClick={() => router.push("./twowheeler")}>
              <FaArrowLeft />
            </button>
            <h3>Select two wheeler make</h3>
            <input
              type="text"
              placeholder="Search two wheeler make"
              className={styles.searchInput}
            />
            <p className={styles.popularTitle}>Popular makes</p>
            <div className={styles.grid}>
              {makes.map((make, index) => (
                <div
                  key={index}
                  className={styles.makeCard}
                  onClick={() => {
                    router.push("./twowheeler4");
                  }}
                >
                  <div className={styles.imageWrapper}>
                    <Image
                      src={make.image}
                      alt={make.name}
                      width={60}
                      height={60}
                      className={styles.makeIcon}
                    />
                  </div>
                  <span className={styles.makeText}>{make.name}</span>
                </div>
              ))}
            </div>
            <p className={styles.searchText}>
              Can’t find your bike’s make? Click here to search
            </p>
          </div>
          <div className={styles.right}>
            <div className={styles.scooterImageWrapper}>
              <Image
                src={scooterImg}
                alt="Scooter"
                className={styles.scooterImage}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
