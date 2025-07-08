import DashboardMain from "@/components/dashboard/DashboardMain";

import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import UserDetails from "@/components/ui/UserDetails";
import React from "react";

function dashboard() {
  return (
    <div>
      <UserDetails />
      <Navbar />

      <DashboardMain />

      <Footer />
    </div>
  );
}

export default dashboard;
