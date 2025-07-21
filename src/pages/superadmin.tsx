"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import CreateAdmin from "@/components/superadminsidebar/createadmin";
import CreateManager from "@/components/superadminsidebar/createmanager";
import CreateAgent from "@/components/superadminsidebar/createagent";
import AdminList from "@/components/superadminsidebar/adminlist";
import ManagerList from "@/components/superadminsidebar/managerlist";
import AgentList from "@/components/superadminsidebar/agentlist";
import { useRouter } from "next/navigation";
import styles from "@/styles/pages/admindashboard.module.css";
import {
  FiUserPlus,
  FiUsers,
  FiKey,
  FiLock,
  FiList,
} from "react-icons/fi";

const AdminDashboard = () => {
  const handleLogout = () => {
    console.log("Logged out");
  };
const router = useRouter();
const [activeSection, setActiveSection] = useState("dashboard");
  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Image
            src={logo}
            alt="Logo"
            width={130}
            height={40}
            className={styles.logo}
          />
        </div>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </header>

      {/* Sidebar + Main */}
      <div className={styles.container}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <ul className={styles.navList}>
            <li><FiUserPlus />dashboard</li>
              <li onClick={() => setActiveSection("createAdmin")}><FiUserPlus /> Create Admin</li>
              <li onClick={() => setActiveSection("createManager")}><FiUserPlus /> Create Manager</li>

            <li onClick={() => setActiveSection("createAgent")}><FiUserPlus /> Create Agent</li>
            <li onClick={() => setActiveSection("adminList")}><FiList /> Admin List</li>
            <li onClick={()=> setActiveSection("managerlist")}><FiList /> Manager List</li>
            <li  onClick={()=> setActiveSection("agentlist")}><FiList /> Agents List</li>
            <li><FiKey /> Reset Password</li>
            <li><FiLock /> Change Password</li>
          </ul>
        </aside>

        {/* Main Content */}
       <main className={styles.mainContent}>
  {activeSection === "dashboard" && (
    <>
      <div className={styles.card}>Number of Admins: 5</div>
      <div className={styles.card}>State Managers: 12</div>
      <div className={styles.card}>District Managers: 48</div>
      <div className={styles.card}>Agents: 105</div>

    </>
  )}

  {activeSection === "createAdmin" && <CreateAdmin />}
  {activeSection === "createManager" && <CreateManager />}
  {activeSection === "createAgent" && <CreateAgent />}
  {activeSection === "adminList" && <AdminList />}
  {activeSection === "managerlist" && <ManagerList />}
  {activeSection === "agentlist" && <AgentList />}
</main>
      </div>
    </div>
  );
};

export default AdminDashboard;
