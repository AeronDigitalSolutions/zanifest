"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/pages/agent.module.css";
import axios from "axios";
import Agent from "@/models/Agent";
import AgentHeader from "@/components/agentpage/agentheader";
import AgentSidebar from "@/components/agentpage/agentsidebar";
import AgentContent from "@/components/agentpage/agentcontent";
import ResetPassword from "@/components/districtmanagerdashboard/resetpassword";
import CreateUser from "@/components/agentpage/createuser";
import CreateAgent from "@/components/superadminsidebar/createagent";
import AgentSale from "@/components/agentpage/agentsale";

const AgentDashboard = () => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [agentName, setAgentName] = useState<string>("");
  const [agentSales, setAgentSales] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [agent, setagent] = useState<any>(null);

  useEffect(() => {
    // Safe access to localStorage on client side
    const storedName = localStorage.getItem("agentName");
    // console.log("Stored agent name:", storedName);
    if (storedName) {
      setAgentName(storedName);
    }
  }, []);



  // profile edit
  useEffect(() => {
    if (activeSection === "profileEdit") {
      setLoading(true);
      axios
        .get("/api/agents/me")
        .then((res) => setagent(res.data))
        .catch((err) => console.error("Error fetching agent:", err))
        .finally(() => setLoading(false));
    }
  }, [activeSection]);
  

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
            <AgentContent agentName={agentName} agentSales={agentSales} agentId={""} />
          )}

          {activeSection === "resetpassword" && <ResetPassword />}
          {activeSection === "createuser" && <CreateUser />}
          {activeSection === "profileEdit" && (
            <CreateAgent mode="edit" initialData={agent} />
          )}
          {activeSection === "addsale" && <AgentSale />}
        </main>
      </div>
    </div>
  );
};

export default AgentDashboard;
