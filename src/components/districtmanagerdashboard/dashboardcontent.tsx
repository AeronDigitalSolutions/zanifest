"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "@/styles/pages/districtmanager.module.css";
import { FaRupeeSign } from "react-icons/fa";
import { FiBarChart2, FiUsers, FiUser } from "react-icons/fi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

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

type DashboardContentProps = {
  formattedTotalSales: string;
  formattedMonthlySales: string;
  agents: Agent[];
  totalClients: number;
  showAgentList: boolean;
  setShowAgentList: (value: boolean) => void;
  agentData: Agent[];
  startDate: string;
  endDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  handleFilter: () => void;
  filteredData: MonthlySales[];
};

// ---------------------------
// Component
// ---------------------------
const DashboardContent: React.FC<DashboardContentProps> = ({
  formattedTotalSales,
  formattedMonthlySales,
  agents,
  totalClients,
  showAgentList,
  setShowAgentList,
  agentData,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  handleFilter,
  filteredData,
}) => {
  const [dmTotalSales, setDmTotalSales] = useState("0");
  const [loading, setLoading] = useState(false);

  // ---------------------------
  // Fetch DM’s total sales from backend
  // ---------------------------
  const fetchDistrictManagerSales = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("managerToken");
      if (!token) {
        console.warn("No manager token found!");
        return;
      }

      const res = await axios.get("/api/manager/salessummary", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("DM Sales Summary:", res.data);

      if (res.data.success && res.data.totalSales !== undefined) {
        setDmTotalSales(res.data.totalSales.toLocaleString("en-IN"));
      } else {
        setDmTotalSales("0");
      }
    } catch (err) {
      console.error("Error fetching DM sales:", err);
      setDmTotalSales("0");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDistrictManagerSales();
  }, []);

  return (
    <main className={styles.content}>
      <h2 className={styles.title}>District Manager Dashboard</h2>

      {/* Summary Cards */}
      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <FaRupeeSign className={styles.cardIcon} />
          <div>
            <p>Total Sales</p>
            <h3>
              {loading ? "Loading..." : `₹${dmTotalSales}`}
            </h3>
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

      {/* Date Filters */}
      <div className={styles.dateFilterSection}>
        <div className={styles.dateInputsWrapper}>
          <label className={styles.dateLabel}>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label className={styles.dateLabel}>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.buttonWrapper}>
          <button className={styles.filterButton} onClick={handleFilter}>
            Show
          </button>
        </div>
      </div>

      {/* Line Chart */}
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
  );
};

export default DashboardContent;
