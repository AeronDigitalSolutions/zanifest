
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/pages/agent.module.css";
import axios from "axios";

import AgentHeader from "@/components/agentpage/agentheader";
import AgentSidebar from "@/components/agentpage/agentsidebar";
import AgentContent from "@/components/agentpage/agentcontent";
import ResetPassword from "@/components/districtmanagerdashboard/resetpassword";
import CreateUser from "@/components/agentpage/createuser";



const AgentDashboard = () => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [agentName, setAgentName] = useState<string>("");

  useEffect(() => {
    // Safe access to localStorage on client side
    const storedName = localStorage.getItem("agentName");
    if (storedName) {
      setAgentName(storedName);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/agent/logout");
      localStorage.removeItem("agentToken");
      router.replace("/agentlogin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <AgentHeader
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleLogout={handleLogout}
      />
      <div className={styles.mainArea}>
        <AgentSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setActiveSection={setActiveSection}
          handleLogout={handleLogout}
        />
        <main className={styles.content}>
          {activeSection === "dashboard" && (
        <AgentContent agentName={agentName} />
          )}

          {activeSection === "resetpassword" && <ResetPassword />}
          {activeSection === "createuser" && <CreateUser/>}

        </main>
      </div>
    </div>
  );
};

export default AgentDashboard;
