"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/components/superadminsidebar/directorlist.module.css";

export default function Directorlist() {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any | null>(null);

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

  if (loading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Director Insurance List</h2>

      {/* ================= TABLE ================= */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Mobile</th>
              <th>Company</th>
              <th>Industry</th>
              <th>Assigned</th>
              <th>Show</th>
            </tr>
          </thead>

          <tbody>
            {records.length > 0 ? (
              records.map((r, i) => (
                <tr
                  key={r._id}
                  onClick={() => setSelected(r)}
                >
                  <td>{i + 1}</td>
                  <td>{r.mobileNumber}</td>
                  <td>{r.companyName}</td>
                  <td>{r.industryCategory}</td>
                  <td>{r.assignedTo || "Not Assigned"}</td>
                  <td>
                    <button
                      className={styles.showBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected(r);
                      }}
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
      {selected && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Director Insurance Details</h3>

            <div className={styles.modalContent}>
              {Object.entries(selected).map(([k, v]) => (
                <p key={k}>
                  <strong>{k}</strong>
                  <span>
                    {typeof v === "object"
                      ? JSON.stringify(v)
                      : v?.toString()}
                  </span>
                </p>
              ))}
            </div>

            <div className={styles.modalFooter}>
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
