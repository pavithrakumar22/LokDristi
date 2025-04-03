// public/service-worker.js
self.addEventListener("install", () => {
    console.log("Service Worker Installed");
  });
  
  self.addEventListener("fetch", () => {
    // No caching logic, just to silence 404 errors
  });
  