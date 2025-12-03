"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/components/superadminsidebar/marineinsurancelist.module.css";

interface MarineRecord {
  _id: string;
  phoneNumber: string;
  commodity?: string;
  coverType?: string;
  shipmentType?: string;
  companyName?: string;
  transportMode?: string;
  coverAmount?: string;
  email?: string | null;
  assignedAgent?: string | null;
  assignedAgentName?: string | null;
  createdAt: string;
}

interface Agent {
  _id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  name?: string;
  agentCode?: string;
}

const MarineInsuranceList: React.FC = () => {
  const [data, setData] = useState<MarineRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selected, setSelected] = useState<MarineRecord | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [assignedAgent, setAssignedAgent] = useState<string>("");

  // ---------------- FETCH MARINE DATA ----------------
  const fetchData = async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      else setRefreshing(true);

      const res = await fetch("/api/p", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch marine data");

      const json = await res.json();
      setData(json.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ---------------- FETCH AGENTS LIST ----------------
  const fetchAgents = async () => {
    try {
      const res = await fetch("/api/getallagents", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch agent list");

      const json = await res.json();
      setAgents(json || []);
    } catch (err) {
      console.error("Agent Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchAgents();
  }, []);

  const handleRefresh = () => fetchData(true);

  // ---- Format Name ----
  const getAgentDisplayName = (agent: Agent) => {
    if (agent.firstName || agent.lastName) {
      return `${agent.firstName ?? ""} ${agent.lastName ?? ""}`.trim();
    }
    return agent.name ?? "Unnamed Agent";
  };

  // ---------------- ASSIGN AGENT TO RECORD ----------------
  const assignAgentHandler = async () => {
  if (!assignedAgent || !selected) {
    alert("Please select an agent.");
    return;
  }

  const selectedAgentData = agents.find((a) => a._id === assignedAgent);
  const agentName = getAgentDisplayName(selectedAgentData!);

  const res = await fetch("/api/p", {
    method: "PUT",                          
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      marineId: selected._id,
      agentId: assignedAgent,
      agentName: agentName
    }),
  });

  const data = await res.json();

  if (data.success) {
    alert("Agent assigned successfully!");
    fetchData(); 
    setSelected(null);
    setAssignedAgent("");
  } else {
    alert("Failed to assign agent");
  }
};


  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.miContainer}>
      {/* HEADER */}
      <div className={styles.miHeader}>
        <h2 className={styles.miTitle}>Marine Insurance List</h2>
        <button className={styles.miRefreshBtn} onClick={handleRefresh}>
          {refreshing ? "Refreshing..." : "↻ Refresh"}
        </button>
      </div>

      {/* TABLE */}
      <div className={styles.miTableWrapper}>
        <table className={styles.miTable}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Email / User</th>
              <th>Phone</th>
              <th>Assigned To</th>
              <th>Created At</th>
              <th>Show Data</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, idx) => (
              <tr key={item._id}>
                <td>{idx + 1}</td>
                <td>{item.email || "Unregistered User"}</td>
                <td>{item.phoneNumber}</td>

                {/* NEW COLUMN */}
                <td>{item.assignedAgentName || "Not Assigned"}</td>

                <td>{new Date(item.createdAt).toLocaleString()}</td>
                <td>
                  <button
                    className={styles.showBtn}
                    onClick={() => setSelected(item)}
                  >
                    Show Data
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ----------- MODAL ----------- */}
      {selected && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <h3 className={styles.modalTitle}>Marine Insurance Details</h3>

            <div className={styles.modalContent}>
              <p><strong>Email:</strong> {selected.email || "Unregistered User"}</p>
              <p><strong>Phone:</strong> {selected.phoneNumber}</p>
              <p><strong>Commodity:</strong> {selected.commodity || "-"}</p>
              <p><strong>Cover Type:</strong> {selected.coverType || "-"}</p>
              <p><strong>Shipment Type:</strong> {selected.shipmentType || "-"}</p>
              <p><strong>Company Name:</strong> {selected.companyName || "-"}</p>
              <p><strong>Transport Mode:</strong> {selected.transportMode || "-"}</p>
              <p><strong>Cover Amount:</strong> {selected.coverAmount || "-"}</p>
              <p><strong>Created At:</strong> {new Date(selected.createdAt).toLocaleString()}</p>

              <p><strong>Assigned To:</strong> {selected.assignedAgentName || "Not Assigned"}</p>
            </div>

            {/* Agent Select */}
            <div className={styles.agentSelectBox}>
              <label>Select Agent</label>

              <select
                className={styles.agentDropdown}
                value={assignedAgent}
                onChange={(e) => setAssignedAgent(e.target.value)}
              >
                <option value="">-- Select Agent --</option>

                {agents.map((agent) => (
                  <option key={agent._id} value={agent._id}>
                    {getAgentDisplayName(agent)} ({agent.email})
                  </option>
                ))}
              </select>
            </div>

            {/* Modal Buttons */}
            <div className={styles.modalFooter}>
              <button className={styles.assignBtn} onClick={assignAgentHandler}>
                Assign To Agent
              </button>

              <button className={styles.closeBtn} onClick={() => setSelected(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarineInsuranceList;
