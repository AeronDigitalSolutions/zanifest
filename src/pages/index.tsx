import Head from "next/head";
import styles from "@/styles/pages/index.module.css";
import UserDetails from "@/components/ui/UserDetails";
import Navbar from "@/components/ui/Navbar";
import Main from "@/components/home/Main";
import CarInsuraceSection from "@/components/home/CarInsuraceSection";
import DemoSection from "@/components/home/DemoSection";
import BestServicesSection from "@/components/home/BestServicesSection";
import Partners from "@/components/home/Partners";
import AllInsuranceSection from "@/components/home/AllInsuranceSection";
import HowWorksSections from "@/components/home/HowWorksSections";
import FeedBackSection from "@/components/home/FeedBackSection";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/ui/Footer";
import CriticalIllnessInsurance from "./criticalillnessinsurance";

export default function Home() {
  return (
    <>
      <Head>
        <title>Insurance</title>
        <meta name="Insurance" content="Get best value insurances" />
      </Head>
      <div className={styles.cont}>
        <UserDetails />
        <Navbar />
        <Main />
        <CarInsuraceSection />
        <DemoSection />
        <BestServicesSection />
        <Partners />
        <AllInsuranceSection />
        <HowWorksSections />
        <FeedBackSection />
        <FAQSection />
        <Footer />
      </div>
    </>
  );
}
