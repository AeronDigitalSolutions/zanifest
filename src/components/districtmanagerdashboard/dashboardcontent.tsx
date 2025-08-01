"use client";
import React from "react";
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

type Agent = {
  _id: string;
  name: string;
  email: string;
  district: string;
  city: string;
  state: string;
  assignedTo?: string;
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
  return (
    <main className={styles.content}>
      <h2 className={styles.title}>District Manager Dashboard</h2>

      {/* Summary Cards */}
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

      {/* Agent List Toggle */}
      {/* <div className={styles.agentListToggleWrapper}>
        <div
          className={styles.agentListToggle}
          onClick={() => setShowAgentList(!showAgentList)}
        >
          List of Agents
        </div>
      </div> */}

      {/* Agent Table */}
      {/* {showAgentList && (
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
                {agentData.map((agent) => (
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
      )} */}

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
