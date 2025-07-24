
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { useRouter } from "next/router";
import styles from "@/styles/pages/districtmanager.module.css";

import { FiUsers, FiBarChart2, FiHome, FiUser, FiMenu, FiX } from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useManager } from "@/lib/hooks/useManager";
import axios from "axios";

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

interface Agent {
  _id: string;
  name: string;
  email: string;
  assignedTo: string;
  district: string;
  city: string;
  state: string;
  totalSales?: number;
  monthlySales?: number;
  clients?: number;
}

const DistricManagerDashboard = () => {
  const router = useRouter();
  const [showAgentList, setShowAgentList] = useState(false);
  const [agentData, setAgentData] = useState<Agent[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState(monthlySalesData);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formattedTotalSales, setFormattedTotalSales] = useState("");
  const [formattedMonthlySales, setFormattedMonthlySales] = useState("");
  
  const { user } = useManager();

  const handleLogout = () => {
    try{
       axios.post("/api/manager/logout");
      localStorage.removeItem("managerToken");
// 3. Force full page reload
    window.location.reload();

    // 4. Redirect to home after a short delay (after reload completes)
    setTimeout(() => {
      window.location.href = "/";
    }, 100); // enough time to ensure reload completes first
    }
    catch(error){
      console.error("Logout failed:", error);

    }
  };

  const totalSales = agents.reduce((sum, agent) => sum + agent.totalSales, 0);
  const monthlySales = agents.reduce((sum, agent) => sum + agent.monthlySales, 0);
  const totalClients = agents.reduce((sum, agent) => sum + agent.clients, 0);

  useEffect(() => {
    setFormattedTotalSales(totalSales.toLocaleString("en-IN"));
    setFormattedMonthlySales(monthlySales.toLocaleString("en-IN"));
  }, [totalSales, monthlySales]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await fetch("/api/getagent");
        const data = await res.json();
        setAgentData(data.agents || []);
      } catch (err) {
        console.error("Error fetching agents:", err);
      }
    };

    fetchAgents();
  }, []);

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
      {/* Header */}
      <header className={styles.header}>
        <h1>Hi {user?.name ?? "District Manager"}</h1>
        <div className={styles.logoContainer}>
          <Image src={logo} alt="Logo" width={150} height={45} className={styles.logo} />
        </div>
        <button className={styles.menuToggle} onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
        <div className={styles.desktopOnlyLogout}>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Sidebar + Content */}
      <div className={styles.mainArea}>
        {/* Sidebar */}
        <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarMobile : ""}`}>
          <ul className={styles.menu}>
            <li className={styles.menuItem}>
              <div className={styles.iconLabel}>
                <span className={styles.icon}>
                  <FiHome />
                </span>
                <span className={styles.label}>Dashboard</span>
              </div>
            </li>
          </ul>

          <div className={styles.mobileOnlyLogout}>
            <button className={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className={styles.content}>
          <h2 className={styles.title}>District Manager Dashboard</h2>

          <div className={styles.cardGrid}>
            <div className={styles.card}>
              <FaRupeeSign className={styles.cardIcon} />
              <div>
                <p>Total Sales</p>
                <h3>₹{formattedTotalSales}</h3>
              </div>
            </div>
            <div className={styles.card}>
              <FiBarChart2 className={styles.cardIcon} />
              <div>
                <p>Monthly Sales</p>
                <h3>₹{formattedMonthlySales}</h3>
              </div>
            </div>
            <div className={styles.card}>
              <FiUsers className={styles.cardIcon} />
              <div>
                <p>Number of Agents</p>
                <h3>{agents.length}</h3>
              </div>
            </div>
            <div className={styles.card}>
              <FiUser className={styles.cardIcon} />
              <div>
                <p>Total Clients</p>
                <h3>{totalClients}</h3>
              </div>
            </div>
          </div>

          <div className={styles.agentListToggle} onClick={() => setShowAgentList(!showAgentList)}>
            <span>List of Agents</span>
          </div>

          {showAgentList && (
            <div className={styles.agentTable}>
              <h3 className={styles.tableTitle}>Agent List</h3>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>District</th>
                      <th>City</th>
                      <th>State</th>
                      <th>Assigned To</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agentData.map((agent: Agent) => (
                      <tr key={agent._id}>
                        <td>{agent.name}</td>
                        <td>{agent.email}</td>
                        <td>{agent.district}</td>
                        <td>{agent.city}</td>
                        <td>{agent.state}</td>
                        <td>{agent.assignedTo || "Unassigned"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className={styles.dateFilterSection}>
            <label>
              Start Date:{" "}
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </label>
            <label>
              End Date:{" "}
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </label>
            <button className={styles.filterButton} onClick={handleFilter}>
              Show
            </button>
          </div>

          <div className={styles.chartContainer}>
            <h3 className={styles.chartTitle}>Monthly Sales Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#007bff" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DistricManagerDashboard;
