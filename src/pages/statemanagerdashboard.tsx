"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { useRouter } from "next/router";
import styles from "@/styles/pages/statemanager.module.css";
import {
  FiUsers,
  FiDollarSign,
  FiBarChart2,
  FiHome,
  FiCalendar,
  FiFileText,
  FiFolder,
  FiClipboard,
  FiGrid,
  FiUser,
  FiPackage,
  FiLayers,
  FiChevronRight,
} from "react-icons/fi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

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


const sidebarMenu = [
  {
    section: "Menu",
    items: [{ icon: <FiHome />, label: "Dashboard" }],
  },
  {
    section: "Apps",
    items: [
      { icon: <FiCalendar />, label: "Calendar" },
      { icon: <FiFileText />, label: "Tickets" },
      { icon: <FiFolder />, label: "File Manager" },
      { icon: <FiClipboard />, label: "Kanban Board" },
      { icon: <FiGrid />, label: "Project", expandable: true },
    ],
  },
  {
    section: "Custom",
    items: [
      { icon: <FiUser />, label: "Auth Pages", expandable: true },
      { icon: <FiLayers />, label: "Extra Pages", expandable: true },
    ],
  },
  {
    section: "Elements",
    items: [
      { icon: <FiGrid />, label: "Components", expandable: true },
      { icon: <FiPackage />, label: "Extended UI", expandable: true },
      { icon: <FiFileText />, label: "Forms", expandable: true },
    ],
  },
];

const handleLogout = () => {
  console.log("Logged out");
};

const stateManagerDashboard = () => {
  const router = useRouter();
  const [showAgentList, setShowAgentList] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState(monthlySalesData);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const totalSales = agents.reduce((sum, agent) => sum + agent.totalSales, 0);
  const monthlySales = agents.reduce(
    (sum, agent) => sum + agent.monthlySales,
    0
  );
  const totalClients = agents.reduce((sum, agent) => sum + agent.clients, 0);
  const totalDistrictManagers = 4; // Update this number as needed

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
        <div className={styles.logoContainer}>
          <Image
            src={logo}
            alt="Logo"
            width={130}
            height={40}
            className={styles.logo}
          />
        </div>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className={styles.mainArea}>
        <aside className={styles.sidebar}>
          {sidebarMenu.map((section, index) => (
            <div key={index}>
              <p className={styles.sectionTitle}>{section.section}</p>
              <ul className={styles.menu}>
                {section.items.map((item, idx) => (
                  <li key={idx} className={styles.menuItem}>
                    <div className={styles.iconLabel}>
                      <span className={styles.icon}>{item.icon}</span>
                      <span className={styles.label}>{item.label}</span>
                    </div>
                    {item.expandable && <FiChevronRight size={14} />}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        <main className={styles.content}>
          <h2 className={styles.title}>State Manager Dashboard</h2>

          <div className={styles.cardGrid}>
            <div className={styles.card}>
              <FiDollarSign className={styles.cardIcon} />
              <div>
                <p>Total Sales</p>
                <h3>
                  ₹
                  {totalSales.toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                </h3>
              </div>
            </div>
            <div className={styles.card}>
              <FiBarChart2 className={styles.cardIcon} />
              <div>
                <p>Monthly Sales</p>
                <h3>₹{monthlySales.toLocaleString()}</h3>
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

          <div
            className={styles.agentListToggle}
            onClick={() => setShowAgentList(!showAgentList)}
          >
            <span>List of District Manager</span>
          </div>

          {showAgentList && (
            <div className={styles.agentTable}>
              <h3 className={styles.tableTitle}>Agent List</h3>
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
                  {agents.map((agent) => (
                    <tr key={agent.id}>
                      <td>{agent.id}</td>
                      <td>{agent.name}</td>
                      <td>{agent.location}</td>
                      <td>₹{agent.totalSales.toLocaleString()}</td>
                      <td>₹{agent.monthlySales.toLocaleString()}</td>
                      <td>{agent.clients}</td>
                      <td>
                        
                          <button
                          onClick={() =>router.push("/districtmanagerdashboard")}
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
          )}

          <div className={styles.dateFilterSection}>
            <label>
              Start Date:{" "}
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label>
              End Date:{" "}
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
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
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#007bff"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default stateManagerDashboard;
