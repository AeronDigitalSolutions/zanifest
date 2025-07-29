import React, { useEffect, useState } from 'react';
import styles from '@/styles/components/superadminsidebar/agentlist.module.css';
import Image from 'next/image';

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
  const [currentPage, setCurrentPage] = useState(1);
  const agentsPerPage = 10;

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

  const indexOfLastAgent = currentPage * agentsPerPage;
  const indexOfFirstAgent = indexOfLastAgent - agentsPerPage;
  const currentAgents = agents.slice(indexOfFirstAgent, indexOfLastAgent);
  const totalPages = Math.ceil(agents.length / agentsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>All Agents</h1>

      {loading ? (
        <div className={styles.loaderWrapper}>
          <Image
            src={require("@/assets/Material wave loading.gif")}
            alt="Loading..."
            width={100}
            height={100}
            className={styles.logoAnimation}
          />
        </div>
      ) : (
        <>
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
                {currentAgents.map((agent) => (
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

          {/* Pagination Controls */}
          <div className={styles.pagination}>
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={styles.pageButton}
            >
              Previous
            </button>
            <span className={styles.pageInfo}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={styles.pageButton}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AgentsPage;
