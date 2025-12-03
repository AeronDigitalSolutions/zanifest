"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/pages/leadsection.module.css";

interface Lead {
  id: string;
  email?: string;
  phone?: string;
  module: string;
  assignedAt?: string;
}

type FullDoc = { [key: string]: any };

export default function LeadSection() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  // modal state
  const [showModal, setShowModal] = useState(false);
  const [fullDoc, setFullDoc] = useState<FullDoc | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/agent/leads`)
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setLeads(json.data || []);
      })
      .catch((err) => console.error("Lead error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className={styles.loading}>Loading leads...</div>;
  if (leads.length === 0) return <div className={styles.empty}>No leads assigned yet.</div>;

  // fetch full doc for a lead (module + id)
  const openLeadDetails = async (moduleName: string, id: string) => {
    setModalError(null);
    setModalLoading(true);
    setShowModal(true);
    setFullDoc(null);

    try {
      const params = new URLSearchParams({ module: moduleName, id });
      const res = await fetch(`/api/agent/leadDetails?${params.toString()}`);
      const json = await res.json();

      if (!res.ok || !json.success) {
        setModalError(json.message || "Failed to fetch lead details");
      } else {
        setFullDoc(json.data || null);
      }
    } catch (err: any) {
      setModalError(err.message || "Failed to fetch lead details");
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>All Leads</h2>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Phone</th>
              <th>Module</th>
              <th>Assigned At</th>
              <th>Show Data</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((l) => (
              <tr key={l.id}>
                <td>{l.email || "-"}</td>
                <td>{l.phone || "-"}</td>
                <td>{l.module}</td>
                <td>{l.assignedAt ? new Date(l.assignedAt).toLocaleString() : "-"}</td>
                <td>
                  <button
                    className={styles.showBtn}
                    onClick={() => openLeadDetails(l.module, l.id)}
                  >
                    Show Data
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div
            className={styles.modal}
            onClick={(e) => {
              // prevent closing when clicking inside modal
              e.stopPropagation();
            }}
            role="dialog"
            aria-modal="true"
          >
            <div className={styles.modalHeader}>
              <h3>Lead Details</h3>
              <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>

            {modalLoading && <div className={styles.modalLoading}>Loading details...</div>}

            {modalError && <div className={styles.modalError}>❌ {modalError}</div>}

            {!modalLoading && !modalError && fullDoc && (
              <div className={styles.modalContent}>
                {/* Render nested objects nicely */}
                {Object.entries(fullDoc).map(([key, value]) => (
                  <div key={key} className={styles.recordRow}>
                    <div className={styles.recordKey}>{key}</div>
                    <div className={styles.recordValue}>
                      {renderValue(value)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Helper to render value with nesting & arrays
function renderValue(value: any): React.ReactNode {
  if (value === null || value === undefined) return <span style={{ color: "#666" }}>-</span>;

  if (Array.isArray(value)) {
    if (value.length === 0) return <span style={{ color: "#666" }}>[]</span>;
    return (
      <ul style={{ paddingLeft: 18, margin: 0 }}>
        {value.map((v, i) => (
          <li key={i} style={{ marginBottom: 6 }}>
            {typeof v === "object" ? <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(v, null, 2)}</pre> : String(v)}
          </li>
        ))}
      </ul>
    );
  }

  if (typeof value === "object") {
    return <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(value, null, 2)}</pre>;
  }

  return <span>{String(value)}</span>;
}
