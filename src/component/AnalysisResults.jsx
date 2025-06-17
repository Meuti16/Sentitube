// src/component/AnalysisResults.jsx
import React from "react";
import SentimentList from "./SentimentList";
import Barchart from "./Barchart";
import Piechart from "./Piechart";
// HAPUS: import WordCloudComponent dari sini, karena tidak lagi digunakan
// import WordCloudComponent from "./WordCloudComponent"; 

export default function AnalysisResults({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="hasil-analisis-wrapper">
        <p>Tidak ada hasil analisis yang tersedia.</p>
      </div>
    );
  }

  // --- HAPUS: FUNGSI processCommentsForWordCloud ---
  // const processCommentsForWordCloud = (comments) => {
  //   const cleanedComments = comments
  //     .map((item) => item.Cleaned)
  //     .join(" ")
  //     .toLowerCase()
  //     .replace(/[^\w\s]/g, "") 
  //     .split(/\s+/); 

  //   const freq = {};
  //   cleanedComments.forEach((word) => {
  //     if (word.length > 1) { 
  //       freq[word] = (freq[word] || 0) + 1;
  //     }
  //   });
  //   return Object.entries(freq).map(([text, value]) => ({ text, value }));
  // };
  // --- AKHIR HAPUS FUNGSI ---

  // --- HAPUS: VARIABEL KOMENTAR POSITIF/NEGATIF/NETRAL & WORD LIST ---
  // const positiveComments = data.filter((item) => item.Sentiment && item.Sentiment.toLowerCase() === "positif");
  // const negativeComments = data.filter((item) => item.Sentiment && item.Sentiment.toLowerCase() === "negatif");
  // const netralComments = data.filter((item) => item.Sentiment && item.Sentiment.toLowerCase() === "netral");

  // const positiveWords = processCommentsForWordCloud(positiveComments);
  // const negativeWords = processCommentsForWordCloud(negativeComments);
  // const netralWords = processCommentsForWordCloud(netralComments);
  // --- AKHIR HAPUS VARIABEL ---

  // --- HAPUS: FUNGSI UNTUK TOMBOL DOWNLOAD ---
  // const handleDownloadPdf = () => {
  //   console.log("Download PDF clicked!");
  //   alert("Fungsi Download PDF belum diimplementasikan sepenuhnya.");
  // };

  // const handleDownloadCsv = () => {
  //   console.log("Download CSV clicked!");
  //   alert("Fungsi Download CSV belum diimplementasikan sepenuhnya.");
  // };
  // --- AKHIR HAPUS FUNGSI ---

  return (
    <div className="hasil-analisis-wrapper">
      <div className="daftar-komentar">
        <p>Daftar Komentar</p>
        <div className="kotak-komentar scroll">
          <SentimentList data={data} />
        </div>
      </div>

      {/* Bagian Hasil Analisis (Grafik) */}
      <div className="hasil-analisis">
        <h1>Hasil Analisis Video</h1>
        <div className="container-hasil">
          <div className="chart-box">
            <p>Grafik Hasil Analisis</p>
            <div className="kotak">
              <Barchart data={data} />
            </div>
          </div>

          <div className="chart-box">
            <p>Summary Analysis</p>
            <div className="kotak">
              <Piechart data={data} />
            </div>
          </div>
        </div>
        {/* --- HAPUS: TOMBOL PDF dan CSV --- */}
        {/* <div className="download-buttons"> 
          <button className="button-download-pdf" onClick={handleDownloadPdf}>Download PDF</button>
          <button className="button-download-csv" onClick={handleDownloadCsv}>Download CSV</button>
        </div> */}
        {/* --- AKHIR HAPUS TOMBOL --- */}
      </div>

      {/* --- HAPUS SELURUH BAGIAN WORDCLOUD --- */}
      {/* <div className="word-cloud">
        <h1>Wordcloud Sentimen</h1>
        <div className="wordcloud-sentiment-container">
          <div>
            <p>Positif</p>
            <div className="isi">
              {positiveWords.length > 0 ? (
                <WordCloudComponent words={positiveWords} />
              ) : (
                <p>Tidak ada kata kunci positif.</p>
              )}
            </div>
          </div>
          <div>
            <p>Negatif</p>
            <div className="isi">
              {negativeWords.length > 0 ? (
                <WordCloudComponent words={negativeWords} />
              ) : (
                <p>Tidak ada kata kunci negatif.</p>
              )}
            </div>
          </div>
          <div>
            <p>Netral</p>
            <div className="isi">
              {netralWords.length > 0 ? (
                <WordCloudComponent words={netralWords} />
              ) : (
                <p>Tidak ada kata kunci netral.</p>
              )}
            </div>
          </div>
          <button className="button-download-pdf">Download PDF</button> // Tombol ini juga harusnya dihapus
        </div>
      </div> */}
      {/* --- AKHIR HAPUS BAGIAN WORDCLOUD --- */}
    </div>
  );
}