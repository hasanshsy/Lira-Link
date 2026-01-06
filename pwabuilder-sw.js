const cacheName = 'mrq-v1';
const staticAssets = [
  './',
  './index.html',
  './manifest.json',
  './logo.png'
];

// --- Install ---
self.addEventListener('install', async event => {
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(cacheName);
        await cache.addAll(staticAssets);
        console.log('Service Worker: Assets cached');
      } catch (err) {
        console.error('Service Worker: Failed to cache assets', err);
      }
    })()
  );
  self.skipWaiting();
});

// --- Activate ---
self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.map(key => {
          if (key !== cacheName) {
            console.log('Service Worker: Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
      self.clients.claim();
    })()
  );
});

// --- Fetch ---
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(res => res || fetch(event.request).catch(() => {
        // fallback إذا أردت يمكن هنا تحط صفحة offline html
        return new Response('Network error happened', {status: 408});
      }))
  );
});
