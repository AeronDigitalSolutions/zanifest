import React, { useEffect, useState } from 'react';
import styles from '@/styles/components/superadminsidebar/agentlist.module.css';
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Modal, Input, message } from "antd";

interface Agent {
  _id: string;
  agentCode: string;
  firstName: string;
  lastName: string;
  email: string;
  assignedTo: string ;
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
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [pendingAction, setPendingAction] = useState<{ id: string; currentStatus: string } | null>(null);
  const [districtManagers, setDistrictManagers] = useState<any[]>([]);
  const [editingAgentId, setEditingAgentId] = useState<string | null>(null);
  const [newAssignedTo, setNewAssignedTo] = useState<string>("");


  // const handleToggleStatus = async (id: string, currentStatus: string) => {
  //   try {
  //     const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

  //      const password = prompt(`Enter your password to set status to ${newStatus}`);
  //   // console.log("Password entered:", password);
  //   if (!password) return; // user cancelled

  //   const token = localStorage.getItem("token"); // or cookie if you're storing it there
  //   console.log("Using token (agentlist):", token);

  //    const res = await fetch(`/api/agent/updateAccountStatus?id=${id}`, {
  //       method: 'PATCH',
  //       headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}` },
  //       body: JSON.stringify({ accountStatus: newStatus, password }),
  //     });


  //     const data = await res.json();

  //     if (data.success) {
  //       toast.success(`Agent status updated to ${newStatus}`);
  //       // ✅ update state immediately
  //       setAgents((prevAgents) =>
  //         prevAgents.map((m) =>
  //           m._id === id ? { ...m, accountStatus: newStatus } : m
  //         )
  //       );
  //     } else {
  //       toast.error(data.message || 'Failed to update status');
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     toast.error('Error updating Agent status (serverside error)');
  //   }
  // };

 const handleToggleStatus = (id: string, currentStatus: string) => {
  // open modal instead of prompt
  setPendingAction({ id, currentStatus });
  setPasswordModalVisible(true);
};

const confirmToggleStatus = async () => {
  if (!passwordInput) {
    message.warning("Please enter your password");
    return;
  }

  try {
    const { id, currentStatus } = pendingAction!;
    const newStatus = currentStatus === "active" ? "inactive" : "active";

    const token = localStorage.getItem("token");

   const res = await fetch(`/api/agent/updateAccountStatus?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}` },
        body: JSON.stringify({ accountStatus: newStatus, password: passwordInput }),
      });
    const data = await res.json();

    if (data.success) {
      toast.success(`Admin status updated to ${newStatus}`);
      setAgents((prevAgents) =>
        prevAgents.map((m) => (m._id === id ? { ...m, accountStatus: newStatus } : m))
      );
    } else {
      toast.error(data.message || "Failed to update status");
    }
  } catch (err) {
    console.error(err);
    toast.error("Error updating status");
  } finally {
    setPasswordModalVisible(false);
    setPasswordInput("");
    setPendingAction(null);
  }
};

const handleSaveAssignedTo = async (agentId: string) => {
  try {
    const res = await fetch(`/api/agent/${agentId}/assign`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assignedTo: newAssignedTo }),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Agent assigned successfully!");

      setAgents((prev) =>
        prev.map((a) => (a._id === agentId ? data.agent : a))
      );

      setEditingAgentId(null);
      setNewAssignedTo("");
    } 
    
    else {
      toast.error(data.message || "Failed to assign agent");
    }
  } 
  
  catch (err) {
    console.error(err);
    toast.error("Something went wrong");
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

  useEffect(() => {
  const fetchDistrictManagers = async () => {
    try {
      const res = await fetch("/api/managers/district");
      const data = await res.json();
      if (data.success) {
        setDistrictManagers(data.managers);
      }
    } catch (err) {
      console.error("Failed to load district managers", err);
    }
  };

  fetchDistrictManagers();
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
        toast.success("Agent deleted successfully");
        setAgents((prevAgents) => prevAgents.filter((a) => a._id!==id));
      }
      else{
        toast.error("Failed to delete agent");
      }
    }

    catch(err){
      console.error('Error deleting agent:', err);
      toast.error('Error deleting agent (serverside error)');
    }

  }

  return (
    <div className={styles.container}>

      <Modal
              title="Confirm Password"
              visible={passwordModalVisible}
              onOk={confirmToggleStatus}
              onCancel={() => {
                setPasswordModalVisible(false);
                setPasswordInput("");
                setPendingAction(null);
              }}
              okText="Confirm"
              cancelText="Cancel"
              centered
            >
              <Input.Password
                placeholder="Enter your password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              />
            </Modal>


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
                    <td className={styles.td}>
                    
                      {editingAgentId === agent._id ? (
                        <>
                          <select
                            value={newAssignedTo}
                            onChange={(e) => setNewAssignedTo(e.target.value)}
                          >
                            <option value=""> Select Manager </option>
                            {districtManagers.map((manager) => (
                              <option key={manager._id} value={manager.managerId}>
                                {manager.firstName}-{manager.managerId}
                              </option>
                            ))}
                          </select>
                          <button onClick={() => handleSaveAssignedTo(agent._id)}>Save</button>
                          <button onClick={() => setEditingAgentId(null)}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <span>
                            {agent.assignedTo || "Not Assigned"}
                          </span>
                          <button
                            onClick={() => {
                              setEditingAgentId(agent._id);
                              setNewAssignedTo
                              (
                                typeof agent.assignedTo === "string" ? agent.assignedTo : ""
                              );
                            }}
                          >
                            Edit
                          </button>
                        </>
                      )}
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
