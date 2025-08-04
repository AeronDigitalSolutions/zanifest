
"use client";
import React from "react";
import styles from "@/styles/pages/agent.module.css";
import { FiHome, FiUserPlus, FiUsers, FiLock } from "react-icons/fi";

interface AgentSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
  handleLogout: () => void;
}

const AgentSidebar: React.FC<AgentSidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  setActiveSection,
  handleLogout,
}) => {
  // Reusable handler
  const handleClick = (section: string) => {
    setActiveSection(section);
    setSidebarOpen(false);
  };

  return (
    <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarMobile : ""}`}>
      <div>
        {/* Menu Section */}
        <div>
          <p className={styles.sectionTitle}>Menu</p>
          <ul className={styles.menu}>
            <li
              className={styles.menuItem}
              onClick={() => handleClick("dashboard")}
              role="button"
              tabIndex={0}
            >
              <div className={styles.iconLabel}>
                <span className={styles.icon}><FiHome /></span>
                <span className={styles.label}>Dashboard</span>
              </div>
            </li>
          </ul>
        </div>

        {/* User Management Section */}
        <div>
          <p className={styles.sectionTitle}>User Management</p>
          <ul className={styles.menu}>
            <li
              className={styles.menuItem}
              onClick={() => handleClick("createuser")}
              role="button"
              tabIndex={0}
            >
              <div className={styles.iconLabel}>
                <span className={styles.icon}><FiUserPlus /></span>
                <span className={styles.label}>Create User</span>
              </div>
            </li>
            <li
              className={styles.menuItem}
              onClick={() => handleClick("userlist")}
              role="button"
              tabIndex={0}
            >
              <div className={styles.iconLabel}>
                <span className={styles.icon}><FiUsers /></span>
                <span className={styles.label}>User List</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Security Section */}
        <div>
          <p className={styles.sectionTitle}>Security</p>
          <ul className={styles.menu}>
            <li
              className={styles.menuItem}
              onClick={() => handleClick("resetpassword")}
              role="button"
              tabIndex={0}
            >
              <div className={styles.iconLabel}>
                <span className={styles.icon}><FiLock /></span>
                <span className={styles.label}>Reset Password</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Only Logout */}
      <div className={styles.mobileOnlyLogout}>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AgentSidebar;
