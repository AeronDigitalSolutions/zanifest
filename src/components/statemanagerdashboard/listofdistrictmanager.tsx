"use client";
import React from "react";
import styles from "@/styles/pages/statemanager.module.css";
import { useRouter } from "next/router";

type Manager = {
  _id: string;
  managerId?: number;
  name: string;
  location: {
    district: string;
    state: string;
  };
};

type Props = {
  districtManagers?: Manager[]; 
};

const DistrictManagerTable: React.FC<Props> = ({ districtManagers = [] }) => {
  const router = useRouter();

  return (
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
                    onClick={() =>
                      router.push(`/districtmanagerdashboard?id=${manager._id}`)
                    }
                    className={styles.viewProfileButton}
                  >
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
            {districtManagers.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: "1rem" }}>
                  No district managers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DistrictManagerTable;
