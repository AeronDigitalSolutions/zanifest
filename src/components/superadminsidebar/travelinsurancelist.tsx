"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/components/superadminsidebar/travelinsurancelist.module.css";

const TravelInsuranceList = () => {
  const [travelPolicies, setTravelPolicies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [selectedPolicy, setSelectedPolicy] = useState<any | null>(null);

  const [agents, setAgents] = useState<any[]>([]);
  const [selectedAgent, setSelectedAgent] = useState("");

  // ------------------ FETCH ALL TRAVEL POLICIES ------------------
  const fetchTravelPolicies = async () => {
    try {
      if (!refreshing) setLoading(true);

      const res = await axios.get("/api/travelinsurance");
      if (res.data?.success) {
        setTravelPolicies(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching travel insurance list:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ------------------ FETCH ALL AGENTS FOR DROPDOWN ------------------
  const fetchAgents = async () => {
    try {
      const res = await axios.get("/api/getallagents");
      if (res.status === 200) {
        setAgents(res.data);
      }
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  useEffect(() => {
    fetchTravelPolicies();
  }, []);

  useEffect(() => {
    if (selectedPolicy) fetchAgents();
  }, [selectedPolicy]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchTravelPolicies();
  };

  // ------------------ ASSIGN LEAD TO AGENT ------------------
  const handleAssignLead = async () => {
    if (!selectedAgent) {
      alert("Please select an agent.");
      return;
    }

    try {
      const res =await axios.post("/api/travelinsurance?assign=true", {
  policyId: selectedPolicy._id,
  agentId: selectedAgent,
});


      if (res.data.success) {
        alert("Lead assigned successfully!");

        // Close modal & refresh UI
        setSelectedPolicy(null);
        setSelectedAgent("");
        fetchTravelPolicies();
      }
    } catch (error) {
      console.error("Assign error:", error);
      alert("Failed to assign lead.");
    }
  };

  if (loading) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.wrapper}>
      
      {/* ------------------ HEADER ------------------ */}
      <div className={styles.header}>
        <h2 className={styles.title}>Travel Insurance List</h2>

        <button className={styles.refreshBtn} onClick={handleRefresh}>
          {refreshing ? "Refreshing..." : "↻ Refresh"}
        </button>
      </div>

      {/* ------------------ TABLE ------------------ */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Assigned To</th>
              <th>Created At</th>
              <th>Show Data</th>
            </tr>
          </thead>

          <tbody>
            {travelPolicies.map((policy, index) => (
              <tr key={policy._id}>
                <td>{index + 1}</td>
                <td>{policy.email || "-"}</td>
                <td>{policy.phoneNumber || "-"}</td>
                <td>{policy.assignedTo || "Not Assigned"}</td>

                <td>
                  {new Date(policy.createdAt).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>

                <td>
                  <button
                    className={styles.showBtn}
                    onClick={() => setSelectedPolicy(policy)}
                  >
                    Show Data
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ------------------ MODAL ------------------ */}
      {selectedPolicy && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>

            <h3>Travel Insurance Details</h3>

            <div className={styles.modalContent}>
              {Object.entries(selectedPolicy).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}:</strong>{" "}
                  {Array.isArray(value)
                    ? value.join(", ")
                    : typeof value === "object"
                    ? JSON.stringify(value)
                    : value?.toString()}
                </p>
              ))}
            </div>

            {/* ------------------ ASSIGN AGENT BOX ------------------ */}
            <div className={styles.agentAssignBox}>
              <label><strong>Assign To Agent:</strong></label>

              <select
                className={styles.agentDropdown}
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
              >
                <option value="">Select Agent</option>
                {agents.map((agent) => (
                  <option key={agent._id} value={agent._id}>
                    {agent.firstName} {agent.lastName} ({agent.email})
                  </option>
                ))}
              </select>

              <button onClick={handleAssignLead} className={styles.assignBtn}>
                Assign Lead
              </button>
            </div>

            <button
              className={styles.closeBtn}
              onClick={() => setSelectedPolicy(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default TravelInsuranceList;
