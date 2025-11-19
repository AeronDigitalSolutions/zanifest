"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/components/superadminsidebar/travelinsurancelist.module.css";

const TravelInsuranceList = () => {
  const [travelPolicies, setTravelPolicies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTravelPolicies = async () => {
    try {
      const res = await axios.get("/api/travelinsurance");
      if (res.data?.success) {
        setTravelPolicies(res.data.data);
      } else {
        setTravelPolicies([]);
      }
    } catch (error) {
      console.error("Error fetching travel insurance list:", error);
      setTravelPolicies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTravelPolicies();
  }, []);

  if (loading) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Travel Insurance List</h2>

      {travelPolicies.length === 0 ? (
        <p className={styles.noData}>No Travel Insurance Policies Found</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Destination(s)</th>
                <th>Email</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Total Travellers</th>
                <th>Medical Condition</th>
                <th>Created At</th>
              </tr>
            </thead>

            <tbody>
              {travelPolicies.map((policy, index) => (
                <tr key={policy._id || index}>
                  <td>{index + 1}</td>
                  <td>{policy.countries?.join(", ") || "-"}</td>
                  <td>{policy.email || "Unregistered User"}</td>
                  <td>{policy.startDate}</td>
                  <td>{policy.endDate}</td>
                  <td>{policy.travellers}</td>
                  <td>{policy.medicalCondition || "None"}</td>
                  <td>
                    {new Date(policy.createdAt).toLocaleDateString("en-GB", {
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

      {/* Optional Pagination */}
      <div className={styles.pagination}>
        <button className={styles.pageBtn}>Previous</button>
        <span>Page 1 of 1</span>
        <button className={styles.pageBtn}>Next</button>
      </div>
    </div>
  );
};

export default TravelInsuranceList;
