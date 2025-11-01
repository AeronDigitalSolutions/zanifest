"use client";
import React, { useState, useEffect } from "react";
import styles from "@/styles/pages/districtmanager.module.css";
import { useRouter } from "next/router";
import { useManager } from "@/lib/hooks/useManager";
import axios from "axios";
import DistrictManagerHeader from "@/components/districtmanagerdashboard/DistrictManagerHeader";
import DistrictManagerSidebar from "@/components/districtmanagerdashboard/districtmanagersidebar";
import DashboardContent from "@/components/districtmanagerdashboard/dashboardcontent";
import ResetPassword from "@/components/districtmanagerdashboard/resetpassword";

// ---------------------------
// Type Definitions
// ---------------------------
type Agent = {
  _id: string;
  name: string;
  email: string;
  assignedTo?: string;
  lifetimeSales: number;
  currentDMSales: number;
  district?: string;
  city?: string;
  state?: string;
};


type MonthlySales = {
  month: string;
  sales: number;
};

// ---------------------------
// Sample Monthly Sales Data
// ---------------------------
const monthlySalesData: MonthlySales[] = [
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

// ---------------------------
// Dashboard Component
// ---------------------------
const DistrictManagerDashboard = () => {
  const router = useRouter();
  const { user } = useManager();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [agentData, setAgentData] = useState<Agent[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState(monthlySalesData);
  const [showAgentList, setShowAgentList] = useState(false);


  // ---------------------------
  // Fetch Agents Under This DM
  // ---------------------------
  const fetchAgents = async () => {
    try {
      const token = localStorage.getItem("managerToken");
      if (!token) return;

      const res = await axios.get("/api/manager/get-agents", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setAgentData(res.data.agents || []);
      }
    } catch (err) {
      console.error("Error fetching agents:", err);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  // ---------------------------
  // Total and Monthly Sales Computation
  // ---------------------------
  // const totalSales = agentData.reduce((sum, agent) => sum + (agent.lifetimeSales || 0), 0);
  const [formattedTotalSales, setFormattedTotalSales] = useState("0");
  const [formattedMonthlySales, setFormattedMonthlySales] = useState("0");
  const [totalClients, setTotalClients] = useState(0);

  // ---------------------------
  // Logout Handler
  // ---------------------------
  const handleLogout = async () => {
    try {
      await axios.post("/api/manager/logout");
      localStorage.removeItem("managerToken");
      router.replace("/managerlogin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // ---------------------------
  // Date Filter for Monthly Sales
  // ---------------------------
  const handleFilter = () => {
    if (!startDate || !endDate) return;
    const start = new Date(startDate);
    const end = new Date(endDate);

    const filtered = monthlySalesData.filter((entry) => {
      const [monthName, year] = entry.month.split(" ");
      const monthIndex = new Date(`${monthName} 1, ${year}`).getTime();
      return monthIndex >= start.getTime() && monthIndex <= end.getTime();
    });

    setFilteredData(filtered);
  };

  const fetchManagerSales = async () => {
    try {
      const token = localStorage.getItem("managerToken");
      console.log("Manager Token:", token);
      if (!token) return;
  
      const res = await axios.get("/api/manager/salessummary", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Response Data:", res.data);
  
  
      if (res.data.success) {
      setFormattedTotalSales(res.data.totalSales.toLocaleString("en-IN"));
      setFormattedMonthlySales(res.data.monthlySales?.toLocaleString("en-IN") || "0");
      setTotalClients(res.data.totalClients || 0);
    }
      
    } catch (err) {
      console.error("Error fetching manager sales:", err);
      alert("Failed to fetch manager sales");
    }
  };
  
  useEffect(() => {
    fetchManagerSales();
  }, []);

  // ---------------------------
  // Render
  // ---------------------------
  return (
    <div className={styles.wrapper}>
      <DistrictManagerHeader
        user={user}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleLogout={handleLogout}
      />
      <div className={styles.mainArea}>
        <DistrictManagerSidebar
          setActiveSection={setActiveSection}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleLogout={handleLogout}
        />
        <main className={styles.content}>
          {activeSection === "dashboard" && (
            <DashboardContent
              formattedTotalSales={formattedTotalSales}
              formattedMonthlySales={formattedMonthlySales}
              totalClients={totalClients}
              agents={agentData}
              showAgentList={showAgentList}
              setShowAgentList={setShowAgentList}
              agentData={agentData}
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              handleFilter={handleFilter}
              filteredData={filteredData}
            />

          )}
          {activeSection === "resetpassword" && <ResetPassword />}
        </main>
      </div>
    </div>
  );
};

export default DistrictManagerDashboard;
