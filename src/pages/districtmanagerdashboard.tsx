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
import ListOfAgent from "@/components/districtmanagerdashboard/listofagents";

type Agent = {
  id: string;
  name: string;
  location: string;
  totalSales: number;
  monthlySales: number;
  clients: number;
};

type AgentData = {
  _id: string;
  name: string;
  email: string;
  district: string;
  city: string;
  state: string;
  assignedTo?: string;
};

type MonthlySales = {
  month: string;
  sales: number;
};

const agents = [
  {
    _id: "AG101",
    name: "Ravi Kumar",
    email: "ravi.kumar@example.com",
    assignedTo: "Manager1",
    district: "Central",
    city: "Delhi",
    state: "Delhi",
    totalSales: 90000,
    monthlySales: 35000,
    clients: 12,
  },
  {
    _id: "AG102",
    name: "Neha Singh",
    email: "neha.singh@example.com",
    assignedTo: "Manager1",
    district: "West",
    city: "Mumbai",
    state: "Maharashtra",
    totalSales: 15000,
    monthlySales: 400,
    clients: 15,
  },
  {
    _id: "AG103",
    name: "Amit Patel",
    email: "amit.patel@example.com",
    assignedTo: "Manager2",
    district: "East",
    city: "Ahmedabad",
    state: "Gujarat",
    totalSales: 10000,
    monthlySales: 78890,
    clients: 10,
  },
  {
    _id: "AG104",
    name: "Sunita Rao",
    email: "sunita.rao@example.com",
    assignedTo: "Manager2",
    district: "South",
    city: "Bangalore",
    state: "Karnataka",
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

const DistricManagerDashboard = () => {
  const router = useRouter();
  const { user } = useManager();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showAgentList, setShowAgentList] = useState(false);
  const [agentData, setAgentData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState(monthlySalesData);

  const totalSales = agents.reduce((sum, agent) => sum + agent.totalSales, 0);
  const monthlySales = agents.reduce(
    (sum, agent) => sum + agent.monthlySales,
    0
  );
  const totalClients = agents.reduce((sum, agent) => sum + agent.clients, 0);
  const [formattedTotalSales, setFormattedTotalSales] = useState("");
  const [formattedMonthlySales, setFormattedMonthlySales] = useState("");

  useEffect(() => {
    setFormattedTotalSales(totalSales.toLocaleString("en-IN"));
    setFormattedMonthlySales(monthlySales.toLocaleString("en-IN"));
  }, [totalSales, monthlySales]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await fetch("/api/getagent");
        console.log("number of agents for district manager:", res);
        const data = await res.json();
        setAgentData(data.agents || []);
      } catch (err) {
        console.error("Error fetching agents:", err);
      }
    };

    fetchAgents();
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
              agents={agents}
              totalClients={totalClients}
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
          {activeSection === "listofagent" && <ListOfAgent />}
        </main>
      </div>
    </div>
  );
};

export default DistricManagerDashboard;
