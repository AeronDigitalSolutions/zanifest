"use client";
import React, { useEffect, useState } from "react";

interface PlanRequest {
  _id: string;
  phoneNumber: string;
  commodity: string;
  coverType: string;
  shipmentType: string;
  companyName: string;
  transportMode: string;
  coverAmount: string;
  createdAt: string;
}

const MarineInsuranceList: React.FC = () => {
  const [data, setData] = useState<PlanRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editRow, setEditRow] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<PlanRequest>>({});

  const fetchData = async () => {
    try {
      const res = await fetch("/api/p", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch data");
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this record?")) return;

    try {
      const res = await fetch(`/api/p?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete record");
      setData((prev) => prev.filter((item) => item._id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleEdit = (item: PlanRequest) => {
    setEditRow(item._id);
    setEditData(item);
  };

  const handleSave = async (id: string) => {
    try {
      const res = await fetch("/api/p", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...editData }),
      });
      if (!res.ok) throw new Error("Failed to update record");
      setEditRow(null);
      fetchData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1> Marine Insurance Records</h1>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          background: "#f9f9f9",
          borderRadius: "8px",
        }}
      >
        <thead style={{ backgroundColor: "#10353b", color: "white" }}>
          <tr>
            <th>S.no</th>
            <th>Phone</th>
            <th>Commodity</th>
            <th>Cover Type</th>
            <th>Shipment</th>
            <th>Company</th>
            <th>Transport</th>
            <th>Amount</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={item._id}>
              <td>{idx + 1}</td>
              <td>{item.phoneNumber}</td>
              <td>
                {editRow === item._id ? (
                  <input
                    value={editData.commodity || ""}
                    onChange={(e) => setEditData({ ...editData, commodity: e.target.value })}
                  />
                ) : (
                  item.commodity || "-"
                )}
              </td>
              <td>{item.coverType}</td>
              <td>{item.shipmentType}</td>
              <td>{item.companyName}</td>
              <td>{item.transportMode}</td>
              <td>{item.coverAmount}</td>
              <td>{new Date(item.createdAt).toLocaleString()}</td>
              <td>
                {editRow === item._id ? (
                  <>
                    <button onClick={() => handleSave(item._id)}> Save</button>
                    <button onClick={() => setEditRow(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(item)}>Edit</button>
                    <button onClick={() => handleDelete(item._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarineInsuranceList;
