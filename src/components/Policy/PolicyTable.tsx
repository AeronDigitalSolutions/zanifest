"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/pages/listofpolicy.module.css";
import { FiEdit2, FiCheck } from "react-icons/fi";

export type Summary = {
  insuredName: string;
  policyNo: string;
  companyName: string;
  amount: string;
  expiryDate: string;
  pdfUrl?: string;
};

const PolicyTable = ({
  policies,
  pdfUrl,
}: {
  policies: Summary[];
  pdfUrl: string;
}) => {
  const [rows, setRows] = useState<Summary[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // 🔥 SYNC PROPS TO STATE
  useEffect(() => {
    setRows(policies);
  }, [policies]);

  const update = (i: number, key: keyof Summary, value: string) => {
    const copy = [...rows];
    copy[i] = { ...copy[i], [key]: value };
    setRows(copy);
  };

  const verify = async (row: Summary) => {
    setSaving(true);

    const res = await fetch("/api/policy/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ ...row, pdfUrl }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Verify failed");
      setSaving(false);
      return;
    }

    window.dispatchEvent(new Event("policy-updated"));
    alert("Policy verified & saved");
    setSaving(false);
  };

  const cell = (i: number, key: keyof Summary) => (
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
      {editing === `${i}-${key}` ? (
        <>
          <input
            value={rows[i][key]}
            onChange={(e) => update(i, key, e.target.value)}
          />
          <FiCheck onClick={() => setEditing(null)} />
        </>
      ) : (
        <>
          <span>{rows[i][key]}</span>
          <FiEdit2 onClick={() => setEditing(`${i}-${key}`)} />
        </>
      )}
    </div>
  );

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Policy No</th>
            <th>Company</th>
            <th>Amount</th>
            <th>Expiry</th>
            <th>PDF</th>
            <th>Verify</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => (
            <tr key={row.policyNo + i}>
              <td>{cell(i, "insuredName")}</td>
              <td>{cell(i, "policyNo")}</td>
              <td>{cell(i, "companyName")}</td>
              <td>{cell(i, "amount")}</td>
              <td>{cell(i, "expiryDate")}</td>

              <td>
                <button
                  className={styles.viewBtn}
                  onClick={() => window.open(row.pdfUrl || pdfUrl, "_blank")}
                >
                  View
                </button>
              </td>

              <td>
                <button
                  className={styles.verifyBtn}
                  disabled={saving}
                  onClick={() => verify(row)}
                >
                  Verify
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PolicyTable;
