// src/component/Analysis.jsx
import React, { useState } from "react";
import AnalysisResults from "./AnalysisResults";

export default function Analysis({
  postLink,
  analysisLinkResult // Prop ini adalah hasil analisis khusus untuk Analysis
}) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (url.trim()) {
      setLoading(true);
      await postLink({ video_url: url }); 
      setLoading(false);
    }
  };

  return (
    <div className="welcome">
      <h1 className="heading">Analysis Video</h1>
      <p className="sub-heading">Masukkan tautan video YouTube di bawah</p>

      <form className="form-grup" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Masukkan link YouTube"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className="button-analysis" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Analysis"}
        </button>
      </form>

      {!loading && analysisLinkResult && analysisLinkResult.length > 0 && (
        <div className="hasil-analisis-wrapper">
          <AnalysisResults data={analysisLinkResult} />
        </div>
      )}
    </div>
  );
}