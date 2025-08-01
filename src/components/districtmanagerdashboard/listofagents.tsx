"use client";
import React from "react";
import styles from "@/styles/pages/districtmanager.module.css";

type Agent = {
  _id: string;
  name: string;
  email: string;
  district: string;
  city: string;
  state: string;
  assignedTo?: string;
};

type Props = {
  agentData?: Agent[]; // Make it optional to avoid error if undefined
};

const AgentTable: React.FC<Props> = ({ agentData = [] }) => {
  return (
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
            {agentData.length > 0 ? (
              agentData.map((agent) => (
                <tr key={agent._id}>
                  <td>{agent.name}</td>
                  <td>{agent.email}</td>
                  <td>{agent.district}</td>
                  <td>{agent.city}</td>
                  <td>{agent.state}</td>
                  <td>{agent.assignedTo || "Unassigned"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  No agents found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentTable;
