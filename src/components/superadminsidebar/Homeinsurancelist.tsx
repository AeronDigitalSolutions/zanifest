"use client";
import React, { useEffect, useState } from "react";

const Homeinsurancelist: React.FC = () => {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/homeinsurance");
        const data = await res.json();
        if (data.success) {
          setRecords(data.data);
        }
      } catch (error) {
        console.error("❌ Error fetching records:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">
        Home Insurance Applications
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading records...</p>
      ) : records.length === 0 ? (
        <p className="text-center text-gray-600">No records found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg bg-white shadow-md">
            <thead className="bg-blue-100 text-blue-900">
              <tr>
                <th className="py-2 px-4 border">s.no</th>
                <th className="py-2 px-4 border">Full Name</th>
                <th className="py-2 px-4 border">Phone</th>
                <th className="py-2 px-4 border">City</th>
                <th className="py-2 px-4 border">House Value</th>
                <th className="py-2 px-4 border">Household Items</th>
                <th className="py-2 px-4 border">Selected Covers</th>
                <th className="py-2 px-4 border">Created At</th>
              </tr>
            </thead>

            <tbody>
              {records.map((record, index) => (
                <tr key={record._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border text-center">{index + 1}</td>
                  <td className="py-2 px-4 border">{record.fullName}</td>
                  <td className="py-2 px-4 border">{record.phoneNumber}</td>
                  <td className="py-2 px-4 border">
                    {record.propertyDetails?.cityName || "—"}
                  </td>
                  <td className="py-2 px-4 border">
                    {record.propertyDetails?.houseValue || "—"}
                  </td>
                  <td className="py-2 px-4 border">
                    {record.propertyDetails?.householdItemsValue || "—"}
                  </td>
                  <td className="py-2 px-4 border text-sm">
                    {Object.entries(record.coverOptions || {})
                      .filter(([_, val]) => val === true)
                      .map(([key]) =>
                        key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (s) => s.toUpperCase())
                      )
                      .join(", ") || "None"}
                  </td>
                  <td className="py-2 px-4 border text-center text-gray-600">
                    {new Date(record.createdAt).toLocaleString("en-IN", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Homeinsurancelist;
