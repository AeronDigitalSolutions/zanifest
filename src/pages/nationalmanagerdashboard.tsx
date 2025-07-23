"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { useRouter } from "next/router";  
import styles from "@/styles/pages/nationalmanager.module.css";
import axios from 'axios';
import withAuth from "@/lib/withAuth";
import { useManager } from '@/lib/hooks/useManager';

import {
  FiUsers,
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
  FiMenu,
  FiX,
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

type Manager = {
  _id: string;
  name: string;
  email: string;
  category: 'national' | 'state' | 'district';
  location: {
    district: string;
    state: string;
  };
  assignedTo?: string;
};

// ✅ Step 2: Define the component props type
type Props = {
  managers: Manager[];
};


const nationalManagerDashboard = ({managers = []}:Props) => {
    const router = useRouter();
  const [showAgentList, setShowAgentList] = useState(false);
   const [stateManagers, setStateManagers] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState(monthlySalesData);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

   const { user } = useManager();
   console.log("user from useUser", user);


//table logic to fetch all state managers
 useEffect(() => {
    const fetchStateManagers = async () => {
      try {
        const response = await axios.get('/api/manager/state');
        console.log("State Managers:", response.data.data);
        setStateManagers(response.data.data);
      } catch (error) {
        console.error('Error fetching state managers:', error);
      }
    };

    fetchStateManagers();
  }, []);


const handleLogout = () => {
  console.log("Logged out");
    router.push("/managerlogin");
};
  const totalSales = agents.reduce((sum, agent) => sum + agent.totalSales, 0);
  const monthlySales = agents.reduce(
    (sum, agent) => sum + agent.monthlySales,
    0
  );
  const totalClients = agents.reduce((sum, agent) => sum + agent.clients, 0);
  const totalDistrictManagers = 4;
  const totalStateManagers = 2; 

  const [formattedTotalSales, setFormattedTotalSales] = useState("");
  const [formattedMonthlySales, setFormattedMonthlySales] = useState("");

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
         <h1>Hi {user?.name ?? "National Manager"}</h1>
      {/* <p>Welcome to your {user?.role} dashboard</p> */}
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

      <div className={styles.mainArea}>
        <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarMobile : ""}`}>
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
          <div className={styles.mobileOnlyLogout}>
            <button className={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </aside>

        <main className={styles.content}>
          <h2 className={styles.title}>National Manager Dashboard</h2>

          <div className={styles.cardGrid}>
            <div className={styles.card}>
             <FaRupeeSign className={styles.cardIcon} style={{ fontWeight: 200, fontSize: "25px" }} />
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
          
          </div>
                    <div className={styles.cardGrid}>

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
            <div className={styles.card}>
              <FiUser className={styles.cardIcon} />
              <div>
                <p>Total State Managers</p>
                <h3>{totalStateManagers}</h3>
              </div>
            </div>
</div>

          <div className={styles.agentListToggle} onClick={() => setShowAgentList(!showAgentList)}>
            <span>List of State Manager</span>
          </div>

          {showAgentList && (
            <div className={styles.agentTable}>
              <h3 className={styles.tableTitle}>Agent List</h3>
              <div className={styles.tableWrapper}>
                <table className={styles.table} style={{ borderCollapse: 'collapse', width: '100%' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                      <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
                      <th style={{ border: '1px solid black', padding: '8px' }}>Email</th>
                      <th style={{ border: '1px solid black', padding: '8px' }}>State</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stateManagers && stateManagers.length > 0 ? (
                      stateManagers.map((manager: any) => (
                        <tr key={manager._id}>
                          <td style={{ border: '1px solid black', padding: '8px' }}>{manager.name}</td>
                          <td style={{ border: '1px solid black', padding: '8px' }}>{manager.email}</td>
                          <td style={{ border: '1px solid black', padding: '8px' }}>{manager.location?.state || ''}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} style={{ padding: '10px', textAlign: 'center' }}>No state managers found.</td>
                      </tr>
                    )}
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

export default nationalManagerDashboard;
