"use client"
import AccountCard from '@/components/contact/Accountcard';
import Contactmain from '@/components/contact/Contactmain';
import Contactuscard from '@/components/contact/Contactuscard';
import HelpSection from '@/components/contact/Helpsection';
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
    </div>
    <HelpSection/>
      
        
        
    </div>
  )
}

export default contact