"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/components/superadminsidebar/homeinsurancelist.module.css";

const Homeinsurancelist: React.FC = () => {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHomePolicies = async () => {
    try {
      const res = await axios.get("/api/homeinsurance");
      if (res.data?.success) {
        setRecords(res.data.data);
      } else {
        setRecords([]);
      }
    } catch (error) {
      console.error("Error fetching home insurance list:", error);
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomePolicies();
  }, []);

  if (loading) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Home Insurance List</h2>

      {records.length === 0 ? (
        <p className={styles.noData}>No Home Insurance Records Found</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
                <th>House Value</th>
                <th>Household Items</th>
                <th>Selected Covers</th>
                <th>Created At</th>
              </tr>
            </thead>

            <tbody>
              {records.map((item, index) => (
                <tr key={item._id || index}>
                  <td>{index + 1}</td>
                  <td>{item.fullName}</td>
                  <td>{item.email || "Unregistered User"}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.propertyDetails?.cityName || "-"}</td>
                  <td>{item.propertyDetails?.houseValue || "-"}</td>
                  <td>{item.propertyDetails?.householdItemsValue || "-"}</td>
                  <td>
                    {Object.entries(item.coverOptions || {})
                      .filter(([_, val]) => val)
                      .map(([key]) =>
                        key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())
                      )
                      .join(", ") || "None"}
                  </td>
                  <td>
                    {new Date(item.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
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
};

export default Homeinsurancelist;
