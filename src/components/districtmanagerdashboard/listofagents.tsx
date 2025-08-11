"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/pages/districtmanager.module.css";

type Agent = {
  _id: string;
  firstName: string; // your API returns firstName, not "name"
  lastName: string;
  email: string;
  district: string;
  city: string;
  state: string;
  assignedTo?: string;
};

const AgentTable: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAgents() {
      try {
        const res = await fetch("/api/getagent", {
          method: "GET",
          credentials: "include", // so cookies like managerToken are sent
        });
        if (!res.ok) {
          throw new Error("Failed to fetch agents");
        }
        const data = await res.json();
        setAgents(data.agents || []);
      } catch (error) {
        console.error("Error fetching agents:", error);
        setAgents([]);
      } finally {
        setLoading(false);
      }
    }

    fetchAgents();
  }, []);

  return (
    <div className={styles.agentTable}>
      <h3 className={styles.tableTitle}>Agent List</h3>
      <div className={styles.tableWrapper}>
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading agents...</p>
        ) : (
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
              {agents.length > 0 ? (
                agents.map((agent) => (
                  <tr key={agent._id}>
                    <td>{`${agent.firstName} ${agent.lastName}`}</td>
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
        )}
      </div>
    </div>
  );
};

export default AgentTable;
