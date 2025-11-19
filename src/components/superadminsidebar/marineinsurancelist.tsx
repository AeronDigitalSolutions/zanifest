"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/components/superadminsidebar/marineinsurancelist.module.css";

interface MarineRecord {
  _id: string;
  phoneNumber: string;
  commodity?: string;
  coverType?: string;
  shipmentType?: string;
  companyName?: string;
  transportMode?: string;
  coverAmount?: string;
  email?: string | null; // ⭐ travel logic
  createdAt: string;
}

const MarineInsuranceList: React.FC = () => {
  const [data, setData] = useState<MarineRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/p", { cache: "no-store" });

      if (!res.ok) throw new Error("Failed to fetch marine data");

      const json = await res.json();

      // ⭐ Travel module structure: { success: true, data: [...] }
      setData(json.data || []);
    } catch (err: any) {
      console.error("Fetch Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.miContainer}>
      <h2 className={styles.miTitle}>Marine Insurance List</h2>

      <div className={styles.miTableWrapper}>
        <table className={styles.miTable}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Email / User</th>
              <th>Phone</th>
              <th>Commodity</th>
              <th>Cover Type</th>
              <th>Shipment</th>
              <th>Company Name</th>
              <th>Transport</th>
              <th>Amount</th>
              <th>Created At</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, idx) => (
              <tr key={item._id}>
                <td>{idx + 1}</td>

                {/* ⭐ Email (travel logic) */}
                <td>{item.email || "Unregistered User"}</td>

                <td>{item.phoneNumber}</td>
                <td>{item.commodity || "-"}</td>
                <td>{item.coverType || "-"}</td>
                <td>{item.shipmentType || "-"}</td>
                <td>{item.companyName || "-"}</td>
                <td>{item.transportMode || "-"}</td>
                <td>{item.coverAmount || "-"}</td>

                <td>{new Date(item.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.miPagination}>
        <button className={styles.miPageBtn}>Previous</button>
        <span>Page 1 of 1</span>
        <button className={styles.miPageBtn}>Next</button>
      </div>
    </div>
  );
};

export default MarineInsuranceList;
