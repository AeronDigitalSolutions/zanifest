'use client';

import React, { useEffect, useState } from 'react';
import styles from '@/styles/components/superadminsidebar/managerlist.module.css';
import Image from 'next/image';

interface Manager {
    _id: string;
    managerId: string;
    firstName: string;
    lastName: string;
    email: string;
    category: string;
    city: string;
    district: string;
    state: string;
    accountStatus: 'active' | 'inactive';
    assignedTo?: {
      managerId: string;
      firstName: string;
      lastName: string;
    }
}

export default function ManagersTable() {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchManagers = async () => {
      try {
        const res = await fetch('/api/getallmanagers');
        const data = await res.json();
        setManagers(data);
      } catch (err) {
        console.error('Error fetching managers:', err);
        alert('Something went wrong!');
      } finally {
        setLoading(false);
      }
    };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

      const res = await fetch(`/api/manager/updateAccountStatus?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountStatus: newStatus }),
      });

      const data = await res.json();

      if (data.success) {
        alert(`Manager status updated to ${newStatus}`);
        // ✅ update state immediately
        setManagers((prevManagers) =>
          prevManagers.map((m) =>
            m._id === id ? { ...m, accountStatus: newStatus } : m
          )
        );
      } else {
        alert(data.message || 'Failed to update status');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating manager status');
    }
  };


  useEffect(() => {
    fetchManagers();
  }, []);

 const handleDelete = async (id: string) => {
  try {
    //get response from calling api
    const res = await fetch(`/api/manager/deletemanager?id=${id}`, {
      method: 'DELETE',
    });

    //store json type response in data variable
    const data = await res.json();

    if (data.success) {
      alert('Manager deleted successfully');
      // fetchManagers(); // refresh table after delete

          // ✅ Update state immediately so UI refreshes
    setManagers((prevManagers) => prevManagers.filter((m) => m._id !== id));
    } 
    
    else {
      alert(data.message);
    }
  } 
  
  catch (err) {
    console.error(err);
    alert('Error deleting manager');
  }
};


  const totalPages = Math.ceil(managers.length / itemsPerPage);
  const paginatedManagers = managers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>All Managers</h1>

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
      ) : (
        <>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>S.No</th>
                  <th className={styles.th}>Employee Code</th>
                  <th className={styles.th}>Name</th>
                  <th className={styles.th}>Email</th>
                  <th className={styles.th}>Category</th>
                  <th className={styles.th}>City</th>
                  <th className={styles.th}>State</th>
                  <th className={styles.th}>District</th>
                  <th className={styles.th}>Assigned To</th>
                  <th className={styles.th}>Status</th>
                  <th className={styles.th}>Delete</th>
                </tr>
              </thead>
              <tbody>
                {paginatedManagers.map((manager, index) => (
                  <tr key={manager._id} className={styles.row}>
                    <td className={styles.td}>
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className={styles.td}>{manager.managerId}</td>
                    <td className={styles.td}>{`${manager.firstName} ${manager.lastName}`}</td>
                    <td className={styles.td}>{manager.email}</td>
                    <td className={styles.td}>{`${manager.category.charAt(0).toUpperCase() + manager.category.slice(1)}` + " " + "Manager"}</td>
                    <td className={styles.td}>{manager.city}</td>
                    <td className={styles.td}>{manager.state}</td>
                    <td className={styles.td}>{manager.district}</td>
                    <td className={styles.td}>
                      {/* fix This expression is not callable.
Type 'String' has no call signatures.

You need to concatenate the strings using the + operator or template literals, not by placing them next to each other. */}
                      {manager.assignedTo
                        ? `${manager.assignedTo.managerId}`
                        : '—'}
                    </td>
                    <td className={styles.td}>
                      <button
                        className={`${styles.editButton} ${
                          manager.accountStatus === 'active' ? styles.active : styles.inactive
                        }`}
                        onClick={() => handleToggleStatus(manager._id, manager.accountStatus)}
                      >
                        {manager.accountStatus === 'active' ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className={styles.td}>
                      <button className={styles.deleteButton} onClick={()=> handleDelete(manager._id)}>Delete</button>   
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.pageButton}
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <span className={styles.pageInfo}>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className={styles.pageButton}
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
