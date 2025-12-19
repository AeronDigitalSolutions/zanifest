"use client";
import React from "react";

export type Summary = {
  policyNo: string;
  insuredName: string;
  companyName: string;
  amount: string;
  expiryDate: string;
};

interface PdfUploadProps {
  setUploadedText: (text: string) => void;
  setPdfUrl: (url: string | null) => void;
  setSummary: (data: Summary) => void;
}

const PdfUpload: React.FC<PdfUploadProps> = ({
  setUploadedText,
  setPdfUrl,
  setSummary,
}) => {
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // PDF preview
    setPdfUrl(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("pdf", file);

    const res = await fetch("/api/policy/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    // ---------- SAFE TEXT ----------
    const raw = data?.text ?? "";
    const text =
      typeof raw === "string"
        ? raw
        : Array.isArray(raw)
        ? raw.join("\n")
        : "";

    setUploadedText(text);

    // ---------- SPLIT LINES ----------
    const lines = text
      .split("\n")
      .map(l => l.replace(/\s+/g, " ").trim())
      .filter(Boolean);

    // ---------- SMART FIND ----------
    const findValue = (label: string, regex: RegExp) => {
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].toUpperCase().includes(label)) {
          // same line
          const same = lines[i].match(regex);
          if (same) return same[1];

          // next line
          if (lines[i + 1]) {
            const next = lines[i + 1].match(regex);
            if (next) return next[1];
          }
        }
      }
      return "N/A";
    };

    // ---------- EXACT VALUES ----------
    const insuredName = findValue(
      "NAME",
      /(MR\.?\s+[A-Z]+\s+[A-Z]+)/
    );

    const policyNo = findValue(
      "POLICY",
      /(\d{15,})/
    );

    const amount = findValue(
      "GROSS PREMIUM PAID",
      /([\d,]+)/
    );

    // ✅ FINAL EXPIRY DATE LOGIC (YOUR CASE)
    const expiryDate =
      text.match(/PERIOD\s+OF\s+OD\s+POLICY[\s\S]*?TO\s+(\d{2}-[A-Z]{3}-\d{4})/i)?.[1]
      || text.match(/\bTO\s+(\d{2}-[A-Z]{3}-\d{4})/i)?.[1]
      || text.match(/(\d{2}[\/\-]\d{2}[\/\-]\d{4})/)?.[1]
      || "N/A";

    const companyName =
      text.match(/THE NEW INDIA ASSURANCE CO\. LTD\./i)?.[0]
      || text.match(/INSURER\s*[:\-]?\s*([A-Z\s]+)/i)?.[1]?.trim()
      || "N/A";

    setSummary({
      insuredName,
      policyNo,
      companyName,
      amount,
      expiryDate,
    });
  };

  return (
    <input type="file" accept="application/pdf" onChange={handleFile} />
  );
};

export default PdfUpload;
