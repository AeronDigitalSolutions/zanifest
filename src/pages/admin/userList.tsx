import React from "react";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { useRouter } from "next/router";

import styles from "@/styles/pages/admin/userlist.module.css";

function UsersPage({ users }: { users: any[] }) {
  const router= useRouter()
  const handleLogout = () => {
    console.log("Logged out");
    router.push("/agentlogin");
  };
  return (
    
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Image src={logo} alt="Logo" width={150} height={45} className={styles.logo} />
        </div>
      
        <div className={styles.desktopOnlyLogout}>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>
      <h1 className={styles.heading}>Registered Users</h1>
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
              <td className={styles.td}>{user.userName || "-"}</td>
              <td className={styles.td}>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersPage;

export const getServerSideProps = async () => {
  await dbConnect();
  const users = await User.find().select("-password");
  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
  };
};
