"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/components/superadminsidebar/shopinsurancelist.module.css";

const ShopInsuranceList = () => {
  const [shopData, setShopData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const res = await fetch("/api/shopinsurance");
        if (!res.ok) throw new Error("Failed to fetch shop insurance data");

        const json = await res.json();
        setShopData(json.data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShopData();
  }, []);

  if (loading) return <p className={styles.loading}>Loading…</p>;
  if (error) return <p className={styles.error}>❌ {error}</p>;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Shop Insurance List</h2>

      {shopData.length === 0 ? (
        <p className={styles.noData}>No records found.</p>
      ) : (
        <>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>User Email</th>
                  <th>Shop Type</th>
                  <th>Pincode</th>
                  <th>Phone</th>
                  <th>Business Category</th>
                  <th>Ownership</th>
                  <th>Created At</th>
                </tr>
              </thead>

              <tbody>
                {shopData.map((shop, index) => (
                  <tr key={shop._id}>
                    <td>{index + 1}</td>

                    {/* ⭐ Travel Logic → email OR Unregistered User */}
                    <td>{shop.email || "Unregistered User"}</td>

                    <td>{shop.shopType}</td>
                    <td>{shop.pincode}</td>
                    <td>{shop.phone}</td>
                    <td>{shop.businessCategory?.replace(/_/g, " ")}</td>
                    <td>{shop.ownership}</td>

                    <td>
                      {new Date(shop.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination UI (static) */}
          <div className={styles.pagination}>
            <button className={styles.pageBtn}>Previous</button>
            <span>Page 1 of 1</span>
            <button className={styles.pageBtn}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShopInsuranceList;
