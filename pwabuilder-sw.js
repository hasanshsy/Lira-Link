const cacheName = 'mrq-v1';
const staticAssets = [
  './',
  './index.html',
  './manifest.json',
  './logo.png'
];

self.addEventListener('install', async event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      await cache.addAll(staticAssets);
    })()
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map(key => key !== cacheName ? caches.delete(key) : null));
      self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
