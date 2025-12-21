"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/components/superadminsidebar/directorlist.module.css";

export default function Directorlist() {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/directorins", { cache: "no-store" });
        const json = await res.json();
        setRecords(json.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const openModal = (record: any) => {
    setSelected(record);
    setOpen(true);
  };

  const closeModal = () => {
    setSelected(null);
    setOpen(false);
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>Director Insurance Records</h2>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Mobile</th>
              <th>Company</th>
              <th>Industry</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {records.length > 0 ? (
              records.map((r, i) => (
                <tr key={r._id}>
                  <td>{i + 1}</td>
                  <td>{r.mobileNumber}</td>
                  <td>{r.companyName}</td>
                  <td>{r.industryCategory}</td>
                  <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className={styles.showBtn}
                      onClick={() => openModal(r)}
                    >
                      Show
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className={styles.noData}>
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL ================= */}
      {open && selected && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Director Insurance Details</h3>

            <div className={styles.modalContent}>
              <p><b>Mobile:</b> {selected.mobileNumber}</p>
              <p><b>Email:</b> {selected.email || "Unregistered User"}</p>
              <p><b>Company:</b> {selected.companyName}</p>
              <p><b>Industry:</b> {selected.industryCategory}</p>
              <p><b>Territory:</b> {selected.territory}</p>
              <p><b>Jurisdiction:</b> {selected.jurisdiction}</p>
              <p><b>Turnover:</b> {selected.companyTurnover}</p>
              <p><b>Liability:</b> {selected.limitOfLiability}</p>
              <p><b>Created:</b> {new Date(selected.createdAt).toLocaleString()}</p>
            </div>

            <button className={styles.closeBtn} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
