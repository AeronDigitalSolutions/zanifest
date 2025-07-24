import React, { useEffect, useState } from 'react';
import styles from '@/styles/components/superadminsidebar/managerlist.module.css';

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
     <div className={styles.container}>
      <h2 className={styles.heading}>All Agents</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>District</th>
            <th>City</th>
            <th>State</th>
            <th>Assigned To</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(agents) && agents.map((agent, index) => (
            <tr key={index}>
              <td>{agent.name}</td>
              <td>{agent.email}</td>
              <td>{agent.district}</td>
              <td>{agent.city}</td>
              <td>{agent.state}</td>
              <td className={styles.assignedTo}>
                {agent.assignedTo} 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default AgentsPage;
