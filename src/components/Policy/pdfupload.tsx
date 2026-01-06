"use client";
import React from "react";

export type Summary = {
  insuredName: string;
  policyNo: string;
  companyName: string;
  amount: string;
  expiryDate: string;
  pdfUrl?: string;
    assignedAt?: string; // ✅ NEW

};

const PdfUpload = ({
  onBulkUpload,
}: {
  onBulkUpload: (rows: Summary[]) => void;
}) => {
  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const rows: Summary[] = [];

    for (const file of files) {
      const fd = new FormData();
      fd.append("pdf", file);

      const res = await fetch("/api/policy/upload", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();

      const raw = data?.text ?? "";
      const text =
        typeof raw === "string"
          ? raw
          : Array.isArray(raw)
          ? raw.join("\n")
          : "";

      rows.push({
        insuredName: text.match(/MR\.?\s+[A-Z]+\s+[A-Z]+/)?.[0] || "N/A",
        policyNo: text.match(/\d{15,}/)?.[0] || "N/A",
        companyName:
          text.match(/ASSURANCE CO\. LTD/i)?.[0] || "N/A",
        amount: text.match(/([\d,]{3,})/)?.[0] || "N/A",
        expiryDate:
          text.match(/\d{2}-[A-Z]{3}-\d{4}/)?.[0] || "N/A",
        pdfUrl: URL.createObjectURL(file),
      });
    }

    onBulkUpload(rows);
  };

  return <input type="file" multiple accept="application/pdf" onChange={handleFiles} />;
};

export default PdfUpload;
