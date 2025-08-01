"use client";
import React from "react";
import styles from "@/styles/pages/nationalmanager.module.css";

type Manager = {
  _id: string;
  name: string;
  email: string;
  location: {
    state: string;
  };
};

type Props = {
  stateManagers?: Manager[]; 
};


const StateManagerList: React.FC<Props> = ({ stateManagers = [] }) => {
  return (
    <div className={styles.agentTable}>
      <h3 className={styles.tableTitle}>State Managers List</h3>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {stateManagers.length > 0 ? (
              stateManagers.map((manager) => (
                <tr key={manager._id}>
                  <td>{manager.name}</td>
                  <td>{manager.email}</td>
                  <td>{manager.location?.state || "—"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} style={{ textAlign: "center", padding: "10px" }}>
                  No state managers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StateManagerList;
