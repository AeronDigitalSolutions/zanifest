import React, { useEffect, useState } from 'react';
import styles from '@/styles/components/superadminsidebar/adminlist.module.css';
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Modal, Input, message } from "antd";

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

  const totalPages = Math.ceil(admins.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentAdmins = admins.slice(startIndex, startIndex + ITEMS_PER_PAGE);

const [passwordModalVisible, setPasswordModalVisible] = useState(false);
const [passwordInput, setPasswordInput] = useState("");
const [pendingAction, setPendingAction] = useState<{ id: string; currentStatus: string } | null>(null);

  const fetchAdmins = async () => {
      try {
        const res = await fetch('/api/getadmin');
        const data = await res.json();
        setAdmins(data);
      } 
      catch (error) {
        console.error('Failed to fetch admins:', error);
        message.error("Failed to fetch admins");
      } 
      finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // const handleToggleStatus = async (id: string, currentStatus: string) => {
  //   try {
  //     const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
  //     console.log("Toggling status for admin ID:", id, "from", currentStatus, "to", newStatus);


  //     // ✅ ask SUPERADMIN to confirm password
  //     const password = prompt("Enter your password to confirm status change:");
  //     // console.log("Password entered:", password);
  //     if (!password) return; // user cancelled

  //     const token = localStorage.getItem("token"); // or cookie if you're storing it there
  //     // console.log("Using token:", token);

  //       const res = await fetch(`/api/admin/updateAccountStatus?id=${id}`, {
  //         method: 'PATCH',
  //         headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}` },
  //         body: JSON.stringify({ accountStatus: newStatus, password }),
  //       });

  //     const data = await res.json();

  //     if (data.success) {
  //       toast.success(`Admin status updated to ${newStatus}`);
  //       // ✅ update state immediately
  //       setAdmins((prevAdmins) =>
  //         prevAdmins.map((m) =>
  //           m._id === id ? { ...m, accountStatus: newStatus } : m
  //         )
  //       );
  //     } 
  //     else {
  //       toast.error(data.message || 'Failed to update status');
  //     }
  //   } 
  //   catch (err) {
  //     console.error(err);
  //     toast.error('Error updating status');
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

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleDelete = async (id: string) => {
    try{
      const res = await axios.delete(`/api/admin/deleteadmin?id=${id}`);

      if(res.status ===200){
        message.success("admin deleted successfully");

        //refresh table after deleting
        fetchAdmins();

        //to update the state immediately so that UI refreshes
        setAdmins((prevAdmins) => prevAdmins.filter((a) => a._id!==id));
      }

      else{
        message.error("Failed to delete admin");
      }
    }

    catch(error){
      console.error('Error deleting admin:', error);
      alert('Error deleting admin');
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

      <h1 className={styles.heading}>Admin List</h1>

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
      ) : admins.length === 0 ? (
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
                    <td className={styles.td}>{`${admin.userFirstName}` +" "+ `${admin.userLastName}`}</td>
                    <td className={styles.td}>{admin.email}</td>
                    <td className={styles.td}>{admin.role}</td>
                    <td className={styles.td}>
                      {admin.role==="admin" ? 
                      <button
                        className={`${styles.editButton} ${
                          (admin.accountStatus ?? 'active') === 'active' ? styles.active : styles.inactive
                        }`}
                        onClick={() => handleToggleStatus(admin._id, admin.accountStatus ?? 'active')}
                      >
                        {(admin.accountStatus ?? 'active') === 'active' ? 'Active' : 'Inactive'}
                      </button>
                      : 
                      <span>N/A</span>}
                    </td>
                    <td className={styles.td}>
                      <button onClick={()=> handleDelete(admin._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
}
