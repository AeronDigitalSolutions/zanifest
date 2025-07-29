
'use client';

import React, { useEffect, useState } from 'react';
import styles from '@/styles/components/superadminsidebar/managerlist.module.css';
import Image from 'next/image';

interface Manager {
  _id: string;
  name: string;
  email: string;
  category: string;
  location: {
    district: string;
    state: string;
  };
  assignedTo?: {
    name: string;
    email: string;
    category: string;
  };
}

export default function ManagersTable() {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const res = await fetch('/api/getmanager');
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
                  <th className={styles.th}>ID</th>
                  <th className={styles.th}>Name</th>
                  <th className={styles.th}>Email</th>
                  <th className={styles.th}>Category</th>
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
                    <td className={styles.td}>{manager.name}</td>
                    <td className={styles.td}>{manager.email}</td>
                    <td className={styles.td}>{manager.category}</td>
                    <td className={styles.td}>{manager.location?.state}</td>
                    <td className={styles.td}>{manager.location?.district}</td>
                    <td className={styles.td}>
                      {manager.assignedTo
                        ? `${manager.assignedTo.name} (${manager.assignedTo.category})`
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
