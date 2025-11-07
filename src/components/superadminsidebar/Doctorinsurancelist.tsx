"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";


interface DoctorData {
  _id: string;
  name: string;
  mobile: string;
  whatsapp: boolean;
  specialization?: string;
  firstTime?: "yes" | "no" | null;
  facility?: "yes" | "no" | null;
  createdAt: string;
}

const Doctorinsurancelist: React.FC = () => {
  const [doctors, setDoctors] = useState<DoctorData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Fetch data from backend
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/doctorinsurance");
      if (res.data.success) {
        setDoctors(res.data.data);
      } else {
        setError("Failed to fetch data");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <>
      <div style={{ padding: "20px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Doctor Insurance List
        </h2>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && doctors.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "900px",
              }}
            >
              <thead>
                <tr style={{  color: "black" }}>
                  <th style={thStyle}>S.No</th>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Mobile</th>
                  <th style={thStyle}>WhatsApp</th>
                  <th style={thStyle}>Specialization</th>
                  <th style={thStyle}>First Time Buyer</th>
                  <th style={thStyle}>Facility Owner</th>
                  <th style={thStyle}>Created At</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doc, index) => (
                  <tr key={doc._id} style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={tdStyle}>{index + 1}</td>
                    <td style={tdStyle}>{doc.name}</td>
                    <td style={tdStyle}>{doc.mobile}</td>
                    <td style={tdStyle}>{doc.whatsapp ? " Yes" : "  No"}</td>
                    <td style={tdStyle}>{doc.specialization || "-"}</td>
                    <td style={tdStyle}>{doc.firstTime || "-"}</td>
                    <td style={tdStyle}>{doc.facility || "-"}</td>
                    <td style={tdStyle}>
                      {new Date(doc.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !loading && <p>No records found.</p>
        )}
      </div>
    </>
  );
};

// Inline styles for cleaner table
const thStyle: React.CSSProperties = {
  padding: "12px 10px",
  border: "1px solid #ddd",
  textAlign: "left",
  fontWeight: "bold",
};

const tdStyle: React.CSSProperties = {
  padding: "10px 8px",
  border: "1px solid #ddd",
  textAlign: "left",
  fontSize: "14px",
};

export default Doctorinsurancelist;
