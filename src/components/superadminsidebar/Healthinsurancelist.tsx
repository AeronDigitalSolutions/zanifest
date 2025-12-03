"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/components/superadminsidebar/healthinsurancelist.module.css";

interface Member {
  name: string;
  age: number;
  image?: string;
}

interface HealthInsuranceRecord {
  _id: string;
  gender: string;
  members: Member[];
  city: string;
  fullName: string;
  mobile: string;
  email?: string | null;
  medicalHistory: string[];
  createdAt: string;
}

const Healthinsurancelist = () => {
  const [records, setRecords] = useState<HealthInsuranceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRecords = async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      else setRefreshing(true);

      const res = await fetch("/api/healthinsurance", { cache: "no-store" });
      const data = await res.json();
      if (data.success) setRecords(data.data);
    } catch (error) {
      console.error("Error fetching records:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleRefresh = () => {
    fetchRecords(true);
  };

  if (loading) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.wrapper}>

      {/* ------- Header + Refresh Button ------- */}
      <div className={styles.header}>
        <h1 className={styles.title}>Health Insurance Records</h1>

        <button className={styles.refreshBtn} onClick={handleRefresh}>
          {refreshing ? "Refreshing..." : "↻ Refresh"}
        </button>
      </div>

      {records.length === 0 ? (
        <p className={styles.noData}>No records found.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>City</th>
              <th>Mobile</th>
              <th>Members</th>
              <th>Medical History</th>
              <th>Created At</th>
            </tr>
          </thead>

          <tbody>
            {records.map((r, i) => (
              <tr key={r._id}>
                <td>{i + 1}</td>
                <td>{r.fullName}</td>
                <td>{r.email || "Unregistered User"}</td>
                <td>{r.gender}</td>
                <td>{r.city}</td>
                <td>{r.mobile}</td>

                <td>
                  {r.members.map((m, idx) => (
                    <div key={idx}>
                      {m.name} ({m.age})
                    </div>
                  ))}
                </td>

                <td>{r.medicalHistory.length ? r.medicalHistory.join(", ") : "None"}</td>

                <td>
                  {new Date(r.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Healthinsurancelist;
