"use client";
import React, { useEffect, useState } from "react";
import PdfUpload, { Summary } from "@/components/Policy/pdfupload";
import PolicyTable from "@/components/Policy/PolicyTable";

export default function ListOfPolicy() {
  const [policies, setPolicies] = useState<Summary[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // 🔄 Fetch from DB
  const loadPolicies = async () => {
    const res = await fetch("/api/policy/list", {
      credentials: "include",
    });
    const json = await res.json();
    if (json.success) setPolicies(json.data);
  };

  useEffect(() => {
    loadPolicies();
    window.addEventListener("policy-updated", loadPolicies);
    return () =>
      window.removeEventListener("policy-updated", loadPolicies);
  }, []);

  return (
    <>
    <h2>List of Policies</h2>
      <PdfUpload
        setPdfUrl={setPdfUrl}
        setSummary={(summary) => {
          // 🔥 TEMP add uploaded row in table
          setPolicies((prev) => [summary, ...prev]);
        }}
        setUploadedText={() => {}}
      />

      <PolicyTable policies={policies} pdfUrl={pdfUrl || ""} />
    </>
  );
}
