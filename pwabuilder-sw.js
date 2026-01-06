const cacheName = 'mrq-v1';
const staticAssets = [
  './',
  './index.html',
  './manifest.json',
  './logo-48.png',
  './logo-72.png',
  './logo-96.png',
  './logo-144.png',
  './logo-192.png',
  './logo-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(staticAssets))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(key => key !== cacheName ? caches.delete(key) : null)))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
