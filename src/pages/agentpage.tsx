"use client";
import React from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import styles from "@/styles/pages/agent.module.css";
import {
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
import { useRouter } from "next/router";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock chart data
const chartData = [
  { month: "Jan", price: 30 },
  { month: "Feb", price: 40 },
  { month: "Mar", price: 40 },
  { month: "Apr", price: 50 },
  { month: "May", price: 35 },
  { month: "Jun", price: 55 },
  { month: "Jul", price: 65 },
  { month: "Aug", price: 70 },
];

const Header = () => {
  const router = useRouter();

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

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Image src={logo} alt="Logo" width={130} height={40} className={styles.logo} />
        </div>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </header>

      {/* Sidebar + Content */}
      <div className={styles.mainArea}>
        {/* Sidebar */}
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

        {/* Main Content */}
        <main className={styles.content}>
          <h2 className={styles.dashboardTitle}>Agent Dashboard</h2>

          {/* Summary Cards */}
          <div className={styles.cardGrid3}>
            <div className={styles.infoCard}>
              <h3>Total Sales</h3>
              <p className={styles.amount}>₹1,25,000</p>
            </div>
            <div className={styles.infoCard}>
              <h3>Sales This Month</h3>
              <p className={styles.amount}>₹35,000</p>
            </div>
            <div className={styles.infoCard}>
              <h3>Number of Clients</h3>
              <p className={styles.amount}>42</p>
            </div>
          </div>

          {/* Line Chart */}
          <div className={styles.chartContainer}>
            <h3 className={styles.chartTitle}>Monthly Sales Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#2dd4bf"
                  strokeWidth={4}
                  dot={{ r: 5, fill: "#2dd4bf" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Header;
