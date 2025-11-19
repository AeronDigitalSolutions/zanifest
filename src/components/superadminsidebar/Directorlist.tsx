// components/Directorlist.tsx (client)
"use client";
import React, { useEffect, useState } from "react";

export default function Directorlist() {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/directorins", { cache: "no-store" });
        const json = await res.json();
        // Travel/Health API shape: { success: true, data: [...] }
        setRecords(json.data || []);
      } catch (err) {
        console.error("Directorlist fetch error:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Director Insurance Records</h1>
      <table border={1} cellPadding={8} style={{ width: "100%", marginTop: 20 }}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Mobile</th>
            <th>Company Name</th>
            <th>Industry</th>
            <th>Email</th>
            <th>Territory</th>
            <th>Jurisdiction</th>
            <th>Turnover</th>
            <th>Liability</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, i) => (
            <tr key={r._id}>
              <td>{i + 1}</td>
              <td>{r.mobileNumber}</td>
              <td>{r.companyName}</td>
              <td>{r.industryCategory}</td>
              <td>{r.email || "Unregistered User"}</td>
              <td>{r.territory}</td>
              <td>{r.jurisdiction}</td>
              <td>{r.companyTurnover}</td>
              <td>{r.limitOfLiability}</td>
              <td>{new Date(r.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
