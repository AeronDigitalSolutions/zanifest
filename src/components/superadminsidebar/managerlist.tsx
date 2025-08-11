
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

  useEffect(() => {
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

    fetchManagers();
  }, []);

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
