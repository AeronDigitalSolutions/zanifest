"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/components/superadminsidebar/travelinsurancelist.module.css";

export default function TravelInsuranceList() {
  const [policies, setPolicies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState<any | null>(null);
  const [agents, setAgents] = useState<any[]>([]);
  const [selectedAgent, setSelectedAgent] = useState("");

  const fetchPolicies = async () => {
    setLoading(true);
    const res = await axios.get("/api/travelinsurance");
    if (res.data?.success) setPolicies(res.data.data || []);
    setLoading(false);
  };

  const fetchAgents = async () => {
    const res = await axios.get("/api/getallagents");
    setAgents(res.data || []);
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  useEffect(() => {
    if (selected) fetchAgents();
  }, [selected]);

  const assignLead = async () => {
    if (!selectedAgent) return alert("Select an agent");

    await axios.post("/api/travelinsurance?assign=true", {
      policyId: selected._id,
      agentId: selectedAgent,
    });

    alert("Lead assigned successfully");
    setSelected(null);
    setSelectedAgent("");
    fetchPolicies();
  };

  if (loading) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Travel Insurance List</h2>

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
            {policies.map((p, i) => (
              <tr key={p._id} onClick={() => setSelected(p)}>
                <td>{i + 1}</td>
                <td>{p.email || "-"}</td>
                <td>{p.phoneNumber || "-"}</td>
                <td>{p.assignedTo || "Not Assigned"}</td>
                <td>
                  <button
                    className={styles.showBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected(p);
                    }}
                  >
                    Show
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {selected && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelected(null)}
        >
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className={styles.modalHeader}>
              <h3>Travel Insurance Details</h3>
            </div>

            {/* CONTENT */}
            <div className={styles.modalContent}>
              {Object.entries(selected).map(([key, value]) => (
                <div key={key} className={styles.field}>
                  <label className={styles.label}>{key}</label>
                  <div className={styles.valueBox}>
                    {typeof value === "object"
                      ? JSON.stringify(value)
                      : value?.toString() || "-"}
                  </div>
                </div>
              ))}
            </div>

            {/* ASSIGN */}
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

            {/* FOOTER */}
            <div className={styles.modalFooter}>
              <button className={styles.assignBtn} onClick={assignLead}>
                Assign
              </button>
              <button
                className={styles.closeBtn}
                onClick={() => setSelected(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
