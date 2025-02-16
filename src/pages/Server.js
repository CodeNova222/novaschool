import React, { useState, useEffect } from "react";

function Server() {
  const [cachedFiles, setCachedFiles] = useState([]);

  useEffect(() => {
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage("getCachedFiles");

      navigator.serviceWorker.addEventListener("message", (event) => {
        if (event.data.cachedFiles) {
          setCachedFiles(event.data.cachedFiles);
        }
      });
    }
  }, []);

  return (
    <div>
      <h1>Server Page</h1>
      <h2>Cached Files:</h2>
      <ul>
        {cachedFiles.map((file, index) => (
          <li key={index}>{file}</li>
        ))}
      </ul>
    </div>
  );
}

export default Server;
