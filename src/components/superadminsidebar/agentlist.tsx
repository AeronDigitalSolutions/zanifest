// // import React, { useEffect, useState } from 'react';
// // import styles from '@/styles/components/superadminsidebar/agentlist.module.css';
// // import Image from 'next/image';
// // import axios from 'axios';
// // import { toast } from 'react-hot-toast';
// // import { Modal, Input, message } from "antd";

// // interface Agent {
// //   _id: string;
// //   agentCode: string;
// //   firstName: string;
// //   lastName: string;
// //   email: string;
// //   assignedTo: string ;
// //   district: string;
// //   city: string;
// //   state: string;
// //   accountStatus: 'active' | 'inactive';
// // }

// // const AgentsPage: React.FC = () => {
// //   const [agents, setAgents] = useState<Agent[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const agentsPerPage = 10;
// //   const [passwordModalVisible, setPasswordModalVisible] = useState(false);
// //   const [passwordInput, setPasswordInput] = useState("");
// //   const [pendingAction, setPendingAction] = useState<{ id: string; currentStatus: string } | null>(null);
// //   const [districtManagers, setDistrictManagers] = useState<any[]>([]);
// //   const [editingAgentId, setEditingAgentId] = useState<string | null>(null);
// //   const [newAssignedTo, setNewAssignedTo] = useState<string>("");

// //   // const handleToggleStatus = async (id: string, currentStatus: string) => {
// //   //   try {
// //   //     const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

// //   //      const password = prompt(`Enter your password to set status to ${newStatus}`);
// //   //   // console.log("Password entered:", password);
// //   //   if (!password) return; // user cancelled

// //   //   const token = localStorage.getItem("token"); // or cookie if you're storing it there
// //   //   console.log("Using token (agentlist):", token);

// //   //    const res = await fetch(`/api/agent/updateAccountStatus?id=${id}`, {
// //   //       method: 'PATCH',
// //   //       headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}` },
// //   //       body: JSON.stringify({ accountStatus: newStatus, password }),
// //   //     });

// //   //     const data = await res.json();

// //   //     if (data.success) {
// //   //       toast.success(`Agent status updated to ${newStatus}`);
// //   //       // ✅ update state immediately
// //   //       setAgents((prevAgents) =>
// //   //         prevAgents.map((m) =>
// //   //           m._id === id ? { ...m, accountStatus: newStatus } : m
// //   //         )
// //   //       );
// //   //     } else {
// //   //       toast.error(data.message || 'Failed to update status');
// //   //     }
// //   //   } catch (err) {
// //   //     console.error(err);
// //   //     toast.error('Error updating Agent status (serverside error)');
// //   //   }
// //   // };

// //  const handleToggleStatus = (id: string, currentStatus: string) => {
// //   // open modal instead of prompt
// //   setPendingAction({ id, currentStatus });
// //   setPasswordModalVisible(true);
// // };

// // const confirmToggleStatus = async () => {
// //   if (!passwordInput) {
// //     message.warning("Please enter your password");
// //     return;
// //   }

// //   try {
// //     const { id, currentStatus } = pendingAction!;
// //     const newStatus = currentStatus === "active" ? "inactive" : "active";

// //     const token = localStorage.getItem("token");

// //    const res = await fetch(`/api/agent/updateAccountStatus?id=${id}`, {
// //         method: 'PATCH',
// //         headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}` },
// //         body: JSON.stringify({ accountStatus: newStatus, password: passwordInput }),
// //       });
// //     const data = await res.json();

// //     if (data.success) {
// //       toast.success(`Admin status updated to ${newStatus}`);
// //       setAgents((prevAgents) =>
// //         prevAgents.map((m) => (m._id === id ? { ...m, accountStatus: newStatus } : m))
// //       );
// //     } else {
// //       toast.error(data.message || "Failed to update status");
// //     }
// //   } catch (err) {
// //     console.error(err);
// //     toast.error("Error updating status");
// //   } finally {
// //     setPasswordModalVisible(false);
// //     setPasswordInput("");
// //     setPendingAction(null);
// //   }
// // };

// // const handleSaveAssignedTo = async (agentId: string) => {
// //   try {
// //     const res = await fetch(`/api/agent/${agentId}/assign`, {
// //       method: "PUT",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ assignedTo: newAssignedTo }),
// //     });

// //     const data = await res.json();

// //     if (data.success) {
// //       toast.success("Agent assigned successfully!");

// //       setAgents((prev) =>
// //         prev.map((a) => (a._id === agentId ? data.agent : a))
// //       );

// //       setEditingAgentId(null);
// //       setNewAssignedTo("");
// //     }

// //     else {
// //       toast.error(data.message || "Failed to assign agent");
// //     }
// //   }

// //   catch (err) {
// //     console.error(err);
// //     toast.error("Something went wrong");
// //   }
// // };

// //   const fetchAgents = async () => {
// //     try {
// //       const res = await fetch('/api/getallagents');
// //       const data = await res.json();
// //       setAgents(data);
// //     } catch (err) {
// //       console.error('Error fetching agents:', err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchAgents();
// //   }, []);

// //   useEffect(() => {
// //   const fetchDistrictManagers = async () => {
// //     try {
// //       const res = await fetch("/api/managers/district");
// //       const data = await res.json();
// //       if (data.success) {
// //         setDistrictManagers(data.managers);
// //       }
// //     } catch (err) {
// //       console.error("Failed to load district managers", err);
// //     }
// //   };

// //   fetchDistrictManagers();
// // }, []);

// //   const indexOfLastAgent = currentPage * agentsPerPage;
// //   const indexOfFirstAgent = indexOfLastAgent - agentsPerPage;
// //   const currentAgents = agents.slice(indexOfFirstAgent, indexOfLastAgent);
// //   const totalPages = Math.ceil(agents.length / agentsPerPage);

// //   const handlePrevPage = () => {
// //     if (currentPage > 1) setCurrentPage(prev => prev - 1);
// //   };

// //   const handleNextPage = () => {
// //     if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
// //   };

// //   const handleDelete = async ( id: string) => {

// //     try{
// //       const res = await axios.delete(`/api/agent/deleteagent?id=${id}`);
// //       console.log("response status: ", res.status);

// //       if(res.status===200){
// //         toast.success("Agent deleted successfully");
// //         setAgents((prevAgents) => prevAgents.filter((a) => a._id!==id));
// //       }
// //       else{
// //         toast.error("Failed to delete agent");
// //       }
// //     }

// //     catch(err){
// //       console.error('Error deleting agent:', err);
// //       toast.error('Error deleting agent (serverside error)');
// //     }

// //   }

// //   return (
// //     <div className={styles.container}>

// //       <Modal
// //               title="Confirm Password"
// //               visible={passwordModalVisible}
// //               onOk={confirmToggleStatus}
// //               onCancel={() => {
// //                 setPasswordModalVisible(false);
// //                 setPasswordInput("");
// //                 setPendingAction(null);
// //               }}
// //               okText="Confirm"
// //               cancelText="Cancel"
// //               centered
// //             >
// //               <Input.Password
// //                 placeholder="Enter your password"
// //                 value={passwordInput}
// //                 onChange={(e) => setPasswordInput(e.target.value)}
// //               />
// //             </Modal>

// //       <h1 className={styles.heading}>All Agents</h1>

// //       {loading ? (
// //         <div className={styles.loaderWrapper}>
// //           <Image
// //             src={require("@/assets/Material wave loading.gif")}
// //             alt="Loading..."
// //             width={100}
// //             height={100}
// //             className={styles.logoAnimation}
// //           />
// //         </div>
// //       ) : (
// //         <>
// //           <div className={styles.tableWrapper}>
// //             <table className={styles.table}>
// //               <thead>
// //                 <tr>
// //                   <th className={styles.th}>S.No</th>
// //                   <th className={styles.th}>Agent code</th>
// //                   <th className={styles.th}>Name</th>
// //                   <th className={styles.th}>Email</th>
// //                   <th className={styles.th}>District</th>
// //                   <th className={styles.th}>City</th>
// //                   <th className={styles.th}>State</th>
// //                   <th className={styles.th}>Assigned To</th>
// //                   <th className={styles.th}>Status</th>
// //                   <th className={styles.th}>Delete</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {currentAgents.map((agent, index) => (
// //                   <tr key={agent._id} className={styles.row}>
// //                     <td className={styles.td}>{(currentPage - 1) * agentsPerPage + index + 1}</td>
// //                     <td className={styles.td}>{agent.agentCode}</td>
// //                     <td className={styles.td}>{`${agent.firstName}` + " "+ `${agent.lastName}`}</td>
// //                     <td className={styles.td}>{agent.email}</td>
// //                     <td className={styles.td}>{agent.district}</td>
// //                     <td className={styles.td}>{agent.city}</td>
// //                     <td className={styles.td}>{agent.state}</td>
// //                     <td className={styles.td}>

// //                       {editingAgentId === agent._id ? (
// //                         <>
// //                           <select
// //                             value={newAssignedTo}
// //                             onChange={(e) => setNewAssignedTo(e.target.value)}
// //                           >
// //                             <option value=""> Select Manager </option>
// //                             {districtManagers.map((manager) => (
// //                               <option key={manager._id} value={manager.managerId}>
// //                                 {manager.firstName}-{manager.managerId}
// //                               </option>
// //                             ))}
// //                           </select>
// //                           <button onClick={() => handleSaveAssignedTo(agent._id)}>Save</button>
// //                           <button onClick={() => setEditingAgentId(null)}>Cancel</button>
// //                         </>
// //                       ) : (
// //                         <>
// //                           <span>
// //                             {agent.assignedTo || "Not Assigned"}
// //                           </span>
// //                           <button
// //                             onClick={() => {
// //                               setEditingAgentId(agent._id);
// //                               setNewAssignedTo
// //                               (
// //                                 typeof agent.assignedTo === "string" ? agent.assignedTo : ""
// //                               );
// //                             }}
// //                           >
// //                             Edit
// //                           </button>
// //                         </>
// //                       )}
// //                     </td>

// //                     <td className={styles.td}>
// //                       <button
// //                         className={`${styles.editButton} ${
// //                           (!agent.accountStatus || agent.accountStatus === 'active') ? styles.active : styles.inactive
// //                         }`}
// //                         onClick={() => handleToggleStatus(agent._id, agent.accountStatus && agent.accountStatus === 'inactive' ? 'inactive' : 'active')}
// //                       >
// //                         {(!agent.accountStatus || agent.accountStatus === 'active') ? 'Active' : 'Inactive'}
// //                       </button>
// //                     </td>
// //                     <td className={styles.td}>
// //                       <button onClick={()=> handleDelete(agent._id)}>Delete</button>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>

// //           {/* Pagination Controls */}
// //           <div className={styles.pagination}>
// //             <button
// //               onClick={handlePrevPage}
// //               disabled={currentPage === 1}
// //               className={styles.pageButton}
// //             >
// //               Previous
// //             </button>
// //             <span className={styles.pageInfo}>
// //               Page {currentPage} of {totalPages}
// //             </span>
// //             <button
// //               onClick={handleNextPage}
// //               disabled={currentPage === totalPages}
// //               className={styles.pageButton}
// //             >
// //               Next
// //             </button>
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default AgentsPage;

// import React, { useEffect, useState } from "react";
// import styles from "@/styles/components/superadminsidebar/agentlist.module.css";
// import Image from "next/image";
// import axios from "axios";
// import { FaEdit } from "react-icons/fa"; // already imported

// import { toast } from "react-hot-toast";
// import { Modal, Input, message } from "antd";

// interface Agent {
//   _id: string;
//   agentCode: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   assignedTo: string;
//   district: string;
//   city: string;
//   state: string;
//   accountStatus: "active" | "inactive";
// }

// const AgentsPage: React.FC = () => {
//   const [agents, setAgents] = useState<Agent[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const agentsPerPage = 10;

//   // status modal states
//   const [passwordModalVisible, setPasswordModalVisible] = useState(false);
//   const [passwordInput, setPasswordInput] = useState("");
//   const [pendingAction, setPendingAction] = useState<{
//     id: string;
//     currentStatus: string;
//   } | null>(null);

//   const [districtManagers, setDistrictManagers] = useState<any[]>([]);
//   const [editingAgentId, setEditingAgentId] = useState<string | null>(null);
//   const [newAssignedTo, setNewAssignedTo] = useState<string>("");

//   // filters
//   const [sortBy, setSortBy] = useState<string>("");
//   const [statusFilter, setStatusFilter] = useState<string>("");
//   const [searchQuery, setSearchQuery] = useState<string>("");

//   // -------------------- Status Toggle --------------------
//   const handleToggleStatus = (id: string, currentStatus: string) => {
//     setPendingAction({ id, currentStatus });
//     setPasswordModalVisible(true);
//   };

//   const confirmToggleStatus = async () => {
//     if (!passwordInput) {
//       message.warning("Please enter your password");
//       return;
//     }
//     try {
//       const { id, currentStatus } = pendingAction!;
//       const newStatus = currentStatus === "active" ? "inactive" : "active";

//       const token = localStorage.getItem("token");
//       const res = await fetch(`/api/agent/updateAccountStatus?id=${id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           accountStatus: newStatus,
//           password: passwordInput,
//         }),
//       });

//       const data = await res.json();
//       if (data.success) {
//         toast.success(`Agent status updated to ${newStatus}`);
//         setAgents((prevAgents) =>
//           prevAgents.map((m) =>
//             m._id === id ? { ...m, accountStatus: newStatus } : m
//           )
//         );
//       } else {
//         toast.error(data.message || "Failed to update status");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Error updating status");
//     } finally {
//       setPasswordModalVisible(false);
//       setPasswordInput("");
//       setPendingAction(null);
//     }
//   };

//   // -------------------- Assign Manager --------------------
//   const handleSaveAssignedTo = async (agentId: string) => {
//     try {
//       const res = await fetch(`/api/agent/${agentId}/assign`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ assignedTo: newAssignedTo }),
//       });

//       const data = await res.json();
//       if (data.success) {
//         toast.success("Agent assigned successfully!");
//         setAgents((prev) =>
//           prev.map((a) => (a._id === agentId ? data.agent : a))
//         );
//         setEditingAgentId(null);
//         setNewAssignedTo("");
//       } else {
//         toast.error(data.message || "Failed to assign agent");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Something went wrong");
//     }
//   };

//   // -------------------- Fetch Data --------------------
//   const fetchAgents = async () => {
//     try {
//       const res = await fetch("/api/getallagents");
//       const data = await res.json();
//       setAgents(data);
//     } catch (err) {
//       console.error("Error fetching agents:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAgents();
//   }, []);

//   useEffect(() => {
//     const fetchDistrictManagers = async () => {
//       try {
//         const res = await fetch("/api/managers/district");
//         const data = await res.json();
//         if (data.success) {
//           setDistrictManagers(data.managers);
//         }
//       } catch (err) {
//         console.error("Failed to load district managers", err);
//       }
//     };
//     fetchDistrictManagers();
//   }, []);

//   // -------------------- Delete --------------------
//   const handleDelete = async (id: string) => {
//     try {
//       const res = await axios.delete(`/api/agent/deleteagent?id=${id}`);
//       if (res.status === 200) {
//         toast.success("Agent deleted successfully");
//         setAgents((prevAgents) => prevAgents.filter((a) => a._id !== id));
//       } else {
//         toast.error("Failed to delete agent");
//       }
//     } catch (err) {
//       console.error("Error deleting agent:", err);
//       toast.error("Error deleting agent (serverside error)");
//     }
//   };

//   // -------------------- Filtering + Sorting --------------------
//   const filteredAgents = agents
//     .filter((a) => {
//       if (statusFilter && a.accountStatus !== statusFilter) return false;
//       if (searchQuery) {
//         const q = searchQuery.toLowerCase();
//         return (
//           a.firstName.toLowerCase().includes(q) ||
//           a.lastName.toLowerCase().includes(q) ||
//           a.email.toLowerCase().includes(q) ||
//           a.agentCode.toLowerCase().includes(q)
//         );
//       }
//       return true;
//     })
//     .sort((a, b) => {
//       if (sortBy === "name") {
//         return a.firstName.localeCompare(b.firstName);
//       } else if (sortBy === "email") {
//         return a.email.localeCompare(b.email);
//       }
//       return 0;
//     });

//   const indexOfLastAgent = currentPage * agentsPerPage;
//   const indexOfFirstAgent = indexOfLastAgent - agentsPerPage;
//   const currentAgents = filteredAgents.slice(
//     indexOfFirstAgent,
//     indexOfLastAgent
//   );
//   const totalPages = Math.ceil(filteredAgents.length / agentsPerPage);

//   const handlePrevPage = () => {
//     if (currentPage > 1) setCurrentPage((prev) => prev - 1);
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
//   };

//   const handleResetFilters = () => {
//     setSortBy("");
//     setStatusFilter("");
//     setSearchQuery("");
//     setCurrentPage(1);
//   };

//   // -------------------- JSX --------------------
//   return (
//     <div className={styles.container}>
//       {/* Password Modal */}
//       <Modal
//         title="Confirm Password"
//         open={passwordModalVisible}
//         onOk={confirmToggleStatus}
//         onCancel={() => {
//           setPasswordModalVisible(false);
//           setPasswordInput("");
//           setPendingAction(null);
//         }}
//         okText="Confirm"
//         cancelText="Cancel"
//         centered
//       >
//         <Input.Password
//           placeholder="Enter your password"
//           value={passwordInput}
//           onChange={(e) => setPasswordInput(e.target.value)}
//         />
//       </Modal>

//       <h1 className={styles.heading}>All Agents</h1>

//       {/* Filter Bar */}
//       <div className={styles.filterBar}>
//         <div className={styles.leftControls}>
//           <select
//             className={styles.select}
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//           >
//             <option value="">Sort By</option>
//             <option value="name">Name</option>
//             <option value="email">Email</option>
//           </select>

//           <select
//             className={styles.select}
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//           >
//             <option value="">All Status</option>
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//           </select>

//           <button className={styles.resetButton} onClick={handleResetFilters}>
//             Reset
//           </button>
//         </div>
//         <div className={styles.rightSearch}>
//           <Input.Search
//             placeholder="Search...."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className={styles.search}
//           />
//         </div>
//       </div>

//       {loading ? (
//         <div className={styles.loaderWrapper}>
//           <Image
//             src={require("@/assets/Material wave loading.gif")}
//             alt="Loading..."
//             width={100}
//             height={100}
//             className={styles.logoAnimation}
//           />
//         </div>
//       ) : (
//         <>
//           <div className={styles.tableWrapper}>
//             <table className={styles.table}>
//               <thead>
//                 <tr>
//                   <th className={styles.th}>S.No</th>
//                   <th className={styles.th}>Agent code</th>
//                   <th className={styles.th}>Name</th>
//                   <th className={styles.th}>Email</th>
//                   <th className={styles.th}>District</th>
//                   <th className={styles.th}>City</th>
//                   <th className={styles.th}>State</th>
//                   <th className={styles.th}>Assigned To</th>
//                   <th className={styles.th}>Status</th>
//                   <th className={styles.th}>Delete</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentAgents.map((agent, index) => (
//                   <tr key={agent._id} className={styles.row}>
//                     <td className={styles.td}>
//                       {(currentPage - 1) * agentsPerPage + index + 1}
//                     </td>
//                     <td className={styles.td}>{agent.agentCode}</td>
//                     <td
//                       className={styles.td}
//                     >{`${agent.firstName} ${agent.lastName}`}</td>
//                     <td className={styles.td}>{agent.email}</td>
//                     <td className={styles.td}>{agent.district}</td>
//                     <td className={styles.td}>{agent.city}</td>
//                     <td className={styles.td}>{agent.state}</td>
//                     <td className={styles.td}>
//                       {editingAgentId === agent._id ? (
//                         <>
//                           <select
//                             value={newAssignedTo}
//                             onChange={(e) => setNewAssignedTo(e.target.value)}
//                           >
//                             <option value="">Select Manager</option>
//                             {districtManagers.map((manager) => (
//                               <option
//                                 key={manager._id}
//                                 value={manager.managerId}
//                               >
//                                 {manager.firstName}-{manager.managerId}
//                               </option>
//                             ))}
//                           </select>
//                           <button
//                             onClick={() => handleSaveAssignedTo(agent._id)}
//                           >
//                             Save
//                           </button>
//                           <button onClick={() => setEditingAgentId(null)}>
//                             Cancel
//                           </button>
//                         </>
//                       ) : (
//                         <div className={styles.assignedToWrapper}>
//                           <span>{agent.assignedTo || "Not Assigned"}</span>
//                           <button
//                             className={styles.editIconBtn}
//                             onClick={() => {
//                               setEditingAgentId(agent._id);
//                               setNewAssignedTo(
//                                 typeof agent.assignedTo === "string"
//                                   ? agent.assignedTo
//                                   : ""
//                               );
//                             }}
//                           >
//                             <FaEdit color="green" size={16} />
//                           </button>
//                         </div>
//                       )}
//                     </td>

//                     <td className={styles.td}>
//                       <label className={styles.switch}>
//                         <input
//                           type="checkbox"
//                           checked={agent.accountStatus === "active"}
//                           onChange={() =>
//                             handleToggleStatus(
//                               agent._id,
//                               agent.accountStatus || "inactive"
//                             )
//                           }
//                         />
//                         <span className={styles.slider}></span>
//                       </label>
//                     </td>

//                     <td className={styles.td}>
//                       <button
//                         className={styles.binButton}
//                         onClick={() => handleDelete(agent._id)}
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 39 7"
//                           className={styles.binTop}
//                         >
//                           <line
//                             strokeWidth="4"
//                             stroke="white"
//                             y2="5"
//                             x2="39"
//                             y1="5"
//                           ></line>
//                           <line
//                             strokeWidth="3"
//                             stroke="white"
//                             y2="1.5"
//                             x2="26.0357"
//                             y1="1.5"
//                             x1="12"
//                           ></line>
//                         </svg>
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 33 39"
//                           className={styles.binBottom}
//                         >
//                           <mask fill="white" id="path-1-inside-1_8_19">
//                             <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
//                           </mask>
//                           <path
//                             mask="url(#path-1-inside-1_8_19)"
//                             fill="white"
//                             d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
//                           ></path>
//                           <path
//                             strokeWidth="4"
//                             stroke="white"
//                             d="M12 6L12 29"
//                           ></path>
//                           <path
//                             strokeWidth="4"
//                             stroke="white"
//                             d="M21 6V29"
//                           ></path>
//                         </svg>
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 89 80"
//                           className={styles.garbage}
//                         >
//                           <path
//                             fill="white"
//                             d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"
//                           ></path>
//                         </svg>
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className={styles.pagination}>
//             <button
//               onClick={handlePrevPage}
//               disabled={currentPage === 1}
//               className={styles.pageButton}
//             >
//               Previous
//             </button>
//             <span className={styles.pageInfo}>
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={handleNextPage}
//               disabled={currentPage === totalPages}
//               className={styles.pageButton}
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default AgentsPage;
import React, { useEffect, useState } from "react";
import styles from "@/styles/components/superadminsidebar/agentlist.module.css";
import Image from "next/image";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { Modal, Input, message } from "antd";

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
  accountStatus: "active" | "inactive";
}

const AgentsPage: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const agentsPerPage = 10;

  // status modal states
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [pendingAction, setPendingAction] = useState<{
    id: string;
    currentStatus: string;
  } | null>(null);

  // assign manager modal states
  const [assignModalVisible, setAssignModalVisible] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [newAssignedTo, setNewAssignedTo] = useState<string>("");

  const [districtManagers, setDistrictManagers] = useState<any[]>([]);

  // filters
  const [sortBy, setSortBy] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // -------------------- Status Toggle --------------------
  const handleToggleStatus = (id: string, currentStatus: string) => {
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
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          accountStatus: newStatus,
          password: passwordInput,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`Agent status updated to ${newStatus}`);
        setAgents((prevAgents) =>
          prevAgents.map((m) =>
            m._id === id ? { ...m, accountStatus: newStatus } : m
          )
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

  // -------------------- Assign Manager --------------------
  const openAssignModal = (agentId: string, currentAssignedTo: string) => {
    setSelectedAgentId(agentId);
    setNewAssignedTo(currentAssignedTo || "");
    setAssignModalVisible(true);
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
        setAssignModalVisible(false);
        setNewAssignedTo("");
      } else {
        toast.error(data.message || "Failed to assign agent");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const confirmAssign = async () => {
    if (!selectedAgentId) return;
    await handleSaveAssignedTo(selectedAgentId);
  };

  // -------------------- Fetch Data --------------------
  const fetchAgents = async () => {
    try {
      const res = await fetch("/api/getallagents");
      const data = await res.json();
      setAgents(data);
    } catch (err) {
      console.error("Error fetching agents:", err);
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

  // -------------------- Delete --------------------
  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`/api/agent/deleteagent?id=${id}`);
      if (res.status === 200) {
        toast.success("Agent deleted successfully");
        setAgents((prevAgents) => prevAgents.filter((a) => a._id !== id));
      } else {
        toast.error("Failed to delete agent");
      }
    } catch (err) {
      console.error("Error deleting agent:", err);
      toast.error("Error deleting agent (serverside error)");
    }
  };

  // -------------------- Filtering + Sorting --------------------
  const filteredAgents = agents
    .filter((a) => {
      if (statusFilter && a.accountStatus !== statusFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          a.firstName.toLowerCase().includes(q) ||
          a.lastName.toLowerCase().includes(q) ||
          a.email.toLowerCase().includes(q) ||
          a.agentCode.toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.firstName.localeCompare(b.firstName);
      } else if (sortBy === "email") {
        return a.email.localeCompare(b.email);
      }
      return 0;
    });

  const indexOfLastAgent = currentPage * agentsPerPage;
  const indexOfFirstAgent = indexOfLastAgent - agentsPerPage;
  const currentAgents = filteredAgents.slice(
    indexOfFirstAgent,
    indexOfLastAgent
  );
  const totalPages = Math.ceil(filteredAgents.length / agentsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handleResetFilters = () => {
    setSortBy("");
    setStatusFilter("");
    setSearchQuery("");
    setCurrentPage(1);
  };

  // -------------------- JSX --------------------
  return (
    <div className={styles.container}>
      {/* Password Modal */}
      <Modal
        title="Confirm Password"
        open={passwordModalVisible}
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

      {/* Assign Manager Modal */}
      <Modal
        title="Assign Manager"
        open={assignModalVisible}
        onOk={confirmAssign}
        onCancel={() => setAssignModalVisible(false)}
        okText="Save"
        cancelText="Cancel"
        centered
      >
        <select
          className={styles.select}
          value={newAssignedTo}
          onChange={(e) => setNewAssignedTo(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        >
          <option value="">Select Manager</option>
          {districtManagers.map((manager) => (
            <option key={manager._id} value={manager.managerId}>
              {manager.firstName}-{manager.managerId}
            </option>
          ))}
        </select>
      </Modal>

      <h1 className={styles.heading}>All Agents</h1>

      {/* Filter Bar */}
      <div className={styles.filterBar}>
        <div className={styles.leftControls}>
          <select
            className={styles.select}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
          </select>

          <select
            className={styles.select}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button className={styles.resetButton} onClick={handleResetFilters}>
            Reset
          </button>
        </div>
        <div className={styles.rightSearch}>
          <Input.Search
            placeholder="Search...."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.search}
          />
        </div>
      </div>

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
                    <td className={styles.td}>
                      {(currentPage - 1) * agentsPerPage + index + 1}
                    </td>
                    <td className={styles.td}>{agent.agentCode}</td>
                    <td className={styles.td}>
                      {`${agent.firstName} ${agent.lastName}`}
                    </td>
                    <td className={styles.td}>{agent.email}</td>
                    <td className={styles.td}>{agent.district}</td>
                    <td className={styles.td}>{agent.city}</td>
                    <td className={styles.td}>{agent.state}</td>
                    <td className={styles.td}>
                      <div className={styles.assignedToWrapper}>
                        <span>{agent.assignedTo || "Not Assigned"}</span>
                        <button
                          className={styles.editIconBtn}
                          onClick={() =>
                            openAssignModal(
                              agent._id,
                              typeof agent.assignedTo === "string"
                                ? agent.assignedTo
                                : ""
                            )
                          }
                        >
                          <FaEdit color="green" size={16} />
                        </button>
                      </div>
                    </td>

                    <td className={styles.td}>
                      <label className={styles.switch}>
                        <input
                          type="checkbox"
                          checked={agent.accountStatus === "active"}
                          onChange={() =>
                            handleToggleStatus(
                              agent._id,
                              agent.accountStatus || "inactive"
                            )
                          }
                        />
                        <span className={styles.slider}></span>
                      </label>
                    </td>

                    <td className={styles.td}>
                      <button
                        className={styles.binButton}
                        onClick={() => handleDelete(agent._id)}
                      >
                        {/* bin svg same as before */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 39 7"
                          className={styles.binTop}
                        >
                          <line
                            strokeWidth="4"
                            stroke="white"
                            y2="5"
                            x2="39"
                            y1="5"
                          ></line>
                          <line
                            strokeWidth="3"
                            stroke="white"
                            y2="1.5"
                            x2="26.0357"
                            y1="1.5"
                            x1="12"
                          ></line>
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 33 39"
                          className={styles.binBottom}
                        >
                          <mask fill="white" id="path-1-inside-1_8_19">
                            <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
                          </mask>
                          <path
                            mask="url(#path-1-inside-1_8_19)"
                            fill="white"
                            d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                          ></path>
                          <path
                            strokeWidth="4"
                            stroke="white"
                            d="M12 6L12 29"
                          ></path>
                          <path
                            strokeWidth="4"
                            stroke="white"
                            d="M21 6V29"
                          ></path>
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 89 80"
                          className={styles.garbage}
                        >
                          <path
                            fill="white"
                            d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"
                          ></path>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
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
