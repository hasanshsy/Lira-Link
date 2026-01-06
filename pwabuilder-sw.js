const cacheName = 'mrq-v1';
const staticAssets = [
  './',
  './index.html',
  './manifest.json',
  './logo.png'
];

self.addEventListener('install', async el => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
});

self.addEventListener('fetch', el => {
  el.respondWith(
    caches.match(el.request).then(res => res || fetch(el.request))
  );
});
