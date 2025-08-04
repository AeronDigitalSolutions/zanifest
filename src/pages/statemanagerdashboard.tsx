"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "@/styles/pages/statemanager.module.css";
import { useManager } from "@/lib/hooks/useManager";

import StateManagerHeader from "@/components/statemanagerdashboard/statemanagerheader";
import StateManagerContent from "@/components/statemanagerdashboard/statemanagercontent";
import StateManagerSidebar from "@/components/statemanagerdashboard/statemanagersidebar";
import ResetPassword from "@/components/districtmanagerdashboard/resetpassword";
import ListOfDistrictManager from "@/components/statemanagerdashboard/listofdistrictmanager";

const agents = [
  {
    _id: "AG101",
    name: "Ravi Kumar",
    location: { district: "Delhi", state: "Delhi" },
    totalSales: 90000,
    monthlySales: 35000,
    clients: 12,
  },
  {
    _id: "AG102",
    name: "Neha Singh",
    location: { district: "Mumbai", state: "Maharashtra" },
    totalSales: 15000,
    monthlySales: 400,
    clients: 15,
  },
  {
    _id: "AG103",
    name: "Amit Patel",
    location: { district: "Ahmedabad", state: "Gujarat" },
    totalSales: 10000,
    monthlySales: 78890,
    clients: 10,
  },
  {
    _id: "AG104",
    name: "Sunita Rao",
    location: { district: "Bangalore", state: "Karnataka" },
    totalSales: 10000,
    monthlySales: 345560,
    clients: 5,
  },
];

const monthlySalesData = [
  { month: "Jan 2025", sales: 12000 },
  { month: "Feb 2025", sales: 22000 },
  { month: "Mar 2025", sales: 30000 },
  { month: "Apr 2025", sales: 35000 },
  { month: "May 2025", sales: 27000 },
  { month: "Jun 2025", sales: 40000 },
  { month: "Jul 2025", sales: 38000 },
  { month: "Aug 2025", sales: 42000 },
  { month: "Sep 2025", sales: 31000 },
  { month: "Oct 2025", sales: 45000 },
  { month: "Nov 2025", sales: 50000 },
  { month: "Dec 2025", sales: 47000 },
];

const StateManagerDashboard = () => {
  const router = useRouter();
  const { user } = useManager();

  const [districtManagers, setDistrictManagers] = useState([]);
  const [showAgentList, setShowAgentList] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState(monthlySalesData);
  const [formattedTotalSales, setFormattedTotalSales] = useState("");
  const [formattedMonthlySales, setFormattedMonthlySales] = useState("");
  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    const fetchDistrictManagers = async () => {
      try {
        const res = await axios.get("/api/manager/getdistrictmanagers");
        setDistrictManagers(res.data.data);
      } catch (error) {
        console.error("Error fetching district managers:", error);
      }
    };
    fetchDistrictManagers();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/manager/logout");
      localStorage.removeItem("managerToken");
      router.replace("/managerlogin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const totalSales = agents.reduce((sum, a) => sum + a.totalSales, 0);
  const monthlySales = agents.reduce((sum, a) => sum + a.monthlySales, 0);
  const totalClients = agents.reduce((sum, a) => sum + a.clients, 0);

  useEffect(() => {
    setFormattedTotalSales(totalSales.toLocaleString("en-IN"));
    setFormattedMonthlySales(monthlySales.toLocaleString("en-IN"));
  }, [totalSales, monthlySales]);

  const handleFilter = () => {
    if (!startDate || !endDate) return;
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const filtered = monthlySalesData.filter((entry) => {
      const [month, year] = entry.month.split(" ");
      const entryDate = new Date(`${month} 1, ${year}`).getTime();
      return entryDate >= start && entryDate <= end;
    });
    setFilteredData(filtered);
  };

  return (
    <div className={styles.wrapper}>
      <StateManagerHeader
        user={user ?? undefined}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleLogout={handleLogout}
      />
      <div className={styles.mainArea}>
        <StateManagerSidebar
          setActiveSection={setActiveSection}
          activeSection={activeSection}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleLogout={handleLogout}
        />
        <main className={styles.content}>
          {activeSection === "dashboard" && (
            <StateManagerContent
              formattedTotalSales={formattedTotalSales}
              formattedMonthlySales={formattedMonthlySales}
              agents={agents}
              totalClients={totalClients}
              totalDistrictManagers={districtManagers.length}
              showAgentList={showAgentList}
              setShowAgentList={setShowAgentList}
              districtManagers={districtManagers}
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              handleFilter={handleFilter}
              filteredData={filteredData}
            />
          )}
          {activeSection === "resetpassword" && <ResetPassword />}
          {activeSection === "listofdistrictmanager" && (
            <ListOfDistrictManager />
          )}
        </main>
      </div>
    </div>
  );
};

export default StateManagerDashboard;
