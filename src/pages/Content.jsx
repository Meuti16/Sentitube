import React, { useState, useEffect } from "react";
import Header from "../component/Header";
import Main from "../component/Main";
import { useNavigate } from "react-router-dom";

export default function Content() {
  const [onMenu, setOnMenu] = useState(true);
  const [resultLocal, setResultLocal] = useState([]);
  const [resultById, setResultById] = useState([]);
  const [resultSource, setResultSource] = useState("local"); // "local" or "byId"
  const [videoResults, setVideoResults] = useState([]);
  const navigate = useNavigate();
const [activeMenu, setActiveMenu] = useState("Home");

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      navigate("/login");
    }
  }, [navigate]);

  // Fungsi postLink (dari input manual)
  const postLink = async (data) => {
    try {
      const response = await fetch(
        "https://7740-157-10-185-252.ngrok-free.app/scrape_comments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const resultData = await response.json(); // Ambil response sebagai JSON
      setResultLocal(resultData.comments); // Simpan komentar di resultLocal
      setResultSource("local"); // Tandai sumber data

      // Ambil ID dari URL dan simpan juga ke resultById agar keduanya bisa dipakai
      const videoUrl = data.video_url;
      const videoIdMatch = videoUrl.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
      const videoId = videoIdMatch ? videoIdMatch[1] : null;

      if (videoId) {
        setResultById((prev) => ({
          ...prev,
          [videoId]: resultData.comments,
        }));
      }
      const previousHistory = JSON.parse(localStorage.getItem("history")) || [];
      const newEntry = {
        video_url: data.video_url,
        timestamp: new Date().toISOString(),
        summary: resultData.summary || "Hasil ringkasan tidak tersedia", // optional
      };
      const updatedHistory = [newEntry, ...previousHistory];
      localStorage.setItem("history", JSON.stringify(updatedHistory));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Fungsi getResultById (berdasarkan video ID)
  const getResultById = async (id) => {
    try {
      const response = await fetch(
        `https://f8c4-157-10-185-252.ngrok-free.app/scrape_comments/result/${id}`
      );
      const data = await response.json();
      setResultById((prev) => ({
        ...prev,
        [id]: data.comments,
      }));
      setResultSource("byId"); // Tandai bahwa sekarang pakai data byId
    } catch (error) {
      console.error("Gagal ambil berdasarkan ID:", error);
    }
  };

  // Fungsi pencarian video
  const handleSearchVideo = async (searchQuery) => {
    try {
      const response = await fetch(
        "https://7740-157-10-185-252.ngrok-free.app/search_videos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: searchQuery }),
        }
      );
      const data = await response.json();
      setVideoResults(data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  // Tentukan hasil analisis yang dikirim berdasarkan sumber
  const selectedResult =
    resultSource === "byId"
      ? Object.values(resultById).flat()
      : resultLocal;

  return (
    <>
      <Header onMenu={onMenu} setOnMenu={setOnMenu} setActiveMenu={setActiveMenu} />
      <Main
        onMenu={onMenu}
        postLink={postLink}
        ResultAnalysis={selectedResult}
        getResultById={getResultById}
        searchVideo={handleSearchVideo}
        videoResults={videoResults}activeMenu={activeMenu}
      />
    </>
  );
}
