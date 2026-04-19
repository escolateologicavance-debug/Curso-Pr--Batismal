const CACHE_NAME = 'avance-v1';
const assets = [
  'index.html',
  '1.html',
  '2.html',
  '3.html',
  '4.html',
  '5.html',
  '6.html',
  'manifest.json',
  'logo-192.png',
  'logo-512.png',
  '1-img.png',
  '2-img.png',
  '3-img.png',
  '4-img.png',
  '5-img.png',
  '6-img.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});