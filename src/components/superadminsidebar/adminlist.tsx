
// import React, { useEffect, useState } from 'react';
// import styles from '@/styles/components/superadminsidebar/adminlist.module.css';
// import Image from 'next/image';


// type Admin = {
//   _id: string;
//   userName: string;
//   email: string;
//   role: string;
// };

// export default function AdminList() {
//   const [admins, setAdmins] = useState<Admin[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAdmins = async () => {
//       try {
//         const res = await fetch('/api/getadmin');
//         const data = await res.json();
//         setAdmins(data);
//       } catch (error) {
//         console.error('Failed to fetch admins:', error);
//         alert('Something went wrong!');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAdmins();
//   }, []);

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.heading}>Admin List</h1>

//       {/* {loading ? (
//         <p className={styles.loading}>Loading admins...</p>
//       ) : admins.length === 0 ? (
//         <p className={styles.noData}>No admins found.</p>
//       ) : ( */}


// {loading ? (
//   <div className={styles.loaderWrapper}>
//     <Image
//             src={require("@/assets/Material wave loading.gif")}
//       alt="Loading..."
//       width={100}
//       height={100}
//       className={styles.logoAnimation}
//     />
//   </div>
// ) : admins.length === 0 ? (
//   <p className={styles.noData}>No admins found.</p>
// ) : (

//         <div className={styles.tableWrapper}>
//           <table className={styles.table}>
//             <thead>
//               <tr>
//                 <th className={styles.th}>Name</th>
//                 <th className={styles.th}>Email</th>
//                 <th className={styles.th}>Role</th>
//               </tr>
//             </thead>
//             <tbody>
//               {admins.map((admin) => (
//                 <tr key={admin._id} className={styles.row}>
//                   <td className={styles.td}>{admin.userName}</td>
//                   <td className={styles.td}>{admin.email}</td>
//                   <td className={styles.td}>{admin.role}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import styles from '@/styles/components/superadminsidebar/adminlist.module.css';
import Image from 'next/image';

type Admin = {
  _id: string;
  userName: string;
  email: string;
  role: string;
};

const ITEMS_PER_PAGE = 5;

export default function AdminList() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(admins.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentAdmins = admins.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className={styles.container}>
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
                  <th className={styles.th}>Name</th>
                  <th className={styles.th}>Email</th>
                  <th className={styles.th}>Role</th>
                </tr>
              </thead>
              <tbody>
                {currentAdmins.map((admin) => (
                  <tr key={admin._id} className={styles.row}>
                    <td className={styles.td}>{admin.userName}</td>
                    <td className={styles.td}>{admin.email}</td>
                    <td className={styles.td}>{admin.role}</td>
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
