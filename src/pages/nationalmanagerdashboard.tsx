
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "@/styles/pages/nationalmanager.module.css";
import { useRouter } from "next/router";
import { useManager } from "@/lib/hooks/useManager";
import NationalManagerHeader from "@/components/nationalmanagerdashboard/nationalmanagerheader";
import NationalManagerSidebar from "@/components/nationalmanagerdashboard/nationalmanagersidebar";
import DashboardContent from "@/components/nationalmanagerdashboard/dashboardcontent";
import ResetPassword from "@/components/districtmanagerdashboard/resetpassword";
import ListOfStateManager from "@/components/nationalmanagerdashboard/listofstatemanager";
import CreateManager from "@/components/superadminsidebar/createmanager";
// Dummy Data
const agents = [
  {
    id: "AG101",
    name: "Ravi Kumar",
    location: "Delhi",
    totalSales: 90000,
    monthlySales: 35000,
    clients: 12,
  },
  {
    id: "AG102",
    name: "Neha Singh",
    location: "Mumbai",
    totalSales: 15000,
    monthlySales: 400,
    clients: 15,
  },
  {
    id: "AG103",
    name: "Amit Patel",
    location: "Ahmedabad",
    totalSales: 10000,
    monthlySales: 78890,
    clients: 10,
  },
  {
    id: "AG104",
    name: "Sunita Rao",
    location: "Bangalore",
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

const NationalManagerDashboard = () => {
  const router = useRouter();
  const { user } = useManager();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [stateManagers, setStateManagers] = useState([]);
  const [showAgentList, setShowAgentList] = useState(false);
    const [loading, setLoading] = useState(false);
  const [manager, setManager] = useState<any>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState(monthlySalesData);

  const totalSales = agents.reduce((sum, a) => sum + a.totalSales, 0);
  const monthlySales = agents.reduce((sum, a) => sum + a.monthlySales, 0);
  const totalClients = agents.reduce((sum, a) => sum + a.clients, 0);
  const totalDistrictManagers = 4;
  const totalStateManagers = 2;

  const [formattedTotalSales, setFormattedTotalSales] = useState("");
  const [formattedMonthlySales, setFormattedMonthlySales] = useState("");

  useEffect(() => {
    setFormattedTotalSales(totalSales.toLocaleString("en-IN"));
    setFormattedMonthlySales(monthlySales.toLocaleString("en-IN"));
  }, [totalSales, monthlySales]);

  useEffect(() => {
    const fetchStateManagers = async () => {
      try {
        const response = await axios.get("/api/manager/state");
        setStateManagers(response.data.data);
      } catch (error) {
        console.error("Error fetching state managers:", error);
      }
    };
    fetchStateManagers();
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
      const monthDate = new Date(`${monthName} 1, ${year}`);
      return monthDate >= start && monthDate <= end;
    });

    setFilteredData(filtered);
  };

  // profile edit 
  useEffect(() => {
    if (activeSection === "profileEdit") {
      setLoading(true);
      axios
        .get("/api/manager/getmanagerdetails", {
          // Not needed if cookie is httpOnly; else use Authorization
          headers: {
            Authorization: `Bearer ${localStorage.getItem("managerToken")}`,
          },
        })
        .then((res) => setManager(res.data))
        .catch((err) => console.error("Error fetching manager:", err))
        .finally(() => setLoading(false));
    }
  }, [activeSection]);


  return (
    <div className={styles.wrapper}>
      <NationalManagerHeader
        user={user ?? undefined}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleLogout={handleLogout}
      />

      <div className={styles.mainArea}>
        <NationalManagerSidebar
          setActiveSection={setActiveSection}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleLogout={handleLogout} activeSection={""}        />

        <main className={styles.content}>
          {activeSection === "dashboard" && (
            <DashboardContent
              agents={agents}
              totalClients={totalClients}
              totalDistrictManagers={totalDistrictManagers}
              totalStateManagers={totalStateManagers}
              formattedTotalSales={formattedTotalSales}
              formattedMonthlySales={formattedMonthlySales}
              showAgentList={showAgentList}
              setShowAgentList={setShowAgentList}
              stateManagers={stateManagers}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              handleFilter={handleFilter}
              filteredData={filteredData}
            />
          )}

          {activeSection === "resetpassword" && <ResetPassword />}
          {activeSection === "listofstatemanager" && <ListOfStateManager />}
           {activeSection === "profileEdit" && (
            <CreateManager
           
               mode="edit"
                initialData={manager} 
            />
          )}

        </main>
      </div>
    </div>
  );
};

export default NationalManagerDashboard;
