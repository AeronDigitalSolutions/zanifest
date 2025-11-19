"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/components/superadminsidebar/doctorinsurancelist.module.css";

interface DoctorData {
  _id: string;
  name: string;
  email: string | null;        
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

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/doctorinsurance");

      if (res.data.success) {
        setDoctors(res.data.data);
      } else {
        setError("Failed to fetch doctor data.");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching doctor insurance data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Doctor Insurance List</h2>

      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && doctors.length > 0 ? (
        <>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>User Email</th>
                  <th>Mobile</th>
                  <th>WhatsApp</th>
                  <th>Specialization</th>
                  <th>First Time Buyer</th>
                  <th>Facility Owner</th>
                  <th>Created At</th>
                </tr>
              </thead>

              <tbody>
                {doctors.map((doc, index) => (
                  <tr key={doc._id}>
                    <td>{index + 1}</td>
                    <td>{doc.name}</td>

                    {/* ⭐ Travel logic: email OR "Unregistered User" */}
                    <td>{doc.email || "Unregistered User"}</td>

                    <td>{doc.mobile}</td>
                    <td>{doc.whatsapp ? "Yes" : "No"}</td>
                    <td>{doc.specialization || "-"}</td>
                    <td>{doc.firstTime || "-"}</td>
                    <td>{doc.facility || "-"}</td>
                    <td>{new Date(doc.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ---------- Pagination UI (Static for now) ---------- */}
          <div className={styles.pagination}>
            <button className={styles.pageBtn}>Previous</button>
            <span>Page 1 of 1</span>
            <button className={styles.pageBtn}>Next</button>
          </div>
        </>
      ) : (
        !loading && <p className={styles.noData}>No doctor insurance records found.</p>
      )}
    </div>
  );
};

export default Doctorinsurancelist;
