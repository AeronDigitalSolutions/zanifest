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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await fetch("/api/officepackagepolicyinsurance", {
          cache: "no-store",
        });
        const json = await res.json();

        if (!json.success) {
          throw new Error("Failed to fetch records");
        }

        setRecords(json.data || []);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Office Package Policy Records</h1>

      {records.length === 0 ? (
        <p className={styles.noData}>No records found.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Company Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Pincode</th>
                <th>First Time Buying</th>
                <th>Loss History</th>
                <th>Created</th>
              </tr>
            </thead>

            <tbody>
              {records.map((r, i) => (
                <tr key={r._id}>
                  <td>{i + 1}</td>
                  <td>{r.companyName}</td>

                  {/* ⭐ Email or "Unregistered User" */}
                  <td>{r.email || "Unregistered User"}</td>

                  <td>{r.mobile}</td>
                  <td>{r.pincode || "-"}</td>
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
      )}

      <div className={styles.pagination}>
        <button className={styles.pageBtn}>Previous</button>
        <span>Page 1 of 1</span>
        <button className={styles.pageBtn}>Next</button>
      </div>
    </div>
  );
}
