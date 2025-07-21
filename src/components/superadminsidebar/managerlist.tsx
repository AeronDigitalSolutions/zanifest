'use client';

import React, { useEffect, useState } from 'react';

interface Manager {
  _id: string;
  name: string;
  email: string;
  category: string;
  location: {
    district: string;
    state: string;
  };
  assignedTo?: {
    name: string;
    email: string;
    category: string;
  };
}

export default function ManagersTable() {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const res = await fetch('/api/getmanager');
        const data = await res.json();
        setManagers(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching managers:', err);
        setLoading(false);
      }
    };

    fetchManagers();
  }, []);

  if (loading) return <p className="text-center">Loading managers...</p>;

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">All Managers</h2>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">State</th>
            <th className="p-2 border">District</th>
            <th className="p-2 border">Assigned To</th>
          </tr>
        </thead>
        <tbody>
  {managers.map((manager, index) => (
    <tr key={manager._id} className="text-center">
      <td className="p-2 border">{index + 1}</td> {/* 1-based ID */}
      <td className="p-2 border">{manager.name}</td>
      <td className="p-2 border">{manager.email}</td>
      <td className="p-2 border">{manager.category}</td>
      <td className="p-2 border">{manager.location?.state}</td>
      <td className="p-2 border">{manager.location?.district}</td>
      <td className="p-2 border">
        {manager.assignedTo
          ? `${manager.assignedTo.name} (${manager.assignedTo.category})`
          : '—'}
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
}
