"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/pages/leadsection.module.css";

interface Lead {
  id: string;
  email?: string;
  phone?: string;
  module: string;
  assignedAt?: string;
  status?: string;
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

  // status + remark
  const [status, setStatus] = useState("Cold");
  const [remark, setRemark] = useState("");
  const [currentLeadId, setCurrentLeadId] = useState<string | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    const res = await fetch(`/api/agent/leads`);
    const json = await res.json();
    if (json.success) setLeads(json.data || []);
    setLoading(false);
  };

  const openLeadDetails = async (moduleName: string, id: string) => {
    setModalError(null);
    setModalLoading(true);
    setShowModal(true);
    setFullDoc(null);
    setCurrentLeadId(id);

    try {
      const params = new URLSearchParams({ module: moduleName, id });
      const res = await fetch(`/api/agent/leadDetails?${params.toString()}`);
      const json = await res.json();

      if (!res.ok || !json.success) {
        setModalError(json.message || "Failed to fetch lead details");
      } else {
        setFullDoc(json.data || null);
        setStatus(json.data?.status || "Cold");
        setRemark(json.data?.remark || "");
      }
    } catch (err: any) {
      setModalError(err.message || "Failed to fetch lead details");
    } finally {
      setModalLoading(false);
    }
  };

  const saveStatusRemark = async () => {
    if (!currentLeadId) return;

    const res = await fetch("/api/agent/updateLeadStatus", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        leadId: currentLeadId,
        status,
        remark,
      }),
    });

    const json = await res.json();
    if (json.success) {
      alert("Lead updated successfully");
      setShowModal(false);
      fetchLeads();
    } else {
      alert(json.message || "Failed to update lead");
    }
  };

  if (loading) return <div className={styles.loading}>Loading leads...</div>;
  if (leads.length === 0) return <div className={styles.empty}>No leads assigned yet.</div>;

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
              <th>Status</th>
              <th>Assigned At</th>
              <th>Show Data</th>
            </tr>
          </thead>

         <tbody>
  {leads.map((l) => (
    <tr
      key={l.id}
      className={styles.rowClickable}
      onClick={() => openLeadDetails(l.module, l.id)}
    >
      <td>{l.email || "-"}</td>
      <td>{l.phone || "-"}</td>
      <td>{l.module}</td>
      <td>{l.status || "Cold"}</td>
      <td>{l.assignedAt ? new Date(l.assignedAt).toLocaleString() : "-"}</td>
      <td>
        <button
          className={styles.showBtn}
          onClick={(e) => {
            e.stopPropagation(); // ✅ row click se double trigger nahi hoga
            openLeadDetails(l.module, l.id);
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
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Lead Details</h3>
              
            </div>

            {modalLoading && <div className={styles.modalLoading}>Loading details...</div>}
            {modalError && <div className={styles.modalError}>{modalError}</div>}

            {!modalLoading && !modalError && fullDoc && (
              <>
                <div className={styles.modalContent}>
                  {Object.entries(fullDoc).map(([key, value]) => (
                    <div key={key} className={styles.field}>
                      <label className={styles.label}>{key}</label>
                      <div className={styles.valueBox}>{renderValue(value)}</div>
                    </div>
                  ))}
                </div>

                <div className={styles.modalFooter}>
                  <div className={styles.statusBox}>
                    <label>Status</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                      <option value="Cold">Cold</option>
                      <option value="Hot">Hot</option>
                      <option value="Closed">Closed</option>
                      <option value="interested">Interested</option>
                      <option value="not interested">Not Interested</option>
                    </select>

                    <label>Remark</label>
                    <textarea
                      rows={3}
                      value={remark}
                      onChange={(e) => setRemark(e.target.value)}
                      placeholder="Enter remark"
                    />
                  </div>

                  <div className={styles.footerBtns}>
                    <button className={styles.saveBtn} onClick={saveStatusRemark}>
                      Save
                    </button>
                    <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
                      Close
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function renderValue(value: any): React.ReactNode {
  if (value === null || value === undefined) return "-";
  if (typeof value === "object") return <pre>{JSON.stringify(value, null, 2)}</pre>;
  return String(value);
}
