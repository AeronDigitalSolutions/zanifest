import React, { useEffect, useState } from 'react';
import styles from '@/styles/components/superadminsidebar/agentlist.module.css';
import Image from 'next/image';
import axios from 'axios';

interface Agent {
  _id: string;
  agentCode: string;
  firstName: string;
  lastName: string;
  email: string;
  assignedTo: string;
  district: string;
  city: string;
  state: string;
  accountStatus: 'active' | 'inactive';
}

const AgentsPage: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const agentsPerPage = 10;

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

       const password = prompt(`Enter your password to set status to ${newStatus}`);
    // console.log("Password entered:", password);
    if (!password) return; // user cancelled

    const token = localStorage.getItem("token"); // or cookie if you're storing it there
    console.log("Using token (agentlist):", token);

     const res = await fetch(`/api/agent/updateAccountStatus?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}` },
        body: JSON.stringify({ accountStatus: newStatus, password }),
      });


      const data = await res.json();

      if (data.success) {
        alert(`Agent status updated to ${newStatus}`);
        // ✅ update state immediately
        setAgents((prevAgents) =>
          prevAgents.map((m) =>
            m._id === id ? { ...m, accountStatus: newStatus } : m
          )
        );
      } else {
        alert(data.message || 'Failed to update status');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating Agent status');
    }
  };

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

  const handleDelete = async ( id: string) => {

    try{
      const res = await axios.delete(`/api/agent/deleteagent?id=${id}`);
      console.log("response status: ", res.status);

      if(res.status===200){
        alert("Agent deleted successfully");
        setAgents((prevAgents) => prevAgents.filter((a) => a._id!==id));
      }
      else{
        alert("Failed to delete agent");
      }
    }

    catch(err){
      console.error('Error deleting agent:', err);
      alert('Error deleting agent');
    }

  }

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
                  <th className={styles.th}>S.No</th>
                  <th className={styles.th}>Agent code</th>
                  <th className={styles.th}>Name</th>
                  <th className={styles.th}>Email</th>
                  <th className={styles.th}>District</th>
                  <th className={styles.th}>City</th>
                  <th className={styles.th}>State</th>
                  <th className={styles.th}>Assigned To</th>
                  <th className={styles.th}>Status</th>
                  <th className={styles.th}>Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentAgents.map((agent, index) => (
                  <tr key={agent._id} className={styles.row}>
                    <td className={styles.td}>{(currentPage - 1) * agentsPerPage + index + 1}</td>
                    <td className={styles.td}>{agent.agentCode}</td>
                    <td className={styles.td}>{`${agent.firstName}` + " "+ `${agent.lastName}`}</td>
                    <td className={styles.td}>{agent.email}</td>
                    <td className={styles.td}>{agent.district}</td>
                    <td className={styles.td}>{agent.city}</td>
                    <td className={styles.td}>{agent.state}</td>
                    <td className={`${styles.td} ${styles.assignedTo}`}>
                      {agent.assignedTo}
                    </td>
                    <td className={styles.td}>
                      <button
                        className={`${styles.editButton} ${
                          (!agent.accountStatus || agent.accountStatus === 'active') ? styles.active : styles.inactive
                        }`}
                        onClick={() => handleToggleStatus(agent._id, agent.accountStatus && agent.accountStatus === 'inactive' ? 'inactive' : 'active')}
                      >
                        {(!agent.accountStatus || agent.accountStatus === 'active') ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className={styles.td}>
                      <button onClick={()=> handleDelete(agent._id)}>Delete</button>
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
