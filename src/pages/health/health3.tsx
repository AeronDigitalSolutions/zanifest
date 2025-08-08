// import userIcon from "@/assets/selectcity/usericon.webp";
// import { FaSearch } from "react-icons/fa";
// import { useEffect, useState } from "react";
// import styles from "@/styles/pages/health/health3.module.css";
// import Navbar from "@/components/ui/Navbar";
// import Footer from "@/components/ui/Footer";
// import manicon from "@/assets/health/manicon.webp";
// import Image from "next/image";
// import UserDetails from "@/components/ui/UserDetails";
// import { useRouter } from "next/router";

// const Health3 = () => {
//   const [selectedCity, setSelectedCity] = useState<string | null>(null);

//   const cities = [
//     "Delhi",
//     "Bengaluru",
//     "Pune",
//     "Hyderabad",
//     "Mumbai",
//     "Thane",
//     "Gurgaon",
//     "Chennai",
//     "Ghaziabad",
//     "Ernakulam",
//   ];

//   const router = useRouter();

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, []);

//   return (
//     <div>
//       <UserDetails />
//       <Navbar />
//       <div className={styles.wrapper}>
//         <div className={styles.content}>
//           <Image src={manicon} alt="User Icon" className={styles.userIcon} />
//           <div className={styles.rightContent}>
//             <h2>Select your city</h2>
//             <div className={styles.searchBar}>
//               <input type="text" placeholder="Search your city" />
//               <FaSearch className={styles.searchIcon} />
//             </div>
//             <div className={styles.popularCities}>
//               {cities.map((city, idx) => (
//                 <button
//                   key={idx}
//                   className={`${styles.cityButton} ${
//                     selectedCity === city ? styles.selectedCity : ""
//                   }`}
//                   onClick={() => setSelectedCity(city)}
//                 >
//                   {city}
//                 </button>
//               ))}
//             </div>
//             <button
//               className={styles.continueBtn}
//               onClick={() => {
//                 router.push("./health4");
//               }}
//             >
//               Continue
//             </button>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Health3;


import userIcon from "@/assets/selectcity/usericon.webp";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";
import styles from "@/styles/pages/health/health3.module.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import manicon from "@/assets/health/manicon.webp";
import Image from "next/image";
import UserDetails from "@/components/ui/UserDetails";
import { useRouter } from "next/router";

const Health3 = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

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

  const router = useRouter();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <UserDetails />
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.content}>
           <button className={styles.backBtn} onClick={() => router.push('./health1')}>
          <IoIosArrowBack className={styles.arrowBack} />
        </button>
          <Image src={manicon} alt="User Icon" className={styles.userIcon} />
          <div className={styles.rightContent}>
            <h2>Select your city</h2>
            <div className={styles.searchBar}>
              <input type="text" placeholder="Search your city" />
              <FaSearch className={styles.searchIcon} />
            </div>
            <div className={styles.popularCities}>
              {cities.map((city, idx) => (
                <button
                  key={idx}
                  className={`${styles.cityButton} ${
                    selectedCity === city ? styles.selectedCity : ""
                  }`}
                  onClick={() => setSelectedCity(city)}
                >
                  {city}
                </button>
              ))}
            </div>
            <button
              className={styles.continueBtn}
              onClick={() => {
                router.push("./health4");
              }}
            >
              Continue
            </button>
          </div>
        </div>

        {/* Back Button */}
        {/* <button
          className={styles.backBtn}
          onClick={() => router.push("./health1")}
        >
          <IoIosArrowBack className={styles.arrowBack} />
        </button> */}
      </div>
      <Footer />
    </div>
  );
};

export default Health3;
