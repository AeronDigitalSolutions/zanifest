"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/components/superadminsidebar/officepackagepolicy.module.css";

interface OfficeRecord {
  _id: string;
  companyName: string;
  email?: string | null;
  mobile: string;
  pincode?: string;
  firstTimeBuying?: string;
  lossHistory?: string;
  createdAt: string;
}

export default function Officepackagepolicylist() {
  const [records, setRecords] = useState<OfficeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecords = async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      else setRefreshing(true);

      const res = await fetch("/api/officepackagepolicyinsurance", {
        cache: "no-store",
      });

      const json = await res.json();
      if (!json.success) throw new Error("Failed to fetch records");

      setRecords(json.data || []);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleRefresh = () => fetchRecords(true);

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.wrapper}>
      {/* PAGE HEADING + REFRESH */}
      <div className={styles.header}>
        <h1 className={styles.title}>Office Package Policy List</h1>

        <button className={styles.refreshBtn} onClick={handleRefresh}>
          {refreshing ? "Refreshing..." : "↻ Refresh"}
        </button>
      </div>

      {/* TABLE */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>User Email</th>
              <th>Company Name</th>
              <th>Pincode</th>
              <th>Mobile</th>
              <th>First Time Buying</th>
              <th>Loss History</th>
              <th>Created At</th>
            </tr>
          </thead>

          <tbody>
            {records.map((r, i) => (
              <tr key={r._id}>
                <td>{i + 1}</td>
                <td>{r.email || "Unregistered User"}</td>
                <td>{r.companyName}</td>
                <td>{r.pincode || "-"}</td>
                <td>{r.mobile}</td>
                <td>{r.firstTimeBuying}</td>
                <td>{r.lossHistory}</td>
                <td>
                  {new Date(r.createdAt).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className={styles.pagination}>
        <button className={styles.pageBtn}>Previous</button>
        <span>Page 1 of 1</span>
        <button className={styles.pageBtn}>Next</button>
      </div>
    </div>
  );
}
