// import React, { useEffect, useState } from "react";
// import { Viewer, Worker, SpecialZoomLevel } from "@react-pdf-viewer/core";
// import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
// import { zoomPlugin } from "@react-pdf-viewer/zoom";  // Corrected import
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/toolbar/lib/styles/index.css";
// import './../assets/styles/pdfviwer.css';
// import { useNavigate } from "react-router-dom";
// import "boxicons/css/boxicons.min.css";

// const PDFViewer = () => {
//   const [pdfUrl, setPdfUrl] = useState(
//     "https://pub-ce5c2238b5744d2d91f26392d1aad921.r2.dev/berkare.pdf"
//   );
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [zoomLevel, setZoomLevel] = useState(SpecialZoomLevel.PageWidth);

//   // Initialize plugins
//   const toolbarPluginInstance = toolbarPlugin();
//   const zoomPluginInstance = zoomPlugin();  // Corrected plugin usage
//   const { Toolbar } = toolbarPluginInstance;
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Update theme color
//     const metaTag = document.querySelector('meta[name="theme-color"]');
//     if (metaTag) metaTag.setAttribute("content", "#161B22");
//   }, []);

//   const handleSearchPage = (event) => {
//     const pageNumber = parseInt(event.target.value, 10);
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber);
//     }
//   };

//   const handleFavorite = () => {
//     alert("Added to favorites!");
//   };

//   return (
//     <div className="page pdfviwer">
//       <div className="header">
//         <i onClick={() => navigate("/")} className="bx bx-chevron-left"></i>
//         <span>كتێبی بیركاری</span>
//         <div className="zoom-controls">
//           <button onClick={() => setZoomLevel(SpecialZoomLevel.PageWidth)}>100%</button>
//           <button onClick={() => setZoomLevel(SpecialZoomLevel.PageFit)}>Fit Page</button>
//         </div>
//         <Toolbar />
//         <div style={{ marginBottom: "10px" }}>
//           <span style={{ margin: "0 15px" }}>
//             Page {currentPage} of {totalPages}
//           </span>
//         </div>
//       </div>
//       <div className="container">
//         <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
//           <Viewer
//             fileUrl={pdfUrl}
//             defaultScale={zoomLevel}
//             plugins={[toolbarPluginInstance, zoomPluginInstance]}
//             onDocumentLoad={(e) => setTotalPages(e.doc.numPages)}
//             onPageChange={(e) => setCurrentPage(e.currentPage + 1)}
//           />
//         </Worker>
//       </div>
//       <div className="bottom-container">
//         <div className="favorite-icon" onClick={handleFavorite}>
//         </div>
//         <div className="search-page">
//           <input
//             type="number"
//             value={currentPage}
//             min="1"
//             max={totalPages}
//             onChange={handleSearchPage}
//             placeholder="Go to page"
//           />
//           <button onClick={() => setCurrentPage(currentPage)}>Search</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PDFViewer;
