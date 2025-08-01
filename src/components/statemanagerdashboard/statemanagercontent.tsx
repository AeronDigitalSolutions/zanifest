"use client";
import React from "react";
import {
  FiBarChart2,
  FiUsers,
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
import styles from "@/styles/pages/statemanager.module.css";
import { useRouter } from "next/router";

type Agent = {
  _id: string;
  name: string;
  location: {
    district: string;
    state: string;
  };
  managerId?: string;
};

type ChartData = {
  month: string;
  sales: number;
};

type Props = {
  formattedTotalSales: string;
  formattedMonthlySales: string;
  agents: Agent[];
  totalClients: number;
  totalDistrictManagers: number;
  showAgentList: boolean;
  setShowAgentList: (show: boolean) => void;
  districtManagers: Agent[];
  startDate: string;
  endDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  handleFilter: () => void;
  filteredData: ChartData[];
};

const StateManagerContent: React.FC<Props> = ({
  formattedTotalSales,
  formattedMonthlySales,
  agents,
  totalClients,
  totalDistrictManagers,
  showAgentList,
  setShowAgentList,
  districtManagers,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  handleFilter,
  filteredData,
}) => {
  const router = useRouter();

  return (
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

      {/* <div className={styles.agentListToggleWrapper}>
        <div
          className={styles.agentListToggle}
          onClick={() => setShowAgentList(!showAgentList)}
        >
          List of District Manager
        </div>
      </div> */}

      {/* {showAgentList && (
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
                    <td>
                      {manager.location?.district}, {manager.location?.state}
                    </td>
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
      )} */}

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

export default StateManagerContent;
