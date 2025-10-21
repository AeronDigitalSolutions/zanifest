"use client";
import React, { useState, useEffect } from "react";
import styles from "@/styles/pages/agent.module.css";
import axios from "axios";
import { toast } from "react-hot-toast";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const allData = [
  { month: "Jan", price: 30, date: "2025-01-15" },
  { month: "Feb", price: 40, date: "2025-02-10" },
  { month: "Mar", price: 40, date: "2025-03-20" },
  { month: "Apr", price: 50, date: "2025-04-18" },
  { month: "May", price: 35, date: "2025-05-05" },
  { month: "Jun", price: 55, date: "2025-06-22" },
  { month: "Jul", price: 65, date: "2025-07-12" },
  { month: "Aug", price: 70, date: "2025-08-08" },
];

interface AgentContentProps {
  agentName: string;
  agentSales: number;
  agentId?: string;
  assignedTo?: string;
}

const AgentContent: React.FC<AgentContentProps> = ({
  agentName,
  agentSales,
  agentId,
  assignedTo: initialAssignedTo, // renamed prop for clarity
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [chartData, setChartData] = useState(allData);
  const [salesAmount, setSalesAmount] = useState<number>(0);
  const [totalSales, setTotalSales] = useState<number>(agentSales);
  const [salesBreakdown, setSalesBreakdown] = useState<{ lifetime: number; underCurrentDM: number } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // ✅ Added missing state
  const [assignedTo, setAssignedTo] = useState<string>(initialAssignedTo || "");

 const [dmHistory, setDmHistory] = useState<
  { dmId: string; dmName: string; sales: number }[]
>([]);

const fetchAgentSales = async () => {
  try {
    const token = localStorage.getItem("agentToken");
    const res = await axios.get("/api/agent/get-sales", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.data.success) {
      setSalesBreakdown(res.data.sales);
      setTotalSales(res.data.sales.lifetime);
      setAssignedTo(res.data.assignedTo || "");
      setDmHistory(res.data.sales.dmHistory || []); // ✅ here it comes
    }
  } catch (err) {
    console.error("Failed to fetch sales:", err);
    toast.error("Failed to fetch sales data");
  }
};


  useEffect(() => {
    fetchAgentSales();
  }, []);

  const handleFilter = () => {
    if (!startDate || !endDate) {
      setChartData(allData);
      return;
    }
    const filtered = allData.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
    });
    setChartData(filtered);
  };

  const handleAddSale = async () => {
    if (salesAmount <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("agentToken");
      await axios.post(
        "/api/agent/add-sales",
        { agentId, amount: salesAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(`Sale added! ₹${salesAmount}`);
      setSalesAmount(0);
      fetchAgentSales();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add sale");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.content}>
      <h2 className={styles.dashboardTitle}>Hello, {agentName}</h2>

      {/* Info Cards */}
      <div className={styles.cardGrid}>
        {dmHistory.length > 0 && (
        <div className={styles.infoCard}>
          <h3>DM History</h3>
          <div className={styles.dmHistoryContainer}>
            {dmHistory.map((dm, index) => (
              <div key={index} className={styles.dmHistoryItem}>
                <strong>{dm.dmName}</strong> ({dm.dmId})<br />
                <span className={styles.amount}>₹{dm.sales}</span>
              </div>
            ))}
          </div>
        </div>
      )}


        <div className={styles.infoCard}>
          <h3>Sales This Month</h3>
          <p className={styles.amount}>₹35,000</p>
        </div>
        <div className={styles.infoCard}>
          <h3>Number of Clients</h3>
          <p className={styles.amount}>42</p>
        </div>
      </div>

      {/* Add Sales Section */}
      <div className={styles.addSalesSection}>
        <h3>Add New Sale</h3>
        <div className={styles.addSalesForm}>
          <input
            type="number"
            placeholder="Enter sale amount"
            value={salesAmount}
            onChange={(e) => setSalesAmount(Number(e.target.value))}
            className={styles.input}
          />
          <button
            className={styles.addSalesBtn}
            onClick={handleAddSale}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Sale"}
          </button>
        </div>
      </div>

      {/* Date Filter Section */}
      <div className={styles.dateFilterSection}>
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
        <div className={styles.buttonWrapper}>
          <button className={styles.filterButton} onClick={handleFilter}>
            Show
          </button>
        </div>
      </div>

      {/* Chart Section */}
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
  );
};

export default AgentContent;
