"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/components/superadminsidebar/homeinsurancelist.module.css";

interface HomeRecord {
  _id: string;
  fullName: string;
  email: string | null;
  phoneNumber: string;
  assignedTo?: string | null;
  createdAt: string;
  [key: string]: any;
}

interface Agent {
  _id: string;
  email: string;
}

const Homeinsurancelist: React.FC = () => {
  const [records, setRecords] = useState<HomeRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedRecord, setSelectedRecord] = useState<HomeRecord | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState("");

  const fetchRecords = async () => {
    const res = await axios.get("/api/homeinsurance");
    setRecords(res.data.data || []);
    setLoading(false);
  };

  const fetchAgents = async () => {
    const res = await axios.get("/api/getallagents");
    setAgents(res.data || []);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  useEffect(() => {
    if (selectedRecord) fetchAgents();
  }, [selectedRecord]);

  const assignLead = async () => {
    if (!selectedAgent) return alert("Please select an agent");

    await axios.post("/api/homeinsurance?assign=true", {
      recordId: selectedRecord?._id,
      agentId: selectedAgent,
    });

    alert("Lead Assigned!");

    setSelectedRecord(null);
    setSelectedAgent("");
    fetchRecords();
  };

  if (loading) return <p className={styles.loading}>Loading…</p>;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Home Insurance List</h2>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Assigned To</th>
              <th>Created At</th>
              <th>Show</th>
            </tr>
          </thead>

          <tbody>
            {records.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.email || "-"}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.assignedTo || "Not Assigned"}</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>

                <td>
                  <button className={styles.showBtn} onClick={() => setSelectedRecord(item)}>
                    Show Data
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedRecord && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Home Insurance Details</h3>

            {Object.entries(selectedRecord).map(([key, val]) => (
              <p key={key}>
                <strong>{key}:</strong> {val?.toString()}
              </p>
            ))}

            <label>Assign To Agent</label>
            <select
              className={styles.agentDropdown}
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
            >
              <option value="">Select Agent</option>
              {agents.map((agent) => (
                <option key={agent._id} value={agent._id}>
                  {agent.email}
                </option>
              ))}
            </select>

            <button className={styles.assignBtn} onClick={assignLead}>
              Assign Lead
            </button>

            <button className={styles.closeBtn} onClick={() => setSelectedRecord(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homeinsurancelist;
