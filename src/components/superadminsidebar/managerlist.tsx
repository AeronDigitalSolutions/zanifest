// 'use client';

// import React, { useEffect, useState } from 'react';
// import styles from '@/styles/components/superadminsidebar/managerlist.module.css';

// interface Manager {
//   _id: string;
//   name: string;
//   email: string;
//   category: string;
//   location: {
//     district: string;
//     state: string;
//   };
//   assignedTo?: {
//     name: string;
//     email: string;
//     category: string;
//   };
// }

// export default function ManagersTable() {
//   const [managers, setManagers] = useState<Manager[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchManagers = async () => {
//       try {
//         const res = await fetch('/api/getmanager');
//         const data = await res.json();
//         setManagers(data);
//       } catch (err) {
//         console.error('Error fetching managers:', err);
//         alert('Something went wrong!');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchManagers();
//   }, []);

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.heading}>All Managers</h1>

//       {loading ? (
//         <p className={styles.loading}>Loading managers...</p>
//       ) : (
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th className={styles.th}>ID</th>
//               <th className={styles.th}>Name</th>
//               <th className={styles.th}>Email</th>
//               <th className={styles.th}>Category</th>
//               <th className={styles.th}>State</th>
//               <th className={styles.th}>District</th>
//               <th className={styles.th}>Assigned To</th>
//             </tr>
//           </thead>
//           <tbody>
//             {managers.map((manager, index) => (
//               <tr key={manager._id} className={styles.row}>
//                 <td className={styles.td}>{index + 1}</td>
//                 <td className={styles.td}>{manager.name}</td>
//                 <td className={styles.td}>{manager.email}</td>
//                 <td className={styles.td}>{manager.category}</td>
//                 <td className={styles.td}>{manager.location?.state}</td>
//                 <td className={styles.td}>{manager.location?.district}</td>
//                 <td className={styles.td}>
//                   {manager.assignedTo
//                     ? `${manager.assignedTo.name} (${manager.assignedTo.category})`
//                     : '—'}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }
'use client';

import React, { useEffect, useState } from 'react';
import styles from '@/styles/components/superadminsidebar/managerlist.module.css';

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

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>All Managers</h1>

      {loading ? (
        <p className={styles.loading}>Loading managers...</p>
      ) : (
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
              {managers.map((manager, index) => (
                <tr key={manager._id} className={styles.row}>
                  <td className={styles.td}>{index + 1}</td>
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
      )}
    </div>
  );
}
