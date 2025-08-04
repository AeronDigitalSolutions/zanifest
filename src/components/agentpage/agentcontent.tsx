"use client";
import React from "react";
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
interface AgentContentProps {
  agentName: string;
}
const AgentContent: React.FC<AgentContentProps> = ({ agentName }) => {

  return (
    <main className={styles.content}>
      <h2 className={styles.dashboardTitle}>Hello {agentName}</h2>

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
