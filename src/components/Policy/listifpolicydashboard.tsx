"use client";

import React, { useState } from "react";
import PdfUpload from "@/components/Policy/pdfupload";
import ExtractedText from "@/components/Policy/ExtractedText";
import styles from "@/styles/pages/listofpolicy.module.css";

const ListOfPolicy: React.FC = () => {
  const [uploadedText, setUploadedText] = useState("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  return (
    <div className={styles.pageContainer}>
      {/* LEFT: upload + extracted text */}
      <div className={styles.leftSide}>
        <PdfUpload
          setUploadedText={setUploadedText}
          setPdfUrl={setPdfUrl}
        />

        {uploadedText && <ExtractedText text={uploadedText} />}
      </div>

      {/* RIGHT: exact PDF preview */}
     <div className={styles.rightSide}>
  {pdfUrl ? (
    <iframe
      src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
      className={styles.pdfViewer}
    ></iframe>
  ) : (
    <p className={styles.noPreview}>Upload a PDF to preview</p>
  )}
</div>

    </div>
  );
};

export default ListOfPolicy;
