"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import styles from "@/styles/pages/agentsale.module.css"; // ✅ import CSS module

interface Agent {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  sales: number;
  assignedTo?: {
    name: string;
  };
}

export default function AgentDashboard() {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  // ✅ Fetch agent details on load
  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const token = localStorage.getItem("agentToken");
        const res = await axios.get("/api/agent/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAgent(res.data.agent);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load agent info");
      }
    };
    fetchAgent();
  }, []);

  // ✅ Add new sale
  const handleAddSale = async () => {
    if (!agent || amount <= 0) {
      toast.error("Enter a valid sale amount");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("agentToken");
      const res = await axios.post(
        "/api/agent/add-sales",
        { agentId: agent._id, amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAgent((prev) =>
        prev ? { ...prev, sales: res.data.newSales } : prev
      );

      toast.success(`Sale added! Total: ₹${res.data.newSales}`);
      setAmount(0);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add sale");
    } finally {
      setLoading(false);
    }
  };

  if (!agent) {
    return <div className={styles.loading}>Loading agent details...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.heading}>Agent Dashboard</h1>

        <div className={styles.details}>
          <p>
            <strong>Name:</strong> {agent.firstName} {agent.lastName}
          </p>
          <p>
            <strong>Email:</strong> {agent.email}
          </p>
          <p>
            <strong>District Manager:</strong>{" "}
            {agent.assignedTo?.name || "Not Assigned"}
          </p>
          <p className={styles.sales}>
            <strong>Total Sales:</strong> ₹{agent.sales ?? 0}
          </p>
        </div>

        <div className={styles.salesInputSection}>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter sale amount"
            className={styles.input}
          />
          <button
            onClick={handleAddSale}
            disabled={loading}
            className={`${styles.button} ${loading ? styles.disabled : ""}`}
          >
            {loading ? "Adding Sale..." : "Add Sale"}
          </button>
        </div>
      </div>
    </div>
  );
}
