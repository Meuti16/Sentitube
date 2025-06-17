// src/pages/Content.jsx
import React, { useState, useEffect } from "react";
import Header from "../component/Header";
import Main from "../component/Main";
import { useNavigate } from "react-router-dom";

export default function Content() {
  const [onMenu, setOnMenu] = useState(true);
  const [searchVideoResults, setSearchVideoResults] = useState([]); // Daftar video hasil pencarian

  const [analysisLinkResult, setAnalysisLinkResult] = useState(null); // Hasil analisis dari tab Analisis
  const [homeVideoAnalysisResult, setHomeVideoAnalysisResult] = useState(null); // Hasil analisis dari tab Home

  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      navigate("/login");
    }
  }, [navigate]);

  // Fungsi postLink (untuk analisis link di tab Analisis)
  const postLink = async (data) => {
    try {
      const response = await fetch('/api/scrape_comments', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      // --- KEMBALI KE response.json() LANGSUNG ---
      const resultData = await response.json(); 
      // --- AKHIR KEMBALI ---
      setAnalysisLinkResult(resultData.comments);
      setHomeVideoAnalysisResult(null); 
      console.log("postLink success, data:", resultData.comments);
    } catch (error) {
      console.error("Error postLink:", error); // Ini akan menangkap SyntaxError jika bukan JSON
      setAnalysisLinkResult(null);
    }
  };

  // Fungsi getResultById (untuk analisis video dari daftar di tab Home)
  const getResultById = async (video_id) => { 
    try {
      const youtubeUrl = `https://www.youtube.com/watch?v=${video_id}`;
      
      console.log(`Analyzing video ID: ${video_id} with URL: ${youtubeUrl}`);
      
      const response = await fetch('/api/scrape_comments', { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ video_url: youtubeUrl }),
      });

      // --- KEMBALI KE response.json() LANGSUNG ---
      const data = await response.json();
      // --- AKHIR KEMBALI ---
      setHomeVideoAnalysisResult(data.comments);
      setAnalysisLinkResult(null);
      console.log("getResultById (now scrape_comments) success for ID:", video_id, "Data:", data.comments);
    } catch (error) {
      console.error("Error getResultById (now scrape_comments):", error); // Ini akan menangkap SyntaxError jika bukan JSON
      setHomeVideoAnalysisResult(null);
    }
  };

  // Fungsi handleSearchVideo (untuk pencarian video di tab Home)
  const handleSearchVideo = async (searchQuery) => {
    try {
      console.log("Searching for:", searchQuery);
      const response = await fetch('/api/search_videos', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery }),
      });
      // --- KEMBALI KE response.json() LANGSUNG ---
      const data = await response.json();
      // --- AKHIR KEMBALI ---
      setSearchVideoResults(data);
      setHomeVideoAnalysisResult(null);
      setAnalysisLinkResult(null);
      console.log("Search results:", data);
    } catch (error) {
      console.error("Error handleSearchVideo:", error); // Ini akan menangkap SyntaxError jika bukan JSON
      setSearchVideoResults([]);
    }
  };

  return (
    <>
      <Header onMenu={onMenu} setOnMenu={setOnMenu} />
      <Main
        onMenu={onMenu}
        postLink={postLink} 
        getResultById={getResultById} 
        searchVideo={handleSearchVideo}
        videoResults={searchVideoResults}
        homeVideoAnalysisResult={homeVideoAnalysisResult}
        analysisLinkResult={analysisLinkResult}
      />
    </>
  );
}