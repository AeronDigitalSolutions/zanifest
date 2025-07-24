
import React, { useEffect, useState } from 'react';
import styles from '@/styles/components/superadminsidebar/adminlist.module.css';

type Admin = {
  _id: string;
  userName: string;
  email: string;
  role: string;
};

export default function AdminList() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await fetch('/api/getadmin');
        const data = await res.json();
        setAdmins(data);
      } catch (error) {
        console.error('Failed to fetch admins:', error);
        alert('Something went wrong!');
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Admin List</h1>

      {loading ? (
        <p className={styles.loading}>Loading admins...</p>
      ) : admins.length === 0 ? (
        <p className={styles.noData}>No admins found.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>Email</th>
                <th className={styles.th}>Role</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin._id} className={styles.row}>
                  <td className={styles.td}>{admin.userName}</td>
                  <td className={styles.td}>{admin.email}</td>
                  <td className={styles.td}>{admin.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
