import userIcon from "@/assets/selectcity/usericon.webp";
import { FaSearch } from "react-icons/fa";
import { useEffect } from "react";
import styles from "@/styles/pages/health/health3.module.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import manicon from "@/assets/health/manicon.webp";
import Image from "next/image";
import UserDetails from "@/components/ui/UserDetails";
import {useRouter} from 'next/router';

const health3 = () => {
  const cities = [
    "Delhi",
    "Bengaluru",
    "Pune",
    "Hyderabad",
    "Mumbai",
    "Thane",
    "Gurgaon",
    "Chennai",
    "Ghaziabad",
    "Ernakulam",
  ];
 const router=useRouter();
useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, []);

  return (

    <div>
      <UserDetails />
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <Image src={manicon} alt="User Icon" className={styles.userIcon} />
          <div className={styles.rightContent}>
            <h2>Select your city</h2>
            <div className={styles.searchBar}>
              <input type="text" placeholder="Search your city" />
              <FaSearch className={styles.searchIcon} />
            </div>
            <div className={styles.popularCities}>
              {cities.map((city, idx) => (
                <button key={idx}>{city}</button>
              ))}
            </div>
            <button className={styles.continueBtn} onClick={()=>{router.push('./health4')}}>Continue</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default health3;
