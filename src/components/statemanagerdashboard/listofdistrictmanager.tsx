"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/pages/statemanager.module.css";
import { useRouter } from "next/router";

type Manager = {
  _id: string;
  managerId?: String;
  firstName?: string;
  lastName?: string;
  city: String;
  district?: string;
  state?: string;
  panNumber: string;
  adhaarNumber: string;
 
};

const DistrictManagerTable: React.FC = () => {
  const router = useRouter();
  const [districtManagers, setDistrictManagers] = useState<Manager[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDistrictManagers() {
      try {
        const res = await fetch("/api/manager/getdistrictmanagers", {
          method: "GET",
          credentials: "include", // so managerToken cookie is sent
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }

        const data = await res.json();
        setDistrictManagers(data.data || []);
      } catch (error) {
        console.error("Error fetching district managers:", error);
        setDistrictManagers([]);
      } finally {
        setLoading(false);
      }
    }

    fetchDistrictManagers();
  }, []);

  return (
    <div className={styles.agentTable}>
      <h3 className={styles.tableTitle}>District Manager's List</h3>
      <div className={styles.tableWrapper}>
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading...</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>E-mail</th>
                <th>City</th>
                <th>State</th>
                <th>District</th>
                <th>PAN number</th>
                <th>Adhaar Number</th>
              </tr>
            </thead>
            <tbody>
              {districtManagers.length > 0 ? (
                districtManagers.map((manager) => (
                  <tr key={manager._id}>
                    <td>{manager.managerId || manager._id.slice(-4)}</td>
                    <td>{`${manager.firstName || ""} ${manager.lastName || ""}`}</td>
                    <td>
                      {manager.district || "N/A"},{" "}
                      {manager.state || "N/A"}
                    </td>
                    <td>{manager.city}</td>
                    <td>{manager.state}</td>
                    <td>{manager.district}</td>
                    <td>{manager.panNumber}</td>
                    <td>{manager.adhaarNumber}</td>

                    
                    {/* <td>
                      <button
                        onClick={() =>
                          router.push(`/districtmanagerdashboard?id=${manager._id}`)
                        }
                        className={styles.viewProfileButton}
                      >
                        View Profile
                      </button>
                    </td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "1rem" }}>
                    No district managers found...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DistrictManagerTable;
