import { useState, useRef } from "react";
import { uploadFile } from "../api/api";
import "./UploadPdf.css";

export default function UploadPDF() {
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState(null); // { type: "success"|"error", text: string }
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const processFile = async (file) => {
    if (!file || file.type !== "application/pdf") {
      setStatus({ type: "error", text: "Please select a valid PDF file." });
      return;
    }

    setUploading(true);
    setStatus(null);

    try {
      const res = await uploadFile(file);
      setStatus({ type: "success", text: res.message || "PDF uploaded successfully." });
    } catch {
      setStatus({ type: "error", text: "Upload failed. Please try again." });
    }

    setUploading(false);
  };

  const handleChange = (e) => processFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    processFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="upload-root">
      <div
        className={`drop-zone ${dragging ? "dragging" : ""} ${uploading ? "busy" : ""}`}
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        aria-label="Upload PDF"
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          onChange={handleChange}
          className="file-input-hidden"
          aria-hidden="true"
          tabIndex={-1}
        />

        {uploading ? (
          <div className="upload-state">
            <div className="upload-spinner" aria-hidden="true" />
            <span>Uploading…</span>
          </div>
        ) : (
          <div className="upload-state">
            <svg className="upload-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="drop-text">
              {dragging ? "Drop it here" : "Click or drag PDF"}
            </span>
          </div>
        )}
      </div>

      {status && (
        <div className={`upload-status ${status.type}`} role="alert">
          {status.type === "success" ? "✓" : "✕"} {status.text}
        </div>
      )}
    </div>
  );
}
