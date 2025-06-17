// src/component/Main.jsx
import Nav from "./Nav";
import { useState } from "react";
import Home from "./Home";
import Analysis from "./Analysis";
import History from "./History";
import PdfExport from "./PdfExport";
export default function Main({
  onMenu,
  postLink,
  searchVideo,
  getResultById,
  videoResults,
  homeVideoAnalysisResult, // Hasil analisis untuk Home
  analysisLinkResult // Hasil analisis untuk Analysis
}) {
  const [activeMenu, setActiveMenu] = useState("Home");

  return (
    <div className="container">
      {onMenu && (
        <div className="left">
          <Nav
            onMenu={onMenu}
            setActiveMenu={setActiveMenu}
            activeMenu={activeMenu}
          />
        </div>
      )}

      <div className="right">
        {activeMenu === "Home" && (
          <Home
            searchVideo={searchVideo}
            videoResults={videoResults}
            getResultById={getResultById}
            homeVideoAnalysisResult={homeVideoAnalysisResult} // Teruskan hasil analisis ke Home
          />
        )}
        {activeMenu === "Analysis" && (
          <Analysis
            postLink={postLink}
            analysisLinkResult={analysisLinkResult} // Teruskan hasil analisis ke Analysis
          />
        )}
        {/* {activeMenu === "Trend" && <Trend />} */}
        {activeMenu === "History" && <History />}
      </div>
    </div>
  );
}