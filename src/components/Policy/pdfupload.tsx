"use client";

import React from "react";

interface PdfUploadProps {
  setUploadedText: (text: string) => void;
  setPdfUrl: (url: string | null) => void;
}

const PdfUpload: React.FC<PdfUploadProps> = ({ setUploadedText, setPdfUrl }) => {

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ⭐ Show exact PDF preview instantly
    const filePreviewUrl = URL.createObjectURL(file);
    setPdfUrl(filePreviewUrl);

    // Extract text backend request
    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const res = await fetch("/api/policy/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setUploadedText(data.text || "");
    } catch (err) {
      console.error(err);
      alert("Failed to upload or extract PDF text");
    }
  };

  return (
    <div>
      <h2>Upload PDF</h2>
      <input type="file" accept="application/pdf" onChange={handleFile} />
    </div>
  );
};

export default PdfUpload;
