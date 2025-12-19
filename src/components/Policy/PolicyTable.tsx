"use client";
import React, { useState } from "react";
import styles from "@/styles/pages/listofpolicy.module.css";
import { FiEdit2, FiCheck } from "react-icons/fi";

export type Summary = {
  insuredName: string;
  policyNo: string;
  companyName: string;
  amount: string;
  expiryDate: string;
};

const PolicyTable = ({
  policies,
  pdfUrl,
}: {
  policies: Summary[];
  pdfUrl: string;
}) => {
  const [rows, setRows] = useState<Summary[]>(policies);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

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
      body: JSON.stringify(row),
    });

    if (!res.ok) {
      alert("Verify failed");
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
          <FiCheck
            style={{ cursor: "pointer" }}
            onClick={() => setEditing(null)}
          />
        </>
      ) : (
        <>
          <span>{rows[i][key]}</span>
          <FiEdit2
            style={{ cursor: "pointer", color: "orangered" }}
            onClick={() => setEditing(`${i}-${key}`)}
          />
        </>
      )}
    </div>
  );

  return (
    <div className={styles.tableWrapper}>
      <h3 className={styles.tableHeading}>Policies</h3>

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
                  onClick={() => window.open(pdfUrl, "_blank")}
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
