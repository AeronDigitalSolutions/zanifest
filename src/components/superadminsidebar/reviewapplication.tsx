"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/components/superadminsidebar/createagent.module.css";

interface AgentData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  agentCode: string;
  phone?: string;
  city?: string;
  district?: string;
  state?: string;
  pinCode?: string;
  panNumber?: string;
  adhaarNumber?: string;
  nomineeName?: string;
  nomineeRelation?: string;
  nomineeAadharNumber?: string;
  nomineePanNumber?: string;
  bankName?: string;
  accountHolderName?: string;
  accountNumber?: string;
  ifscCode?: string;
  branchLocation?: string;
  assignedTo?: string;
  status?: string;
}

export default function ReviewApplications() {
  const [applications, setApplications] = useState<AgentData[]>([]);
  const [selected, setSelected] = useState<AgentData | null>(null);
  const [managerList, setManagerList] = useState<any[]>([]);
  const [assignManager, setAssignManager] = useState("");

  // IRDAI check state
  const [irdaiVerified, setIrdaiVerified] = useState(false);

  const load = async () => {
    const res = await axios.get("/api/admin/getPendingAgents");
    setApplications(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const openReview = async (agent: AgentData) => {
    const res = await axios.get(`/api/admin/getAgentById?id=${agent._id}`);
    setSelected(res.data);

    const res2 = await axios.get("/api/managers/agentDistrictDropdown");
    setManagerList(res2.data.managers);

    setIrdaiVerified(false); // reset when new modal opens
  };

  const handleReview = async (action: "accept" | "reject") => {
    if (!irdaiVerified) {
      alert("Please verify PAN on IRDAI before approval.");
      return;
    }

    if (!selected) return;

    if (action === "accept" && !assignManager) {
      alert("Please assign a District Manager!");
      return;
    }

    await axios.post("/api/admin/reviewAgent", {
      agentId: selected._id,
      action,
      assignManager,
    });

    alert(`Application ${action === "accept" ? "Approved" : "Rejected"}!`);
    setSelected(null);
    setAssignManager("");
    load();
  };

  // IRDAI verification button click
  const handleIrdaiClick = () => {
    window.open(
      "https://agencyportal.irdai.gov.in/PublicAccess/LookUpPAN.aspx",
      "_blank"
    );
    setIrdaiVerified(true);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Review Applications</h2>

      {applications.length === 0 ? (
        <p>No pending applications</p>
      ) : (
        <table style={{ width: "100%", marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Agent Code</th>
              <th>Review</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((a) => (
              <tr key={a._id}>
                <td>{a.firstName} {a.lastName}</td>
                <td>{a.email}</td>
                <td>{a.agentCode}</td>
                <td>
                  <button onClick={() => openReview(a)}>Review</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ---------------- MODAL ---------------- */}
      {selected && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingTop: "40px",
            zIndex: 999,
            overflowY: "auto",
          }}
        >
          <div className={styles.container} style={{ width: "90%", maxWidth: "900px" }}>
            <h2 className={styles.heading}>Review Agent Application</h2>

            <form className={styles.form}>

              {/* ------------------ ROW 1 ------------------ */}
              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label>Agent Code</label>
                  <input className={styles.input} readOnly value={selected.agentCode} />
                </div>

                <div className={styles.formGroup}>
                  <label>First Name</label>
                  <input className={styles.input} readOnly value={selected.firstName} />
                </div>

                <div className={styles.formGroup}>
                  <label>Last Name</label>
                  <input className={styles.input} readOnly value={selected.lastName} />
                </div>
              </div>

              {/* ------------------ ROW 2 ------------------ */}
              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input className={styles.input} readOnly value={selected.email} />
                </div>

                <div className={styles.formGroup}>
                  <label>Phone</label>
                  <input className={styles.input} readOnly value={selected.phone} />
                </div>
              </div>

              <h3>Address Details</h3>

              {/* ------------------ ADDRESS ------------------ */}
              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label>Pin Code</label>
                  <input className={styles.input} readOnly value={selected.pinCode} />
                </div>

                <div className={styles.formGroup}>
                  <label>City</label>
                  <input className={styles.input} readOnly value={selected.city} />
                </div>

                <div className={styles.formGroup}>
                  <label>District</label>
                  <input className={styles.input} readOnly value={selected.district} />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label>State</label>
                  <input className={styles.input} readOnly value={selected.state} />
                </div>

                <div className={styles.formGroup}>
                  <label>PAN Number</label>
                  <input className={styles.input} readOnly value={selected.panNumber} />
                </div>

                <div className={styles.formGroup}>
                  <label>Aadhaar Number</label>
                  <input className={styles.input} readOnly value={selected.adhaarNumber} />
                </div>
              </div>

              <h3>Nominee Details</h3>

              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label>Nominee Name</label>
                  <input className={styles.input} readOnly value={selected.nomineeName} />
                </div>

                <div className={styles.formGroup}>
                  <label>Nominee Relation</label>
                  <input className={styles.input} readOnly value={selected.nomineeRelation} />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label>Nominee PAN</label>
                  <input className={styles.input} readOnly value={selected.nomineePanNumber} />
                </div>

                <div className={styles.formGroup}>
                  <label>Nominee Aadhaar</label>
                  <input className={styles.input} readOnly value={selected.nomineeAadharNumber} />
                </div>
              </div>

              <h3>Bank Details</h3>

              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label>Account Holder Name</label>
                  <input className={styles.input} readOnly value={selected.accountHolderName} />
                </div>

                <div className={styles.formGroup}>
                  <label>Bank Name</label>
                  <input className={styles.input} readOnly value={selected.bankName} />
                </div>

                <div className={styles.formGroup}>
                  <label>Account Number</label>
                  <input className={styles.input} readOnly value={selected.accountNumber} />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label>IFSC Code</label>
                  <input className={styles.input} readOnly value={selected.ifscCode} />
                </div>

                <div className={styles.formGroup}>
                  <label>Branch Location</label>
                  <input className={styles.input} readOnly value={selected.branchLocation} />
                </div>
              </div>

              {/* ASSIGN MANAGER */}
              <div className={styles.formGroup}>
                <label>Assign District Manager</label>
                <select
                  className={styles.input}
                  value={assignManager}
                  disabled={!irdaiVerified}
                  onChange={(e) => setAssignManager(e.target.value)}
                >
                  <option value="">Select</option>
                  {managerList.map((m) => (
                    <option key={m.managerId} value={m.managerId}>
                      {m.name} ({m.managerId})
                    </option>
                  ))}
                </select>
              </div>

            {/* ------------------ ACTION BUTTONS (BOTTOM) ------------------ */}
<div
  style={{
    marginTop: "25px",
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  }}
>

  {/* IRDAI Verify Button */}
  <button
    type="button"
    onClick={handleIrdaiClick}
    style={{
      background: "#2563eb",
      color: "white",
      padding: "10px 20px",
      borderRadius: 6,
      border: "none",
      cursor: "pointer",
      fontWeight: 600,
    }}
  >
    Verify PAN on IRDAI
  </button>

  {/* Reject */}
  <button
    type="button"
    disabled={!irdaiVerified}
    onClick={() => handleReview("reject")}
    style={{
      background: !irdaiVerified ? "gray" : "red",
      color: "white",
      padding: "10px 20px",
      borderRadius: 6,
      border: "none",
      cursor: !irdaiVerified ? "not-allowed" : "pointer",
      opacity: !irdaiVerified ? 0.6 : 1,
    }}
  >
    Reject
  </button>

  {/* Accept */}
  <button
    type="button"
    disabled={!irdaiVerified}
    onClick={() => handleReview("accept")}
    style={{
      background: !irdaiVerified ? "gray" : "green",
      color: "white",
      padding: "10px 20px",
      borderRadius: 6,
      border: "none",
      cursor: !irdaiVerified ? "not-allowed" : "pointer",
      opacity: !irdaiVerified ? 0.6 : 1,
    }}
  >
    Accept
  </button>

  {/* Close */}
  <button
    type="button"
    onClick={() => setSelected(null)}
    style={{
      border: "1px solid gray",
      padding: "10px 20px",
      borderRadius: 6,
      cursor: "pointer",
      width: "100px",
    }}
  >
    Close
  </button>
</div>


            </form>
          </div>
        </div>
      )}
    </div>
  );
}
