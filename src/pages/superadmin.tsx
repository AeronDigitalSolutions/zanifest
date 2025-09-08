"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import CreateAdmin from "@/components/superadminsidebar/createadmin";
import CreateManager from "@/components/superadminsidebar/createmanager";
import CreateAgent from "@/components/superadminsidebar/createagent";
import AdminList from "@/components/superadminsidebar/adminlist";
import UserList from "@/components/superadminsidebar/userList";
import ManagerList from "@/components/superadminsidebar/managerlist";
import AgentList from "@/components/superadminsidebar/agentlist";
import ChangePassword from "@/components/superadminsidebar/changepasswords";
import ResetPassword from "@/components/superadminsidebar/resetpassword";
import styles from "@/styles/pages/admindashboard.module.css";
import { useAdmin } from "@/lib/hooks/useAdmin";
import axios from "axios";

import {
  FiUsers,
  FiUserPlus,
  FiKey,
  FiLock,
  FiList,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useRouter } from "next/router";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminCount, setAdminCount] = useState(0);
  const[adminData, setAdminData]=useState<any>(null);
  const [load, setLoad] = useState(false);
  const [agentCount, setAgentCount] = useState(0);
  const [stateManagerCount, setStateManagerCount] = useState(0);
  const [districtManagerCount, setDistrictManagerCount] = useState(0);

  const router = useRouter();
  const { admin, loading } = useAdmin();
  console.log("user first name", admin?.userFirstName);

  const handleLogout = async () => {
    try {
      await axios.post("/api/admin/logout");
      localStorage.removeItem("adminToken");
      router.replace("/adminlogin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const fetchAdminCount = async () => {
      const res = await fetch("/api/getadmin");
      const data = await res.json();
      setAdminCount(data.length);
    };
    fetchAdminCount();
  }, []);

  useEffect(() => {
    const fetchAgentCount = async () => {
      const res = await fetch("/api/getallagents");
      console.log("res for count of agents: ", res);
      const data = await res.json();
      console.log("data for agent count:", data);
      console.log("Data length for agent count:", data.length);
      setAgentCount(data.length);
    };
    fetchAgentCount();
  }, []);

  useEffect(() => {
  const fetchManagerCounts = async () => {
    try {
      const res = await fetch("/api/getallmanagers");
      const managers = await res.json();
      console.log("Fetched managers:", managers);

      setStateManagerCount(
        managers.filter((m: { category: string }) => m.category === "state").length
      );
      setDistrictManagerCount(
        managers.filter((m: { category: string }) => m.category === "district").length
      );
    } catch (err) {
      console.error("Error fetching managers:", err);
    }
  };
  fetchManagerCounts();
}, []);


    // profile edit 
  useEffect(() => {
    if (activeSection === "profileEdit") {
      setLoad(true);
      axios
        .get("/api/admin/getadmindetails", {
          // Not needed if cookie is httpOnly; else use Authorization
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        })
        .then((res) => setAdminData(res.data))
        .catch((err) => console.error("Error fetching admin:", err))
        .finally(() => setLoad(false));
    }
  }, [activeSection]);

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <header className={styles.header}>
        <h1>Welcome, {admin?.userFirstName ?? "SuperAdmin"}</h1>
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

      {/* Main Areas */}
      <div className={styles.mainArea}>
        {/* Sidebar */}
        <aside
          className={`${styles.sidebar} ${
            sidebarOpen ? styles.sidebarMobile : ""
          }`}
        >
          <p className={styles.sectionTitle}>Menu</p>
          <ul className={styles.menu}>
            <li
              onClick={() => {
                setActiveSection("dashboard");
                setSidebarOpen(false);
              }}
              className={`${styles.menuItem} ${
                activeSection === "dashboard" ? styles.activeMenu : ""
              }`}
            >
              <span className={styles.iconLabel}>
                <FiUsers className={styles.icon} />
                <span className={styles.label}>Dashboard</span>
              </span>
            </li>

            <p className={styles.sectionTitle}>Create</p>

            <li
              onClick={() => {
                setActiveSection("createAdmin");
                setSidebarOpen(false);
              }}
              className={`${styles.menuItem} ${
                activeSection === "createAdmin" ? styles.activeMenu : ""
              }`}
            >
              <span className={styles.iconLabel}>
                <FiUserPlus className={styles.icon} />
                <span className={styles.label}>Create Admin</span>
              </span>
            </li>
            <li
              onClick={() => {
                setActiveSection("createManager");
                setSidebarOpen(false);
              }}
              className={`${styles.menuItem} ${
                activeSection === "createManager" ? styles.activeMenu : ""
              }`}
            >
              <span className={styles.iconLabel}>
                <FiUserPlus className={styles.icon} />
                <span className={styles.label}>Create Manager</span>
              </span>
            </li>
            <li
              onClick={() => {
                setActiveSection("createAgent");
                setSidebarOpen(false);
              }}
              className={`${styles.menuItem} ${
                activeSection === "createAgent" ? styles.activeMenu : ""
              }`}
            >
              <span className={styles.iconLabel}>
                <FiUserPlus className={styles.icon} />
                <span className={styles.label}>Create Agent</span>
              </span>
            </li>

            <p className={styles.sectionTitle}>List</p>

            <li
              // className={styles.menuItem}
              className={`${styles.menuItem} ${
                activeSection === "adminlist" ? styles.activeMenu : ""
              }`}
              onClick={() => {
                setActiveSection("adminlist");
                setSidebarOpen(false);
              }}
            >
              <span className={styles.iconLabel}>
                <FiList className={styles.icon} />
                <span className={styles.label}>Admin List</span>
              </span>
            </li>
            <li
              className={`${styles.menuItem} ${
                activeSection === "managerlist" ? styles.activeMenu : ""
              }`}
              onClick={() => {
                setActiveSection("managerlist");
                setSidebarOpen(false);
              }}
            >
              <span className={styles.iconLabel}>
                <FiList className={styles.icon} />
                <span className={styles.label}>Manager List</span>
              </span>
            </li>
            <li
              className={`${styles.menuItem} ${
                activeSection === "agentlist" ? styles.activeMenu : ""
              }`}
              onClick={() => {
                setActiveSection("agentlist");
                setSidebarOpen(false);
              }}
            >
              <span className={styles.iconLabel}>
                <FiList className={styles.icon} />
                <span className={styles.label}>Agent List</span>
              </span>
            </li>
            <li
              // className={styles.menuItem}
              className={`${styles.menuItem} ${
                activeSection === "userList" ? styles.activeMenu : ""
              }`}
              onClick={() => {
                setActiveSection("userList");
                setSidebarOpen(false);
              }}
            >
              <span className={styles.iconLabel}>
                <FiList className={styles.icon} />
                <span className={styles.label}>User List</span>
              </span>
            </li>

            <p className={styles.sectionTitle}>Security</p>
            <li
              onClick={() => {
                setActiveSection("resetpassword");
                setSidebarOpen(false);
              }}
              // className={styles.menuItem}
              className={`${styles.menuItem} ${
                activeSection === "resetpassword" ? styles.activeMenu : ""
              }`}
            >
              <span className={styles.iconLabel}>
                <FiLock className={styles.icon} />
                <span className={styles.label}>Reset Password</span>
              </span>
            </li>

            <li
              onClick={() => {
                setActiveSection("changepassword");
                setSidebarOpen(false);
              }}
              // className={styles.menuItem}
              className={`${styles.menuItem} ${
                activeSection === "changepassword" ? styles.activeMenu : ""
              }`}
            >
              <span className={styles.iconLabel}>
                <FiLock className={styles.icon} />
                <span className={styles.label}>Change Password</span>
              </span>
            </li>
            <p className={styles.sectionTitle}>Profile</p>
            <li
              onClick={() => {
                setActiveSection("profileEdit");
                // setSidebarOpen(false);
              }}
              // className={styles.menuItem}
              className={`${styles.menuItem} ${
                activeSection === "profileEdit" ? styles.activeMenu : ""
              }`}
            >
              <span className={styles.iconLabel}>
                <FiLock className={styles.icon} />
                <span className={styles.label}>Your Profile Edit</span>
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
                <p className={styles.cardValue}>{adminCount}</p>
              </div>
              <div className={styles.card}>
                <FiUserPlus size={32} className={styles.cardIcon} />
                <p className={styles.cardTitle}>State Managers</p>
                <p className={styles.cardValue}>{stateManagerCount}</p>
              </div>
              <div className={styles.card}>
                <FiUsers size={32} className={styles.cardIcon} />
                <p className={styles.cardTitle}>District Managers</p>
                <p className={styles.cardValue}>{districtManagerCount}</p>
              </div>
              <div className={styles.card}>
                <FiUserPlus size={32} className={styles.cardIcon} />
                <p className={styles.cardTitle}>Agents</p>
                <p className={styles.cardValue}>{agentCount}</p>
              </div>
            </div>
          )}

          {activeSection === "createAdmin" && <CreateAdmin mode="create" />}
          {activeSection === "createManager" && <CreateManager />}
          {activeSection === "createAgent" && <CreateAgent />}
          {activeSection === "changepassword" && <ChangePassword />}
          {activeSection === "resetpassword" && <ResetPassword />}
          {activeSection === "adminlist" && <AdminList />}
          {activeSection === "managerlist" && <ManagerList />}
          {activeSection === "agentlist" && <AgentList />}
          {activeSection === "userList" && <UserList />}
          {activeSection === "profileEdit" && (
            <CreateAdmin
              initialData={adminData}
              mode="edit"
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
