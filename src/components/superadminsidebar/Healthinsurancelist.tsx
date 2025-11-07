"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

interface Member {
  name: string;
  age: number;
  image?: string;
}

interface HealthInsuranceRecord {
  _id: string;
  gender: string;
  members: Member[];
  city: string;
  fullName: string;
  mobile: string;
  medicalHistory: string[];
  createdAt: string;
}

const Healthinsurancelist = () => {
  const [records, setRecords] = useState<HealthInsuranceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await fetch("/api/healthinsurance");
        const data = await res.json();
        if (data.success) setRecords(data.data);
      } catch (error) {
        console.error("Error fetching records:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-lg">
        Loading...
      </div>
    );

  return (
    <div>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Health Insurance Records
        </h1>

        {records.length === 0 ? (
          <p className="text-center text-gray-500">No records found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border">s.no</th>
                  <th className="py-2 px-4 border">Full Name</th>
                  <th className="py-2 px-4 border">Gender</th>
                  <th className="py-2 px-4 border">City</th>
                  <th className="py-2 px-4 border">Mobile</th>
                  <th className="py-2 px-4 border">Members</th>
                  <th className="py-2 px-4 border">Medical History</th>
                  <th className="py-2 px-4 border">Created At</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r, i) => (
                  <tr key={r._id} className="hover:bg-gray-50 text-center">
                    <td className="py-2 px-4 border">{i + 1}</td>
                    <td className="py-2 px-4 border">{r.fullName}</td>
                    <td className="py-2 px-4 border capitalize">{r.gender}</td>
                    <td className="py-2 px-4 border">{r.city}</td>
                    <td className="py-2 px-4 border">{r.mobile}</td>
                    <td className="py-2 px-4 border text-left">
                      <ul className="list-disc list-inside">
                        {r.members.map((m, idx) => (
                          <li key={idx}>
                            {m.name} ({m.age})
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-2 px-4 border">
                      {r.medicalHistory.length
                        ? r.medicalHistory.join(", ")
                        : "None"}
                    </td>
                    <td className="py-2 px-4 border">
                      {new Date(r.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Healthinsurancelist;
