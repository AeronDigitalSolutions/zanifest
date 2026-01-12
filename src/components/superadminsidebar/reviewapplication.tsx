"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/components/superadminsidebar/reviewApplications.module.css";

interface AgentData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  agentCode?: string;
  phone?: string;
  city?: string;
  district?: string;
  state?: string;
  pinCode?: string;
  panNumber?: string;
  panAttachment?: string; // filename only
  adhaarNumber?: string;
  adhaarAttachment?: string; // filename only
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

type VerificationState = "pending" | "approved" | "rejected";

export default function ReviewApplications() {
  const [applications, setApplications] = useState<AgentData[]>([]);
  const [selected, setSelected] = useState<AgentData | null>(null);
  const [managerList, setManagerList] = useState<any[]>([]);
  const [assignManager, setAssignManager] = useState("");
  const [irdaiVerified, setIrdaiVerified] = useState(false);

  // local verification states for currently selected agent
  const [panStatus, setPanStatus] = useState<VerificationState>("pending");
  const [aadhaarStatus, setAadhaarStatus] =
    useState<VerificationState>("pending");
  const [remark, setRemark] = useState("");
  const [approveLoading, setApproveLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

    const [loading, setLoading] = useState(false);

  // base URL for file preview — change via NEXT_PUBLIC_UPLOAD_BASE_URL if needed
  const FILE_BASE =
    (process.env.NEXT_PUBLIC_UPLOAD_BASE_URL as string) || "/uploads";

  const load = async () => {
    try {
      const res = await axios.get("/api/admin/getPendingAgents");
      setApplications(res.data || []);
    } catch (err) {
      console.error("Failed to load pending agents", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openReview = async (agent: AgentData) => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/admin/getAgentById?id=${agent._id}`);
      setSelected(res.data);

      const res2 = await axios.get("/api/managers/agentDistrictDropdown");
      setManagerList(res2.data.managers || []);

      // reset verification state for modal
      setPanStatus(res.data?.panNumber ? "pending" : "pending");
      setAadhaarStatus(res.data?.adhaarNumber ? "pending" : "pending");
      setRemark("");
      setAssignManager(res.data?.assignedTo || "");
      setIrdaiVerified(false);
    } catch (err) {
      console.error("openReview error", err);
    } finally {
      setLoading(false);
    }
  };
const renderPreview = (file?: string) => {
  if (!file) return <div className={styles.noPreview}>No document uploaded</div>;

  // PDF file
  if (file.startsWith("data:application/pdf")) {
    return (
      <iframe
        src={file}
        className={styles.docPreview}
        style={{ border: "none" }}
        title="PDF Preview"
      />
    );
  }

  // Image file
  if (file.startsWith("data:image")) {
    return (
      <img
        src={file}
        className={styles.docPreview}
        alt="Document Preview"
      />
    );
  }

  // fallback (old filename based uploads)
  const url = getFileUrl(file);
  return url ? (
    <img src={url} className={styles.docPreview} alt="Document" />
  ) : (
    <div className={styles.noPreview}>Preview not available</div>
  );
};

  // When user approves/rejects overall application (final action)
  const handleReview = async (action: "accept" | "reject") => {
    if (panStatus === "pending" || aadhaarStatus === "pending") {
      alert(
        "Please complete PAN and Aadhaar verification before final review."
      );
      return;
    }

    if (
      (panStatus === "rejected" || aadhaarStatus === "rejected") &&
      !remark.trim()
    ) {
      alert("Please add a remark explaining rejection.");
      return;
    }

    if (!selected) return;

    if (action === "accept" && !assignManager) {
      alert("Please assign a District Manager before approving.");
      return;
    }

    try {
      if (action === "accept") setApproveLoading(true);
      if (action === "reject") setRejectLoading(true);

      await axios.post("/api/admin/reviewAgent", {
        agentId: selected._id,
        action,
        assignManager,
        verification: {
          panStatus,
          aadhaarStatus,
        },
        remark: remark.trim(),
      });

      alert(`Application ${action === "accept" ? "Approved" : "Rejected"}!`);
      setSelected(null);
      setAssignManager("");
      setRemark("");
      load();
    } catch (err) {
      console.error("handleReview error", err);
      alert("Something went wrong while submitting review.");
    } finally {
      setApproveLoading(false);
      setRejectLoading(false);
    }
  };

  // IRDAI link open (keeps same behavior) — marks IRDAI step done
  const handleIrdaiClick = () => {
    window.open(
      "https://agencyportal.irdai.gov.in/PublicAccess/LookUpPAN.aspx",
      "_blank"
    );
    setIrdaiVerified(true);
  };

  // Helpers to get full preview URL when DB stores filename only
  const getFileUrl = (filename?: string | null) => {
    if (!filename) return null;
    // if filename already contains http(s), return as-is
    if (filename.startsWith("http://") || filename.startsWith("https://"))
      return filename;
    // else combine with base path
    return `${FILE_BASE.replace(/\/$/, "")}/${filename.replace(/^\//, "")}`;
  };

  // Approve/reject handlers for pan & aadhaar
  const setPanApproved = () => setPanStatus("approved");
  
  const setPanRejected = () => setPanStatus("rejected");
  const setAadhaarApproved = () => setAadhaarStatus("approved");
  const setAadhaarRejected = () => setAadhaarStatus("rejected");

  return (
    <div className={styles.pageWrapper}>
      <h2 className={styles.title}>Review Applications</h2>

      {applications.length === 0 ? (
        <p>No pending applications</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Review</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((a, index) => (
              <tr
                key={a._id}
                className={styles.tableRow}
                onClick={() => openReview(a)}
              >
                <td>{index + 1}</td>
                <td>
                  {a.firstName} {a.lastName}
                </td>
                <td>{a.email}</td>

                <td>
                  <button
                    className={styles.reviewBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      openReview(a);
                    }}
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ---------- Modal ---------- */}
      {selected && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox} role="dialog" aria-modal="true">
            <h2 className={styles.modalTitle}>Review Agent Application</h2>

            <div className={styles.modalContent}>
              {/* top grid */}
              <div className={styles.grid}>
                <div className={styles.field}>
                  <label>First Name</label>
                  <input readOnly value={selected.firstName || ""} />
                </div>

                <div className={styles.field}>
                  <label>Last Name</label>
                  <input readOnly value={selected.lastName || ""} />
                </div>

                <div className={styles.field}>
                  <label>Email</label>
                  <input readOnly value={selected.email || ""} />
                </div>

                <div className={styles.field}>
                  <label>Phone</label>
                  <input readOnly value={selected.phone || ""} />
                </div>

                <div className={styles.field}>
                  <label>City</label>
                  <input readOnly value={selected.city || ""} />
                </div>

                <div className={styles.field}>
                  <label>District</label>
                  <input readOnly value={selected.district || ""} />
                </div>

                <div className={styles.field}>
                  <label>State</label>
                  <input readOnly value={selected.state || ""} />
                </div>

                <div className={styles.field}>
                  <label>PAN Number</label>
                  <input readOnly value={selected.panNumber || ""} />
                </div>

                <div className={styles.field}>
                  <label>Aadhaar Number</label>
                  <input readOnly value={selected.adhaarNumber || ""} />
                </div>
              </div>

              {/* Documents + verification */}
              <div className={styles.docsRow}>
                <div className={styles.docCard}>
                  <div className={styles.docHeader}>
                    <strong>PAN Card</strong>
                    <span className={styles.smallNote}>Preview & verify</span>
                  </div>

                  <div className={styles.docPreviewWrap}>
  {selected.panAttachment ? (
    selected.panAttachment.startsWith("data:application/pdf") ? (
      <iframe
        src={selected.panAttachment}
        className={styles.docPreview}
        style={{ border: "none" }}
        title="PAN PDF"
        onClick={() => window.open(selected.panAttachment, "_blank")}
      />
    ) : selected.panAttachment.startsWith("data:image") ? (
      <img
        className={styles.docPreview}
        src={selected.panAttachment}
        alt="PAN"
        onClick={() =>
          window.open(selected.panAttachment, "_blank")
        }
      />
    ) : (
      <img
        className={styles.docPreview}
        src={getFileUrl(selected.panAttachment) || ""}
        alt="PAN"
        onClick={() => {
          const url = getFileUrl(selected.panAttachment);
          if (url) window.open(url, "_blank");
        }}
      />
    )
  ) : (
    <div className={styles.noPreview}>No PAN uploaded</div>
  )}
</div>

                  {/* <div
  className={styles.docPreviewWrap}
  onClick={() => {
    if (selected.panAttachment)
      window.open(selected.panAttachment, "_blank");
  }}
>
  {renderPreview(selected.panAttachment)}
</div> */}


                  <div className={styles.verifyRow}>
                    <button
                      className={`${styles.verifyAction} ${
                        panStatus === "approved" ? styles.approved : ""
                      }`}
                      onClick={() => setPanApproved()}
                      disabled={panStatus === "approved"}
                    >
                      Approve PAN
                    </button>

                    <button
                      className={`${styles.verifyAction} ${styles.reject}`}
                      onClick={() => setPanRejected()}
                      disabled={panStatus === "rejected"}
                    >
                      Reject PAN
                    </button>

                    <div className={styles.statusPill}>
                      {panStatus === "pending" && "Pending"}
                      {panStatus === "approved" && "Approved"}
                      {panStatus === "rejected" && "Rejected"}
                    </div>
                  </div>
                </div>

                <div className={styles.docCard}>
                  <div className={styles.docHeader}>
                    <strong>Aadhaar Card</strong>
                    <span className={styles.smallNote}>Preview & verify</span>
                  </div>

                 <div className={styles.docPreviewWrap}>
  {selected.adhaarAttachment ? (
    selected.adhaarAttachment.startsWith("data:application/pdf") ? (
      <iframe
        src={selected.adhaarAttachment}
        className={styles.docPreview}
        style={{ border: "none" }}
        title="Aadhaar PDF"
        onClick={() => window.open(selected.adhaarAttachment, "_blank")}
      />
    ) : selected.adhaarAttachment.startsWith("data:image") ? (
      <img
        className={styles.docPreview}
        src={selected.adhaarAttachment}
        alt="Aadhaar"
        onClick={() =>
          window.open(selected.adhaarAttachment, "_blank")
        }
      />
    ) : (
      <img
        className={styles.docPreview}
        src={getFileUrl(selected.adhaarAttachment) || ""}
        alt="Aadhaar"
        onClick={() => {
          const url = getFileUrl(selected.adhaarAttachment);
          if (url) window.open(url, "_blank");
        }}
      />
    )
  ) : (
    <div className={styles.noPreview}>No Aadhaar uploaded</div>
  )}
</div>


                  {/* <div
  className={styles.docPreviewWrap}
  onClick={() => {
    if (selected.adhaarAttachment)
      window.open(selected.adhaarAttachment, "_blank");
  }}
>
  {renderPreview(selected.adhaarAttachment)}
</div> */}


                  <div className={styles.verifyRow}>
                    <button
                      className={`${styles.verifyAction} ${
                        aadhaarStatus === "approved" ? styles.approved : ""
                      }`}
                      onClick={() => setAadhaarApproved()}
                      disabled={aadhaarStatus === "approved"}
                    >
                      Approve Aadhaar
                    </button>

                    <button
                      className={`${styles.verifyAction} ${styles.reject}`}
                      onClick={() => setAadhaarRejected()}
                      disabled={aadhaarStatus === "rejected"}
                    >
                      Reject Aadhaar
                    </button>

                    <div className={styles.statusPill}>
                      {aadhaarStatus === "pending" && "Pending"}
                      {aadhaarStatus === "approved" && "Approved"}
                      {aadhaarStatus === "rejected" && "Rejected"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Assign manager */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Assign District Manager</label>
                  <select
                    className={styles.select}
                    disabled={!irdaiVerified}
                    value={assignManager}
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

                <div className={styles.formGroup}>
                  <label>IRDAI Verification</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      className={styles.irdaiBtn}
                      onClick={handleIrdaiClick}
                      type="button"
                    >
                      Open IRDAI
                    </button>
                    <div className={styles.irdaiStatus}>
                      {irdaiVerified ? "Done" : "Not Verified"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Remark (required if any reject) */}
              <div className={styles.remarkWrap}>
                <label>
                  Remark{" "}
                  {panStatus === "rejected" || aadhaarStatus === "rejected" ? (
                    <span style={{ color: "red" }}>*</span>
                  ) : null}
                </label>
                <textarea
                  className={styles.remarkField}
                  placeholder="Type reason for rejection or any notes."
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                />
              </div>

              {/* Actions */}
              <div className={styles.actions}>
                <button
                  className={styles.finalRejectBtn}
                  onClick={() => handleReview("reject")}
                  disabled={
                    rejectLoading ||
                    panStatus === "pending" ||
                    aadhaarStatus === "pending" ||
                    ((panStatus === "rejected" ||
                      aadhaarStatus === "rejected") &&
                      !remark.trim())
                  }
                >
                  {rejectLoading ? "Processing..." : "Reject Application"}
                </button>

                <button
                  className={styles.finalAcceptBtn}
                  onClick={() => handleReview("accept")}
                  disabled={
                    approveLoading ||
                    panStatus === "pending" ||
                    aadhaarStatus === "pending" ||
                    !irdaiVerified ||
                    !assignManager ||
                    ((panStatus === "rejected" ||
                      aadhaarStatus === "rejected") &&
                      !remark.trim())
                  }
                >
                  {approveLoading ? "Processing..." : "Approve Application"}
                </button>

                <button
                  className={styles.closeBtn}
                  onClick={() => setSelected(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



