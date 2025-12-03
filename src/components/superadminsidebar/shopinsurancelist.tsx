"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/components/superadminsidebar/shopinsurancelist.module.css";
import axios from "axios";

// ⭐ Define Shop Type
interface ShopRecord {
  _id: string;
  email: string | null;
  phone: string;
  assignedTo?: string | null;
  createdAt: string;
  [key: string]: any;
}

// ⭐ Define Agent Type
interface AgentRecord {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

const ShopInsuranceList = () => {
  const [shopData, setShopData] = useState<ShopRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedShop, setSelectedShop] = useState<ShopRecord | null>(null);
  const [agents, setAgents] = useState<AgentRecord[]>([]);
  const [selectedAgent, setSelectedAgent] = useState("");

  const fetchShopData = async () => {
    setLoading(true);
    const res = await axios.get("/api/shopinsurance");
    setShopData(res.data.data || []);
    setLoading(false);
  };

  const fetchAgents = async () => {
    const res = await axios.get("/api/getallagents");
    setAgents(res.data || []);
  };

  useEffect(() => {
    fetchShopData();
  }, []);

  useEffect(() => {
    if (selectedShop) fetchAgents();
  }, [selectedShop]);

  const handleAssign = async () => {
    if (!selectedAgent) return alert("Please select an agent");

    await axios.post("/api/shopinsurance?assign=true", {
      shopId: selectedShop?._id,
      agentId: selectedAgent,
    });

    alert("Lead Assigned!");

    // Close modal and refresh data
    setSelectedShop(null);
    setSelectedAgent("");
    fetchShopData();
  };


  return (
    <div className={styles.wrapper}>
      
      {/* ===== Header ===== */}
      <div className={styles.header}>
        <h2 className={styles.title}>Shop Insurance List</h2>
      </div>

      {/* ===== Table ===== */}
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
            {shopData.map((shop, index) => (
              <tr key={shop._id}>
                <td>{index + 1}</td>
                <td>{shop.email || "-"}</td>
                <td>{shop.phone || "-"}</td>
                <td>{shop.assignedTo || "Not Assigned"}</td>
                <td>{new Date(shop.createdAt).toLocaleString()}</td>

                <td>
                  <button
                    className={styles.showBtn}
                    onClick={() => setSelectedShop(shop)}
                  >
                    Show Data
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== MODAL ===== */}
      {selectedShop && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>

            <h3>Shop Insurance Details</h3>

            {Object.entries(selectedShop).map(([k, v]) => (
              <p key={k}>
                <strong>{k}:</strong> {v?.toString()}
              </p>
            ))}

            {/* ▼ Assign Agent Dropdown ▼ */}
            <label><strong>Assign To Agent</strong></label>
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

            <button className={styles.assignBtn} onClick={handleAssign}>
              Assign Lead
            </button>

            <button className={styles.closeBtn} onClick={() => setSelectedShop(null)}>
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default ShopInsuranceList;
