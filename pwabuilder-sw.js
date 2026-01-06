// This is the "Offline copy of pages" service worker
const CACHE = "pwabuilder-offline";
const offlineFallbackPage = "index.html";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.add(offlineFallbackPage))
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.open(CACHE).then((cache) => cache.match(offlineFallbackPage));
    })
  );
});