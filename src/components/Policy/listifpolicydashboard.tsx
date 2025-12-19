"use client";
import React, { useEffect, useState } from "react";
import PdfUpload, { Summary } from "@/components/Policy/pdfupload";
import PolicyTable from "@/components/Policy/PolicyTable";
import styles from "@/styles/pages/listofpolicy.module.css";

const ListOfPolicy = () => {
  const [preview, setPreview] = useState<Summary | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [saved, setSaved] = useState<Summary[]>([]);
  const [uploadedText, setUploadedText] = useState(""); // ✅ ADD THIS

  const fetchPolicies = async () => {
    const res = await fetch("/api/policy/list");
    const json = await res.json();
    if (json.success) setSaved(json.data);
  };

  useEffect(() => {
    fetchPolicies();
    window.addEventListener("policy-updated", fetchPolicies);
    return () =>
      window.removeEventListener("policy-updated", fetchPolicies);
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.topBar}>
        <h2>Policy Scanner</h2>

        <PdfUpload
          setSummary={setPreview}
          setPdfUrl={setPdfUrl}
          setUploadedText={setUploadedText} // ✅ PASS IT
        />
      </div>

      {/* CURRENT UPLOAD */}
      {preview && pdfUrl && (
        <PolicyTable policies={[preview]} pdfUrl={pdfUrl} />
      )}

      {/* VERIFIED POLICIES */}
      {saved.length > 0 && (
        <PolicyTable policies={saved} pdfUrl="" />
      )}
    </div>
  );
};

export default ListOfPolicy;
