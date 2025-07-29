
import React, { useEffect, useState } from 'react';
import styles from '@/styles/components/superadminsidebar/agentlist.module.css';

interface Agent {
  _id: string;
  name: string;
  email: string;
  assignedTo: string;
  district: string;
    city: string;
    state: string;
}

const AgentsPage: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAgents = async () => {
    try {
      const res = await fetch('/api/getallagents');
      const data = await res.json();
      setAgents(data);
    } catch (err) {
      console.error('Error fetching agents:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>All Agents</h1>

      {loading ? (
        <p className={styles.loading}>Loading agents...</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>Email</th>
                <th className={styles.th}>District</th>
                <th className={styles.th}>City</th>
                <th className={styles.th}>State</th>
                <th className={styles.th}>Assigned To</th>
              </tr>
            </thead>
            <tbody>
              
              {Array.isArray(agents) && agents.map((agent, index) => (
                <tr key={agent._id} className={styles.row}>
                  <td className={styles.td}>{agent.name}</td>
                  <td className={styles.td}>{agent.email}</td>
                  <td className={styles.td}>{agent.district}</td>
                  <td className={styles.td}>{agent.city}</td>
                  <td className={styles.td}>{agent.state}</td>
                  <td className={`${styles.td} ${styles.assignedTo}`}>
                    {agent.assignedTo}
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

export default AgentsPage;
