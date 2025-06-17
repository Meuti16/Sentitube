// src/component/Home.jsx
import React, { useRef, useEffect, useState } from "react";
import AnalysisResults from "./AnalysisResults";

export default function Home({
  searchVideo,
  videoResults,
  getResultById,
  homeVideoAnalysisResult // Prop ini adalah hasil analisis khusus untuk Home
}) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [analyzingId, setAnalyzingId] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const analysisRef = useRef(null); // Ref untuk scroll ke hasil analisis

  useEffect(() => {
    // Scroll ke bagian hasil analisis jika ada data
    if (homeVideoAnalysisResult && analysisRef.current) {
      analysisRef.current.scrollIntoView({ behavior: "smooth" });
      console.log("Scrolling to analysis results.");
    }
  }, [homeVideoAnalysisResult]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      searchVideo(searchKeyword);
      setHasSearched(true);
      setAnalyzingId(null);
      // Hasil analisis sebelumnya akan hilang saat pencarian baru dimulai
    }
  };

  const handleAnalyze = async (video_id) => {
    try {
      setAnalyzingId(video_id);
      await getResultById(video_id); // Memicu analisis dan update homeVideoAnalysisResult di Content.jsx
      setAnalyzingId(null);
    } catch (error) {
      console.error("Gagal menganalisis dari Home:", error);
      setAnalyzingId(null);
    }
  };

  return (
    <div className="welcome">
      <h1 className="heading">Selamat Datang di Analisis Sentimen Konten Youtube</h1>
      <p className="sub-heading">Analisis sekarang dan temukan Konten YouTube yang lebih bermanfaat</p>

      <form onSubmit={handleSubmit}>
        <div className="form-search">
          <input
            type="search"
            id="cari-konten"
            placeholder="Cari Video Youtube"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <button className="button-home" type="submit">
            Cari
          </button>
        </div>
      </form>

      <div>
        {!hasSearched ? (
          <p>Silakan cari video untuk memulai.</p>
        ) : videoResults === undefined || videoResults === null || !Array.isArray(videoResults) ? (
          <p>Terjadi kesalahan saat memuat video.</p>
        ) : videoResults.length === 0 ? (
          <p>Tidak ada video ditemukan untuk kata kunci ini.</p>
        ) : (
          <ul className="video-list">
            {videoResults.map((video) => (
              <li className={`video-card ${analyzingId === video.video_id ? 'highlighted-video' : ''}`} key={video.video_id} id={`video-${video.video_id}`}>
                <img src={video.thumbnail} alt={video.title} />
                <p>{video.title}</p>
                <p>{video.channel_title}</p>
                <p>{video.published_at}</p>

                <button onClick={() => handleAnalyze(video.video_id)} disabled={analyzingId === video.video_id}>
                  {analyzingId === video.video_id ? "Menganalisis..." : "Analisis"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* TAMPILKAN HASIL ANALISIS DI BAWAH DAFTAR VIDEO */}
      {/* Ini akan muncul setelah daftar video */}
      {homeVideoAnalysisResult && homeVideoAnalysisResult.length > 0 && (
        <div ref={analysisRef} className="hasil-analisis-wrapper">
          <AnalysisResults data={homeVideoAnalysisResult} />
        </div>
      )}
    </div>
  );
}