"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/components/superadminsidebar/officepackagepolicy.module.css";

interface OfficeRecord {
  _id: string;
  companyName: string;
  email?: string | null;
  mobile: string;
  assignedTo?: string | null;
  createdAt: string;
  [key: string]: any;
}

interface Agent {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export default function Officepackagepolicylist() {
  const [records, setRecords] = useState<OfficeRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedRecord, setSelectedRecord] = useState<OfficeRecord | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState("");

  const fetchRecords = async () => {
    setLoading(true);
    const res = await axios.get("/api/officepackagepolicyinsurance");
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

  const handleAssign = async () => {
    if (!selectedAgent) return alert("Select an agent!");

    await axios.post("/api/officepackagepolicyinsurance?assign=true", {
      policyId: selectedRecord?._id,
      agentId: selectedAgent,
    });

    alert("Lead assigned successfully!");
    setSelectedRecord(null);
    setSelectedAgent("");
    fetchRecords();
  };

  if (loading) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Office Package Policy List</h2>

      {/* TABLE */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Assigned To</th>
              <th>Show</th>
            </tr>
          </thead>

          <tbody>
            {records.map((r, i) => (
              <tr
                key={r._id}
                className={styles.rowClickable}
                onClick={() => setSelectedRecord(r)}
              >
                <td>{i + 1}</td>
                <td>{r.email || "-"}</td>
                <td>{r.mobile}</td>
                <td>{r.assignedTo || "Not Assigned"}</td>
                <td>
                  <button
                    className={styles.showBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRecord(r);
                    }}
                  >
                    Show Data
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {selectedRecord && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedRecord(null)}
        >
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3>Office Package Policy Details</h3>
            </div>

            <div className={styles.modalContent}>
              {Object.entries(selectedRecord).map(([key, value]) => (
                <div key={key} className={styles.field}>
                  <label className={styles.label}>{key}</label>
                  <div className={styles.valueBox}>
                    {typeof value === "object"
                      ? JSON.stringify(value)
                      : value?.toString()}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.modalFooter}>
              <div className={styles.assignBox}>
                <label className={styles.label}>Assign Agent</label>
                <select
                  className={styles.agentDropdown}
                  value={selectedAgent}
                  onChange={(e) => setSelectedAgent(e.target.value)}
                >
                  <option value="">Select Agent</option>
                  {agents.map((a) => (
                    <option key={a._id} value={a._id}>
                      {a.firstName} {a.lastName} ({a.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.footerBtns}>
                <button className={styles.assignBtn} onClick={handleAssign}>
                  Assign
                </button>
                <button
                  className={styles.closeBtn}
                  onClick={() => setSelectedRecord(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
