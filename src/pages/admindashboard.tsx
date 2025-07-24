"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import CreateAdmin from "@/components/superadminsidebar/createadmin";
import CreateManager from "@/components/superadminsidebar/createmanager";
import ManagerList from "@/components/superadminsidebar/managerlist";
import UserList from "@/components/superadminsidebar/userList";
import CreateAgent from "@/components/superadminsidebar/createagent";
import ChangePassword from "@/components/superadminsidebar/changepasswords";
import ResetPassword from "@/components/superadminsidebar/resetpassword";
import styles from "@/styles/pages/admindashboard.module.css";
// import withAuth from "@/lib/withAuth";
import { useAdmin } from "@/lib/hooks/useAdmin";


import {
  FiUsers,
  FiUserPlus,
  FiKey,
  FiLock,
  FiList,
  FiMenu,
  FiX,
} from "react-icons/fi";
import axios from "axios";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

   const { admin, loading } = useAdmin();
   console.log("Admin data:", admin?.userName);

     const adminName = typeof window !== "undefined" ? localStorage.getItem("adminName") : null;


   const handleLogout = () => {
    try{
       axios.post("/api/admin/logout");
       console.log("logout")
      localStorage.removeItem("adminToken");
      window.location.href = "/"; // Redirect to login page after logout

    }
    catch(error){
      console.error("Logout failed:", error);

    }
  };


  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <header className={styles.header}>
        <h1>Welcome, {admin?.userName ?? "Admin"}</h1>
        <h1>  {adminName}</h1>
        <div className={styles.logoContainer}>
          <Image
            src={logo}
            alt="Logo"
            width={130}
            height={40}
            className={styles.logo}
          />
        </div>
        <button
          className={styles.menuToggle}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
        <div className={styles.desktopOnlyLogout}>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Main Area */}
      <div className={styles.mainArea}>
        <aside
          className={`${styles.sidebar} ${
            sidebarOpen ? styles.sidebarMobile : ""
          }`}
        >
          <p className={styles.sectionTitle}>Menu</p>
          <ul className={styles.menu}>
            <li
              onClick={() => setActiveSection("dashboard")}
              className={styles.menuItem}
            >
              <span className={styles.iconLabel}>
                <FiUsers className={styles.icon} />
                <span className={styles.label}>Dashboard</span>
              </span>
            </li>
            <p className={styles.sectionTitle}>Create</p>

          
            <li
              onClick={() => setActiveSection("createManager")}
              className={styles.menuItem}
            >
              <span className={styles.iconLabel}>
                <FiUserPlus className={styles.icon} />
                <span className={styles.label}>Create Manager</span>
              </span>
            </li>
            <li
              onClick={() => setActiveSection("createAgent")}
              className={styles.menuItem}
            >
              <span className={styles.iconLabel}>
                <FiUserPlus className={styles.icon} />
                <span className={styles.label}>Create Agent</span>
              </span>
            </li>
            <p className={styles.sectionTitle}>List</p>

            
            <li className={styles.menuItem}
            onClick={() => setActiveSection("managerList")}>
              <span className={styles.iconLabel}>
                <FiList className={styles.icon} />
                <span className={styles.label}>Manager List</span>
              </span>
            </li>
            <li className={styles.menuItem}>
              <span className={styles.iconLabel}>
                <FiList className={styles.icon} />
                <span className={styles.label}>Agent List</span>
              </span>
            </li>
            <li 
            className={styles.menuItem}
            onClick={() => setActiveSection("userList")}>
              <span className={styles.iconLabel}>
                <FiList className={styles.icon} />
                <span className={styles.label}>User List</span>
              </span>
            </li>
            <p className={styles.sectionTitle}>Security</p>
            <li
              onClick={() => setActiveSection("resetpassword")}
              className={styles.menuItem}
            >
              <span className={styles.iconLabel}>
                <FiLock className={styles.icon} />
                <span className={styles.label}>Reset password</span>
              </span>
            </li>

            <li
              onClick={() => setActiveSection("changepassword")}
              className={styles.menuItem}
            >
              <span className={styles.iconLabel}>
                <FiLock className={styles.icon} />
                <span className={styles.label}>Change Password</span>
              </span>
            </li>
          </ul>

          <div className={styles.mobileOnlyLogout}>
            <button className={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className={styles.mainContent}>
        
             {activeSection === "dashboard" && (
            <div className={styles.dashboardCards}>
              <div className={styles.card}>
                <FiUsers size={32} className={styles.cardIcon} />
                <p className={styles.cardTitle}>Number of Admins</p>
                <p className={styles.cardValue}>5</p>
              </div>
              <div className={styles.card}>
                <FiUserPlus size={32} className={styles.cardIcon} />
                <p className={styles.cardTitle}>State Managers</p>
                <p className={styles.cardValue}>12</p>
              </div>
              <div className={styles.card}>
                <FiUsers size={32} className={styles.cardIcon} />
                <p className={styles.cardTitle}>District Managers</p>
                <p className={styles.cardValue}>48</p>
              </div>
              <div className={styles.card}>
                <FiUserPlus size={32} className={styles.cardIcon} />
                <p className={styles.cardTitle}>Agents</p>
                <p className={styles.cardValue}>105</p>
              </div>
            </div>
          )}
          {activeSection === "createAdmin" && <CreateAdmin />}
          {activeSection === "createManager" && <CreateManager />}
          {activeSection === "createAgent" && <CreateAgent />}
          {activeSection === "changepassword" && <ChangePassword />}
          {activeSection === "resetpassword" && <ResetPassword />}
          {activeSection === "userList" && <UserList />}
          {activeSection === "managerList" && <ManagerList />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

