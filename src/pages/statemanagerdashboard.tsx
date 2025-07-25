
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { useRouter } from "next/router";
import styles from "@/styles/pages/statemanager.module.css";
import axios from "axios";
import {
  FiUsers,
  FiBarChart2,
  FiHome,
  FiChevronRight,
  FiMenu,
  FiX,
  FiUser,
} from "react-icons/fi";
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

const agents = [
  { id: "AG101", name: "Ravi Kumar", location: "Delhi", totalSales: 90000, monthlySales: 35000, clients: 12 },
  { id: "AG102", name: "Neha Singh", location: "Mumbai", totalSales: 15000, monthlySales: 400, clients: 15 },
  { id: "AG103", name: "Amit Patel", location: "Ahmedabad", totalSales: 10000, monthlySales: 78890, clients: 10 },
  { id: "AG104", name: "Sunita Rao", location: "Bangalore", totalSales: 10000, monthlySales: 345560, clients: 5 },
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

const sidebarMenu = [
  {
    section: "Menu",
    items: [{ icon: <FiHome />, label: "Dashboard" }],
  },
  
];

type Manager = {
  _id: string;
  managerId: number;
  name: string;
  email: string;
  password: string;
  location: {
    district: string;
    state: string;
  };
  category: "national" | "state" | "district";
  assignedTo: string | null;
};

const StateManagerDashboard = () => {
  const router = useRouter();
  const [showAgentList, setShowAgentList] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState(monthlySalesData);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formattedTotalSales, setFormattedTotalSales] = useState("");
  const [formattedMonthlySales, setFormattedMonthlySales] = useState("");
  const [districtManagers, setDistrictManagers] = useState<Manager[]>([]);
  
  const { user } = useManager();

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

  
  const totalSales = agents.reduce((sum, agent) => sum + agent.totalSales, 0);
  const monthlySales = agents.reduce((sum, agent) => sum + agent.monthlySales, 0);
  const totalClients = agents.reduce((sum, agent) => sum + agent.clients, 0);
  const totalDistrictManagers = districtManagers.length;

  useEffect(() => {
    setFormattedTotalSales(totalSales.toLocaleString("en-IN"));
    setFormattedMonthlySales(monthlySales.toLocaleString("en-IN"));
  }, [totalSales, monthlySales]);

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
      <header className={styles.header}>
        <h1>Hi {user?.name ?? "State Manager"}</h1>
        <div className={styles.logoContainer}>
          <Image src={logo} alt="Logo" width={160} height={45} className={styles.logo} />
        </div>
        <button className={styles.menuToggle} onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
        <div className={styles.desktopOnlyLogout}>
          <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <div className={styles.mainArea}>
        <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarMobile : ""}`}>
          {sidebarMenu.map((section, index) => (
            <div key={index}>
              <p className={styles.sectionTitle}>{section.section}</p>
              <ul className={styles.menu}>
                {section.items.map((item, idx) => (
                  <li key={idx} className={styles.menuItem}>
                    <div className={styles.iconLabel}>
                      {item.label === "Dashboard" ? (
                        <>
                          <span className={styles.icon}><FiHome /></span>
                          <span className={styles.label}>{item.label}</span>
                        </>
                      ) : (
                        <span className={styles.label}>{item.label}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className={styles.mobileOnlyLogout}>
            <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
          </div>
        </aside>

        <main className={styles.content}>
          <h2 className={styles.title}>State Manager Dashboard</h2>

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
            <div className={styles.card}>
              <FiUser className={styles.cardIcon} />
              <div>
                <p>Total District Managers</p>
                <h3>{totalDistrictManagers}</h3>
              </div>
            </div>
          </div>

          <div className={styles.agentListToggle} onClick={() => setShowAgentList(!showAgentList)}>
            <span>List of District Manager</span>
          </div>

          {showAgentList && (
            <div className={styles.agentTable}>
              <h3 className={styles.tableTitle}>District Manager's List</h3>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Location</th>
                      <th>Total Sales</th>
                      <th>Monthly Sales</th>
                      <th>Clients</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {districtManagers.map((manager) => (
                      <tr key={manager._id}>
                        <td>{manager.managerId || manager._id.slice(-4)}</td>
                        <td>{manager.name}</td>
                        <td>{manager.location?.district}, {manager.location?.state}</td>
                        <td>₹0</td>
                        <td>₹0</td>
                        <td>0</td>
                        <td>
                          <button
                            onClick={() => router.push("/districtmanagerdashboard")}
                            className={styles.viewProfileButton}
                          >
                            View Profile
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className={styles.dateFilterSection}>
            <label>Start Date: <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} /></label>
            <label>End Date: <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} /></label>
            <button className={styles.filterButton} onClick={handleFilter}>Show</button>
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

export default StateManagerDashboard;
