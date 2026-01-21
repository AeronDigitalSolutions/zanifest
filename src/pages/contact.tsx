"use client"
import AccountCard from '@/components/contact/Accountcard';
import Contactmain from '@/components/contact/Contactmain';
import Contactuscard from '@/components/contact/Contactuscard';
import HelpSection from '@/components/contact/Helpsection';
import FAQSection from '@/components/home/FAQSection';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import React from 'react';
// import HeroSection from '@/components/contact/Herosection'
// import Navbar from '@/components/contact/Navbar'

const contact = () => {
  return (
    <div>
        <Navbar/>
         <div className="min-h-screen bg-white font-sans">
      {/* <HelpSection /> */}
     
        <Contactmain/>
         <div style={{ maxWidth: "1100px", margin: "24px auto" }}>
        

        <p style={{ marginTop: "8px" }}>
          <strong>Address:</strong> Zanifest Insurance Broker Pvt. Ltd., SCF No.-8,
          Lower Ground, Old Ambala Road, Gazipur, Zirakpur, Mohali, Punjab – 140603
        </p>
      </div>
    </div>
    {/* <HelpSection/> */}
    <FAQSection/>
    <Footer/>
      
        
        
    </div>
  )
}

export default contact