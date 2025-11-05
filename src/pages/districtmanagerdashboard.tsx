// pages/districtmanagerdashboard.tsx
"use client";
import React, { useState, useEffect, useMemo } from "react";
import styles from "@/styles/pages/districtmanager.module.css";
import { useRouter } from "next/router";
import { useManager } from "@/lib/hooks/useManager";
import axios from "axios";

import DistrictManagerHeader from "@/components/districtmanagerdashboard/DistrictManagerHeader";
import DistrictManagerSidebar from "@/components/districtmanagerdashboard/districtmanagersidebar";
import DashboardContent from "@/components/districtmanagerdashboard/dashboardcontent";
import ResetPassword from "@/components/districtmanagerdashboard/resetpassword";
import ListOfAgent from "@/components/districtmanagerdashboard/listofagents";

// ----- Types -----
interface AgentDoc {
  _id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  district?: string;
  city?: string;
  state?: string;
  assignedTo?: string;                // manager id or legacy code like "DM0101"

  // New schema fields (maybe undefined on older docs)
  totalSales?: number | string;
  monthlySales?: number | string;
  clients?: number | string;

  // Legacy / different fields seen in your sample doc
  sales?: number | string;            // use as monthlySales fallback
  lifetimeSales?: number | string;    // use as totalSales fallback
  currentDMSales?: number | string;   // another possible monthly-like field
}

interface SimpleAgent {
  id: string;
  name: string;
  location: string;
  totalSales: number;
  monthlySales: number;
  clients: number;
}

interface ChartPoint { month: string; sales: number }

const monthlySalesData: ChartPoint[] = [
  { month: "Jan 2025", sales: 12000 },
  { month: "Feb 2025", sales: 22000 },
  { month: "Mar 2025", sales: 30000 },
  { month: "Apr 2025", sales: 35000 },
  { month: "May 2025", sales: 27000 },
  { month: "Jun 2025", sales: 40000 },
  { month: "Jul 2025", sales: 38000 },
  { month: "Aug 2025", sales: 42000 },
  { month: "Sep 2025", sales: 31000 },
  { month: "Oct 2025", sales: 45000 },
  { month: "Nov 2025", sales: 50000 },
  { month: "Dec 2025", sales: 47000 },
];

const DistricManagerDashboard = () => {
  const router = useRouter();
  const { user } = useManager();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showAgentList, setShowAgentList] = useState(false);

  const [agentData, setAgentData] = useState<AgentDoc[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState<ChartPoint[]>(monthlySalesData);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/getagent", { credentials: "include" });

        if (res.status === 401) {
          router.replace("/managerlogin");
          return;
        }
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.message || `Failed to fetch agents (${res.status})`);
        }

        const data = await res.json();
        const agents = Array.isArray(data.agents) ? data.agents : [];
        setAgentData(agents);

        if (agents.length) {
          console.log("Sample agent:", {
            assignedTo: agents[0].assignedTo,
            lifetimeSales: agents[0].lifetimeSales,
            sales: agents[0].sales,
            currentDMSales: agents[0].currentDMSales,
            totalSales: agents[0].totalSales,
            monthlySales: agents[0].monthlySales,
            clients: agents[0].clients,
          });
        } else {
          console.log("No agents returned for this manager.");
        }
      } catch (err: any) {
        console.error("Error fetching agents:", err);
        setError(err?.message || "Failed to fetch agents");
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, [router]);

  // ---- FIELD MAPPING HELPERS ----
  const getTotalSales = (a: AgentDoc) =>
    (+a.totalSales! || +a.lifetimeSales! || 0);

  const getMonthlySales = (a: AgentDoc) =>
    (+a.monthlySales! || +a.sales! || +a.currentDMSales! || 0);

  const getClients = (a: AgentDoc) =>
    (+a.clients! || 0); // adjust here if you later add a field like a.clientCount

  // ---- DERIVED TOTALS (Option B + mapping) ----
  const totalSalesNum = useMemo(
    () => agentData.reduce((sum, a) => sum + getTotalSales(a), 0),
    [agentData]
  );

  const monthlySalesNum = useMemo(
    () => agentData.reduce((sum, a) => sum + getMonthlySales(a), 0),
    [agentData]
  );

  const totalClientsNum = useMemo(
    () => agentData.reduce((sum, a) => sum + getClients(a), 0),
    [agentData]
  );

  const numAgents = agentData.length;
  const formattedTotalSales = `₹${totalSalesNum.toLocaleString("en-IN")}`;
  const formattedMonthlySales = `₹${monthlySalesNum.toLocaleString("en-IN")}`;

  const simpleAgents: SimpleAgent[] = useMemo(
    () =>
      agentData.map((a) => ({
        id: a._id,
        name: `${a.firstName ?? ""} ${a.lastName ?? ""}`.trim() || a.email,
        location: a.city || a.district || a.state || "—",
        totalSales: getTotalSales(a),
        monthlySales: getMonthlySales(a),
        clients: getClients(a),
      })),
    [agentData]
  );

  const agentTableData = useMemo(
    () =>
      agentData.map((a) => ({
        _id: a._id,
        name: `${a.firstName ?? ""} ${a.lastName ?? ""}`.trim() || a.email,
        email: a.email,
        district: a.district ?? "",
        city: a.city ?? "",
        state: a.state ?? "",
        assignedTo: a.assignedTo,
      })),
    [agentData]
  );

  const handleFilter = () => {
    if (!startDate || !endDate) {
      setFilteredData(monthlySalesData);
      return;
    }
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const filtered = monthlySalesData.filter((p) => {
      const [mName, y] = p.month.split(" ");
      const t = new Date(`${mName} 1, ${y}`).getTime();
      return t >= start && t <= end;
    });
    setFilteredData(filtered);
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/manager/logout");
      localStorage.removeItem("managerToken");
      router.replace("/managerlogin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <DistrictManagerHeader
        user={user}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleLogout={handleLogout}
      />

      <div className={styles.mainArea}>
        <DistrictManagerSidebar
          setActiveSection={setActiveSection}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleLogout={handleLogout}
        />

        <main className={styles.content}>
          {activeSection === "dashboard" && (
            <DashboardContent
              formattedTotalSales={formattedTotalSales}
              formattedMonthlySales={formattedMonthlySales}
              agents={agentData}
              totalClients={totalClientsNum}
              showAgentList={showAgentList}
              setShowAgentList={setShowAgentList}
              agentData={agentTableData}
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              handleFilter={handleFilter}
              filteredData={filteredData}
              loading={loading}
              error={error}
              numAgents={numAgents}
            />
          )}

          {activeSection === "resetpassword" && <ResetPassword />}
          {activeSection === "listofagent" && <ListOfAgent />}
        </main>
      </div>
    </div>
  );
};

export default DistricManagerDashboard;
