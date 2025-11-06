"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/components/superadminsidebar/shopinsurancelist.module.css";

const ShopInsuranceList = () => {
  const [shopData, setShopData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch data from backend
  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const res = await fetch("/api/shopinsurance");
        if (!res.ok) throw new Error("Failed to fetch shop insurance data");
        const data = await res.json();
        setShopData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShopData();
  }, []);

  if (loading) return <p className={styles.loading}>Loading data...</p>;
  if (error) return <p className={styles.error}>❌ {error}</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Shop Insurance List</h2>

      {shopData.length === 0 ? (
        <p className={styles.noData}>No data found.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>S.no</th>
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
                <td>{shop.shopType}</td>
                <td>{shop.pincode}</td>
                <td>{shop.phone}</td>
                <td>{shop.businessCategory.replace(/_/g, " ")}</td>
                {/* <td>{shop.businessType || "-"}</td> */}
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
      )}
    </div>
  );
};

export default ShopInsuranceList;
