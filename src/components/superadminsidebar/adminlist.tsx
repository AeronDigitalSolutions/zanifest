// import React, { useEffect, useState } from 'react';
// import styles from '@/styles/components/superadminsidebar/adminlist.module.css';
// import Image from 'next/image';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import { Modal, Input, message } from "antd";

// type Admin = {
//   _id: string;
//   userFirstName: string;
//   userLastName: string;
//   email: string;
//   role: string;
//   accountStatus?: 'active' | 'inactive';
// };

// const ITEMS_PER_PAGE = 5;

// export default function AdminList() {
//   const [admins, setAdmins] = useState<Admin[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);

//   const totalPages = Math.ceil(admins.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const currentAdmins = admins.slice(startIndex, startIndex + ITEMS_PER_PAGE);

// const [passwordModalVisible, setPasswordModalVisible] = useState(false);
// const [passwordInput, setPasswordInput] = useState("");
// const [pendingAction, setPendingAction] = useState<{ id: string; currentStatus: string } | null>(null);

//   const fetchAdmins = async () => {
//       try {
//         const res = await fetch('/api/getadmin');
//         const data = await res.json();
//         setAdmins(data);
//       } 
//       catch (error) {
//         console.error('Failed to fetch admins:', error);
//         message.error("Failed to fetch admins");
//       } 
//       finally {
//         setLoading(false);
//       }
//     };

//   useEffect(() => {
//     fetchAdmins();
//   }, []);

//   // const handleToggleStatus = async (id: string, currentStatus: string) => {
//   //   try {
//   //     const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
//   //     console.log("Toggling status for admin ID:", id, "from", currentStatus, "to", newStatus);


//   //     // ✅ ask SUPERADMIN to confirm password
//   //     const password = prompt("Enter your password to confirm status change:");
//   //     // console.log("Password entered:", password);
//   //     if (!password) return; // user cancelled

//   //     const token = localStorage.getItem("token"); // or cookie if you're storing it there
//   //     // console.log("Using token:", token);

//   //       const res = await fetch(`/api/admin/updateAccountStatus?id=${id}`, {
//   //         method: 'PATCH',
//   //         headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}` },
//   //         body: JSON.stringify({ accountStatus: newStatus, password }),
//   //       });

//   //     const data = await res.json();

//   //     if (data.success) {
//   //       toast.success(`Admin status updated to ${newStatus}`);
//   //       // ✅ update state immediately
//   //       setAdmins((prevAdmins) =>
//   //         prevAdmins.map((m) =>
//   //           m._id === id ? { ...m, accountStatus: newStatus } : m
//   //         )
//   //       );
//   //     } 
//   //     else {
//   //       toast.error(data.message || 'Failed to update status');
//   //     }
//   //   } 
//   //   catch (err) {
//   //     console.error(err);
//   //     toast.error('Error updating status');
//   //   }
//   // };

//   const handleToggleStatus = (id: string, currentStatus: string) => {
//   // open modal instead of prompt
//   setPendingAction({ id, currentStatus });
//   setPasswordModalVisible(true);
// };

// const confirmToggleStatus = async () => {
//   if (!passwordInput) {
//     message.warning("Please enter your password");
//     return;
//   }

//   try {
//     const { id, currentStatus } = pendingAction!;
//     const newStatus = currentStatus === "active" ? "inactive" : "active";

//     const token = localStorage.getItem("token");

//     const res = await fetch(`/api/admin/updateAccountStatus?id=${id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//       body: JSON.stringify({ accountStatus: newStatus, password: passwordInput }),
//     });

//     const data = await res.json();

//     if (data.success) {
//       toast.success(`Admin status updated to ${newStatus}`);
//       setAdmins((prevAdmins) =>
//         prevAdmins.map((m) => (m._id === id ? { ...m, accountStatus: newStatus } : m))
//       );
//     } else {
//       toast.error(data.message || "Failed to update status");
//     }
//   } catch (err) {
//     console.error(err);
//     toast.error("Error updating status");
//   } finally {
//     setPasswordModalVisible(false);
//     setPasswordInput("");
//     setPendingAction(null);
//   }
// };

//   const handlePrevPage = () => {
//     setCurrentPage((prev) => Math.max(prev - 1, 1));
//   };

//   const handleNextPage = () => {
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   };

//   const handleDelete = async (id: string) => {
//     try{
//       const res = await axios.delete(`/api/admin/deleteadmin?id=${id}`);

//       if(res.status ===200){
//         message.success("admin deleted successfully");

//         //refresh table after deleting
//         fetchAdmins();

//         //to update the state immediately so that UI refreshes
//         setAdmins((prevAdmins) => prevAdmins.filter((a) => a._id!==id));
//       }

//       else{
//         message.error("Failed to delete admin");
//       }
//     }

//     catch(error){
//       console.error('Error deleting admin:', error);
//       alert('Error deleting admin');
//     }

//   }

//   return (
//     <div className={styles.container}>
//       <Modal
//         title="Confirm Password"
//         visible={passwordModalVisible}
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

//       <h1 className={styles.heading}>Admin List</h1>

//       {loading ? (
//         <div className={styles.loaderWrapper}>
//           <Image
//             src={require('@/assets/Material wave loading.gif')}
//             alt="Loading..."
//             width={100}
//             height={100}
//             className={styles.logoAnimation}
//           />
//         </div>
//       ) : admins.length === 0 ? (
//         <p className={styles.noData}>No admins found.</p>
//       ) : (
//         <>
//           <div className={styles.tableWrapper}>
//             <table className={styles.table}>
//               <thead>
//                 <tr>
//                   <th className={styles.th}>S.No</th>
//                   <th className={styles.th}>Name</th>
//                   <th className={styles.th}>Email</th>
//                   <th className={styles.th}>Role</th>
//                   <th className={styles.th}>Status</th>
//                   <th className={styles.th}>Delete</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentAdmins.map((admin, index) => (
//                   <tr key={admin._id} className={styles.row}>
//                     <td className={styles.td}>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
//                     <td className={styles.td}>{`${admin.userFirstName}` +" "+ `${admin.userLastName}`}</td>
//                     <td className={styles.td}>{admin.email}</td>
//                     <td className={styles.td}>{admin.role}</td>
//                     <td className={styles.td}>
//                       {admin.role==="admin" ? 
//                       <button
//                         className={`${styles.editButton} ${
//                           (admin.accountStatus ?? 'active') === 'active' ? styles.active : styles.inactive
//                         }`}
//                         onClick={() => handleToggleStatus(admin._id, admin.accountStatus ?? 'active')}
//                       >
//                         {(admin.accountStatus ?? 'active') === 'active' ? 'Active' : 'Inactive'}
//                       </button>
//                       : 
//                       <span>N/A</span>}
//                     </td>
//                     <td className={styles.td}>
//                       <button onClick={()=> handleDelete(admin._id)}>
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

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
// }


import React, { useEffect, useState } from 'react';
import styles from '@/styles/components/superadminsidebar/adminlist.module.css';
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Modal, Input, message, Select } from "antd";

const { Option } = Select;

type Admin = {
  _id: string;
  userFirstName: string;
  userLastName: string;
  email: string;
  role: string;
  accountStatus?: 'active' | 'inactive';
};

const ITEMS_PER_PAGE = 5;

export default function AdminList() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");

  const totalPages = Math.ceil(admins.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [pendingAction, setPendingAction] = useState<{ id: string; currentStatus: string } | null>(null);

  const fetchAdmins = async () => {
    try {
      const res = await fetch('/api/getadmin');
      const data = await res.json();
      setAdmins(data);
    } catch (error) {
      console.error('Failed to fetch admins:', error);
      message.error("Failed to fetch admins");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

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

      const res = await fetch(`/api/admin/updateAccountStatus?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ accountStatus: newStatus, password: passwordInput }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(`Admin status updated to ${newStatus}`);
        setAdmins((prevAdmins) =>
          prevAdmins.map((m) => (m._id === id ? { ...m, accountStatus: newStatus } : m))
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

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`/api/admin/deleteadmin?id=${id}`);

      if (res.status === 200) {
        message.success("Admin deleted successfully");
        fetchAdmins();
        setAdmins((prevAdmins) => prevAdmins.filter((a) => a._id !== id));
      } else {
        message.error("Failed to delete admin");
      }
    } catch (error) {
      console.error('Error deleting admin:', error);
      alert('Error deleting admin');
    }
  };

  // ✅ Reset filters + search + sort
  const handleReset = () => {
    setSearchTerm("");
    setRoleFilter("all");
    setStatusFilter("all");
    setSortBy("name");
    setCurrentPage(1);
  };

  // ✅ Filtering + Searching + Sorting
  const filteredAdmins = admins
    .filter((admin) =>
      `${admin.userFirstName} ${admin.userLastName} ${admin.email} ${admin.role}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .filter((admin) => roleFilter === "all" || admin.role === roleFilter)
    .filter((admin) => {
      if (statusFilter === "all") return true;

      if (statusFilter === "active") {
        return admin.role === "admin" && admin.accountStatus === "active";
      }

      if (statusFilter === "inactive") {
        return admin.role === "admin" && admin.accountStatus === "inactive";
      }

      if (statusFilter === "N/A") {
        return admin.role !== "admin";
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.userFirstName.localeCompare(b.userFirstName);
      if (sortBy === "email") return a.email.localeCompare(b.email);
      return a.role.localeCompare(b.role);
    });

  const currentAdmins = filteredAdmins.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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

      <h1 className={styles.heading}>Admin List</h1>

      {/* ✅ Filters + Search */}
      <div className={styles.topBar}>
        <div className={styles.leftFilters}>
          {/* Sort */}
          <Select value={sortBy} onChange={setSortBy} className={styles.select}>
            <Option value="name">Sort by Name(az)</Option>
            <Option value="email">Sort by Email</Option>
            <Option value="role">Sort by Role</Option>
          </Select>

          {/* Role Filter */}
          <Select value={roleFilter} onChange={setRoleFilter} className={styles.select}>
            <Option value="all">All Roles</Option>
            <Option value="admin">Admin</Option>
            <Option value="superadmin">SuperAdmin</Option>
          </Select>

          {/* Status Filter */}
          <Select value={statusFilter} onChange={setStatusFilter} className={styles.select}>
            <Option value="all">All Status</Option>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
            <Option value="N/A">N/A</Option>
          </Select>

          <button onClick={handleReset} className={styles.resetButton}>
            Reset
          </button>
        </div>

        <div className={styles.rightSearch}>
          <Input.Search
            placeholder="Search by name, email, or role"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.search}
          />
        </div>
      </div>

      {loading ? (
        <div className={styles.loaderWrapper}>
          <Image
            src={require('@/assets/Material wave loading.gif')}
            alt="Loading..."
            width={100}
            height={100}
            className={styles.logoAnimation}
          />
        </div>
      ) : currentAdmins.length === 0 ? (
        <p className={styles.noData}>No admins found.</p>
      ) : (
        <>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>S.No</th>
                  <th className={styles.th}>Name</th>
                  <th className={styles.th}>Email</th>
                  <th className={styles.th}>Role</th>
                  <th className={styles.th}>Status</th>
                  <th className={styles.th}>Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentAdmins.map((admin, index) => (
                  <tr key={admin._id} className={styles.row}>
                    <td className={styles.td}>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                    <td className={styles.td}>{`${admin.userFirstName} ${admin.userLastName}`}</td>
                    <td className={styles.td}>{admin.email}</td>
                    <td className={styles.td}>{admin.role}</td>
                    <td className={styles.td}>
                      {admin.role === "admin" ? (
                        <button
                          className={`${styles.statusButton} ${(admin.accountStatus ?? "inactive") === "active" ? styles.active : styles.inactive
                            }`}
                          onClick={() => handleToggleStatus(admin._id, admin.accountStatus ?? "inactive")}
                        >
                          {(admin.accountStatus ?? "inactive") === "active" ? "Active" : "Inactive"}
                        </button>
                      ) : (
                        <span className={styles.naStatus}>N/A</span>
                      )}
                    </td>
                    <td className={styles.td}>
                      <button className={styles.binButton} onClick={() => handleDelete(admin._id)}>
                        {/* Trash bin SVG */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 39 7" className={styles.binTop}>
                          <line strokeWidth="4" stroke="white" y2="5" x2="39" y1="5"></line>
                          <line strokeWidth="3" stroke="white" y2="1.5" x2="26.0357" y1="1.5" x1="12"></line>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 33 39" className={styles.binBottom}>
                          <mask fill="white" id="path-1-inside-1_8_19">
                            <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
                          </mask>
                          <path
                            mask="url(#path-1-inside-1_8_19)"
                            fill="white"
                            d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                          ></path>
                          <path strokeWidth="4" stroke="white" d="M12 6L12 29"></path>
                          <path strokeWidth="4" stroke="white" d="M21 6V29"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 89 80" className={styles.garbage}>
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

          <div className={styles.pagination}>
            <button onClick={handlePrevPage} disabled={currentPage === 1} className={styles.pageButton}>
              Previous
            </button>
            <span className={styles.pageInfo}>Page {currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className={styles.pageButton}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
