"use client";
import React, { useState } from "react";
import styles from "@/styles/pages/agent.module.css";
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
}

const AgentContent: React.FC<AgentContentProps> = ({ agentName }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [chartData, setChartData] = useState(allData);

  const handleFilter = () => {
    if (!startDate || !endDate) {
      setChartData(allData); 
      return;
    }

    const filtered = allData.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        itemDate >= new Date(startDate) &&
        itemDate <= new Date(endDate)
      );
    });

    setChartData(filtered);
  };

  return (
    <main className={styles.content}>
      <h2 className={styles.dashboardTitle}>Hello, {agentName}</h2>

      <div className={styles.cardGrid}>
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

       <div className={styles.dateFilterSection}>
        <label className={styles.dateLabel}>
          Start Date:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label className={styles.dateLabel}>
          End Date:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
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
