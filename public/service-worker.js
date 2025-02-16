/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/static/js/main.js',
  '/static/css/main.css',
  '/manifest.json',  // Make sure to include these files
  '/favicon.ico'     // If you have a favicon
];

// Install event - cache important files
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Make sure the service worker activates immediately
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve files from cache or fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        // Fallback to cache (root page) when offline or on failure
        return caches.match('/');
      });
    })
  );
});

// Activate event - clean up old caches (if any)
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
/* eslint-enable no-restricted-globals */
