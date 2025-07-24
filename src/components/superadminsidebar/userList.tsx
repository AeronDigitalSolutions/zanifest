// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/router";
// import logo from "@/assets/logo.png";
// import styles from "@/styles/pages/admin/userlist.module.css";

// function UsersPage() {
//   const router = useRouter();
//   const [users, setUsers] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchUsers = async () => {
//     try {
//       const response = await fetch("/api/users");
//       console.log("Fetch response:", response);
//       if (response.status === 401) {
//         alert("Unauthorized. Please login.");
//         router.push("/adminlogin");
//         return;
//       }

//       const data = await response.json();
//       setUsers(data);
//       console.log("Fetched users:", data);
//     } 
//     catch (error) {
//       console.error("Failed to fetch users:", error);
//       alert("Something went wrong!");
//     } 
//     finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleLogout = () => {
//     console.log("Logged out");
//     router.push("/agentlogin");
//   };

//   return (
//     <div className={styles.container}>
//       {/* <header className={styles.header}>
//         <div className={styles.logoContainer}>
//           <Image src={logo} alt="Logo" width={150} height={45} className={styles.logo} />
//         </div>
//         <div className={styles.desktopOnlyLogout}>
//           <button className={styles.logoutButton} onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       </header> */}

//       <h1 className={styles.heading}>Registered Users</h1>

//       {loading ? (
//         <p>Loading users...</p>
//       ) : (
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th className={styles.th}>Username</th>
//               <th className={styles.th}>Email</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id} className={styles.row}>
//                 <td className={styles.td}>{user.userName}</td>
//                 <td className={styles.td}>{user.email}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default UsersPage;
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import logo from "@/assets/logo.png";
import styles from "@/styles/pages/admin/userlist.module.css";

function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      if (response.status === 401) {
        alert("Unauthorized. Please login.");
        router.push("/adminlogin");
        return;
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogout = () => {
    router.push("/agentlogin");
  };

  return (
    <div className={styles.container}>
      {/* <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Image src={logo} alt="Logo" width={120} height={40} className={styles.logo} />
        </div>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </header> */}

      <h1 className={styles.heading}>Registered Users</h1>

      {loading ? (
        <p className={styles.loadingText}>Loading users...</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Username</th>
                <th className={styles.th}>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className={styles.row}>
                  <td className={styles.td}>{user.userName}</td>
                  <td className={styles.td}>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UsersPage;
