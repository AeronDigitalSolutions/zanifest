"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/components/superadminsidebar/healthinsurancelist.module.css";

interface Member {
  name: string;
  age: number;
  image?: string;
}

interface HealthInsuranceRecord {
  _id: string;
  gender: string;
  members: Member[];
  city: string;
  fullName: string;
  mobile: string;
  email?: string | null;
  medicalHistory: string[];
  createdAt: string;

  assignedTo?: string | null;
  assignedAgent?: string | null;
  assignedAt?: string | null;

  [key: string]: any; // for modal dynamic fields
}

interface Agent {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const Healthinsurancelist = () => {
  const [records, setRecords] = useState<HealthInsuranceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [selectedRecord, setSelectedRecord] = useState<HealthInsuranceRecord | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState("");

  const fetchRecords = async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      else setRefreshing(true);

      const res = await axios.get("/api/healthinsurance");
      if (res.data.success) setRecords(res.data.data);
    } catch (err) {
      console.error("Fetch Health Insurance Error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchAgents = async () => {
    const res = await axios.get("/api/getallagents");
    setAgents(res.data);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  useEffect(() => {
    if (selectedRecord) fetchAgents();
  }, [selectedRecord]);

  const handleAssign = async () => {
    if (!selectedAgent) return alert("Please select an agent!");

    try {
      await axios.post("/api/healthinsurance?assign=true", {
        policyId: selectedRecord?._id,
        agentId: selectedAgent,
      });

      alert("Lead Assigned Successfully!");
      setSelectedRecord(null);
      setSelectedAgent("");

      fetchRecords();
    } catch (err) {
      console.error("Assign Error:", err);
      alert("Assignment failed.");
    }
  };

  if (loading) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.wrapper}>

      {/* HEADER */}
      <div className={styles.header}>
        <h1 className={styles.title}>Health Insurance Records</h1>

        <button className={styles.refreshBtn} onClick={() => fetchRecords(true)}>
          {refreshing ? "Refreshing..." : "↻ Refresh"}
        </button>
      </div>

      {/* TABLE */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>City</th>
            <th>Mobile</th>
            <th>Assigned To</th>
            <th>Created At</th>
            <th>Show</th>
          </tr>
        </thead>

        <tbody>
          {records.map((r, i) => (
            <tr key={r._id}>
              <td>{i + 1}</td>
              <td>{r.fullName}</td>
              <td>{r.email || "Unregistered User"}</td>
              <td>{r.gender}</td>
              <td>{r.city}</td>
              <td>{r.mobile}</td>
              <td>{r.assignedTo || "Not Assigned"}</td>

              <td>
                {new Date(r.createdAt).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </td>

              <td>
                <button className={styles.showBtn} onClick={() => setSelectedRecord(r)}>
                  Show Data
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {selectedRecord && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>

            <h3>Health Insurance Details</h3>

            <div className={styles.modalContent}>
              {Object.entries(selectedRecord).map(([k, v]) => (
                <p key={k}>
                  <strong>{k}: </strong>
                  {Array.isArray(v)
                    ? JSON.stringify(v, null, 2)
                    : typeof v === "object"
                    ? JSON.stringify(v, null, 2)
                    : v?.toString()}
                </p>
              ))}
            </div>

            {/* ASSIGN SECTION */}
            <div className={styles.assignBox}>
              <label><strong>Assign To Agent:</strong></label>
              <select className={styles.agentDropdown} value={selectedAgent} onChange={(e) => setSelectedAgent(e.target.value)}>
                <option value="">Select Agent</option>
                {agents.map((a) => (
                  <option key={a._id} value={a._id}>
                    {a.firstName} {a.lastName} ({a.email})
                  </option>
                ))}
              </select>

              <button className={styles.assignBtn} onClick={handleAssign}>Assign Lead</button>
            </div>

            <button className={styles.closeBtn} onClick={() => setSelectedRecord(null)}>
              Close
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default Healthinsurancelist;
