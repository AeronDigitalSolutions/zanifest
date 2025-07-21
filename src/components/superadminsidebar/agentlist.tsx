import React, { useEffect, useState } from 'react';

interface Agent {
  _id: string;
  name: string;
  email: string;
  assignedTo: string;
  district: string;
    city: string;
    state: string;
  // add other fields if needed
}

const AgentsPage: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);

  const fetchAgents = async () => {
    try {
      const res = await fetch('/api/getagent');
      const data = await res.json();
      setAgents(data.agents);
    } catch (err) {
      console.error('Error fetching agents:', err);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">All Agents</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">District</th>
            <th className="px-4 py-2 border">City</th>
            <th className="px-4 py-2 border">State</th>
            <th className="px-4 py-2 border">Assigned To</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent) => (
            <tr key={agent._id}>
              <td className="border px-4 py-2">{agent.name}</td>
              <td className="border px-4 py-2">{agent.email}</td>
              <td className="border px-4 py-2">{agent.district}</td>
              <td className="border px-4 py-2">{agent.city}</td>
              <td className="border px-4 py-2">{agent.state}</td>
              <td className="border px-4 py-2">{agent.assignedTo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgentsPage;
