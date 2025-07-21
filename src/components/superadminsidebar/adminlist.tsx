// pages/adminList.tsx
import { useEffect, useState } from 'react';

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
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin List</h1>

      {loading ? (
        <p>Loading...</p>
      ) : admins.length === 0 ? (
        <p>No admins found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Name</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Email</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Role</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{admin.userName}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{admin.email}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{admin.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
